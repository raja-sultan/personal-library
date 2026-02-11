import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useGetEmployeeDetailsQuery, useUpdateEmployeeDetailsMutation } from "@services/settings/people/employees-api";

interface ReturnTypes {
  watch?: any;
  methods: any;
  setValue?: any;
  handleSubmit?: any;
  getEditProfileData: any
  router: AppRouterInstance;
  onSubmit?: (data: any) => void;
}

export const getDefaultValues = (dto?: any): any => ({
  firstName: dto?.firstName ?? "",
  lastName: dto?.lastName ?? "",
  pronouns: dto?.pronouns?.map((pronoun: string) => ({ id: pronoun, name: pronoun, value: pronoun })) ?? [],
  email: dto?.email ?? "",
  contactNumber: dto?.contactNumber ?? "+1",
  dob: new Date(dto?.dob),
  gender: dto?.gender ?? "",
  ethnicity: dto?.ethnicity ?? "",
  maritalStatus: dto?.maritalStatus ?? "",
  about: dto?.about ?? "",
  addressLine: dto?.address?.addressLine ?? "",
  country: dto?.address?.country ?? "United Kingdom",
  city: dto?.address?.city ?? "",
  state: dto?.address?.state ?? "",
  zipCode: dto?.address?.zipCode ?? "",
  employeeId: dto?.employeeId ?? "",
  workEmail: dto?.workEmail ?? "",
  employmentStartDate: new Date(dto?.employmentStartDate),
  timeZone: dto?.timeZone ?? "",
  employeeTitle: dto?.employeeTitle ?? "",
  department: dto?.department?._id ?? "",
  managerId: dto?.manager?._id ?? "",
  location: dto?.location?._id ?? "",
  employmentStatus: dto?.employmentStatus ?? "",
  jobLevel: dto?.jobLevel ?? "",
  emergencyFirstName: dto?.emergencyContact?.firstName ?? "",
  emergencyLastName: dto?.emergencyContact?.lastName ?? "",
  emergencyEmail: dto?.emergencyContact?.email ?? "",
  emergencyContactNumber: dto?.emergencyContact?.phone ?? "+1",
  relationship: dto?.emergencyContact?.relationship ?? "",
});

// Define the useEmployees custom hook
export function useEditProfile(): ReturnTypes {
  const empId = useSearchParams().get("id");
  const { data: getEditProfileData } = useGetEmployeeDetailsQuery(empId);

  const [updateEmployee] = useUpdateEmployeeDetailsMutation();

  const methods = useForm<any>({
    defaultValues: getDefaultValues(),
  });

  const router = useRouter();
  const { handleSubmit, reset, watch, setValue } = methods;

  const onSubmit = async (formData: any): Promise<void> => {
    const {
      emergencyFirstName,
      emergencyLastName,
      emergencyEmail,
      emergencyContactNumber,
      relationship,
      addressLine,
      country,
      zipCode,
      state,
      city,
      ...payload
    } = formData;
    const nestedPayload = {
      emergencyContact: {
        firstName: emergencyFirstName,
        lastName: emergencyLastName,
        email: emergencyEmail,
        phone: emergencyContactNumber,
        relationship,
      },
      address: {
        addressLine,
        country,
        zipCode,
        state,
        city,
      },
    };

    console.log(payload)
    try {
      await updateEmployee({ id: empId, payload: { ...payload, ...nestedPayload } }).unwrap();
      toast.success("Successfully updated");
      router.push("/settings/employees");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    reset(getDefaultValues(getEditProfileData?.data));
  }, [reset, getEditProfileData]);

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    watch,
    setValue,
    getEditProfileData
  };
}
