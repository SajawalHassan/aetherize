import { DispatchType, handleStyleChange } from "@/lib/helper";
import { EditorElement, Trigger } from "@/slices/editor-slice";
import { useEffect } from "react";

export const useTriggerChange = (
  tiggers: Trigger[],
  currentElement: EditorElement,
  elements: EditorElement[],
  dispatch: DispatchType,
) => {
  let prevCssPropValue = "";

  useEffect(() => {
    tiggers.map((trigger) => {
      if (currentElement.id !== trigger.elementId) return;
      if (trigger.value === trigger.triggerValue) {
        prevCssPropValue = trigger.cssPropValue;

        handleStyleChange(
          {
            target: {
              id: trigger.cssProp,
              value: trigger.cssPropValue,
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
              id: trigger.cssProp,
              value: prevCssPropValue,
            },
          },
          currentElement!,
          elements,
          dispatch,
        );
      }
    });
  }, [tiggers]);
};
