# backend/app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv

# .env फाइलमधून API key वाचतो
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# frontend ला backend शी बोलता यावं म्हणून CORS allow केलं आहे
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")

    if not user_message:
        return {"reply": "काहीतरी मजकूर टाका."}

    # OpenAI ChatGPT API call
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",   # इथे GPT model वापरलाय
        messages=[
            {"role": "system", "content": "तू एक helpful assistant आहेस."},
            {"role": "user", "content": user_message}
        ]
    )

    reply = response["choices"][0]["message"]["content"]
    return {"reply": reply}

