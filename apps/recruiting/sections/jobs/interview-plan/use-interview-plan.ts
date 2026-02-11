import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  defaultValuesOfAddInterview,
  defaultValuesOfAddStage,
  validationSchemaForInterviewPlan,
} from "./schema";
import { useThemeColor } from "common";
import { useForm } from "react-hook-form";
import {
  useAddStageMutation,
  useDeleteStageMutation,
  useGetJobDetailsQuery,
  useGetScoreCardAttributesQuery,
  useUpdateStageMutation,
  usePostInterviewPlanMutation,
  useUpdateInterviewPlanMutation,
  useDeleteInterviewMutation,
} from "@services/jobs/create-jobs/interview-plan/interview-plan-api";
import { useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export function useInterviewPlan(): any {
  const [addStage] = useAddStageMutation();
  const [deleteStageById] = useDeleteStageMutation();
  const [updateStageById] = useUpdateStageMutation();
  const [postInterview] = usePostInterviewPlanMutation();
  const [putInterview] = useUpdateInterviewPlanMutation();
  const [deleteInterviewById] = useDeleteInterviewMutation();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading, isSuccess, isError }: any = useGetJobDetailsQuery({
    jobId,
    // candidateID,
  });
  const stagesData = data?.data[0]?.interviewPlan;

  const {
    data: attributeData,
    isLoading: loadingAttr,
    isSuccess: successAttr,
    isError: errorAttr,
  }: any = useGetScoreCardAttributesQuery(jobId);

  const scoreCardAttributes = attributeData?.data?.scorecard;

  const [openAddStageModal, setOpenAddStageModal] = useState<boolean>(false);
  const [alertSetting, setAlertSetting] = useState<boolean>(false);
  const [openInterviewModal, setOpenInterviewModal] = useState<boolean>(false);
  const [interviewDetails, setInterviewDetails] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [addInterviewIndex, setAddInterviewIndex] = useState<any>();
  const [updatedStagesData, setUpdatedStagesData] = useState(stagesData);
  const [stageId, setStageId] = useState("");
  const [isEditOrSave, setIsEditOrSave] = useState("Save");

  const handleDelete = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const theme = useTheme();

  const { getContrastColor } = useThemeColor();

  const interviewMethods = useForm({
    defaultValues: defaultValuesOfAddInterview,
    resolver: yupResolver(validationSchemaForInterviewPlan),
  });

  const addStageMethods = useForm({
    defaultValues: defaultValuesOfAddStage,
  });
  const { setValue, reset } = interviewMethods;

  const onSubmitNewStage = async (formData: any) => {
    const filteredData = Object.entries(formData)
      .map(([key, value]) =>
        value && key !== "yourFieldName" ? `${key}` : null
      )
      .filter((key) => key);

    const stages = formData.yourFieldName
      ? [...filteredData, formData.yourFieldName]
      : filteredData;

    try {
      const { message }: any = await addStage({
        params: {
          jobid: jobId,
        },
        body: {
          stages,
        },
      }).unwrap();
      toast.success(message || "Stage added successfully");
      setOpenAddStageModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
  };

  const updateStage = async (_id, stageName) => {
    try {
      const { message }: any = await updateStageById({
        params: {
          stageId: _id,
          jobId,
        },
        body: {
          stageName,
        },
      }).unwrap();
      toast.success(message || "Stage updated successfully");
      setOpenAddStageModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
  };

  const deleteStage = async (_id) => {
    try {
      const { message }: any = await deleteStageById({
        stageId: _id,
        jobId,
      });
      toast.success(message || "Stage deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
  };

  const deleteInterview = async (ele) => {
    try {
      const { message }: any = await deleteInterviewById({
        interviewId: ele?._id,
        jobId,
      });
      toast.success(message || "Interview deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "error occur");
    }
  };

  function setFocusAttributesFunction(
    stageName: string,
    arr: string[],
    attributesData: any[]
  ): {
    stageName: string;
    attributes: { name: string; isSelected: boolean }[];
  } {
    const attributes = attributesData?.find(
      (attr) => attr?.category === stageName
    );

    if (!attributes) {
      return { stageName, attributes: [] };
    }
    const selectedAttributes = attributes?.attributes?.filter((attr: string) =>
      arr?.includes(attr)
    );

    return {
      stageName: attributes?.category,
      attributes: selectedAttributes?.map((val) => ({
        name: val,
        isSelected: true,
      })),
    };
  }

  const onSubmitAddInterview = async (formData: any) => {
    const { interviewName, description, interviewQuestion, interviewPrep } =
      formData;
    const objNames = scoreCardAttributes?.map((item) => item?.category);

    const applicationReview = {
      interviewName,
      description,
    };

    const focusAttributes = objNames?.map((item) =>
      setFocusAttributesFunction(
        item,
        formData?.focusAttributes,
        scoreCardAttributes
      )
    );

    const interviewQuestions = interviewQuestion?.map((question) => ({
      ...question,
      options: question?.options?.map((option) => option?.name),
    }));
    if (isEditOrSave === "Save") {
      try {
        const { message }: any = await postInterview({
          stageId,
          jobId,
          body: {
            applicationReview,
            focusAttributes,
            interviewQuestions,
            interviewPrep,
          },
        }).unwrap();
        toast.success(message || "Stage updated successfully");

        setOpenInterviewModal(false);
        reset();
      } catch (error) {
        toast.error(error?.data?.message || "error occur");
      }
    } else if (isEditOrSave === "Edit") {
      try {
        const { message }: any = await putInterview({
          interviewId: interviewDetails?._id,
          body: {
            applicationReview,
            focusAttributes,
            interviewQuestions,
            interviewPrep,
          },
        }).unwrap();
        toast.success(message || "Stage updated successfully");
        setOpenInterviewModal(false);
      } catch (error) {
        toast.error(error?.data?.message || "error occur");
      }
    }
  };

  function handleAddNewStage(): void {
    setOpenAddStageModal(true);
  }

  useEffect(() => {
    const fieldsToSet = {
      interviewName: interviewDetails?.applicationReview?.interviewName,
      description: interviewDetails?.applicationReview?.description,
      interviewPrep: interviewDetails?.interviewPrep,

      focusAttributes: interviewDetails?.focusAttributes?.flatMap(
        (scoreCardAttribute) =>
          scoreCardAttribute?.attributes?.map((attribute) => attribute?.name)
      ),
      interviewQuestion: interviewDetails?.interviewQuestions?.map(
        (question) => ({
          ...question,
          options: question?.options?.map((option) => ({ name: option })),
        })
      ),
    };

    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [setValue, interviewDetails]);

  return {
    openAddStageModal,
    setOpenAddStageModal,
    alertSetting,
    setAlertSetting,
    openInterviewModal,
    setOpenInterviewModal,
    interviewDetails,
    setInterviewDetails,
    openDeleteModal,
    setOpenDeleteModal,
    addInterviewIndex,
    setAddInterviewIndex,
    updatedStagesData,
    setUpdatedStagesData,
    isLoading,
    isSuccess,
    isError,
    handleDelete,
    theme,
    getContrastColor,
    addStageMethods,
    onSubmitNewStage,
    onSubmitAddInterview,
    handleAddNewStage,
    interviewMethods,
    stagesData,
    updateStage,
    deleteStage,
    setStageId,
    isEditOrSave,
    setIsEditOrSave,
    deleteInterview,
    scoreCardAttributes,
    loadingAttr,
    successAttr,
    errorAttr,
  };
}
