from datetime import datetime
from extensions import db

class Interview(db.Model):
    """Interview/Result model for storing candidate interview data"""
    __tablename__ = 'interviews'
    
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    interview_type = db.Column(db.String(20), nullable=False)  # 'hr' or 'technical'
    score = db.Column(db.Integer, nullable=False)  # 0-100
    feedback_summary = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='pending_review')  # 'reviewed' or 'pending_review'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to User
    candidate = db.relationship('User', backref='interviews')
    
    def to_dict(self):
        """Convert interview to dictionary"""
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'name': self.candidate.name if self.candidate else 'Unknown',
            'interview_type': self.interview_type,
            'score': self.score,
            'feedback_summary': self.feedback_summary,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<Interview {self.id}: {self.interview_type} for {self.candidate_id}>'