"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  heading: string;
  children: React.ReactNode;
};

export const AuthCardWrapper = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-screen items-center justify-center px-2">
      <div className="relative w-full max-w-[25rem] rounded-md bg-black/20 p-4 text-white shadow-md shadow-black">
        <TooltipProvider>
          <Button
            size={"icon"}
            onClick={() => router.back()}
            className="absolute left-4 top-4"
          >
            <ChevronLeftIcon />
          </Button>
          <h1 className="mb-4 text-center text-3xl font-bold">
            {props.heading}
          </h1>
          {props.children}
        </TooltipProvider>
      </div>
    </div>
  );
};
