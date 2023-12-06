import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

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
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const residents = [
    {
      avatar: "",
      name: "Konrad Gnat",
    },
  ];
  const wallOfAwesome = [
    {
      from: "User 1",
      to: "Konrad Gnat",
      comment: "He is a nice guy",
      createdDate: "11/28/2023",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Community Portal for {data.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h3 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Wall of Awesome
          </h3>
          {wallOfAwesome.map((item: any, i: number) => {
            return (
              <div key={`user_${i}`} className="m-3 flex flex-col">
                <div className="p-2">avatar</div>
                <div className="p-2">
                  <h3 className="mb-4">{item.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h3 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Resident Directory
          </h3>
          {residents.map((item: any, i: number) => {
            return (
              <div key={`user_${i}`} className="m-3 flex flex-col">
                <div className="p-2">avatar</div>
                <div className="p-2">
                  <h3 className="mb-4">{item.to}</h3>
                  <p className="mb-4">{item.from}</p>
                  <p className="mb-4">{item.createdDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
