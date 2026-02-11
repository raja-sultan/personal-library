import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeleteCareerVisionMutation,
  usePostCareerVisionMutation,
  usePutCareerVisionMutation,
} from "@services/settings/career/permissions/permission-api";
import { useState } from "react";
import {
  useForm,
  type UseFormHandleSubmit,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface FormValues {
  name: string;
  description: string;
  enabled?: boolean;
}

interface ReturnType {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  methods: UseFormReturn<FormValues>;
  openDeleteModal: boolean;
  handleOpenDeleteModal: () => void;
  handleDeleteCareerVision: () => void;
}

export function useAddCareerModal({ data, onClose }): ReturnType {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        enabled: Yup.boolean().optional(),
      })
    ),
    defaultValues: {
      name: data?.name ?? "",
      description: data?.description ?? "",
      enabled: data?.enabled ?? false,
    },
  });
  const { handleSubmit } = methods;

  const [postCareerVision] = usePostCareerVisionMutation({});
  const [putCareerVision] = usePutCareerVisionMutation({});
  const [deleteCareerVision] = useDeleteCareerVisionMutation({});

  const handleOpenDeleteModal = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDeleteCareerVision = async (): Promise<void> => {
    try {
      await deleteCareerVision({ id: data?._id })
        .unwrap()
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } catch (err) {
      toast.error(err);
    }
    setOpenDeleteModal(!openDeleteModal);
    onClose();
  };

  const onSubmit = async (values: FormValues): Promise<void> => {
    if (data?._id) {
      try {
        await putCareerVision({ body: values, id: data?._id })
          .unwrap()
          .then((response) => {
            toast.success(response.message);
          })
          .catch((error) => {
            toast.error(error.data.message);
          });
      } catch (err) {
        toast.error(err);
      }
    } else {
      try {
        await postCareerVision({ body: values })
          .unwrap()
          .then((response) => {
            toast.success(response.message);
          })
          .catch((error) => {
            toast.error(error.data.message);
          });
      } catch (err) {
        toast.error(err);
      }
    }
    onClose();
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    handleOpenDeleteModal,
    openDeleteModal,
    handleDeleteCareerVision,
  };
}
