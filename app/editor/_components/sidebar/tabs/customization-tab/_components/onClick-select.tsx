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
  const [selectedVar, setSelectedVar] = useState("");

  const { elements, selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !Array.isArray(selectedElement?.content) &&
      selectedElement?.type === "button"
    ) {
      setSelectedVar(selectedElement?.content.onClick?.methodValue || "");
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-[40px] w-full items-center justify-between bg-th-btn/30 px-3 hover:bg-th-btn/50 active:bg-th-btn/70">
        <p className="font-bold">OnClick</p>
        <p className="">{selectedVar ? `Change variable` : "-"}</p>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer py-2.5 focus:bg-black/20 data-[state=open]:bg-black/20">
            Change variable
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-none bg-th-btn p-0 text-white">
              {variables.length > 0 ? (
                variables.map((variable) => (
                  <DropdownMenuItem
                    key={variable.id}
                    className="focus:bg-black/20 focus:text-white"
                    onClick={(e) => {
                      setSelectedVar(variable.variableName);
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
                                methodValue: variable.id,
                              },
                            },
                          },
                        }),
                      );
                    }}
                  >
                    {variable.variableName}
                  </DropdownMenuItem>
                ))
              ) : (
                <p className="p-2">No variables</p>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
