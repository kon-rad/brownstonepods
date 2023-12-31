import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Brownstone Platform",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black py-12 dark:bg-black sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
