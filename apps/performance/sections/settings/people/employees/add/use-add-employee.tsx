import { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEmployeeSchema } from "./add-employee.schema";
import type { EmployeeFormData } from "./add-employee.types";
import { useForm } from "react-hook-form";
import { useGetDepartmentQuery } from "@services/department/department-api";
import { useGetCompanyLocationQuery } from "@services/company-locations-api";
import { useAddEmployeeMutation } from "@services/settings/people/employees-api";
import toast from "react-hot-toast";

function useAddEmployee() {
  const [mutationLoading, setMutationsLoading] = useState<boolean>(false);

  const { data: departments } = useGetDepartmentQuery({
    limit: 100,
    offset: 0,
  });

  const router = useRouter();

  const { data: companyLocations } = useGetCompanyLocationQuery({});

  const [mutation] = useAddEmployeeMutation();

  const onSubmit = (formData): void => {
    setMutationsLoading(true);
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          (!(typeof value === "string") || value.trim() !== "")
      )
    );
    mutation(cleanedFormData)
      .unwrap()
      .then(() => {
        toast.success("Employee added successfully.");
        router.push("/settings/employees");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      })
      .finally(() => {
        setMutationsLoading(false);
      });
  };

  const methods = useForm<EmployeeFormData>({
    resolver: yupResolver(addEmployeeSchema),
  });

  const { handleSubmit } = methods;

  return {
    mutationLoading,
    departments,
    companyLocations,
    mutation,
    onSubmit,
    methods,
    handleSubmit,
    router,
  };
}

export default useAddEmployee;
