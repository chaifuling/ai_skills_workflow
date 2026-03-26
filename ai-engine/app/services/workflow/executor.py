"""
工作流执行引擎 — 基于 DAG 拓扑排序调度节点执行
"""
from app.schemas.workflow import ExecuteWorkflowRequest, ExecuteWorkflowResponse, NodeResult


class WorkflowExecutor:
    async def execute(
        self, request: ExecuteWorkflowRequest
    ) -> ExecuteWorkflowResponse:
        """
        执行工作流：
        1. 构建 DAG 图
        2. 拓扑排序确定执行顺序
        3. 按节点类型分发到对应 Handler
        4. 传递节点输出作为下一节点输入
        5. 处理条件分支、并行执行
        6. 汇报执行状态到 Redis pub/sub
        """
        # TODO: implement full DAG executor with LangGraph
        results: list[NodeResult] = []
        for node in request.nodes:
            results.append(
                NodeResult(
                    node_id=node["id"],
                    status="completed",
                    output={"message": f"Node {node['id']} executed"},
                )
            )
        return ExecuteWorkflowResponse(
            execution_id=request.execution_id,
            status="completed",
            results=results,
        )


workflow_executor = WorkflowExecutor()
