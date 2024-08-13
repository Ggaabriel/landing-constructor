import os
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from pymongo.results import UpdateResult
from app.models import ModuleID, Module, UpdateModule, Template
from app.database import modules_collection, templates_collection


router = APIRouter(prefix="/module")


@router.get(
    "/{moduleID}",
    tags=["Module"],
    description="Get module by id. If module not exist raises 400 error",
)
async def get_module(moduleID: ModuleID) -> Module:
    module = modules_collection.find_one({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    return module


@router.patch(
    "/{moduleID}",
    tags=["Module"],
    description="Updates module properties with only provided fields. If field is not provided its value not updates. If module not exist raises 400 error",
)
async def patch_module(moduleID: ModuleID, updates: UpdateModule) -> None:
    procedure_background_updates = {}
    if updates.procedure_background:
        for key, value in updates.procedure_background.model_dump(
            exclude_none=True
        ).items():
            procedure_background_updates[f"procedure_background.{key}"] = value
    result: UpdateResult = modules_collection.update_one(
        {"ID": moduleID},
        {
            "$set": {
                **updates.model_dump(
                    exclude_none=True,
                    exclude={"procedure_background"},
                ),
                **procedure_background_updates,
            },
        },
    )
    if result.matched_count < 1:
        raise HTTPException(status_code=400, detail="Module not exist")


@router.delete(
    "/{moduleID}",
    tags=["Module"],
    description="Deletes module by id. If module not exist raises 400 error",
)
async def delete_module(moduleID: ModuleID) -> None:
    module = modules_collection.find_one_and_delete({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    module = Module(**module)
    template = templates_collection.find_one_and_delete({"ID": module.template})
    if template is not None:
        template = Template(**template)
        template.modules.remove(module.ID)
        templates_collection.insert_one(template.model_dump())


@router.post(
    "/{moduleID}/image",
    tags=["Module"],
    description="Replace old module background image with new if exist. If image is not png or jpeg raises 400 error. If module not exist raises 400 error",
)
async def post_module_image(moduleID: ModuleID, file: UploadFile = File()) -> None:
    if file.content_type not in ("image/png", "image/jpeg"):
        raise HTTPException(status_code=400, detail="Image must be in png format")
    module = modules_collection.find_one({"ID": moduleID})
    if module is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    file.filename = f"{moduleID}"
    contents = await file.read()
    with open(f"app/images/{file.filename}", "wb") as f:
        f.write(contents)


@router.get(
    "/{moduleID}/image",
    tags=["Module"],
    description="Return module image. If module not exist raises 400 error. If image not exist raises 404 error",
)
async def get_module_image(moduleID: ModuleID) -> FileResponse:
    if modules_collection.find_one({"ID": moduleID}) is None:
        raise HTTPException(status_code=400, detail="Module not exist")
    path = f"app/images/{moduleID}"
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Module image not exist")
    return FileResponse(path, media_type="image/png")
