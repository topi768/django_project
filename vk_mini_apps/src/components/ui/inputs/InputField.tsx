import React, { ChangeEvent, useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import SelectInput from "./SelectInput";
import TelInput from "./TelInput";
import { useCountryList } from "@/hooks/useWorldInfo";

type localizationType = {
  [key: string]: string;
};

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "tel" | "number" | "select" | "date";
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  options,
  defaultValue = "",
}) => {
  const { data: countryList } = useCountryList();


  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    onChange({ target: { name, value: selectedOption ? selectedOption.value : "" } });
  };

  if (type === "select") {
    return (
      <SelectInput
        label={label}
        value={value}
        options={options}
        defaultValue={defaultValue }
        onChange={handleSelectChange}
      />
    );
  } else if (type === "tel") {
    return (
      <TelInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
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
