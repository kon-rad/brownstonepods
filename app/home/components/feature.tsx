"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  images: string[];
  imagePosition: "left" | "right";
}

const RenderImage = ({ img }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2"
    >
      {/* {images.map((image, index) => ( */}
      <Image
        key={1}
        src={img}
        alt="feature image"
        width={500}
        height={300}
        className="rounded-lg"
      />
      {/* ))} */}
    </motion.div>
  );
};
const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  images,
  imagePosition,
}) => {
  const textPosition = imagePosition === "left" ? "right" : "left";

  const handleClick = () => {
    const url = "https://app.brownstonepods.com/login";
    window.location.href = url;
    // window.open(url);
  };

  return (
    <div className="my-12 flex w-[900px] justify-between rounded-lg p-6 shadow-lg dark:bg-surface-100">
      {imagePosition === "left" && <RenderImage img={images[0]} />}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-1/2 text-${textPosition} flex h-full flex-col items-start ${
          textPosition === "right" ? "pl-6" : ""
        }`}
      >
        <h1 className="mb-4 w-full text-4xl font-bold ">{title}</h1>
        <p className="w-full text-gray-400">{description}</p>
        <div
          className={`flex-end flex w-full ${
            textPosition === "right" ? "justify-end" : ""
          }`}
        >
          <button
            onClick={handleClick}
            className="mt-9 cursor-pointer rounded-lg border border-black bg-surface-mixed-300 px-4 py-1.5 text-sm font-medium text-white transition-all hover:text-black active:bg-surface-mixed-200 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-surface-mixed-300 dark:hover:text-white dark:active:bg-stone-800"
          >
            details
          </button>
        </div>
      </motion.div>

      {imagePosition === "right" && <RenderImage img={images[0]} />}

      {/* {imagePosition === "right" && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2"
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="feature image"
              width={500}
              height={300}
              className="rounded-lg"
            />
          ))}
        </motion.div>
      )} */}
    </div>
  );
};

export default Feature;
