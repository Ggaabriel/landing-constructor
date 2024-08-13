from .. import ModuleID, TemplateID
from . import NewModule


class Module(NewModule):
    ID: ModuleID
    template: TemplateID
