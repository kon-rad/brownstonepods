import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AwesomePostButton from "@/components/AwesomePostButton";
import AwesomePostModal from "@/components/modal/awesome-post";
import { getAllUsers, getAllStarsPosts } from "@/lib/fetchers";
import { isUserOwner } from "@/lib/permissions";
import { getSiteMembers } from "@/lib/database/siteMember";
import UserCard from "@/components/user-card";

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  const memberData = await prisma.siteMember.findFirst({
    where: {
      siteId: decodeURIComponent(params.id),
      userId: session.user.id,
    },
  });
  const isOwner = await isUserOwner(session.user.id);
  const siteMembers = await getSiteMembers(params.id);
  console.log("siteMembers in portal: ", siteMembers);

  if (!data) {
    notFound();
  }
  if (!memberData && !isOwner) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const users = (await getAllUsers()) || [];
  const posts = await getAllStarsPosts();

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="mb-8 flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Community Portal for {data.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-8 flex flex-col space-x-0 space-y-2">
          <div className="mb-12 flex flex-row justify-between">
            <h3 className="mr-4 font-cal text-xl font-bold dark:text-white sm:text-3xl">
              Wall of Awesome
            </h3>
            <AwesomePostButton>
              <AwesomePostModal homeData={data} users={users} />
            </AwesomePostButton>
          </div>
          <div className="flex flex-row space-y-2">
            {posts.map((item: any, i: number) => {
              return (
                <div
                  key={`user_${i}`}
                  className="m-2 flex w-1/3 flex-row rounded-2xl bg-surface-mixed-200 p-2"
                >
                  <div className="p-2">
                    <img
                      src={item?.givenTo.image}
                      className="h-[20px] w-[20px] rounded-full"
                    />
                  </div>
                  <div className="px-2">
                    <h3 className="mb-1 text-xl text-white">
                      to: {item?.givenTo.name}
                    </h3>
                    <p className="text-md mb-2 text-white">
                      by: {item?.givenBy.name}
                    </p>
                    <p className="text-md mb-1 text-white">{item?.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-x-0 space-y-2">
          <h3 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Resident Directory
          </h3>
          <div className="flex w-full flex-col">
            {siteMembers.map((item: any, i: number) => {
              return <UserCard key={`user_${i}`} {...item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
