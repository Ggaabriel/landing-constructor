from pydantic import BaseModel
from typing import Optional
from .. import UpdateProcedureBackground
from .. import BackgroundType


class UpdateTemplate(BaseModel):
    name: Optional[str] = None
    background_color: Optional[str] = None
    text_color: Optional[str] = None
    text_align: Optional[str] = None
    scheme: Optional[str] = None
    background_type: Optional[BackgroundType] = None
    procedure_background: Optional[UpdateProcedureBackground] = None
