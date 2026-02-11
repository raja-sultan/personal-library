import { useState } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CustomModal, CustomTable, FormProvider } from "common";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetPartytaskDataApiQuery,
  usePostPartytaskDataMutation,
} from "@services/settings/3rd-party-task-system/3rd-party-task-system-api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InitialValue, addNewFormData, schema } from "./add-new-model";

export function ThirdPartyTaskSystemSection(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data } = useGetPartytaskDataApiQuery({});

  const columns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => {
        return (
          <>
            <Typography variant="body2" fontWeight={500}>
              {info.row.original?.name ?? "-"}
            </Typography>
            {/* <Typography variant="subtitle2" color="text.disabled">
              {info.row.original?.description ?? "-"}
            </Typography> */}
          </>
        );
      },
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.emailAddress ?? "-",
      id: "emailAddress",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Email Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.type ?? "-",
      id: "type",
      cell: (info: any) => {
        return (
          <Typography variant="body2" fontWeight={500}>
            {info.row.original?.type ?? "-"}
          </Typography>
        );
      },
      header: () => <span>Type</span>,
      isSortable: false,
    },
  ];
  return (
    // <Box>
    <>
      <Typography variant="h5">3rd-Party Task Systems</Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
        If a task needs to be assigned to an outside ticketing system, or if it
        needs to be assigned to more than one person, you can assign it to an
        email address. Tasks assigned to an email address will receive a single
        email when a task is assigned, and can only be completed in the app by
        Owners and Coordinators.
      </Typography>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "end",
          my: 4,
        }}
      >
        <Button
          variant="contained"
          // onClick={() => {
          //   setOpenModal(true);
          // }}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add New
        </Button>
      </Box>
      <Paper>
        <CustomTable
          data={data?.data}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
        />
      </Paper>
      <FieldGroupModal
        open={openModal}
        setOpen={setOpenModal}
        headerLabel="Add New Task System"
        // value={accordionHeader || ""}
        onSubmit={console.log}
      />
    </>
  );
}
function FieldGroupModal(props): JSX.Element {
  const [addNew, { isLoading }] = usePostPartytaskDataMutation();

  const { open, setOpen, headerLabel, value, onSubmit } = props;

  // const methods = useForm({
  //   resolver: yupResolver(
  //     Yup.object({
  //       name: Yup.string().required("required"),
  //     })
  //   ),
  //   defaultValues: { name: value || "" },
  // });
  const methods = useForm({
    defaultValues: InitialValue,
    resolver: yupResolver(schema),
  });
  const { handleSubmit }: any = methods;

  // const onSubmitHandler = (addNewFormData: any): void => {
  //   console.log("within component", addNewFormData)
  //   onSubmit(addNewFormData);
  //   setOpen(false)
  // };
  async function onSubmitHandler(FormData: any): Promise<any> {
    const body = {
      emailAddress: FormData?.emailAddress,
      name: FormData?.name,
      system: FormData?.system,
      viewableFields: FormData?.viewableFields,
    };

    //Add api call
    try {
      const { message }: any = await addNew({ body }).unwrap();
      toast.success(message?.data?.message ?? "Data Submit Successfully");
      // reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.data.message);
    }

    //edit Api call
  }
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      rootSx={{ width: 700, maxHeight: "75vh", overflow: "auto" }}
      headerLabel={headerLabel}
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
    >
      {/* <Divider sx={{ mt: 1, mb: 3 }} /> */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitHandler)}>
        {addNewFormData.map((form: any) => (
          <Grid item key={form.id} sx={{ py: 1, px: 1 }}>
            <form.component {...form?.componentProps} />
          </Grid>
        ))}
        <Box display="flex" justifyContent="flex-end" gap={1} my={1}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save and Close
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
