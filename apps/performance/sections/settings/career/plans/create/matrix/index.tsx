import { RocketMatrix } from "@assets/images";
import { CareerSkillCategory } from "@components/career-skill-matrix";
import CustomCard from "@components/custom-card";
import { NoDataFound } from "@components/no-data";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import Image from "next/image";
import { AddLevelModal } from "./level-modal";
import { SkillCategoryListing } from "./skill-category-listing";
import { SkillModal } from "./skill-modal";
import { useMatrix } from "./use-matrix";
import { Children } from "react";

export function Matrix({ id, disabled }): JSX.Element {
    const {
        handleMatrixAction,
        addLevelModal,
        addSkillModal,
        handleLevelModal,
        handleSkillModal,
        editLevelId,
        getSkills,
        getLevel,
        handleLevelAction,
        levelActionType,
        handleMatrixSubmit,
        handleLevelExpectation
    } = useMatrix();

    const isTrue = true;

    return (
        <>
            <CustomCard>
                <Box display="flex" gap="5px" overflow='auto' width="100%" >
                    <Box>
                        <CareerSkillCategory disabled={disabled} key="skill" title="Skill" actionType="skill" handleAction={handleMatrixAction} />
                        {isTrue ? (
                            <SkillCategoryListing id={id} disabled={disabled} skills={getSkills} />
                        ) : (
                            <NoDataFound
                                icon={<Image src={RocketMatrix} alt="logo" height={200} width={200} style={{ marginBlock: "24px" }} />}
                                heading="Setup your growth and development plan"
                                description="Create plan levels to help your employees develop within your organization and add skills to show them how to level up "
                            />
                        )}
                    </Box>
                    {getLevel?.map((item: { _id: string; levelName: string; description: string; skillLevel: any[] }) => (
                        <Box key={item?._id} sx={{ width: '100%', maxWidth: '425px' }}>
                            <CareerSkillCategory
                                disabled={disabled}
                                key="level"
                                title={item.levelName}
                                actionType="level"
                                handleAction={handleLevelAction}
                                // options={['Edit', 'Delete']}
                                options={[{ id: item._id, name: "Edit" }]}
                            />
                            {
                                Children.toArray(getSkills.map((skill) => {
                                    const expectation = (item.skillLevel || [])?.find((level) => level.skillId === skill._id);
                                    if (expectation) {
                                        return <TextField
                                            multiline
                                            placeholder="no expectations set"
                                            defaultValue={expectation?.text}
                                            minRows={6}
                                            maxRows={6}
                                            fullWidth
                                            sx={{ mb: '6px', width: '100%', maxWidth: '425px' }}
                                            onBlur={(e) => {
                                                handleLevelExpectation({
                                                    text: e.target.value,
                                                    skillId: skill._id,
                                                    levelId: item._id,
                                                    _id: expectation._id
                                                })
                                            }}
                                        />
                                    }
                                    return <TextField
                                        multiline
                                        placeholder="no expectations set"
                                        minRows={6}
                                        maxRows={6}
                                        defaultValue={expectation?.text}
                                        fullWidth
                                        sx={{ mb: '6px', width: '100%', maxWidth: '425px' }}
                                        onBlur={(e) => {
                                            handleLevelExpectation({
                                                text: e.target.value,
                                                skillId: skill._id,
                                                levelId: item._id
                                            })
                                        }}
                                    />
                                }))
                            }
                        </Box>
                    ))}
                    <CareerSkillCategory disabled={disabled} key="level" title="Add Level" actionType="level" handleAction={handleMatrixAction} />
                </Box>

                <DialogActions>
                    <Button variant="outlined" type="submit" onClick={handleMatrixSubmit}>
                        Next
                    </Button>
                </DialogActions>
            </CustomCard>

            {addSkillModal && <SkillModal open={addSkillModal} onClose={handleSkillModal} />}
            {addLevelModal && <AddLevelModal open={addLevelModal} onClose={handleLevelModal} editLevelId={editLevelId} levelActionType={levelActionType} />}
        </>
    );
}
