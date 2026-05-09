import { TaskFilters } from "@sections/settings/tasks/filters";
import { useGetEsignatureListQuery } from "@services/reports/e-signature-report-api";
import { CustomTable } from "common";
import dayjs from "dayjs";
import { useState } from "react";

export function ESignatureReport(): JSX.Element {
  const [status, setStatus] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [counterSigner, setCounterSigner] = useState<any>();
  const [template, setTemplate] = useState<any>();
  const { data: getEsignatureList } = useGetEsignatureListQuery({
    limit: 10,
    offset: 0,
    status,
    signer,
    counterSigner,
    template
  });
  const columns = [
    {
      accessorFn: (row: any) => row?.templateName ?? "-",
      id: "templateName",
      cell: (info: any) => info.getValue(),
      header: () => <>Template Name</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.signerName ?? "-",
      id: "signerName",
      cell: (info: any) => info.getValue(),
      header: () => <>Signer</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.signerStartDate ?? "-",
      id: "signerStartDate",
      cell: (info: any) => info.getValue(),
      header: () => <>Signer Start Date</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.counterSignerName ?? "-",
      id: "counterSignerName",
      cell: (info: any) => info.getValue(),
      header: () => <>Counter Signer</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => info.getValue(),
      header: () => <>Status</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.assignedAt ?? "-",
      id: "assignedAt",
      cell: (info: any) => dayjs(info.getValue()).format("MM/DD/YYYY"),

      header: () => <>Assigned At</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.assignedBy ?? "-",
      id: "assignedBy",
      cell: (info: any) => info.getValue(),
      header: () => <>Assigned By</>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.signedAt ?? "-",
      id: "signedAt",
      cell: (info: any) => info.getValue(),
      header: () => <>Signed At</>,
      isSortable: false,
    },
  ];
  return (
    <>
      <TaskFilters
       const filterHeaderData={[
          {
            type: "select",
            outerLabel: "Signer",
            FieldProps: {
              name: "signer",
            },         
            options: [{ id: 1, value: "faiselNaeem", label: "Faisel Naeem" }],
          },
          {
            type: "select",
            outerLabel: "Status",
            FieldProps: {
              name: "status",
            },
            options: [
              {
                id: 1,
                label: "Completed",
                value: "completed",
              },
              {
                id: 2,
                label: "Not Started",
                value: "not_started",
              },
              {
                id: 3,
                label: "Being Process",
                value: "being_processed",
              },
              {
                id: 4,
                label: "Counter Signing",
                value: "counter_signing",
              },
              {
                id: 5,
                label: "Cancelled",
                value: "cancelled",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Counter Signer",
            FieldProps: {
              name: "counterSigner",
            },
            options: [
              {
                id: 1,
                label: "Faisel",
                value: "faisel",
              },
            ],
          },
          {
            type: "select",
            outerLabel: "Template Name",
            FieldProps: {
              name: "templateName",
            },
            options: [
              {
                id: 1,
                label: "Template 1",
                value: "Template1",
              },
            ],
          },
        ]}
        filterButtonShow
        onChanged={(e: any) => {
          setSigner(e?.signer);
          setCounterSigner(e?.counterSigner);
          setTemplate(e?.templateName);
          setStatus(e?.status);
        }}
        
      />
      <CustomTable data={getEsignatureList?.data?.esignature} columns={columns} isSuccess />
    </>
  );
}
