import { TabsContent } from "@/components/ui/tabs";
import { TextBtn } from "../../elements/element-buttons/text-btn";
import { ContainerBtn } from "../../elements/element-buttons/container-btn";

type Props = {};

export const ComponentsTab = (props: Props) => {
  return (
    <TabsContent value="Components" className="py-4">
      <h2 className="text-center text-2xl font-bold">Add a component</h2>
      <div className="mt-6 flex items-center gap-x-2">
        <TextBtn />
        <ContainerBtn />
      </div>
    </TabsContent>
  );
};
