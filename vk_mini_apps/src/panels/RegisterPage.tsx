import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCountryList, useCitiesList } from "../hooks/useCountryList";
import { useCreateUser, useCreateUserToken } from "../hooks/useUser";
import InputField from "@/components/ui/InputField";
import { RegistrationFormData } from "@/types";
import {useAuthStore} from '@/store/authSrote'
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, setAuth } = useAuthStore.getState();
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    name: "",
    password: "1234567890Q!",
    re_password: "1234567890Q!",
    country: "",
    city: "",
    phone: "",
    date_of_birth: "",
  });

  const { data: countryList } = useCountryList();
  const { data: citiesList } = useCitiesList(formData.country);
  const [isRegistering, setIsRegistering] = useState(false);
  // Переносим вызов хука на уровень компонента
  const { 
  mutate: registerUser, 
} = useCreateUser();

const { 
  mutateAsync: createToken,
  isLoading: isTokenCreating
} = useCreateUserToken();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    registerUser(formData, {
      onSuccess: async () => {
        setIsRegistering(false);
        console.log('Registration successful!');

        try {
          const tokenData = await createToken(formData);
          const accessToken = tokenData.access;
          const refreshToken = tokenData.refresh;

          
          sessionStorage.setItem('accessToken', accessToken);
          document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly;`

          setAuth(true);
          navigate('/home');

          
        } catch (error) {
          console.error('Error creating token:', error);
        }
        setErrorMessage(null);
      },

      onError: (error: any) => {
        setIsRegistering(false);
        
        if (error.response) {
          const errorField = Object.keys(error.response)[0]; // Определяем первое поле с ошибкой
          switch (errorField) {
            case 'email':
              setErrorMessage('Пользователь с таким email уже существует');
              break;
            case 'password':
              setErrorMessage('Пароли не совпадают');
              break;
            case 'name':
              setErrorMessage('Пользователь с таким именем уже существует');
              break;
            default:
              setErrorMessage('Ошибка заполнения формы');
              break;
          }
        } else {
          setErrorMessage('Произошла неизвестная ошибка');
        }
      },
    });
  };


  const fields = [
    { label: "Электронная почта", type: "email", name: "email" },
    { label: "Имя пользователя", type: "text", name: "name" },
    { label: "Пароль", type: "password", name: "password" },
    { label: "Повторите пароль", type: "password", name: "re_password" },
    {
      label: "Страна",
      type: "select",
      name: "country",
      options: countryList?.map((country) => ({
        value: country.country_code,
        label: country.country_name,
      })),
    },
    {
      label: "Город",
      type: "select",
      name: "city",
      options: citiesList?.map((city) => ({
        value: city.city,
        label: city.city,
      })),
    },
    { label: "Телефон", type: "tel", name: "phone" },
    { label: "Дата рождения", type: "date", name: "date_of_birth" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Регистрация
        </h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof RegistrationFormData]}
              onChange={handleInputChange}
              required={true} 
              options={field.options}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isRegistering}
          >
            {isRegistering 
              ? "Загрузка..."
              : "Зарегистрироваться"}
          </button>

          {/* Сообщения об ошибке или успехе */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
