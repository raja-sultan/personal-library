import { yupResolver } from "@hookform/resolvers/yup";
import { usePostPlanPermissionsMutation } from "@services/settings/career/permissions/permission-api";
import toast from "react-hot-toast";
import { useGetSettingsCompanyDetailsQuery } from "@services/settings/company/company-details";
import {
  useForm,
  type UseFormHandleSubmit,
  type UseFormReturn,
} from "react-hook-form";
import * as Yup from "yup";
import { useEffect } from "react";

interface FormValues {
  planVisibilityForAllPlans: string;
  planPublishingForAdmins: string;
}
interface ReturnType {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  methods: UseFormReturn<FormValues>;
  data: any;
  handleClick: any;
}

export function usePlanPermission(): ReturnType {
  const [postPlanPermission] = usePostPlanPermissionsMutation({});
  const { data, refetch } = useGetSettingsCompanyDetailsQuery({});

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        planVisibilityForAllPlans: Yup.string().required(),
        planPublishingForAdmins: Yup.string().required(),
      })
    ),
    defaultValues: {
      planVisibilityForAllPlans: "",
      planPublishingForAdmins: "",
    },
  });

  const { handleSubmit,reset } = methods;

  const handleClick = async (e): Promise<void> => {
    try {
      await postPlanPermission({
        body: {
          planVisibilityForAllPlans:
            e.target.name === "planVisibilityForAllPlans"
              ? e.target.value === "true"
              : data?.data?.career?.planVisibilityForAllPlans,
          planPublishingForAdmins:
            e.target.name === "planPublishingForAdmins"
              ? e.target.value === "true"
              : data?.data?.career?.planPublishingForAdmins,
        },
      }).unwrap();
      refetch()
      toast.success("Plan Permissions successfully updated");
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    }
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      planVisibilityForAllPlans: data?.data?.career?.planVisibilityForAllPlans,
      planPublishingForAdmins: data?.data?.career?.planPublishingForAdmins,
    }));
  }, [data, reset]);

  return {
    handleSubmit,
    methods,
    handleClick,
    data,
  };
}
