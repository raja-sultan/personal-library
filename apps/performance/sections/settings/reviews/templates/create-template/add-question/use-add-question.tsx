import { useQuestionnairesListQuery } from "@services/settings/review/questions-api";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";


interface ApiReturnType {
    description: string;
    _id: string;
}
interface UseChooseQuestionReturnType {
    handleAddClick: (id: string) => void;
    handleAddQuestions: () => void;
    selectedQuestions: ApiReturnType[];
    setSelectedValues?: Dispatch<SetStateAction<ApiReturnType[]>>;
    getQuestionnaire: any
    createQuestionModal: boolean,
    handleCreateQuestionModal: () => void;

}

export function useAddQuestion({ setSelectedValues, handleDrawerClose,selectedValues }): UseChooseQuestionReturnType {
    const [selectedQuestions, setSelectedQuestions] = useState<ApiReturnType[]>([]);
    const [createQuestionModal, setCreateQuestionModal] = useState(false);

    //    @api call here
    const { data: getQuestionnaire } = useQuestionnairesListQuery({});

    // @selected question function
    const handleAddClick = (item): void => {
        const isSelected = selectedQuestions.some((selectedItem: any) => selectedItem._id === item._id);
        if (isSelected) {
            // If selected, remove it from the array
            setSelectedQuestions((prevSelected) => prevSelected.filter((selected: any) => selected._id !== item._id));
        } else {
            // If not selected, add it to the array
            setSelectedQuestions((prevSelected) => [...prevSelected, item]);
        }
    };


    useEffect(() => {
        setSelectedQuestions(selectedValues)
    }, [selectedValues])

    // submit drawer data
    const handleAddQuestions = (): void => {
        handleDrawerClose();
        setSelectedValues( selectedQuestions)
       
    };


    function handleCreateQuestionModal(): void {
        setCreateQuestionModal(!createQuestionModal);
    }

    return {
        handleAddClick,
        handleAddQuestions,
        selectedQuestions,
        getQuestionnaire,
        handleCreateQuestionModal,
        createQuestionModal
    }

}
