// import { useDeleteStageTransitionRuleMutation } from "@services/jobs/job-details/stage-transition/stage-transition-api";
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomTable } from "common";
import { useStageTransition } from "./use-stage-transition";
import { CreateARule } from "./create-a-rule";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
// import toast from "react-hot-toast";
import { JobDetailsHeader } from "../job-details-header";

export function StageTransitionMainScreen(): React.JSX.Element {
  const { data } = useStageTransition();
  const [openCreateRule, setOpenCreateRule] = useState<boolean>(true);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  // const [deleteStageTransitionRule] = useDeleteStageTransitionRuleMutation();

  const columns = [
    {
      accessorFn: (row: any) => row.trigger,
      id: "trigger",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          trigger
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.action,
      id: "action",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          action
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.whenToSend,
      id: "whenToSend",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          when to send
        </Typography>
      ),
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row._id,
    //   id: "Actions",
    //   cell: (info: any) => (
    //     <Box sx={{ display: "flex" }}>
    //       <IconButton aria-label="edit">
    //         <CreateOutlinedIcon />
    //       </IconButton>
    //       <WarningPrompt
    //         mainColor="error.main"
    //         heading="Alert"
    //         subTitle="You are sure yu want to rule?"
    //         modelOpenLabel={
    //           <IconButton>
    //             <DeleteIcon />
    //           </IconButton>
    //         }
    //         acceptButtonLabel="Delete"
    //         acceptButtonProps={{
    //           onClick: async () => {
    //             try {
    //               const res: any = await deleteStageTransitionRule({
    //                 ruleId: info.row.original._id,
    //               })
    //                 .unwrap()
    //                 .then(() => {
    //                   toast.success(res?.message ?? "Successfully deleted");
    //                 });
    //             } catch (error) {
    //               toast.error(error.message);
    //             }
    //           },
    //           variant: "contained",
    //           color: "error",
    //           sx: {
    //             bgcolor: "error.main",
    //             color: "primary.contrastText",
    //           },
    //         }}
    //       />
    //     </Box>
    //   ),
    //   header: () => <span>Actions</span>,
    // },
  ];

  return (
    <Box>
      <JobDetailsHeader mainTitle="Stage Transition" />
      {openCreateRule ? (
        <Grid container direction="column" sx={{ position: "relative" }}>
          {/* <IsFetching isFetching={isFetching} /> */}
          <Grid item sm={12} container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  setOpenCreateRule(!openCreateRule);
                }}
                variant="contained"
                sx={{ ml: "1.2em" }}
              >
                Create a rule
              </Button>
            </Grid>
          </Grid>

          <Grid item sm={12} container>
            <Grid item sm={12}>
              {data?.length ? (
                <Box sx={{ mt: 3 }}>
                  <CustomTable
                    data={data}
                    columns={columns}
                    isLoading={false}
                    isFetching={false}
                    isError={false}
                    isPagination={false}
                    isSuccess
                    // count={Math.ceil(data?.data?.meta?.total / limit)}
                    totalPages={data.length ?? 0}
                    currentPage={1}
                    onPageChange={(onPageData: any) => {
                      setParams({
                        page: onPageData,
                        offset: (onPageData - 1) * 10,
                      });
                    }}
                  />
                </Box>
              ) : (
                <Grid
                  item
                  sm={12}
                  sx={{
                    backgroundColor: "background.paper",
                    p: 1,
                    borderRadius: "5px",
                    m: "1.5em 0",
                  }}
                >
                  <Box sx={{ pl: "0.4em" }}>
                    <Typography variant="h6" sx={{ mb: "0.5em" }}>
                      Stages Rules
                    </Typography>
                    <Typography variant="subtitle2" sx={{ py: 0.5 }}>
                      You have no stage rules.
                    </Typography>
                    <Typography variant="subtitle2">
                      Create a rule to automatically send an email when a
                      candidate is moved to a new stage.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CreateARule
          openCreateRule={openCreateRule}
          setOpenCreateRule={setOpenCreateRule}
        />
      )}
    </Box>
  );
}
