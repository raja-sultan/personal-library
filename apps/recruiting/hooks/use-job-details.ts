import { JobDetailsContext } from "@contexts/job-details";
import { useContext } from "react";

export function useJobDetailsContext(): any {
  const context = useContext(JobDetailsContext);

  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
}
