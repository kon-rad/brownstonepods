"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function EditHomeButton({ children }: { children: ReactNode }) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="active:bg-surface-mixed-200 rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      Edit Home
    </button>
  );
}
