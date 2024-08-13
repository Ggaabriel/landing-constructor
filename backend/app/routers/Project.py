import os
import uuid
from xml.dom import minidom
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from pymongo.results import UpdateResult
from app.database import (
    projects_collection,
    users_collection,
    templates_collection,
    modules_collection,
)
from app.models import (
    ProjectID,
    TemplateID,
    UpdateProject,
    Project,
    User,
    NewTemplate,
    Template,
)

router = APIRouter(prefix="/project")


@router.get(
    "/{projectID}",
    tags=["Project"],
    description="Get project by id. If project not exist raises 400 error",
)
async def get_project(projectID: ProjectID) -> Project:
    project = projects_collection.find_one({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    return project


@router.patch(
    "/{projectID}",
    tags=["Project"],
    description="Updates project properties with only provided fields. If field is not provided its value not updates. If project not exist raises 400 error",
)
async def patch_project(projectID: ProjectID, updates: UpdateProject) -> None:
    result: UpdateResult = projects_collection.update_one(
        {"ID": projectID}, {"$set": updates.model_dump(exclude_none=True)}
    )
    if result.matched_count < 1:
        raise HTTPException(status_code=400, detail="Project not exist")


@router.delete(
    "/{projectID}",
    tags=["Project"],
    description="Deletes project by id and all contained templates and modules. If project not exist raises 400 error",
)
async def delete_project(projectID: ProjectID) -> None:
    project = projects_collection.find_one_and_delete({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    project = Project(**project)
    user = users_collection.find_one_and_delete({"telegramID": project.owner})
    if user is not None:
        user = User(**user)
        user.projects.remove(project.ID)
        users_collection.insert_one(user.model_dump())
    for templateID in project.templates:
        template = templates_collection.find_one_and_delete({"ID": templateID})
        template = Template(**template)
        for moduleID in template.modules:
            modules_collection.delete_one({"ID": moduleID})


@router.post(
    "/{projectID}/logo",
    tags=["Project"],
    description="Replace old logo with new if exist. If image is not svg raises 400 error. If svg width or height size > 100 raises 400 error. If project not exist raises 400 error",
)
async def post_project_logo(projectID: ProjectID, file: UploadFile = File()) -> None:
    if file.content_type != "image/svg+xml":
        raise HTTPException(status_code=400, detail="Image must be in svg format")
    project = projects_collection.find_one({"ID": projectID})
    if project is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    file.filename = f"{projectID}"
    contents = await file.read()
    attributes = (
        minidom.parseString(contents.decode()).getElementsByTagName("svg")[0].attributes
    )
    width, height = map(
        lambda x: int(x.replace("px", "")),
        (attributes["width"].value, attributes["height"].value),
    )
    if width > 0 or height > 0:
        raise HTTPException(
            status_code=400,
            detail=f"svg width and height must be <= 100 ({width}x{height} was given)",
        )
    with open(f"app/images/{file.filename}", "wb") as f:
        f.write(contents)


@router.get(
    "/{projectID}/logo",
    tags=["Project"],
    description="Return logo for project. If project not exist raises 400 error. If logo not exist raises 404 error",
)
async def get_project_logo(projectID: ProjectID) -> FileResponse:
    if projects_collection.find_one({"ID": projectID}) is None:
        raise HTTPException(status_code=400, detail="Project not exist")
    path = f"app/images/{projectID}"
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Logo not exist")
    return FileResponse(path, media_type="image/svg+xml")


@router.post(
    "/{projectID}/template",
    tags=["Project", "Template"],
    description="Creates new template for project. If project not exist raises 400 error",
)
async def post_project_template(
    projectID: ProjectID, template: NewTemplate
) -> TemplateID:
    templateID = str(uuid.uuid4())
    result: UpdateResult = projects_collection.update_one(
        {"ID": projectID}, {"$push": {"templates": templateID}}
    )
    if result.matched_count < 1:
        raise HTTPException(status_code=400, detail="Project not exist")
    template = Template(
        **template.model_dump(), ID=templateID, modules=[], project=projectID
    )
    templates_collection.insert_one(template.model_dump())
    return templateID
