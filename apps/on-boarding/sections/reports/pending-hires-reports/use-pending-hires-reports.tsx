import { useGetDepartmentsListQuery } from "@services/settings/department/department-api";
import { useGetLocationListQuery } from "@services/settings/location/location-api";
import { useGetCriteriaListQuery } from "@services/settings/tasks/tasks-api";

const UsePendingHireReport = () => {
  // Departments API
  const { data: departments } = useGetDepartmentsListQuery({});
  const departmentOptions = departments?.data?.departments.map(
    (option: any) => {
      return {
        departmentId: option._id,
        label: option.departmentName,
        value: option._id,
      };
    }
  );
  // Location API
  const { data: getLocationList } = useGetLocationListQuery({
    limit: 10,
    offset: 0,
  });
  const locationListOptions = getLocationList?.data?.office?.map(
    (option: any) => {
      return {
        id: option._id,
        label: option.location,
        value: option.location,
      };
    }
  );

  // Criteria API
  const { data: criteriaList } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });
  const criteriaListOptions = criteriaList?.data?.criteria?.map(
    (option: any) => {
      return {
        id: option._id,
        label: option.criteriaName,
        value: option.criteriaName,
      };
    }
  );

  return {
    departmentOptions,
    locationListOptions,
    criteriaListOptions,
  };
};

export default UsePendingHireReport;
