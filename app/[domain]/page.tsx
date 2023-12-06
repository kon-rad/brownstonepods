import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import BlogCard from "@/components/blog-card";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import HomeProfile from "@/components/HomeProfile";

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    // feel free to remove this filter if you want to generate paths for all sites
    where: {
      subdomain: "demo",
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  console.log("in app domain page");

  const domain = decodeURIComponent(params.domain);
  const [data, posts] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="bg-surface-mixed-100 w-full p-8 pb-20">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 md:max-w-screen-2xl">
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <h1 className="mb-12 w-60 truncate font-cal text-4xl font-bold dark:text-white sm:w-auto sm:text-3xl">
              {data.name}
            </h1>
          </div>
        </div>
        <HomeProfile data={data} />
      </div>
    </>
  );
}
