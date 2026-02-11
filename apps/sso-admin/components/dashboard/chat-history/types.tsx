import { hannahImage, jackImage, yenneferImage } from "@assets/dashboard";

interface ListItemData {
  id: number;
  image: string;
  title: string;
  subTitle: string;
  link: string;
  date: string;
  badgeContents: string;
}

export const chatItems: ListItemData[] = [
  {
    id: 1,
    image: hannahImage,
    title: "Hannah Montanna",
    subTitle: "Lorem ipsum dolor sit amet ....",
    link: "/",
    date: "Aug 3, 2023 at 13:21",
    badgeContents: "2",
  },
  {
    id: 2,
    image: yenneferImage,
    title: "Yennefer",
    subTitle: "Lorem ipsum dolor sit amet ....",
    link: "/",
    date: "Oct 11, 2023 at 13:21",
    badgeContents: "10",
  },
  {
    id: 3,
    image: jackImage,
    title: "Jaskier Clan",
    subTitle: "Lorem ipsum dolor sit amet ....",
    link: "/",
    date: "May 24, 2023 at 13:21",
    badgeContents: "100",
  },
  {
    id: 4,
    image: yenneferImage,
    title: "Yennefer",
    subTitle: "Lorem ipsum dolor sit amet ....",
    link: "/",
    date: "Oct 11, 2023 at 13:21",
    badgeContents: "10",
  },
];
