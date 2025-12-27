import { TabsContent } from "@/components/ui/tabs";
import { SidebarTypes } from "../sidebar";
import { AddableElements } from "@/data/editor-data";
import { AddableElement } from "./addable-element";

type Props = {};

export const AddElement = (props: Props) => {
  return (
    <TabsContent value={"Add" as SidebarTypes} className="ml-4 h-full pr-4">
      <h1 className="font-bold text-[30px]">Add Elements</h1>
      <p className="text-[16px] opacity-75 leading-tight">
        Drag and Drop the elements into the canvas
      </p>

      <div className="flex items-center flex-wrap gap-x-6 gap-y-6 mt-8">
        {AddableElements.map((addableElement) => (
          <AddableElement
            addableElement={addableElement}
            key={addableElement.name}
          />
        ))}
      </div>
    </TabsContent>
  );
};
