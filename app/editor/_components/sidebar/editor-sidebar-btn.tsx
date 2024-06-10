import { Button } from "@/components/ui/button";
import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tabBtns } from "@/lib/constants";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  value: tabBtns;
};

export const EditorSidebarBtn = (props: Props) => {
  return (
    <Tooltip>
      <TabsTrigger
        value={props.value}
        className={clsx(
          "h-full flex-grow rounded-none bg-th-btn/50 text-white hover:bg-th-btn/80 data-[state=active]:bg-th-btn data-[state=active]:text-white",
        )}
      >
        <TooltipTrigger>
          <props.Icon className="h-[32px] w-[32px]" />
        </TooltipTrigger>
      </TabsTrigger>
      <TooltipContent className={clsx("border-white/10 bg-th-btn text-white")}>
        <p>{props.value}</p>
      </TooltipContent>
    </Tooltip>
  );
};
