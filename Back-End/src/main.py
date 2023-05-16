from dotenv import load_dotenv
import os 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
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



