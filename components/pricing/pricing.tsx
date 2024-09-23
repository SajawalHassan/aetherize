import React from "react";
import { PricingCard } from "./pricing-card";
import { priceTiers } from "@/static-data/pricing-data";

interface Props {}

export const Pricing = (props: Props) => {
  return (
    <section className="2xl:px-[17px] flex flex-col justify-center mt-[600px] ">
      <h2 className="text-[45px] font-bold text-center sm:text-[50px]">
        <span className="text-th-accent">Affordable</span> Prices Tailored To You
      </h2>
      <div className="space-y-[50px] kys:space-y-0 2xl:mx-auto mt-10 flex flex-col xl:flex-row items-center justify-center gap-8 px-[17px]">
        {priceTiers.map((priceTier) => (
          <PricingCard {...priceTier} key={priceTier.name} />
        ))}
      </div>
    </section>
  );
};
