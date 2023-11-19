import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { usePolyfire } from "polyfire-js/hooks";
import React, { useState, useEffect } from "react";

const title =
  "Platforms Starter Kit – The all-in-one starter kit for building multi-tenant applications.";
const description =
  "The Platforms Starter Kit is a full-stack Next.js app with multi-tenancy and custom domain support. Built with Next.js App Router, Vercel Postgres and the Vercel Domains API.";
const image = "https://vercel.pub/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://vercel.pub/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@vercel",
  },
  metadataBase: new URL("https://vercel.pub"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, models } = usePolyfire();
  const { login, status } = auth;
  const [helloWorld, setHelloWorld] = useState<string>();
  const { generate } = models;
  let element = null;

  useEffect(() => {
    if (status === "authenticated") {
      generate("Write a hello world haiku").then(setHelloWorld);
    }
  }, [status]);
  if (status == "unauthenticated")
    element = (
      <button onClick={() => login("github")}>Login With GitHub</button>
    );
  else if (status == "loading") element = <div>Loading...</div>;
  else if (status == "authenticated")
    element = <div>We already logged in!</div>;
  else element = <div />;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {element}
          polyfire^
          {helloWorld}
          hello world
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
