"use server";

import prisma from "@/lib/prisma";
import { Post, Site } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";
import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";

export const createApplication = async (data: any, siteId: string) => {
  const session = await getSession();
  console.log('this is inside create application', data, siteId);
  
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  if (!siteId) {
    return {
      error: "Missing site Id",
    };
  }
  const name = data.name as string;
  console.log('saving application: ', name, siteId, data);
  
  try {
    const response = await prisma.application.create({
      data: {
        name,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        site: {
          connect: {
            id: siteId,
          },
        },
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export async function getAllApplicationsUsers(siteId: string) {
  return await prisma.application.findMany({
    where: {
      siteId: siteId,
    },
    include: {
      user: true, // Include all user fields
    },
  });
}

export async function approveApplication(appId: string, siteId: string, userId: string) {
  // Update the application status
  const updatedApplication = await prisma.application.update({
    where: {
      id: appId,
    },
    data: {
      status: "Approved",
    },
  });

  // Create a new entry in the SiteMember table
  const newSiteMember = await prisma.siteMember.create({
    data: {
      site: {
        connect: {
          id: siteId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return { updatedApplication, newSiteMember };
}