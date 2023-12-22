import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { isUserOwner, isSiteMember } from '@/lib/permissions';

export default async function SiteAnalytics({
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

  const isMember = await isSiteMember(session.user.id, params.id);
  const isOwner = await isUserOwner(session.user.id);
  if (!data) {
    return notFound();
  }
  if (!isMember && !isOwner) {
    return notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Community Handbook of {data.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col"></div>
    </>
  );
}
