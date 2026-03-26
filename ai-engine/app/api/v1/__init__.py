from fastapi import APIRouter
from .chat import router as chat_router
from .workflow import router as workflow_router

v1_router = APIRouter(prefix="/api/v1")
v1_router.include_router(chat_router)
v1_router.include_router(workflow_router)
