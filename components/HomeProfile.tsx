"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import ApplicationButton from "@/components/modal/application-button";
import ApplicationModal from "@/components/modal/application-modal";
import ImageGallery from "@/components/image-gallery";
import { getSiteImages } from "@/lib/utils";

const HomeProfile = ({ data }: any) => {
  // This page is viewable by all
  const availableBeds = data.totalBeds - data.occupiedBeds || 0;
  const handleApply = () => {
    // todo: handle saving to db
    // createApplication();
    const url =
      "https://brownstone.live/apply?from=&to=&due_amount=&total=&location=pa";
    window.open(url, "_blank");
  };

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
          <ApplicationButton>
            <ApplicationModal />
          </ApplicationButton>
        </div>
      </div>
      <div className="flex ">
        <ImageGallery images={getSiteImages(data)} />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-2 text-xl dark:text-primary-gray">description:</h3>
          <p className="text-md mb-6 mt-2 font-normal leading-snug dark:text-white">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomeProfile;
