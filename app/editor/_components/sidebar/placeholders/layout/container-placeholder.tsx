import { handleDragStart } from "../helpers";

type Props = {};

export const ContainerPlaceholder = (props: Props) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "container")}
      className="flex h-full w-full cursor-pointer gap-[4px] rounded-lg bg-black/70 p-4 hover:bg-black/20"
    >
      <div className="h-full w-full rounded-sm border-[1px] border-dashed border-muted-foreground/50 bg-muted-foreground/20" />
    </div>
  );
};
