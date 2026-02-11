import {
  useCreateTemplateMutation,
  useTemplateViewQuery,
  useUpdateTemplateMutation,
} from "@services/settings/review/templates-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface ApiReturnType {
  description: string;
  _id: string;
}
interface UseCreateTemplateReturnType {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleDelete: (idToDelete: any) => void;
  isDrawerOpen: boolean;
  selectedValues: ApiReturnType[];
  setSelectedValues: Dispatch<SetStateAction<ApiReturnType[]>>;
  onSubmit: (formData: ApiReturnType) => Promise<void>;
  handleSubmit: any;
  methods: any;
  templateId?:string
}

const FormSchema = Yup.object().shape({
    templateName: Yup.string().trim().required("Template Name is required").min(3).max(64),
});

export function useCreateTemplate(templateId): UseCreateTemplateReturnType {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<ApiReturnType[]>([]);

  // api call *********************
  const [createTemplate] = useCreateTemplateMutation();
  const { data: viewData } = useTemplateViewQuery({ id: templateId },{skip:!templateId});
  const [updateTemplate] = useUpdateTemplateMutation({});

  const handleDelete = (idToDelete): void => {
    const updatedValues = selectedValues?.filter(
      (item) => item._id !== idToDelete
    );
    setSelectedValues(updatedValues);
  };

  // react hook form ******************
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      templateName: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (formData: any): Promise<void> => {
    const selectedQuestions = selectedValues?.map((item: any) => item?._id);
    const addQuestionData = {
      ...formData,
      questions: selectedQuestions,
    };
    try {
      if (templateId) {
        await updateTemplate({
          data: addQuestionData,
          id: templateId,
        }).unwrap();
        router.push("/settings/reviews/templates");
        toast.success("Template is updated successfully");
        reset();
      } else {
        await createTemplate(addQuestionData).unwrap();
        router.push("/settings/reviews/templates");
        toast.success("Template is created successfully");
        reset();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // drawer function ***************
  const handleDrawerOpen = (): void => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // @ patch api here
  useEffect(() => {
    if (viewData?.data) {
      const editFormData = {
        templateName: viewData?.data?.templateName,
      };
      setSelectedValues(viewData?.data?.questions || []);
      reset(editFormData);
    }
  }, [viewData?.data]);

  return {
    handleDrawerOpen,
    handleDrawerClose,
    isDrawerOpen,
    selectedValues,
    setSelectedValues,
    onSubmit,
    handleSubmit,
    methods,
    handleDelete,
  };
}
