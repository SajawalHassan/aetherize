import React from "react";
import { PricingCard } from "./pricing-card";

type Props = {};

export const Pricing = (props: Props) => {
  return (
    <section aria-label="Pricing Section" aria-description="The pricing section" className="mt-[180px]">
      <PricingCard description="sadasd" features={["sadasd"]} name="Basic" price={0} type="normal" />
    </section>
  );
};
