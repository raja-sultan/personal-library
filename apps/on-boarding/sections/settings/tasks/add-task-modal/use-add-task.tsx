import * as Yup from "yup"; // Import Yup from the 'yup' package
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLazyGetDepartmentsQuery } from "@services/settings/emails/choreographed-email-api";
import { useLazyGetOfficeListQuery } from "@services/settings/emails/emails-api";
import {
  useGetCriteriaListQuery,
  usePostTaskMutation,
} from "@services/settings/tasks/tasks-api";
import toast from "react-hot-toast";

const useAddTask = (setOpen) => {
  const FormSchema = Yup.object().shape({
    name: Yup.string().required("Task Name is required"),
    taskCategory: Yup.string().required("Task Categories is required"),
    date: Yup.string().required("Date is required"),
  });

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: "",
      details: "",
      taskCategory: "",
      date: "",
      responsibleForTask: "",
      assign: "",
      attachment: "",
      required: false,
      departmentId: null,
      locationId: null,
      employmentStatus: "",
      criteriaId: null,
    },
  });

  const { handleSubmit, watch } = methods;

  const [postTasks] = usePostTaskMutation();
  //Submit Function
  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("responsibleForTask", data.responsibleForTask);
    formData.append("taskCategory", data.taskCategory);
    formData.append("date", data.date);
    formData.append("assign", data.assign);
    formData.append("attachment", data.attachment);
    formData.append("departmentId", data.departmentId._id);
    formData.append("locationId", data.locationId._id);
    formData.append("criteriaId", data.criteriaId.value);
    formData.append("employmentStatus", data.employmentStatus);
    try {
      const { message }: any = await postTasks(formData).unwrap();
      toast.success(message || "Task Added Successfully");
      setOpen(false);
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
      setOpen(false);
    }
  };

  //Departments API
  const departmentList = useLazyGetDepartmentsQuery();
  const getOfficeListQuery = useLazyGetOfficeListQuery();
  const { data } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });

  const booleanValue = watch("required");

  return {
    submitHandler,
    handleSubmit,
    methods,
    departmentList,
    getOfficeListQuery,
    booleanValue,
    data,
  };
};

export default useAddTask;
