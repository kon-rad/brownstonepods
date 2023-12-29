"use server";

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
export async function updateUser(userId: string, data: any) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}
