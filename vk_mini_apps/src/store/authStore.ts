import {create} from "zustand";
type AuthState = {
  isAuth: boolean;
  isGameStarted: boolean;
  user_id: number;
  setAuth: (authState: boolean) => void;
  setIsGameStarted: (isGameStarted: boolean) => void;
  logout: () => void; 
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  user_id: 0,
  isGameStarted: false,
  setAuth: (authState: boolean) => set({ isAuth: authState }),
  setIsGameStarted: (isGameStarted: boolean) => set({ isGameStarted }),
  setUserId: (userId: number) => set({ user_id: userId }),
  logout: () => set({ isAuth: false }),
}));

