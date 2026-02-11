import { Overview } from "./overview";

interface tabsTypes {
  id: string;
  comp: React.ReactNode;
  link: string;
}

export function useViewProfile(): { TabsComponentData: tabsTypes[] } {
  const TabsComponentData: tabsTypes[] = [
    {
      id: "1",
      comp: <Overview />,
      link: "",
    },
    {
      id: "2",
      comp: <p>1 on 1s</p>,
      link: "",
    },
    {
      id: "3",
      comp: <p>Updates</p>,
      link: "",
    },
    {
      id: "4",
      comp: <p>FeedbBack</p>,
      link: "",
    },
    {
      id: "5",
      comp: <p>Career</p>,
      link: "",
    },
    {
      id: "6",
      comp: <p>Reviews</p>,
      link: "",
    },
  ];

  return {
    TabsComponentData,
  };
}
