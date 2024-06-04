import { EditorElement } from "@/slices/editor-slice";
import React from "react";
import { Recursive } from "./recursive";

type Props = {
  element: EditorElement;
};

export const Container = (props: Props) => {
  return (
    <div>
      {Array.isArray(props.element.content) &&
        props.element.content.map((childElement) => (
          <Recursive element={childElement} key={childElement.id} />
        ))}
    </div>
  );
};
