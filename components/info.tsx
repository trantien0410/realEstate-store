"use client";

import { PhoneCallIcon } from "lucide-react";

import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useEffect, useState } from "react";
import Button from "./ui/button";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [showContact, setShowContact] = useState(false);
  const [isIndividualPage, setIsIndividualPage] = useState(false);
  const previewModal = usePreviewModal();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsIndividualPage(pathname === `/product/${data.id}`);
  }, [pathname, data.id]);

  const handleClick = () => {
    // Check if the current path is the product's page
    if (isIndividualPage) {
      // Toggle the display of the phone contact
      setShowContact(!showContact);
    } else {
      // Otherwise, navigate to the product page and close the modal
      router.push(`/product/${data.id}`);
      previewModal.onClose();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Địa Chỉ:</h3>
          <div>{data?.address}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Diện Tích:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Số Phòng Ngủ:</h3>
          <div>{data?.amenities?.roomName}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Số Phòng Vệ Sinh:</h3>
          <div>{data?.amenities?.bathroomValue}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2" onClick={handleClick}>
          {showContact ? (
            <div className="text-lg text-white-800">
              Số Điện Thoại: {data.phoneContact}
            </div>
          ) : (
            <div className="text-lg text-white-800">Số Liên Hệ</div>
          )}

          <PhoneCallIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
