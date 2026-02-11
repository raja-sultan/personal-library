"use client";
import {
  useEditDepartmentMutation,
  useGetDepartmentByIdQuery,
} from "@services/department/department-api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

interface useEditDepartmentHeader {
  mutationLoading: boolean;
  isOpenEditModal: boolean;
  onDeleteModalHandler?: any;
  departmentValues?: any;
  onEditModalHandler?: any;
  // matchingDepartments?: any;
  setIsOpenEditModal: Dispatch<SetStateAction<boolean>>;
  methods: any;
  handleSubmit: any;
  onSubmit;
  getDepartment: any;
}

export function UseEditDepartmentHeader(): useEditDepartmentHeader {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [mutationLoading, setMutationLoading] = useState<boolean>(false);

  const departmentId = useSearchParams().get("id");
  const [updateDepartment] = useEditDepartmentMutation();
  const { data: getDepartment } = useGetDepartmentByIdQuery({ id: departmentId });

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string()
          .required("Field is required.")
          .matches(/^[A-Za-z\s]*$/, "Only alphabetic characters are allowed")
          .max(50, "Name must be at most 50 characters long"),
        description: Yup.string().max(100, "Description must be at most 50 characters long"),
      })
    ),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (departmentId && getDepartment?.data) {
      const departmentData = getDepartment?.data;
      reset({
        name: departmentData?.departmentName,
        description: departmentData?.description,
      });
    }
  }, [departmentId, getDepartment, reset]);

  const onEditModalHandler = (): void => {
    setIsOpenEditModal(!isOpenEditModal);
  };
  const onSubmit = async (values: Record<string, any>): Promise<void> => {
    setMutationLoading(true);
    try {
      await updateDepartment({
        id: departmentId,
        department: {
          departmentName: values?.name,
          description: values?.description,
        },
      }).unwrap();
      toast.success("Department updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating department.");
    } finally {
      setIsOpenEditModal(!isOpenEditModal);
      setMutationLoading(false);
    }
  };
  return {
    mutationLoading,
    onEditModalHandler,
    isOpenEditModal,
    setIsOpenEditModal,
    methods,
    handleSubmit,
    onSubmit,
    getDepartment,
  };
}
