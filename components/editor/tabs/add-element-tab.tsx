import { Button } from "@/components/button";
import { ElementPlaceholderButton } from "@/components/element-placeholder-button";
import { IconButton } from "@/components/icon-button";
import { TabsContent } from "@/components/ui/tabs";
import { editorActions, ElementTypes } from "@/store/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/store/store-hooks";
import { BoxIcon, TypeIcon } from "lucide-react";
import { v4 } from "uuid";

interface Props {}

export const AddElementTab = (props: Props) => {
  const editor = useAppSelector((state) => state.editorStore);
  const dispatch = useAppDispatch();

  const addElement = (type: ElementTypes) => {
    const containerId = editor.selectedElements.length > 0 ? editor.selectedElements[0] : "__body";

    switch (type) {
      case "container":
        dispatch(
          editorActions.addElement({
            name: "Container",
            content: {},
            containerId,
            id: v4(),
            styles: {},
            type,
          })
        );
        break;
      case "text":
        dispatch(
          editorActions.addElement({
            name: "Text",
            content: {
              text: "This is some text!",
            },
            containerId,
            id: v4(),
            styles: {},
            type,
          })
        );
        break;
    }
  };

  return (
    <TabsContent value={"add"} className="bg-th-prot w-full rounded-[10px] p-[15px]">
      <h2 className="font-bold text-[28px]">Add a New Element</h2>
      <div className="flex items-center gap-x-[12px] flex-wrap mt-[18px]">
        <ElementPlaceholderButton Icon={BoxIcon} text="Container" onClick={() => addElement("container")} />
        <ElementPlaceholderButton Icon={TypeIcon} text="Text" onClick={() => addElement("text")} />
      </div>
    </TabsContent>
  );
};
