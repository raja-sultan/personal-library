import { type SetStateAction, type Dispatch } from "react";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCustomSelect,
} from "common";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLazyUsersQuery } from "@services/json-placeholder-api";

export function AddUserModal({
  addUser,
  setAddUser,
}: {
  addUser: boolean;
  setAddUser: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const methods = useForm({
    defaultValues: {
      roleName: null,
    },
    // resolver: yupResolver(EditFormSchemaModel),
  });

  const apiQuery = useLazyUsersQuery();
  const router = useRouter();

  const { handleSubmit } = methods;

  const onSubmit = (formData): any => {
    console.log(formData);
    router.push(
      `/addUsers/permissions/custom-access/?roleName=${formData.roleName}`
    );
    setAddUser(false);
  };

  return (
    <CustomModal
      onClose={setAddUser}
      rootSx={{
        maxWidth: { xs: "auto", sm: 550, md: 800 },
        maxHeight: 900,
      }}
      headerLabel="Add Users"
      closeButtonProps={{
        onClick: () => {
          setAddUser(false);
        },
      }}
      isOpen={addUser}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteSync
          multiple
          name="addUsers"
          outerLabel="Add Employee(s)"
          placeholder="Select"
          options={[
            { id: 1, name: "Muneeb", value: "muneeb" },
            { id: 2, name: "Asad", value: "asad" },
          ]}
        />
        <Typography variant="body2" sx={{ pb: 1 }}>
          Give them permission for employees whose
        </Typography>
        <RHFAutocompleteSync
          multiple
          name="departmentMatches"
          outerLabel="Department Matches"
          placeholder="Select"
          options={[
            {
              id: 1,
              label: "Business Analysis",
              value: "BusinessAnalysis",
            },
          ]}
          sx={{ mb: 1 }}
        />
        <RHFAutocompleteSync
          multiple
          name="locationMatches"
          outerLabel="Location Matches"
          placeholder="Select"
          options={[
            {
              id: 1,
              label: "Dublin Office",
              value: "dublinOffice",
            },
          ]}
          sx={{ mb: 1 }}
        />
        <RHFAutocompleteSync
          multiple
          name="employmentStatusMatches"
          outerLabel="Employment Status Matches"
          placeholder="Select"
          options={[
            {
              id: 1,
              label: "Contract",
              value: "contract",
            },
          ]}
          sx={{ mb: 1 }}
        />
        <RHFAutocompleteSync
          multiple
          name="otherCriteriaMatches"
          outerLabel="Other Criteria Matches"
          placeholder="Select"
          options={[
            {
              id: 1,
              label: "My Task",
              value: "myTask",
            },
          ]}
        />
        <Typography variant="body1" sx={{ pt: 1 }}>
          Expect for these employee
        </Typography>
        <Typography variant="h6" sx={{ py: 1 }}>
          The user(s) will not have permissions granted by custom role for any{" "}
          <br />
          employee in this list
        </Typography>
        <RHFAutocompleteSync
          multiple
          name="addEmployees"
          outerLabel="Add Employee(s)"
          placeholder="Select"
          options={[
            { id: 1, name: "Muneeb", value: "muneeb" },
            { id: 2, name: "Asad", value: "asad" },
          ]}
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
            Save & Close
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
