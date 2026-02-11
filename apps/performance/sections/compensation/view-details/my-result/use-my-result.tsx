import { useGetSingleTeamResultQuery } from "@services/compensation/compensation-cycle/compensation-cycle-view-details-api"
import type { CustomTableProps } from "common/components/custom-table/custom-table.types"
import dayjs from "dayjs"

interface ReturnType {
  businessTableData: CustomTableProps
  salaryTableData: CustomTableProps
}

export function useMyResult(): ReturnType {

  const { data, isLoading, isError, isFetching } = useGetSingleTeamResultQuery({
    id: '65812c5ec70b6baf31a6c02d',
  })

  const totalCurrentSalary = data?.data?.currentSalary;
  const totalNewPay = data?.data?.newPay;

  let payIncrease = totalCurrentSalary - totalNewPay;

  if (totalNewPay || totalCurrentSalary > 0) {
    payIncrease = 0;
  }


  const businessColumns = [
    {
      accessorFn: ({ _id }) => _id,
      id: "_id",
      cell: ({ getValue }) => getValue() ?? '-',
      header: () => <>level</>,
      isSortable: false,
    },
    {
      accessorFn: ({ user }) => user?.location,
      id: "user.location",
      cell: ({ getValue }) => getValue() ?? '-',
      header: () => <>location</>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.employmentStartDate,
      id: "employmentStartDate",
      cell: ({ row: { original } }) => original?.user?.employmentStartDate ? dayjs(original.user?.employmentStartDate).format("D/M/YYYY") : "-",
      header: () => <>start Date</>,
      isSortable: false,
    },
    {
      accessorFn: ({ row }) => row?.lastCompensationDate,
      id: "lastCompensationDate",
      cell: ({ row: { original } }) => original?.user?.lastCompensationDate ? dayjs(original.user?.lastCompensationDate).format("D MMM YYYY") : "-",
      header: () => <>Last Pay Change</>,
      isSortable: false,
    },
    {
      accessorFn: ({ isPromoted }) => isPromoted,
      id: "isPromoted",
      cell: ({ getValue }) => getValue() ? "Yes" : "No",
      header: () => <>promotion</>,
      isSortable: false,
    },
  ]

  const businessTableData: CustomTableProps = {
    data: data?.data,
    columns: businessColumns,
    isSuccess: true,
    isLoading,
    isFetching,
    isError,
    isPagination: false
  }

  const salaryColumns = [
    {
      accessorFn: ({ currentSalary }) => currentSalary,
      id: "currentSalary",
      cell: ({ getValue }) => getValue() ?? '-',
      header: () => <>previous Pay</>,
      isSortable: false,
    },
    {
      accessorFn: () => payIncrease,
      id: "payIncrease",
      cell: ({ getValue }) => getValue() ?? '-',
      header: () => <>pay Increase</>,
      isSortable: false,
    },
    {
      accessorFn: ({ newPay }) => newPay,
      id: "newPay",
      cell: ({ getValue }) => getValue() ?? 0,
      header: () => <>new Pay</>,
      isSortable: false,
    },
    {
      accessorFn: ({ payEffectiveDate }) => payEffectiveDate,
      id: "payEffectiveDate",
      cell: ({ row: { original } }) => original?.payEffectiveDate ? dayjs(original?.payEffectiveDate).format("D MMM YYYY") : "-",
      header: () => <>pay Effective Date</>,
      isSortable: false,
    },
  ]

  const salaryTableData: CustomTableProps = {
    data: data?.data,
    columns: salaryColumns,
    isSuccess: true,
    isLoading,
    isFetching,
    isError,
    isPagination: false
  }

  return {
    businessTableData,
    salaryTableData
  }

}