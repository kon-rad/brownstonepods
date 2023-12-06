"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";


const HomeProfile = ({ data }: any) => {
  // This page is viewable by all
  const availableBeds = data.totalBeds - data.occupiedBeds || 0;
  const handleApply = () => {
    const url =
      "https://brownstone.live/apply?from=&to=&due_amount=&total=&location=pa";
    window.open(url, "_blank");
  };
  const images = [
    { url: "/path/to/image1.jpg", alt: "Image 1" },
    { url: "/path/to/image2.jpg", alt: "Image 2" },
    { url: "/path/to/image3.jpg", alt: "Image 3" },
    { url: "/path/to/image4.jpg", alt: "Image 4" },
    { url: "/path/to/image5.jpg", alt: "Image 5" },
  ];
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row">
        <BlurImage
          alt={data.name ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-full overflow-hidden rounded-xl"
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="p-4 pt-0 dark:border-stone-700">
          <h3 className="dark:text-primary-gray mb-2 text-xl">location:</h3>
          <p className="mb-6 mt-2 text-xl dark:text-white">{data.address}</p>
          <div className="mb-6 mt-2 flex ">
            <h3 className="dark:text-primary-gray mr-4 text-xl">rent:</h3>
            <p className="text-xl dark:text-white">${data.rentRate}</p>
          </div>
          <div className="mb-6 mt-2 flex ">
            <h3 className=" dark:text-primary-gray mr-4 text-xl">
              availability:
            </h3>
            <p className="text-xl dark:text-white">{availableBeds}</p>
          </div>
          <button
            onClick={handleApply}
            className="active:bg-surface-mixed-200 rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
          >
            Apply for Residency
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <h3 className="dark:text-primary-gray mb-2 text-xl">description:</h3>
          <p className="text-md mb-6 mt-2 line-clamp-1 font-normal leading-snug dark:text-white">
            {data.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-2 text-xl dark:text-white">photo gallery:</h3>
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
};
export default HomeProfile;
