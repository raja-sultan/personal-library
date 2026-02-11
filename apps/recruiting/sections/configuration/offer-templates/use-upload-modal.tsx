import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  UploadModalData,
  uploadModalDefaultValues,
  uploadModalValidationSchema,
} from "./offer-template.data";
import {
  useLazyGetDepartmentListQuery,
  useLazyGetOfficeListQuery,
} from "@services/candidate/add-candidate/add-candidate-api";
import {
  useGetOfferTemplateByIdQuery,
  usePatchOfferTemplateMutation,
  usePostOfferTemplateMutation,
} from "@services/configuration/offer-template/offer-template-api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { awsBaseUrl } from "@root/config";

export function useUploadModal({ setOpenUploadModal }): any {
  const [templateId, setTemplateId] = useState(null);
  const [shouldResetForm, setShouldResetForm] = useState(false); // New state variable

  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getOfficeListQuery = useLazyGetOfficeListQuery();
  const [postData, { isError, isSuccess, isLoading }] =
    usePostOfferTemplateMutation();
  const {
    data: offerTemplateData,
    isLoading: getDataIsLoading,
    isFetching,
  } = useGetOfferTemplateByIdQuery(templateId, {
    skip: templateId === null,
  });
  const [updateOfferTemplate, { isLoading: loading }] =
    usePatchOfferTemplateMutation();
  const methods = useForm({
    resolver: yupResolver(uploadModalValidationSchema),
    defaultValues: uploadModalDefaultValues,
  });
  const officeData = offerTemplateData?.data.officeIds.map((items) => ({
    _id: items?._id,
    officeName: items?.officeName,
  }));
  const departmentData = offerTemplateData?.data.departmentIds.map((items) => ({
    _id: items?._id,
    departmentName: items?.departmentName,
  }));
  const EmployeeTypes = offerTemplateData?.data.employeeTypes.map(
    (items, index) => ({
      id: index === 0 ? 1 : index + 1, // Set id to 1 for the first object, increment for others
      name: items,
      value: items,
    })
  );
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    const formData = new FormData();
    formData.append("templateName", data?.templateName);
    const officeIds = data?.office?.map((items: any) => {
      return items?._id;
    });
    formData.append("officeIds", officeIds);
    const departmentIds = data?.departments?.map((items: any) => {
      return items?._id;
    });
    formData.append("departmentIds", departmentIds);
    const employeeTypes = data?.employeeTypes?.map((items: any) => {
      return items?.value;
    });
    formData.append("employeeTypes", employeeTypes);

    formData.append(
      "attachment",
      data?.attachment ?? offerTemplateData?.data?.attachment?.attachment
    );
    if (templateId) {
      try {
        const res: any = await updateOfferTemplate({
          body: formData,
          templateId,
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
        setOpenUploadModal(false);
        reset(uploadModalDefaultValues);
        setTemplateId(null);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    } else {
      try {
        const res: any = await postData({
          body: formData,
          templateId,
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
        setOpenUploadModal(false);
        reset(uploadModalDefaultValues);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    }
  });

  const [office, departments] = watch(["office", "departments"]);

  const UploadModalFormData = UploadModalData({
    getDepartmentListQuery,
    getOfficeListQuery,
    getJobListQueryParams: {
      office: office === null ? "" : office,
      departments: departments === null ? "" : departments,
    },
  });
  // Reset the form when shouldResetForm becomes true
  useEffect(() => {
    if (shouldResetForm) {
      if (offerTemplateData?.data?.attachment) {
        void fetch(`${awsBaseUrl}${offerTemplateData?.data?.attachment}`)
          .then((response) => response.blob())
          .then((blob) => {
            if (blob) {
              // Check if blob is not null
              reset({
                ...uploadModalDefaultValues,
                ...offerTemplateData?.data,
                templateName: offerTemplateData?.data?.templateName,
                employeeTypes: EmployeeTypes,
                office: officeData,
                departments: departmentData,
                attachment: new File([blob], "attachment.pdf"), // Create File object only if blob is not null
              });
            }
          });
      }
    }
    setShouldResetForm(false); // Reset shouldResetForm back to false
  }, [
    shouldResetForm,
    reset,
    offerTemplateData,
    EmployeeTypes,
    officeData,
    departmentData,
  ]);

  // Control when to reset the form
  useEffect(() => {
    if (templateId !== null && offerTemplateData) {
      setShouldResetForm(true);
    }
  }, [templateId, offerTemplateData]);
  return {
    UploadModalFormData,
    getOfficeListQuery,
    methods,
    onSubmit,
    isSubmitting,
    isError,
    isSuccess,
    isLoading,
    reset,
    setTemplateId,
    loading,
    offerTemplateData,
    templateId,
    getDataIsLoading,
    isFetching,
    // data,
  };
}
