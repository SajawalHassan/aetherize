import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { editorActions } from "@/slices/editor-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleStyleChange } from "@/lib/helper";
import {
  AlignCenterHorizontalIcon,
  AlignCenterVerticalIcon,
  AlignEndHorizontalIcon,
  AlignEndVerticalIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignStartHorizontalIcon,
  AlignStartVerticalIcon,
  AlignVerticalSpaceAroundIcon,
  AlignVerticalSpaceBetweenIcon,
  Columns2Icon,
  ColumnsIcon,
  FlipHorizontal2Icon,
  FlipHorizontalIcon,
  Rows2Icon,
  RowsIcon,
  SpaceIcon,
  WrapTextIcon,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

type Props = {};

export const CustomPropsAccordion = (props: Props) => {
  const { elements, selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

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

  return (
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
        {selectedElement &&
          Array.isArray(selectedElement.content) &&
          selectedElement.type === "mCol" && (
            <div className="space-y-4">
              {/* Justify content */}
              <div>
                <Label className="text-muted-foreground">Justify content</Label>
                <TooltipProvider delayDuration={0}>
                  <Tabs
                    onValueChange={(e) =>
                      handleStyleChange(
                        {
                          target: {
                            id: "justifyContent",
                            value: e,
                          },
                        },
                        selectedElement!,
                        elements,
                        dispatch,
                      )
                    }
                  >
                    <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
                      <TabsTrigger
                        value="flex-start"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "flex-start"
                        }
                        tooltipText="Flex start"
                      >
                        <AlignStartVerticalIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="flex-end"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "flex-end"
                        }
                        tooltipText="Flex end"
                      >
                        <AlignEndVerticalIcon size={18} />
                      </TabsTrigger>

                      <TabsTrigger
                        value="center"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "center"
                        }
                        tooltipText="Center"
                      >
                        <AlignCenterVerticalIcon size={18} />
                      </TabsTrigger>

                      <TabsTrigger
                        value="space-between"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "space-between"
                        }
                        tooltipText="Space between"
                      >
                        <AlignVerticalSpaceBetweenIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="space-around"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "space-around"
                        }
                        tooltipText="Space around"
                      >
                        <AlignVerticalSpaceAroundIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="space-evenly"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.justifyContent ===
                          "space-evenly"
                        }
                        tooltipText="Space evenly"
                      >
                        <SpaceIcon size={18} />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </TooltipProvider>
              </div>

              {/* Flex wrap */}
              <div>
                <Label className="text-muted-foreground">Flex wrap</Label>
                <TooltipProvider delayDuration={0}>
                  <Tabs
                    onValueChange={(e) =>
                      handleStyleChange(
                        {
                          target: {
                            id: "flexWrap",
                            value: e,
                          },
                        },
                        selectedElement!,
                        elements,
                        dispatch,
                      )
                    }
                  >
                    <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
                      <TabsTrigger
                        value="wrap"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexWrap === "wrap"
                        }
                        tooltipText="Wrap"
                      >
                        <WrapTextIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="nowrap"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexWrap === "nowrap"
                        }
                        tooltipText="No wrap"
                      >
                        <FlipHorizontalIcon size={18} />
                      </TabsTrigger>

                      <TabsTrigger
                        value="wrap-reverse"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexWrap ===
                          "wrap-reverse"
                        }
                        tooltipText="Reverse wrap"
                      >
                        <FlipHorizontal2Icon size={18} />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </TooltipProvider>
              </div>

              {/* Flex direction */}
              <div>
                <Label className="text-muted-foreground">Flex wrap</Label>
                <TooltipProvider delayDuration={0}>
                  <Tabs
                    onValueChange={(e) =>
                      handleStyleChange(
                        {
                          target: {
                            id: "flexDirection",
                            value: e,
                          },
                        },
                        selectedElement!,
                        elements,
                        dispatch,
                      )
                    }
                  >
                    <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
                      <TabsTrigger
                        value="column"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexDirection ===
                          "column"
                        }
                        tooltipText="Column"
                      >
                        <ColumnsIcon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="row"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexDirection ===
                          "row"
                        }
                        tooltipText="Row"
                      >
                        <RowsIcon size={18} />
                      </TabsTrigger>

                      <TabsTrigger
                        value="column-reverse"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexDirection ===
                          "column-reverse"
                        }
                        tooltipText="Reverse column"
                      >
                        <Columns2Icon size={18} />
                      </TabsTrigger>
                      <TabsTrigger
                        value="row-reverse"
                        className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                        data-active={
                          selectedElement.containerStyles.flexDirection ===
                          "row-reverse"
                        }
                        tooltipText="Reverse row"
                      >
                        <Rows2Icon size={18} />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </TooltipProvider>
              </div>
            </div>
          )}
      </AccordionContent>
    </AccordionItem>
  );
};
