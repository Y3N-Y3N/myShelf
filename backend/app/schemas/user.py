from pydantic import BaseModel, EmailStr

# payload from frontend to backend
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# login information given for validations
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# payload from backend to frontend
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True

# access info granted
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
