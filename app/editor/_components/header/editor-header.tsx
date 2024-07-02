"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronLeft,
  EyeIcon,
  LaptopIcon,
  Redo2Icon,
  SmartphoneIcon,
  TabletIcon,
  Undo2Icon,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { ScreenSizeBtn } from "./screen-size-btn";
import { Switch } from "@/components/ui/switch";
import { Loader } from "@/components/loader";
import { MobileEditorHeaderMenu } from "./mobile-editor-header-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorActions } from "@/slices/editor-slice";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {};

export const EditorHeader = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const editor = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useMemo(() => {
    setCanUndo(!!editor.prevEditorState);
    setCanRedo(!!editor.nextEditorState);
  }, [editor.prevEditorState, editor.nextEditorState]);

  useHotkeys("ctrl+z", () => {
    if (!canUndo) return;
    handleUndo();
  });

  useHotkeys(["ctrl+y", "ctrl+shift+z"], () => {
    if (!canRedo) return;
    handleRedo();
  });

  const handleUndo = () => {
    if (!editor.prevEditorState) return;

    dispatch(
      editorActions.undoEditorState({
        ...editor.prevEditorState,
      }),
    );
  };

  const handleRedo = () => {
    if (!editor.nextEditorState) return;

    dispatch(
      editorActions.redoEditorState({
        ...editor.nextEditorState,
      }),
    );
  };

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted)
    return <Loader className="h-screen w-screen overflow-y-hidden" />;

  return (
    <TooltipProvider delayDuration={200}>
      <Button
        size={"icon"}
        tooltipText="Development mode"
        onClick={() => {
          setIsChecked(false);
          dispatch(editorActions.changeViewingMode("development"));
        }}
        className={clsx(
          editor.viewingMode === "preview"
            ? "fixed left-2 top-2 z-50"
            : "hidden",
        )}
      >
        <EyeIcon size={29} />
      </Button>
      <header
        className={clsx("h-[66px] transition-all duration-300", {
          "!-top-[200rem]": editor.viewingMode === "preview",
        })}
      >
        <nav
          className={clsx(
            "border-th-border fixed left-0 top-0 z-50 flex h-[66px] w-full items-center justify-between border-b px-[16px] transition-all duration-300",
            {
              "!-top-[200rem]": editor.viewingMode === "preview",
            },
          )}
        >
          <aside className="flex items-start gap-x-[6px]">
            <Button
              size={"icon"}
              tooltipText="Go back"
              onClick={() => router.back()}
            >
              <ChevronLeft size={29} />
            </Button>
            <div className="flex flex-col items-stretch">
              <div className="flex h-[24px] cursor-pointer items-center justify-between rounded-sm bg-th-btn px-[10px] py-[3px]">
                <p className="text-[15px]">Path: /</p>
                <ChevronDown size={20} />
              </div>
              <p className="text-[14px] font-light text-[#d4d4d4]">
                Last updated: 9/6/24
              </p>
            </div>
          </aside>

          <aside className="flex items-center gap-x-[6px]">
            <div className="hidden items-center gap-x-[6px] md:flex">
              <ScreenSizeBtn
                Icon={SmartphoneIcon}
                tooltipText="Mobile view"
                value="mobile"
              />
              <ScreenSizeBtn
                Icon={TabletIcon}
                tooltipText="Tablet view"
                value="tablet"
              />
              <ScreenSizeBtn
                Icon={LaptopIcon}
                tooltipText="Laptop view"
                value="laptop"
              />
            </div>
            <MobileEditorHeaderMenu />
          </aside>

          <aside className="hidden items-center gap-x-[10px] md:flex">
            <Button
              size={"icon"}
              tooltipText="Undo"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo2Icon size={24} />
            </Button>
            <Button
              size={"icon"}
              tooltipText="Redo"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo2Icon size={24} />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild className="bg-th-btn">
                <Switch
                  className="h-[40px] w-[78px] data-[state=unchecked]:bg-th-btn"
                  thumbClassName="w-[40px] h-[40px] rounded-full bg-th-accent data-[state=checked]:bg-th-secondary"
                  checked={isChecked}
                  onCheckedChange={(checked: boolean) => {
                    setIsChecked(true);
                    dispatch(
                      editorActions.changeViewingMode(
                        checked ? "preview" : "development",
                      ),
                    );
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="border-white/10 bg-th-btn text-white">
                <p>Preview mode</p>
              </TooltipContent>
            </Tooltip>
            <Button className="h-[40px] w-[82px] rounded-[5px] bg-th-secondary text-[16px] font-bold text-white hover:bg-th-secondary/80 active:bg-th-secondary/60">
              Save
            </Button>
          </aside>
        </nav>
      </header>
    </TooltipProvider>
  );
};
