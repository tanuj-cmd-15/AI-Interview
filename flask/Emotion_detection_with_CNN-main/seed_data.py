"""
⚠ DEV-ONLY SEED SCRIPT — DO NOT RUN IN PRODUCTION ⚠

Creates sample users, interview results, and questions so the
StudentDashboard and HrDashboard can be tested against real data.

Usage:
    cd flask/Emotion_detection_with_CNN-main
    python seed_data.py

After running, use the printed credentials to log in via the frontend.
"""
import sys
import os
from datetime import datetime, timedelta

# Ensure the script can import project modules
sys.path.insert(0, os.path.dirname(__file__))

from app_auth import app
from extensions import db, bcrypt
from models.user import User
from models.interview import Interview
from models.question import Question


def seed():
    with app.app_context():
        # Ensure all tables exist (creates Interview/Question tables if missing)
        db.create_all()

        # ── Wipe previous seed data (idempotent) ──────────────────────────
        print("[*] Clearing existing seed data...")
        Interview.query.delete()
        Question.query.delete()
        # Only delete test-seeded users (by known emails)
        seed_emails = [
            'student1@test.com',
            'student2@test.com',
            'student3@test.com',
            'hr@test.com',
        ]
        User.query.filter(User.email.in_(seed_emails)).delete()
        db.session.commit()

        # ── Create users ──────────────────────────────────────────────────
        print("[*] Creating users...")
        password = 'Password1'  # Meets validation: >= 8 chars + 1 digit

        students = []
        for i, (name, email) in enumerate([
            ('Aarav Sharma', 'student1@test.com'),
            ('Priya Nair', 'student2@test.com'),
            ('Rahul Mehta', 'student3@test.com'),
        ], start=1):
            user = User(
                email=email,
                password_hash=bcrypt.generate_password_hash(password).decode('utf-8'),
                name=name,
                role='student',
                auth_provider='local',
            )
            db.session.add(user)
            students.append(user)

        hr_user = User(
            email='hr@test.com',
            password_hash=bcrypt.generate_password_hash(password).decode('utf-8'),
            name='HR Manager',
            role='hr',
            auth_provider='local',
        )
        db.session.add(hr_user)
        db.session.commit()  # Commit so user IDs are assigned

        # ── Create interview results ──────────────────────────────────────
        print("[*] Creating interview results...")
        now = datetime.utcnow()
        interviews_data = [
            # student1 -- 2 interviews
            {
                'candidate_id': students[0].id,
                'interview_type': 'hr',
                'score': 82,
                'feedback_summary': 'Strong candidate with good interpersonal skills. Clear STAR-method answers. Recommended for next round.',
                'status': 'reviewed',
                'created_at': now - timedelta(days=2),
            },
            {
                'candidate_id': students[0].id,
                'interview_type': 'technical',
                'score': 75,
                'feedback_summary': 'Solid data structures knowledge. Clean code style. Algorithm complexity analysis needs work.',
                'status': 'pending_review',
                'created_at': now - timedelta(days=1),
            },
            # student2 -- 2 interviews
            {
                'candidate_id': students[1].id,
                'interview_type': 'technical',
                'score': 91,
                'feedback_summary': 'Exceptional problem-solving. Well-structured code. Strong system design understanding.',
                'status': 'reviewed',
                'created_at': now - timedelta(days=3),
            },
            {
                'candidate_id': students[1].id,
                'interview_type': 'hr',
                'score': 68,
                'feedback_summary': 'Average communication skills. Needs more practice with behavioral questions.',
                'status': 'pending_review',
                'created_at': now - timedelta(hours=12),
            },
            # student3 -- 1 interview
            {
                'candidate_id': students[2].id,
                'interview_type': 'hr',
                'score': 88,
                'feedback_summary': 'Excellent communication. Well-prepared answers. Strong culture fit.',
                'status': 'reviewed',
                'created_at': now - timedelta(days=5),
            },
        ]
        for data in interviews_data:
            db.session.add(Interview(**data))

        # ── Create questions ──────────────────────────────────────────────
        print("[*] Creating questions...")
        questions_data = [
            # HR questions
            {'text': 'Tell me about a time you handled a conflict with a teammate.', 'category': 'HR', 'difficulty': 'Medium', 'created_by': hr_user.id},
            {'text': 'Where do you see yourself in 5 years?', 'category': 'HR', 'difficulty': 'Easy', 'created_by': hr_user.id},
            {'text': 'Describe a project where you showed leadership.', 'category': 'HR', 'difficulty': 'Medium', 'created_by': hr_user.id},
            {'text': 'Why should we hire you over other candidates?', 'category': 'HR', 'difficulty': 'Hard', 'created_by': hr_user.id},
            # Technical questions
            {'text': 'Explain the difference between a stack and a queue.', 'category': 'Technical', 'difficulty': 'Easy', 'created_by': hr_user.id},
            {'text': 'How would you design a URL shortener like bit.ly?', 'category': 'Technical', 'difficulty': 'Hard', 'created_by': hr_user.id},
            {'text': 'What is the time complexity of quicksort in the worst case?', 'category': 'Technical', 'difficulty': 'Medium', 'created_by': hr_user.id},
            {'text': 'Explain the CAP theorem and its implications for distributed systems.', 'category': 'Technical', 'difficulty': 'Hard', 'created_by': hr_user.id},
        ]
        for data in questions_data:
            db.session.add(Question(**data))

        db.session.commit()

        # ── Summary ───────────────────────────────────────────────────────
        print()
        print("=" * 60)
        print("[OK] Seed data created successfully!")
        print("=" * 60)
        print()
        print("TEST CREDENTIALS (password for all: Password1)")
        print("-" * 60)
        print("  Student 1:  student1@test.com  (Aarav Sharma)   -- 2 interviews")
        print("  Student 2:  student2@test.com  (Priya Nair)     -- 2 interviews")
        print("  Student 3:  student3@test.com  (Rahul Mehta)    -- 1 interview")
        print(f"  HR User:    hr@test.com        (HR Manager)")
        print("-" * 60)
        print(f"  Interviews created: {len(interviews_data)}")
        print(f"  Questions created:  {len(questions_data)}")
        print("=" * 60)


if __name__ == '__main__':
    seed()
