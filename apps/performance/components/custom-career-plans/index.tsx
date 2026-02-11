import React, { Children } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import type { CustomCareersPlansProps } from "./custom-career-plans.types";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { ThemeModeColor } from "@root/utils";

export function CustomCareersPlans(
  props: CustomCareersPlansProps
): JSX.Element {
  const { data, isLoading, handleNextTab, getData } = props;
  const result: any[] = [];

  const skillLevels: any =
    data?.data?.skills?.reduce((obj: any, skill: any) => {
      obj[skill._id] = { ...skill, levels: [] };
      return obj;
    }, {}) ?? {};

  data?.data?.levels?.forEach((level) => {
    const levelIndex = result.findIndex(
      (existingLevel) => existingLevel.levelName === level.levelName
    );

    if (levelIndex === -1) {
      const matchedSkills = {};

      level.skillLevel.forEach((skillLevel) => {
        const matchedSkill = data?.data?.skills.find(
          (skill) => skill._id === skillLevel.skillId
        );
        if (matchedSkill) {
          skillLevels[matchedSkill._id].levels.push({
            _id: skillLevel._id,
            text: skillLevel.text,
            isLevelReached: data?.data?.userPlanLevel?.[0]?.levelId
              ? data?.data?.userPlanLevel?.[0]?.levelId === level?._id
              : null,
          });
        }
      });

      result.push({
        id: level._id,
        levelName: level.levelName,
        skillLevels: Object.values(matchedSkills),
      });
    } else {
      const existingLevel = result[levelIndex];

      level.skillLevel.forEach((skillLevel) => {
        const matchedSkill = data?.data?.skills.find(
          (skill) => skill._id === skillLevel.skillId
        );
        const existingSkill = existingLevel.skillLevels.find(
          (existingSkillLevel) => existingSkillLevel.id === matchedSkill._id
        );

        if (!existingSkill) {
          existingLevel.skillLevels.push({
            id: matchedSkill._id,
            skillName: matchedSkill.name,
            skillDescription: matchedSkill.description,
            skills: [
              {
                id: skillLevel.skillId,
                text: skillLevel.text,
              },
            ],
          });
        } else {
          existingSkill.skills.push({
            id: skillLevel.skillId,
            text: skillLevel.text,
          });
        }
      });
    }
  });

  return (
    <>
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
        <Box sx={styles.categoryScrollWrapper}>
          <Box sx={{ pt: 1.4 }}>
            <Box>
              <Box display="flex" gap="5px">
                <Box sx={styles.skillsHeadingSideBarCard} mb={1}>
                  <Typography variant="body1" sx={styles.skillsTitle}>
                    Skills
                  </Typography>
                </Box>
                <Box display="inline-flex" flex={1} gap="5px">
                  {result?.map((obj) => {
                    const matchId =
                      data?.data?.userPlanLevel?.[0]?.levelId === obj?.id;
                    return (
                      <Box
                        key={obj.levelName}
                        mb={1}
                        sx={styles.skillsHeading(matchId)}
                      >
                        <Typography variant="body1">{obj.levelName}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box>
                {Object.values(skillLevels)?.map((skillLevel: any) => {
                  return (
                    <Box key={skillLevel?._id} display="flex" gap="5px">
                      <Box sx={styles.skillsHeadingSideBarCard} mb={1}>
                        <Typography variant="body1" sx={styles.skillsTitle}>
                          {skillLevel?.name}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {skillLevel?.description}
                        </Typography>
                      </Box>
                      <Box display="inline-flex" flex={1} gap="5px">
                        {Children.toArray(
                          skillLevel?.levels?.map((obj) => {
                            return (
                              <Box
                                key={obj._id}
                                mb={1}
                                sx={styles.skillsContent(obj?.isLevelReached)}
                              >
                                <Typography
                                  fontSize="13px"
                                  variant="subtitle2"
                                  sx={styles.list}
                                >
                                  {obj.text}
                                </Typography>
                                {obj?.isLevelReached && (
                                  <AddCircleOutlineOutlinedIcon
                                    sx={{
                                      color: ThemeModeColor(
                                        "#D0D5DD",
                                        "#475467"
                                      ),
                                      fontSize: "12px",
                                      cursor: "pointer",
                                      width: "32px",
                                      height: "32px",
                                    }}
                                    onClick={() => {
                                      if (handleNextTab) {
                                        handleNextTab();
                                      }
                                      getData(skillLevel?._id);
                                    }}
                                  />
                                )}
                              </Box>
                            );
                          })
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

const styles: Record<string, any> = {
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
    overflowY: "auto",
    pr: "4px",
    "&::-webkit-scrollbar ": {
      height: "5px",
      width: "4px",
      backgroundColor: neutral["100"],
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: neutral["300"],
      borderRadius: "6px",
      cursor: "pointer",
    },
  }),
  skillsContent: (id) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "1.6rem",
    background: id
      ? ThemeModeColor("#EBE9FE", "#344054")
      : ThemeModeColor("#fff", "#161d2c"),
    border: "1px solid #F2F4F7",
    borderRadius: "8px",
    padding: "16px",
    maxHeight: "185px",
    width: "425px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#F2F4F7",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D0D5DD",
      borderRadius: "6px",
      cursor: "pointer",
    },
  }),
  skillsHeading: (id) => ({
    background: id
      ? ThemeModeColor("#EBE9FE", "#344054")
      : ThemeModeColor("#EAECF0", "#161d2c"),
    border: "1px solid #F2F4F7",
    borderRadius: "8px",
    p: "16px",
    minHeight: "166px",
    minWidth: "425px",
  }),
  skillsHeadingSideBarCard: () => ({
    background: ThemeModeColor("#EAECF0", "#161d2c"),
    border: "1px solid #F2F4F7",
    borderRadius: "8px",
    p: "16px",
    minHeight: "166px",
    minWidth: "425px",
  }),
  orderedList: ({ palette }) => ({
    border: `1px solid ${palette.mode === "dark" ? "#1e2432" : "#F2F4F7"}`,
    borderRadius: "8px",
    p: "16px",
    height: "100%",
  }),
  list: {
    display: "list-item",
    listStylePosition: "inside",
    fontWeight: 400,
  },
};
