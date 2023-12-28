import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import UploadToS3 from "@/components/UploadToS3";
import GalleryUpload from '@/components/gallery-upload';

export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  const getSiteImages = (siteData: any) => {
    return {
      image1: siteData.image1,
      image2: siteData.image2,
      image3: siteData.image3,
      image4: siteData.image4,
      image5: siteData.image5,
      image6: siteData.image6,
      image7: siteData.image7,
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* <Form
        title="Thumbnail image"
        description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      /> */}
      {/* <div className="flex flex-wrap space-x-4">
        <div className="flex w-1/3 p-2">
          <ImagesUploader name="image1" defaultValue={data.image1} />
        </div>
        <div className="flex w-1/3 p-2">
          <ImagesUploader name="image2" defaultValue={data.image2} />
        </div>
        <div className="flex w-1/3 p-2">
          <ImagesUploader name="image3" defaultValue={data.image3} />
        </div>
      </div>
      <ImageUpload /> */}
      <UploadToS3
        siteId={params.id}
        defaultValue={data?.image!}
        name={"image"}
      />
      <GalleryUpload siteId={params.id} defaultValues={getSiteImages(data)}/>
      <Form
        title="Logo"
        description="The logo for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 400x400."
        inputAttrs={{
          name: "logo",
          type: "file",
          defaultValue: data?.logo!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Font"
        description="The font for the heading text your site."
        helpText="Please select a font."
        inputAttrs={{
          name: "font",
          type: "select",
          defaultValue: data?.font!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="404 Page Message"
        description="Message to be displayed on the 404 page."
        helpText="Please use 240 characters maximum."
        inputAttrs={{
          name: "message404",
          type: "text",
          defaultValue: data?.message404!,
          placeholder: "Blimey! You've found a page that doesn't exist.",
          maxLength: 240,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
