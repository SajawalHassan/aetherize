import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/store-hook";
import {
  fonts,
  fontTypes,
  fontWeights,
  fontWeightTypes,
  tabBtns,
  textUnits,
} from "@/lib/constants";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { editorActions } from "@/slices/editor-slice";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { InputDropdown } from "@/components/ui/input-dropdown";

type Props = {};

export const CustomizationTab = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const dispatch = useDispatch();

  const { selectedElement, elements } = useAppSelector((state) => state.editor);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElement) return;

    const property = e.target.id;
    const propertyValue = e.target.value;

    const propertyObject = {
      [property]: propertyValue,
    };

    dispatch(
      editorActions.updateElement({
        elementId: selectedElement.id,
        elementsArray: elements,
        elementData: {
          ...selectedElement,
          content: { ...selectedElement.content, ...propertyObject },
        },
      }),
    );
  };

  const handleStyleChange = (e: any) => {
    if (!selectedElement) return;

    const property = e.target.id;
    const propertyValue = e.target.value;

    const propertyObject = {
      [property]: propertyValue,
    };

    dispatch(
      editorActions.updateElement({
        elementId: selectedElement.id,
        elementsArray: elements,
        elementData: {
          ...selectedElement,
          containerStyles: {
            ...selectedElement.containerStyles,
            ...propertyObject,
          },
        },
      }),
    );
  };

  return (
    <TabsContent value={"Customization" as tabBtns}>
      <Accordion
        type="multiple"
        className="w-full space-y-[20px] pt-4"
        defaultValue={["custom", "typography"]}
      >
        <h3 className="mb-4 text-center text-3xl font-bold">
          {selectedElement ? "Customization" : "No element selected"}
        </h3>

        {selectedElement && (
          <>
            {/* Custom props */}
            <AccordionItem value="custom" className="border-white/10">
              <AccordionCustomTrigger text="Custom props" />
              <AccordionContent className="mt-4">
                {selectedElement &&
                  !Array.isArray(selectedElement.content) &&
                  selectedElement.type === "link" && (
                    <Input
                      id="href"
                      placeholder="https://example.com"
                      value={selectedElement.content.href}
                      onChange={handleCustomChange}
                    />
                  )}
                {selectedElement &&
                  !Array.isArray(selectedElement.content) &&
                  selectedElement.type === "text" && (
                    <Input
                      id="text"
                      placeholder="Your text..."
                      value={selectedElement.content.text}
                      onChange={handleCustomChange}
                    />
                  )}
                {selectedElement &&
                  !Array.isArray(selectedElement.content) &&
                  selectedElement.type === "image" && (
                    <Input
                      id="imageSrc"
                      placeholder="Image url"
                      value={selectedElement.content.imageSrc}
                      onChange={handleCustomChange}
                    />
                  )}
                {selectedElement &&
                  !Array.isArray(selectedElement.content) &&
                  selectedElement.type === "video" && (
                    <Input
                      id="videoSrc"
                      placeholder="Video url"
                      value={selectedElement.content.videoSrc}
                      onChange={handleCustomChange}
                    />
                  )}
              </AccordionContent>
            </AccordionItem>

            {/* Typography */}
            <AccordionItem
              value="typography"
              className="relative border-white/10"
            >
              <TooltipProvider delayDuration={150}>
                <AccordionCustomTrigger text="Typography" />
                <AccordionContent className="mt-4 space-y-[18px]">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Text alignment</p>
                    <Tabs
                      onValueChange={(e) =>
                        handleStyleChange({
                          target: {
                            id: "textAlign",
                            value: e,
                          },
                        })
                      }
                    >
                      <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
                        <TabsTrigger
                          value="left"
                          className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                          tooltipText="Align left"
                        >
                          <AlignLeftIcon size={18} />
                        </TabsTrigger>
                        <TabsTrigger
                          value="right"
                          className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                          tooltipText="Align right"
                        >
                          <AlignRightIcon size={18} />
                        </TabsTrigger>
                        <TabsTrigger
                          value="center"
                          className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                          tooltipText="Align center"
                        >
                          <AlignCenterIcon size={18} />
                        </TabsTrigger>
                        <TabsTrigger
                          value="justify"
                          className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                          tooltipText="Align justify"
                        >
                          <AlignJustifyIcon size={18} />
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="flex flex-col">
                    <Label className="pl-2">Font</Label>
                    <Select
                      defaultValue={"Roboto" as fontTypes}
                      onValueChange={(e) =>
                        handleStyleChange({
                          target: {
                            id: "fontFamily",
                            value: e,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="border-b border-transparent border-b-white/10 bg-transparent text-[16px] font-medium hover:border-b-white/20">
                        <SelectValue
                          placeholder="Select a font"
                          className="text-[16px] font-medium"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-[20rem] w-full overflow-y-auto border-none bg-th-btn text-white">
                        {fonts.map((font) => (
                          <SelectItem
                            key={font}
                            value={font}
                            className="focus:bg-white/10 focus:text-white"
                          >
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <Label className="pl-2">Text Color</Label>
                    <div className="flex items-center justify-between border-b border-transparent border-b-white/10 bg-transparent pl-[10px] hover:border-b-white/20">
                      <Input
                        className="border-none bg-transparent p-0 text-[16px] font-medium text-white focus:border-transparent focus-visible:ring-0"
                        value={selectedElement.containerStyles.color || "#fff"}
                        onChange={(e) => {
                          handleStyleChange({
                            target: {
                              id: "color",
                              value: e.target.value.includes("#")
                                ? e.target.value
                                : `#${e.target.value}`,
                            },
                          });
                        }}
                      />
                      <div
                        className="h-[40px] w-[50px] cursor-pointer"
                        style={{
                          backgroundColor:
                            selectedElement.containerStyles.color || "white",
                        }}
                        onClick={() => setShowColorPicker(true)}
                      />
                    </div>

                    {showColorPicker && (
                      <>
                        <div
                          className="fixed inset-0 z-0"
                          onClick={() => setShowColorPicker(false)}
                        />
                        <div className="absolute -bottom-[8rem] right-0 bg-th-btn p-2">
                          <HexColorPicker
                            color={selectedElement.containerStyles.color}
                            onChange={(e) => {
                              handleStyleChange({
                                target: {
                                  id: "color",
                                  value: e,
                                },
                              });
                            }}
                            className="z-20"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label className="pl-2">Font weight</Label>
                    <Select
                      value={
                        (selectedElement.containerStyles.fontWeight ||
                          "500") as fontWeightTypes
                      }
                      onValueChange={(e) =>
                        handleStyleChange({
                          target: {
                            id: "fontWeight",
                            value: e,
                          },
                        })
                      }
                    >
                      <SelectTrigger className="border-b border-transparent border-b-white/10 bg-transparent text-[16px] font-medium hover:border-b-white/20">
                        <SelectValue
                          placeholder="Select a font weight"
                          className="text-[16px] font-medium"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-[20rem] w-full overflow-y-auto border-none bg-th-btn text-white">
                        {fontWeights.map((fontWeight) => (
                          <SelectItem
                            key={fontWeight}
                            value={fontWeight}
                            className="focus:bg-white/10 focus:text-white"
                          >
                            {fontWeight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <InputDropdown
                    id="fontSize"
                    placeholder="fontSize"
                    onChange={handleStyleChange}
                    value={
                      (selectedElement.containerStyles.fontSize as string) || ""
                    }
                    defaultValue="px"
                    dropdownList={textUnits}
                    className="border-x-0 border-b border-t-0 border-b-white/10 bg-transparent"
                  />
                </AccordionContent>
              </TooltipProvider>
            </AccordionItem>

            {/* Dimensions */}
            <AccordionItem value="dimensions" className="border-white/10">
              <AccordionCustomTrigger text="Dimensions" />
              <AccordionContent className="flex flex-col gap-y-4 pt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <InputDropdown
                      id="height"
                      placeholder="height"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles.height as string) || ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="width"
                      placeholder="width"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles.width as string) || ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />
                  </div>
                  <div className="flex gap-4">
                    <InputDropdown
                      id="minHeight"
                      placeholder="min height"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles.minHeight as string) ||
                        ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="minWidth"
                      placeholder="min width"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles.minWidth as string) ||
                        ""
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
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles.marginTop as string) ||
                        ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="marginBottom"
                      placeholder="Bottom"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles
                          .marginBottom as string) || ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />
                  </div>
                  <div className="flex gap-x-4">
                    <InputDropdown
                      id="marginLeft"
                      placeholder="Left"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles
                          .marginLeft as string) || ""
                      }
                      defaultValue="px"
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="marginRight"
                      placeholder="Right"
                      onChange={handleStyleChange}
                      value={
                        (selectedElement.containerStyles
                          .marginRight as string) || ""
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
                        onChange={handleStyleChange}
                        value={
                          (selectedElement.containerStyles
                            .paddingTop as string) || ""
                        }
                        defaultValue="px"
                        dropdownList={textUnits}
                      />

                      <InputDropdown
                        id="paddingBottom"
                        placeholder="Bottom"
                        onChange={handleStyleChange}
                        value={
                          (selectedElement.containerStyles
                            .paddingBottom as string) || ""
                        }
                        defaultValue="px"
                        dropdownList={textUnits}
                      />
                    </div>
                    <div className="flex gap-4">
                      <InputDropdown
                        id="paddingLeft"
                        placeholder="Left"
                        onChange={handleStyleChange}
                        value={
                          (selectedElement.containerStyles
                            .paddingLeft as string) || ""
                        }
                        defaultValue="px"
                        dropdownList={textUnits}
                      />

                      <InputDropdown
                        id="paddingRight"
                        placeholder="Right"
                        onChange={handleStyleChange}
                        value={
                          (selectedElement.containerStyles
                            .paddingRight as string) || ""
                        }
                        defaultValue="px"
                        dropdownList={textUnits}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="decorations" className="border-white/10">
              <AccordionCustomTrigger text="Decorations" />
              <AccordionContent className="flex flex-col gap-y-4 pt-4">
                <div className="flex flex-col">
                  <Label className="pl-2">Background Color</Label>
                  <div className="flex items-center justify-between border-b border-transparent border-b-white/10 bg-transparent pl-[10px] hover:border-b-white/20">
                    <Input
                      className="border-none bg-transparent p-0 text-[16px] font-medium text-white focus:border-transparent focus-visible:ring-0"
                      value={
                        selectedElement.containerStyles.backgroundColor ||
                        "#fff"
                      }
                      onChange={(e) => {
                        handleStyleChange({
                          target: {
                            id: "backgroundColor",
                            value: e.target.value.includes("#")
                              ? e.target.value
                              : `#${e.target.value}`,
                          },
                        });
                      }}
                    />
                    <div
                      className="h-[40px] w-[50px] cursor-pointer"
                      style={{
                        backgroundColor:
                          selectedElement.containerStyles.backgroundColor ||
                          "white",
                      }}
                      onClick={() => setShowBackgroundColorPicker(true)}
                    />
                  </div>

                  {showBackgroundColorPicker && (
                    <>
                      <div
                        className="fixed inset-0 z-0"
                        onClick={() => setShowBackgroundColorPicker(false)}
                      />
                      <div className="absolute bottom-[6rem] right-10 bg-th-btn p-2">
                        <HexColorPicker
                          color={
                            selectedElement.containerStyles.backgroundColor
                          }
                          onChange={(e) => {
                            handleStyleChange({
                              target: {
                                id: "backgroundColor",
                                value: e,
                              },
                            });
                          }}
                          className="z-20"
                        />
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
    </TabsContent>
  );
};

export const AccordionCustomTrigger = ({ text }: { text: string }) => {
  return (
    <AccordionTrigger className="flex h-[48px] w-full items-center gap-x-[10px] rounded-[5px] bg-th-btn/40 px-[10px] hover:bg-th-btn/60 active:bg-th-btn/80">
      <p className="text-[18px] font-medium">{text}</p>
    </AccordionTrigger>
  );
};
