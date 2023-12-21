"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { createAwesomePost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";

export default function AwesomePostModal({ homeData, users }: any) {
  const router = useRouter();
  const modal = useModal();
  const { id } = useParams() as { id?: string };

  const [data, setData] = useState({
    to: "",
    comment: "",
  });
  const handleSelectChange = (val: any) => {
    console.log("handleSelectChange: ", val);
    setData((prevData: any) => ({ ...prevData, to: val }));
  };
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        console.log("inside form action data: ", data);

        return createAwesomePost(data, id as string, null).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Awesome Post");
            router.refresh();
            modal?.hide();
            toast.success(`Successfully Made an Awesome Post!`);
          }
        });
      }}
      className="w-full rounded-md bg-black dark:bg-black md:max-w-2xl md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">
          New Wall of Awesome Post
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Recipient Name
          </label>

          <Select
            onValueChange={handleSelectChange}
            className="text-white dark:bg-surface-mixed-300"
          >
            <SelectTrigger className="w-[280px] text-white">
              <SelectValue
                placeholder="Select a User Recipient"
                className=" text-white"
              />
            </SelectTrigger>
            <SelectContent className="text-white dark:bg-surface-mixed-300">
              {users.map((usr: any, i: number) => {
                return (
                  <SelectItem
                    className="text-white dark:bg-surface-mixed-300"
                    key={`user_${i}`}
                    value={usr.id}
                  >
                    {usr.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subdomain"
            className="text-sm font-medium text-stone-500"
          >
            Comment
          </label>
          <div className="flex w-full max-w-md">
            <textarea
              name="comment"
              placeholder="Tell the story about why this person is awesome"
              value={data.comment}
              onChange={(e) => setData({ ...data, comment: e.target.value })}
              maxLength={140}
              rows={3}
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-600 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateAwesomePostButton />
      </div>
    </form>
  );
}
function CreateAwesomePostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-surface-mixed-200 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-surface-mixed-200 text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Send Post</p>}
    </button>
  );
}
