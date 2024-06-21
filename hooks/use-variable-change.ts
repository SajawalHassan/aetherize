import { DispatchType, handleStyleChange } from "@/lib/helper";
import { EditorElement, Variable } from "@/slices/editor-slice";
import { useEffect } from "react";

export const useVariableChange = (
  variables: Variable[],
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
  selectedElement: EditorElement | null,
) => {
  let prevCssPropValue = "";

  useEffect(() => {
    variables.map((variable) => {
      if (currentElement.id !== variable.elementId) return;
      if (variable.variableValue === variable.variableTrigger) {
        prevCssPropValue = variable.cssPropValue;

        handleStyleChange(
          {
            target: {
              id: variable.cssProp,
              value: variable.cssPropValue,
            },
          },
          currentElement!,
          elements,
          dispatch,
        );
      } else {
        handleStyleChange(
          {
            target: {
              id: variable.cssProp,
              value: prevCssPropValue,
            },
          },
          currentElement!,
          elements,
          dispatch,
        );
      }
    });
  }, [variables]);
};
