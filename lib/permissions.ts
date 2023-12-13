import prisma from "@/lib/prisma";

export async function isUserOwner(userId: string) {
  const owner = await prisma.owner.findUnique({
    where: { userId: userId },
  });

  return owner !== null;
}
