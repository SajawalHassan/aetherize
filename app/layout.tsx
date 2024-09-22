import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Aetherize",
  description:
    "This is Aetherize, a website made by Sajawal Hassan. It is a website builder built using NextJS, TailwindCSS, React Framer Motion. It includes many features",
  alternates: {
    canonical: new URL("https://aetherize.vercel.app/"),
  },
  applicationName: "Aetheize",
  category: "Website Builder",
  keywords: ["Sajawal Hassan", "Aetherize", "Website Builder", "ReactJS", "NextJS"],
  openGraph: {
    type: "website",
    siteName: "Aetherize",
    description:
      "This is Aetherize, a website made by Sajawal Hassan. It is a website builder built using NextJS, TailwindCSS, React Framer Motion. It includes many features",
    url: "https://aetherize.vercel.app/",
    title: "Aetherize",
  },
  authors: [
    {
      name: "Sajawal Hassan",
      url: "https://sajawalhassan.vercel.app/",
    },
  ],
  creator: "Sajawal Hassan",
  publisher: "Vercel / GCP / AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased text-white bg-black`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
