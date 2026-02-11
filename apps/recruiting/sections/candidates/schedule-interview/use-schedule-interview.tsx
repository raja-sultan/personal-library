import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetAllUsersQuery,
  usePostScheduleInterviewMutation,
  useGetScheduleInterviewQuery,
} from "@services/candidate/schedule-interview/schedule-interview-api";
import toast from "react-hot-toast";
import {
  scheduleInterviewDefaultValues,
  scheduleInterviewSchema,
} from "./data";

export function useScheduleInterview(): any {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobID = searchParams.get("jobId");
  const candidateID = searchParams.get("candidateId");
  const stageIds = searchParams.get("stageId");
  const interviewIds = searchParams.get("interviewId");

  if (!jobID || !candidateID) {
    router.back();
  }
  const { data: dropdownData } = useGetAllUsersQuery("");
  const dropdownArray = dropdownData;

  const {
    data: interviewData,
    isLoading,
    isSuccess,
  } = useGetScheduleInterviewQuery({
    candidateId: candidateID,
    jobId: jobID,
    stageId: stageIds,
    interviewId: interviewIds,
  });
  const scheduleInterviewData = interviewData?.data;
  const [postSchedule] = usePostScheduleInterviewMutation();

  const todayStr = new Date().toISOString().replace(/T.*$/, "");

  const generateTimeSlots = () => {
    const now = new Date();
    const timeSlots: any = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i % 12 || 12; // Convert 0 to 12
        const amOrPm = i < 12 ? "AM" : "PM";
        const formattedHour = `${hour}`.padStart(2, "0");
        const minute = `${j}`.padStart(2, "0");
        const formattedTime = `${formattedHour}:${minute} ${amOrPm}`;

        const isoTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          i,
          j
        ).toISOString();

        timeSlots.push({
          iso: isoTime, // Store ISO format for backend
          display: formattedTime, // Store simplified format for UI
        });
      }
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  const transformedTimeSlots = timeSlots?.map((time) => ({
    id: nanoid(),
    value: time?.iso,
    label: time?.display,
  }));
  const method = useForm<any>({
    resolver: yupResolver(scheduleInterviewSchema),
    defaultValues: scheduleInterviewDefaultValues,
  });
  const { handleSubmit, watch, setValue } = method;
  const selectedStartTime = watch<string>("startTime");
  const selectedEndTime = watch("endTime");

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      if (selectedStartTime > selectedEndTime) {
        setValue("endTime", ""); // Reset the endTime if it's invalid
      }
    }
  }, [selectedStartTime, selectedEndTime, setValue]);
  const formSubmitHandler = async (payload) => {
    const {
      interviewDate,
      interviewers,
      startTime,
      endTime,
      stageId,
      interviewId,
    } = payload;
    const interviewerIds = interviewers.map((interviewer) => interviewer.id);

    const updatedPayload = {
      interviewDate,
      startTime,
      endTime,
      candidateId: candidateID,
      stageId,
      interviewId,
      interviewers: interviewerIds,
    };
    try {
      const res: any = await postSchedule({
        jobId: jobID,
        body: updatedPayload,
      }).unwrap();
      toast.success(res?.data?.message ?? "Interview Schedule successfully!");
      router.push(
        `send-calendar-invite?jobId=${jobID}&candidateId=${candidateID}&interviewId=${interviewId}&stageId=${stageId}`
      );
    } catch (err) {
      toast.error(err?.data?.message ?? "Something went wrong");
    }
  };

  return {
    router,
    todayStr,
    transformedTimeSlots,
    handleSubmit,
    formSubmitHandler,
    method,
    dropdownArray,
    scheduleInterviewData,
    isLoading,
    isSuccess,
    selectedStartTime,
  };
}
