import {
  useGetMyProfileDataApiQuery,
  usePatchMyProfileDataByIdMutation,
} from "@services/my-profile/my-profile-api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ProfileFormData,
  profileDataDefaultValues,
  profileDataSchema,
} from "@components/my-profile/profile-data/profile-form.data";
import {
  useLazyGetCompanyLocationsListQuery,
  useLazyGetDepartmentListQuery,
} from "@services/candidate/add-candidate/add-candidate-api";
import { yupResolver } from "@hookform/resolvers/yup";

export function useProfileData(): any {
  const [editFormState, setEditFormState] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getCompanyLocations = useLazyGetCompanyLocationsListQuery();

  const { data } = useGetMyProfileDataApiQuery({});
  const [patchData, { isError, isSuccess, isLoading }] =
    usePatchMyProfileDataByIdMutation();

  const methods = useForm({
    resolver: yupResolver(profileDataSchema),
    defaultValues: profileDataDefaultValues,
  });
  const {
    handleSubmit,
    reset,

    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...data?.data,
      personalEmail: data?.data?.email,
      location: {
        _id: data?.data?.location?._id,
        address: data?.data?.location?.address,
      },
      dob: data ? new Date(data?.data?.dob) : new Date(),
      startDate: data ? new Date(data?.data?.createdAt) : new Date(),
    }));
    setProfilePicture(data?.data?.profileImage);
    setCoverImage(data?.data?.coverImage);
  }, [data, reset]);

  useEffect(() => {
    if (!isSubmitting && errors) {
      const firstErrorFieldId: any = Object.keys(errors)[0];
      const errorFieldElement = document.getElementById(firstErrorFieldId);
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isSubmitting, errors]);

  const onSubmit = handleSubmit(async (formData: any) => {
    try {
      const res: any = await patchData({
        body: {
          ...formData,
          department: formData?.department?._id,
          location: formData?.location?._id,
          dob: new Date(formData?.dob),
        },
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    } finally {
      setEditFormState(false);
      reset();
    }
  });
  const updateProfileFormData = ProfileFormData({
    getDepartmentListQuery,
    getCompanyLocations,
  });
  return {
    updateProfileFormData,
    methods,
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
    data: data?.data,
    reset,
  };
}
