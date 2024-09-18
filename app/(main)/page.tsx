import React from "react";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero/hero";
import { Pricing } from "@/components/pricing/pricing";
import { CTASection } from "./_components/cta-section";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Pricing />
      <CTASection />
    </div>
  );
};

export default Page;
