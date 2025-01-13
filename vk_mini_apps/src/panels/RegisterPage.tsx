import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useCountryList, useCitiesList} from "../hooks/useCountryList";
import InputMask from "react-input-mask";
import { useCreateUser } from "../hooks/useUser";
interface RegistrationFormData {
  email: string;
  name: string;
  password: string;
  re_password: string;
  country: string;
  city: string;
  // interests: string[]; // "Многие ко многим"
  phone?: string; // Необязательное поле
  date_of_birth?: string; // Добавляем поле для даты рождения
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "topi768@inbox.ru",
    name: "KIRILL",
    password: "1234567890Q!",
    re_password: "1234567890Q!",
    country: "USE",
    city: "USE",
    // interests: [],
    phone: "79243271979",
    date_of_birth: "1990-01-01"
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const {
    data: citiesList,
    isLoading: isCitiesListLoading,
  } = useCitiesList(selectedCountryCode);
  const { mutate, isLoading, isSuccess, isError } = useCreateUser();
  
  const {
    data: countryList,
    isLoading: isCountryListLoading,
  } = useCountryList();


  const interests: string[] = ["Спорт", "Музыка", "Чтение", "Путешествия"];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;
    if (name == 'country') {
      setSelectedCountryCode(value); 
    }

    setFormData({ ...formData, [name]: value });
  };


  const handleInterestsChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { value, checked } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   interests: checked
    //     ? [...prevState.interests, value]
    //     : prevState.interests.filter((interest) => interest !== value),
    // }));
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Проверка: страна должна быть выбрана
    if (!formData.country) {
      setError("Страна обязательна для заполнения.");
      return;
    }

    // Проверка: город должен быть выбран
    if (!formData.city) {
      setError("Город обязателен для заполнения.");
      return;
    }

    // Проверка: пароли должны совпадать
    if (formData.password !== formData.re_password) {
      setError("Пароли не совпадают.");
      return;
    }

    try {
      // Отправка данных на сервер
      
      mutate(formData);
      setSuccess(true);

    } catch (err: any) {
      setError("Регистрация не удалась. Пожалуйста, попробуйте снова.");
      console.log(err);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Электронная почта:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите вашу электронную почту"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш пароль"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Повторите пароль:</label>
            <input
              type="password"
              name="re_password"
              value={formData.re_password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Повторите ваш пароль"
              required
            />
          </div>

          {/* Country (Обязательное поле) */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Страна:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Выберите страну</option>

              {isCountryListLoading ? (
                <option>Loading...</option>
              ) : (
                countryList?.map((country) => (
                  <option key={country.country_name} value={country.country_code}>
                    {country.country_name}
                  </option>
                ))
              )
              }
            </select>
          </div>

          {/* City (Обязательное поле) */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Город:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Выберите город</option>
              {citiesList?.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          {/* Interests (Многие ко многим) */}
          {/* <div className="mb-4">
            <label className="block text-gray-600 mb-2">Интересы:</label>
            {interests.map((interest) => (
              <div key={interest} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleInterestsChange}
                  className="mr-2"
                />
                <span>{interest}</span>
              </div>
            ))}
          </div> */}

          {/* Phone (Необязательное поле) */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Телефон (необязательно):</label>
            <InputMask
              mask="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleInputChange}
            >
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <input
                  {...inputProps}
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              )}
            </InputMask>
          </div>

          {/* Date of Birth (Обязательное поле) */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Дата рождения:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Зарегистрироваться
          </button>
        </form>

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm mt-4">Регистрация прошла успешно!</p>}
      </div>
    </div>
  );
};

export default RegistrationForm;
