import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCountryList, useCitiesList } from "../hooks/useWorldInfo";
import { useCreateUser, useCreateUserToken } from "../hooks/useUser";
import InputField from "@/components/ui/inputs/InputField";
import { RegistrationFormData } from "@/api/types";
import {useAuthStore} from '@/store/authStore'
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  
  const navigate = useNavigate();
  const { isAuth, setAuth } = useAuthStore.getState();
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "topi82806@gmail.com",
    name: "Владимир Котофф",
    password: "1234567890Q!",
    re_password: "1234567890Q!",
    country: "",
    city: "",
    phone: "",
    date_of_birth: "2005-05-20",
    country_name: "",
  });

  const { data: countryList } = useCountryList();
  const { data: citiesList } = useCitiesList(formData.country);

  const [isRegistering, setIsRegistering] = useState(false);
  const { 
  mutate: registerUser, 
} = useCreateUser();

const { 
  mutateAsync: createToken,
} = useCreateUserToken();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if ( formData.phone === "" ) {
      setErrorMessage('Поле для телефона пустое');
      return
    }

    
    setIsRegistering(true);
    
    const country_name = countryList?.find((country) => country.country_code === formData.country)?.country_name || "";

    const updatedFormData = {
      ...formData,
      country_name: country_name,
    };

    
    registerUser(updatedFormData, {
      onSuccess: async (createdUser) => {
        localStorage.clear()
        localStorage.setItem("isOpenOnboarding", "true");

        localStorage.setItem('user_id', createdUser.id);
        setIsRegistering(false);
        console.log('Registration successful! ') ;
        
        localStorage.removeItem('user_data');
        localStorage.setItem('user_data', JSON.stringify(updatedFormData));
        try {
          const tokenData = await createToken(updatedFormData);
          const accessToken = tokenData.access;
          const refreshToken = tokenData.refresh;

          
          localStorage.setItem('accessToken', accessToken);
          document.cookie = `refreshToken=${refreshToken}; path=/; secure; httpOnly;`

          setAuth(true);
          navigate('/users/' + localStorage.getItem('user_id'));

          
        } catch (error) {
          console.error('Error creating token:', error);
        }
        setErrorMessage(null);
      },

      onError: (error: any) => {
        setIsRegistering(false);
        
        if (error.response) {
          const errorField = Object.keys(error.response)[0]; // Определяем первое поле с ошибкой
          console.log(errorField);
          
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
            case 'non_field_errors':
              setErrorMessage('Пароли не совпадают');
              break
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
          Регистрация/ <span className="cursor-pointer text-blue-500" onClick={() => navigate('/login')}>Вход</span>
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
