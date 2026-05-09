import { CustomAccordion, CustomTable } from "common";

export function JobTraining(): JSX.Element {
  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Who is responsible?</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Due Date</span>,
      isSortable: false,
    },
  ];
  return (
    <CustomAccordion title="Job Training">
      <CustomTable
        data={{}}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isPagination={false}
        isSuccess
      />
    </CustomAccordion>
  );
}
