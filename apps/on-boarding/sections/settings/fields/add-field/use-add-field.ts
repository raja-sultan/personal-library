import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyGetDepartmentsQuery } from "@services/settings/emails/choreographed-email-api";
import {
  useLazyGetSingleFieldsGroupListQuery,
  useLazyGetSubFieldsGroupsSingleListQuery,
  usePostSubFieldsGroupListMutation,
  usePutSubFieldsGroupsSingleListMutation,
} from "@services/settings/fields-api/fields-api";
import { omit } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fieldType, newFieldDetails, newRulesDetails } from "./add-field-data";
import { defaultValues, schema } from "./add-field.schema";

export function useAddField(): any {
  const departmentList = useLazyGetDepartmentsQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const fieldMainId = searchParams.get("fieldGroupId");
  const fieldSubId = searchParams.get("fieldId");
  const fieldGroupName = searchParams.get("fieldGroupName");
  const [loading, setLoading] = useState(false);
  const [getSingleFieldsGroupList] = useLazyGetSingleFieldsGroupListQuery();
  const [getSubFieldsGroupsSingleList] =
    useLazyGetSubFieldsGroupsSingleListQuery();
  const [postSubFieldsGroupList] = usePostSubFieldsGroupListMutation();
  const [putSubFieldsGroupsSingleList] =
    usePutSubFieldsGroupsSingleListMutation();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      setLoading(true);
      if (action === "Add") {
        try {
          const res = await getSingleFieldsGroupList({
            params: {
              fieldGroupId: fieldMainId,
            },
          }).unwrap();
          const { data } = res;
          const updateData: any = { ...defaultValues };
          updateData.fieldGroup = data.name;
          updateData.fieldGroupId = data._id;
          setLoading(false);
          return updateData;
        } catch (error) {
          setLoading(false);
        }
      } else if (action === "edit") {
        try {
          const res = await getSubFieldsGroupsSingleList({
            params: {
              fieldGroupId: fieldMainId,
              fieldId: fieldSubId,
            },
          }).unwrap();
          const { data } = res;
          const updateData: any = { ...data };
          updateData.fieldType = fieldType.filter(
            (field) => field.value === data.fieldType
          )[0];
          updateData.fieldGroup = fieldGroupName;
          updateData.fieldGroupId = fieldMainId;
          setLoading(false);
          return updateData;
        } catch (error) {
          setLoading(false);
        }
      } else {
        return {};
      }
    },
  });

  const { handleSubmit, reset } = methods;
  const isLoading = false;
  const onSubmit = async (data) => {
    const updateData: any = {};
    for (const keys in data) {
      if (typeof data[keys] === "object") {
        updateData[keys] = data[keys].value;
      } else {
        updateData[keys] = data[keys];
      }
    }
    if (action === "Add") {
      try {
        await postSubFieldsGroupList({
          params: { fieldGroupId: updateData.fieldGroupId },
          body: omit(updateData, ["fieldGroupId"]),
        }).unwrap();
        toast.success("Add New Field successfully");
        router.push("/settings/fields");
        reset();
      } catch (error) {
        toast.error(error ?? "someThing Went Wrong");
        reset();
      }
    } else if (action === "edit") {
      try {
        await putSubFieldsGroupsSingleList({
          params: {
            fieldGroupId: fieldMainId,
            fieldId: fieldSubId,
          },
          body: omit(updateData, ["fieldGroupId", "location", "_id"]),
        }).unwrap();
        toast.success("Update Field successfully");
        router.push("/settings/fields");
        reset();
      } catch (error) {
        toast.error(error ?? "someThing Went Wrong");
        reset();
      }
    } else toast.error("someThing Went Wrong");
  };

  const newFieldDetail = newFieldDetails()?.newFieldDetail;

  const newRulesDetail = newRulesDetails({
    departmentList,
  })?.newRuleDetail;

  return {
    handleSubmit,
    onSubmit,
    methods,
    reset,
    newFieldDetail,
    newRulesDetail,
    defaultValues,
    loading,
    router,
    action,
    isLoading,
  };
}
