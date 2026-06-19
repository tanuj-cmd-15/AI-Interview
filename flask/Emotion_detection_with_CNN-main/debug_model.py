from models.user import User
from extensions import db
from app_auth import app
from sqlalchemy import text

print('User model columns:')
for column in User.__table__.columns:
    print(f'  {column.name}: {column.type}')

with app.app_context():
    db.drop_all()
    db.create_all()
    print('\nTables recreated successfully!')
    
    # Check tables exist using SQLAlchemy 2.0 syntax
    with db.engine.connect() as conn:
        result = conn.execute(text('SELECT name FROM sqlite_master WHERE type="table"'))
        tables = [row[0] for row in result]
        print('Tables:', tables)
        
        if 'users' in tables:
            schema = conn.execute(text('PRAGMA table_info(users)'))
            print('\nUsers table schema:')
            for row in schema:
                print(f'  {row}')