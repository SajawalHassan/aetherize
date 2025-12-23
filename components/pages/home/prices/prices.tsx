import { priceCardsData } from "@/data/prices-data";
import { PriceCard } from "./price-card";

type Props = {};

export const Prices = (props: Props) => {
  return (
    <div className="mt-60 pb-20">
      <h1 className="text-[45px] font-bold leading-none">
        <span className="text-accent">Affordable</span> Priced Tailored to You.
      </h1>

      {priceCardsData.map((priceCard) => (
        <PriceCard priceCardData={priceCard} key={priceCard.name} />
      ))}
    </div>
  );
};
