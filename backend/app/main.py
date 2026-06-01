from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import books, saved_books
from app.database.database import Base, engine
from app.models import user, savedBooks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "MyShelf backend is running yipee"}

app.include_router(books.router)
app.include_router(saved_books.router)
Base.metadata.create_all(bind=engine)