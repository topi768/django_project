import {create} from "zustand";
type AuthState = {
  isAuth: boolean;
  user_id: number;
  setAuth: (authState: boolean) => void; 
  logout: () => void; 
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  user_id: 0,
  setAuth: (authState: boolean) => set({ isAuth: authState }),
  setUserId: (userId: number) => set({ user_id: userId }),
  logout: () => set({ isAuth: false }),
}));

