import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title = "The Fairfield Programming Association";
const description =
  "The FPA empowers learners with interactive, hands-on educational resources tailored for beginners and experts alike.";
const image = "https://fairfieldprogramming.org/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://fairfieldprogramming.org/favicon.ico"],
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
    creator: "@fairfieldprogramming",
  },
  metadataBase: new URL("https://fairfieldprogramming.org"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
