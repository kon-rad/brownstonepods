"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const subtitle =
  "Rent a private bed in a fully furnished shared house. Monthly leases, utilities included.";
const title = "Private beds for rent starting at $500/month.";

const Hero = () => {
  return (
    <div className="my-9 flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 p-9"
      >
        <h1 className="mb-8 text-4xl font-bold">{title}</h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
        <a
          href="https://app.brownstonepods.com/login"
          className="mt-4 inline-block cursor-pointer rounded bg-primary-100 px-4 py-2 text-lg text-white hover:bg-primary-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="radius-lg w-1/2"
      >
        <Image
          src="/sfsky.JPG"
          alt="sf skyline"
          className="rounded-lg"
          width={500}
          height={300}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
