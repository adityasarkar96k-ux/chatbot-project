from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import openai

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/chat")
async def chat(request: dict):
    user_message = request.get("message")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",   # free वापरत असशील तर HuggingFace API वापर
        messages=[{"role": "user", "content": user_message}]
    )

    return {"reply": response["choices"][0]["message"]["content"]}
