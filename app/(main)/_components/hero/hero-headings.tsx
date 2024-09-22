import { SubText } from "@/components/sub-text";
import React from "react";

interface Props {}

export const HeroHeadings = (props: Props) => {
  return (
    <div aria-details="Hero headings for Aetherize by Sajawal Hassan">
      <h2 className="text-[48px] md:text-[69px] xl:text-[86px] 2xl:text-[96px] font-bold leading-[100%] mb-[8px] [text-shadow:0px_4px_4px_#000000]">
        <span className="text-th-primary">Drag</span> &amp; <span className="text-th-primary">Drop</span> a website into
        the internet
      </h2>
      <SubText
        text="Effortlessly create stunning, professional websites with our intuitive drag-and-drop builder. No coding skills required. "
        className="sm:px-10 max-w-[728px] xl:max-w-[900px] mx-auto"
      />
    </div>
  );
};
