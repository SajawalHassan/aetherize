import { Button } from "@/components/button";
import { GlassBackground } from "@/components/glass-background";
import { IconButton } from "@/components/icon-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/store-hooks";
import clsx from "clsx";
import { ChevronDownIcon, EyeIcon, RedoIcon, SparklesIcon, UndoIcon } from "lucide-react";
import { useMemo } from "react";

interface Props {}

export const EditorHeader = (props: Props) => {
  const editorState = useAppSelector((state) => state.editorStore);
  const isPlayground = useMemo(() => editorState.devMode === "playground", [editorState.devMode]);

  return (
    <TooltipProvider delayDuration={0}>
      <header>
        <nav
          // initial={{ opacity: 0, translateY: -100 }}
          // animate={{ opacity: 1, translateY: 0 }}
          // transition={{ duration: 0.25, delay: 0.25 }}
          className={clsx("flex items-center gap-x-[28px] flex-row-reverse")}>
          <GlassBackground
            className="w-[400px] h-[64px]"
            backgroundClassName="blur-[150px]"
            containerClassName="flex items-center rounded-[10px] justify-between h-full w-full px-[16px]">
            <div className="flex items-center gap-x-[13px]">
              <IconButton variant="outline" Icon={UndoIcon} tooltipText="Undo" />
              <IconButton variant="outline" Icon={RedoIcon} tooltipText="Redo" />
              <IconButton variant="outline" Icon={EyeIcon} tooltipText="Preview" />
              <IconButton variant="special" Icon={SparklesIcon} tooltipText="Upgrade" />
            </div>

            <Button variant="special" text="Save" className="!py-[7px] !px-[34px] !duration-100" />
          </GlassBackground>

          <GlassBackground
            className="w-[291px] h-[64px]"
            backgroundClassName="blur-[150px]"
            containerClassName="flex items-center rounded-[10px] justify-between h-full w-full px-[16px]">
            <div className="flex items-center gap-x-[14px]">
              {isPlayground && <div className="w-[38px] h-[38px] rounded-full bg-[#404040]" />}
              <div>
                <p className="text-[20px] font-bold">{isPlayground && "Playground"}</p>
                <p className="text-[13px] text-white/75">
                  {isPlayground &&
                    new Date().toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })}
                </p>
              </div>
            </div>

            <IconButton variant="outline" Icon={ChevronDownIcon} />
          </GlassBackground>
        </nav>
      </header>
    </TooltipProvider>
  );
};
