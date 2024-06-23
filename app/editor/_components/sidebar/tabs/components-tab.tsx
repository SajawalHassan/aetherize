import { TabsContent } from "@/components/ui/tabs";
import { tabBtns } from "@/lib/constants";
import { ComponentsList } from "../../components-list";
import { useComponentsItems } from "@/hooks/use-components-items";

type Props = {};

export const ComponentsTab = (props: Props) => {
  const items = useComponentsItems();

  return (
    <TabsContent value={"Components" as tabBtns}>
      <ComponentsList items={items} />
    </TabsContent>
  );
};
