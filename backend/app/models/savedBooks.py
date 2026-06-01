from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
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

    # status = saved, reading, finished
    status = Column(String, default="saved")  
    rating = Column(Integer, nullable=True)

    user = relationship(
        "User",
        back_populates="saved_books"
    )