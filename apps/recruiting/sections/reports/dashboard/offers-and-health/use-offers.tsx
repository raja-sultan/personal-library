import { useTheme } from "@mui/material";
import { useGetHiringReportsQuery } from "@services/reports/dashboard/offers-hiring/offers-hiring-api";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { monthsData } from "./offers-data";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const useOffers = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );
  const [params, setParams] = useState<any>();

  const individualDepartment = params?.department?.map((item) => item?.value);
  const individualOffices = params?.office?.map((item) => item?.value);
  const individualUsers = params?.recruiters?.map((item) => item?.value);

  const queryParams: any = {
    companyId,
    ...(individualDepartment &&
      individualDepartment.length > 0 && { department: individualDepartment }),
    ...(params?.startDate && { startDate: params.startDate }),
    ...(params?.endDate && { endDate: params.endDate }),
    ...(individualOffices &&
      individualOffices.length > 0 && { office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { recruiters: individualUsers }),
  };

  //GET API For Offers and Hiring
  const { data, isLoading }: any = useGetHiringReportsQuery({
    params: queryParams,
  });

  const countRejectionReasons = (rejectionReasons) => {
    const countArray: any = [];
    const count = {
      "Not Interested": 0,
      "Offer Rejected": 0,
      "Not Available": 0,
      Other: 0,
    };

    rejectionReasons?.forEach((reason) => {
      switch (reason.rejectionReason) {
        case "Not Interested":
          count["Not Interested"]++;
          break;
        case "rejected":
          count["Offer Rejected"]++;
          break;
        case "Not Available":
          count["Not Available"]++;
          break;
        case "Other":
          count.Other++;
          break;
        default:
          break;
      }
    });
    for (const key in count) {
      countArray.push(count[key]);
    }

    return countArray;
  };

  // Example usage:
  const offerAcceptance = [
    {
      name: "series2",
      data: [20, 10, 15, 18, 25, 30, 35, 40, 35, 20, 10, 10],
    },
  ];
  const declineSeries: any = countRejectionReasons(
    data?.data?.rejectionReasons
  );

  //APIS Destructuring For Offers Created
  const offerCreatedData = data?.data?.offerCreated[0]?.offersCreated;
  // Transforming offerCreatedData into series data
  const newSeries = useMemo(() => {
    if (!offerCreatedData?.length) {
      return [
        {
          name: "Offers Created",
          data: [0, 0, 0, 0, 0, 0],
        },
      ];
    }
    const seriesData = monthsData.map((month) => {
      const monthData = offerCreatedData.find((item) => item.month === month);
      return monthData ? monthData.offersCreated : 0;
    });
    return [
      {
        name: "Offers Created",
        data: seriesData,
      },
    ];
  }, [offerCreatedData]);
  console.log(newSeries, "newSeries");

  //APIS Destructuring For Offers Accepted
  const offerAcceptedData = data?.data?.offerAccepted[0]?.offersAccepted;
  // Transforming offerCreatedData into series data
  const areaSeries = useMemo(() => {
    if (!offerAcceptedData?.length) {
      return [];
    }

    const areaData = monthsData.map((month) => {
      const monthData = offerAcceptedData?.find((item) => item.month === month);
      return monthData ? monthData.offersAccepted : 0;
    });

    return [
      {
        name: "Offers Accepted",
        data: areaData,
      },
    ];
  }, [offerAcceptedData]);

  //Departments API
  const { data: departments } = useGetDepartmentsQuery({});

  const departmentOptions = departments?.map((option: any) => {
    return {
      id: option._id,
      label: option.departmentName,
      value: option.departmentName,
    };
  });

  //Offices List API
  const { data: offices } = useGetOfficeQuery({});

  const officeOptions = offices?.map((option: any) => {
    return {
      id: option._id,
      label: option.officeName,
      value: option.officeName,
    };
  });

  const { data: userDetails } = useGetUsersListQuery({});

  const userList = userDetails?.data?.map((list) => {
    return {
      id: list._id,
      label: list.userName,
      value: list.userName,
    };
  });

  return {
    open,
    setOpen,
    theme,
    data,
    isLoading,
    offerAcceptance,
    declineSeries,
    areaSeries,
    newSeries,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
    params,
  };
};

export default useOffers;
