import { editorActions } from "@/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

type Props = {};

export const OnClickSelect = (props: Props) => {
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const { elements, selectedElement, triggers } = useAppSelector(
    (state) => state.editor,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !Array.isArray(selectedElement?.content) &&
      selectedElement?.type === "button"
    ) {
      setSelectedTrigger(selectedElement?.content.onClick?.methodValue || "");
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-[40px] w-full items-center justify-between bg-th-btn/30 px-3 hover:bg-th-btn/50 active:bg-th-btn/70">
        <p className="font-bold">OnClick</p>
        <p className="">{selectedTrigger ? `Change trigger` : "-"}</p>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer py-2.5 focus:bg-black/20 data-[state=open]:bg-black/20">
            Change trigger
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-none bg-th-btn p-0 text-white">
              {triggers.length > 0 ? (
                triggers.map((trigger) => (
                  <DropdownMenuItem
                    key={trigger.id}
                    className="focus:bg-black/20 focus:text-white"
                    onClick={(e) => {
                      setSelectedTrigger(trigger.name);
                      dispatch(
                        editorActions.updateElement({
                          elementId: selectedElement!.id,
                          elementsArray: elements,
                          elementData: {
                            ...selectedElement!,
                            content: {
                              ...selectedElement!.content,
                              onClick: {
                                methodName: "changeVar",
                                methodValue: trigger.id,
                              },
                            },
                          },
                        }),
                      );
                    }}
                  >
                    {trigger.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <p className="p-2">No triggers</p>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
