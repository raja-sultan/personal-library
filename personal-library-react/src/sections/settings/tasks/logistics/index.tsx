import { CustomTable, TableHeader } from "common";
import { Button, Box, Checkbox } from "@mui/material";
import useLogistics from "./use-logistics";
import { BulkActions } from "./bulk-action";

export function Logistics(): React.JSX.Element {
  const {
    departmentOptions,
    officeOptions,
    setParams,
    data,
    isBulkSelected,
    handleSelected,
    criteriaList,
    selectedRowJobs,
    open,
    setOpen,
    handlePostCSV,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useLogistics();

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
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => {
        return <Box>{info?.row?.original.name ?? "-"}</Box>;
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.responsibleForTask ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>who is Responsible</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.date ?? "-",
      id: "dueDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Due Date</span>,
      isSortable: false,
    },
  ];
  return (
    <>
      <TableHeader
        showClearFilterButton
        gridProps={{
          lg: 2.2,
        }}
        tableHeaderData={[
          {
            type: "select",
            FieldProps: {
              name: "department",
              label: "Department",
            },
            options: departmentOptions ?? [
              {
                id: 1,
                label: "No Department Found",
                value: "No Department Found",
              },
            ],
          },
          {
            type: "select",
            FieldProps: {
              name: "location",
              label: "Location",
            },
            options: officeOptions ?? [
              {
                id: 1,
                label: "No Location Found",
                value: "No Location Found",
              },
            ],
          },
          {
            type: "select",
            FieldProps: {
              name: "employmentStatus",
              label: "Employment Status",
            },
            options: [
              {
                id: 1,
                label: "Contact",
                value: "Contact",
              },
              {
                id: 2,
                label: "Full Time",
                value: "Full Time",
              },
              {
                id: 3,
                label: "Part Time",
                value: "Part Time",
              },
              {
                id: 4,
                label: "Temporary",
                value: "Temporary",
              },
              {
                id: 5,
                label: "Intern",
                value: "intern",
              },
              {
                id: 6,
                label: "Terminated",
                value: "terminated",
              },
            ],
          },
          {
            type: "select",
            FieldProps: {
              name: "other_Criteria",
              label: "Other Criteria",
            },
            options: criteriaList ?? [
              {
                id: 1,
                label: "No Criteria Found",
                value: "No Criteria Found",
              },
            ],
          },
          {
            type: "select",
            FieldProps: {
              name: "responsibleForTask",
              label: "Who is Responsible",
            },
            options: [
              {
                id: 1,
                label: "New Hire",
                value: "newHire",
              },
              {
                id: 2,
                label: "Manager",
                value: "manager",
              },
              {
                id: 3,
                label: "Onboarding Coordinator",
                value: "onboardingCoordinator",
              },
              {
                id: 4,
                label: "Employees",
                value: "Employees",
              },
            ],
          },
          {
            type: "search",
            FieldProps: {
              name: "search",
              placeholder: "Search",
            },
          },
        ]}
        onChanged={(e: any) => {
          setParams(e);
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "end",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          disabled={!isBulkSelected}
          onClick={handlePostCSV}
        >
          Export to CSV
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
          disabled={!isBulkSelected}
        >
          Bulk Actions
        </Button>
      </Box>
      <CustomTable
        data={data?.data?.tasks}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination
        isSuccess={isSuccess}
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
        onSelected={handleSelected}
      />
      {isBulkSelected && (
        <BulkActions
          open={open}
          setOpen={setOpen}
          selectedRowJobs={selectedRowJobs}
        />
      )}
    </>
  );
}
