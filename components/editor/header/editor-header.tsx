"use client";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorActions } from "@/slices/editor-slice";
import clsx from "clsx";
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
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { MobileEditorHeaderMenu } from "./mobile-editor-header-menu";
import { ScreenSizeBtn } from "./screen-size-btn";
import { RealmPage } from "@prisma/client";

type Props = {
  realmPage?: RealmPage;
};

export const EditorHeader = (props: Props) => {
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
          "!-top-[200rem] !h-0": editor.viewingMode === "preview",
        })}
      >
        <nav
          className={clsx(
            "fixed left-0 top-0 z-50 flex h-[66px] w-full items-center justify-between border-b border-th-border px-[16px] transition-all duration-300",
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
              {props.realmPage ? (
                <p className="text-[14px] font-light text-[#d4d4d4]">
                  Last updated:{" "}
                  {new Date(props.realmPage.updatedAt).toLocaleDateString(
                    "en-gb",
                  )}
                </p>
              ) : (
                <p className="text-[14px] font-light text-[#d4d4d4]">
                  Last updated: now
                </p>
              )}
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
