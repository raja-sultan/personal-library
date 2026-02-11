import { useState, type ReactNode } from "react";
import { JobDetailsContext } from "./job-details-context";

export function JobDetailsContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [componentToRender, setComponentToRender] =
    useState<string>("Dashboard");

  // Define the function to change the state
  const updateComponentToRender = (newValue: string): void => {
    setComponentToRender(newValue);
  };

  const contextValue = {
    componentToRender,
    setComponentToRender: updateComponentToRender,
  };

  return (
    <JobDetailsContext.Provider value={contextValue}>
      {children}
    </JobDetailsContext.Provider>
  );
}
