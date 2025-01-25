import React, { ChangeEvent, useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useCountryList } from "@/hooks/useWorldInfo";
import PhoneInput from "react-phone-input-2";

type localizationType = {
  [key: string]: string;
};

const InputTelField: React.FC<InputTelFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  options,
}) => {
  const { data: countryList, isLoading: isCountryListLoading } = useCountryList();
  const [localization, setLocalization] = useState<localizationType>({


  });

  useEffect(() => {
    if (countryList) {
      const newLocalization: localizationType = {};
      for (let index = 0; index < countryList.length; index++) {
        const countryName = countryList[index].country_name; // Убираем slice
        const countryCode = countryList[index].country_code.toString().toLowerCase();
        newLocalization[countryCode] = countryName.slice(1);
      }
      setLocalization(newLocalization);
    }

  }, [countryList]);


  const handlerPhoneInputChange = (phone: string) => {
    
    onChange({ target: { name, value: phone } } as ChangeEvent<HTMLInputElement>);
  };

 
    return (
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">{label}</label>
        {localization&& Object.keys(localization).length > 0 && (
        <PhoneInput
        localization={localization}
        country="ru" // Установите значение по умолчанию
        value={value}
        onChange={handlerPhoneInputChange}
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




export default InputField;
