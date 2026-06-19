import os
from models.user import db

def init_db(app):
    """Initialize database with app"""
    # Get database URL from environment or use default SQLite
    database_url = os.getenv('DATABASE_URL', 'sqlite:///ai_interview.db')
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize db with app
    db.init_app(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
        print(f"✓ Database initialized: {database_url}")
    
    return db
