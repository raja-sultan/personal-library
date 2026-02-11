"use client";

import { useGetDepartmentByIdQuery } from "@services/department/department-api";
import { useSearchParams } from "next/navigation";

interface useEditDepartments {
  getMembers: any;
  getHeads: any;
}

export function useEditDepartment(): useEditDepartments {
  const departmentId = useSearchParams().get("id");
  const { data: getMembers, data: getHeads } = useGetDepartmentByIdQuery({ id: departmentId });

  return {
    getMembers,
    getHeads,
  };
}
