// CategorySelect.tsx
import Select from "react-select";
import { useEffect, useState } from "react";
import { Amenities } from "@/types";
import getAmenities from "@/actions/get-amenities";

interface AmenitySelectProps {
  value?: Amenities;
  onChange: (value: Amenities) => void;
}

const AmenitySelect: React.FC<AmenitySelectProps> = ({ value, onChange }) => {
  const [amenities, setAmenities] = useState<Amenities[]>([]);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenities | null>(
    value || null
  );

  useEffect(() => {
    getAmenities().then((data) => {
      setAmenities(data);
    });
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedAmenity(value);
    }
  }, [value]);

  const handleAmenityChange = (selectedOption: any) => {
    const selectedAmenity = amenities.find(
      (amenity) => amenity.id === selectedOption.value
    );
    setSelectedAmenity(selectedAmenity || null);
    if (selectedAmenity) {
      onChange(selectedAmenity);
    }
  };

  const options = amenities.map((amenity) => ({
    value: amenity.id,
    label: `${amenity.roomName} - ${amenity.bathroomName}`.trim(),
  }));

  return (
    <Select
      placeholder="Select Amenity"
      options={options}
      value={
        selectedAmenity
          ? {
              value: selectedAmenity.id,
              label:
                `${selectedAmenity.roomName} - ${selectedAmenity.bathroomName}`.trim(),
            }
          : null
      }
      onChange={handleAmenityChange}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  );
};

export default AmenitySelect;
