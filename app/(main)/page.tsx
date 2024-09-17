import React from "react";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero/hero";
import { Pricing } from "@/components/pricing/pricing";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Pricing />
    </div>
  );
};

export default Page;
