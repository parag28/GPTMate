

# **GPTMate**  
*A friendly AI chat companion.*  

🚀 **Live Demo**: [GPTMate on Render](https://gptmate-1.onrender.com/)  

## **Overview**  
GPTMate is a lightweight AI-powered chatbot that provides intelligent responses using OpenAI’s GPT model. It is built with Flask for the backend and deployed on Render.  

## **Features**  
✅ Conversational AI powered by OpenAI  
✅ Lightweight and fast API response  
✅ Flask-based backend  
✅ Deployed and hosted on Render  

## **Tech Stack**  
- **Backend**: Python, Flask  
- **AI Model**: OpenAI API  
- **Deployment**: Render  

## **Setup & Installation**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/parag28/GPTMate.git
cd GPTMate
```

### **2. Create a Virtual Environment & Install Dependencies**  
```bash
python -m venv venv  
source venv/bin/activate  # On Windows: venv\Scripts\activate  
pip install -r requirements.txt  
```

### **3. Set Up Environment Variables**  
Create a `.env` file and add your OpenAI API key:  
```
OPENAI_API_KEY=your_api_key_here
```

### **4. Run the Application**  
```bash
python backend/app.py
```
The server will start at `http://127.0.0.1:5000`

## **Deployment on Render**  
GPTMate is deployed on [Render](https://render.com/). You can deploy it by:  
1. Creating a Render Web Service  
2. Connecting your GitHub repo  
3. Setting the start command:  
   ```bash
   python backend/app.py
   ```
4. Ensuring your environment variables are set  

## **Contributing**  
Feel free to open issues or submit pull requests to improve GPTMate!  

## **License**  
This project is open-source and available under the [MIT License](LICENSE).  

