import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/ui/inputs/InputField";
import { useLogin } from "@/hooks/useUser";
import {useAuthStore} from "@/store/authStore"

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const {  setAuth } = useAuthStore.getState();
  const [formData, setFormData] = useState({
    email: "topi82806@gmail.com",
    password: "1234567890Q!",
  });
  const {mutate: loginUser, data: loginResponse, isSuccess: isSuccessLogin, isError: isErrorLogin, error: loginError, isPending: isPendingLogin   } = useLogin()
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(localStorage.getItem('user_data'));
    

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let valid = true;

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Электронная почта обязательна.";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Некорректный формат электронной почты.";
      valid = false;
    }
    

    // Валидация пароля
    if (!formData.password) {
      newErrors.password = "Пароль обязателен.";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен содержать минимум 8 символов.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // localStorage.setItem('accessToken', JSON.stringify(formData));
    loginUser(formData)
  };

  useEffect(() => {
    if (isSuccessLogin) {
      setAuth(true);
      localStorage.setItem('accessToken', loginResponse.access);
      navigate(`/users/${localStorage.getItem('user_id')}`);

    }
    if (isErrorLogin) {
      setErrorMessage('ошибка при авторизации')
      console.log(loginError);
      
    }
  }, [isSuccessLogin, isErrorLogin, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Вход в аккаунт</h2>
        <h6 className="cursor-pointer text-blue-500 text-center" onClick={() => navigate('/register')} >Регистрация</h6>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Электронная почта"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <InputField
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isPendingLogin}
          >
            {isPendingLogin ? "Загрузка..." : "Войти"}
          </button>

          {/* Сообщения об ошибке */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
