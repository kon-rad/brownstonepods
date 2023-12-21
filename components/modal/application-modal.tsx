"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import { createApplication } from '@/lib/database/applications';
import { useParams } from 'next/navigation'
const APPLICATION_URL = "https://brownstone.live/apply";


export default function ApplicationModal() {
  // const router = useRouter() as any;
  // const { id } = router.query;
  const modal = useModal();
  const { id } = useParams()

  const [data, setData] = useState({
    name: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  console.log("state data: ", data);
  console.log("state params: ", id);
  const handleSubmit = async () => {
    console.log('sending create ', data, id);
    
    const response = await createApplication(data, id as string);
    console.log('response: ', response);
  }

  return (
    <div className="w-full rounded-md bg-white dark:bg-black md:max-w-2xl md:border md:border-stone-200 md:shadow dark:md:border-stone-700">
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">
          Apply for residency
        </h2>
        <h3 className="font-xl font-bold dark:text-white text-white">
          First fill out this application <a referrerPolicy="no-referrer" target="_blank"  href={APPLICATION_URL}>here</a>
        </h3>

        <h3 className="font-xl font-bold dark:text-white text-white">
          Second, enter what date you would like to move in on here:
        </h3>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Move in date
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-600 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <button
        onClick={handleSubmit}
          className={cn(
            "flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-black bg-black text-sm  text-white transition-all hover:bg-white hover:text-black focus:outline-none dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
        >
          <p>Apply</p>
        </button>
      </div>
    </div>
  );
}
