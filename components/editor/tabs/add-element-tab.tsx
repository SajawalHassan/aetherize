import { Button } from "@/components/button";
import { TabsContent } from "@/components/ui/tabs";
import { editorActions, ElementTypes } from "@/store/slices/editor-slice";
import { useAppDispatch } from "@/store/store-hooks";
import { v4 } from "uuid";

interface Props {}

export const AddElementTab = (props: Props) => {
  const dispatch = useAppDispatch();

  const addElement = (type: ElementTypes) => {
    switch (type) {
      case "container":
        dispatch(
          editorActions.addElement({ name: "Container", content: {}, path: `__body/`, id: v4(), styles: {}, type })
        );
        break;
      case "text":
        dispatch(editorActions.addElement({ name: "Text", content: {}, path: `__body/`, id: v4(), styles: {}, type }));
        break;
    }
  };

  return (
    <TabsContent value={"add"} className="bg-th-prot w-full rounded-[10px] p-4 space-x-2">
      <Button
        variant="primary"
        text="Add a container"
        className="text-base font-normal py-2 px-4"
        onClick={() => addElement("container")}
      />
      <Button
        variant="primary"
        text="Add some text"
        className="text-base font-normal py-2 px-4"
        onClick={() => addElement("text")}
      />
    </TabsContent>
  );
};
