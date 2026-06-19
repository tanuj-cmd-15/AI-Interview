"""
Database initialization script
Run this once to create the database tables
"""
from app_auth import app, db

if __name__ == '__main__':
    with app.app_context():
        # Drop all tables (use with caution!)
        # db.drop_all()
        
        # Create all tables
        db.create_all()
        print("✓ Database tables created successfully!")
        print(f"✓ Database location: {app.config['SQLALCHEMY_DATABASE_URI']}")
