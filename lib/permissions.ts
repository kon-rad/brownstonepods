import prisma from "@/lib/prisma";

export async function isUserOwner(userId: string) {
  const owner = await prisma.owner.findFirst({
    where: { userId: userId },
  });

  return owner !== null;
}
export async function isSiteMember(userId: string, siteId: string) {
  const memberData = await prisma.siteMember.findFirst({
    where: {
      siteId: siteId,
      userId: userId,
    },
  });
  return memberData !== null;
}

export async function getUserSites(userId: string) {
  const userSites = await prisma.siteMember.findMany({
    where: { userId: userId },
  });

  return userSites;
}
