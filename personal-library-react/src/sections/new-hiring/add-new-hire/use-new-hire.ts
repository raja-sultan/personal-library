import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./new-hire.schema";
import { useRouter } from "next/navigation";
import {
  useLazyGetDepartmentsQuery,
  useLazyGetOfficeQuery,
} from "@services/settings/tasks/tasks-api";
import toast from "react-hot-toast";
import {
  usePostNewHiringMutation,
  useLazyGetUsersListQuery,
} from "@services/new-hiring/new-hirimg-api";

export function useNewHire(): any {
  const departmentList = useLazyGetDepartmentsQuery();
  const locationList = useLazyGetOfficeQuery();
  const getUsersListQuery = useLazyGetUsersListQuery();

  const router = useRouter();

  const [postNewHiring] = usePostNewHiringMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  //Submit Function
  const onSubmit = async (data) => {
    const department = data.department.map((item) => item._id);
    const location = data.location.map((item) => item._id);
    const employmentStatus = data?.employmentStatus?.map((item) => item.value);
    const otherCriteria = data?.otherCriteria?.map((item) => item.id);
    const formData = new FormData();
    const WrapperObject: any = {
      department,
      location,
      employmentStatus,
      otherCriteria,
    };
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("gender", data.gender);
    formData.append("employeeId", data.employeeId);
    formData.append("workEmail", data.workEmail);
    formData.append("startDate", data.startDate);
    formData.append("title", data.title);
    formData.append("Rules", WrapperObject);
    formData.append("onboardingCoordinator", data.onboardingCoordinator._id);
    formData.append("peopleNotify", data?.peopleNotify._id);
    formData.append("skipPlan", data.skipPlan);
    try {
      const { message }: any = await postNewHiring(formData).unwrap();
      toast.success(message || "New Hire Added Successfully");
      router.push("/new-hiring/add-new-hire/hire-details");
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    reset,
    router,
    departmentList,
    locationList,
    getUsersListQuery,
  };
}
