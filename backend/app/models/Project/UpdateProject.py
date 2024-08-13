from pydantic import BaseModel
from typing import Optional


class UpdateProject(BaseModel):
    title: Optional[str] = None
    goal: Optional[str] = None
    slogan: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[list[str]] = None
