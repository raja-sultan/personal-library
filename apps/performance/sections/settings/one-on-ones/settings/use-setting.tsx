import {
  oneOnOneSettingEmailSchema,
  defaultValues,
  settingsData,
  modalData,
} from "./setting.data";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useOneOnOnesSettingMutation } from "@services/settings/one-on-ones/setting-api";
import type { UseSetting } from "./setting.type";
import { useGetSettingsCompanyDetailsQuery } from "@services/settings/company/company-details";

export function useSetting(): UseSetting {

  const { data: companyData } = useGetSettingsCompanyDetailsQuery({});
  const initialData = companyData?.data?.oneOnOne;

  const [expandedAccordion, setExpandedAccordion] = useState<string>('');
  const [confirmMail, setConfirmMail] = useState(false);
  const [meetingMail, setMeetingMail] = useState(false);
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [modalFilledData, setModalFilledData] = useState({
    name: "",
    repeatReminder: false,
    subject: "",
    body: "",
  });
  const [modalType, setModalType] = useState('confirm');

  const handleAccordionChange = (curr: string): void => {
    setExpandedAccordion(curr);
  };

  const methods = useForm({
    resolver: yupResolver(oneOnOneSettingEmailSchema),
    defaultValues,
  });

  const { handleSubmit, setValue,reset } = methods;

  // const repeatReminder = watch("reminderFrequency");
  const [updateOneOnOnesSetting] = useOneOnOnesSettingMutation();

  const onSubmit = async (formData: any): Promise<void> => {
    let data = {}
    if (modalType === 'confirm') {
      data = {
        oneOnOne: {
          confirmationMail: true,
          confirmationMailSubject: formData.subjectField,
          confirmationMailBody: formData.bodyField,
        },
      }
    }
    else {
      data = {
        oneOnOne: {
          reminderMail: true,
          limitOneOnOne: formData?.limitOneOnOne,
          reminderMailSchedule: formData?.reminderMailSchedule,
          reminderMailSubject: formData.subjectField,
          reminderMailBody: formData.bodyField,
        },
      }
    }
    try {
      await updateOneOnOnesSetting(data).unwrap().then((res) => {
        if (res) {
          toast.success('Successfully updated');
          setOpenCustomModal(false);
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || 'Error while updating. Please try again later!')
    }
    reset();
  };

  const handleUpdateMail = async (type: string): Promise<void> => {
    let data = {}
    if (type === 'confirm') {
      data = {
        oneOnOne: {
          confirmationMail: false,
        },
      }
    }
    else {
      data = {
        oneOnOne: {
          reminderMail: false
        },
      }
    }
    try {
      await updateOneOnOnesSetting(data).unwrap().then((res) => {
        if (res) {
          toast.success('Successfully updated');
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || 'Error while updating. Please try again later!')
    }
  }

  const handleToggleMailModal = (checked: boolean, type: string): void => {
    if (checked) {
      setOpenCustomModal(!openCustomModal);
    }
    else {
      void handleUpdateMail(type)
    }
    setModalType(type);
    setModalFilledData(modalData[type === 'meeting' ? "Pre-meeting reminder" : "Confirmation email"]);
  }

  useEffect(() => {
    if (initialData) {
      setConfirmMail(initialData?.confirmationMail);
      setMeetingMail(initialData?.reminderMail);
      reset({
        bodyField: modalType === 'confirm' ? initialData?.confirmationMailBody : initialData?.reminderMailBody,
        subjectField: modalType === 'confirm' ? initialData?.confirmationMailSubject : initialData?.reminderMailSubject,
        limitOneOnOne: initialData?.limitOneOnOne,
        reminderMailSchedule: initialData?.reminderMailSchedule

      })
    }
  }, [initialData, reset, modalType]);

  useEffect(() => {

  }, [])


  return {
    settingsData,
    openCustomModal,
    setOpenCustomModal,
    modalFilledData,
    expandedAccordion,
    handleAccordionChange,
    methods,
    handleSubmit,
    setValue,
    reset,
    // repeatReminder,
    updateOneOnOnesSetting,
    onSubmit,
    confirmMail,
    meetingMail,
    handleToggleMailModal,
    modalType
  };
}
