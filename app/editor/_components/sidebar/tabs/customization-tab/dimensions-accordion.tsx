import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { textUnits } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import { InputDropdown } from "@/components/ui/input-dropdown";

type Props = {};

export const DimensionsAccordion = (props: Props) => {
  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  return (
    <AccordionItem value="dimensions" className="border-white/10">
      <AccordionCustomTrigger text="Dimensions" />
      <AccordionContent className="flex flex-col gap-y-4 pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <InputDropdown
              id="height"
              placeholder="height"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "height", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={(selectedElement!.containerStyles.height as string) || ""}
              defaultValue="px"
              dropdownList={textUnits}
            />

            <InputDropdown
              id="width"
              placeholder="width"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "width", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={(selectedElement!.containerStyles.width as string) || ""}
              defaultValue="px"
              dropdownList={textUnits}
            />
          </div>
          <div className="flex gap-4">
            <InputDropdown
              id="minHeight"
              placeholder="min height"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "minHeight", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.minHeight as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />

            <InputDropdown
              id="minWidth"
              placeholder="min width"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "minWidth", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.minWidth as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="mb-2 border-b border-white/10 pb-1 text-muted">
            Margin
          </p>
          <div className="-mt-2 flex gap-x-4">
            <InputDropdown
              id="marginTop"
              placeholder="Top"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "marginTop", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.marginTop as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />

            <InputDropdown
              id="marginBottom"
              placeholder="Bottom"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "marginBottom", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.marginBottom as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />
          </div>
          <div className="flex gap-x-4">
            <InputDropdown
              id="marginLeft"
              placeholder="Left"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "marginLeft", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.marginLeft as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />

            <InputDropdown
              id="marginRight"
              placeholder="Right"
              onChange={(e) =>
                handleStyleChange(
                  { target: { id: "marginRight", value: e } },
                  selectedElement!,
                  elements,
                  dispatch,
                )
              }
              value={
                (selectedElement!.containerStyles.marginRight as string) || ""
              }
              defaultValue="px"
              dropdownList={textUnits}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-2 border-b border-white/10 pb-1 text-muted">
            Padding
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <InputDropdown
                id="paddingTop"
                placeholder="Top"
                onChange={(e) =>
                  handleStyleChange(
                    { target: { id: "paddingTop", value: e } },
                    selectedElement!,
                    elements,
                    dispatch,
                  )
                }
                value={
                  (selectedElement!.containerStyles.paddingTop as string) || ""
                }
                defaultValue="px"
                dropdownList={textUnits}
              />

              <InputDropdown
                id="paddingBottom"
                placeholder="Bottom"
                onChange={(e) =>
                  handleStyleChange(
                    { target: { id: "paddingBottom", value: e } },
                    selectedElement!,
                    elements,
                    dispatch,
                  )
                }
                value={
                  (selectedElement!.containerStyles.paddingBottom as string) ||
                  ""
                }
                defaultValue="px"
                dropdownList={textUnits}
              />
            </div>
            <div className="flex gap-4">
              <InputDropdown
                id="paddingLeft"
                placeholder="Left"
                onChange={(e) =>
                  handleStyleChange(
                    { target: { id: "paddingLeft", value: e } },
                    selectedElement!,
                    elements,
                    dispatch,
                  )
                }
                value={
                  (selectedElement!.containerStyles.paddingLeft as string) || ""
                }
                defaultValue="px"
                dropdownList={textUnits}
              />

              <InputDropdown
                id="paddingRight"
                placeholder="Right"
                onChange={(e) =>
                  handleStyleChange(
                    { target: { id: "paddingRight", value: e } },
                    selectedElement!,
                    elements,
                    dispatch,
                  )
                }
                value={
                  (selectedElement!.containerStyles.paddingRight as string) ||
                  ""
                }
                defaultValue="px"
                dropdownList={textUnits}
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
