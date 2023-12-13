import React from "react";
import Image from "next/image";
import { TWITTER_URL } from "@/lib/constants";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="my-12 flex w-full max-w-screen-xl justify-between bg-gray-800 p-6 text-white dark:bg-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-lg dark:bg-white"
          />
          <div className="ml-4">
            <a href="app.brownstonelive.com" className="block">
              App
            </a>
            <a href="app.brownstonelive.com/blog" className="block">
              Blog
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ul>
          <li>
            <a
              href="https://app.brownstonelive.com/terms-of-service"
              className="mr-4 cursor-pointer"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="https://app.brownstonelive.com/privacy-policy"
              className="mr-4 cursor-pointer"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="mb-4 text-lg font-bold">Follow us</h2>
        <ul>
          {/* <li>
            <a href="#">Facebook</a>
          </li> */}
          <li>
            <a href={TWITTER_URL} className=" flex items-center justify-center">
              <FaTwitter className="mr-2" />
              Twitter
            </a>
          </li>
          {/* <li>
            <a href="#">Instagram</a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
