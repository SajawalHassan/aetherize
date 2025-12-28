import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export const Badge = (props: Props) => {
  return (
    <div
      className={cn(
        "p-1 pt-0 pl-2 text-sm text-white bg-blue-500 absolute top-0 right-0 font-semibold",
        props.className
      )}
    >
      {props.text}
    </div>
  );
};
