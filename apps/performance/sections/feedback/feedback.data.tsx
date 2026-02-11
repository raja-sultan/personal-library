import {
  BadIcon,
  GoodIcon,
  GreatIcon,
  OkayIcon,
  TerribleIcon,
  TerribleActiveIcon,
  BadActiveIcon,
  OkayActiveIcon,
  GoodActiveIcon,
  GreatActiveIcon,
} from "@assets/icons";

interface DataItem {
  title: string;
  defaultIcon: JSX.Element;
  activeIcon: JSX.Element;
}

export const data: DataItem[] = [
  {
    title: "Terrible",
    defaultIcon: <TerribleIcon />,
    activeIcon: <TerribleActiveIcon />,
  },
  {
    title: "Bad",
    defaultIcon: <BadIcon />,
    activeIcon: <BadActiveIcon />,
  },
  {
    title: "Okay",
    defaultIcon: <OkayIcon />,
    activeIcon: <OkayActiveIcon />,
  },
  {
    title: "Good",
    defaultIcon: <GoodIcon />,
    activeIcon: <GoodActiveIcon />,
  },
  {
    title: "Great",
    defaultIcon: <GreatIcon />,
    activeIcon: <GreatActiveIcon />,
  },
];
