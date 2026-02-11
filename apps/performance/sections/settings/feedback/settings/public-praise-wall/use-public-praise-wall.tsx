// import { useUpdatePublicPraiseWallMutation } from "@services/settings/feedback/settings/settings-api";
import { useUpdatePublicPraiseWallMutation } from "@services/settings/feedback/settings/settings-api";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PublicPraiseWallTypes {
  handleSubmit: any;
  methods: any;
  onSubmit: (value: any) => void;
  progressValue: number | string;
  handleChange: (newValue: number | Event) => any;
}

interface FormData {
  startDate: any;
  endDate: any;
  slidesCount: number;
}

export function usePublicPraiseWall(): PublicPraiseWallTypes {
  const [progressValue, setProgressValue] = useState<number>(5);
  const router = useRouter();

  const defaultValues = {
    startDate: 7,
    endDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:00[Z]").toString(),
    slidesCount: "30",
  };

  const methods = useForm<any>({ defaultValues });
  const { handleSubmit } = methods;
  const handleChange = (newValue: number): void => {
    setProgressValue(newValue);
  };
  const [updatePublicPraiseWall] = useUpdatePublicPraiseWallMutation();

  const onSubmit = async (data: FormData): Promise<void> => {
    data.slidesCount = progressValue;
    data.startDate = dayjs()
      .subtract(data.startDate, "days")
      .format("YYYY-MM-DDTHH:mm:00[Z]");

    try {
      await updatePublicPraiseWall({ praiseWall: data }).unwrap();
      router.push(
        `/praise-wall?startDate=${data.startDate}&endDate=${data.endDate}&slidesCount=${data.slidesCount}&isRedireact=${true}`
      );
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return {
    handleSubmit,
    methods,
    onSubmit,
    handleChange,
    progressValue,
  };
}
