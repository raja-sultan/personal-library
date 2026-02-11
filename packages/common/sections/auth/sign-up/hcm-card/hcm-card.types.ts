import type { SvgIconProps } from "@mui/material";

export interface HcmSubType {
  childId: number | string;
  name: string;
  Icon: (props: SvgIconProps) => JSX.Element;
  checked: boolean;
  disabled?: boolean;
  value?: string;
}
export interface SelectedCardType {
  name: string;
  Icon: (props: SvgIconProps) => JSX.Element;
  checked: boolean;
  parentId: string | number;
  childId: string | number;
  disabled?: boolean;
}
export interface HcmCardDataType {
  parentId: string | number;
  name: string;
  data: HcmSubType[];
}
export interface HcmPropsType {
  setShowForm: (boolean) => void;
  setHcmCardData: (boolean) => void;
}
