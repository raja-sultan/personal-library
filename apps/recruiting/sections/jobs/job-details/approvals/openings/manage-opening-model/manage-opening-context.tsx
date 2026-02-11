import {
  displayErrorMessage,
  displaySuccessMessage,
} from "@sections/jobs/job-info/utils";
import {
  useAddNewJobOpeningMutation,
  useGetJobOpeningsIdsQuery,
} from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

export const ManageOpeningsContext = createContext<any>("");

export function ManageOpeningContextProvider({ children }): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [manageOpeningInfoCon, setManageOpeningInfoCon] = useState({
    activeOpeningTabIndex: 0,
    openingId: "",
  });
  const { data, isLoading, isFetching, isError } = useGetJobOpeningsIdsQuery({
    params: {
      jobId,
    },
  });
  const [addNewJobOpening] = useAddNewJobOpeningMutation();
  const openingTabHan = (id: string, index: number) => {
    setManageOpeningInfoCon((pre) => ({
      ...pre,
      openingId: id,
      activeOpeningTabIndex: index,
    }));
  };

  const addNewJobHan = async (closeReasonId) => {
    try {
      const jsonPayload = {
        status: "Open",
        openDate: new Date(),
        targetStartDate: new Date(),
        closeDate: new Date(),
        customFields: {},
        closeReasonId,
      };
      const res = await addNewJobOpening({
        payload: jsonPayload,
        jobId,
      }).unwrap();
      const { data: resDaat }: any = res;
      setManageOpeningInfoCon((pre) => ({
        ...pre,
        openingId: resDaat?._id,
        activeOpeningTabIndex: data?.length,
      }));
      displaySuccessMessage(res);
    } catch (error) {
      displayErrorMessage(error);
    }
  };
  return (
    <ManageOpeningsContext.Provider
      value={{
        openingIdsList: data?.data ?? [],
        isLoading,
        isFetching,
        isError,
        manageOpeningInfoCon,
        jobOpeningId: data?.[manageOpeningInfoCon.activeOpeningTabIndex]?._id,
        openingTabHan,
        addNewJobHan,
      }}
    >
      {children}
    </ManageOpeningsContext.Provider>
  );
}
