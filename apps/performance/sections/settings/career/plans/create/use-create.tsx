"use client";
import { resetMatix } from "@root/slices";
import { useLazyGetSingleCareerPlanQuery, useUpdateCareerPlanMutation } from "@services/career/plans/plans-api";
import { usePublishUnPublishPlanMutation } from "@services/settings/career/plans/plans-api";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface ReturnType {
  disabled: boolean;
  handlePublish: () => void;
  router: AppRouterInstance;
  activeTab: string | null;
  title: string;
  status: string | null;
  plan: any;
}

export function UseCreate({ type }): ReturnType {
  const router = useRouter();
  const [publishUnPublishPlanMutation] = usePublishUnPublishPlanMutation();
  const [getSinglePlan, { data }] = useLazyGetSingleCareerPlanQuery();
  const planLevelId = useSelector((state: any) => state.matrixLevel.userPlanLevel);
  const [updateEmplyees] = useUpdateCareerPlanMutation();
  const activeTab = useSearchParams().get("tab");
  const planId = useSearchParams().get("id");
  const status = useSearchParams().get("status");
  const dispatch = useDispatch();

  useEffect(() => {
    if (planId) {
      try {
        getSinglePlan({ _id: planId }).unwrap();
      } catch (error) {
        toast.success(error?.data?.message || "Error while retrieving plan");
      }
    }
  }, [planId]);

  async function handlePublish(): Promise<void> {
    if (status === "publish") {
      try {
       await updateEmplyees({ id: planId, userPlanLevel: planLevelId }).unwrap();
        await publishUnPublishPlanMutation({ id: planId, status: "Published" }).unwrap();
        toast.success(`Plan ${status} successfully`);
        router.push(`/settings/career/plans`);
        dispatch(resetMatix());
      } catch (error) {
        toast.success(error?.data?.message || "Error while updating plan status");
      }
    }
  }
  const disabled = type === "view";

  let title = " Create";
  if (type === "view") {
    title = "View";
  }
  if (type === "edit") {
    title = "Edit";
  }

  return {
    disabled,
    handlePublish,
    router,
    activeTab,
    title,
    status,
    plan: data
  };
}
