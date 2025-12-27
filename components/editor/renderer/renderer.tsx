import { BodyElement } from "./elements/body-element";

type Props = {};

export const Renderer = (props: Props) => {
  return (
    <div className="border min-h-[calc(100vh-86px)] w-full bg-white text-black">
      <BodyElement />
    </div>
  );
};
