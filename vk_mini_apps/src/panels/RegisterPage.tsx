import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useCountryList, useCitiesList } from "../hooks/useCountryList";
import InputMask from "react-input-mask";
import { useCreateUser } from "../hooks/useUser";
import InputField from "@/components/ui/InputField"; // Импортируем компонент для полей
import {RegistrationFormData} from "@/types";


const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "topi768@inbox.ru",
    name: "KIRILL",
    password: "1234567890Q!",
    re_password: "1234567890Q!",
    country: "USE",
    city: "USE",
    phone: "",
    date_of_birth: "",
  });

  const { data: countryList, isLoading: isCountryListLoading } = useCountryList();
  const { data: citiesList, isLoading: isCitiesListLoading } = useCitiesList(formData.country);
  const { mutate, isLoading, isSuccess, isError, error  } = useCreateUser(); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target);
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    let causesError: string[] | undefined;
  
    await mutate(formData, {
      onSuccess: () => {
        console.log("Registration successful!");
      },
      onError: (error: any) => {
        // Извлечение сообщений об ошибке
        
        if (error.response && error.response) {
          causesError = Object.keys(error.response); // Например, ["email", "password"]
          console.log("Error causes:", causesError[0]);
          switch (causesError[0]) {
            case "email":
              
              setErrorMessage('Пользователь с таким email уже существует');
              break;
            case "password":
              setErrorMessage('Пароли не совпадают');
              break;
            case "name":
              setErrorMessage('Пользователь с таким именем уже существует');
              break
            default:
              setErrorMessage('Неправильно заполнена форма');
              break;
          }
        } else {
          console.error("Unexpected error:", error.message);
        }
      },

    });
  

  };
  type Field = {
    label: string;
    type: "text" | "email" | "password" | "tel" | "number" | "select" | 'date'; // Add more as needed
    name: string;
    options?: { value: string; label: string }[]; // Optional for select fields
  };
  const fields: Field[] = [
    {
      label: "Электронная почта",
      type: "email",
      name: "email",
    },
    {
      label: "Имя пользователя",
      type: "text",
      name: "name",
    },
    {
      label: "Пароль",
      type: "password",
      name: "password",
    },
    {
      label: "Повторите пароль",
      type: "password",
      name: "re_password",
    },
    {
      label: "Страна",
      type: "select",
      name: "country",
      options: countryList?.map((country) => ({
        value: country.country_code,
        label: country.country_name,
      })) || [],
    },
    {
      label: "Город",
      type: "select",
      name: "city",
      options: citiesList?.map((city) => ({
        value: city.city,
        label: city.city,
      })) || [],
    },
    {
      label: "Телефон",
      type: "tel",
      name: "phone",
    },
    {
      label: "Дата рождения",
      type: "date",
      name: "date_of_birth",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof RegistrationFormData]}
              onChange={handleInputChange}
              required={false} // Для телефона не обязательно
              options={field.options}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isLoading} // Отключаем кнопку при загрузке
          >
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>

          {/* Сообщения об ошибке или успехе */}
          {isError && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
          {isSuccess && <p className="text-green-500 text-sm mt-4">Регистрация прошла успешно!</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
