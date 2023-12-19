import prisma from "@/lib/prisma";

export async function isUserOwner(userId: string) {
  console.log("isUserOwner called userId", userId);

  const owner = await prisma.owner.findFirst({
    where: { userId: userId },
  });

  return owner !== null;
}

export async function getUserSites(userId: string) {
  const userSites = await prisma.siteMember.findMany({
    where: { userId: userId }
  });

  return userSites;
}