from pydantic import BaseModel


class NewUser(BaseModel):
    phone_number: str
    birthday: str
    first_name: str
    last_name: str
    status: str
    bio: str
