import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { CustomModal } from "common";
import { useState } from "react";
import { Document, Page } from "react-pdf";

export function PDFEditorModal({
  setPdfModal,
  PdfModal,
  setRulesModal,
}: any): React.JSX.Element {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({
    numPages: loadedNumPages,
  }: {
    numPages: number;
  }): void {
    setNumPages(loadedNumPages);
  }
  return (
    <CustomModal
      onClose={() => {
        setPdfModal(false);
      }}
      rootSx={{
        maxWidth: { md: 800, xs: 550, sm: 650 },
        height: "85%",
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
      headerLabel="Create E-Signature Template"
      closeButtonProps={{
        onClick: () => {
          setPdfModal(false);
        },
      }}
      isOpen={PdfModal}
    >
      <Stack direction="row-reverse">
        <LoadingButton
          type="submit"
          variant="contained"
          onClick={() => {
            // setPdfModal(true);
            setRulesModal(true);
          }}
        >
          Continue
        </LoadingButton>
        <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Stack>
    </CustomModal>
  );
}
