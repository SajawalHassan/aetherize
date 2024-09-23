"use client";

import { GlassBackground } from "@/components/glass-background";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { HeroHeadings } from "./hero-headings";
import { CTAButtons } from "../cta-buttons";
import { Separator } from "@/components/separator";
import { AuroraBackground } from "@/components/background-lights";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/scroll-animation";

interface Props {}

export const Hero = (props: Props) => {
  return (
    <AuroraBackground className="h-full">
      <main className="w-full h-full">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="px-[16px] text-center mt-[250px] lg:mt-[150px] z-50 md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1348px] 2xl:mx-auto flex flex-col items-center justify-center">
          <ContainerScroll
            titleComponent={
              <div className="mx-auto">
                <HeroHeadings />
                <CTAButtons className="mt-[22px]" />

                {/* Separator */}
                <div className="relative h-[40px] w-[90%] mx-auto my-8 lg:my-[150px] flex items-center" aria-hidden>
                  <Separator />
                  <div className="p-[3px] rounded-full bg-gradient-to-b from-th-accent to-th-primary w-max h-max absolute inset-0 m-auto">
                    <ChevronDownIcon size={30} className="text-white" />
                  </div>
                </div>
              </div>
            }>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.25 }}>
              <GlassBackground className="max-w-[1348px] max-h-[659px]" containerClassName="mx-auto aspect-video" />
            </motion.div>
          </ContainerScroll>
        </motion.article>
      </main>
    </AuroraBackground>
  );
};
