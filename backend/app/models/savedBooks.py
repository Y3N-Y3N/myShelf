from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.database import Base

# a table of books saved from the API
class SavedBook(Base):
    __tablename__ = "saved_books"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    external_id = Column(String, index=True)

    title = Column(String)
    author = Column(String)
    cover_url = Column(String, nullable=True)

    status = Column(String, default="saved")  # saved, reading, finished
    rating = Column(Integer, nullable=True)