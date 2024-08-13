from .. import ProjectID, TelegramID
from . import NewUser


class User(NewUser):
    telegramID: TelegramID
    projects: list[ProjectID]
