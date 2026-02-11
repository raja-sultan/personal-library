import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateSkillsMutation, useGetCareerPlanQuery, useLazyGetSkillsByIdQuery, useUpdateCreateSkillsMutation } from "@services/settings/career/skills/skills-api";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ReturnType {
  onSubmit?: any;
  handleSubmit?: any;
  handleInputChange?: any;
  methods: any;
  getCareerPlanData: any
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
}

const defaultValues = {
  name: "",
  description: "",
  plans: [],
}
const SkillSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().notRequired().max(200, "Maximum 200 characters"),
  plans: yup.array().notRequired(),

});

export function useNewSkillModal(isEdit, getCareerSkillsId, onClose): ReturnType {
  // api call *********************
  const [createSkills, { isLoading: isCreateLoading }] = useCreateSkillsMutation({});
  const [updateSkills, { isLoading: isUpdateLoading }] = useUpdateCreateSkillsMutation({});
  const [getSkillsById] = useLazyGetSkillsByIdQuery();
  const { data: getCareerPlanData } = useGetCareerPlanQuery({
    type: "career_plans",
  });
  const methods = useForm({
    resolver: yupResolver(SkillSchema),
    defaultValues
  });


  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (getCareerSkillsId) {
      getSkillsById({ id: getCareerSkillsId }).unwrap().then((data) => {
        const skillData = data?.data
        reset({
          name: skillData[0]?.name,
          description: skillData[0]?.description,
          plans: skillData[0]?.plans?.map(
            (plansData: {
              _id: string;
              title: string;
            }) => ({
              id: plansData?._id,
              name: plansData?.title,
            })
          )
          
        })
      })
    }
  }, [getCareerSkillsId, getSkillsById, reset])

  const onSubmit = async (formData: any): Promise<void> => {
    const planIds: string[] = (formData?.planIds || []).map((plansArray: { id: string, name: string }) => plansArray?.id);
    const skillsDataObj = {
      // planIds: planIds?.map((plansArray: { id: string}) => ({
      //   _id: plansArray?.id,
      //   // title: plansArray?.name
      // })),
      // ...rest,
      name:formData.name,
      description: formData.description,
      planIds
    };
    
    
    try {
      isEdit ? await updateSkills({
        id: getCareerSkillsId, payload: {
          name: formData?.name,
          description: formData?.description,
          planIds
        }
      }).unwrap() : await createSkills(skillsDataObj).unwrap()
      toast.success(`Skill is ${isEdit ? 'updated' : 'created'}  successfully`);
      methods.reset();
      onClose();
    } catch (error) {
      toast.error(error?.data?.message ?? `Error while ${isEdit ? 'updating' : 'creating'}  Skill.`);
    }
  }
  return {
    methods,
    handleSubmit,
    onSubmit,
    getCareerPlanData,
    isCreateLoading,
    isUpdateLoading,
  };
}
