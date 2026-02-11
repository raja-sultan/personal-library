import React, { useState } from "react";
import { DocumentsTable } from "./documents-table";
import { Box, Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AddDocumentsModal from "./add-documents-modal";
import RequestSignatureModal from "./request-signature";

function Documents(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: { xs: "start", md: "end" },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "start", md: "center" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            position: { xs: "static", lg: "absolute" },
            top: 0,
            gap: 2,
            display: "flex",
            mb: { xs: 2, lg: 0 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button variant="outlined">
            <FileDownloadOutlinedIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setSignature(true);
            }}
          >
            Request Signature
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Document
          </Button>
        </Box>
      </Box>
      {/* Documents Table */}
      <DocumentsTable />
      {open && <AddDocumentsModal open={open} setOpen={setOpen} />}
      {signature && (
        <RequestSignatureModal
          signature={signature}
          setSignature={setSignature}
        />
      )}
    </>
  );
}

export default Documents;
