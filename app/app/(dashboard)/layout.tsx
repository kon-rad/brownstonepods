import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { isUserOwnerAuth } from "@/lib/auth";
import { isSiteMember } from "@/lib/permissions";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSiteIdFromUrl } from "@/lib/utils";

export default async function DashboardLayout({
  children,
  params,
  req,
  ...other
}: {
  children: ReactNode;
  params: any;
  req: any;
}) {
  const session = await getSession();
  const isOwner = await isUserOwnerAuth();

  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const siteId = getSiteIdFromUrl(fullUrl);

  if (!session) {
    redirect("/login");
  }
  const isMember = isSiteMember(session.user.id, siteId);

  console.log("siteId: ", siteId);

  return (
    <div>
      <Nav isOwner={isOwner} isMember={isMember}>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-black dark:bg-black dark:text-black sm:pl-60">
        {children}
      </div>
    </div>
  );
}
