"use client";
import React from "react";
import CustomCard from "@components/custom-card";
import { Box, Button, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyResults } from "./key-results";
import { Timeline } from "./timeline";
import { OwnerGoalsDetail } from "./owner-goals-detail";

// ===================================================

export function GoalsDetails({ disabledKeyResultBtn }: { disabledKeyResultBtn?: boolean }): React.JSX.Element {
    const router = useRouter();
    const search = useSearchParams();
    const query = search.get('id')
    const goalId = search.get('goalId')
    const redirectTo = search.get('redirectTo');

    return (
        <Box>
            <CustomCard header
                cardHeader={{
                    title: <Typography variant="h5" fontWeight={600} color="text.primary">
                        Goals
                    </Typography>,
                    description: "Manage goals and track progress",
                    onBack: () => {
                        router.push(redirectTo ? "/my-team/view" : '/goals');
                    },
                    actions:
                        !disabledKeyResultBtn && <Button
                            variant="contained"
                            onClick={() => {
                                router.push(`/goals/create-goal/goal-details/add-key-result?goalId=${goalId}&actionType=add`)
                            }}
                        >
                            Add Key Result
                        </Button>
                }} />

            <Box marginTop="2rem">
                <CustomCard>
                    <OwnerGoalsDetail goalId={goalId} />
                </CustomCard>
            </Box>

            <Box marginTop="2rem">
                <CustomCard>
                    <Typography variant="h5" fontWeight="600" color="text.primary">Key Results</Typography>
                    <Typography variant="subtitle2" fontWeight="400" color="text.secondary" marginBottom="4rem">
                        Track your goal progress through key results
                    </Typography>
                    <KeyResults query={query} goalId={goalId} />
                </CustomCard>
            </Box>

            <Box marginTop="2rem">
                <CustomCard>
                    <Typography variant="h5" fontWeight="600" color="text.primary">Timeline</Typography>
                    <Typography variant="subtitle2" fontWeight="400" color="text.secondary" marginBottom="4rem">
                        Track your goal progress through key results
                    </Typography>
                    <Timeline query={query} goalId={goalId} />
                </CustomCard>
            </Box>

        </Box>
    );
}

