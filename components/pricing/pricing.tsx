import React from "react";
import { PricingCard } from "./pricing-card";
import { priceTiers } from "@/static-data/pricing-data";

interface Props {}

export const Pricing = (props: Props) => {
  return (
    <section
      aria-label="Pricing Section"
      aria-description="The pricing section"
      className="mt-[180px] mb-40 px-[17px] flex flex-col justify-center">
      <h2 className="text-[45px] font-bold text-center sm:text-[50px]">
        <span className="text-th-accent">Affordable</span> Prices Tailored To You
      </h2>
      <div className="space-y-[50px] kys:space-y-0 mx-auto mt-10 flex items-center flex-wrap justify-center gap-[17px]">
        {priceTiers.map((priceTier) => (
          <PricingCard {...priceTier} key={priceTier.name} />
        ))}
      </div>
    </section>
  );
};
