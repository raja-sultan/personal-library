import {
  CustomModal,
  CustomTable,
  FormProvider,
  RHFAutocompleteAsync,
} from "common";
import React, { useState } from "react";
import { useRequestSignatureModal } from "./use-signature-modal";
import { Box, Button } from "@mui/material";
import { tableData } from "./signature.data";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function RequestSignatureModal({ signature, setSignature }: any): JSX.Element {
  const { handleSubmit, onSubmit, methods, departmentList } =
    useRequestSignatureModal();

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.documentName ?? "-",
      id: "documentName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Document Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.counter ?? "-",
      id: "counter",
      cell: (info: any) => info.getValue(),
      header: () => <span>Counter</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action ?? "-",
      id: "Actions",
      cell: () => {
        return <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer" }} />;
      },
      header: () => <span>Action</span>,
    },
  ];

  return (
    <CustomModal
      rootSx={styles.modalStyling}
      onClose={() => {
        setSignature(false);
      }}
      headerLabel="Add Document"
      closeButtonProps={{
        onClick: () => {
          setSignature(false);
        },
      }}
      isOpen={signature}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 1 }}>
          <RHFAutocompleteAsync
            outerLabel="Select Documents"
            name="documents"
            getOptionLabel={(option: any) => option?.departmentName}
            disableCloseOnSelect={false}
            apiQuery={departmentList}
            placeholder="Select"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTable
            data={tableData}
            columns={columns}
            isLoading={false}
            isFetching={false}
            isError={false}
            isPagination
            isSuccess
            showSerialNo
            //totalPages={data?.data?.meta?.pages ?? 0}
            //currentPage={data?.data?.meta?.page ?? 1}
            onPageChange={(onPageData: any) => {
              setParams({
                page: onPageData,
                offset: (onPageData - 1) * 10,
              });
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "end", gap: 1, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSignature(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export default RequestSignatureModal;

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, xxl: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
