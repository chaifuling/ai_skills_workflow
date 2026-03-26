"""
角色对话服务 — 根据 RoleModel 配置驱动 LLM 对话
"""
from typing import AsyncIterator
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage


class RoleChatService:
    async def chat(self, request: ChatRequest) -> ChatResponse:
        """
        非流式对话：加载角色配置 → 构建 System Prompt → 调用 LLM → 返回结果
        """
        # TODO:
        # 1. 从数据库加载 RoleModel 配置
        # 2. 构建包含 System Prompt 的消息列表
        # 3. 从 Redis 加载历史记忆（窗口大小限制）
        # 4. 调用 LangChain LLM (openai / anthropic)
        # 5. 存储新消息到记忆
        # 6. 应用 guardrails 安全检查
        import uuid
        return ChatResponse(
            session_id=request.session_id or str(uuid.uuid4()),
            role_id=request.role_id,
            message=ChatMessage(
                role="assistant",
                content=f"[Role {request.role_id}] Echo: {request.message}",
            ),
        )

    async def stream_chat(
        self, request: ChatRequest
    ) -> AsyncIterator[str]:
        """
        流式对话：逐 token 产出，通过 SSE 推送到前端
        """
        # TODO: implement with LangChain streaming
        yield f"data: {{\"delta\": \"Echo: {request.message}\"}}\n\n"
        yield "data: [DONE]\n\n"


role_chat_service = RoleChatService()
