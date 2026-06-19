from datetime import datetime
from extensions import db

class Question(db.Model):
    """Question model for interview question bank"""
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(20), nullable=False)  # 'hr' or 'technical'
    difficulty = db.Column(db.String(10), nullable=False, default='Medium')  # 'Easy', 'Medium', 'Hard'
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to User (who created the question)
    creator = db.relationship('User', backref='created_questions')
    
    def to_dict(self):
        """Convert question to dictionary"""
        return {
            'id': self.id,
            'text': self.text,
            'category': self.category.lower(),
            'difficulty': self.difficulty,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<Question {self.id}: {self.category} - {self.difficulty}>'