"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { Button } from "@mui/material";
import Link from "next/link";
import { useTemplates } from "./use-templates";
import { ViewTemplate } from "./view-template";

import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.REVIEWS.TEMPLATES;

export function ReviewTemplates(): JSX.Element {
  const {
    columns,
    duplicateModal,
    handleDuplicateModal,
    handleDuplicateTemplate,
    viewModal,
    handleViewModal,
    tableId,
    templateData,
    isLoading,
    isFetching,
    question,
    handleOffset,
    setSearchValue,
    isSuccess,
  } = useTemplates();

  return (
    <>
      <CustomHeaderTableTabs
        headerProps={{
          title: "Templates",
          description:
            "Create your review templates here and assign them to employees.",
          actions: (
            <PermissionProtected permission={PERMISSION.CREATE}>
              <Link href="/settings/reviews/templates/create">
                <Button variant="contained">Create Template</Button>
              </Link>
            </PermissionProtected>
          ),
        }}
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch: (value) => {
              setSearchValue(value);
            },
          },
          tableProps: {
            data: templateData?.data?.templates,
            isLoading,
            isFetching,
            columns,
            isSuccess,
            isPagination: true,
            onPageChange: (value: number) => {
              handleOffset(value);
            },
            totalPages: templateData?.data?.meta?.pages,
            currentPage: templateData?.data?.meta?.page,
          },
        }}
      />

      {viewModal && (
        <CustomModal
          open={viewModal}
          onClose={handleViewModal}
          headerIcon={false}
          title={question}
          message={false}
          hideFooter
        >
          <ViewTemplate id={tableId} />
        </CustomModal>
      )}

      {duplicateModal && (
        <CustomModal
          open={duplicateModal}
          onClose={handleDuplicateModal}
          title="Are you sure?"
          message="Are you sure you want to duplicate this template?"
          acceptText="Confirm"
          acceptButtonProps={{
            onClick: handleDuplicateTemplate,
          }}
        />
      )}
    </>
  );
}
