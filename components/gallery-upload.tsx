"use client";

import { useState, useMemo, useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import LoadingDots from "@/components/icons/loading-dots";
import { updateSite } from "@/lib/database/site";
import { toast } from "sonner";

export default function GalleryUpload({ siteId, defaultValues }: any) {
  const [urls, setUrls] = useState(
    [...Object.values(defaultValues)].filter(Boolean),
  );
  const fileInputRef = useRef(null);

  const { uploadToS3 } = useS3Upload();

  const [dragActive, setDragActive] = useState(false);
  const handleFilesChange = async ({ target }) => {
    const currFiles = Array.from(target.files);
    console.log("handle files change: ", currFiles);

    handleNewFiles(currFiles);
  };
  const [saving, setSaving] = useState(false);

  const saveDisabled = useMemo(() => {
    return saving;
  }, [urls, saving]);

  const handleUpload = async () => {
    setSaving(true);
    const updateSiteData = {} as any;
    for (let index = 0; index < 7; index++) {
      const currUrl = urls[index] || "";
      console.log("uploading currUrl", currUrl, typeof currUrl);

      if (typeof currUrl !== "string") {
        const { url } = await uploadToS3(currUrl);
        console.log("upload to s3", url);
        updateSiteData[`image${index + 1}`] = url;
      } else {
        updateSiteData[`image${index + 1}`] = currUrl;
      }
    }
    updateSite(updateSiteData, siteId);
    setSaving(false);
    toast.success(`Successfully updated image gallery!`);
  };

  const handleRemove = (removeURL: string) => {
    console.log("handle remove");

    const index = urls.indexOf(removeURL);
    if (index !== -1) {
      setUrls(urls.filter((url, index) => url !== removeURL));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleNewFiles(droppedFiles);
  };

  const handleNewFiles = (fileArr: any) => {
    const currLen = urls.length;
    if (currLen >= 7) {
      return;
    }
    const openSpots = 7 - currLen;
    const droppedFilesToAdd = fileArr.slice(0, openSpots);
    const newFilesObj = {} as any;
    const newFileUrls = [];
    droppedFilesToAdd.forEach((newFile: any, index: number) => {
      const newKey = URL.createObjectURL(newFile);
      newFilesObj[index] = newFile;
      newFileUrls.push(newKey);
    });
    setUrls((curr) => [...curr, ...droppedFilesToAdd]);
  };

  return (
    <div>
      <h3 className="mb-4 text-xl text-white">Image Gallery</h3>
      <label htmlFor="image-gallery">
        <div
          className={`radius-xl border-1 mb-4 max-w-[600px]  cursor-pointer rounded-xl border-white py-4 ${
            dragActive ? "border-blue-500 bg-gray-200" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleDrop(e);
          }}
        >
          <div onClick={() => fileInputRef.current.click()}>
            <p className="mt-2 text-center text-sm text-gray-500">
              Drag and drop or click to upload up to 7 images
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size per image: 50MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div>
        </div>
      </label>
      <div className="flex flex-wrap">
        {urls.map((url, index) => (
          <div key={`file_${index}`} className="relative">
            <button
              className="absolute right-0 top-0 h-6 w-6 rounded-full bg-red-500 text-white"
              onClick={() => handleRemove(url)}
            >
              X
            </button>
            <img
              src={typeof url === "string" ? url : URL.createObjectURL(url)}
              alt=""
              className="m-2 h-[120px] w-[120px] rounded-xl "
            />
          </div>
        ))}
      </div>
      <input
        type="file"
        name="image-gallery"
        multiple={true}
        onChange={handleFilesChange}
        ref={fileInputRef}
        className="sr-only"
      />

      <div className="flex">
        <button
          disabled={saveDisabled}
          className={`${
            saveDisabled
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 items-center justify-center rounded-md border bg-surface-mixed-200 px-4 text-sm transition-all focus:outline-none`}
          onClick={handleUpload}
        >
          {saving ? (
            <LoadingDots color="#808080" />
          ) : (
            <p className="text-sm">Confirm upload</p>
          )}
        </button>
      </div>
    </div>
  );
}
