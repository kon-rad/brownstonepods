"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";

import { PolyfireProvider } from "polyfire-js/hooks";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PolyfireProvider project="brownstone_120">
        <Toaster className="dark:hidden" />
        <Toaster theme="dark" className="hidden dark:block" />
        <ModalProvider>{children}</ModalProvider>
      </PolyfireProvider>
    </SessionProvider>
  );
}
