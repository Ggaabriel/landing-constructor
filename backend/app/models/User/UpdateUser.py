from pydantic import BaseModel
from typing import Optional


class UpdateUser(BaseModel):
    phone_number: Optional[str] = None
    birthday: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    status: Optional[str] = None
    bio: Optional[str] = None
