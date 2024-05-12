"use client";

import { useState } from "react";
import { Image as ImageType, Video as VideoType } from "@/types";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
  videos: VideoType[];
}

const Gallery: React.FC<GalleryProps> = ({ images, videos }) => {
  const mediaItems = [...images, ...videos];
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(mediaItems.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = mediaItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {currentItems.map((media) => (
            <GalleryTab key={media.id} media={media} />
          ))}
        </Tab.List>
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            className=" relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        bg-white
                        text-black
                        py-3
                        text-md
                        font-semibold"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Trước
          </button>
          <button
            className=" relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        bg-white
                        text-black
                        py-3
                        text-md
                        font-semibold"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            Sau
          </button>
        </div>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {currentItems.map((media) => (
          <Tab.Panel key={media.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              {media.url.endsWith(".mp4") ? (
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  className="object-cover object-center w-full h-full"
                >
                  <source src={media.url} type="video/mp4" />
                </video>
              ) : (
                <Image
                  fill
                  src={media.url}
                  alt=""
                  className="object-cover object-center"
                />
              )}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
