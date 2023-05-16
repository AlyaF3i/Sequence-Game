from dotenv import load_dotenv
import os 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import uuid
import sqlite3

load_dotenv()
DATABASE_PATH = os.getenv('DATABASE_PATH', './sequence_database.db')

# Connect to database
conn = sqlite3.connect(DATABASE_PATH)

# Define User model
class User(BaseModel):
    name: str
    port: int 
    ip: str

# Create FastAPI app
app = FastAPI()
origins = [
  "*"
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define endpoint to create user and return session ID
@app.post("/create_user/")
async def create_user(user: User):
    # Generate session ID
    name = user.name.lower()
    cursor = conn.execute("SELECT Session_Id FROM User WHERE LOWER(Username)=?", (user.name,))
    existing_user = cursor.fetchone()

    if existing_user:
        raise HTTPException(status_code=400, detail=f"User already exists with this username {name}")
    
    session_id = str(uuid.uuid4())

    # Insert user into User table
    conn.execute("INSERT INTO User (Session_Id, Username, Is_Bot, IP, Port) VALUES (?, ?, ?, ?, ?)",
                 (session_id, user.name, False, user.ip, user.port))

    # Commit changes to database
    conn.commit()

    # Close database connection
    conn.close()

    # Return session ID as JSON
    return {"session_id": session_id}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


