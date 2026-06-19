"""Authentication blueprint with register, login, and profile endpoints"""
import re
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from google.oauth2 import id_token
from google.auth.transport import requests
from extensions import db, bcrypt, limiter
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Email validation regex
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def validate_email(email):
    """Validate email format"""
    return re.match(EMAIL_REGEX, email) is not None

def validate_password(password):
    """Validate password strength: min 8 chars, at least 1 number"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least one number"
    return True, None

@auth_bp.route('/register', methods=['POST'])
@limiter.limit("10 per minute")
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '')
        name = data.get('name', '').strip()
        role = data.get('role', 'student').strip().lower()
        
        # Validate all fields are present
        if not email or not password or not name:
            return jsonify({'error': 'Email, password, and name are required'}), 400
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate password strength
        is_valid, error_msg = validate_password(password)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # Validate role
        if role not in ['student', 'hr']:
            return jsonify({'error': 'Role must be either "student" or "hr"'}), 400
        
        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 409
        
        # Hash password
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Create new user
        new_user = User(
            email=email,
            password_hash=password_hash,
            name=name,
            role=role,
            auth_provider='local'
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(
            identity=str(new_user.id),
            additional_claims={'role': new_user.role}
        )
        
        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'user': new_user.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    """Login user and return JWT token"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user by email
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Check password
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create access token
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={'role': user.role}
        )
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user profile (protected endpoint)"""
    try:
        # Get user ID from JWT token
        user_id = get_jwt_identity()
        
        # Find user in database
        user = User.query.get(int(user_id))
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'Failed to fetch user: {str(e)}'}), 500

@auth_bp.route('/google', methods=['POST'])
@limiter.limit("10 per minute")
def google_login():
    """Google OAuth login - accepts Google ID token and creates/links user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
        
        google_token = data.get('credential', '')
        role = data.get('role', '').strip().lower()
        
        if not google_token:
            return jsonify({'error': 'Google credential is required'}), 400
        
        if not role or role not in ['student', 'hr']:
            return jsonify({'error': 'Valid role (student or hr) is required'}), 400
        
        # Verify Google token
        try:
            google_client_id = current_app.config['GOOGLE_CLIENT_ID']
            if not google_client_id:
                return jsonify({'error': 'Google OAuth not configured on server'}), 500
            
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                google_token, 
                requests.Request(), 
                google_client_id
            )
            
            # Extract user info from Google token
            email = idinfo.get('email')
            name = idinfo.get('name')
            picture = idinfo.get('picture')
            
            if not email or not name:
                return jsonify({'error': 'Invalid Google token - missing email or name'}), 400
            
        except ValueError as e:
            return jsonify({'error': f'Invalid Google token: {str(e)}'}), 401
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()
        
        if existing_user:
            # Link Google to existing account
            if existing_user.auth_provider == 'local':
                existing_user.auth_provider = 'both'
            elif existing_user.auth_provider != 'google' and existing_user.auth_provider != 'both':
                existing_user.auth_provider = 'google'
            
            # Update profile picture if not set
            if not existing_user.picture and picture:
                existing_user.picture = picture
            
            # Update name if it was generic
            if name and name != existing_user.name:
                existing_user.name = name
            
            db.session.commit()
            
            user = existing_user
            message = 'Google account linked to existing account'
        else:
            # Create new user with Google auth
            new_user = User(
                email=email,
                password_hash=None,  # No password for Google OAuth users
                name=name,
                role=role,
                auth_provider='google',
                picture=picture
            )
            
            db.session.add(new_user)
            db.session.commit()
            
            user = new_user
            message = 'Registration successful via Google'
        
        # Create access token (same format as local login)
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={'role': user.role}
        )
        
        return jsonify({
            'message': message,
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Google login failed: {str(e)}'}), 500
