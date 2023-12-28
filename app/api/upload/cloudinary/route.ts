import type { NextApiRequest, NextApiResponse } from "next";
import { createReadStream, createWriteStream, unlink } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import os from "os";
import path from "path";
import cloudinary from "cloudinary";

const streamPipeline = promisify(pipeline);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function saveFile(
  readable: NodeJS.ReadableStream,
  filePath: string,
): Promise<void> {
  const writable = createWriteStream(filePath);
  await streamPipeline(readable, writable);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  // Configure Cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res.status(400).json({ message: "Invalid content type" });
  }

  const tmpdir = os.tmpdir();
  const filePath = path.join(tmpdir, "upload.tmp");

  try {
    console.log("inside (req, filePath): ", req, filePath);

    await saveFile(req, filePath);

    // Upload file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(filePath);
    unlink(filePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.status(200).json({ message: "Upload successful", url: result.url });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
