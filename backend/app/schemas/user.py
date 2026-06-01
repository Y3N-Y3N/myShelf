from pydantic import BaseModel, EmailStr

# payload from frontend
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# payload from backend to frontend
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True