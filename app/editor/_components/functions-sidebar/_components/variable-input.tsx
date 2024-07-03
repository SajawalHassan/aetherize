import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/store-hook";
import { Variable, editorActions } from "@/slices/editor-slice";
import React, { useState } from "react";

type Props = {
  variable: Variable;
};

export const VariableInput = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useAppDispatch();

  const handleVariableChange = (newValue: string) => {
    dispatch(
      editorActions.changeVariable({
        ...props.variable,
        value: newValue,
      }),
    );
  };

  const handleNameChange = (newName: string) => {
    dispatch(
      editorActions.changeVariable({
        ...props.variable,
        name: newName,
      }),
    );
  };

  switch (props.variable.type) {
    case "color":
      return (
        <div className="relative">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleNameChange(
                (e.currentTarget as HTMLParagraphElement).innerText,
              )
            }
            className="pl-2"
          >
            {props.variable.name}
          </p>
          <ColorPicker
            colorPickerClassName="top-[4rem] inset-x-0 mx-auto"
            setShowColorPicker={setShowColorPicker}
            showColorPicker={showColorPicker}
            value={props.variable.value}
            onChange={handleVariableChange}
          />
        </div>
      );
  }
};
