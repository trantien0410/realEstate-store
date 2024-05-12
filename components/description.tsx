"use client";

import { Product } from "@/types";
import { useState } from "react";

interface DescriptionProps {
  data: Product;
}

const Description: React.FC<DescriptionProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <div className="text-xl font-semibold">Thông tin mô tả</div>
      <div className="text-lg whitespace-pre-wrap">
        {isExpanded
          ? data.description
          : `${data.description.substring(0, 1000)}`}
      </div>
      {data.description.length > 1000 && (
        <button onClick={toggleDescription} className="text-blue-500">
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Description;
