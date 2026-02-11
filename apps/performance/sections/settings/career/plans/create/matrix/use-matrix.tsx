import { addSkill } from "@root/slices";
import { useCreateSkillsMutation, useUpdateCareerPlanMutation } from "@services/career/plans/plans-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addLevelExpectation } from "../../../../../../slices/matrix-level/reducer";

interface ReturnType {
  addSkillModal: boolean;
  handleSkillModal: () => void;
  addLevelModal: boolean;
  handleLevelModal: (val: string) => void;
  handleMatrixAction: (val: string) => void;
  handleLevelAction: (val: string) => void;
  editLevelId: string;
  getSkills: any;
  getLevel: any;
  levelActionType?: string;
  handleMatrixSubmit?: () => void;
  onSkillModalSubmit?: (values: any) => Promise<void>;
  handleLevelExpectation: (value: { text: string; skillId: string; levelId: string; _id?: string; }) => void;
}

export function useMatrix(): ReturnType {
  const [updateMatrix] = useUpdateCareerPlanMutation();
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [addLevelModal, setAddLevelModal] = useState(false);
  const [editLevelId, setEditLevelId] = useState("");
  const [levelActionType, setLevelActionType] = useState("add");
  const [createSkills] = useCreateSkillsMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  // const [noExpectationField, setNoExpectationField] = useState();
  const planId = useSearchParams().get("id");
  const getLevel = useSelector((state: any) => state?.matrixLevel?.levels);
  const getSkills = useSelector((state: any) => state?.matrixLevel?.skills);

  function handleSkillModal(): void {
    setAddSkillModal(!addSkillModal);
    setLevelActionType("add");
  }

  function handleLevelModal(): void {
    setAddLevelModal(!addLevelModal);
    setEditLevelId("");
  }

  function handleLevelAction(val: string): void {
    switch (val) {
      case "Edit":
        setAddLevelModal(!addLevelModal);
        setLevelActionType("edit");
        break;
      default:
        break;
    }
  }

  function handleMatrixAction(val: string): void {
    switch (val) {
      case "skill":
        handleSkillModal();
        break;
      case "level":
        handleLevelModal();
        break;
      default:
        break;
    }
  }

  function handleLevelExpectation({ text, skillId, levelId }): void {
    try {
      dispatch(
        addLevelExpectation({
          text,
          skillId,
          levelId,
        })
      );
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding category. Please try again later.");
    }
  }

  async function handleMatrixSubmit(): Promise<void> {
    const skillsIDs = getSkills.map((item) => item?._id);
    const skillsMatix = skillsIDs.filter((item) => !!item);
    try {
      await updateMatrix({
        id: planId,
        skills: skillsMatix,
        levels: getLevel
      }).unwrap();
      router.push(`?tab=2&id=${planId}&status=draft`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  async function onSkillModalSubmit(values: any): Promise<void> {
    try {
      const response = await createSkills(values).unwrap();
      const responseVal = response?.data;
      dispatch(
        addSkill({
          _id: responseVal?._id,
          name: responseVal?.name,
          description: responseVal?.description,
        })
      );
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding category. Please try again later.");
    }
  }

  return {
    addSkillModal,
    handleSkillModal,
    addLevelModal,
    handleLevelModal,
    handleMatrixAction,
    editLevelId,
    getSkills,
    getLevel,
    handleLevelAction,
    levelActionType,
    handleMatrixSubmit,
    onSkillModalSubmit,
    handleLevelExpectation,
  };
}
