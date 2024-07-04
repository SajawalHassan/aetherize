import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Trigger, editorActions } from "@/slices/editor-slice";
import { TrashIcon } from "lucide-react";

type Props = {
  trigger: Trigger;
};

export const TriggerInput = (props: Props) => {
  const dispatch = useAppDispatch();
  const { trigger } = props;

  const changeTrigger = (newValue: string) => {
    dispatch(
      editorActions.updateTriggers({
        ...trigger,
        value: JSON.parse(newValue),
      }),
    );
  };

  const deleteTrigger = () => {
    dispatch(editorActions.deleteTrigger(trigger.id));
  };

  return (
    <div className="group relative flex items-center justify-between gap-x-2 bg-th-btn/20 pl-3">
      <p title={trigger.name} className="max-w-[150px] truncate py-1">
        {trigger.name}
      </p>
      <Select onValueChange={changeTrigger} value={trigger?.value?.toString()}>
        <div className="flex items-center">
          <SelectTrigger
            className="w-max rounded-none border-none bg-th-btn/40 hover:bg-th-btn/60"
            showTrigger={false}
          >
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <Button
            onClick={() => deleteTrigger()}
            className="w-max rounded-none border-l border-white/40 bg-th-btn/40 hover:bg-th-btn/60"
          >
            <TrashIcon size={18} />
          </Button>
        </div>
        <SelectContent className="border-none bg-th-btn text-white">
          <SelectItem
            className="cursor-pointer focus:bg-white/10 focus:text-white"
            value={"true"}
          >
            true
          </SelectItem>
          <SelectItem
            className="cursor-pointer focus:bg-white/10 focus:text-white"
            value={"false"}
          >
            false
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
