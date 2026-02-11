import { BadActiveIcon, BadIcon, GoodActiveIcon, GoodIcon, GreatActiveIcon, GreatIcon, OkayActiveIcon, OkayIcon, TerribleActiveIcon, TerribleIcon } from "@assets/icons";

interface DataItem {
    title: string;
    defaultIcon: JSX.Element;
    activeIcon: JSX.Element;
}

export const emojiData: DataItem[] = [
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