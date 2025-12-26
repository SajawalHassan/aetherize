import { priceCardsData } from "@/data/prices-data";
import { PriceCard } from "./price-card";

type Props = {};

export const Prices = (props: Props) => {
  return (
    <div className="mt-50 pb-20 relative lg:mt-100 xl:mt-150">
      <div className="absolute w-500 mx-auto inset-x-0 -ml-50 rounded-full min-h-180 h-full z-0">
        <div className="absolute inset-0 bg-primary rounded-full filter blur-[200px] opacity-20"></div>
      </div>

      <div className="z-10 relative">
        <h1 className="text-[45px] font-bold leading-none md:text-center md:text-[65px]">
          <span className="text-accent">Affordable</span> Prices Tailored to
          You.
        </h1>

        <div className="flex flex-col gap-y-10 items-center mt-15 lg:mt-30 xl:flex-row xl:gap-x-4 xl:items-center xl:justify-center">
          {priceCardsData.map((priceCard) => (
            <PriceCard priceCardData={priceCard} key={priceCard.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
