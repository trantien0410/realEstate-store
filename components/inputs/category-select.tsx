import Select from "react-select";
import { useEffect, useState } from "react";
import { Category, Billboard } from "@/types";
import getCategoriesByBillboard from "@/actions/get-categoriesByBillboard";

interface CategorySelectProps {
  value?: Category;
  onChange: (value: Category) => void;
  billboard?: Billboard;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  billboard,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    value || null
  );

  useEffect(() => {
    if (billboard) {
      getCategoriesByBillboard(billboard.id).then((data) => {
        setCategories(data);
      });
    } else {
      setCategories([]); // Clear categories if no billboard is selected
    }
  }, [billboard]);

  useEffect(() => {
    if (value) {
      setSelectedCategory(value);
    }
  }, [value]);

  const handleCategoryChange = (selectedOption: any) => {
    const selectedCategory = categories.find(
      (category) => category.id === selectedOption.value
    );
    setSelectedCategory(selectedCategory || null);
    if (selectedCategory) {
      onChange(selectedCategory);
    }
  };

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Select
      placeholder="Select Category"
      options={options}
      value={
        selectedCategory
          ? { value: selectedCategory.id, label: selectedCategory.name }
          : null
      }
      onChange={handleCategoryChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  );
};

export default CategorySelect;
