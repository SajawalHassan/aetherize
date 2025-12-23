import { CheckIcon } from "lucide-react";

type Props = {
  feature: string;
};

export const PriceFeature = (props: Props) => {
  return (
    <div className="flex items-center gap-x-4 border-b border-primary pb-3.5">
      <div className="rounded-full h-7 w-7 bg-primary flex items-center justify-center">
        <CheckIcon className="h-4.5 w-4.5" />
      </div>
      <p className="text-[18px] opacity-75">{props.feature}</p>
    </div>
  );
};
