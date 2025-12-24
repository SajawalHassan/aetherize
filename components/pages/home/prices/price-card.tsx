import { Button } from "@/components/ui/button";
import { PriceCardType } from "@/data/prices-data";
import { PriceFeature } from "./price-feature";
import clsx from "clsx";

type Props = {
  priceCardData: PriceCardType;
};

export const PriceCard = ({ priceCardData: data }: Props) => {
  return (
    <div
      className={clsx(
        "bg-linear-to-br from-black/25 to-black2 px-6 rounded-4xl py-5 relative max-w-107.5 min-h-175.75",
        data.priorityLvl === 1 && "from-[#284F86]! to-[#124768]! min-h-187.5"
      )}
    >
      <h1
        className={clsx(
          "font-bold text-[48px] bg-linear-to-r from-accent to-primary w-max bg-clip-text text-transparent",
          data.priorityLvl === 0 && "text-white!"
        )}
      >
        {data.name}
      </h1>
      <p className="text-[16px] opacity-75">{data.description}</p>

      <div className="relative mt-5 w-max ml-4">
        <p className="bg-linear-to-b from-accent to-primary text-[40px] font-bold absolute top-10 -left-5 bg-clip-text text-transparent">
          $
        </p>
        <h2 className="font-bold text-[128px]">{data.price.toString()}</h2>
        <p className="uppercase text-[20px] font-bold opacity-75 absolute top-10 -right-7">
          /Mo
        </p>
      </div>
      <Button className="rounded-full bg-primary/75 font-bold text-[24px] h-11.75 w-full max-w-[20rem] mx-auto -mt-2">
        Get Started
      </Button>

      <div
        className={clsx(
          "flex flex-col gap-y-8 mt-8 mb-4",
          data.priorityLvl === 1 && "mt-15 gap-y-8"
        )}
      >
        {data.features.map((feature, i) => (
          <PriceFeature feature={feature} key={i} />
        ))}
      </div>
    </div>
  );
};
