import { GlassBackground } from "@/components/glass-background";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { HeroHeadings } from "./hero-headings";
import { CTAButtons } from "../cta-buttons";

type Props = {};

export const Hero = (props: Props) => {
  return (
    <main className="px-[16px] text-center mt-[61px] flex flex-col items-center justify-center" aria-label="Main Section" aria-description="The hero section of the landing page for Aetherize">
      <HeroHeadings />
      <CTAButtons />

      {/* Separator */}
      <div className="relative h-[40px] w-full my-8 flex items-center" aria-hidden>
        <div className="border-th-secondary border-[4px] w-full" />
        <div className="p-[3px] rounded-full bg-gradient-to-b from-th-accent to-th-primary w-max h-max absolute inset-0 m-auto">
          <ChevronDownIcon size={30} className="text-white" />
        </div>
      </div>

      <GlassBackground className="h-[215px]" ariaLabel="Aetherize Hero Section Editor Image" ariaDescription="The image of the inside the Aetherize platform" />
    </main>
  );
};
