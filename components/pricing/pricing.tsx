import React from "react";
import { PricingCard } from "./pricing-card";
import { priceTiers } from "@/static-data/pricing-data";

type Props = {};

export const Pricing = (props: Props) => {
  return (
    <section aria-label="Pricing Section" aria-description="The pricing section" className="mt-[180px] mb-40 px-[17px]">
      <h2 className="text-[45px] font-bold text-center">
        <span className="text-th-accent">Affordable</span> Prices Tailored To You
      </h2>
      <div className="space-y-[40px]">
        {priceTiers.map((priceTier) => (
          <PricingCard {...priceTier} key={priceTier.name} />
        ))}
      </div>
    </section>
  );
};
