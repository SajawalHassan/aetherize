import { AccordionTrigger } from "@/components/ui/accordion";

export const AccordionCustomTrigger = ({ text }: { text: string }) => {
  return (
    <AccordionTrigger className="hover:bg-th-btn-hover flex h-[48px] w-full items-center gap-x-[10px] rounded-[5px] bg-th-btn px-[10px]">
      <p className="text-[18px] font-medium">{text}</p>
    </AccordionTrigger>
  );
};
