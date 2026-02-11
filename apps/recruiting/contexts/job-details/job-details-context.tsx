import { createContext } from "react";

interface MyContextType {
  componentToRender: string;
  setComponentToRender: (value: string) => void;
}

export const JobDetailsContext = createContext<MyContextType>({
  componentToRender: "Dashboard",
  setComponentToRender: (value: string) => {
    return value;
  },
});
