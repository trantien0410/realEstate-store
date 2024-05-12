// CategorySelect.tsx
import Select from "react-select";
import { useEffect, useState } from "react";
import { Size } from "@/types";
import getSizes from "@/actions/get-sizes";

interface SizeSelectProps {
  value?: Size;
  onChange: (value: Size) => void;
}

const SizeSelect: React.FC<SizeSelectProps> = ({ value, onChange }) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(value || null);

  useEffect(() => {
    getSizes().then((data) => {
      setSizes(data);
    });
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedSize(value);
    }
  }, [value]);

  const handleSizeChange = (selectedOption: any) => {
    const selectedSize = sizes.find((size) => size.id === selectedOption.value);
    setSelectedSize(selectedSize || null);
    if (selectedSize) {
      onChange(selectedSize);
    }
  };

  const options = sizes.map((size) => ({
    value: size.id,
    label: size.name,
  }));

  return (
    <Select
      placeholder="Select Size"
      options={options}
      value={
        selectedSize
          ? { value: selectedSize.id, label: selectedSize.name }
          : null
      }
      onChange={handleSizeChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  );
};

export default SizeSelect;
