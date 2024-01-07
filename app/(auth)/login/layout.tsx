import BackgroundAnimation from "@/components/background-animation";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | ReRoto",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="background-animate flex h-screen min-h-screen w-full flex-col justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-12 sm:px-6 lg:px-8">
      <BackgroundAnimation />
      {children}
    </div>
  );
}
