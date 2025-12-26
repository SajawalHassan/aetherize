import { Button } from "@/components/ui/button";
import { HeroSeparator } from "./hero-separator";
import { Glow } from "@/components/ui/glow";
import Link from "next/link";

type Props = {};

export const Hero = (props: Props) => {
  return (
    <div className="flex flex-col items-center mt-12 md:mt-20 lg:mt-25">
      <div className="max-w-242 2xl:max-w-300 flex flex-col items-center">
        <h1 className="text-[48px] md:text-[68px] font-bold text-center leading-none">
          <span className="text-primary">Drag</span> &{" "}
          <span className="text-primary">Drop</span> a website into the internet
        </h1>
        <p className="text-center text-[15px] md:text-[20px] opacity-75 mt-4">
          Effortlessly create stunning, professional websites with our intuitive
          drag-and-drop builder. No coding skills required.{" "}
        </p>
        <div className="flex items-center gap-x-4 mt-6 mb-12.5 lg:mb-20 lg:mt-10">
          <Link href={"/playground"}>
            <Button variant={"special"}>Go to Playground</Button>
          </Link>
          <Button variant={"secondary"}>Create an Account</Button>
        </div>
        <HeroSeparator />
      </div>
      <Glow
        className="mt-12.5 lg:mt-20"
        glowClassName={"min-h-60 md:min-h-120 xl:min-h-160"}
      >
        <div className="min-h-60 md:min-h-120 xl:min-h-160 w-full bg-[#1E1E1E] rounded-4xl"></div>
      </Glow>
    </div>
  );
};
