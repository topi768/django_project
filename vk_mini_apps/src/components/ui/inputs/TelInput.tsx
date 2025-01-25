import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountryList } from "@/hooks/useWorldInfo";

interface TelInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
  country_code_lovercase?: string;
}

const TelInput: React.FC<TelInputProps> = ({ label, name, value, onChange, required = false, country_code_lovercase='ru' }) => {
  const { data: countryList } = useCountryList();
  const [localization, setLocalization] = useState<{ [key: string]: string }>({});

  // Обновление локализации на основе списка стран
  useEffect(() => {
    if (countryList) {
      const newLocalization: { [key: string]: string } = {};
      countryList.forEach(({ country_code, country_name }) => {
        newLocalization[country_code.toLowerCase()] = country_name;
      });
      setLocalization(newLocalization);
    }
  }, [countryList]);

  const handlePhoneChange = (phone: string) => {
    onChange({ target: { name, value: phone } });
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">{label}</label>
      {localization && Object.keys(localization).length > 0 && (
        <PhoneInput
          localization={localization}
          country={country_code_lovercase}
          value={'value'}
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
};

export default TelInput;
