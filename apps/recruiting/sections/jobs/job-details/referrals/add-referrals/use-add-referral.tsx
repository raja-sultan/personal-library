import { useForm } from "react-hook-form";
import {
  AddReferralsDefaultValues,
  formSchema,
  getAddReferralsFormData,
} from "./add.referrals.data";
import { yupResolver } from "@hookform/resolvers/yup";
// import type { FormValues } from "./add.referrals.types";
import {
  useAddReferralMutation,
  useLazyGetJobListQuery,
} from "@services/jobs/job-details/referral/referral-api";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useLazyGetDepartmentListQuery,
  useLazyGetOfficeListQuery,
} from "@services/candidate/add-candidate/add-candidate-api";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";

export function useAddReferral({ setShowAddReferrals }): any {
  const Router = useRouter();
  const [addReferral] = useAddReferralMutation();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getOfficeListQuery = useLazyGetOfficeListQuery();
  const getJobListQuery = useLazyGetJobListQuery();
  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "referral_question",
    });
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: AddReferralsDefaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const submitHandler = handleSubmit(async (data: any) => {
    const formData: any = new FormData();
    formData.append("jobId", jobId ? jobId : data?.job?._id);
    formData.append("department", data?.department?.departmentName);
    formData.append("departmentId", data?.department?._id);
    formData.append("office", data?.office?.officeName);
    formData.append("officeId", data?.office?._id);
    formData.append("isReferral", data?.isReferral);
    formData.append("refereFor", data?.job?.jobName);
    formData.append("date", new Date());
    formData.append("stage", data?.stages);
    const nameAndCompanyBlob = JSON.stringify({
      firstName: data?.firstName,
      lastName: data?.lastName,
      currentCompany: data?.currentCompany,
      currentTitle: data?.currentTitle,
      followReferal: data?.followReferral,
    });

    formData.append("nameAndCompany", nameAndCompanyBlob);

    const infoBlob = JSON.stringify({
      phone: data?.phone,
      email: data?.email,
      socialMediaLink: data?.socialMediaLink,
      website: data?.website,
    });
    formData.append("info", infoBlob);
    formData.append("resume", data.resume);
    formData.append("coverLetter", data.coverLetter);
    const detailBlob = JSON.stringify({
      relationship: data.relationShip,
      workHistory: data.workHistory,
      rating: data.rating,
      reachout: data.reachedOut,
      beingRefered: data.beingReferred,
      referalNotes: data.referralNotes,
      customFields: data.customFields,
    });
    formData.append("detail", detailBlob);

    try {
      const res: any = await addReferral({ formData });
      toast.success(res?.message ?? `Referral Added Successfully!`);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
    jobId ? setShowAddReferrals(true) : Router.push("/dashboard");
  });

  const [office, department] = watch(["office", "department"]);

  const addReferralsFormData = getAddReferralsFormData({
    getDepartmentListQuery,
    getOfficeListQuery,
    getJobListQuery,
    getJobListQueryParams: { office, department },
    data: textFieldData,
    isLoading: isTextFieldLoading,
  });
  return {
    submitHandler,
    addReferralsFormData,
    methods,
    isSubmitting,
  };
}
