import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EyeIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { editorActions } from "@/slices/editor-slice";

type Props = {};

export const MobileEditorHeaderMenu = (props: Props) => {
  const editor = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

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
    <Sheet>
      <SheetTrigger className="inline-flex h-[40px] w-[40px] items-center justify-center whitespace-nowrap rounded-md bg-th-btn text-sm font-medium text-th-text ring-offset-background transition-colors hover:bg-th-btn/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-th-btn/60 disabled:pointer-events-none disabled:opacity-50 md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="border-none bg-th-bg text-white sm:max-w-[30rem]">
        <h1 className="text-center text-4xl font-bold">Options</h1>

        <aside className="mt-5 flex h-[60px] items-center overflow-hidden rounded-md">
          <Button
            size={"icon"}
            tooltipClassName="flex-grow bg-th-btn h-full rounded-none"
            onClick={handleUndo}
          >
            <Undo2Icon size={24} />
          </Button>
          <Separator orientation="vertical" className="bg-white/20" />
          <Button
            onClick={handleRedo}
            size={"icon"}
            tooltipClassName="flex-grow bg-th-btn h-full rounded-none"
          >
            <Redo2Icon size={24} />
          </Button>
          <Separator orientation="vertical" className="bg-white/20" />
          <Button
            size={"icon"}
            tooltipClassName="flex-grow bg-th-btn h-full rounded-none"
          >
            <EyeIcon size={24} />
          </Button>
        </aside>
        <Button className="mt-5 h-[40px] w-[82px] rounded-[5px] bg-th-secondary text-[16px] font-bold text-white hover:bg-th-secondary/80 active:bg-th-secondary/60">
          Save
        </Button>
      </SheetContent>
    </Sheet>
  );
};
