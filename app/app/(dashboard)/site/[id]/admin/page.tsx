import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getAllUsers } from "@/lib/fetchers";

export default async function SiteAdmin({
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
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  const users = (await getAllUsers()) || [];
  console.log("users: ", users);

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="text-whitefont-bold font-cal  text-xl dark:text-white sm:text-3xl">
            Admin Portal {data.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-whitefont-bold mb-6 font-cal  text-xl dark:text-white sm:text-3xl">
          All Residents
        </h3>
        <div className="flex flex-col space-y-2">
          {users.map((item: any, i: number) => {
            return (
              <div
                key={`user_${i}`}
                className="bg-surface-mixed-200 flex w-full flex-row rounded-2xl p-2"
              >
                <div className="p-2">
                  <img
                    src={item.image}
                    className="h-[20px] w-[20px] rounded-full"
                  />
                </div>
                <div className="px-2">
                  <h3 className="mb-1 text-xl  text-white">{item.name}</h3>
                  {/* <p className="text-xl  text-whitemb-4">{item.createdAt}</p> */}
                  <p className="text-md mb-1 text-white">{item.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
