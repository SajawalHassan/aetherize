import { DispatchType, handleStyleChange } from "@/lib/helper";
import { EditorElement, Trigger, Variable } from "@/slices/editor-slice";
import { useEffect } from "react";

export const useVariableChange = (
  variables: Variable[],
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  useEffect(() => {
    variables.map((trigger) => {
      if (currentElement.id !== trigger.elementId) return;
      handleStyleChange(
        {
          target: {
            id: trigger.cssProp,
            value: trigger.value,
          },
        },
        currentElement,
        elements,
        dispatch,
      );
    });
  }, [variables]);
};
