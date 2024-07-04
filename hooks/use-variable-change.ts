import { DispatchType, handleStyleChange } from "@/lib/helper";
import { EditorElement, Variable } from "@/slices/editor-slice";
import { useEffect } from "react";

export const useVariableChange = (
  variables: Variable[],
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  useEffect(() => {
    variables.map((variable) => {
      if (currentElement.id !== variable.elementId) return;
      handleStyleChange(
        {
          target: {
            id: variable.cssProp,
            value: variable.value + "px",
          },
        },
        currentElement,
        elements,
        dispatch,
      );
    });
  }, [variables]);
};
