import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  type UseFormHandleSubmit,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import * as Yup from "yup";
import { usePostCareerNotificationMutation } from "@services/settings/career/permissions/permission-api";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useGetSettingsCompanyDetailsQuery } from "@services/settings/company/company-details";

interface FormValues {
  subject: string;
  body: string;
  reminder?: boolean;
  sendDate: any;
  timePicker: Date | null;
  timezone: string;
}

interface ReturnType {
  notificationModal: boolean;
  handleNotificationModal: () => void;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  methods: UseFormReturn<FormValues>;
}

export function useAddNotificationModal({ onClose }): ReturnType {
  const [notificationModal, setNotificationModal] = useState(false);

  const { data: companyData  , refetch} = useGetSettingsCompanyDetailsQuery({});

  function handleNotificationModal(): void {
    setNotificationModal(!notificationModal);
  }

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        subject: Yup.string().required("Skill name is required"),
        body: Yup.string().required("Body is required"),
        reminder: Yup.boolean().optional(),
        sendDate: Yup.string().required("Send date is required"),
        timePicker: Yup.date()
          .nullable()
          .test(
            "check null",
            "This field is required",
            (value) => value !== null
          ),
        timezone: Yup.string().required("Timezone is required"),
      })
    ),
    defaultValues: {
      subject: companyData?.data?.career?.mailSubject ?? "",
      body: companyData?.data?.career?.mailBody ?? "",
      reminder: companyData?.data?.career?.remindManagers ?? false,
      sendDate: companyData?.data?.career?.mailDate
        ? new Date(companyData.data.career.mailDate)
        : new Date(),
      timePicker: companyData?.data?.career?.mailTime
        ? new Date(companyData.data.career.mailTime)
        : null,
      timezone: companyData?.data?.career?.mailTZ ?? "",
    },
  });

  const [careerNotification] = usePostCareerNotificationMutation({});

  const { handleSubmit } = methods;
  const onSubmit = async (values: FormValues): Promise<void> => {
    const payload = {
      mailSubject: values.body,
      mailBody: values.body,
      mailDate: dayjs(values.sendDate).format("YYYY-MM-DD"),
      mailTime: values.timePicker,
      mailTZ: values.timezone,
      remindManagers: values.reminder,
    };
    try {
      await careerNotification({ body: payload }).unwrap();
      toast.success("Plan KickOff Notifications updated successfully");
    } catch (err) {
      toast.error(err) || "Something went wrong";
    }

    onClose();
    refetch()
  };

  return {
    handleNotificationModal,
    notificationModal,
    handleSubmit,
    onSubmit,
    methods,
  };
}
