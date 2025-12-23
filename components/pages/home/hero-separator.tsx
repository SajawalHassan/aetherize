import { ChevronDownIcon } from "lucide-react";

type Props = {};

export const HeroSeparator = (props: Props) => {
  return (
    <div className="relative w-full">
      <div className="bg-linear-to-b from-primary to-accent rounded-full w-10 h-10 flex items-center justify-center mx-auto relative z-10">
        <ChevronDownIcon className="h-7 w-7 mt-0.5" />
      </div>
      <div className="h-1 rounded-full bg-linear-to-r from-primary to-accent w-full absolute m-auto inset-0 z-0" />
    </div>
  );
};
