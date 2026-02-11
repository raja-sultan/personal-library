'use client'
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { CustomPopover } from "@components/custom-popover";
import { Button } from "@mui/material";
import Link from "next/link";
import { useReviewCycle } from "./use-review-cycle";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.REVIEW_CYCLES;

export function ReviewCycles(): JSX.Element {

    const {
        tableData,
        handleStageChange,
        deleteModal,
        duplicateModal,
        handleDeleteModal,
        handleDuplicateModal,
        handleDeleteReview,
        handleDuplicateReview,
        handleSearch
    } = useReviewCycle();

    return (
      <>
        <CustomHeaderTableTabs
          headerProps={{
            title: "Review Cycles",
            description:
              "The review cycle enables feedback and improvement in work life.",
            actions: (
              <PermissionProtected permission={PERMISSION.CREATE}>
                <Link href="/settings/reviews/review-cycles/create">
                  <Button variant="contained">Create Review Cycle</Button>
                </Link>
              </PermissionProtected>
            ),
          }}
          table={{
            secondaryHeader: true,
            secondaryHeaderProps: {
              actions: (
                <CustomPopover
                  btnText="All Stages"
                  options={["all stages", "draft", "active", "ended"]}
                  handleChange={handleStageChange}
                />
              ),
              handleSearch,
            },
            tableProps: tableData,
          }}
        />

        {deleteModal && (
          <CustomModal
            open={deleteModal}
            onClose={handleDeleteModal}
            title="Are you sure?"
            message="Are you sure you want to delete this?"
            acceptButtonProps={{
              onClick: handleDeleteReview,
            }}
          />
        )}

        {duplicateModal && (
          <CustomModal
            open={duplicateModal}
            onClose={handleDuplicateModal}
            title="Are you sure?"
            message="Are you sure you want to duplicate this?"
            acceptText="Continue"
            acceptButtonProps={{
              onClick: handleDuplicateReview,
            }}
          />
        )}
      </>
    );
}