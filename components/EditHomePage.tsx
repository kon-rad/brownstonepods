"use client";

import { toast } from "sonner";
import { updateSiteHome } from "@/lib/actions";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

const EditHomePage = ({ homeData }: any) => {
  const router = useRouter();
  const { id } = useParams() as { id?: string };

  const [data, setData] = useState({
    name: homeData?.name,
    subdomain: homeData?.subdomain,
    description: homeData?.description,
    address: homeData?.address,
    rentRate: homeData?.rentRate,
    mainImage: homeData?.mainImage,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev?.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        console.log("inside form action data: ", data);

        return updateSiteHome(data, id as string, null).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Updated Site");
            console.log("updated site: ", data);
            console.log("updated site res: ", res);

            router.refresh();
            toast.success(`Successfully updated site!`);
          }
        });
      }}
      className="w-full dark:bg-black md:max-w-4xl "
    >
      <div className="relative flex flex-col space-y-4 py-5 md:py-10">
        <h2 className="font-cal text-2xl dark:text-white">Edit Home Profile</h2>

        <div className="flex-colbg- flex space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Home Location Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="This is a nickname"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-surface-100 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subdomain"
            className="text-sm font-medium text-stone-500"
          >
            Subdomain
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="subdomain"
              type="text"
              placeholder="subdomain"
              value={data.subdomain}
              onChange={(e) => setData({ ...data, subdomain: e.target.value })}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-surface-100 dark:focus:ring-white"
            />
            <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-surface-mixed-200 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
              .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about why my site is so awesome"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={1500}
            rows={15}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-surface-100 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="address"
            className="text-sm font-medium text-stone-500"
          >
            Address (this will only be visible to residents)
          </label>
          <textarea
            name="address"
            placeholder="Address of the home"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-surface-100 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="rentRate"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Rental Rate
          </label>
          <input
            name="rentRate"
            type="number"
            placeholder="You can edit this later"
            autoFocus
            value={data.rentRate}
            onChange={(e) =>
              setData({ ...data, rentRate: Number(e.target.value) })
            }
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-surface-mixed-300 dark:text-white dark:placeholder-surface-100 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-grow-0 flex-col">
          <div>
            <EditHomeFormButton />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditHomePage;

function EditHomeFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 flex-grow-0 items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-surface-mixed-200 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-surface-mixed-200 text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-surface-mixed-300 dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Save</p>}
    </button>
  );
}
