import type { Theme } from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import {
  useGetOpeningsApprovalsDetailsQuery,
  useUpdateMarkAsApprovedMutation,
} from "@services/jobs/job-details/approvals/opening-approvals-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export function UseOfferApprovals({ refetch }: any): any {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  // Mark As Approved
  const [markAsApproved] = useUpdateMarkAsApprovedMutation();
  function MarkAsApproved({ rejectionReason, email, _id }: any): void {
    markAsApproved({
      jobId,
      body: {
        userId: _id,
        markAs: "approve",
        approverType: "extend_offer",
        rejectionReason,
        email,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("Mark As Approved");
      })
      .catch((error: { data: { message: any } }) => {
        const errMsg = error?.data?.message;
        toast.error(`${errMsg}`);
      });

    refetch();
  }

  // Approvals details
  const { data, isLoading } = useGetOpeningsApprovalsDetailsQuery({
    jobId,
    stepName: "approvals",
  });

  const addApproval =
    data?.data?.approvals?.jobApprovals?.toExtendOffersToCandidate;
  const approvalData =
    data?.data?.approvals?.jobApprovals?.toExtendOffersToCandidate
      ?.approvalSteps;

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

  const method = useForm({
    defaultValues: {
      name: "",
      order: "",
    },
  });

  return {
    method,
    isLoading,
    addApproval,
    MarkAsApproved,
    approvalData,
    getIconBasedOnStatus,
    getColorBasedOnName,
    getColorBasedOnIconName,
    data,
  };
}
