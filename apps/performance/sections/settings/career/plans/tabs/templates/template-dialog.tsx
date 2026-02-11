import React, { Children } from 'react'
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { ThemeModeColor } from '@root/utils';
import { Box, CircularProgress, Dialog, Typography } from '@mui/material';
import { useDuplicatePlanMutation, useSingleTemplateDataQuery } from '@services/settings/career/plans/plans-api';
import { useRouter } from 'next/navigation';
import { PERMISSIONS } from '@enums/permissions';
import { PermissionProtected } from '@guards/permission-protected';

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.TEMPLATES;

function TemplateDialog({ id, open, onClose }): JSX.Element {
    // career plan templates
    const { data, isLoading } = useSingleTemplateDataQuery({ id });
    const newData = data?.data;
    const router = useRouter();

    // career plan templates duplicate
    const [duplicatePlanMutation, { isLoading: isDuplicateLoading }] = useDuplicatePlanMutation();

    async function handleDuplicateTemplates(): Promise<void> {
        try {
            await duplicatePlanMutation({ id })?.unwrap()?.then((res) => {
                if (res?.data) {
                    toast.success('Duplicate is successful');
                    router.push(`/settings/career/plans/create?templateId=${res?.data?._id}&tab=1`)
                    onClose();
                }
            })
        } catch (error) { toast.success(error?.data?.message || 'Error while duplicating plan') }
    }

    // level skillName and skill id match
    const result: any[] = [];
    const skillLevels: any = data?.data?.skills?.reduce((obj: any, skill: any) => {
        obj[skill?._id] = { ...skill, levels: [] };
        return obj;
    }, {}) ?? {};

    data?.data?.[0]?.levels.forEach((level) => {
        const levelIndex = result.findIndex((existingLevel) => existingLevel.levelName === level.levelName);

        if (levelIndex === -1) {
            const matchedSkills = {};

            level?.skillLevel?.forEach((skillLevel) => {
                const matchedSkill = data?.data?.skills?.find((skill) => skill?._id === skillLevel?.skillId);
                if (matchedSkill) {
                    skillLevels[matchedSkill?._id].levels?.push({
                        _id: skillLevel?._id,
                        text: skillLevel?.text,
                    });
                }

            });

            result.push({
                id: level?._id,
                levelName: level?.levelName,
                skillLevels: Object?.values(matchedSkills),
            });
        } else {
            const existingLevel = result[levelIndex];

            level?.skillLevel?.forEach((skillLevel) => {
                const matchedSkill = data?.data?.skills?.find((skill) => skill?._id === skillLevel?.skillId);
                const existingSkill = existingLevel?.skillLevels?.find((existingSkillLevel) => existingSkillLevel?.id === matchedSkill?._id);

                if (!existingSkill) {
                    existingLevel?.skillLevels.push({
                        id: matchedSkill?._id,
                        skillName: matchedSkill?.name,
                        skillDescription: matchedSkill?.description,
                        skills: [
                            {
                                id: skillLevel?.skillId,
                                text: skillLevel?.text,
                            },
                        ],
                    });
                } else {
                    existingSkill?.skills?.push({
                        id: skillLevel?.skillId,
                        text: skillLevel?.text,
                    });
                }
            });
        }
    });

    return (
      <Dialog
        fullWidth
        maxWidth="xl"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: styles.dialogPaperStyle }}
      >
        <Box sx={styles.head}>
          <Typography variant="h6" color="neutral.900">
            {newData?.title}
          </Typography>
          <PermissionProtected permission={PERMISSION.USE}>
            <LoadingButton
              loading={isDuplicateLoading}
              type="button"
              variant="contained"
              onClick={handleDuplicateTemplates}
            >
              Use Template
            </LoadingButton>
          </PermissionProtected>
        </Box>
        <Box sx={styles.categoryScrollWrapper}>
          <Box sx={{ pt: 1.4 }}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Box display="flex" gap="5px">
                  <Box sx={styles.skillsHeading} mb={1}>
                    <Typography variant="body1" sx={styles.skillsTitle}>
                      Skills
                    </Typography>
                  </Box>
                  <Box display="inline-flex" flex={1} gap="5px">
                    {result?.map((obj) => (
                      <Box key={obj.levelName} mb={1} sx={styles.skillsHeading}>
                        <Typography variant="body1">{obj.levelName}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  {Object.values(skillLevels)?.map((skillLevel: any) => (
                    <Box key={skillLevel?._id} display="flex" gap="5px">
                      <Box sx={styles.skillsHeading} mb={1}>
                        <Typography variant="body1" sx={styles.skillsTitle}>
                          {skillLevel?.name}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {skillLevel?.description}
                        </Typography>
                      </Box>
                      <Box display="inline-flex" flex={1} gap="5px">
                        {Children.toArray(
                          skillLevel?.levels?.map((obj) => (
                            <Box key={obj._id} mb={1} sx={styles.skillsContent}>
                              <Typography
                                fontSize="13px"
                                variant="subtitle2"
                                sx={styles.list}
                              >
                                {obj.text}
                              </Typography>
                            </Box>
                          ))
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    );
}

export default TemplateDialog

const styles: Record<string, any> = {
    dialogPaperStyle: {
        borderRadius: "16px",
        padding: "16px",
    },
    head: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        mt: "10px",
        justifyContent: "space-between",
    },
    skillsTitle: ({ palette: { neutral } }) => ({
        fontWeight: 600,
        color: ThemeModeColor(neutral[900], neutral[200]),
    }),
    categoryScrollWrapper: ({ palette: { neutral } }) => ({
        overflowY: 'auto',
        pr: '4px',
        '&::-webkit-scrollbar ': {
            height: '5px',
            width: '4px',
            backgroundColor: neutral['100'],
            borderRadius: '8px'
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: neutral['300'],
            borderRadius: "6px",
            cursor: 'pointer'
        },
    }),
    skillsContent: ({ palette: { neutral } }) => ({
        background: ThemeModeColor('#FFFFFF', '#161d2c'),
        border: "1px solid #F2F4F7",
        borderRadius: "8px",
        padding: "16px",
        maxHeight: "185px",
        width: '425px',
        overflowY: "auto",
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: neutral['100'],
            borderRadius: '8px',
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: neutral['300'],
            borderRadius: "6px",
            cursor: 'pointer',
        },
    }),
    skillsHeading: () => ({
        background: ThemeModeColor('#F9FAFB', '#161d2c'),
        border: "1px solid #F2F4F7",
        borderRadius: "8px",
        p: "16px",
        minHeight: "166px",
        minWidth: '425px',
    }),
    orderedList: ({ palette }) => ({
        border: `1px solid ${palette.mode === 'dark' ? '#1e2432' : '#F2F4F7'}`,
        borderRadius: "8px",
        p: '16px',
        height: "100%",
    }),
    list: {
        display: 'list-item',
        listStylePosition: 'inside',
        fontWeight: 400
    },
};
