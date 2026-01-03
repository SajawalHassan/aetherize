import { BodyElement } from "./body-element";

type Props = {};

export const Renderer = (props: Props) => {
  return (
    <div className="border min-h-[calc(100vh-86px)] max-h-[calc(100vh-86px)] overflow-y-scroll w-full bg-white text-black">
      <BodyElement />
    </div>
  );
};
