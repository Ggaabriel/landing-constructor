from typing import Optional
from pydantic import BaseModel


class UpdateProcedureBackground(BaseModel):
    background_color: Optional[str] = None
    color: Optional[str] = None
    count: Optional[int] = None
    blur: Optional[int] = None
    speed: Optional[int] = None
