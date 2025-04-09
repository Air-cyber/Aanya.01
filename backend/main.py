from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import base64
import os
import shutil

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.post("/analyze")
async def analyze(text: str = Form(""), image: UploadFile = File(None)):
    image_data = None
    mime_type = None

    try:
        # Read image if provided
        if image:
            temp_path = f"temp_{image.filename}"
            with open(temp_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            with open(temp_path, "rb") as f:
                image_data = base64.b64encode(f.read()).decode("utf-8")
                mime_type = image.content_type

            os.remove(temp_path)

        # Choose the model
        model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

        if image_data:
            response = model.generate_content(
                contents=[
                    {
                        "parts": [
                            {"text": text},
                            {
                                "inline_data": {
                                    "mime_type": mime_type,
                                    "data": image_data,
                                },
                            },
                        ]
                    }
                ]
            )
        else:
            response = model.generate_content(
                contents=[
                    {
                        "parts": [{"text": text}]
                    }
                ]
            )

        result = (
            response.candidates[0].content.parts[0].text
            if response.candidates and response.candidates[0].content.parts
            else "No response"
        )
        return JSONResponse(content={"response": result})

    except Exception as e:
        print("Gemini Error:", e)
        raise HTTPException(status_code=500, detail="Something went wrong!")

