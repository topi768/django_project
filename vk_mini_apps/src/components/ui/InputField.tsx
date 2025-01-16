import React, { ChangeEvent, useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { useCountryList } from "@/hooks/useCountryList";

type localizationType = {
  [key: string]: string;
};

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "tel" | "number" | "select" | 'date'
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  options,
}) => {
  const { data: countryList, isLoading: isCountryListLoading } = useCountryList();
  const [localization, setLocalization] = useState<localizationType>({});

  // Обновление локализации на основе списка стран
  useEffect(() => {
    if (countryList) {
      const newLocalization: localizationType = {};
      countryList.forEach(({ country_code, country_name }) => {
        newLocalization[country_code.toLowerCase()] = country_name;
      });
      setLocalization(newLocalization);
    }
  }, [countryList]);

  const handlePhoneChange = (phone: string) => {
    onChange({ target: { name, value: phone } } as ChangeEvent<HTMLInputElement>);
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    console.log();
    
    onChange({ target: { name, value: selectedOption ? selectedOption.value : "" } });
  };

  if (type === "select") {
    return (
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">{label}</label>
        <Select
          options={options}
          value={options?.find((option) => option.value === value)}
          onChange={handleSelectChange}
          placeholder={`Выберите ${label.toLowerCase()}`}
          isClearable
          isSearchable
          classNamePrefix="react-select"
        />
      </div>
    );
  } else if (type === "tel") {
    return (
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">{label}</label>
        {localization && Object.keys(localization).length > 0 && (
          <PhoneInput
            localization={localization}
            country="ru" // Установите значение по умолчанию
            value={value}
            onChange={handlePhoneChange}
            inputProps={{
              name,
              required,
              className:
                "w-[calc(100%-36px)] ml-[36px] py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
            }}
            enableSearch={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        required={required}
         max="2025-12-31"
      />
    </div>
  );
};

export default InputField;
