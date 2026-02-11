import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { jobActions } from "@root/slices/jobs/reducer";
import { CustomModal, FormProvider } from "common";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormPreview from "../form-preview/form-preview";
import QuestionsModal from "../modals/questions-modal";
import SectionHeaderModal from "../modals/section-header-modal";
import StatementModal from "../modals/statement-modal";
import { useCreateForm } from "./use-create-form";

export default function CreateForm(props: any): JSX.Element {
  const { route } = props;
  const {
    isSuccess,
    isLoading,
    selectExistingFormHandler,
    existingFormData,
    methods,
    handleSubmit,
    onSubmit,
    modalsData,
    sectionDeleteHandler,
    setModals,
    addMoreSectionsHandler,
    jobStagesDetails,
    router,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    modals,
    setModalsData,
    watch,
    createAFormData,
    defaultData,
  } = useCreateForm(route);
  const dispatch = useDispatch();
  const formMode = useSelector((state: any) => state.jobs.formMode);

  return (
    <Grid container height="70vh" overflow="hidden" pt={2} pb={2}>
      <Grid item xs={12} my={1}>
        <Box display="flex" justifyContent="space-between" pr={1}>
          <Typography variant="h6">
            {formMode === "new-form" ? "Create a Form" : "Edit Form"}
          </Typography>

          <Autocomplete
            disabled={!isSuccess}
            getOptionLabel={(option: any) => option}
            onChange={(a, selectedValue) => {
              selectExistingFormHandler(selectedValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Copy from existing form" />
            )}
            disableCloseOnSelect={false}
            options={existingFormData || ["No forms available"]}
            sx={{ width: 300 }}
          />
        </Box>
        <Typography variant="subtitle2" color="text.secondary">
          Use forms to collect information from candidates after the initial job
          application.
        </Typography>
      </Grid>

      <Grid item sx={styles.formContainer} xs={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {/* Email Section */}

          <Grid container sx={styles.section}>
            <Typography variant="h6">Email to Candidate</Typography>
            <Grid container spacing={{ xs: 2, sm: 2.5 }}>
              {createAFormData?.emailPortion?.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Grid item xs={12} key={item.id} md={item.md}>
                    <item.component {...item.componentProps} fullWidth />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Form 1 Section */}

          <Grid container sx={styles.section}>
            <Box my={1}>
              <Typography variant="h6">Form</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {"{{"}FORM_LINK{"}}"} will link to this form.
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 2.5 }} mt={1}>
              {createAFormData?.form1?.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Grid item xs={12} key={item.id} md={item.md}>
                    <item.component {...item.componentProps} fullWidth />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" flexDirection="column" mt={1}>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Custom Questions
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="flex"
                alignItems="center"
              >
                {modalsData?.question?.length ? (
                  <DisplayChips
                    section={modalsData?.question}
                    type="questions"
                  />
                ) : (
                  "No questions have been added in this section"
                )}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                display="flex"
                alignItems="center"
              >
                Current Section:
                {modalsData?.statement ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon sx={{ ml: 1 }} color="disabled" />
                )}
                Statement
                {modalsData?.sectionHeader ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon sx={{ ml: 1 }} color="disabled" />
                )}
                Header
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" mt={1}>
                {Boolean(modalsData?.sections?.length) && (
                  <DisplayChips
                    section={modalsData?.sections}
                    type="section"
                    itemToDelete={sectionDeleteHandler}
                  />
                )}
              </Typography>

              <QuestionnaireButtons
                setModals={setModals}
                modalsData={modalsData}
                addMoreSectionsHandler={addMoreSectionsHandler}
              />
            </Box>
          </Grid>

          {/* Form2 section */}

          <Grid container sx={styles.section}>
            <Box>
              <Typography variant="h6">Form</Typography>
              <Typography variant="h6" sx={{ my: 1 }}>
                Stage
              </Typography>
            </Box>
            <Grid container>
              {createAFormData
                ?.form2({
                  stagesData: isLoading
                    ? ["Loading"]
                    : jobStagesDetails?.stages,
                  usersData: ["testing"],
                })
                ?.map((item) => (
                  <Grid item xs={12} key={item.id}>
                    <Grid item xs={12} key={item.id} md={item.md}>
                      <item.component {...item.componentProps}>
                        {item?.text ? item?.text : null}
                      </item.component>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* Form Buttons */}

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: 2,
              mb: 3,
              px: 2,
            }}
          >
            <Button
              variant={defaultData?.form ? "outlined" : "contained"}
              onClick={() => {
                if (!route) {
                  return dispatch(jobActions.setState({ editMode: false }));
                }
                router.back();
                dispatch(jobActions.setState({ editMode: false }));
              }}
              color={defaultData?.form ? "primary" : "error"}
            >
              Cancel
            </Button>
            {!defaultData?.form ? (
              <Button
                variant="outlined"
                type="button"
                color="primary"
                onClick={() => {
                  setIsPreviewModalOpen(true);
                }}
              >
                Preview
              </Button>
            ) : null}
            <Button variant="contained" type="submit" color="primary">
              {formMode === "new-form" ? "Create" : "Update"}
            </Button>
          </Grid>
        </FormProvider>
      </Grid>

      {/* Modals */}

      {modals.question && (
        <QuestionsModal
          open={modals.question}
          onClose={(state) => {
            setModals((prev) => ({ ...prev, question: state }));
          }}
          submittedData={(question) => {
            setModalsData((prev) => ({
              ...prev,
              question: [...prev.question, question],
            }));
          }}
          questionsDetails={modalsData.question}
        />
      )}
      {modals.sectionHeader && (
        <SectionHeaderModal
          open={modals.sectionHeader}
          onClose={(state) => {
            setModals((prev) => ({ ...prev, sectionHeader: state }));
          }}
          submittedData={({ sectionHeader }) => {
            setModalsData((prev) => ({ ...prev, sectionHeader }));
          }}
        />
      )}
      {modals.statement && (
        <StatementModal
          open={modals.statement}
          onClose={(state) => {
            setModals((prev) => ({ ...prev, statement: state }));
          }}
          submittedData={({ statement }) => {
            setModalsData((prev) => ({ ...prev, statement }));
          }}
        />
      )}
      {isPreviewModalOpen && (
        <PreviewFormModal
          open={isPreviewModalOpen}
          setOpen={setIsPreviewModalOpen}
          formData={modalsData.sections}
          headerLabel={
            watch("formName") ||
            (Boolean(!modalsData.sections.length) && "Nothing to Show")
          }
        />
      )}
    </Grid>
  );
}
const styles = {
  formContainer: {
    overflow: "auto",
    height: "100%",
    pb: 6,

    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cacaca",
      borderRadius: "10px",
    },
  },
  section: {
    p: 2,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 1,
    mb: 2,
  },
};

