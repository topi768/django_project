import React, { ChangeEvent } from "react";
import Select from "react-select";

interface SelectInputProps {
  label?: string;
  value: string;
  options?: { value: string; label: string }[];
  defaultValue?: { value: string | undefined; label: string | undefined };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const getTransformedLabel = (label?: string): string => {
  if (!label) return ""; // Если `label` отсутствует, возвращаем пустую строку

  const labelTransformations: Record<string, string> = {
    "Страна": "Страну",
    "Город": "Город",
    "Категория": "Категорию",
  };

  return labelTransformations[label] || label; // Если слово не в словаре, оставляем без изменений
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-600 mb-2">{label}</label>}
      <Select
        options={options}
        value={options?.find((option) => option.value === value)}
        onChange={onChange}
        placeholder={`Выберите ${getTransformedLabel(label)}`}
        isClearable
        isSearchable
        classNamePrefix="react-select"
        defaultValue={defaultValue?.label ? defaultValue : undefined}
      />
    </div>
  );
};

export default SelectInput;
