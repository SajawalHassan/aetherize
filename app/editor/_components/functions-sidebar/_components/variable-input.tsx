import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/store-hook";
import { Variable, editorActions } from "@/slices/editor-slice";
import { TrashIcon } from "lucide-react";
import React, { FormEvent, useState } from "react";

type Props = {
  variable: Variable;
};

export const VariableInput = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useAppDispatch();

  const handleVariableChange = (newValue: string) => {
    dispatch(
      editorActions.updateVariables({
        ...props.variable,
        value: newValue,
      }),
    );
  };

  const handleNameChange = (newName: string) => {
    dispatch(
      editorActions.updateVariables({
        ...props.variable,
        name: newName,
      }),
    );
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleVariableChange(props.variable.value);
  };

  switch (props.variable.type) {
    case "color":
      return (
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
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
            <Button className="h-max w-max p-1.5">
              <TrashIcon size={16} />
            </Button>
          </div>

          <ColorPicker
            colorPickerClassName="top-[4rem] inset-x-0 mx-auto"
            setShowColorPicker={setShowColorPicker}
            showColorPicker={showColorPicker}
            value={props.variable.value || "#fffff"}
            onChange={handleVariableChange}
          />
        </div>
      );
    case "string":
      return (
        <form onSubmit={(e) => handleFormSubmit(e)} className="relative">
          <div className="mb-2 flex items-center justify-between">
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleNameChange(
                  (e.currentTarget as HTMLParagraphElement).innerText,
                )
              }
              className="mb-1 ml-2"
            >
              {props.variable.name}
            </p>
            <Button className="h-max w-max p-1.5">
              <TrashIcon size={16} />
            </Button>
          </div>
          <Input
            value={props.variable.value}
            onChange={(e) => handleVariableChange(e.target.value)}
            placeholder="Your value"
            className="rounded-none border-transparent border-b-th-btn bg-transparent focus:border-transparent focus:border-b-th-btn"
          />
        </form>
      );
    case "number":
      return (
        <form onSubmit={(e) => handleFormSubmit(e)} className="relative">
          <div className="mb-2 flex items-center justify-between">
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleNameChange(
                  (e.currentTarget as HTMLParagraphElement).innerText,
                )
              }
              className="mb-1 ml-2"
            >
              {props.variable.name}
            </p>
            <Button className="h-max w-max p-1.5">
              <TrashIcon size={16} />
            </Button>
          </div>
          <Input
            value={props.variable.value}
            onChange={(e) =>
              handleVariableChange(e.target.value.split(/(\d+)/)[1] || "")
            }
            placeholder="Your value"
            className="rounded-none border-transparent border-b-th-btn bg-transparent focus:border-transparent focus:border-b-th-btn"
          />
        </form>
      );
  }
};
