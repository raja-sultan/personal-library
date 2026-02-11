"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { Box, Typography } from "@mui/material";
import { NoDataFound } from "@components/no-data";
import { CustomChip } from "common";
import { keyResultsStyles } from "../key-results/key-results-styles";
import { useGetGoalTimelineQuery } from "@services/goals/goals.api";


// ===================================================

export function Timeline({ query,goalId }: any): React.JSX.Element {
    const styles = keyResultsStyles()
    const { data: getTimeline } = useGetGoalTimelineQuery({ id: query || goalId })


    return (
        <Box marginTop="2rem">

            {getTimeline?.data?.length === 0 ? (
                <NoDataFound
                    isCustomCard={false}
                    heading="There is nothing to show"
                    description="Goal activities will appear here based on the action you perform on  adding information"

                />
            ) :
                (getTimeline?.data?.map((timeline) => (
                    <CustomCard key={timeline?._id} cardProps={{ sx: styles.custom_card_timeline_style }}>
                        <Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2" color="text.primary">{timeline?.keyResultName}</Typography>
                                <CustomChip rootSx={{ backgroundColor: "neutral.100" }}
                                    variant="success"
                                    ChipProps={{
                                        label: timeline?.type === 'Percentage' ?  `${timeline?.updatedValue}%` :
                                            (timeline?.type === 'Number' || timeline?.type === 'Currency' ) ?
                                            (timeline?.increase === true ? `+${timeline?.updatedValue}` : `-${timeline?.updatedValue}`) : 
                                            timeline?.updatedValue 
                                      }}
                                      
                                />
                            </Box>
                            <Typography variant="subtitle2" color="text.primary" fontWeight="700"><Typography variant="subtitle2" color="text.primary" fontWeight="400" component="span">Today, by  </Typography>{timeline?.operatorName}</Typography>
                        </Box>
                    </CustomCard>
                )))
            }



        </Box>
    );
}

