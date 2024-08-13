from pydantic import BaseModel
from typing import Optional
from .. import BackgroundType, UpdateProcedureBackground


class UpdateModule(BaseModel):
    background_color: Optional[str] = None
    header_text: Optional[str] = None
    subheader_text: Optional[str] = None
    text_align: Optional[str] = None
    text_color: Optional[str] = None
    background_type: Optional[BackgroundType] = None
    procedure_background: Optional[UpdateProcedureBackground] = None
