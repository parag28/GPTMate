import os
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
from flask_cors import CORS
from openai import OpenAI, RateLimitError

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) 

app = Flask(__name__)
CORS(app)  

@app.route('/')
def home():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('../frontend', filename)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        print(f"User message: {user_message}")

        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {"role": "user", "content": user_message}
            ]
        )

        print("OpenAI Response:", response)

        ai_message = response.choices[0].message.content

        return jsonify({"response": ai_message})

    except RateLimitError as e:
        print(f"Quota exceeded: {e}")
        return jsonify({"error": "Quota exceeded. Please check your plan and try again later."}), 429

    except Exception as e:
        print(f"Error occurred: {e}")  
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # app.run(debug=False) 
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
 