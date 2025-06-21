from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Allow CORS from all origins

@app.route("/health")
def health():
    return jsonify(status="ok")

@app.route("/api/message")
def message():
    return jsonify(message="Hello from backend!")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
