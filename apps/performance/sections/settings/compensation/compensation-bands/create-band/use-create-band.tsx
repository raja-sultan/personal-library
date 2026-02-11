import { yupResolver } from "@hookform/resolvers/yup";
import { useAddNewBandMutation, useLazyCompensationBandDetailsQuery, useUpdateBandMutation } from "@services/compensation/compensation-bands/compensation-bands-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface ReturnType {
  methods: any;
  onBack: () => void;
  onSubmit: any;
  handleSubmit: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Band Name is required"),
  departmentId: Yup.string().required("Department is required"),
  jobTitle: Yup.string().required("Job Title is required"),
  jobLevel: Yup.string().required("Job Level is required"),
  locationId: Yup.string().required("Location is required"),
  currency: Yup.string().required("Currency is required"),
  minBasePay: Yup.number()
    .required("Min Base Pay is required")
    .positive("Must be a positive value"),
  midBasePay: Yup.number()
    .required("Mid Base Pay is required")
    .positive("Must be a positive value"),
  maxBasePay: Yup.number()
    .required("Max Base Pay is required")
    .positive("Must be a positive value"),
  minVariablePay: Yup.number()
    .positive("Must be a positive value"),
  midVariablePay: Yup.number()
    .positive("Must be a positive value"),
  maxVariablePay: Yup.number()
    .positive("Must be a positive value"),
});

export default function useCreateBand(): ReturnType {

  const bandId = useSearchParams().get('id');

  const [addNewBand] = useAddNewBandMutation();
  const [updateBand] = useUpdateBandMutation();

  const [trigger, { data: bandDetails }] = useLazyCompensationBandDetailsQuery();

  const router = useRouter();

  const defaultValues = {
    name: "",
    departmentId: "",
    jobTitle: "",
    jobLevel: "",
    locationId: "",
    currency: "",
    minBasePay: undefined,
    midBasePay: undefined,
    maxBasePay: undefined,
    minVariablePay: undefined,
    midVariablePay: undefined,
    maxVariablePay: undefined,
  }

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const { handleSubmit, setValue } = methods;

  function onBack(): void {
    router.push("/settings/compensation/compensation-bands");
  }

  const onSubmit = async (values: any): Promise<void> => {
    if (bandId) {
      try {
        await updateBand({ id: bandId, values }).unwrap();
        toast.success("Band updated successfully.")
        router.push('/settings/compensation/compensation-bands')
      } catch (error) {
        toast.error(error?.data?.message)
      }
    } else {
      try {
        await addNewBand(values).unwrap();
        toast.success("Band created successfully.")
        router.push('/settings/compensation/compensation-bands')
      } catch (error) {
        toast.error(error?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (bandId) trigger({ id: bandId })

    const data = bandDetails?.data;

    const fieldsToSet = {
      name: data?.name,
      departmentId: data?.departmentId,
      jobTitle: data?.jobTitle,
      jobLevel: data?.jobLevel,
      locationId: data?.locationId,
      currency: data?.currency,
      minBasePay: data?.minBasePay,
      midBasePay: data?.midBasePay,
      maxBasePay: data?.maxBasePay,
      minVariablePay: data?.minVariablePay,
      midVariablePay: data?.midVariablePay,
      maxVariablePay: data?.maxVariablePay,
    };

    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [bandId, trigger, setValue, bandDetails])

  return {
    methods,
    onBack,
    onSubmit,
    handleSubmit,
  };
}
