import React from "react";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero/hero";
import { Pricing } from "@/components/pricing/pricing";
import { CTASection } from "./_components/cta-section";

interface Props {}

const Page = (props: Props) => {
  return (
    <div>
      <Header />
      <Hero />
      <Pricing />
      <CTASection />
    </div>
  );
};

export default Page;