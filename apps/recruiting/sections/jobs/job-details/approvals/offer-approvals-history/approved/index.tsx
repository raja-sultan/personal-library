import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { CustomChip } from "common";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Theme } from "@mui/material";
import dayjs from "dayjs";

export function Approved({
  // requestStatus,
  reqData,
}: {
  // requestStatus: any;
  reqData: any;
}): JSX.Element {
  function getIconBasedOnStatus(status: string, theme: Theme): any {
    let icon, color;
    switch (status) {
      case "Approved":
        icon = <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
        color = theme.palette.success.main;
        break;
      case "Pending":
        icon = <PendingIcon sx={{ color: theme.palette.warning.main }} />;
        color = theme.palette.warning.main;
        break;
      case "Rejected":
        icon = <CancelIcon sx={{ color: theme.palette.error.main }} />;
        color = theme.palette.error.main;
        break;
      default:
        icon = <InfoOutlinedIcon />;
        color = theme.palette.primary.main;
        break;
    }

    return { icon, color };
  }

  function getColorBasedOnName(
    status: string
  ): "success" | "warning" | "danger" | "started" {
    if (status === "Approved") {
      return "success";
    } else if (status === "Pending") {
      return "warning";
    } else if (status === "Rejected") {
      return "danger";
    }
    return "started";
  }

  function getColorBasedOnIconName(
    status: string
  ): "Approved" | "Pending" | "Rejected" | "Started" {
    if (status === "Approved") {
      return "Approved";
    } else if (status === "Pending") {
      return "Pending";
    } else if (status === "Rejected") {
      return "Rejected";
    }
    return "Started";
  }
  const theme = useTheme();
  const updateData: any = {};
  function expendData(requestedData: any): void {
    for (const key in requestedData) {
      if (typeof requestedData[key] === "object") {
        expendData(requestedData[key]);
      }
      if (key === "approvalSteps" || key === "numOfApprovalRequired") {
        updateData[key] = requestedData[key];
      }
    }
  }
  expendData(reqData);

  return (
    /*Custom Modal*/

    <Box
      sx={{
        p: 2,
        // backgroundColor: "#F9FAFB",
        boxShadow: theme.shadows[16],
        border: "1px solid var(#F2F4F7, #F2F4F7)",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ textAlign: "center", my: 1 }}>
        <Typography variant="h6" sx={{ color: theme.palette.info.main }}>
          {reqData?.fullName}
        </Typography>
        {reqData?.jobDetails?.map((item) => (
          <Box key={item.id}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
              }}
            >
              {item?.jobInfo?.jobName}
            </Typography>
          </Box>
        ))}
      </Box>

      <Grid
        container
        sx={{
          width: "100%",
          p: 2,
          m: "auto",
          mb: 2,
          boxShadow: theme.shadows[16],
          border: "1px solid var(#F2F4F7, #F2F4F7)",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={12} sm={4}>
          {reqData?.offerDetails?.map((item) => (
            <Box key={item.id}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.success.main }}
              >
                Offer {item?.version}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              justifyItems: { xs: "start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                }}
              >
                Requested By
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                }}
              >
                {reqData?.requestedByFullName}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                }}
              >
                Created Date
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                }}
              >
                {dayjs(reqData?.createdAt).format("MM/DD/YYYY") ?? "-"}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                }}
              >
                Approved Date
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                }}
              >
                {dayjs(reqData?.approvalDate).format("MM/DD/YYYY") ?? "-"}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          boxShadow: theme.shadows[16],
          border: "1px solid var(#F2F4F7, #F2F4F7)",
          borderRadius: "8px",
          width: "100%",
          p: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Approval Details
        </Typography>

        {reqData?.jobDetails?.map((item) => (
          <Box key={item.id}>
            {item?.approvals?.jobApprovals?.toExtendOffersToCandidate?.approvalSteps.map(
              (data) => (
                <Box key={data.id}>
                  {data?.status === "Approved" ? (
                    <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                      <Box sx={{ mr: 0.5 }}>
                        <Tooltip
                          title={getColorBasedOnIconName(data.status)}
                          placement="top"
                          arrow
                        >
                          {getIconBasedOnStatus(data.status, theme).icon}
                        </Tooltip>
                      </Box>
                      <CustomChip
                        ChipProps={{ label: data?.fullName }}
                        variant={getColorBasedOnName(data.status)}
                      />
                      {data?.status !== "Pending" ? (
                        <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                          {updateData.numOfApprovalRequired} of{" "}
                          {updateData.approvalSteps?.length} required
                        </Typography>
                      ) : null}
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              )
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          boxShadow: theme.shadows[16],
          border: "1px solid var(#F2F4F7, #F2F4F7)",
          borderRadius: "8px",
          width: "100%",
          p: 2,
          m: "auto",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            justifyItems: { xs: "start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              Opening ID
            </Typography>
            {reqData?.openingInfo?.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {item?.openingId}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              Employment Type
            </Typography>
            {reqData?.jobDetails?.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {item?.jobInfo?.employmentType}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              Start Date
            </Typography>
            {reqData?.openingInfo?.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {dayjs(item?.targetStartDate).format("MM/DD/YYYY") ?? "-"}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              Office
            </Typography>
            {reqData?.jobDetails?.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {item?.jobInfo?.office}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
              }}
            >
              Salary
            </Typography>
            {/* <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
              }}
            >
              {reqData?.requestedByFullName}
            </Typography> */}
            {reqData?.offerDetails?.map((item) => (
              <Box key={item.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {item?.salary}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
