import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Используем BrowserRouter
import { ScreenSpinner, SplitLayout } from "@vkontakte/vkui";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { Home } from "./panels/Home";
import { GameScreen } from "./panels/GameScreen";
import { Friends } from "./panels/Friends";
import { Friend } from "./panels/Friend";
import { ScoreList } from "./panels/ScoreList";
import { СurrencyPurchase } from "./panels/СurrencyPurchase";
import { AdminPanel } from "./panels/AdminPanel";
import RegisterPage from "./panels/RegisterPage";
import { Achievements } from "./panels/Achievements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

export const App = () => {
  const [, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<JSX.Element | null>(
    // <ScreenSpinner size="large" />
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SplitLayout popout={popout}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/GameScreen" element={<GameScreen />} />
            <Route path="/Friends" element={<Friends />} />
            <Route path="/friend/:id" element={<Friend />} />
            <Route path="/ScoreList" element={<ScoreList />} />
            <Route path="/Achievements" element={<Achievements />} />
            <Route path="/СurrencyPurchase" element={<СurrencyPurchase />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </SplitLayout>
    </QueryClientProvider>
  );
};
