"use server";

import prisma from "@/lib/prisma";

export const getSiteMembers = async (siteId: string) => {
  const allSiteMembers = await prisma.siteMember.findMany({
    where: {
      site: {
        id: siteId as string,
      },
    },
    include: {
      user: true,
    },
  });
  console.log("allSiteMembers: ", allSiteMembers);
  return allSiteMembers.map((match: any) => match.user);
};
