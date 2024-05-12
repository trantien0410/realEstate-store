import Select from "react-select";
import { useEffect, useState } from "react";
import getBillboards from "@/actions/get-billboards";
import { Billboard } from "@/types";

interface BillboardSelectProps {
  value?: Billboard;
  onChange: (value: Billboard) => void;
  disabled?: boolean;
  defaultBillboardId?: string;
}

const BillboardSelect: React.FC<BillboardSelectProps> = ({
  value,
  onChange,
  disabled = false,
  defaultBillboardId,
}) => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
    null
  );

  useEffect(() => {
    getBillboards().then((data) => {
      setBillboards(data);
    });
  }, []);

  useEffect(() => {
    // This effect updates the internal state when the external value changes
    setSelectedBillboard(value || null);
  }, [value]);

  useEffect(() => {
    if (defaultBillboardId && billboards.length > 0) {
      const defaultBillboard = billboards.find(
        (b) => b.id === defaultBillboardId
      );
      if (defaultBillboard) {
        setSelectedBillboard(defaultBillboard);
        onChange(defaultBillboard);
      }
    }
  }, [billboards, defaultBillboardId, onChange]);

  const handleBillboardChange = (selectedOption: any) => {
    const selectedBillboard = billboards.find(
      (billboard) => billboard.id === selectedOption.value
    );
    setSelectedBillboard(selectedBillboard || null);
    if (selectedBillboard) {
      onChange(selectedBillboard);
    }
  };

  const options = billboards.map((billboard) => ({
    value: billboard.id,
    label: billboard.label,
  }));

  return (
    <Select
      placeholder="Dự Án"
      options={options}
      value={
        selectedBillboard
          ? { value: selectedBillboard.id, label: selectedBillboard.label }
          : null
      }
      onChange={handleBillboardChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      isDisabled={disabled}
    />
  );
};

export default BillboardSelect;
