import {
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { CustomTable } from "common";
import { LoadingButton } from "@mui/lab";
import { AddFormData } from "./filter-by-jobs-modal.data";
import { useEffect, useState } from "react";
import { useGetAllJobsQuery } from "@services/candidate/candidate-main/candidate-main-api";
import { IconReset } from "@assets/icons";
import toast from "react-hot-toast";

export function FilterByJobsModal(props): JSX.Element {
  const { MainParams, setOpenModal, changeHandlerMain } = props;
  let timer: ReturnType<typeof setTimeout>;

  const debounce = (func: () => void, delay) => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
  const getDefValue: any = (filterData: any) => {
    const devalue: any = {};
    for (const key in filterData) {
      devalue[filterData[key].RhfValue.name] = "";
    }
    devalue.offset = 0;
    devalue.templateJobs = false;
    return devalue;
  };
  const [params, setParams] = useState(getDefValue(AddFormData));
  const [search, setSearch] = useState("");
  const [selectedJobs, setSelectedJobs] = useState(0);
  const [jobsIds, setJobsIds] = useState<string>("");
  useEffect(() => {
    if (MainParams.jobIds === undefined) {
      setJobsIds("");
    }
    if (params.search === "") {
      setSearch("");
    }
  }, [MainParams.jobIds, params.search]);
  const changeHandler = (
    { target: { name, value, checked } }: any,
    type: "select" | "checkbox" | "search"
  ): any => {
    if (type === "select") {
      setParams((oldParams: any) => {
        const updatedParams = { ...oldParams, [name]: value };

        return updatedParams;
      });
    } else if (type === "checkbox") {
      setParams((oldParams: any) => {
        const updatedParams = { ...oldParams, offset: 0, [name]: checked };

        return updatedParams;
      });
    } else {
      debounce(() => {
        setParams((oldParams: any) => {
          const updatedParams = { ...oldParams, offset: 0, [name]: value };
          return updatedParams;
        });
      }, 1000);
    }
  };
  //// const table
  const columns = [
    {
      id: "select",
      header: ({ table }: any) => {
        return (
          <Box>
            <Checkbox
              size="small"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Box>
        );
      },
      cell: ({ row }: any) => (
        <Box>
          <Checkbox
            size="small"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.jobInfo?.jobName,
      id: "Job",
      cell: (info: any) => (
        <Box display="flex" alignItems="center" gap={2}>
          {info.getValue() ?? "-"}
        </Box>
      ),
      header: () => <span>Job</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.requisitionId ?? "-",
      id: "Req ID",
      cell: (info: any) => info.getValue(),
      header: () => <span>Req ID</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.jobInfo?.department ?? "-",
      id: "Department",
      cell: (info: any) => info.getValue(),
      header: () => <span>Department</span>,
    },
    {
      accessorFn: (row: any) => row.jobInfo?.office ?? "-",
      id: "Office",
      cell: (info: any) => info.getValue(),
      header: () => <span>Office</span>,
    },
  ];
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllJobsQuery({
      params: {
        limit: 10,
        ...params,
        offset: params.offset,
      },
    });

  return (
    <Grid container>
      {AddFormData.map((form: any) => (
        <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 0.5 }} item>
          {form.RhfValue.select && (
            <TextField
              value={params[form.RhfValue.name]}
              name={form.RhfValue.name}
              label={form.RhfValue.label}
              fullWidth
              variant="outlined"
              select
              onChange={(e) => changeHandler(e, "select")}
            >
              {form.RhfValue.options.map((option) => (
                <MenuItem key={option.name} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          {form.RhfValue.name === "search" && (
            <TextField
              value={search}
              onChange={(e) => {
                changeHandler(e, "search");
                setSearch(e.target.value);
              }}
              {...form.RhfValue}
            />
          )}
        </Grid>
      ))}
      <Grid xs={12} item sx={{ py: 1, px: 0.5 }} display="flex">
        <FormControlLabel
          control={<Checkbox />}
          label="include Template jobs"
          name="templateJobs"
          checked={params.templateJobs}
          onChange={(e) => changeHandler(e, "checkbox")}
        />
        <Box ml="auto">
          <Button
            size="small"
            startIcon={<IconReset />}
            variant="text"
            onClick={() => {
              setParams(getDefValue(AddFormData));
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Grid>
      <Grid sx={{ py: 1, px: 0.5 }} xs={12} item>
        <Box my={0.5}>
          <Typography variant="subtitle1" color="initial">
            job selected {selectedJobs > 0 && <>({selectedJobs})</>}
          </Typography>
        </Box>
        <Box maxHeight={300}>
          <CustomTable
            data={data?.data?.jobs ?? []}
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
            onSelected={(e: any) => {
              const ids: any = [];
              for (const key of e) {
                ids.push(key.original._id);
              }
              const idsArray: any = ids.join(",");
              setJobsIds(idsArray);
              setSelectedJobs(ids.length);
            }}
            rootSX={{
              "& .MuiTableContainer-root": {
                overflowY: "auto",
                maxHeight: 260,
              },
            }}
            onPageChange={(onPageData: any) => {
              setParams((prv) => ({
                ...prv,
                offset: (onPageData - 1) * 10,
              }));
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box mt={1} display="flex">
          <Box
            ml="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Button
              onClick={() => {
                setOpenModal(false);
              }}
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              size="small"
              sx={{
                height: 35,
              }}
              type="submit"
              onClick={() => {
                if (jobsIds !== "") {
                  changeHandlerMain({
                    target: {
                      name: "jobIds",
                      value: jobsIds,
                    },
                  });
                  setOpenModal(false);
                } else {
                  toast.error("Please Select the Jobs!");
                }
              }}
            >
              save
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
