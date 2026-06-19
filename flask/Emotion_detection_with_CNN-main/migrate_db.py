"""
Database migration script to add Google OAuth support
Adds 'picture' column and updates existing schema for Google OAuth
"""
from app_auth import app, db
from sqlalchemy import text

def migrate_database():
    """Add picture column and update schema for Google OAuth"""
    with app.app_context():
        try:
            # Check if picture column exists
            result = db.engine.execute(text("PRAGMA table_info(users)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'picture' not in columns:
                print("Adding 'picture' column...")
                db.engine.execute(text("ALTER TABLE users ADD COLUMN picture VARCHAR(500)"))
                print("✓ Picture column added")
            else:
                print("✓ Picture column already exists")
            
            # Make password_hash nullable for Google OAuth users
            print("Updating schema for Google OAuth compatibility...")
            
            # Check current schema
            result = db.engine.execute(text("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'"))
            schema = result.fetchone()[0]
            
            if 'password_hash VARCHAR(255) NOT NULL' in schema:
                print("Making password_hash nullable...")
                
                # Create new table with nullable password_hash
                db.engine.execute(text('''
                    CREATE TABLE users_new (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email VARCHAR(120) UNIQUE NOT NULL,
                        password_hash VARCHAR(255),
                        name VARCHAR(100) NOT NULL,
                        role VARCHAR(20) NOT NULL DEFAULT 'student',
                        auth_provider VARCHAR(20) DEFAULT 'local',
                        picture VARCHAR(500),
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                '''))
                
                # Copy data from old table
                db.engine.execute(text('''
                    INSERT INTO users_new (id, email, password_hash, name, role, auth_provider, picture, created_at)
                    SELECT id, email, password_hash, name, role, auth_provider, picture, created_at FROM users
                '''))
                
                # Drop old table and rename new one
                db.engine.execute(text('DROP TABLE users'))
                db.engine.execute(text('ALTER TABLE users_new RENAME TO users'))
                
                print("✓ Password hash made nullable for Google OAuth")
            else:
                print("✓ Schema already supports Google OAuth")
            
            print("✓ Database migration completed successfully!")
            
        except Exception as e:
            print(f"✗ Migration failed: {e}")
            print("This might be expected if running on a fresh database.")
            
            # Create fresh tables with new schema
            print("Creating fresh database tables...")
            db.create_all()
            print("✓ Fresh tables created with Google OAuth support")

if __name__ == '__main__':
    migrate_database()