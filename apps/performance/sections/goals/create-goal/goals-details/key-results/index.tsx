"use client";
import {
  Box,
  Grid,
} from "@mui/material";
import { NoDataFound } from "@components/no-data";
import CustomModal from "@components/custom-modal";
import { CustomKeyResults } from "@components/custom-key-results";
import { useKeyResults } from "./use-key-results";
import { keyResultsStyles } from "./key-results-styles";
import { useRouter } from "next/navigation";
import { useGetKeyResultByGoalIdQuery } from "@services/goals/goals.api";
import { CheckInModal } from "./check-in-modal";
import { CustomLoader } from "@components/loader";


// ===================================================

export function KeyResults({ query, goalId }: any): React.JSX.Element {
  const {
    checkInHandler,
    isCheckIn,
    deleteUser,
    handleCheckInModal,
    handleDeleteUserModal,
    handleDelete,
    handleDeleteUserConfirm,
    currKey,
    handleIncrease,
    handleBinaryChange,
    handleSave,
    isUpdateKeyResultLoading,
    isDeleteLoading
  } = useKeyResults(goalId);

  const { data: getDataOfKeyResultById, isLoading } = useGetKeyResultByGoalIdQuery({
    id: query || goalId,
  });

  const styles = keyResultsStyles();
  const router = useRouter();

  return (
    <Box marginTop="2rem">
      {isLoading && <CustomLoader />}
      {getDataOfKeyResultById?.data?.keyresults?.length === 0 || getDataOfKeyResultById === undefined ? (
        <NoDataFound
          isCustomCard={false}
          heading="There are no key results created"
          description="Create key results that help you track your goals and gauge progress in a quantifiable way."
        />
      ) : (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={styles.keyResultCardWrapStyle}
        >
          {getDataOfKeyResultById?.data?.keyresults?.map((obj: any) => {
            // const progressValue: any = obj?.type === "Currency" ? `£ ${obj?.current}`: obj?.type === "Number"? `${obj?.current}`: obj?.type === "Percentage"? `${obj?.current} %`: obj?.type === "Binary"? `${obj?.current}`: "";
            const typeValueMap = {
              Currency: `£ ${obj?.current}`,
              Number: `${obj?.current}`,
              Percentage: `${obj?.current} %`,
              Binary: `${obj?.current}`,
            };
            
            const progressValue: any = typeValueMap[obj?.type] || "";
            const valueCheck = (obj?.current / (obj?.target - obj?.start)) * 100;
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={obj?._id}>
                <CustomKeyResults
                  {...obj}
                  startValue={obj?.type === "Binary" ? 0 : obj?.start}
                  targetValue={obj?.type === "Binary" ? 1 : obj?.target}
                  title={obj?.name}
                  percentage={progressValue}
                  progress={valueCheck}
                  handleCheckIn={() => {
                    checkInHandler({ ...obj, valueCheck });
                  }}
                  onDeleteClick={() => {
                    handleDelete(obj?._id);
                  }}
                  onEditClick={() => {
                    router.push(
                      `/goals/create-goal/goal-details/edit-key-result?goalId=${goalId}&id=${obj?._id}&actionType=edit`
                    );
                  }}
                  query={query}
                  owner = {obj?.owner[0]}
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {deleteUser && (
        <CustomModal
          isLoading={isDeleteLoading}
          open={deleteUser}
          onClose={handleDeleteUserModal}
          acceptButtonProps={{ onClick: handleDeleteUserConfirm }}
        />
      )}
      {isCheckIn && <CheckInModal
        title={currKey?.name}
        open={isCheckIn}
        onClose={handleCheckInModal}
        currentValue={currKey?.current}
        value={currKey?.valueCheck}
        start={currKey?.type === 'Binary' ? 0 : currKey?.start}
        target={currKey?.type === 'Binary' ? 1 : currKey?.target}
        type={currKey?.type}
        handleBinaryChange={handleBinaryChange}
        handleIncrease={handleIncrease}
        handleDecrease={handleIncrease}
        handleSave={handleSave}
        isLoading={isUpdateKeyResultLoading}
      />}
    </Box>
  );
}

