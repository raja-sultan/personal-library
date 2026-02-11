import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues } from "./create-group-data";
import { usePathname, useRouter } from "next/navigation";
import { formSchema } from "./create-group-schema";
import toast from "react-hot-toast";
import {
  useCreateGroupMutation,
  useGroupViewListQuery,
  useUpdateViewListMutation,
} from "@services/settings/people/groups-api";
import type {
  CreateGroup,
  CreateGroupTypes,
  SeclectedMember,
} from "./create-group-types";
import { useEmployeesListQuery } from "@services/settings/people/employees-api";

export function useCreateGroup(groupId): CreateGroup {
  const router = useRouter();
  const pathName = usePathname();
  const [employeesModal, setEmployeesModal] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState<SeclectedMember[]>([]);

  const { data: groupView } = useGroupViewListQuery(
    { id: groupId },
    { skip: pathName.includes("settings/groups/create-group") }
  );

  const methods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  const [addNewGroup] = useCreateGroupMutation();
  const [updateList] = useUpdateViewListMutation({});
  const { data: employeesData } = useEmployeesListQuery({
    limit: 50000,
    search: "",
  });

  useEffect(() => {
    const filteredArray = employeesData?.data?.employees.filter(
      (obj) => employeeIds?.includes(obj._id)
    );
    setSelectedMember(filteredArray);
  }, [employeeIds]);

  useEffect(() => {
    const { data } = groupView || {};
    if (data) {
      const { groupName, description, members } = data;
      setSelectedMember(members);
      setValue("groupName", groupName);
      setValue("description", description);
      setValue("members", members);
    }
  }, [groupView?.data]);
    const memberIds= selectedMember?.map((item) => item?._id);

  

  const onSubmit = async (formData: CreateGroupTypes): Promise<void> => {
    // formData.members = employeeIds;
    const payLoad  =  {
      groupName:formData.groupName,
      description:formData.description,
      members : memberIds
    }

    try {
      if (groupId) {
        await updateList({
          data: payLoad,
          id: groupId,
        }).unwrap();
        router.push("/settings/groups");
        toast.success("Group is updated successfully ");
        reset();
      } else {
        await addNewGroup(payLoad).unwrap();
        router.push("/settings/groups");
        toast.success("Group is created successfully ");
        reset();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleOpen = (): void => {
    setEmployeesModal(!employeesModal);
  };

  const onAdd = (data: string[]): void => {
    setEmployeeIds(data);
  };

  return {
    onAdd,
    handleOpen,
    onSubmit,
    handleSubmit,
    router,
    employeesModal,
    methods,
    selectedMember,
    setEmployeesModal,
    employeeIds,
  };
}
