import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SiteCard from "./site-card";
import Image from "next/image";

export default async function MyResidences({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const MyResidences = await prisma.siteMember.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    include: {
      site: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return MyResidences.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {MyResidences.map((site) => (
        <SiteCard key={site.id} data={site} badges={['member']} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="mb-12 font-cal text-4xl">No Homes Yet</h1>
      <Image
        alt="person resting"
        src="/searching.svg"
        width={400}
        height={400}
      />
      <p className="mt-8 text-lg text-stone-500">
        You do not have any MyResidences yet. Create one to get started.
      </p>
    </div>
  );
}
