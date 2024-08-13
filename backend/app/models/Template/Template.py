from .. import ModuleID, ProjectID, TemplateID
from . import NewTemplate


class Template(NewTemplate):
    ID: TemplateID
    modules: list[ModuleID]
    project: ProjectID
