"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";
import { Button } from "./button";
import { LightbulbIcon } from "lucide-react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const [show, setShow] = useState(true);

  return (
    <main>
      <div
        className={cn("relative flex flex-col  h-[100vh] items-center justify-center transition-bg", className)}
        {...props}>
        {show && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                `
              hidden md:block
            [--white-gradient:repeating-linear-gradient(100deg,#46F9B9_0%,#46F9B9_7%,var(--transparent)_10%,var(--transparent)_12%,#46F9B9_16%)]
            [--aurora:repeating-linear-gradient(100deg,#00E0FF_20%,#00E0FF_15%,#00E0FF_40%,#00E0FF_25%,#00E0FF_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,-50%_-50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -z-20 -inset-[10px]  will-change-transform`,

                showRadialGradient &&
                  `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
              )}></div>
          </div>
        )}
        {children}
      </div>
      <Button
        variant="primary"
        className="fixed top-[18px] inset-x-0 mx-auto w-max lg:top-[80px] p-2 hidden md:block z-50"
        onClick={() => setShow(!show)}>
        <LightbulbIcon />
      </Button>
    </main>
  );
};
