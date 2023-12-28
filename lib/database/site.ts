"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getBlurDataURL } from "@/lib/utils";

export const updateSite = async (data: any, siteId: string) => {
  const session = await getSession();
  if (data.image) {
    const blurhash = await getBlurDataURL(data.image);
    data.imageBlurhash = blurhash;
  }

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  try {
    const response = await prisma.site.update({
      where: {
        id: siteId,
      },
      data: {
        ...data,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
