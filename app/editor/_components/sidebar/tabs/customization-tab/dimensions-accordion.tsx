import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from ".";
import { textUnits } from "@/lib/constants";
import { useAppSelector } from "@/hooks/store-hook";
import { InputDropdown } from "@/components/ui/input-dropdown";
import { Button } from "@/components/ui/button";
import { ExpandIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {};

export const DimensionsAccordion = (props: Props) => {
  const { selectedElement } = useAppSelector((state) => state.editor);
  return (
    <AccordionItem value="dimensions" className="border-white/10">
      <AccordionCustomTrigger text="Dimensions" />
      <TooltipProvider>
        <AccordionContent className="space-y-4 pt-4">
          {/* Width and Height */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <p className="text-muted">Width / Height</p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-max bg-transparent p-1.5">
                    <ExpandIcon size={14} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="rounded-bg-btn flex gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div>
                    <p className="mb-2 text-muted">Min Width / Min Height</p>
                    <div className="space-y-2">
                      <InputDropdown
                        id="maxWidth"
                        placeholder="Max width"
                        value={
                          (selectedElement!.containerStyles.width as string) ||
                          ""
                        }
                        dropdownList={textUnits}
                      />

                      <InputDropdown
                        id="minWidth"
                        placeholder="min width"
                        value={
                          (selectedElement!.containerStyles
                            .minWidth as string) || ""
                        }
                        dropdownList={textUnits}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-muted">Max Width / Max Height</p>
                    <div className="space-y-2">
                      <InputDropdown
                        id="maxHeight"
                        placeholder="max height"
                        value={
                          (selectedElement!.containerStyles
                            .maxHeight as string) || ""
                        }
                        dropdownList={textUnits}
                      />

                      <InputDropdown
                        id="maxWidth"
                        placeholder="max width"
                        value={
                          (selectedElement!.containerStyles
                            .maxWidth as string) || ""
                        }
                        dropdownList={textUnits}
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-4">
              <InputDropdown
                id="width"
                placeholder="width"
                value={(selectedElement!.containerStyles.width as string) || ""}
                dropdownList={textUnits}
              />

              <InputDropdown
                id="height"
                placeholder="height"
                value={
                  (selectedElement!.containerStyles.height as string) || ""
                }
                dropdownList={textUnits}
              />
            </div>
          </div>

          {/* Padding */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <p className="text-muted">Padding</p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-max bg-transparent p-1.5">
                    <ExpandIcon size={14} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="rounded-bg-btn flex gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div className="space-y-2">
                    <InputDropdown
                      id="paddingTop"
                      placeholder="Top"
                      value={
                        (selectedElement!.containerStyles
                          .paddingTop as string) || ""
                      }
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="paddingBottom"
                      placeholder="Bottom"
                      value={
                        (selectedElement!.containerStyles
                          .paddingBottom as string) || ""
                      }
                      dropdownList={textUnits}
                    />
                  </div>

                  <div className="space-y-2">
                    <InputDropdown
                      id="paddingRight"
                      placeholder="Right"
                      value={
                        (selectedElement!.containerStyles
                          .paddingRight as string) || ""
                      }
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="paddingLeft"
                      placeholder="Left"
                      value={
                        (selectedElement!.containerStyles
                          .paddingLeft as string) || ""
                      }
                      dropdownList={textUnits}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <InputDropdown
              id="padding"
              placeholder="padding"
              value={(selectedElement!.containerStyles.padding as string) || ""}
              dropdownList={textUnits}
            />
          </div>

          {/* Margin */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <p className="text-muted">Margin</p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-max bg-transparent p-1.5">
                    <ExpandIcon size={14} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="rounded-bg-btn flex gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div className="space-y-2">
                    <InputDropdown
                      id="marginTop"
                      placeholder="Top"
                      value={
                        (selectedElement!.containerStyles
                          .marginTop as string) || ""
                      }
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="marginBottom"
                      placeholder="Bottom"
                      value={
                        (selectedElement!.containerStyles
                          .marginBottom as string) || ""
                      }
                      dropdownList={textUnits}
                    />
                  </div>

                  <div className="space-y-2">
                    <InputDropdown
                      id="marginRight"
                      placeholder="Right"
                      value={
                        (selectedElement!.containerStyles
                          .marginRight as string) || ""
                      }
                      dropdownList={textUnits}
                    />

                    <InputDropdown
                      id="marginLeft"
                      placeholder="Left"
                      value={
                        (selectedElement!.containerStyles
                          .marginLeft as string) || ""
                      }
                      dropdownList={textUnits}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <InputDropdown
              id="margin"
              placeholder="margin"
              value={(selectedElement!.containerStyles.margin as string) || ""}
              dropdownList={textUnits}
            />
          </div>
        </AccordionContent>
      </TooltipProvider>
    </AccordionItem>
  );
};
