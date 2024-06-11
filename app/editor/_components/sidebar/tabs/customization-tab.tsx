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

type Props = {};

export const CustomizationTab = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
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
          styles: { ...selectedElement.styles, ...propertyObject },
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
              <TooltipProvider>
                <AccordionCustomTrigger text="Typography" />
                <AccordionContent className="mt-4 space-y-[18px]">
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
                        value={selectedElement.styles.color || "#FFF"}
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
                            selectedElement.styles.color || "white",
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
                        <div className="absolute right-0 top-[10rem] bg-th-btn p-2">
                          <HexColorPicker
                            color={selectedElement.styles.color}
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
                      defaultValue={"100" as fontWeightTypes}
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
                </AccordionContent>
              </TooltipProvider>
            </AccordionItem>

            {/* Layout */}
            <AccordionItem value="layout" className="border-white/10">
              <AccordionCustomTrigger text="Layout" />
              <AccordionContent className="mt-4">
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
                      >
                        <AlignLeftIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="right"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                      >
                        <AlignRightIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="center"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                      >
                        <AlignCenterIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="justify"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn"
                      >
                        <AlignJustifyIcon size={18} />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Decorations */}
            <AccordionItem value="decorations" className="border-white/10">
              <AccordionCustomTrigger text="Decorations" />
              <AccordionContent className="mt-4">asdasdasf</AccordionContent>
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
