from flask import Flask, render_template, request, redirect, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_pymongo import PyMongo
import random
import difflib
import os

# Initialize app and configure CORS and SocketIO
app = Flask(__name__, static_url_path="/static")
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# MongoDB setup (optional - will work without it)
try:
    app.config["MONGO_URI"] = "mongodb+srv://harsh0801004:8857090609@harshkoshti.b208der.mongodb.net/ai_interview?retryWrites=true&w=majority&appName=harshkoshti"
    mongo = PyMongo(app)
    user_collection = mongo.db.userData
    print("✓ MongoDB connected successfully")
except Exception as e:
    print(f"⚠ MongoDB connection failed: {e}")
    print("⚠ App will run without database (feedback won't be saved)")
    user_collection = None

# Predefined correct answers for the HR questions
predefined_answers = {
    "Tell me about yourself.": "I am a software engineer with a background in .... and ..... development, and I have hands-on experience with frameworks like .... . I'm passionate about creating efficient, scalable systems and enjoy solving complex technical challenges. In my last role, TELL ABOUT YOUR PROJECTS HERE. I'm always eager to expand my knowledge in emerging technologies, and I'm excited about the opportunity to contribute my skills to a team that values innovation and collaboration.  You can also include your hobbies,some other experiences,etc.  NOTE: Keep a bit longer, around 60-90 seconds. Cover your professional background, relevant skills, and what you're aiming for in your next role ",
    "Where do you see yourself in next five years?": "In five years, I see myself taking on a senior role within the tech team, perhaps leading projects that involve emerging technologies like AI or machine learning. My goal is to advance both my technical and leadership skills, becoming someone the team can rely on for innovative solutions and mentorship. I hope to be someone who not only drives the company's technical success but also inspires and empowers my team to reach new heights.  NOTE: Aim for 45-60 seconds. Long enough to outline your goals, but brief enough to keep it engaging.",
    "What are your greatest strengths?": "My greatest strengths include a strong aptitude for problem-solving, adaptability to new technologies, and a collaborative approach to teamwork. I excel at breaking down complex issues, developing efficient solutions, and staying updated with the latest industry trends. Being a team player, I actively contribute to group discussions and ensure that we work towards solutions that are both technically sound and aligned with business goals.  NOTE:Around 45-60 seconds. Mention 2-3 key strengths and give a brief example if possible.",
    "What is your greatest weakness?": "One of my weaknesses is that I sometimes get deeply focused on perfecting technical details, which can impact time management on larger projects. However, I've been addressing this by prioritizing tasks based on their impact and learning to balance thoroughness with deadlines. I'm consistently working on improving my time management skills to ensure that I deliver high-quality work efficiently. NOTE: Keep it to 30-45 seconds. Be honest but solution-focused, showing that you're actively working to improve. ",
    "Why do you want to work here?": "I want to work here because your company is at the forefront of technological innovation and places a high value on continuous learning and growth. I'm inspired by the projects your team is working on, especially in areas like cloud computing and AI, which align with my career interests. I believe that working here will allow me to apply my skills in a meaningful way while also offering opportunities to deepen my expertise in cutting-edge technology.  NOTE: 45-60 seconds. Highlight what excites you about the company and how it aligns with your skills and goals."
}

total_len = len(predefined_answers)
users = {}

# Function to compare answers and provide feedback
def compare_answers(user_answer, correct_answer):
    similarity = difflib.SequenceMatcher(None, user_answer, correct_answer).ratio() * 100
    return f"Your answer is good but can be improved. Suggested response: {correct_answer}" if similarity < 90 else "Your answer is well-formed and relevant."

@socketio.on('image_frame')
def handle_image_frame(data):
    # Simplified version - just emit neutral emotion
    emit('emotion_result', {"detected_faces": 1, "emotions": ["Neutral"]})

@socketio.on('send_transcript')
def handle_transcript(data):
    question = data['hrQuestion']
    user_answer = data['transcript']
    correct_answer = predefined_answers.get(question)
    feedback = compare_answers(user_answer, correct_answer) if correct_answer else "No predefined answer available."
    print(feedback)

    socketio.emit('transcript_feedback', {"feedback": feedback})

    userId = data.get('userId')
    if user_collection and userId:
        try:
            newObject = {"$push": {"hrQuestions": {question: feedback}}}
            result = user_collection.find_one_and_update({'userId': userId}, newObject)
        except Exception as e:
            print(f"Database error: {e}")

@socketio.on('request_question')
def send_random_question(data):
    try:
        userId = data.get('userId', 'default')
       
        if userId in users:
            if users[userId] == total_len - 1:
                users[userId] = 0
            else:
                users[userId] += 1
        else:
            if user_collection:
                try:
                    newObject = {"$set": {"hrQuestions": []}}
                    result = user_collection.find_one_and_update({'userId': userId}, newObject)
                except Exception as e:
                    print(f"Database error: {e}")
            users[userId] = 0
        
        question_index = min(users[userId], total_len - 1)
        keys_list = list(predefined_answers.keys())
        question = keys_list[question_index]
        
        socketio.emit('new_question', {'question': question})
    
    except KeyError:
        print("Error: 'userId' not found in data.")
    except Exception as e:
        print(f"Unexpected error: {e}")

@app.route('/')
def run():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    try:
        user = user_collection.find_one({'email': email})
        if user and user.get('password') == password:
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'userId': str(user['_id']),
                'name': user.get('name', 'User')
            })
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    try:
        existing_user = user_collection.find_one({'email': email})
        if existing_user:
            return jsonify({'success': False, 'message': 'Email already registered'}), 400
        
        user_data = {
            'name': name,
            'email': email,
            'password': password,
            'hrQuestions': [],
            'emotion': {
                'Angry': 0,
                'Fearful': 0,
                'Happy': 0,
                'Neutral': 0,
                'Sad': 0,
                'Surprised': 0
            }
        }
        
        result = user_collection.insert_one(user_data)
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'userId': str(result.inserted_id)
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# ATS Routes
UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {"pdf", "docx"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    role = request.form.get("role", "Software Engineer")
    
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    
    if file and allowed_file(file.filename):
        filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
        file.save(filename)
        
        # Simplified response without ATS processing
        return render_template(
            "result.html",
            final=75,
            struct="80%",
            hsp="70%",
            ssp="75%",
            wcp="80%",
            sections=["Contact", "Education", "Experience", "Skills"],
            match_hard=["Python", "JavaScript", "React"],
            missing_hard=["Docker", "Kubernetes"],
            match_soft=["Communication", "Leadership"],
            missing_soft=["Public Speaking"],
            word_count=450,
            pdfFileName=file.filename,
            corrections=[]
        )
    else:
        return "Invalid file format! Allowed formats: pdf, docx"

if __name__ == '__main__':
    print("=" * 60)
    print("AI Interview Platform - Backend Server")
    print("=" * 60)
    print("Note: Emotion detection is disabled (requires TensorFlow)")
    print("Server running on: http://localhost:5000")
    print("=" * 60)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
