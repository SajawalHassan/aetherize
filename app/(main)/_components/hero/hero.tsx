import { GlassBackground } from "@/components/glass-background";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { HeroHeadings } from "./hero-headings";
import { CTAButtons } from "../cta-buttons";
import { Separator } from "@/components/separator";

interface Props {}

export const Hero = (props: Props) => {
  return (
    <main
      className="px-[16px] text-center mt-[61px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1348px] mx-auto flex flex-col items-center justify-center"
      aria-label="Main Section"
      aria-description="The hero section of the landing page for Aetherize">
      <div className="mx-auto">
        <HeroHeadings />
        <CTAButtons className="mt-[22px]" />

        {/* Separator */}
        <div className="relative h-[40px] w-[90%] mx-auto my-8 flex items-center" aria-hidden>
          <Separator />
          <div className="p-[3px] rounded-full bg-gradient-to-b from-th-accent to-th-primary w-max h-max absolute inset-0 m-auto">
            <ChevronDownIcon size={30} className="text-white" />
          </div>
        </div>
      </div>

      <GlassBackground
        className="max-w-[1348px] max-h-[659px]"
        containerClassName="mx-auto aspect-video"
        ariaLabel="Aetherize Hero Section Editor Image"
        ariaDescription="The image of the inside the Aetherize platform"
      />
    </main>
  );
};
