import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  authType: string | null;
  setAuthType: (authType: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuth: false,
        setIsAuth: (isAuth: boolean) => set({ isAuth }),
        authType: null,
        setAuthType: (authType: string | null) => set({ authType }),
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuth: state.isAuth,
          authType: state.authType,
          user: state.user,
        }),
      }
    )
  )
);

window.addEventListener("storage", () => {
  const state = useAuthStore.getState();
  state.setIsAuth(false);
  state.setAuthType(null);
  state.setUser(null);
});
