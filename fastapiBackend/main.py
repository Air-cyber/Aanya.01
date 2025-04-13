from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI()

# Setup CORS - adjust origins as needed for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Add exact React origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"[{request.method}] {request.url}")
    return await call_next(request)

# Root test route
@app.get("/")
async def home():
    return {"message": "Welcome to Aanya"}

# Routers
from routers.teach_routes import router as teach_router
from routers.analyze_routes import router as analyze_router
from routers.questions import router as questions_router

app.include_router(teach_router, prefix="/api/teach", tags=["Teach"])
app.include_router(analyze_router, prefix="/api", tags=["Analyze"])
app.include_router(questions_router, prefix="/api/questions", tags=["Questions"])
