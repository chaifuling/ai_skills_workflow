from fastapi import APIRouter
from app.schemas.workflow import ExecuteWorkflowRequest, ExecuteWorkflowResponse
from app.services.workflow.executor import workflow_executor

router = APIRouter(prefix="/workflow", tags=["workflow"])


@router.post("/execute", response_model=ExecuteWorkflowResponse)
async def execute_workflow(request: ExecuteWorkflowRequest):
    return await workflow_executor.execute(request)
