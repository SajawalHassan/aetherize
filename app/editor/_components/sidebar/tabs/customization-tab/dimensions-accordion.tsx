import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { AccordionCustomTrigger } from "../../../accordion-custom-trigger";
import {} from "@/lib/constants/option-constants";
import { useAppSelector } from "@/hooks/store-hook";
import { InputDropdown } from "@/app/editor/_components/sidebar/tabs/ui/input-dropdown";
import { Button } from "@/components/ui/button";
import { ExpandIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
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

                <DropdownMenuContent className="rounded-bg-btn flex flex-col gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div>
                    <p className="mb-2 text-muted">Minimum</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="minWidth"
                        placeholder="min width"
                        value={
                          (selectedElement!.styles.minWidth as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="minHeight"
                        placeholder="Min height"
                        value={
                          (selectedElement!.styles.minHeight as string) || ""
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-muted">Maximum</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="maxWidth"
                        placeholder="max width"
                        value={
                          (selectedElement!.styles.maxWidth as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="maxHeight"
                        placeholder="max height"
                        value={
                          (selectedElement!.styles.maxHeight as string) || ""
                        }
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="">
              <InputDropdown
                cssProp="width"
                placeholder="width"
                value={(selectedElement!.styles.width as string) || ""}
              />

              <InputDropdown
                cssProp="height"
                placeholder="height"
                value={(selectedElement!.styles.height as string) || ""}
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

                <DropdownMenuContent className="rounded-bg-btn flex flex-col gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div className="space-y-2">
                    <p className="mb-2 text-muted">Top / Bottom</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="paddingTop"
                        placeholder="Top"
                        value={
                          (selectedElement!.styles.paddingTop as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="paddingBottom"
                        placeholder="Bottom"
                        value={
                          (selectedElement!.styles.paddingBottom as string) ||
                          ""
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="mb-2 text-muted">Left / Right</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="paddingLeft"
                        placeholder="Left"
                        value={
                          (selectedElement!.styles.paddingLeft as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="paddingRight"
                        placeholder="Right"
                        value={
                          (selectedElement!.styles.paddingRight as string) || ""
                        }
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <InputDropdown
              cssProp="padding"
              placeholder="padding"
              value={(selectedElement!.styles.padding as string) || ""}
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

                <DropdownMenuContent className="rounded-bg-btn flex flex-col gap-4 rounded-md border-th-btn bg-[#1A1A1A] p-4 text-white">
                  <div className="space-y-2">
                    <p className="mb-2 text-muted">Top / Bottom</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="marginTop"
                        placeholder="Top"
                        value={
                          (selectedElement!.styles.marginTop as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="marginBottom"
                        placeholder="Bottom"
                        value={
                          (selectedElement!.styles.marginBottom as string) || ""
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="mb-2 text-muted">Right / Left</p>
                    <div className="flex items-center gap-x-2">
                      <InputDropdown
                        cssProp="marginRight"
                        placeholder="Right"
                        value={
                          (selectedElement!.styles.marginRight as string) || ""
                        }
                      />

                      <InputDropdown
                        cssProp="marginLeft"
                        placeholder="Left"
                        value={
                          (selectedElement!.styles.marginLeft as string) || ""
                        }
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <InputDropdown
              cssProp="margin"
              placeholder="margin"
              value={(selectedElement!.styles.margin as string) || ""}
            />
          </div>
        </AccordionContent>
      </TooltipProvider>
    </AccordionItem>
  );
};
