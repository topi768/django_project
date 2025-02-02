import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom"; // Используем BrowserRouter
import { ScreenSpinner, SplitLayout } from "@vkontakte/vkui";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { Home } from "./panels/Home";
import { GameScreen } from "./panels/GameScreen";
import { Friends } from "./panels/Friends";
import { Friend } from "./panels/Friend";
import { Profile } from "./panels/Profile";
import { ScoreList } from "./panels/ScoreList";
import { СurrencyPurchase } from "./panels/СurrencyPurchase";
// import { AdminPanel } from "./panels/AdminPanel";
import RegisterPage from "./panels/RegisterPage";
import { Achievements } from "./panels/Achievements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import {useAuthStore} from "@/store/authStore"
import { StrictMode } from "react";
import Login from "./panels/Login";

const App = () => {

  const queryClient = new QueryClient();

  // Состояние авторизации

  const { isAuth, setAuth } = useAuthStore();
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAuth(true); // Устанавливаем авторизацию, если токен найден
    } else {
      setAuth(false); // Сбрасываем авторизацию, если токена нет
    }
  }, [setAuth]);

  return (
    // <StrictMode>

    
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* {isAuth && <Header text="My App" />} */}

        <Routes>
          {/* Защищённые маршруты */}
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
            element={
              <ProtectedRoute isAuth={isAuth} component={<Profile />} />
            }
          />
          {/* Страница регистрации */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />

          {/* Перенаправление по умолчанию */}
          <Route
  path="*"
  element={<Navigate to={isAuth ? "/profile" : "/register"} replace />}
/>
        </Routes>

        {/* {isAuth && <Footer className="bg-gray-200" />} */}
      </Router>
    </QueryClientProvider>
    //  </StrictMode> 
  );
};

export default App;