function DisplayChips(props): JSX.Element {
  const { section, type, itemToDelete } = props;
  const [openSection, setOpenSection] = useState<any>(false);
  return (
    <Box sx={{ color: type === "questions" ? "success.main" : "unset" }}>
      {type === "questions"
        ? `${section.length} Question(s) added`
        : `${section.length} Section(s) added`}
      <Box>
        {type !== "questions" &&
          section?.map((item, index) => (
            <Chip
              onClick={() => {
                setOpenSection(item);
              }}
              key={item.name !== "" ? item.name : index}
              label={
                item.name !== ""
                  ? `${
                      item.name.length > 20
                        ? `...${item.name.slice(-20)}`
                        : item.name
                    }`
                  : `Section#${index + 1}`
              }
              onDelete={() => {
                itemToDelete(item);
              }}
              sx={{ mr: 1, my: 1 }}
            />
          ))}
      </Box>
      {/* open individual Section */}
      {openSection && (
        <PreviewFormModal
          open={openSection}
          setOpen={setOpenSection}
          formData={[openSection]}
          headerLabel={openSection?.name || "No Section Name"}
        />
      )}
    </Box>
  );
}
function QuestionnaireButtons(props): JSX.Element {
  const { setModals, modalsData, addMoreSectionsHandler } = props;
  return (
    <Box display="flex" alignItems="center" gap={1} mt={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Add :
      </Typography>

      <Button
        variant="outlined"
        sx={{ color: "text.secondary", p: 0.5, fontSize: 14 }}
        onClick={() => {
          setModals((prev) => ({ ...prev, question: true }));
        }}
      >
        Question
      </Button>
      <Button
        variant="outlined"
        sx={{ color: "text.secondary", p: 0.5, fontSize: 14 }}
        onClick={() => {
          setModals((prev) => ({ ...prev, sectionHeader: true }));
        }}
      >
        Section Header
      </Button>
      <Button
        variant="outlined"
        sx={{ color: "text.secondary", p: 0.5, fontSize: 14 }}
        onClick={() => {
          setModals((prev) => ({ ...prev, statement: true }));
        }}
      >
        Statement
      </Button>
      {Boolean(modalsData.question.length) && (
        <Button onClick={addMoreSectionsHandler}>Add to Section</Button>
      )}
    </Box>
  );
}

function PreviewFormModal(props): JSX.Element {
  const { open, setOpen, formData, headerLabel } = props;
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      rootSx={{ width: 700, maxHeight: "60vh", overflow: "auto" }}
      headerLabel={headerLabel}
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
    >
      <FormPreview formData={formData} disabled />
    </CustomModal>
  );
}
