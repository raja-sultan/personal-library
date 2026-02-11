"use client";
import { DeleteTrashIcon } from "@assets/icons";
import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import Details from "./details";
import { Employees } from "./employees";
import { Matrix } from "./matrix";
import { UseCreate } from "./use-create";

export function CreatePlan({ id, type }: { id?: string | null; type?: string }): JSX.Element {
    const { router, disabled, handlePublish, activeTab, title, status, plan } = UseCreate({ type });

    return (
        <>
            <CustomCard
                cardProps={{
                    sx: { mb: "24px" },
                }}
                header
                cardHeader={{
                    title: `${title} Plan`,
                    onBack: () => {
                        router.back();
                    },
                    actions: (
                        <>
                            <Button variant="outlined" disabled={disabled}>
                                Save
                            </Button>
                            <Tooltip
                                arrow
                                placement="bottom-end"
                                title={
                                    <Box textAlign="center">
                                        <Typography variant="subtitle2">To publish a Career Plan,</Typography>
                                        <Typography variant="subtitle2">ensure plan details, a comprehensive competency matrix,</Typography>
                                        <Typography variant="subtitle2">and associated employees are added</Typography>
                                    </Box>
                                }
                            >
                                <Button variant="contained" disabled={status !== "publish"} onClick={handlePublish}>
                                    Publish
                                </Button>
                            </Tooltip>
                            <Button variant="outlined" disabled={disabled}>
                                <DeleteTrashIcon />
                            </Button>
                        </>
                    ),
                }}
            />
            <HorizontalTabs Index={activeTab ? Number(activeTab) : 0} tabsArray={["Details", "Matrix", "Employees"]}>
                <Details id={id} disabled={disabled} />
                <Matrix id={id} disabled={disabled} />
                <Employees id={id} disabled={disabled} plan={plan} />
            </HorizontalTabs>
        </>
    );
}
