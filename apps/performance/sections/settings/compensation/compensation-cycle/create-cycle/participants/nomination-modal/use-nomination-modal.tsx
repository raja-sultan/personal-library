import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { formSchema } from "./nomination-modal.schema";
import { defaultValues } from "./nomination-modal.data";
import { useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { useEffect } from "react";
import { useAddNominatedUserMutation, useUpdateNominatedUserMutation } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { toast } from "react-hot-toast";

interface FormValues {
  currentDepartment: string;
  promotionDepartment: string;
  currentTitle: string;
  promotionTitle: string;
  currentJobLevel: string;
  promotionJobLevel: string;
  currentLocation: string;
  promotionLocation: string;
}

interface promotionNominationProps {
  onSubmit: SubmitHandler<FormValues>;
  methods?: UseFormReturn<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  theme: Theme;
  isLoading: boolean
}

export function usePromotionNominationModal({ promotedUser, nominationUserDetail, viewDetailId, onClose }): promotionNominationProps {
  const theme = useTheme();
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema) as any,
    defaultValues,
  });

  const [addNominationUser, { isLoading: isAddLoading }] = useAddNominatedUserMutation();
  const [updateNominatedUserMutation, { isLoading: isUpdateLoading }] = useUpdateNominatedUserMutation();

  const { handleSubmit, reset } = methods;

  const isLoading = isAddLoading || isUpdateLoading;

  useEffect(() => {
    reset({
      currentDepartment: nominationUserDetail?.department ?? '',
      currentJobLevel: nominationUserDetail?.jobLevel ?? '',
      currentLocation: nominationUserDetail?.location ?? '',
      currentTitle: nominationUserDetail?.currentTitle ?? '',
      promotionDepartment: promotedUser?.isPromoted ? promotedUser?.department : '',
      promotionJobLevel: promotedUser?.isPromoted ? promotedUser?.jobLevel : '',
      promotionLocation: promotedUser?.isPromoted ? promotedUser?.location : '',
      promotionTitle: promotedUser?.isPromoted ? promotedUser?.title : ''
    })
  }, [reset, nominationUserDetail, promotedUser]);

  const onSubmit = async (values: FormValues): Promise<void> => {
    const obj = {
      title: values.promotionTitle,
      jobLevel: values.promotionJobLevel,
      department: values.promotionDepartment,
      location: values.promotionLocation
    }
    if (promotedUser?.isPromoted) {
      try {
        await updateNominatedUserMutation({
          id: promotedUser?._id,
          body: obj
        }).unwrap().then((data) => {
          if (data?.data) {
            toast.success('Nomination updated successfully');
            onClose();

          }
        })
      } catch (error) {
        toast.error(error?.data?.message || 'Error while updating nomination');
      }
    }
    else {
      try {
        await addNominationUser({
          compensationCycle: viewDetailId,
          nominatedUser: nominationUserDetail?._id,
          ...obj
        }).unwrap().then((data) => {
          if (data?.data) {
            toast.success('Nomination added successfully');
            onClose();
          }
        })
      } catch (error) {
        toast.error(error?.data?.message || 'Error while adding nomination');
      }
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    theme,
    isLoading
  };
}
