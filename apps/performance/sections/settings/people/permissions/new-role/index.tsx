"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { DeleteTrashIcon } from "@assets/icons";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { NewRoleDetails } from "./details";
import { NewRoleEmployees } from "./employees";
import { useRouter, useSearchParams } from "next/navigation";
import { Permissions } from "./permissions";
import HorizontalTabs from "@components/horizontal-tab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { roleFormSchema } from "./new-role.schema";
import { FormProvider } from "common";
import type {
  PermissionState,
  RoleFormTypes,
  PermissionsRoleTypes,
} from "./new-role.types";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useLazyGetRoleQuery,
  useUpdateRoleMutation,
} from "@services/settings/people/permissions-api";
import toast from "react-hot-toast";

const defaultValues = {
  name: "",
  description: "",
};

export function PermissionsRole({ title }: PermissionsRoleTypes): JSX.Element {
  const router = useRouter();
  const [checked, setChecked] = useState<PermissionState>({});
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");
  const [addRoleMutation] = useAddRoleMutation();
  const [updateRoleMutation] = useUpdateRoleMutation();
  const [getRole] = useLazyGetRoleQuery();
  const [deleteRoleMutation] = useDeleteRoleMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(roleFormSchema),
    defaultValues: async () => {
      if (!roleId) {
        return defaultValues;
      }
      const { data, isError, error } = await getRole({ id: roleId });
      if (isError || !data?.data) {
        const {
          data: { message },
        }: any = error;
        toast.error(message);
        router.replace("/settings/permissions");
        return;
      }
      const { name, description, permissions } = data.data;

      const outputObject = convertArrayToFormat(permissions);
      // console.log(outputObject);
      setChecked((prevChecked) => ({
        ...prevChecked,
        ...outputObject,
      }));
      setCheckedIds([...checkedIds, ...permissions]);

      return {
        name,
        description,
      };
    },
  });

  const { handleSubmit } = methods;

  function convertArrayToFormat(array: string[]): Record<string, boolean> {
    const result: Record<string, boolean> = {};

    array.forEach((permission) => {
      result[permission] = true;
    });

    return result;
  }

  function deleteRole(): void {
    deleteRoleMutation({ id: roleId })
      .unwrap()
      .then(() => {
        toast.success("Role deleted successfully!");
        router.replace("/settings/permissions");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }

  function handleDeleteModal(): void {
    setOpenDeleteModal(!openDeleteModal);
  }

  const onSubmit = (data: RoleFormTypes): void => {
    const body = {
      ...data,
      permissions: checkedIds,
    };
    handleAddOrEditRole(body);
  };

  function handleAddOrEditRole(body): void {
    if (roleId) {
      updateRoleMutation({ id: roleId, body })
        .unwrap()
        .then(() => {
          toast.success("Role updated successfully!");
          router.push("/settings/permissions");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else {
      addRoleMutation(body)
        .unwrap()
        .then(() => {
          toast.success("Role added successfully!");
          router.push("/settings/permissions");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  }

  const tabArray = ["Details", "Permissions"];
  if (roleId) tabArray.push("Employees");

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CustomCard
        header
        cardHeader={{
          title,
          onBack: () => {
            router.push("/settings/permissions");
          },
          actions: (
            <>
              <Button variant="contained" type="submit">
                Save
              </Button>
              {roleId && (
                <Button
                  variant="outlined"
                  sx={{ borderColor: "neutral.300" }}
                  onClick={handleDeleteModal}
                >
                  <DeleteTrashIcon sx={{ color: "neutral.700" }} />
                </Button>
              )}
            </>
          ),
        }}
      />
      <Box mt="24px">
        <HorizontalTabs tabsArray={tabArray}>
          <NewRoleDetails />
          <Permissions
            checked={checked}
            setChecked={setChecked}
            checkedIds={checkedIds}
            setCheckedIds={setCheckedIds}
          />
          {roleId && <NewRoleEmployees />}
        </HorizontalTabs>
      </Box>
      {openDeleteModal && (
        <CustomModal
          open={openDeleteModal}
          onClose={handleDeleteModal}
          onAccept={deleteRole}
          title="Are you sure?"
          message="Are you sure you want to delete this role?"
        />
      )}
    </FormProvider>
  );
}
