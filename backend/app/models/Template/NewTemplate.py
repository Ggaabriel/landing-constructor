from pydantic import BaseModel
from .. import ProcedureBackground
from .. import BackgroundType


class NewTemplate(BaseModel):
    name: str
    background_color: str
    text_color: str
    text_align: str
    scheme: str
    background_type: BackgroundType
    procedure_background: ProcedureBackground = ProcedureBackground.default()
