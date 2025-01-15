import {create} from "zustand";

type AuthState = {
  isAuth: boolean; 
  setAuth: (authState: boolean) => void; 
  logout: () => void; 
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false, 
  setAuth: (authState: boolean) => set({ isAuth: authState }),
  logout: () => set({ isAuth: false }),
}));
