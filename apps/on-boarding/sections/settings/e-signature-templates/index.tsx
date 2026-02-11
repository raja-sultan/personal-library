import React, { useState } from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { ESignatureTemplatesTable } from "./create-e-signature-template/e-signature-templates-table";
import { ESignatureTemplateModal } from "./create-e-signature-template/e-signature-template-modal";
import { SetRulesModal } from "./set-rules/set-rules-modal";
import { TaskFilters } from "../tasks/filters";
import { PDFEditorModal } from "./pdf-editor-modal/pdf-editor-modal";

export function ESignatureTemplatesSection(): JSX.Element {
  const [eSignatureModal, setESignatureModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [PdfModal, setPdfModal] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">E-Signature Templates</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setESignatureModal(true);
          }}
        >
          Add Template
        </Button>
      </Stack>
      <Card sx={{ p: 2, my: 1 }}>
        <Stack rowGap={2}>
          <TaskFilters
            filterHeaderData={[
              {
                type: "select",
                outerLabel: "Department",
                FieldProps: {
                  name: "department",
                },
                options: [
                  {
                    id: 1,
                    value: "businessAnalysis",
                    label: "Business Analysis",
                  },
                  { id: 2, value: "humanResources", label: "Human Resources" },
                  {
                    id: 3,
                    value: "sales&marketing",
                    label: "Sales & Marketing",
                  },
                ],
              },
              {
                type: "select",
                outerLabel: "Location",
                FieldProps: {
                  name: "location",
                },
                options: [
                  {
                    id: 1,
                    label: "Dublin Office",
                    value: "dublinOffice",
                  },
                  {
                    id: 2,
                    label: "Glasgow Office",
                    value: "glasgowOffice",
                  },
                  {
                    id: 3,
                    label: "London Office",
                    value: "londonOffice",
                  },
                ],
              },
              {
                type: "select",
                outerLabel: "Employment Status",
                FieldProps: {
                  name: "employee_status",
                },
                options: [
                  {
                    id: 1,
                    label: "Contact",
                    value: "Contact",
                  },
                  {
                    id: 2,
                    label: "Full-time",
                    value: "full-time",
                  },
                  {
                    id: 3,
                    label: "Intern",
                    value: "intern",
                  },
                ],
              },
              {
                type: "select",
                outerLabel: "Other Criteria",
                FieldProps: {
                  name: "other_Criteria",
                },
                options: [
                  {
                    id: 1,
                    label: "Welcome Email",
                    value: "welcomeEmail",
                  },
                ],
              },
              {
                type: "select",
                outerLabel: "Who must counter sign",
                FieldProps: {
                  name: "responsibleFor",
                },
                options: [
                  {
                    id: 1,
                    label: "New Hire",
                    value: "newHire",
                  },
                  {
                    id: 2,
                    label: "Manager",
                    value: "manager",
                  },
                  {
                    id: 3,
                    label: "Onboarding Coordinator",
                    value: "onboardingCoordinator",
                  },
                  {
                    id: 4,
                    label: "Employees",
                    value: "Employees",
                  },
                ],
              },
            ]}
            filterButtonShow
            onChanged={(e) => {
              console.log(e);
            }}
          />

          <ESignatureTemplatesTable
            setRulesModal={setRulesModal}
            setESignatureModal={setESignatureModal}
          />
        </Stack>
      </Card>
      <ESignatureTemplateModal
        eSignatureModal={eSignatureModal}
        setESignatureModal={setESignatureModal}
        setPdfModal={setPdfModal}
      />
      <SetRulesModal rulesModal={rulesModal} setRulesModal={setRulesModal} />
      <PDFEditorModal
        PdfModal={PdfModal}
        setPdfModal={setPdfModal}
        setRulesModal={setRulesModal}
      />
    </>
  );
}
