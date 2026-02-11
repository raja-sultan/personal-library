// import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Box, Button } from "@mui/material";
import {
  useAddGlobalEmailMutation,
  useGetGlobalEmailQuery,
} from "@services/configuration/email-templates/email-templates-api";
import { FormProvider, RHFTextField, CustomTable, CustomChip } from "common";
import { useForm } from "react-hook-form";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";

export function GlobalEmailTable(): JSX.Element {
  // const [params, setParams] = useState<any>({
  //   page: 1,
  //   offset: 0,
  // });

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const [postGlobalEmail] = useAddGlobalEmailMutation();

  const getCompanyId = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const onSubmit = async (data): Promise<void> => {
    const body = {
      email: data.email,
      companyId: getCompanyId,
    };
    await postGlobalEmail({ body })
      .unwrap()
      .then(() => {
        toast.success("Email Verified Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
    reset();
  };

  const columns = [
    {
      accessorFn: (row: any) => row?.email ?? "-",
      id: "email",
      cell: (info: any) => info.getValue(),
      header: () => <span>Email</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.isVerify ?? "-",
      id: "status",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          <CustomChip
            ChipProps={{ label: info.getValue() ? "Verified" : "Not-Verified" }}
            variant={info.getValue() ? "success" : "danger"}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
      isSortable: false,
    },
  ];
  const {
    data: getGlobalEmailData,
    isLoading,
    isFetching,
    isError,
  } = useGetGlobalEmailQuery({
    companyId: getCompanyId,
  });

  return (
    <>
      <Card sx={styles.mainCard}>
        <CardContent sx={{ pt: 2 }}>
          <CustomTable
            data={getGlobalEmailData?.data}
            columns={columns}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isPagination
            isSuccess
            showSerialNo
            totalPages={getGlobalEmailData?.data?.meta?.pages ?? 0}
            currentPage={getGlobalEmailData?.data?.meta?.page ?? 1}
            // onPageChange={(onPageData: any) => {
            //   setParams({
            //     page: onPageData,
            //     offset: (onPageData - 1) * 10,
            //   });
            // }}
          />
        </CardContent>
      </Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              mt: 2.5,
              display: { xs: "grid", sm: "flex" },
              alignItems: "baseline",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <RHFTextField name="email" placeholder="Enter your email" />
            </Box>
            <Button
              variant="contained"
              type="submit"
              endIcon={<AddOutlinedIcon />}
            >
              Add Email
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
}

const styles = {
  mainCard: {
    borderRadius: "10px",
    outline: "none",
    border: "none",
    backgroundColor: "background.paper",
  },
  backupTitle: { fontSize: "24px", fontWeight: 600, mb: 3 },
};
