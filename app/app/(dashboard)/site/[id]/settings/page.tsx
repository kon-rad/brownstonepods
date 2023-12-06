import prisma from "@/lib/prisma";
import DeleteSiteForm from "@/components/form/delete-site-form";
import EditHomePage from "@/components/EditHomePage";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <EditHomePage homeData={data} />
      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
