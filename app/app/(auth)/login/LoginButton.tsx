"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function LoginButton({ type, label, icon }: any) {
  const [loading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const [email, setEmail] = useState("");

  return (
    <>
      {type === "email" && (
        <div className="my-4 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
      )}
      <button
        disabled={loading}
        onClick={async () => {
          console.log("logging in with ", type);

          setLoading(true);
          if (type === "email") {
            // Trigger sign-in with email magic link
            const res = await signIn("email", { email, redirect: false });

            if (res?.error) {
              // Handle error responses from your API
              console.error("Error in email sign-in", res.error);
            } else {
              // Handle the success, like showing a message to check the email
              alert("Check your email for the sign-in link!");
            }
          } else {
            signIn(type);
          }
        }}
        className={`${
          loading
            ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
            : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
        } group  my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 text-stone-600 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
      >
        {loading ? (
          <LoadingDots color="#A8A29E" />
        ) : (
          <>
            <>
              {icon}
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                {label}
              </p>
            </>
          </>
        )}
      </button>
    </>
  );
}
