"use client";

import { Edit } from "@assets/common";
import { MenuIcon, ViewIcon } from "@assets/icons";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { DownloadCsv } from "@root/utils";
import {
  useGetAllJobsQuery,
  useLazyDownloadStageByJobsReportsQuery,
  usePatchJobsFollowMutation,
} from "@services/jobs/viewJobMain/view-job-main";
import { useLazyDropdownDepartmentsListQuery } from "@services/offices-and-departments/departments-api";
import { useLazyDropdownOfficeListQuery } from "@services/offices-and-departments/offices-api";
import { CustomChip, CustomModal, CustomTable, TableHeader } from "common";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BulkCopyForm } from "./bulk-copy-form";
import { BulkRemoveForm } from "./bulk-remove-form";

export function ViewJobsMain(): JSX.Element {
  const [show, setShow] = useState(false);
  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedRowJobs, setSelectedRowJobs] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [patchJobsFollow] = usePatchJobsFollowMutation();
  const [params, setParams] = useState<any>({
    offset: 0,
  });
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleJobFollow = (jobId: any, follow: any) => {
    patchJobsFollow({
      params: {
        jobId,
      },
    })
      .unwrap()
      .then(() => {
        if (follow) {
          toast.success("Job followed successfully");
        } else {
          toast.success("Job unfollowed successfully");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => {
        return (
          <Box>
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Box>
        );
      },
      cell: ({ row }: any) => (
        <Box>
          <Checkbox
            disabled={row?.original?.Assigned}
            checked={row?.original?.Assigned ? false : row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row,
      id: "Sr",
      header: () => <Box>Sr.</Box>,
      cell: (info: any): JSX.Element => {
        return <Box>{Number(info?.row?.id) + 1}</Box>;
      },
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.jobInfo.jobName,
      id: "job",
      cell: (info: any) => {
        const variants: any = ["success", "warning", "danger", "started"];
        return (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            // gap={2}
          >
            {info.getValue()}
            <Box maxWidth={400}>
              {info.row?.original?.candidateTags?.length > 0 && (
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  flexWrap="wrap"
                  gap={1}
                  mt={1}
                >
                  {info.row.original.candidateTags
                    .slice(0, 3)
                    .map((label: any, index: any) => (
                      <CustomChip
                        key={index}
                        variant={variants[index % variants.length]}
                        rootSx={{
                          fontSize: 11,
                        }}
                        ChipProps={{ label: `${label}` }}
                      />
                    ))}
                </Box>
              )}
            </Box>
          </Box>
        );
      },
      header: () => <span>Job</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.a_id,
      id: "Actions",
      cell: ({ row }: any) => (
        <Box>
          <IconButton
            onClick={() => {
              handleJobFollow(
                row.original._id,
                !(row?.original?.followUser.length > 0)
              );
            }}
          >
            {row?.original?.followUser?.length > 0 ? (
              <PlaylistAddCheckIcon sx={{ color: "success.main" }} />
            ) : (
              <PlaylistAddIcon sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        </Box>
      ),
      header: () => <span>Follow Job</span>,
    },
    {
      accessorFn: (row: any) => row.requisitionId ?? "-",
      id: "reqID",
      cell: (info: any) => info.getValue(),
      header: () => <span>Req ID</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobInfo.department ?? "-",
      id: "Department",
      cell: (info: any) => info.getValue(),
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobInfo.office ?? "-",
      id: "office",
      cell: (info: any) => info.getValue(),
      header: () => <span>office</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.totalCandidateCount ?? "-",
      id: "candidates",
      cell: (info: any) => info.getValue(),
      header: () => <span>Candidates</span>,
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row.applicationReviewCount ?? "-",
    //   id: "new",
    //   cell: (info: any) => info.getValue(),
    //   header: () => <span>New</span>,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row.openDays ?? "-",
      id: "daysOpen",
      cell: (info: any) => info.getValue(),
      header: () => <span>Days Open</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row,
      id: "jobDetails",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
        >
          <Link
            href={{
              pathname: "jobs/job-details/job-dashboard",
              query: {
                jobId: info.row.original._id,
              },
            }}
          >
            <IconButton disableTouchRipple disableFocusRipple disableRipple>
              <ViewIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Link>
        </Box>
      ),
      header: () => <span>Job Details</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.a_id,
      id: "Actions",
      cell: ({ row, table }: any) => (
        <Box>
          {table.getSelectedRowModel().flatRows <= 0 ? (
            <Link
              href={{
                pathname: "/jobs/actions",
                query: {
                  jobId: row.original._id,
                  action: "edit",
                },
              }}
              passHref
            >
              <IconButton>
                <Edit sx={{ color: "text.primary" }} />
              </IconButton>
            </Link>
          ) : (
            <IconButton disabled>
              <Edit sx={{ color: "text.disabled" }} />
            </IconButton>
          )}
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];
  //API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllJobsQuery({
      params: {
        limit: 10,
        ...params,
      },
    });

  const [downloadStageByJobsReports, { isLoading: isLoadingDownload }] =
    useLazyDownloadStageByJobsReportsQuery();
  useEffect(() => {
    const filterJobs: any = [];
    selectedJobs.forEach((item: any) => {
      filterJobs.push(item.original);
    });
    setSelectedRowJobs(filterJobs);
    if (selectedJobs.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectedJobs]); // Run the effect only when selectedJobs changes

  const handleSelected = (e: any) => {
    setSelectedJobs(e);
  };
  const handleDownload = (): Promise<void> => {
    return DownloadCsv(
      downloadStageByJobsReports,
      "downloadStageByJobsReports"
    );
  };
  const departmentQuery = useLazyDropdownDepartmentsListQuery();
  const officeQuery = useLazyDropdownOfficeListQuery();

  return (
    <Box>
      <Paper variant="elevation" elevation={1}>
        <Box p={2}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Overall Jobs</Typography>
          </Box>
          <Box my={1}>
            <TableHeader
              // filterButtonShow
              gridProps={{
                lg: 2.2,
              }}
              showClearFilterButton
              filterButtonLabel="Filter Jobs"
              onChanged={(event) => {
                const updateData: any = {};
                for (const keys in event) {
                  if (
                    event[keys] === "" ||
                    event[keys] === null ||
                    event[keys] === false
                  ) {
                    updateData[keys] = undefined;
                  } else if (typeof event[keys] === "object") {
                    updateData[keys] = event[keys]._id;
                  } else {
                    updateData[keys] = event[keys];
                  }
                }
                setParams((prv) => {
                  return {
                    ...prv,
                    ...updateData,
                    offset: 0,
                  };
                });
              }}
              tableHeaderData={[
                {
                  type: "search",
                  FieldProps: {
                    name: "search",
                    placeholder: "Search Jobs",
                  },
                },
                {
                  type: "select",
                  FieldProps: {
                    name: "status",
                    label: "Job Status",
                  },
                  options: [
                    { label: "All", value: "--" },
                    { label: "Open", value: "Open" },
                    { label: "Closed", value: "Close" },
                    { label: "Draft", value: "Draft" },
                  ],
                },
                {
                  type: "select",
                  FieldProps: {
                    name: "postTo",
                    label: "Board Status",
                  },
                  options: [
                    { label: "All Online", value: "All Online" },
                    { label: "External Only", value: "External Only" },
                    { label: "Internal Only", value: "Internal Only" },
                    {
                      label: "External + Internal ",
                      value: "External + Internal",
                    },
                    {
                      label: "Offline",
                      value: "Offline",
                    },
                  ],
                },
                {
                  type: "select",
                  FieldProps: {
                    name: "users",
                    label: "User",
                  },
                  options: [
                    { label: "All Users", value: "All Users" },
                    { label: "Me", value: "Me" },
                    { label: "Faisal Naeem", value: "Faisal Naeem" },
                    { label: "Waleed Saleh", value: "Waleed Saleh" },
                    {
                      label: "Muneeb Afzal",
                      value: "Muneeb Afzal",
                    },
                    {
                      label: "David Miller",
                      value: "David Miller",
                    },
                  ],
                },
                {
                  type: "asyncMultiselect",
                  FieldProps: {
                    name: "department",
                    label: "Department",
                  },
                  queryParams: {
                    apiQuery: departmentQuery,
                    transformResponse: (res) => res?.data,
                    getOptionLabel: (option) => option?.departmentName,
                    multiple: false,
                  },
                },
                {
                  type: "asyncMultiselect",
                  FieldProps: {
                    name: "office",
                    label: "Office",
                  },
                  queryParams: {
                    apiQuery: officeQuery,
                    transformResponse: (res) => res?.data,
                    getOptionLabel: (option) => option?.officeName,
                    multiple: false,
                  },
                },
                {
                  type: "select",
                  FieldProps: {
                    name: "role",
                    label: "Role",
                    disabled: true,
                  },
                  options: [{ label: "Any Role", value: "Any Role" }],
                },
                {
                  type: "checkbox",
                  FieldProps: {
                    name: "jobFollow",
                    label: "Show only job’s I’m following",
                  },
                },
                {
                  type: "checkbox",
                  FieldProps: {
                    name: "templateJobs",
                    label: "Show only template jobs",
                  },
                },
              ]}
            />
          </Box>
          <Box mt={1}>
            <Box display="flex" alignItems="center" my={2}>
              {isSuccess ? (
                <Typography variant="h6">
                  Total Jobs: {data?.data?.meta?.total}
                </Typography>
              ) : (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="10%"
                  height={30}
                  sx={{ borderRadius: 0.5 }}
                />
              )}

              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {show && (
                  <>
                    <IconButton onClick={handleClick}>
                      <MenuIcon
                        sx={{
                          color: "text.secondary",
                          fontSize: 19,
                        }}
                      />
                    </IconButton>
                    {/* <Button
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      variant="text"
                    >
                      Bulk Edit
                    </Button> */}
                  </>
                )}

                <LoadingButton
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  variant="text"
                  onClick={handleDownload}
                  loading={isLoadingDownload}
                >
                  Download Stage by job report
                </LoadingButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setShowCopyForm(true);
                    }}
                  >
                    Copy Form
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setShowRemoveForm(true);
                    }}
                  >
                    Remove Form
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            <CustomTable
              data={data?.data?.jobs}
              columns={columns}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              isPagination
              isSuccess={isSuccess}
              totalPages={data?.data?.meta?.pages ?? 0}
              currentPage={data?.data?.meta?.page ?? 1}
              onPageChange={(onPageData: any) => {
                setParams((prev) => {
                  return {
                    ...prev,
                    offset: (onPageData - 1) * 10,
                  };
                });
              }}
              onSelected={handleSelected}
            />
          </Box>
        </Box>
      </Paper>
      <CustomModal
        onClose={() => {
          setShowCopyForm(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Bulk Copy a Form"
        closeButtonProps={{
          onClick: () => {
            setShowCopyForm(false);
          },
        }}
        isOpen={showCopyForm}
      >
        <BulkCopyForm
          selectedRowJobs={selectedRowJobs}
          setShowCopyForm={setShowCopyForm}
        />
      </CustomModal>
      <CustomModal
        onClose={() => {
          setShowRemoveForm(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Bulk Remove a Form"
        closeButtonProps={{
          onClick: () => {
            setShowRemoveForm(false);
          },
        }}
        isOpen={showRemoveForm}
      >
        <BulkRemoveForm
          selectedRowJobs={selectedRowJobs}
          setShowRemoveForm={setShowRemoveForm}
        />
      </CustomModal>
    </Box>
  );
}
