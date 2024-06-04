"use client";

import { useAppDispatch } from "@/hooks/store-hook";
import { EditorElement } from "@/slices/editor-slice";

type Props = {
  element: EditorElement;
};

export const Text = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <span>
      {!Array.isArray(props.element.content) && props.element.content.innerText}
    </span>
  );
};
