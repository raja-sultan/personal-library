import {
  AngryIconActive,
  BadActiveIcon,
  GoodActiveIcon,
  GreatActiveIcon,
  HeartIconActive,
  OkayActiveIcon,
  ShockIconActive,
  TerribleActiveIcon,
  ThumbsUpIconActive,
} from "@assets/icons";

interface EmojiListTypes {
  id: string;
  component: React.ReactNode;
}

export const emojiList: EmojiListTypes[] = [
  {
    id: "THUMBS_UP",
    component: <ThumbsUpIconActive />,
  },
  {
    id: "HEART",
    component: <HeartIconActive />,
  },
  {
    id: "HAPPY",
    component: <GoodActiveIcon height="24px" width="24px" />,
  },
  {
    id: "ANGRY",
    component: <AngryIconActive />,
  },
  {
    id: "SHOCK",
    component: <ShockIconActive />,
  },
];

export const iconComponents: Record<string, JSX.Element> = {
  Good: <GoodActiveIcon width="24px" height="24px" />,
  Great: <GreatActiveIcon width="24px" height="24px" />,
  Bad: <BadActiveIcon width="24px" height="24px" />,
  Okay: <OkayActiveIcon width="24px" height="24px" />,
  Terrible: <TerribleActiveIcon width="24px" height="24px" />,
};

export const reactionIcons: Record<string, JSX.Element> = {
  THUMBS_UP: <ThumbsUpIconActive height="16px" width="16px" />,
  HEART: <HeartIconActive width="16px" height="16px" />,
  HAPPY: <GoodActiveIcon width="16px" height="16px" />,
  ANGRY: <AngryIconActive width="16px" height="16px" />,
  SHOCK: <ShockIconActive width="16px" height="16px" />,
};
