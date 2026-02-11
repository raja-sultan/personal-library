import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./create-template.schema";
import { useRouter, useSearchParams } from "next/navigation";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import {
  useCreateSubTemplatesMutation,
  useCreateTemplatesMutation,
  useGetSubTemplateByIdQuery,
  useGetTemplateByIdQuery,
  useLazyGetGlobalEmailForDropdownQuery,
  usePatchSubTemplatesMutation,
  usePatchTemplatesMutation,
} from "@services/configuration/email-templates/email-templates-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function useCreateTemplates(): any {
  const router = useRouter();
  const getParams = useSearchParams().get("action");
  // const typeParam = useSearchParams().get("type");
  const getSubParams = useSearchParams().get("subTemplate");
  const updateSubTemplate = useSearchParams().get("update_sub_template");
  const tempId = useSearchParams().get("tempId");

  // Get Sub Template API
  const { data } = useGetSubTemplateByIdQuery(
    {
      params: {
        templateId: tempId,
      },
    },
    { skip: tempId === null }
  );
  //POST API for create template
  const [createTemplateHandler] = useCreateTemplatesMutation();
  const [createSubTemplateHandler] = useCreateSubTemplatesMutation();

  // Patch Email Templates
  const [patchEmailTemplates] = usePatchTemplatesMutation();
  const [patchSubEmailTemplates] = usePatchSubTemplatesMutation();

  // Get Templates By ID
  const { data: getScoreCard, isLoading } = useGetTemplateByIdQuery(
    {
      params: {
        templateId: updateSubTemplate ? updateSubTemplate : getParams,
      },
    },
    { skip: getParams === null }
  );

  const getGlobalEmailForDropdownQuery =
    useLazyGetGlobalEmailForDropdownQuery();

  console.log("getGlobalEmailForDropdownQuery", getGlobalEmailForDropdownQuery);

  const filterData = data?.data.filter(
    (item) => item._id === updateSubTemplate
  );

  const getCompanyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );
  const userId: any = useSelector((state: any) => state?.auth?.user?.userId);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    // Reset form values except for form and cc
    reset((formValues: any) => ({
      ...formValues,
      ...getScoreCard?.data,
      template_name: updateSubTemplate
        ? filterData?.[0]?.template_name
        : getScoreCard?.data?.template_name,
      description: updateSubTemplate
        ? filterData?.[0]?.description
        : getScoreCard?.data?.description,
      email_subject: updateSubTemplate
        ? filterData?.[0]?.email_subject
        : getScoreCard?.data?.email_subject,
      email_body: updateSubTemplate
        ? filterData?.[0]?.email_body
        : getScoreCard?.data?.email_body,
      emailType: updateSubTemplate
        ? filterData?.[0]?.emailType
        : getScoreCard?.data?.emailType,
      attachment: updateSubTemplate
        ? filterData?.[0]?.attachment
        : getScoreCard?.data?.attachment,
      from: updateSubTemplate
        ? filterData?.[0]?.from
        : getScoreCard?.data?.from,
      cc: updateSubTemplate
        ? filterData?.[0]?.cc.map((email) => ({ email }))
        : getScoreCard?.data.cc.map((email) => ({ email })),
    }));
  }, [getScoreCard?.data, reset]);

  const onSubmit = async (data) => {
    // const usersId = typeParam === "myTemplate" ? userId : "";
    const queryParams = { emailType: data.emailType };
    const formData = new FormData();
    const email = data?.cc.map((item) => item.email);
    formData.append("template_name", data.template_name);
    formData.append("description", data.description);
    formData.append("from", data.from._id);
    formData.append("company_id", getCompanyId);
    formData.append("user_id", userId);
    formData.append("cc", email);
    formData.append("email_subject", data.email_subject);
    formData.append("emailType", data.emailType);
    formData.append("email_body", data.email_body);
    formData.append("attachment", data.attachment);

    const body = formData;

    try {
      let request;
      let successMessage;

      if (getSubParams) {
        request = createSubTemplateHandler({
          body,
          queryParams: {
            templateId: getSubParams,
            emailType: data.emailType,
          },
        });
        successMessage = "Sub Template Created Successfully";
      } else if (updateSubTemplate) {
        request = patchSubEmailTemplates({
          body,
          subtemplateid: updateSubTemplate,
          // subtemplateid: { subtemplateid: updateSubTemplate },
        });
        successMessage = "Sub Template Updated Successfully";
      } else if (getParams === "add") {
        request = createTemplateHandler({ body, queryParams });
        successMessage = "Template Created Successfully";
      } else if (getParams) {
        request = patchEmailTemplates({
          body,
          subtemplateQueryParams: {
            templateId: getParams,
            emailType: data.emailType,
          },
        });
        successMessage = "Template Update Successfully";
      } else {
        return null;
      }

      await request.unwrap();
      toast.success(successMessage);
      reset();
      router.push("/configuration/email-templates");
    } catch (error) {
      toast.error(error?.data?.message);
    }

    if (isLoading) {
      return <StepperFormSkeleton />;
    }
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    methods,
    reset,
    getParams,
    getSubParams,
    router,
    updateSubTemplate,
  };
}
