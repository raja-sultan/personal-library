import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { formSchema } from "./company-profile.schema";
import { defaultValues } from "./company-profile.data";
import type { companyDefaultValues } from "./company-profile.types";
import { useGetSettingsCompanyDetailsQuery, useUpdateCompanyDetailsMutation } from "@services/settings/company/company-details";
import toast from "react-hot-toast";
import { awsBaseUrl } from "@root/config";

export function useCompany(): any {

    const { data: companyData } = useGetSettingsCompanyDetailsQuery({});

    const [updateCompanyDetails, { isLoading }] = useUpdateCompanyDetailsMutation();

    const methods = useForm<any>({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const router = useRouter();

    const { handleSubmit, setValue } = methods;

    const onSubmit = async (formValues: companyDefaultValues): Promise<void> => {
        formValues;
        const formData: any = new FormData();
        Object.keys(formValues).forEach((key) => {
            if (key === "image") {
                formData.append('companyLogo', formValues.image);
            } else {
                formData.append(key, formValues[key]);
            }
        });

        try {
            await updateCompanyDetails(formData).unwrap();
            toast.success("Data updated successfully")
        } catch (error) {
            toast.error(error?.data?.message)
        }
    };

    useEffect(() => {
        const data = companyData?.data;
        const fieldsToSet = {
            image: `${awsBaseUrl}${data?.logo}`,
            companyName: data?.title,
            companySize: data?.companySize,
            contactNumber: data?.contactNumber,
            website: data?.website,
            missionStatement: data?.missionStatement,
            emailDomain: data?.emailDomain,
            timeZone: data?.timeZone,
            currency: data?.currency,
            limitInvite: data?.limitInvite,
        };

        for (const key in fieldsToSet) {
            setValue(key, fieldsToSet[key]);
        }
    }, [setValue, companyData]);
    return {
        isLoading,
        router,
        handleSubmit,
        onSubmit,
        methods
    }
}