import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { IconReset } from "@assets/icons";
import { CustomChip, CustomTable } from "common";
import Link from "next/link";
import { Filters } from "./filters";
import { filterName } from "./filters/filter.data";
import { useGetAllCandidateQuery } from "@services/candidate/candidate-main/candidate-main-api";
import dayjs from "dayjs";

export function CandidatesMain(): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row?.candidateFullName,
      id: "name",
      cell: (info: any) => (
        <Box sx={{ a: { textDecoration: "none" } }}>
          <Link
            href={{
              pathname: "candidates/candidate-details",
              query: {
                jobId: info.row.original.jobId,
                candidateID: info.row.original.candidateId,
              },
            }}
            passHref
          >
            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color="text.primary"
              >
                {info.getValue() ?? "-"}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                color="text.primary"
              >
                {info.row.original?.candidateEmail ?? "-"}
              </Typography>
            </Box>
          </Link>
        </Box>
      ),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.jobName,
      id: "job",
      cell: (info: any) => info.getValue(),
      header: () => <span>Job</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.candidateStatus,
      id: "status",
      cell: (info: any) => (
        <Box>
          {info.getValue() ? (
            <CustomChip
              variant="success"
              ChipProps={{ label: info.getValue() }}
            />
          ) : (
            "---"
          )}
        </Box>
      ),
      header: () => <span>Status</span>,
    },
  ];

  let timer: ReturnType<typeof setTimeout>;

  const debounce = (func: () => void, delay) => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
  const getDefValue: any = (filterData: any) => {
    const devalue: any = {};
    for (const key in filterData) {
      if (typeof filterData[key] === "object") {
        getDefValue(filterData[key]);
      }
      for (const subData in filterData[key]) {
        devalue[subData] = filterData[key][subData];
      }
    }
    return devalue;
  };
  const [params, setParams] = useState<any>(getDefValue(filterName));

  const [autocompleteValue, setAutocompleteValue] = useState<any>([
    { id: 1, label: "Application Type", value: "applicationType" },
    { id: 2, label: "Jobs", value: "Jobs" },
  ]);
  const changeHandler = (
    { target: { name, value, checked } }: any,
    type: "select" | "checkbox" | "search" | "date"
  ): any => {
    if (type === "select") {
      setParams((oldParams: any) => {
        const updatedParams = { ...oldParams, [name]: value, offset: 0 };

        return updatedParams;
      });
    } else if (type === "checkbox") {
      setParams((oldParams: any) => {
        const updatedParams = { ...oldParams, [name]: checked, offset: 0 };

        return updatedParams;
      });
    } else if (type === "date") {
      setParams((oldParams: any) => {
        const updatedParams = { ...oldParams, [name]: value, offset: 0 };

        return updatedParams;
      });
    } else {
      debounce(() => {
        setParams((oldParams: any) => {
          const updatedParams = { ...oldParams, [name]: value, offset: 0 };
          return updatedParams;
        });
      }, 1000);
    }
  };
  function ApiParams(FilterParams: any): any {
    const updateData: any = {};
    for (const keys in FilterParams) {
      if (
        FilterParams[keys] !== "" &&
        FilterParams[keys] !== undefined &&
        FilterParams[keys] !== null
      ) {
        updateData[keys] = FilterParams[keys];
        if (keys.includes("Date")) {
          updateData[keys] = dayjs(updateData[keys]).format("YYYY-MM-DD");
        }
      }
    }
    return updateData;
  }
  const mainParam = ApiParams(params);

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllCandidateQuery({
      params: {
        limit: 10,
        ...mainParam,
      },
    });

  return (
    <Paper variant="elevation" elevation={1}>
      <Box p={2}>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            fontWeight={600}
            variant="h5"
            sx={{
              color: "text.primary",
            }}
          >
            All Candidates
          </Typography>
          <Box
            ml="auto"
            display="flex"
            alignContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Button
              size="small"
              startIcon={<IconReset />}
              variant="text"
              onClick={() => {
                setParams(getDefValue(filterName));
              }}
            >
              Reset Filters
            </Button>
            <Link href="/generate-report" passHref>
              <Button
                size="medium"
                variant="outlined"
                sx={{ color: "neutral.500", borderColor: "neutral.500" }}
                disableRipple
                disableElevation
                disableFocusRipple
                disableTouchRipple
              >
                Generate Report
              </Button>
            </Link>

            <Link href="/add-candidate" passHref>
              <Button
                size="medium"
                endIcon={<AddCircleOutlineRoundedIcon />}
                variant="contained"
              >
                Add Candidate
              </Button>
            </Link>
          </Box>
        </Box>

        <Box mb={2}>
          <Filters
            autocompleteValue={autocompleteValue}
            setAutocompleteValue={setAutocompleteValue}
            params={params}
            changeHandler={changeHandler}
          />
        </Box>
        <CustomTable
          data={data?.data?.candidates ?? []}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination
          showSerialNo={false}
          // count={Math.ceil(data?.data?.meta?.total / limit)}
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams((oldParams: any) => {
              const updatedParams = {
                ...oldParams,
                offset: (onPageData - 1) * 10,
              };

              return updatedParams;
            });
          }}
        />
      </Box>
    </Paper>
  );
}
