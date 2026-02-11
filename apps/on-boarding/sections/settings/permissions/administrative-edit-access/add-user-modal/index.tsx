import { Box, Button } from "@mui/material";
import {
  useLazyGetUsersListQuery,
  usePatchRoleListMutation,
} from "@services/settings/permission-api/permission-api";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useSearchParams } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AddUserModal({
  addUser,
  setAddUser,
}: {
  addUser: boolean;
  setAddUser: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: {
      roleName: [],
    },
    // resolver: yupResolver(EditFormSchemaModel),
  });

  const { handleSubmit, reset } = methods;
  const getUsersListQuery = useLazyGetUsersListQuery();
  const [patchRoleList] = usePatchRoleListMutation();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const onSubmit = async (formData): Promise<void> => {
    const userIds = formData.roleName.map((user) => user._id);
    const jsonPayload = {
      employeeIds: userIds,
    };

    try {
      await patchRoleList({
        role,
        body: jsonPayload,
      }).unwrap();
      toast.success("User(s) added successfully");
      reset();
      setAddUser(false);
    } catch (error) {
      toast.error(error.message ?? "SomeThing went Wrong");
      setAddUser(false);
    }
  };

  return (
    <CustomModal
      onClose={setAddUser}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel="Add User(s)"
      closeButtonProps={{
        onClick: () => {
          setAddUser(false);
        },
      }}
      isOpen={addUser}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteAsync
          multiple
          name="roleName"
          outerLabel="Add user(s)"
          placeholder="Select"
          apiQuery={getUsersListQuery}
          getOptionLabel={(option: any) => option.email}
          transformResponse={(res) => {
            return res?.data ?? [];
          }}
        />

        <Box sx={{ mt: 5, display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setAddUser(false);
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
