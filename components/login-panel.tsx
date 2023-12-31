import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { Suspense } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const LoginPanel = () => {
  return (
    <div className="mx-5 border border-stone-200 bg-black py-10 dark:border-stone-700 dark:bg-black sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
      <Image
        alt="Brownstone Pods shared living"
        width={100}
        height={100}
        className="box-shadow-logo relative mx-auto h-12 w-auto dark:scale-110 dark:border dark:border-stone-400"
        src="/brownstone-logo.png"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Brownstone Pods Shared Living
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        The place for month-to-month rental for global citizens, pioneers and
        adventurers. Organized by an Ai community manager
        <br />
        <a
          className="font-large my-8 text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://brownstone.live/"
          rel="noreferrer"
          target="_blank"
        >
          Apply for a spot here
        </a>
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-surface-mixed-200 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton
            type="google"
            label="Login with Google"
            icon={<FaGoogle />}
          />
          <LoginButton
            type="facebook"
            label="Login with Facebook"
            icon={<FaFacebookSquare />}
          />
          <LoginButton
            type="apple"
            label="Login with Apple"
            icon={<FaApple />}
          />
          <LoginButton
            type="email"
            label="Send magic link"
            icon={<HiOutlineMail />}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPanel;
