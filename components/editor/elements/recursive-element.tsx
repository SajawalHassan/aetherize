import { EditorElement } from "@/store/slices/editor-slice";
import React, { useEffect, useState } from "react";
import { BodyElement } from "./body-element";
import { ContainerElement } from "./container-element";
import { TextElement } from "./text-element";

type Props = {
  element: EditorElement;
};

export const RecursiveElement = (props: Props) => {
  switch (props.element.type) {
    case "__body":
      return <BodyElement />;
    case "container":
      return <ContainerElement element={props.element} />;
    case "text":
      return <TextElement />;
  }
};
