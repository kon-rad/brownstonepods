"use client";

import { useState } from "react";

export default function CTA() {
  const [closeCTA, setCloseCTA] = useState(false);
  return (
    <div
      className={`${
        closeCTA ? "h-14 lg:h-auto" : "h-60 sm:h-40 lg:h-auto"
      } fixed inset-x-0 bottom-5 mx-5 flex max-w-screen-xl flex-col items-center justify-between space-y-3 rounded-lg border-t-4 border-black bg-white px-5 pb-3 pt-0 drop-shadow-lg transition-all duration-150 ease-in-out dark:border dark:border-t-4 dark:border-stone-700 dark:bg-black dark:text-white
          lg:flex-row lg:space-y-0 lg:pt-3 xl:mx-auto`}
    ></div>
  );
}
