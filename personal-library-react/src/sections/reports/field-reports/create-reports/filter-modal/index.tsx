import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { CustomModal, FormProvider } from "common";
import { useForm, useFieldArray } from "react-hook-form";
import { useCallback, useState } from "react";
import { FilterFields } from "./filter-fields";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostFieldReportsMutation } from "@services/reports/field-reports-api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const filterListValues = [
  { id: 1, label: "Birthday", value: "dob" },
  { id: 2, label: "Date of Leaving", value: "dateofleaving" },
  { id: 3, label: "Date of Transmission", value: "transmissiondate" },
  { id: 4, label: "Department", value: "department.departmentName" },
  { id: 5, label: "Employment status", value: "employmentStatus" },
  { id: 6, label: "Ethnicity", value: "ethnicity" },
  { id: 7, label: "Gender", value: "gender" },
  { id: 8, label: "Location", value: "location" },
  { id: 9, label: "Manager", value: "manager" },
  { id: 10, label: "Martial Status", value: "maritalStatus" },
  { id: 11, label: "Onboarding Coordinator", value: "onboardingCordinator" },
  { id: 12, label: "personal Pronouns", value: "personalPronoun" },
  { id: 13, label: "Start Date", value: "startDate" },
  { id: 14, label: "Time Zone", value: "timezone" },
];

const schema = yup.object().shape({
  filterList: yup
    .array()
    .of(
      yup.object().shape({
        filterLabel: yup
          .mixed()
          .test(
            "is-unique",
            "Filter label already selected",
            function isUnique(value) {
              const filterLabels = this?.from
                ?.map((item) => item.value)[1]
                .filterList.map((item) => item.filterLabel);

              // Count occurrences of the current filterLabel in the list
              const count = filterLabels.filter(
                (label) => label === value
              ).length;
              // Return false if count is greater than 1, indicating duplication
              return count <= 1;
            }
          ),
        filterValue: yup.mixed().required("Filter value is required"),
      })
    )
    .min(1, "At least one filter is required"),
});

export function FilterModal(props: any): JSX.Element {
  const {
    addFilter,
    setAddFilter,
    setStoreData,
    columnsForFilter,
    filtersDataListFunction,
  } = props;
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  const [availableOptions, setAvailableOptions] = useState(filterListValues);

  const methods = useForm<any>({
    defaultValues: {
      filterList: [],
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control, watch, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "filterList",
  });

  const getCompanyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const [addFiltersFields] = usePostFieldReportsMutation({});

  const onSubmitHandler = async (formData): Promise<void> => {
    const selectedFilters: any = [];
    formData.filterList.forEach((filterItem: any) => {
      if (filterItem.filterLabel && filterItem.filterValue) {
        const valueProperty =
          filterItem?.filterLabel?.value === "startDate" ||
          filterItem?.filterLabel?.value === "dob" ||
          filterItem?.filterLabel?.value === "dateofleaving" ||
          filterItem?.filterLabel?.value === "transmissiondate"
            ? {
                after: filterItem?.filterValue?.endDate,
                before: filterItem?.filterValue?.startDate,
              }
            : { value: filterItem?.filterValue };
        const filteredObj = {
          type:
            filterItem?.filterLabel?.value === "startDate" ||
            filterItem?.filterLabel?.value === "dob" ||
            filterItem?.filterLabel?.value === "dateofleaving" ||
            filterItem?.filterLabel?.value === "transmissiondate"
              ? "date"
              : "string",
          name: filterItem?.filterLabel?.value,
          ...valueProperty,
        };
        selectedFilters.push(filteredObj);
      }
    });

    await addFiltersFields({
      body: { column: columnsForFilter, filters: selectedFilters ?? [] },
      companyId: getCompanyId,
    })
      .unwrap()
      .then((res: any) => {
        setStoreData(res?.data);

        toast.success("Filter Added Successfully");
        filtersDataListFunction(selectedFilters);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
    setAddFilter(false);
    // reset();
  };

  const onChanged = useCallback((e, newValue, onChange) => {
    onChange(newValue);
  }, []);
  const handleAutocompleteOpenChange = useCallback(
    (index, isOpen) => {
      const newOpenStates = [...openStates];
      newOpenStates[index] = isOpen;
      setOpenStates(newOpenStates);
    },
    [openStates]
  );

  const filterListValue = watch("filterList");

  return (
    <CustomModal
      onClose={() => {
        setAddFilter(false);
      }}
      headerLabel="Filter"
      closeButtonProps={{
        onClick: () => {
          setAddFilter(false);
          reset();
        },
      }}
      isOpen={addFilter}
      rootSx={{
        width: { md: "40%", xxs: "80%" },
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
        {fields?.map((val: any, index: any) => {
          return (
            <FilterFields
              key={`${val?.id}-${val.label}`}
              index={index}
              control={control}
              openStates={openStates}
              handleAutocompleteOpenChange={handleAutocompleteOpenChange}
              filterListValues={filterListValues}
              filterListValue={filterListValue}
              optionList={availableOptions}
              remove={remove}
              onChanged={onChanged}
              setAvailableOptions={setAvailableOptions}
              availableOptions={availableOptions}
            />
          );
        })}
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" },
            gap: 1,
            mt: 3,
          }}
        >
          <LoadingButton
            variant="outlined"
            onClick={() => {
              append({
                filterLabel: null,
                filterValue: {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: `selection`,
                },
              });
            }}
            type="button"
          >
            Add Filter
          </LoadingButton>
          <Button variant="contained" type="submit">
            Apply
          </Button>
        </Stack>
      </FormProvider>
    </CustomModal>
  );
}
