from pydantic import BaseModel


class ProcedureBackground(BaseModel):
    background_color: str
    color: str
    count: int
    blur: int
    speed: int

    @classmethod
    def default(cls) -> "ProcedureBackground":
        return cls(
            background_color="#ffffff", color="#000000", count=3, blur=5, speed=2
        )
