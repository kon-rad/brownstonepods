"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

const HomeProfile = ({ data }: any) => {
  // This page is viewable by all
  const availableBeds = data.totalBeds - data.occupiedBeds || 0;
  const handleApply = () => {
    // todo: handle saving to db
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
    <div className="flex flex-col bg-black dark:bg-black">
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
          <h3 className="mb-2 text-xl dark:text-primary-gray">location:</h3>
          <p className="mb-6 mt-2 text-xl dark:text-white">{data.address}</p>
          <div className="mb-6 mt-2 flex ">
            <h3 className="mr-4 text-xl dark:text-primary-gray">rent:</h3>
            <p className="text-xl dark:text-white">${data.rentRate}</p>
          </div>
          {/* <div className="mb-6 mt-2 flex ">
            <h3 className=" dark:text-primary-gray mr-4 text-xl">
              availability:
            </h3>
            <p className="text-xl dark:text-white">{availableBeds}</p>
          </div> */}
          <button
            onClick={handleApply}
            className="rounded-lg border border-surface-mixed-200 bg-surface-mixed-200 px-4 py-1.5 text-sm font-medium text-white transition-all active:bg-surface-mixed-200 dark:border-stone-700 dark:hover:bg-surface-mixed-300 dark:hover:bg-surface-mixed-300 dark:hover:text-white dark:active:bg-stone-800"
          >
            Apply for Residency
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-2 text-xl dark:text-primary-gray">description:</h3>
          <p className="text-md mb-6 mt-2 font-normal leading-snug dark:text-white">
            {data.description}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-2 text-2xl dark:text-white">Photo Gallery</h3>
          <ImageGallery images={images} />
        </div>
      </div> */}
    </div>
  );
};
export default HomeProfile;
