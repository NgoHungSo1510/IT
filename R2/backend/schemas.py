from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# Review Schemas
class ReviewBase(BaseModel):
    reviewer_name: Optional[str] = "Anonymous"
    rating: int
    content: str

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    book_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Book Schemas
class BookBase(BaseModel):
    title: str
    author: str
    description: Optional[str] = None
    cover_url: Optional[str] = None

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    created_at: datetime
    reviews: List[Review] = []

    model_config = ConfigDict(from_attributes=True)