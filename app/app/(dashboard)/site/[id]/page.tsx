import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import HomeProfile from "@/components/HomeProfile";

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  const residentsData = await prisma.siteMember.findFirst({
    where: {
      siteId: decodeURIComponent(params.id),
      userId: session.user.id,
    },
  });
  console.log('residentsData: ', residentsData);
  
  const isResident = !!residentsData;
  const managerData = await prisma.siteManager.findFirst({
    where: {
      siteId: decodeURIComponent(params.id),
      userId: session.user.id,
    },
  });
  const isManager = !!managerData;
  const applicationData = await prisma.application.findFirst({
    where: { 
      siteId: decodeURIComponent(params.id),
      userId: session.user.id,
    }
  })
  console.log("site homepage view data: ");
  console.log("site homepage view isResident: ", isResident);
  console.log("site homepage view isManager: ", isManager);
  console.log("site homepage view applicationData: ", applicationData);
  const applicationStatus = !applicationData;

  if (!data) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  console.log("url: ", url);

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 bg-black sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-4xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            {data.name}
          </h1>
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-surface-mixed-200 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>
      <HomeProfile data={data} />
    </>
  );
}
