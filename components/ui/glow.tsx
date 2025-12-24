"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  glowClassName: string;
};

export const Glow: React.FC<Props> = ({
  children,
  className,
  glowClassName,
}) => {
  return (
    <div className={cn("w-full relative h-full", className)}>
      <div className={cn("relative w-full", glowClassName)}>
        <div className="absolute inset-0 bg-primary rounded filter blur-[30px] opacity-50"></div>
      </div>
      <div className="absolute top-0 w-full">{children}</div>
    </div>
  );
};
