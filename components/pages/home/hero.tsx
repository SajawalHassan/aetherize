import { Button } from "@/components/ui/button";
import { HeroSeparator } from "./hero-separator";
import { Glow } from "@/components/ui/glow";

type Props = {};

export const Hero = (props: Props) => {
  return (
    <div className="flex flex-col items-center px-6 mt-12">
      <h1 className="text-[48px] font-bold text-center leading-none">
        <span className="text-primary">Drag</span> &{" "}
        <span className="text-primary">Drop</span> a website into the internet
      </h1>
      <p className="text-center text-[15px] opacity-75 mt-4">
        Effortlessly create stunning, professional websites with our intuitive
        drag-and-drop builder. No coding skills required.{" "}
      </p>
      <div className="flex items-center gap-x-4 mt-6 mb-12.5">
        <Button variant={"special"}>Go to Playground</Button>
        <Button variant={"secondary"}>Create an Account</Button>
      </div>
      <HeroSeparator />
      <Glow className="mt-12.5">
        <div className="min-h-60 w-full bg-[#1E1E1E] rounded-4xl"></div>
      </Glow>
    </div>
  );
};
