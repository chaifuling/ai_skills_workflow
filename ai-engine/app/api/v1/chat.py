from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat.role_chat import role_chat_service

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if request.stream:
        return StreamingResponse(
            role_chat_service.stream_chat(request),
            media_type="text/event-stream",
        )
    return await role_chat_service.chat(request)
