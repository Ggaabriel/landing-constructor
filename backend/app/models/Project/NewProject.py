from pydantic import BaseModel


class NewProject(BaseModel):
    title: str
    goal: str
    slogan: str
    description: str
    tags: list[str]
