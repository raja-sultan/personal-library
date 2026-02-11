import {
  useGetMyProfileDataApiQuery,
  usePatchMyProfileDataByIdMutation,
} from "@services/my-profile/my-profile-api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MyProfileDefaultValues,
  MyProfileValidationSchema,
} from "@components/my-profile/profile-data/profile.data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useProfileData(): any {
  const [editFormState, setEditFormState] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | undefined>();

  const { data } = useGetMyProfileDataApiQuery({});
  const [patchData, { isError, isSuccess, isLoading }] =
    usePatchMyProfileDataByIdMutation();

  const methods = useForm({
    resolver: yupResolver(MyProfileValidationSchema),
    defaultValues: MyProfileDefaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...data?.data,
      dob: data ? new Date(data?.data?.dob) : new Date(),
    }));
    setProfilePicture(data?.data?.profileImage);
    setCoverImage(data?.data?.coverImage);
  }, [data, reset]);

  async function onSubmit(formData: any): Promise<void> {
    try {
      const res: any = await patchData({
        body: {
          firstName: data?.data?.firstName,
          lastName: data?.data?.lastName,
          contactNumber: formData?.contactNumber,
          dob: formData?.dob,
          gender: formData?.gender,
          workEmail: formData?.email,
          address: {
            addressLine: formData?.addressLine,
            country: formData?.country,
            city: formData?.city,
            state: formData?.state,
            zipCode: formData?.zipCode,
          },
        },
      }).unwrap();
      toast.success(res?.message || "Updated Successfully");
      setEditFormState(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  }
  return {
    methods,
    handleSubmit,
    isSubmitting,
    onSubmit,
    isError,
    isSuccess,
    isLoading,
    profilePicture,
    setProfilePicture,
    coverImage,
    setCoverImage,
    editFormState,
    setEditFormState,
    data,
    reset,
  };
}
