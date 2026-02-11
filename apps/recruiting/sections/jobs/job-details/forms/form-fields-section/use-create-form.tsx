import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, schema } from "./create-from-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetJobsDropdownQuery } from "@services/jobs/job-details/pipeline-api";
import type { ISectionType } from "./create-form-types";
import {
  useAddNewFormMutation,
  useEditFormMutation,
  useGetFormByIdQuery,
  useGetFormListForTableQuery,
  useLazyGetAllUsersQuery,
} from "@services/jobs/job-details/forms/forms-api";
import toast from "react-hot-toast";
import { CreateAFormData } from "./create-form-data";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "@root/slices/jobs/reducer";
import { useLazyGetJobStagesListQuery } from "@services/jobs/job-details/notifications/notifications-api";

export function useCreateForm(props: any): any {
  const { route } = props;
  // imported constants
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const formId = searchParams.get("formId");
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const formMode = useSelector((state: any) => state.jobs.formMode);

  //APIs
  const { data, isLoading } = useGetJobsDropdownQuery({});
  const { data: defaultData } = useGetFormByIdQuery(
    { id: formId },
    { skip: !formId }
  );
  console.log(defaultData?.form?.users);
  const { data: dropDownExistingForms, isSuccess } =
    useGetFormListForTableQuery({
      jobId,
      params: {
        limit: "10",
        offset: "0",
      },
    });
  const [addNewForm] = useAddNewFormMutation();
  const [editCurrentForm] = useEditFormMutation();
  // const getJobStagesQuery = useLazyGetJobStagesQuery();
  const getJobStagesQuery = useLazyGetJobStagesListQuery();
  const getAllUsersQuery = useLazyGetAllUsersQuery();

  const { handleSubmit, reset, watch, setValue }: any = methods;

  //States
  const [modals, setModals] = useState({
    question: false,
    sectionHeader: false,
    statement: false,
  });
  const [modalsData, setModalsData] = useState<ISectionType>({
    question: [],
    sectionHeader: "",
    statement: "",
    sections: [],
  });

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // functions
  const addMoreSectionsHandler = (): void => {
    modalsData.question.length &&
      setModalsData((prev: ISectionType): any => ({
        question: [],
        sectionHeader: "",
        statement: "",
        sections: [
          ...prev.sections,
          {
            name: prev.sectionHeader,
            statement: prev.statement,
            questions: prev.question,
          },
        ],
      }));
  };
  //----
  const onSubmit = (formData: any): void => {
    const body = {
      jobStage: formData.jobStage?._id,
      formName: watch("formName"),
      emailDetail: {
        from: formData.from,
        subject: formData.subject,
        body: formData.body,
        token: null,
      },
      notification: {
        recruiter: formData.recruiter,
        coordinator: formData.coordinator,
        users: formData?.users?._id,
      },
      sections: modalsData.sections,
    };

    formMode === "new-form"
      ? APIHitHandler(addNewForm, { jobId, body }).catch(() => {})
      : APIHitHandler(editCurrentForm, { formId, body }).catch(() => {});
  };

  async function APIHitHandler(apiFunction, body): Promise<any> {
    const successMessage = `Form ${
      formMode === "new-form" ? "Created" : "Edited"
    } Successfully`;

    try {
      await apiFunction(body).unwrap();
      toast.success(successMessage);
      if (!route) {
        return dispatch(jobActions.setState({ editMode: false }));
      }
      router.back();
      dispatch(jobActions.setState({ editMode: false }));
    } catch (error) {
      const message = error?.data?.errors?.[0];
      toast.error(message || "Something went wrong!");
    }
  }

  function sectionDeleteHandler(item): void {
    setModalsData((prev: ISectionType): any => ({
      ...prev,
      sections: prev.sections.filter((i) => i !== item),
    }));
  }

  //------Use-Effect------//
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...defaultData?.form,
      jobStage: defaultData?.form?.jobStage[0],
      users: {
        _id: defaultData?.form?.users?._id,
        userName: `${defaultData?.form?.users?.firstName} ${defaultData?.form?.users?.lastName}`,
        email: defaultData?.form?.users?.email,
      },
    }));
    setModalsData((): any => ({
      question: [],
      sectionHeader: "",
      statement: "",
      sections: defaultData?.sections ?? [],
    }));
  }, [defaultData, reset]);

  // dropdown Values
  const jobStagesDetails = data?.find((i) => i._id === jobId);
  const existingFormData = dropDownExistingForms?.data?.forms?.map(
    (i) => i?.formName
  );

  function selectExistingFormHandler(value: any): void {
    const foundObj = dropDownExistingForms?.data?.forms.find(
      (i) => value === i?.formName
    );
    setValue("formName", value);
    const defaultValuesForm = {
      form: {
        from: foundObj?.emailDetail?.from,
        subject: foundObj?.emailDetail?.subject,
        body: foundObj?.emailDetail?.body,
        availableToken: foundObj?.emailDetail?.token,
        //-----Form-------//
        formName: foundObj?.formName,
        //-----Form2-------//
        jobStage: foundObj?.jobStage,
        recruiter: foundObj?.notification?.recruiter,
        coordinator: foundObj?.notification?.coordinator,
        others: foundObj?.notification?.others,
        users: foundObj?.notification?.users,
      },
      sections: foundObj?.sections,
    };
    reset((formValues: any) => ({
      ...formValues,
      ...defaultValuesForm?.form,
    }));
    setModalsData((): any => ({
      question: [],
      sectionHeader: "",
      statement: "",
      sections: defaultValuesForm.sections,
    }));
  }

  const createAFormData = CreateAFormData({
    getJobStagesQuery,
    jobId,
    getAllUsersQuery,
  });

  return {
    isSuccess,
    isLoading,
    selectExistingFormHandler,
    existingFormData,
    methods,
    handleSubmit,
    onSubmit,
    modalsData,
    sectionDeleteHandler,
    setModals,
    addMoreSectionsHandler,
    jobStagesDetails,
    router,
    jobId,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    modals,
    setModalsData,
    watch,
    formId,
    createAFormData,
    defaultData,
  };
}
