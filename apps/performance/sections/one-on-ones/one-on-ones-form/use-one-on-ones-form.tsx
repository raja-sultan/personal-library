import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  defaultValues,
  type OneOnOneFormFields,
  oneOnOneFormSchema,
} from "@sections/one-on-ones/one-on-ones-form/one-on-ones-form.data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEmployeesQuery } from "@services/login-as";
import { useLazyGetTemplateDetailsByIdQuery } from "@services/settings/one-on-ones/templetes-api";
import { useCreateOneOnOneMutation } from "@services/one-on-ones/one-on-ones-api";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function useOneOnOnesForm(): any {
  const router = useRouter();
  const redirectTo = useSearchParams().get("redirectTo");

  const methods = useForm<OneOnOneFormFields>({
    resolver: yupResolver(oneOnOneFormSchema) as any,
    defaultValues,
  });

  const [openTemplatesDrawer, setOpenTemplatesDrawer] =
    useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const { data: employees } = useGetEmployeesQuery({ type: "employees" });

  const [templateByIdQuery, { data: oneOnOneDetails, isLoading, isFetching }] =
    useLazyGetTemplateDetailsByIdQuery();

  const [createOneOnOneMutation, { isLoading: isCreateLoading }] =
    useCreateOneOnOneMutation();

  const employeesList = employees?.data?.map(({ text, value }) => ({
    value,
    label: text,
  }));

  useEffect(() => {
    if (detailModal) templateByIdQuery({ id: detailModal });
  }, [detailModal]);

  const { handleSubmit, watch } = methods;

  const onSubmit = async (formData: OneOnOneFormFields): Promise<void> => {
    formData.templateId = selectedTemplate;
    formData.startDate = dayjs(formData.startDate).format("MM/DD/YYYY");
    formData.endDate = dayjs(formData.endDate).format("MM/DD/YYYY");
    formData.time = dayjs(formData.time).format("HH:mm");

    let obj = {
      title: formData.title,
      attendeeId: formData.attendeeId,
      time: formData.time,
      startDate: formData.startDate,
      endDate: formData.endDate,
      frequency: formData.frequency,
      locationType: formData.locationType,
      templateId: formData.templateId,
      path: formData.path,
    };

    const repeatInterval = formData.repeatInterval;
    const weekDays = formData.weekDays;
    const day = formData.day;
    const week = formData.week;
    const weekDay = formData.weekDay;
    const month = months[dayjs(formData.month).format("MMMM")];

    if (
      formData.frequency === "Every weekday(Mon-Fri)" ||
      formData.frequency === "Weekly"
    ) {
      obj = {
        ...obj,
        ...{ repeatInterval, weekDays },
      };
    }
    if (formData.frequency === "Monthly") {
      obj = {
        ...obj,
        ...{ repeatInterval, weekDays, weekDay, day, week },
      };
    }
    if (formData.frequency === "Yearly") {
      obj = {
        ...obj,
        ...{ repeatInterval, weekDay, day, week, month },
      };
    }

    try {
      await createOneOnOneMutation({ body: obj })
        .unwrap()
        .then((res) => {
          if (res) {
            toast.success("1-on-1 created successfully");
            redirectTo ? router.push("/my-team/view") : router.back();
          }
        });
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Error while creating 1-on-1. please try again later"
      );
    }
  };

  const toggleDrawerNotifications = (): void => {
    setOpenTemplatesDrawer(!openTemplatesDrawer);
  };

  const handleDetailModal = (id: string | null): void => {
    setDetailModal(id);
  };

  const handleSelectTemplate = (id: string): void => {
    setSelectedTemplate(id);
  };

  return {
    onSubmit,
    selectedTemplate,
    handleSubmit,
    router,
    methods,
    watch,
    openTemplatesDrawer,
    toggleDrawerNotifications,
    detailModal,
    handleDetailModal,
    redirectTo,
    employeesList,
    oneOnOneDetails: oneOnOneDetails?.data?.[0],
    isLoading,
    isFetching,
    handleSelectTemplate,
    isCreateLoading,
  };
}
