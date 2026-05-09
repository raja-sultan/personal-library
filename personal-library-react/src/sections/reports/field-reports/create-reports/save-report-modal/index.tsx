import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, MenuItem, Stack } from "@mui/material";
import {
  usePutReportListMutation,
  useSaveFieldReportsMutation,
} from "@services/reports/field-reports-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
  saveReportField: yup.string().required("This field is required"),
});

export function SaveReportModal({
  isSaveModal,
  filtersForColumn,
  columnsForFilter,
  data,
}: any): JSX.Element {
  const router = useRouter();
  const [saveReport, setSaveReport] = useState({ open: false, id: null });

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      saveReportField: data?.name ?? "",
    },
  });

  const getCompanyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const { user } = useSelector((state: any) => state.auth);

  const [saveFieldReports] = useSaveFieldReportsMutation({});
  const [renameFieldReports] = usePutReportListMutation();

  const { handleSubmit, reset } = methods;

  const onSubmitHandler = async (formData): Promise<void> => {
    const body = {
      name: formData?.saveReportField,
      companyId: getCompanyId,
      columns: columnsForFilter ? columnsForFilter : [],
      filter: filtersForColumn ? filtersForColumn : [],
      updatedBy: `${user?.firstName} ${user?.lastName}`,
    };

    if (data?._id) {
      await renameFieldReports({ id: data?._id, body })
        .unwrap()
        .then(() => {
          toast.success("Rename Successfully");
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    } else {
      await saveFieldReports({ body })
        .unwrap()
        .then(() => {
          toast.success("Save Successfully");
          router.push("/reports");
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
    reset();
  };
  return (
    <>
      {!isSaveModal ? (
        <MenuItem
          onClick={() => {
            setSaveReport({ open: true, id: null });
          }}
        >
          Rename
        </MenuItem>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setSaveReport({ open: true, id: null });
          }}
        >
          Save Reports AS...
        </Button>
      )}
      <CustomModal
        onClose={() => {
          setSaveReport({ open: false, id: null });
        }}
        headerLabel={isSaveModal ? "Save Report As..." : "Rename Report"}
        closeButtonProps={{
          onClick: () => {
            setSaveReport({ open: false, id: null });
          },
        }}
        isOpen={saveReport.open}
        rootSx={{
          width: { md: "30%", xs: "60%" },
          mt: 2,
          maxHeight: { xs: 500, sm: 600, lg: 700 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <RHFTextField
            name="saveReportField"
            placeholder={isSaveModal ? "New Report" : "rename report"}
            sx={{ my: 2 }}
          />
          <Stack
            sx={{
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "end",
              gap: 1,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setSaveReport({ open: false, id: null });
              }}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained">
              {isSaveModal ? "Save and Close" : "Update Report Name"}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </CustomModal>
    </>
  );
}
