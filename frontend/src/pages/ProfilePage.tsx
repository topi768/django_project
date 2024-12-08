import { useEffect, useState } from "react";
import api from "../api/auth";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "", first_name: "", last_name: ""});

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const { data } = await api.get("profile/");
        
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
    
  };

  const handleUpdate = async () => {
    try {
      // Получаем CSRF-токен из куки
      const getCookie = (name: string): string | null => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) {
            return decodeURIComponent(value);
          }
        }
        return null;
      };
  
      const csrfToken = getCookie("csrftoken");
      console.log( document.cookie);
      
      // if (!csrfToken) {
      //   console.error("CSRF token not found.");
      //   return;
      // }
  
      // Логирование для проверки
      console.log("CSRF Token:", csrfToken);
      console.log("Authorization Header:", api.defaults.headers.common["Authorization"]);
  
      // // Отправка запроса с CSRF-токеном в заголовке
      await api.put(
        "profile/",
        profile,
        {
          headers: {
            "X-CSRFToken": "cAt9L7xdabH0rBIKqZd3WEixFfFMgMXd", // Добавляем токен в заголовок
          },
          withCredentials: true, // Включаем отправку cookies
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  const handlePasswordReset = async () => {
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <h3 className="text-lg font-bold text-center mb-4">Username: {profile.username}</h3>
        <p className="text-sm text-gray-600 mb-4" >Change firstname</p>
        <input
          name="first_name"
          value={profile.first_name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />
        <p className="text-sm text-gray-600 mb-4" >Change lastname</p>

        <input
          name="last_name"
          value={profile.last_name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
        <button
          onClick={handlePasswordReset}
          className="w-full bg-red-500 mt-4 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Сброс пароля
        </button>
      </div>
    </div>
  );
};

export default Profile;
