import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { isUserOwnerAuth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isOwner = await isUserOwnerAuth();
  console.log("isOwner: ", isOwner);

  return (
    <div>
      <Nav isOwner={isOwner}>
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
