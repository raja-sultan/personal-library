import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  useAddNoteMutation,
  useConfirmRecommendationMutation,
  useGetCompensatedEmployeeQuery,
} from "@services/compensation/compensation-cycle/anual-compensation-api";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { RHFTextField } from "common";
import { useForm } from "react-hook-form";
import { type Card } from "../view-progress-components/progress-bar-card/wrapper";

export function useRecommendations(): any {
  const parmId = useSearchParams().get("id");

  const [symbols, setSymbols] = useState<Record<string, string>>({});

  const methods = useForm<any>({
    defaultValues: {},
  });

  const { handleSubmit, getValues, setValue } = methods;

  const {
    data: getCompensatedEmployee,
    isSuccess,
    isError,
    isFetching,
    isLoading,
  } = useGetCompensatedEmployeeQuery({ id: parmId });
  const [addNoteMutation] = useAddNoteMutation();
  const [confirmRecommendationMutation] = useConfirmRecommendationMutation();

  const compensatedData = getCompensatedEmployee?.data;

  const eligibleSalaryPercentage = (number: number, total: number): number => {
    return (number / total) * 100;
  };

  const totalSalary = compensatedData?.compensatedEmployees?.reduce(
    (acc: any, obj: any) => acc + obj?.user.currentSalary,
    0
  );

  const isEmpty = (obj: any): boolean => Object.keys(obj).length === 0;

  // const totalBand = compensatedData?.compensatedEmployees?.filter((obj: any) => !isEmpty(obj?.compensationBand))?.length;

  const eligibleParticipants =
    compensatedData?.compensationCycle?.eligibleParticipants;
  const totalParticipants =
    compensatedData?.compensationCycle?.totalParticipants;

  const handleButtonClick = (
    value: string,
    id: string,
    currentSalary: number
  ): void => {
    let increment = 0;
    let newPay = 0;
    if (value === "%") {
      increment =
        (currentSalary * Number(getValues()[`percentage_${id}`] ?? 0)) / 100;
      newPay = currentSalary + increment;
      setValue(`new_pay_${id}`, newPay);
    } else {
      increment = Number(getValues()[`currency_${id}`] ?? 0);
      newPay = currentSalary + increment;
      setValue(`new_pay_${id}`, newPay);
    }
    setSymbols({
      ...symbols,
      [id]: value,
    });

  };

  const handleNewPay =
    (name: string, id: string, currentSalary: number) =>
    (event: any): void => {
      setValue(name, event.target.value);
      let increment = 0;
      let newPay = 0;
      if (symbols[id] === "%") {
        increment = (currentSalary * Number(event.target.value)) / 100;
        newPay = currentSalary + increment;
        setValue(`new_pay_${id}`, newPay);
      } else {
        increment = Number(event.target.value);
        newPay = currentSalary + increment;
        setValue(`new_pay_${id}`, newPay);
      }
    };

  const userTableColumns = [
    {
      accessorFn: ({ level }) => level,
      id: "level",
      cell: ({ getValue }) => (
        <Typography color="text.secondary">{getValue()}</Typography>
      ),
      header: () => <span>Level</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ location }) => location,
      id: "location",
      cell: ({ getValue }) => (
        <Typography color="text.secondary">{getValue()}</Typography>
      ),

      header: () => <span>Location</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ startDate }) => startDate,
      id: "startDate",
      cell: ({ getValue }) => (
        <Typography color="text.secondary">{getValue()}</Typography>
      ),

      header: () => <span>Start Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastPayChange }) => lastPayChange,
      id: "lastPayChange",
      cell: ({ getValue }) => (
        <Typography color="text.secondary">{getValue()}</Typography>
      ),

      header: () => <span>Last Pay Change</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ promotion }) => promotion,
      id: "promotion",
      cell: ({ getValue }) => (
        <Typography color="text.secondary">{getValue()}</Typography>
      ),

      header: () => <span>Promotion</span>,
      isSortable: false,
    },
  ];

 const onSubmit = async (values: any): Promise<void> => {
     const filteredValues = Object.entries(values).reduce(
       (acc, [key, value]) => {
         if (value !== undefined) {
           acc[key] = value;
         }
         return acc;
       },
       {}
     )
  const recommendationsData = compensatedData?.compensatedEmployees?.map(
  (value: any) => {
    return {
      id: value?.user?._id,
      ...(symbols[value?.user?._id] === "%"
        ? {
            recommendationPercentage:
              filteredValues[`percentage_${value?.user?._id}`] ?? null,
          }
        : {
            recommendationValue:
              filteredValues[`currency_${value?.user?._id}`] ?? null,
          }),
      newPay: filteredValues[`new_pay_${value?.user?._id}`] ?? 0,
    };
  }
);

   try {
     await confirmRecommendationMutation({
       id: parmId,
       body: { recommendedEmployees: recommendationsData },
     })
       .unwrap()
       .then((data) => {
         if (data) toast.success("Recommendation confirmed successfully");
       });
   } catch (error) {
     toast.error(
       error?.data?.message || "Error while confirming recommendations"
     );
   }
 };


  const salaryColumns = [
    {
      accessorFn: ({ current }) => current,
      id: "current",
      cell: ({ getValue }) => {
        return <Typography variant="body2">+£ {getValue()}</Typography>;
      },
      header: () => <span>Current</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ guidance }) => guidance,
      id: "guidance",
      cell: ({ getValue, row: { original } }) => (
        <Typography variant="body2">
          +£ {getValue()} ({original?.percentage} %)
        </Typography>
      ),
      header: () => <span>Guidance</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ getValue, row: { original } }) => {
        return (
          <Box gap={2} display="flex" alignItems="baseline">
            <ButtonGroup
              sx={{ width: "7rem", mt: 0.8, height: "5.3rem" }}
              variant="contained"
              size="small"
              aria-label={getValue()}
            >
              <Button
                sx={styles.currencyBtn1(symbols[getValue()] ?? "£")}
                onClick={() => {
                  handleButtonClick("£", getValue(), original.current);
                }}
              >
                £
              </Button>
              <Button
                sx={styles.currencyBtn2(symbols[getValue()] ?? "£")}
                onClick={() => {
                  handleButtonClick("%", getValue(), original.current);
                }}
              >
                %
              </Button>
            </ButtonGroup>
            <RHFTextField
              id={getValue()}
              name={
                (symbols[getValue()] ?? "£") === "%"
                  ? `percentage_${getValue()}`
                  : `currency_${getValue()}`
              }
              type="number"
              defaultValue={
                (symbols[getValue()] ?? "£") === "%"
                  ? original?.percentage
                  : original?.guidance
              }
              variant="outlined"
              onChange={handleNewPay(
                (symbols[getValue()] ?? "£") === "%"
                  ? `percentage_${getValue()}`
                  : `currency_${getValue()}`,
                getValue(),
                original?.current
              )}
              InputProps={{
                startAdornment: (
                  <Typography mr={0.5} variant="subtitle2">
                    {symbols[getValue()] ?? "£"}
                  </Typography>
                ),
                inputProps:
                  (symbols[getValue()] ?? "£") === "%"
                    ? {
                        min: 0,
                        max: 100,
                      }
                    : {
                        min: 0,
                      },
              }}
            />
          </Box>
        );
      },
      header: () => <span>Recommendation</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ newPay }) => newPay,
      id: "newPay",
      cell: ({ row: { original } }) => {
        const newValue = original?.current + Number(original?.guidance);

        return (
          <Box gap={2} display="flex" alignItems="center">
            <RHFTextField
              id={original._id}
              name={`new_pay_${original?._id}`}
              defaultValue={newValue}
              disabled
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
            />
          </Box>
        );
      },
      header: () => <span>New Pay</span>,
      isSortable: false,
    },
  ];

  const recommendedCardsData: Card[] = [
    {
      progressName: "Eligible For Salary",
      infoMessage: `Target is achieved by ${totalParticipants ? eligibleSalaryPercentage(eligibleParticipants, totalParticipants).toFixed(2) : 0}%`,
      achievedProgress:
        compensatedData?.compensationCycle?.eligibleParticipants ?? 0,
      totalProgress: totalParticipants ?? 0,
      barValue: eligibleSalaryPercentage(
        eligibleParticipants,
        totalParticipants
      ),
    },
    {
      progressName: "Spend / Budget (£)",
      achievedProgress: `£${totalSalary ?? 0}`,
      totalProgress: `£${compensatedData?.compensationCycle?.totalBudget ?? 0}`,
      barValue: compensatedData?.compensationCycle?.totalBudget
        ? eligibleSalaryPercentage(
            totalSalary,
            compensatedData?.compensationCycle?.totalBudget
          )
        : 0,
    },
    {
      progressName: "In Band",
      infoMessage: `Target is achieved by ${eligibleSalaryPercentage(compensatedData?.compensationCycle?.eligibleParticipants, compensatedData?.compensationCycle?.totalParticipants).toFixed(2)}%`,
      achievedProgress:
        compensatedData?.compensationCycle?.eligibleParticipants,
      totalProgress: compensatedData?.compensationCycle?.totalParticipants,
      barValue: eligibleSalaryPercentage(
        compensatedData?.compensationCycle?.eligibleParticipants,
        compensatedData?.compensationCycle?.totalParticipants
      ),
    },
  ];

  const recommendationData = compensatedData?.compensatedEmployees
    ?.map((obj: any) => {
      if (obj?.isRecommended || obj?.isApproved) {
        return [];
      }
      return {
        _id: obj?._id,
        bandData: {
          currentSalary: obj.user?.currentSalary ?? "--",
          bandDefaultValue: obj.user?.currentSalary ?? "0",
          min: isEmpty(obj?.compensationBand)
            ? 0
            : obj.compensationBand?.minBasePay,
          max: isEmpty(obj?.compensationBand)
            ? obj.user?.currentSalary
            : obj.compensationBand?.maxBasePay,
          marks: isEmpty(obj?.compensationBand)
            ? [
                { value: 0, label: 0 },
                {
                  value: obj.user?.currentSalary,
                  label: obj.user?.currentSalary,
                },
              ]
            : [
                {
                  value: obj.compensationBand?.minBasePay,
                  label: obj.compensationBand?.minBasePay,
                },
                {
                  value: obj.compensationBand?.midBasePay,
                  label: obj.compensationBand?.midBasePay,
                },
                {
                  value: obj.compensationBand?.maxBasePay,
                  label: obj.compensationBand?.maxBasePay,
                },
              ],
        },
        userDetails: {
          _id: obj?.user?._id,
          firstName: obj.user?.firstName ?? "--",
          lastName: obj.user?.lastName ?? "--",
          profileImage: obj.user?.profileImage ?? "--",
        },
        userTable: {
          employeeTitle: obj?.user?.employeeTitle ?? "--",
          data: [
            {
              _id: obj?.user?._id,
              level: obj?.user?.jobLevel ?? "--",
              location: obj?.user?.location ?? "--",
              startDate: obj?.user?.employmentStartDate
                ? dayjs(obj?.user?.employmentStartDate).format("DD/MM/YYYY")
                : "--",
              lastPayChange: obj?.user?.lastPayChange
                ? dayjs(obj?.user?.lastPayChange).format("DD MMMM YYYY")
                : "--",
              promotion: obj?.isPromoted ? "Yes" : "No",
            },
          ],
          columns: userTableColumns,
          isSuccess,
          isError,
          isFetching,
          isLoading,
          isPagination: false,
        },
        salaryTable: {
          employeeTitle: "Salary",
          data: [
            {
              _id: obj.user?._id,
              current: obj?.user?.currentSalary ?? "0",
              guidance: obj?.user?.guidance ?? "0",
              recommendation: obj?.isRecommended,
              newPay: obj?.user?.newPay ?? "0",
              percentage: obj?.user?.percentage ?? "0",
              recommendedPercentage: obj?.user?.percentage ?? "0",
              recommendedSalary: obj?.user?.guidance ?? "0",
            },
          ],
          columns: salaryColumns,
          isSuccess,
          isError,
          isFetching,
          isLoading,
          isPagination: false,
        },
      };
    })
    .filter((entry) => entry.length !== 0);

  const isNotRecommendedLength = compensatedData?.compensatedEmployees?.filter(
    (obj: { isRecommended: boolean }) => obj?.isRecommended
  )?.length;
  const isEveryRecommended = compensatedData?.compensatedEmployees?.every(
    (obj: { isRecommended: boolean }) => obj?.isRecommended
  );
  // Add note APi integration starts here
  const handleAddNote = async (
    description: string,
    id: string
  ): Promise<void> => {
    try {
      await addNoteMutation({ id, description })
        .unwrap()
        .then((data) => {
          if (data) {
            toast.success("Note added successfully");
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while adding note");
    }
  };

  return {
    recommendedCardsData,
    recommendationData,
    handleAddNote,
    isFetching,
    isLoading,
    handleSubmit,
    onSubmit,
    methods,
    isNotRecommendedLength,
    isEveryRecommended,
  };
}

const styles = {
  currencyBtn1:
    (symbol: string) =>
    ({ palette: { neutral, common } }) => ({
      "&.MuiButtonGroup-firstButton": {
        borderColor: neutral[300],
      },
      border: `1px solid ${neutral[300]}`,
      background: symbol === "£" ? "primary.main" : common?.white,
      color: symbol === "£" ? common?.white : "neutral.700",
      "&:hover": {
        background: symbol === "£" ? "primary.main" : common?.white,
      },
      height: "53px",
    }),

  currencyBtn2:
    (symbol: string) =>
    ({ palette: { neutral, common } }) => ({
      border: `1px solid ${neutral[300]}`,
      background: symbol === "%" ? "primary.main" : common?.white,
      color: symbol === "%" ? common?.white : "neutral.700",
      "&:hover": {
        background: symbol === "%" ? "primary.main" : common?.white,
      },
      height: "53px",
    }),
};
