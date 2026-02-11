import { useTheme } from "@mui/material";
import { useGetDepartmentSummaryQuery } from "@services/reports/essential-reports/essential-reports";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const usePoolActivity = () => {
  const theme: any = useTheme();
  const [open, setOpen] = useState(false);
  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetDepartmentSummaryQuery({
      params: { jobStatus: "Contract", companyId },
    });

  const stageLabels: any = data?.data?.map((item) => item.stage);
  const newSeries = useMemo(() => {
    if (!data?.data) {
      return [];
    }
    const stagesData = data.data;
    const seriesData = stagesData.map((item) => ({
      x: item.stage || "Unknown Stage",
      y: item.count,
    }));
    return [
      {
        name: "Attainment",
        data: seriesData,
      },
    ];
  }, [data]);

  return {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    stageLabels,
    newSeries,
    open,
    setOpen,
    theme,
  };
};

export default usePoolActivity;
