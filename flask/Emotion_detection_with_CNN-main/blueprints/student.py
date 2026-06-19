"""Student endpoints for dashboard data"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from extensions import db
from models.user import User
from models.interview import Interview

student_bp = Blueprint('student', __name__, url_prefix='/api/student')

@student_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_student_stats():
    """Get student dashboard statistics"""
    try:
        # Get current user
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get interview statistics
        interviews = Interview.query.filter_by(candidate_id=user_id).all()
        
        interviews_completed = len(interviews)
        average_score = round(sum(i.score for i in interviews) / len(interviews)) if interviews else 0
        last_activity = max(i.created_at for i in interviews).isoformat() if interviews else None
        
        return jsonify({
            'interviews_completed': interviews_completed,
            'average_score': average_score,
            'last_activity': last_activity
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch student stats: {str(e)}'}), 500

@student_bp.route('/recent-activity', methods=['GET'])
@jwt_required()
def get_recent_activity():
    """Get student's recent interview activity"""
    try:
        # Get current user
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get recent interviews (limit to last 10)
        recent_interviews = Interview.query.filter_by(candidate_id=user_id)\
                                         .order_by(Interview.created_at.desc())\
                                         .limit(10)\
                                         .all()
        
        activity_data = [interview.to_dict() for interview in recent_interviews]
        
        return jsonify(activity_data), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to fetch recent activity: {str(e)}'}), 500