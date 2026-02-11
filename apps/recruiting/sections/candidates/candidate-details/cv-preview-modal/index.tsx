import { CustomModal } from "common";
import { awsBaseUrl } from "@root/config";

export function CvPreviewModal({
  cvPreview,
  setCvPreview,
  resume,
}: any): JSX.Element {
  return (
    <CustomModal
      onClose={() => {
        setCvPreview(false);
      }}
      rootSx={{
        width: { xs: 350, sm: 500, md: 750 },
        height: { md: "95vh", sm: "80vh", xs: "70vh" },
        overflow: "auto",
        p: 0,
      }}
      closeButtonProps={{
        onClick: () => {
          setCvPreview(false);
        },
      }}
      isOpen={cvPreview}
    >
      <iframe
        title="Resume"
        height="92%"
        width="100%"
        src={awsBaseUrl + resume}
      />
    </CustomModal>
  );
}
