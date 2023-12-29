"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useS3Upload } from "next-s3-upload";
import { updateUser } from "@/lib/database/user";
import LoadingDots from "@/components/icons/loading-dots";
import { toast } from "sonner";

interface ProfileAvatarProps {
  defaultValue?: string;
  userId: string;
  userEmail: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  defaultValue,
  userId,
  userEmail,
}) => {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValue || null);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { uploadToS3 } = useS3Upload();

  useEffect(() => {
    let fileReader = false;
    let isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl({ image: result });
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);
  // useEffect(() => {
  //   let url: string | null = null;
  //   if (image) {
  //     // const fileReader = new FileReader();
  //     // fileReader.onload = (e) => {
  //     //   const { result } = e.target;
  //     //   if (result) {
  //     //     setImageUrl(result);
  //     //   }
  //     // };
  //     // fileReader.readAsDataURL(image);
  //     // url = URL.createObjectURL(image);
  //     // setImageUrl(url);

  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageUrl(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(image);
  //   }
  //   // Revoke the blob URL when the component unmounts or a new image is selected
  //   return () => {
  //     if (url) {
  //       URL.revokeObjectURL(url);
  //     }
  //   };
  // }, [image]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("handle upload ", file, event.target.files);

    if (file) {
      // Check file size (e.g., limit to 5MB)
      if (file.size > 5000000) {
        toast.error("File is too large! Must be less than 5MB");
        return;
      }
      setImage(file);
      // setImageUrl(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("on load ", e);

        setData((prev) => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    setSaving(true);

    if (image) {
      const { url } = await uploadToS3(image);
      await updateUser(userId, { image: url });
    }
    setSaving(false);

    toast.success("Profile Avatar Uploaded!");
  };

  const saveDisabled = useMemo(() => {
    return saving;
  }, [saving]);

  console.log("render imageUrl: ", imageUrl);

  return (
    <div className="p-4">
      <h3 className="text-xl">Profile Avatar</h3>
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <img
          src={
            defaultValue ||
            data.image ||
            `https://avatar.vercel.sh/${userEmail}`
          }
          className={`my-4 h-[300px] w-[300px] rounded-full border-white ${
            imageUrl ? "object-cover" : "object-fill"
          }`}
          alt="Profile"
        />
      </label>
      <input
        id="avatar-upload"
        ref={inputRef}
        type="file"
        className="sr-only"
        onChange={handleImageUpload}
      />
      <button onClick={handleConfirm}>Confirm</button>
      <div className="flex">
        <button
          disabled={saveDisabled}
          className={`${
            saveDisabled
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 items-center justify-center rounded-md border bg-surface-mixed-200 px-4 text-sm transition-all focus:outline-none`}
          onClick={handleConfirm}
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
};

export default ProfileAvatar;
