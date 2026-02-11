// @ mui imports
import { Button, Typography, Box } from "@mui/material";

// @icons imports
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// @ components imports
import { CustomDrawer } from "@components/custom-drawer"
import { useAddQuestion } from "./use-add-question";
import { addQuestionStyles } from "./add-question-style";
import { NewQuestionModal } from "../new-question-modal";


interface ChooseQuestionProps {
    isDrawerOpen: boolean;
    handleDrawerClose: () => void;
    selectedValues?: any
    setSelectedValues?: any
    id?: string
}


export function ChooseQuestion({ isDrawerOpen, handleDrawerClose, setSelectedValues, selectedValues }: ChooseQuestionProps): JSX.Element {
    const { handleAddClick, handleAddQuestions, selectedQuestions, getQuestionnaire, createQuestionModal, handleCreateQuestionModal
    } = useAddQuestion({ setSelectedValues, handleDrawerClose,  selectedValues })
    const styles = addQuestionStyles()

    return (
        <>
            <CustomDrawer
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
                title="Choose Questions"
                maxWidth="56.2rem"
            >

                <Box mt={2} sx={styles.wrap_question}>
                    {getQuestionnaire?.data?.Questionnaires?.map((question) => (
                        <Box
                            key={question._id}
                            sx={styles.wrap_choose_question}
                        >
                            <Typography variant="body2">
                                {question.description}
                            </Typography>
                            <Box sx={styles.icon_styling} onClick={() => { handleAddClick(question) }}>
                                {selectedQuestions.some((selectedItem: any) => selectedItem._id === question._id) ? <RemoveIcon /> : <AddIcon />}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={styles.wrap_button}>
                    <Box>
                        <Button startIcon={<AddIcon />} onClick={handleCreateQuestionModal}>Add Questions</Button>
                    </Box>

                    <Box display="flex" gap="0.5rem">
                        <Button variant="outlined" onClick={handleDrawerClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddQuestions}>Add</Button>
                    </Box>

                </Box>
            </CustomDrawer>
            <NewQuestionModal
                open={createQuestionModal}
                onClose={handleCreateQuestionModal}
                handleClose={handleCreateQuestionModal}
            />
        </>
    )
}
