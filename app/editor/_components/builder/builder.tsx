import { useAppSelector } from "@/hooks/store-hook";
import { Recursive } from "./builder-elements/recursive";
import clsx from "clsx";

type Props = {};

export const Builder = (props: Props) => {
  const { elements, device } = useAppSelector((state) => state.editor);

  return (
    <div className={clsx("flex-grow")}>
      <div
        className={clsx("mx-auto h-full transition-all duration-500", {
          "max-w-[412px]": device === "mobile",
          "max-w-[1024px]": device === "tablet",
          "max-w-full": device === "laptop",
        })}
      >
        {elements.map((element) => (
          <Recursive element={element} key={element.id} />
        ))}
      </div>
    </div>
  );
};
