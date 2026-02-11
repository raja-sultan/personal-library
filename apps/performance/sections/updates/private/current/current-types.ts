import { SubmitHandler } from "react-hook-form";

export interface UpdatePoint {
    _id: string;
    answer: string;
}

export interface FormData {
    type: string;
    sentimentScore: number | null | undefined;
    points: UpdatePoint[];
}

export interface UseCurrentReturnType {
    selectedEmoji: string | null ;
    selectedVisibility: string;
    handleReaction: (title: string) => void;
    handleVisibility: (visibility: string) => void;
    onSubmit: SubmitHandler<FormData>;
    errors: any;
    register: any;
    handleSubmit: any;
    singleUpdateData: any;
    queryMode: any;
}