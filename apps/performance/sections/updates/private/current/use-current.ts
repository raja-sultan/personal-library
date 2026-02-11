import React, { useEffect, useState } from 'react';
import { useGetSingleUpdateQuery, useShareUpdateMutation, useEditUpdateMutation } from "@services/updates/updates-api";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData, UseCurrentReturnType } from './current-types';



export const useCurrent = (): UseCurrentReturnType => {
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [emojiNumber, setEmojiNumber] = useState<number | null | undefined>(null);
    const [selectedVisibility, setSelectedVisibility] = useState<string>("Public");
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryMode = searchParams.get("mode")
    const updateId = searchParams.get("id");
    const { data: singleUpdate } = useGetSingleUpdateQuery({ id: updateId });
    const singleUpdateData = singleUpdate?.data;

    const [shareUpdate] = useShareUpdateMutation()
    const [editUpdate] = useEditUpdateMutation()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleReaction = (title: string): void => {
        const emojiNumbersMap: { [key: string]: number } = {
            "Terrible": 0,
            "Bad": 1,
            "Okay": 2,
            "Good": 3,
            "Great": 4,
        };
        const emojiNumber = emojiNumbersMap[title];
        setSelectedEmoji(title);
        setEmojiNumber(emojiNumber);
    };

    const handleVisibility = (visibility: string): void => {
        setSelectedVisibility(visibility);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const answersArray = singleUpdateData?.points.map((item) => ({
            _id: item._id,
            answer: data[`answer_${item._id}`],
        }));

        const formData: FormData = {
            type: selectedVisibility,
            sentimentScore: emojiNumber,
            points: answersArray || [],
        }
        if (queryMode) {
            editUpdate({ id: updateId, body: { ...formData, status: formData.type === "Public" ? "Shared" : "Draft" } })
                .unwrap()
                .then((response) => {
                    toast.success("Update Edited successfully!")
                })
                .catch((error) => {
                    toast.error("Error editing update!")
                });
            router.push(`?type=past&id=${updateId}`)
        } else {
            shareUpdate({ id: updateId, body: formData })
                .unwrap()
                .then((response) => {
                    toast.success("Update shared successfully!")
                })
                .catch((error) => {
                    toast.error("Error sharing update!")
                });
        }
    };

    useEffect(() => {
        if (queryMode && singleUpdateData) {
            setSelectedVisibility(singleUpdateData.type || "Public");
            singleUpdateData.points.forEach((item) => {
                const answerValue = (item.answer !== undefined && item.answer !== "") ? item.answer : 'Empty string';
                setValue(`answer_${item._id}`, answerValue);
            });

            const emojiNumbersMap: { [key: number]: string } = {
                0: "Terrible",
                1: "Bad",
                2: "Okay",
                3: "Good",
                4: "Great",
            };
            const defaultEmoji = emojiNumbersMap[singleUpdateData.sentimentScore] || "Terrible";
            setSelectedEmoji(defaultEmoji);
            setEmojiNumber(singleUpdateData.sentimentScore);
        }
    }, [queryMode, singleUpdateData, setValue]);

    return {
        selectedEmoji,
        selectedVisibility,
        handleReaction,
        handleVisibility,
        onSubmit,
        errors,
        register,
        handleSubmit,
        singleUpdateData,
        queryMode,
    }
}