import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import React from "react";

const title =
  "Brownstone Pods – The place for pioneers, adventureres and world travellers.";
const description =
  "The Brownstone Pods is an Ai first platform for hosting your own Pods shared living Apartmnet, where global citizens rent month to month and are accomodated by an innovatie Ai community manager.";
const image = "/brownstone-logo.png";

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
  console.log("in layout");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
