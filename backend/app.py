import os
import openai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

# Load API key
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Make API call
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )

        # Extract response from OpenAI API
        ai_message = response['choices'][0]['message']['content']  # Correct response extraction

        return jsonify({"response": ai_message})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
