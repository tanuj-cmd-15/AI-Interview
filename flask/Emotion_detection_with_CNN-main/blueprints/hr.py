"""HR endpoints for candidate management and question bank"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from extensions import db, limiter
from models.user import User
from models.interview import Interview
from models.question import Question

hr_bp = Blueprint('hr', __name__, url_prefix='/api/hr')

def require_hr_role():
    """Decorator function to require HR role"""
    def decorator(f):
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            if claims.get('role') != 'hr':
                return jsonify({'error': 'Access denied. HR role required.'}), 403
            return f(*args, **kwargs)
        wrapper.__name__ = f.__name__
        return wrapper
    return decorator

@hr_bp.route('/candidates', methods=['GET'])
@jwt_required()
@require_hr_role()
def get_candidates():
    """Get all candidates' interview results for HR view"""
    try:
        # Get all interviews with candidate details
        interviews = db.session.query(Interview, User)\
                              .join(User, Interview.candidate_id == User.id)\
                              .order_by(Interview.created_at.desc())\
                              .all()
        
        candidates_data = []
        for interview, user in interviews:
            candidates_data.append({
                'id': interview.id,
                'name': user.name,
                'interview_type': interview.interview_type,
                'score': interview.score,
                'status': interview.status,
                'feedback_summary': interview.feedback_summary,
                'created_at': interview.created_at.isoformat()
            })
        
        return jsonify(candidates_data), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch candidates: {str(e)}'}), 500

@hr_bp.route('/candidates/<int:interview_id>/status', methods=['PUT'])
@jwt_required()
@require_hr_role()
def update_candidate_status(interview_id):
    """Update interview status (reviewed/pending_review)"""
    try:
        data = request.get_json()
        
        if not data or 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        new_status = data['status']
        if new_status not in ['reviewed', 'pending_review']:
            return jsonify({'error': 'Status must be "reviewed" or "pending_review"'}), 400
        
        # Find and update interview
        interview = Interview.query.get(interview_id)
        if not interview:
            return jsonify({'error': 'Interview not found'}), 404
        
        interview.status = new_status
        db.session.commit()
        
        return jsonify({
            'message': f'Status updated to {new_status}',
            'interview': interview.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update status: {str(e)}'}), 500

@hr_bp.route('/questions', methods=['GET'])
@jwt_required()
@require_hr_role()
def get_questions():
    """Get questions with optional category filter"""
    try:
        category_filter = request.args.get('category', '').lower()
        
        query = Question.query
        if category_filter and category_filter in ['hr', 'technical']:
            query = query.filter(Question.category == category_filter)
        
        questions = query.order_by(Question.created_at.desc()).all()
        questions_data = [q.to_dict() for q in questions]
        
        return jsonify(questions_data), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch questions: {str(e)}'}), 500

@hr_bp.route('/questions', methods=['POST'])
@jwt_required()
@require_hr_role()
@limiter.limit("30 per minute")
def create_question():
    """Create a new interview question"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ['text', 'category', 'difficulty']):
            return jsonify({'error': 'Text, category, and difficulty are required'}), 400
        
        text = data['text'].strip()
        category = data['category'].lower()
        difficulty = data['difficulty']
        
        if not text:
            return jsonify({'error': 'Question text cannot be empty'}), 400
        
        if category not in ['hr', 'technical']:
            return jsonify({'error': 'Category must be "hr" or "technical"'}), 400
        
        if difficulty not in ['Easy', 'Medium', 'Hard']:
            return jsonify({'error': 'Difficulty must be "Easy", "Medium", or "Hard"'}), 400
        
        # Get current user
        user_id = int(get_jwt_identity())
        
        # Create question
        question = Question(
            text=text,
            category=category,
            difficulty=difficulty,
            created_by=user_id
        )
        
        db.session.add(question)
        db.session.commit()
        
        return jsonify({
            'message': 'Question created successfully',
            'question': question.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to create question: {str(e)}'}), 500

@hr_bp.route('/questions/<int:question_id>', methods=['PUT'])
@jwt_required()
@require_hr_role()
def update_question(question_id):
    """Update an existing question"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ['text', 'category', 'difficulty']):
            return jsonify({'error': 'Text, category, and difficulty are required'}), 400
        
        text = data['text'].strip()
        category = data['category'].lower()
        difficulty = data['difficulty']
        
        if not text:
            return jsonify({'error': 'Question text cannot be empty'}), 400
        
        if category not in ['hr', 'technical']:
            return jsonify({'error': 'Category must be "hr" or "technical"'}), 400
        
        if difficulty not in ['Easy', 'Medium', 'Hard']:
            return jsonify({'error': 'Difficulty must be "Easy", "Medium", or "Hard"'}), 400
        
        # Find and update question
        question = Question.query.get(question_id)
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        question.text = text
        question.category = category
        question.difficulty = difficulty
        
        db.session.commit()
        
        return jsonify({
            'message': 'Question updated successfully',
            'question': question.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update question: {str(e)}'}), 500

@hr_bp.route('/questions/<int:question_id>', methods=['DELETE'])
@jwt_required()
@require_hr_role()
def delete_question(question_id):
    """Delete a question"""
    try:
        question = Question.query.get(question_id)
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        db.session.delete(question)
        db.session.commit()
        
        return jsonify({'message': 'Question deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete question: {str(e)}'}), 500