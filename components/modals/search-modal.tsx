"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Slider } from "antd";
import useSearchModal from "@/hooks/use-search-modal";
import Modal from "./design-modal";
import Heading from "../heading";
import { Amenities, Billboard, Category, Size } from "@/types";
import BillboardSelect from "../inputs/billboard-select";
import CategorySelect from "../inputs/category-select";
import SizeSelect from "../inputs/size-select";
import AmenitySelect from "../inputs/amenity-select";

enum STEPS {
  BILLBOARD = 0,
  CATEGORY = 1,
  SIZE = 2,
  AMENITIES = 3,
  PRICE = 4,
}

interface SearchModalProps {
  billboardId?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ billboardId }) => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [billboard, setBillboard] = useState<Billboard>();
  const [category, setCategory] = useState<Category>();
  const [size, setSize] = useState<Size>();
  const [amenity, setAmenity] = useState<Amenities>();
  const [priceRange, setPriceRange] = useState([100000, 10000000]);

  const [step, setStep] = useState(STEPS.BILLBOARD);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      billboardId: billboard?.id,
      categoryId: category?.id,
      sizeId: size?.id,
      amenityId: amenity?.id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: updatedQuery,
      },
      { skipNull: true, arrayFormat: "comma" }
    );

    setStep(STEPS.BILLBOARD);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    router,
    onNext,
    priceRange,
    billboard,
    category,
    size,
    amenity,
    params,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BILLBOARD) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Select Billboard"
        subtitle="Choose a billboard that fits your needs"
      />
      <BillboardSelect
        value={billboard}
        onChange={(value) => setBillboard(value as Billboard)}
        disabled={!!billboardId}
        defaultBillboardId={billboardId}
      />
    </div>
  );

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select Category"
          subtitle="Choose a category that fits your needs"
        />
        <CategorySelect
          value={category}
          onChange={(value) => setCategory(value as Category)}
          billboard={billboard}
        />
      </div>
    );
  }

  if (step == STEPS.SIZE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select Size"
          subtitle="Pick the size of the billboard"
        />
        <SizeSelect value={size} onChange={(value) => setSize(value as Size)} />
      </div>
    );
  }
  if (step == STEPS.AMENITIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Select Amenities"
          subtitle="Choose amenities you want"
        />
        <AmenitySelect
          value={amenity}
          onChange={(value) => setAmenity(value as Amenities)}
        />
      </div>
    );
  }
  if (step == STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price range"
          subtitle="Adjust the slider to set your price range"
        />
        <Slider
          range
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
          min={0}
          max={10000000}
          tipFormatter={(value) => `${value?.toLocaleString()}VND`}
        />
      </div>
    );
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();
        searchModal.onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchModal]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Tìm Kiếm"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BILLBOARD ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
