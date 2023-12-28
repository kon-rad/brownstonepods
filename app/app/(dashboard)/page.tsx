import { Suspense } from "react";
import Sites from "@/components/sites";
import Notifications from "@/components/notifications";
import Posts from "@/components/posts";
import Link from "next/link";
import PlaceholderCard from "@/components/placeholder-card";
import OverviewSitesCTA from "@/components/overview-sites-cta";
import CreateSiteButton from "@/components/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";
import { isUserOwner } from "@/lib/permissions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import MyResidences from "@/components/my-residences.tsx";

export default async function Overview() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const isOwner = await isUserOwner(session.user.id);
  console.log("Overview dashboard page isOwner: ", isOwner);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        {/* 
        
        // todo:
        
        1. display all applications
        2. display all wall of awesome received posts
        3. display all wall of awesome given posts
        
        */}
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            My Residences
          </h1>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <MyResidences />
        </Suspense>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Locations
          </h1>
          {isOwner && (
            <CreateSiteButton>
              <CreateSiteModal />
            </CreateSiteButton>
          )}
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Applications
          </h1>
        </div>
        {/* display app applications */}
      </div>
    </div>
  );
}
