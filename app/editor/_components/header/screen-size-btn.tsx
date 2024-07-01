"use client";

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { deviceTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorActions } from "@/slices/editor-slice";

type Props = {
  Icon: LucideIcon;
  text?: string;
  tooltipText?: string;
  className?: string;
  value: deviceTypes;
};

export const ScreenSizeBtn = (props: Props) => {
  const { device } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(editorActions.changeDevice(props.value));
  };

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          "flex h-[40px] w-[40px] items-center justify-center gap-x-1 whitespace-nowrap rounded-md bg-th-btn text-sm font-medium text-th-text ring-offset-background transition-colors hover:bg-th-btn/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-th-btn/60 disabled:pointer-events-none disabled:opacity-50",
          props.className,
          device === props.value && "bg-[#4E4E4E]",
        )}
        onClick={handleOnClick}
      >
        <props.Icon />
        {props.text && <p className="hidden sm:block">{props.text}</p>}
      </TooltipTrigger>
      <TooltipContent
        className={clsx("border-white/10 bg-th-btn text-white", {
          hidden: !props.tooltipText,
        })}
      >
        <p>{props.tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
