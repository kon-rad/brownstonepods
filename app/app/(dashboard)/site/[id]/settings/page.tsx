import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import EditHomeButton from "@/components/edit-home-button";
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
      {/* <div>
        <EditHomeButton>
          <EditHomeModal homeData={data} />
        </EditHomeButton>
      </div> */}
      <EditHomePage homeData={data} />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
