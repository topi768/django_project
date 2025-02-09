import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Используем BrowserRouter
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

import { Home } from "./panels/Home";
import { GameScreen } from "./panels/GameScreen";
import { Friends } from "./panels/Friends";
import { Friend } from "./panels/Friend";
import { Profile } from "./panels/Profile";
import { ScoreList } from "./panels/ScoreList";
import { СurrencyPurchase } from "./panels/СurrencyPurchase";
import RegisterPage from "./panels/RegisterPage";
import { Achievements } from "./panels/Achievements";
import Login from "./panels/Login";
import { Footer } from "./components/Footer";

import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const { isAuth, setAuth } = useAuthStore();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setAuth(!!token);
  }, [setAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes isAuth={isAuth} />
      </Router>
    </QueryClientProvider>
  );
};

// Вынесем маршруты в отдельный компонент, чтобы можно было использовать useLocation
const AppRoutes = ({ isAuth }: { isAuth: boolean }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/GameScreen"; // Проверяем текущий путь

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={<ProtectedRoute isAuth={isAuth} component={<Home />} />}
        />
        <Route
          path="/GameScreen"
          element={<ProtectedRoute isAuth={isAuth} component={<GameScreen />} />}
        />
        <Route
          path="/Friends"
          element={<ProtectedRoute isAuth={isAuth} component={<Friends />} />}
        />
        <Route
          path="/Friend/:id"
          element={<ProtectedRoute isAuth={isAuth} component={<Friend />} />}
        />
        <Route
          path="/ScoreList"
          element={<ProtectedRoute isAuth={isAuth} component={<ScoreList />} />}
        />
        <Route
          path="/СurrencyPurchase"
          element={
            <ProtectedRoute isAuth={isAuth} component={<СurrencyPurchase />} />
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute isAuth={isAuth} component={<Achievements />} />
          }
        />
        <Route
          path="/users/:userId/"
          element={<ProtectedRoute isAuth={isAuth} component={<Profile />} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/profile" : "/register"} replace />}
        />
      </Routes>

      {isAuth && !hideFooter && <Footer />}
    </>
  );
};

export default App;
