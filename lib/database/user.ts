import prisma from "@/lib/prisma";

export async function getUser(userId: string) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      memberSites: true,
      Application: true,
      SiteManager: true,
    },
  });
}
