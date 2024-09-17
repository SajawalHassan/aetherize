import { SubText } from "@/components/sub-text";
import React from "react";

type Props = {};

export const HeroHeadings = (props: Props) => {
  return (
    <div aria-details="Hero headings for Aetherize by Sajawal Hassan">
      <h2 className="text-[48px] font-bold leading-[100%] mb-[8px]">
        <span className="text-th-primary">Drag</span> &amp; <span className="text-th-primary">Drop</span> a website into the internet
      </h2>
      <SubText text="Effortlessly create stunning, professional websites with our intuitive drag-and-drop builder. No coding skills required. " />
    </div>
  );
};
