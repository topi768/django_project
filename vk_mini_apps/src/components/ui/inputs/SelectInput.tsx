import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label?: string;
  value: string;
  options?: Option[];
  defaultValue?: Option;
  onChange: (option: Option | null) => void;
}

const getTransformedLabel = (label?: string): string => {
  if (!label) return "";
  
  const labelTransformations: Record<string, string> = {
    "Страна": "Страну",
    "Город": "Город",
    "Категория": "Категорию",
  };

  return labelTransformations[label] || label;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  defaultValue,
  onChange,
}) => {
  // Ключ для принудительного пересоздания компонента при изменении defaultValue
  const [key, setKey] = useState(defaultValue?.value);
  useEffect(() => {
    setKey(defaultValue?.value);
  }, [defaultValue?.value]);

  // Локальный обработчик onChange. Если выбор очищен (option === null),
  // передаем в onChange значение { value: "", label: "" }
  const handleChange = (option: Option | null) => {
    if (option === null) {
      onChange({ value: "", label: "" });
    } else {
      onChange(option);
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-gray-600 mb-2">{label}</label>}
      <Select
        options={options}
        value={options?.find((option) => option.value === value)}
        onChange={handleChange}
        placeholder={`Выберите ${getTransformedLabel(label)}`}
        isClearable
        isSearchable
        classNamePrefix="react-select"
        defaultValue={defaultValue}
        key={key}
      />
    </div>
  );
};

export default SelectInput;
