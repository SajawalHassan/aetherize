import { Accordion } from "@/components/ui/accordion";
import { useAppSelector } from "@/editor-store/hooks";
import { SpacingSection } from "./layout-section";

type Props = {};

export const PropertiesPanel = (props: Props) => {
  const selectedElementId = useAppSelector(
    (s) => s.editorReducer.selectedElementId
  );
  const selectedElement = useAppSelector((s) => s.editorReducer.elements).find(
    (e) => e.id === selectedElementId
  );

  return (
    <div className="bg-section-bg min-h-[calc(100vh-86px)] flex border-t border-border relative w-150 pt-4">
      {selectedElement && (
        <div className="w-full">
          <div className="px-4">
            <h1 className="font-bold text-[30px]">{selectedElement.name}</h1>
            <p className="text-[16px] opacity-75 leading-tight">
              Edit properties about this element.
            </p>
          </div>

          <Accordion type="multiple" className="mt-6">
            {selectedElement.canContain && <SpacingSection />}
          </Accordion>
        </div>
      )}
    </div>
  );
};
