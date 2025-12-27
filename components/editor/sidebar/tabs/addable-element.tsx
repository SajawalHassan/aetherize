import { Button } from "@/components/ui/button";
import { AddableElementType } from "@/data/editor-data";

type Props = {
  addableElement: AddableElementType;
};

export const AddableElement = (props: Props) => {
  return (
    <Button
      variant={"icon"}
      className="h-20! w-20! p-0! border border-border rounded-sm flex-col"
    >
      <props.addableElement.icon className="icon" />
      <p className="opacity-75">{props.addableElement.name}</p>
    </Button>
  );
};
