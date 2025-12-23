import { priceCardsData } from "@/data/prices-data";
import { PriceCard } from "./price-card";

type Props = {};

export const Prices = (props: Props) => {
  return (
    <div className="mt-50 pb-20">
      <h1 className="text-[45px] font-bold leading-none">
        <span className="text-accent">Affordable</span> Prices Tailored to You.
      </h1>

      <div className="flex flex-col gap-y-10 mt-15">
        {priceCardsData.map((priceCard) => (
          <PriceCard priceCardData={priceCard} key={priceCard.name} />
        ))}
      </div>
    </div>
  );
};
