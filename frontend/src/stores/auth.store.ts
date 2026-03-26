import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Workspace } from "@/types";

interface AuthState {
  user: User | null;
  workspace: Workspace | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  setWorkspace: (workspace: Workspace) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      workspace: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      setWorkspace: (workspace) => set({ workspace }),
      logout: () =>
        set({ user: null, token: null, workspace: null, isAuthenticated: false }),
    }),
    {
      name: "agentflow-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        workspace: state.workspace,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
