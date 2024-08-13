from pydantic import BaseModel
from .. import BackgroundType, ProcedureBackground


class NewModule(BaseModel):
    background_color: str
    header_text: str
    subheader_text: str
    text_align: str
    text_color: str
    background_type: BackgroundType
    procedure_background: ProcedureBackground = ProcedureBackground.default()
