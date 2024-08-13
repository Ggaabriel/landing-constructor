import os
import pprint
import uuid
import requests
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, RedirectResponse
from pymongo.results import UpdateResult
from app.database import users_collection, projects_collection
from app.models import (
    TelegramID,
    ProjectID,
    NewUser,
    User,
    UpdateUser,
    NewProject,
    Project,
)

router = APIRouter(prefix="/user")


@router.get(
    "/{telegramID}",
    tags=["User"],
    description="Return user by its telegramID. If user not exist raises 400 error",
)
async def get_user(telegramID: TelegramID) -> User:
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    return User(**user)


@router.post(
    "/{telegramID}",
    tags=["User"],
    description="Creates new user by telegramID. If user exists return 400 error",
)
async def post_user(telegramID: TelegramID, user: NewUser) -> None:
    if users_collection.find_one({"telegramID": telegramID}) is not None:
        raise HTTPException(status_code=400, detail="User exist")
    user = User(**user.model_dump(), projects=[], telegramID=telegramID)
    users_collection.insert_one(user.model_dump())
    TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    try:
        user_id = int(telegramID)
    except ValueError:
        return print("TelegramImage: User's id MUST be integer")
    response = requests.get(
        f"https://api.telegram.org/bot{TOKEN}/getUserProfilePhotos",
        data={"user_id": user_id},
    )
    if response.status_code != 200:
        return print(f"TelegramImage: {response.json()['description']}")
    file_id = response.json()["result"]["photos"][0][0]["file_id"]
    response = requests.get(
        f"https://api.telegram.org/bot{TOKEN}/getFile",
        data={"file_id": file_id},
    )
    if response.status_code != 200:
        return print(f"TelegramImage: {response.json()['description']}")
    file_path = response.json()["result"]["file_path"]
    file_url = f"https://api.telegram.org/file/bot{TOKEN}/{file_path}"
    response = requests.get(file_url)
    if response.status_code != 200:
        return print("TelegramImage: Can't get image from Telegram")
    with open(f"app/images/{telegramID}", "wb") as f:
        f.write(response.content)


@router.patch(
    "/{telegramID}",
    tags=["User"],
    description="Updates user's properties with only provided fields. If field is not provided its value not updates. If user not exist raises 400 error",
)
async def patch_user(telegramID: TelegramID, updates: UpdateUser) -> None:
    result: UpdateResult = users_collection.update_one(
        {"telegramID": telegramID}, {"$set": updates.model_dump(exclude_none=True)}
    )
    if result.matched_count < 1:
        raise HTTPException(status_code=400, detail="User not exist")


@router.post(
    "/{telegramID}/image",
    tags=["User"],
    description="Replace old user's image with new if exist. If image is not png or jpeg raises 400 error. If user not exist raises 400 error",
)
async def post_user_image(telegramID: TelegramID, file: UploadFile = File()) -> None:
    if file.content_type not in ("image/png", "image/jpeg"):
        raise HTTPException(status_code=400, detail="Image must be in png format")
    user = users_collection.find_one({"telegramID": telegramID})
    if user is None:
        raise HTTPException(status_code=400, detail="User not exist")
    file.filename = f"{telegramID}"
    contents = await file.read()
    with open(f"app/images/{file.filename}", "wb") as f:
        f.write(contents)


@router.get(
    "/{telegramID}/image",
    tags=["User"],
    description="Return user's image. If user not exist raises 400 error. If image not exist returns default image",
)
async def get_user_image(telegramID: TelegramID) -> FileResponse:
    if users_collection.find_one({"telegramID": telegramID}) is None:
        raise HTTPException(status_code=400, detail="User not exist")
    path = f"app/images/{telegramID}"
    if os.path.exists(path):
        return FileResponse(path, media_type="image/png")
    return FileResponse("app/placeholders/user.png", media_type="image/png")


@router.post(
    "/{telegramID}/project",
    tags=["User", "Project"],
    description="Creates new project for user by telegramID. If user not exist raise 400 error.",
)
async def post_user_project(telegramID: TelegramID, project: NewProject) -> ProjectID:
    projectID = str(uuid.uuid4())
    reuslt: UpdateResult = users_collection.update_one(
        {"telegramID": telegramID}, {"$push": {"projects": projectID}}
    )
    if reuslt.matched_count < 1:
        raise HTTPException(status_code=400, detail="User not exist")
    project = Project(
        **project.model_dump(), ID=projectID, templates=[], owner=telegramID
    )
    projects_collection.insert_one(project.model_dump())
    return projectID
