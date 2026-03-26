from pydantic import BaseModel
from typing import Any, Dict, Literal, Optional


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    role_id: str
    message: str
    session_id: Optional[str] = None
    stream: bool = False


class ChatResponse(BaseModel):
    session_id: str
    role_id: str
    message: ChatMessage
    usage: Optional[Dict[str, Any]] = None
