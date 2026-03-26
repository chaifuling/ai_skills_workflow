import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { RoleModel, PaginatedResponse } from "@/types";

export function useRoles(params?: { page?: number; domain?: string }) {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<RoleModel>>(
        "/roles",
        { params }
      );
      return data;
    },
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: async () => {
      const { data } = await apiClient.get<RoleModel>(`/roles/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<RoleModel>) => {
      const { data } = await apiClient.post<RoleModel>("/roles", payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<RoleModel>) => {
      const { data } = await apiClient.patch<RoleModel>(`/roles/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["roles"] });
      qc.invalidateQueries({ queryKey: ["roles", id] });
    },
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/roles/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}
