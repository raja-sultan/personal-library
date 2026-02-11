"use client";
import { useSetDepartmentHeadsMutation, useDeleteDepartmentMutation } from "@services/department/department-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";

interface UseSetDepartmentHeadsModal {
  isOpenDeleteModal: boolean;
  isOpenHeadersModal: boolean;
  onDeleteModalHandler?: any;
  onSubmit?: any;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  showUser: boolean;
  setShowUser: Dispatch<SetStateAction<boolean>>;
  headersData: string[];
  setIsOpenHeadersModal: Dispatch<SetStateAction<boolean>>;
  addDepartmentHeads: any;
  deleteSelectedTextHandler: any;
  onDeleteHandler: () => void;
}

export function useSetDepartmentHeadsModal(): UseSetDepartmentHeadsModal {
  const [isOpenHeadersModal, setIsOpenHeadersModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [addDepartmentHeads, setAddDepartmentHeads] = useState<any>(null);
  const [showUser, setShowUser] = useState(false);

  const departmentId = useSearchParams();
  const id = departmentId.get("id");
  const router = useRouter();
  //api calls
  const { data: getHeadersData } = useGetReferenceDataLookupQuery({
    type: "employees",
  });

  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [setHeadersData] = useSetDepartmentHeadsMutation();

  const headersData = getHeadersData?.data?.map((item: any) => ({ id: item.value, name: item.text, fields: item.additionalFields })) ?? [];

  async function onSubmit(values: any): Promise<void> {
    const getIds = values?.title?.map((obj: any) => obj?.id);
    try {
      await setHeadersData({
        id,
        userId: getIds
      }).unwrap();
      toast.success("Add header successful!");
      setIsOpenHeadersModal(!isOpenHeadersModal);
    } catch (error) {
      toast.error(error?.data?.message || "Error while set department heads");
    }
  };

  function deleteSelectedTextHandler(userId: string): void {
    const departments = addDepartmentHeads?.filter(({ _id }) => _id !== userId);
    setAddDepartmentHeads(departments);
  }

  async function onDeleteHandler(): Promise<void> {
    const departmentToDelete = {
      id,
    };
    try {
      await deleteDepartment({ id: departmentToDelete?.id }).unwrap();
      setIsOpenDeleteModal(!isOpenDeleteModal);
      toast.success("Delete department successful!");
      router.push("/settings/departments");
    } catch (error) {
      toast.error(error?.data?.message || "Error while Deleting department");
    }
  };

  return {
    onSubmit,
    isOpenHeadersModal,
    showUser,
    setShowUser,
    headersData,
    setIsOpenHeadersModal,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    addDepartmentHeads,
    deleteSelectedTextHandler,
    onDeleteHandler,
  };
}
