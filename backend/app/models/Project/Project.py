from .. import ProjectID, TelegramID, TemplateID
from . import NewProject


class Project(NewProject):
    ID: ProjectID
    templates: list[TemplateID]
    owner: TelegramID
