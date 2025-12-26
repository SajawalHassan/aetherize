import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const Separator = (props: Props) => {
  return (
    <div
      className={cn(
        "self-stretch w-px border-l border-border",
        props.className
      )}
    />
  );
};
