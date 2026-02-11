"use client";
import { useState } from "react";
import { Box, Card } from "@mui/material";
import { CardMenu } from "@sections/settings/one-on-ones/templates/tamplate-card/card-dropdown";
import { LockIcon } from "@assets/icons/lock-icon";
import CustomModal from "@components/custom-modal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useActivatedDeactivatedTemplatesMutation,
  useDeleteTemplatesMutation,
  useDuplicatTemplatesMutation,
} from "@services/settings/one-on-ones/templetes-api";
import { awsBaseUrl } from "@root/config";
import { PersonalLibraryIcon } from "@assets/icons/personal-library-Icon";
import Image from "next/image";

export function TamplateCard({
  comapyLogo,
  id,
  title,
  name,
  description,
  visibility,
  dropdownValues,
}): JSX.Element {
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState(false);

  const [activatedDeactivated] = useActivatedDeactivatedTemplatesMutation();
  const [duplicateTemplates] = useDuplicatTemplatesMutation();
  const [deleteTemplates] = useDeleteTemplatesMutation();

  const deactivatedTemplates = async (): Promise<void> => {
    try {
      await activatedDeactivated({
        templateId: id,
        status: "deactivated",
      }).unwrap();
      toast.success("Deactivated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const activatedTemplates = async (): Promise<void> => {
    try {
      await activatedDeactivated({
        templateId: id,
        status: "activated",
      }).unwrap();
      toast.success("Activated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteQuestion = async (): Promise<void> => {
    try {
      await deleteTemplates({ templateId: id }).unwrap();
      toast.success("Template Deleted");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  async function handleDuplicateTemplate(): Promise<void> {
    await duplicateTemplates({ templateId: id })
      .unwrap()
      .then(() => {
        toast.success("Template Duplicated.");
      })
      .catch(() => {
        toast.error("somethings wents wrong !");
      });
  }

  function handleModal(value): void {
    switch (value) {
      case "Delete":
        setDeleteModal(!deleteModal);
        break;
      case "Preview":
        router.push(`/settings/one-on-ones/templates/preview-template?id=${id}`);
        break;
      case "Edit":
        router.push(`/settings/one-on-ones/templates/edit-template/?id=${id}`);
        break;
      case "Deactivate":
        void deactivatedTemplates();
        break;
      case "Activated":
        void activatedTemplates();
        break;
      case "Duplicate":
        void handleDuplicateTemplate();
        break;
      default:
        break;
    }
  }

  return (
    <Card
      sx={{
        border: "1px solid var(--gray-scale-gray-100, #F2F4F7)",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          background: "#EBE9FE",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontSize: "20px",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {comapyLogo ? (
            <Image
              style={{ borderRadius: "50%" }}
              src={`${awsBaseUrl}${comapyLogo}`}
              width={42}
              height={42}
              alt="companyLogo"
            />
          ) : (
            <PersonalLibraryIcon />
          )}

          {name ? name : "Personal Library"}
        </Box>

        <CardMenu onItemClick={handleModal} dropdownValues={dropdownValues} />
      </Box>

      <Box sx={{ p: 3 }}>
        <Box
          sx={{ color: "theme.secondary", fontSize: "18px", fontWeight: 600 }}
        >
          {title}
        </Box>
        <Box
          sx={{
            marginY: 2,
            fontSize: "16px",
            fontWeight: 400,
            maxHeight: "25px",
            overflow: "hidden",
            whiteSpace: "break-spaces",
          }}
        >
          {description}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              background: "#EBE9FE",
              padding: "2px 12px",
              fontSize: "14px",
              fontWeight: 600,
              color: "primary.main",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <LockIcon sx={{ color: "primary.main" }} /> {visibility}
          </Box>
        </Box>
      </Box>
      {deleteModal && (
        <CustomModal
          open={deleteModal}
          onClose={() => {
            setDeleteModal(!deleteModal);
          }}
          title="Alert"
          message=" This will be permanently deleted from Personnel Library .Are you sure you want to delete this 1-on-1 template ?"
          acceptButtonProps={{
            onClick: handleDeleteQuestion,
          }}
        />
      )}
    </Card>
  );
}
