from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class ExecuteWorkflowRequest(BaseModel):
    workflow_id: str
    execution_id: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    variables: Dict[str, Any] = {}
    trigger_input: Dict[str, Any] = {}


class NodeResult(BaseModel):
    node_id: str
    status: str
    output: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class ExecuteWorkflowResponse(BaseModel):
    execution_id: str
    status: str
    results: List[NodeResult] = []
