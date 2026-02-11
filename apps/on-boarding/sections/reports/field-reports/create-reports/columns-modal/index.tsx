import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { CustomModal, FormProvider, RHFAutocompleteSync } from "common";
import { usePostFieldReportsMutation } from "@services/reports/field-reports-api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function ColumnsModal(props: any): JSX.Element {
  const {
    addColumns,
    setAddColumns,
    setStoreData,
    filtersForColumn,
    columnDataListFunction,
  } = props;
  const methods = useForm<any>({
    defaultValues: {
      column: [],
    },
  });
  const getCompanyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const [addColumnFields] = usePostFieldReportsMutation({});

  const { handleSubmit } = methods;

  async function onSubmitHandler(columnData): Promise<void> {
    const filteredColumn = columnData?.columnsSelect?.map((item) => {
      return {
        name: item?.name,
        value: item?.value,
      };
    });
    setAddColumns(false);
    await addColumnFields({
      body: {
        column: filteredColumn,
        filters: filtersForColumn ?? [],
      },
      companyId: getCompanyId,
    })
      .unwrap()
      .then((res: any) => {
        setStoreData(res?.data);
        toast.success("Column Added Successfully");
        columnDataListFunction(filteredColumn);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
    // reset();
  }
  return (
    <CustomModal
      onClose={() => {
        setAddColumns(false);
      }}
      headerLabel="Add Columns"
      closeButtonProps={{
        onClick: () => {
          setAddColumns(false);
        },
      }}
      isOpen={addColumns}
      rootSx={{
        width: { md: "40%", xs: "60%" },
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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitHandler)}>
        <RHFAutocompleteSync
          multiple
          limitTags={4}
          name="columnsSelect"
          placeholder="Select Columns"
          options={[
            { id: 1, name: "About", value: "about" },
            { id: 2, name: "Address Line 1", value: "address.address" },
            { id: 3, name: "Address Line 2", value: "addresslinetwo" },
            { id: 4, name: "City", value: "address.city" },
            { id: 5, name: "State", value: "address.state" },
            { id: 6, name: "Zip Code", value: "address.zipCode" },
            { id: 7, name: "Birthday", value: "dob" },
            { id: 8, name: "Data & BI", value: "dataandbi" },
            { id: 9, name: "Date of Transmission", value: "transmissiondate" },
            { id: 10, name: "Department", value: "department.departmentName" },
            { id: 11, name: "Email", value: "workEmail" },
            { id: 12, name: "First Name", value: "firstName" },
            { id: 13, name: "Last Name", value: "lastName" },
            { id: 14, name: "Phone", value: "phone" },
            { id: 15, name: "Relationship", value: "emergencyRelation" },
            { id: 16, name: "Employment Status", value: "employmentStatus" },
            { id: 17, name: "Ethnicity", value: "ethnicity" },
            { id: 18, name: "Gender", value: "gender" },
            { id: 19, name: "Github Username", value: "githubUser" },
            { id: 20, name: "Middle Name", value: "middleName" },
            { id: 21, name: "Suffix", value: "suffix" },
            { id: 22, name: "LinkedIn", value: "linkedin" },
            { id: 23, name: "Location", value: "location" },
            { id: 24, name: "Manager", value: "manager" },
            { id: 25, name: "Martial Status", value: "maritalStatus" },
            {
              id: 26,
              name: "Onboarding Coordinator",
              value: "onboardingCordinator",
            },
            { id: 27, name: "Personal Email", value: "personalEmail" },
            { id: 28, name: "Personal Pronouns", value: "personalPronoun" },
            { id: 29, name: "Phone Number", value: "phone" },
            {
              id: 30,
              name: "Preferred First Name",
              value: "preferredfirstName",
            },
            { id: 31, name: "Preferred Last Name", value: "preferredlastName" },
            { id: 32, name: "Salary", value: "salary" },
            { id: 33, name: "SSN", value: "ssn" },
            { id: 34, name: "Start Date", value: "startDate" },
            { id: 35, name: "Time Zone", value: "timezone" },
            { id: 36, name: "Title", value: "title" },
            { id: 37, name: "Work Country", value: "address.country" },
            { id: 38, name: "Work Email", value: "workEmail" },
            { id: 39, name: "Date of Leaving", value: "dateofleaving" },
          ]}
        />

        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" },
            gap: 1,
            mt: 2,
          }}
        >
          <LoadingButton
            variant="outlined"
            onClick={() => {
              setAddColumns(false);
            }}
            type="button"
          >
            Cancel
          </LoadingButton>
          <Button variant="contained" type="submit">
            Apply
          </Button>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}
