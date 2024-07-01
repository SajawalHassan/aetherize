import { ButtonsSelectItems } from "@/app/editor/_components/sidebar/tabs/ui/buttons-select";
import {
  AlignCenterIcon,
  AlignEndHorizontalIcon,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignStartHorizontalIcon,
  AlignVerticalJustifyCenterIcon,
  Columns2Icon,
  ColumnsIcon,
  FlipHorizontal2Icon,
  FlipHorizontalIcon,
  PanelBottomIcon,
  Rows2Icon,
  RowsIcon,
  SpaceIcon,
  StretchVerticalIcon,
  WrapTextIcon,
} from "lucide-react";

export const justifyContentItems: ButtonsSelectItems = [
  {
    value: "flex-start",
    tooltipText: "Flex start",
    Icon: AlignHorizontalJustifyStartIcon,
  },
  {
    value: "center",
    tooltipText: "Center",
    Icon: AlignHorizontalJustifyCenterIcon,
  },
  {
    value: "space-between",
    tooltipText: "Space between",
    Icon: AlignHorizontalSpaceBetweenIcon,
  },
  {
    value: "space-around",
    tooltipText: "Space around",
    Icon: AlignHorizontalSpaceAroundIcon,
  },
  {
    value: "space-evenly",
    tooltipText: "Space evenly",
    Icon: SpaceIcon,
  },
  {
    value: "flex-end",
    tooltipText: "Flex end",
    Icon: AlignHorizontalJustifyEndIcon,
  },
];

export const flexWrapItems: ButtonsSelectItems = [
  {
    value: "wrap",
    tooltipText: "Wrap",
    Icon: WrapTextIcon,
  },
  {
    value: "nowrap",
    tooltipText: "Nowrap",
    Icon: FlipHorizontalIcon,
  },
  {
    value: "wrap-reverse",
    tooltipText: "wrap reverse",
    Icon: FlipHorizontal2Icon,
  },
];

export const flexDirectionItems: ButtonsSelectItems = [
  {
    value: "column",
    tooltipText: "Column",
    Icon: ColumnsIcon,
  },
  {
    value: "row",
    tooltipText: "Row",
    Icon: RowsIcon,
  },
  {
    value: "column-reverse",
    tooltipText: "Column reverse",
    Icon: Columns2Icon,
  },
  {
    value: "rows-reverse",
    tooltipText: "Rows reverse",
    Icon: Rows2Icon,
  },
];

export const alignItems_Items: ButtonsSelectItems = [
  {
    value: "flex-start",
    tooltipText: "Flex start",
    Icon: AlignStartHorizontalIcon,
  },
  {
    value: "center",
    tooltipText: "Center",
    Icon: AlignVerticalJustifyCenterIcon,
  },
  {
    value: "space-between",
    tooltipText: "Space between",
    Icon: AlignHorizontalSpaceBetweenIcon,
  },
  {
    value: "space-around",
    tooltipText: "Space around",
    Icon: AlignHorizontalSpaceAroundIcon,
  },
  {
    value: "stretch",
    tooltipText: "Stretch",
    Icon: StretchVerticalIcon,
  },
  {
    value: "flex-end",
    tooltipText: "Flex end",
    Icon: AlignEndHorizontalIcon,
  },
];

export const alignContentItems: ButtonsSelectItems = [
  {
    value: "flex-start",
    tooltipText: "Flex start",
    Icon: AlignStartHorizontalIcon,
  },
  {
    value: "center",
    tooltipText: "Center",
    Icon: AlignVerticalJustifyCenterIcon,
  },
  {
    value: "stretch",
    tooltipText: "Stretch",
    Icon: StretchVerticalIcon,
  },
  {
    value: "baseline",
    tooltipText: "Baseline",
    Icon: PanelBottomIcon,
  },
  {
    value: "flex-end",
    tooltipText: "Flex end",
    Icon: AlignEndHorizontalIcon,
  },
];

export const alignTextItems: ButtonsSelectItems = [
  {
    value: "left",
    tooltipText: "Align Left",
    Icon: AlignLeftIcon,
  },
  {
    value: "right",
    tooltipText: "Align Right",
    Icon: AlignRightIcon,
  },
  {
    value: "center",
    tooltipText: "Align Center",
    Icon: AlignCenterIcon,
  },
  {
    value: "justify",
    tooltipText: "Align Justify",
    Icon: AlignJustifyIcon,
  },
];
