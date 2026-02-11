import { useForm, type UseFormReturn, type UseFormHandleSubmit, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCreateSkillsMutation } from "@services/career/plans/plans-api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addSkill } from "@root/slices";

interface FormValues {
  name: string;
  description?: string;
}
interface ReturnType {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  methods: UseFormReturn<FormValues>;
}

export function useSkillModal({ onClose }): ReturnType {
  const [createSkills] = useCreateSkillsMutation();
  const dispatch = useDispatch();
  // const getId = useSearchParams().get("id");
  // const getTab = useSearchParams().get("tab");
  // const categoryId = useSearchParams().get("categoryId");
  // const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("Skill name is required"),
        description: Yup.string().optional(),
      })
    ),
    defaultValues: { name: "", description: "" },
  });

  const { handleSubmit, reset } = methods;

  async function onSubmit(values: FormValues): Promise<void> {
    try {
      const response = await createSkills(values).unwrap();
      const responseVal = response?.data;
      dispatch(addSkill({
        _id: responseVal?._id,
        name: responseVal?.name,
        description: responseVal?.description,
      }));
      toast.success("Add Skill Successful!");
      onClose();
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while adding category. Please try again later.");
    }
  }

  // function handleGetSkill(getValue: string): void {
  //   router.push(`?tab=${getTab}&id=${getId}&categoryId=${categoryId}&skillId=${getValue}`);
  // }

  return {
    methods,
    onSubmit,
    handleSubmit,
  };
}
