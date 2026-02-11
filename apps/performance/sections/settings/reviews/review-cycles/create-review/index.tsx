"use client";
import CustomCard from "@components/custom-card";
import { FormProvider } from "@root/../../packages/common";
import { Button, DialogActions } from "@mui/material";
import { ReviewCycleInformation } from "../review-form-components/review-cycle-information";
import { ReviewDirection } from "../review-form-components/review-direction";
import { ChooseTemplate } from "../review-form-components/choose-template";
import { Schedule } from "../review-form-components/schedule";
import { Sharing } from "../review-form-components/sharing";
import { useCreateReview } from "./use-create-review";
import SelectEmployeesModal from "@components/select-employees-modal";
import { PreviewModalComp } from "./preview-modal";
import Link from "next/link";

interface Props {
  edit?: boolean;
}
export function CreateReview({ edit }: Props): JSX.Element {
  const {
    methods,
    handleSubmit,
    onSubmit,
    onBack,
    handleSelectEmployees,
    selectEmployeesModal,
    handleAddEmployees,
    handlePreviewModal,
    previewModal,
    watch,
    handleEmployeeChange,
    setLaunchStatus,
    selectEmployees,
    templatePreviewId
  } = useCreateReview();

  return (
    <CustomCard
      header
      cardHeader={{
        title: `${edit ? "Edit" : "New"} Review Cycle`,
        onBack,
        divider: true,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ReviewCycleInformation handleEmployeeChange={handleEmployeeChange} />
        <ReviewDirection watch={watch} />
        <ChooseTemplate watch={watch} handlePreviewModal={handlePreviewModal} />
        <Schedule />
        <Sharing />
        <DialogActions>
          <Button variant="outlined" type="submit" onClick={() => { setLaunchStatus('DRAFT') }}>Save Draft</Button>
          <Link href='/settings/reviews/review-cycles'><Button variant="outlined">Cancel</Button></Link>
          <Button variant="contained" type="submit">
            Launch
          </Button>
        </DialogActions>
      </FormProvider>

      {selectEmployeesModal && (
        <SelectEmployeesModal
          headerLabel="Select employees"
          key="reviewsAddEmployees"
          isOpen={selectEmployeesModal}
          setIsOpen={handleSelectEmployees}
          buttonTitle="Add"
          onAdd={handleAddEmployees}
          selectedMember={selectEmployees}
        />
      )}
      
      {previewModal && (
        <PreviewModalComp
          open={previewModal}
          onClose={() => { handlePreviewModal(null) }}
          templateId={templatePreviewId}
        />
      )}
    </CustomCard>
  );
}
