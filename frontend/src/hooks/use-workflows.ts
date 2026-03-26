import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { Workflow, WorkflowExecution, PaginatedResponse } from "@/types";

export function useWorkflows() {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<Workflow>>(
        "/workflows"
      );
      return data;
    },
  });
}

export function useWorkflow(id: string) {
  return useQuery({
    queryKey: ["workflows", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Workflow>(`/workflows/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useSaveWorkflow(id?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Workflow>) => {
      if (id) {
        const { data } = await apiClient.patch<Workflow>(
          `/workflows/${id}`,
          payload
        );
        return data;
      }
      const { data } = await apiClient.post<Workflow>("/workflows", payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workflows"] }),
  });
}

export function useRunWorkflow() {
  return useMutation({
    mutationFn: async (workflowId: string) => {
      const { data } = await apiClient.post<WorkflowExecution>(
        `/workflows/${workflowId}/run`
      );
      return data;
    },
  });
}

export function useWorkflowExecutions(workflowId: string) {
  return useQuery({
    queryKey: ["executions", workflowId],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<WorkflowExecution>>(
        `/workflows/${workflowId}/executions`
      );
      return data;
    },
    enabled: !!workflowId,
  });
}
