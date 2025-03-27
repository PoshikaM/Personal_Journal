from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this to a secure secret
jwt = JWTManager(app)

# MongoDB Connection
client = MongoClient("mongodb+srv://poshikam:journal@cluster0.lpjlf9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["journal_app"]
users = db["users"]
entries = db["entries"]

# User Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "Email already exists"}), 400
    
    hashed_pw = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
    users.insert_one({"email": data["email"], "password": hashed_pw})
    return jsonify({"message": "User created successfully"}), 201

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})

    if user and bcrypt.checkpw(data["password"].encode("utf-8"), user["password"]):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({"token": access_token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Create Journal Entry
@app.route("/entries", methods=["POST"])
@jwt_required()
def create_entry():
    data = request.json
    user_id = get_jwt_identity()
    entry = {"user_id": user_id, "title": data["title"], "date": data["date"], "content": data["content"]}
    result = entries.insert_one(entry)
    return jsonify({"message": "Entry added", "entry_id": str(result.inserted_id)}), 201

# Get Journal Entries
@app.route("/entries", methods=["GET"])
@jwt_required()
def get_entries():
    user_id = get_jwt_identity()
    user_entries = list(entries.find({"user_id": user_id}, {"_id": 1, "title": 1, "date": 1, "content": 1}))
    for entry in user_entries:
        entry["_id"] = str(entry["_id"])
    return jsonify(user_entries), 200

# Update Journal Entry
@app.route("/entries/<entry_id>", methods=["PUT"])
@jwt_required()
def update_entry(entry_id):
    data = request.json
    result = entries.update_one({"_id": ObjectId(entry_id)}, {"$set": data})
    if result.modified_count == 0:
        return jsonify({"message": "No changes made"}), 400
    return jsonify({"message": "Entry updated"}), 200

# Delete Journal Entry
@app.route("/entries/<entry_id>", methods=["DELETE"])
@jwt_required()
def delete_entry(entry_id):
    result = entries.delete_one({"_id": ObjectId(entry_id)})
    if result.deleted_count == 0:
        return jsonify({"message": "Entry not found"}), 404
    return jsonify({"message": "Entry deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)