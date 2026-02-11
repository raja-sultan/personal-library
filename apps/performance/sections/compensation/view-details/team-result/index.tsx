import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Button } from "@mui/material";
import {
  useTeamResult,
  styles,
} from "@sections/compensation/view-details/team-result/use-team-result";
import { DetailDrawer } from "@sections/compensation/view-details/detail-drawer";


export function TeamResult({ _id }): JSX.Element {
  const {
    tableData,
    detailDrawer,
    handleDetailDrawer,
    singleTeamResult,
    singleTeamLoading,
    sharedAllHandler,
    hasTrueValue,
  } = useTeamResult({ _id });

  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          actions: (
            <Button
              sx={styles.button(hasTrueValue)}
              onClick={sharedAllHandler}
              variant={hasTrueValue ? "contained" : "outlined"}
            >
              {hasTrueValue ? "Shared All" : "Share All"}
            </Button>
          ),
        }}
        tableProps={tableData}
      />

      {detailDrawer && (
        <DetailDrawer
          open={Boolean(detailDrawer) && !singleTeamLoading}
          onClose={() => {
            handleDetailDrawer(null);
          }}
          data={singleTeamResult?.data}
          buttonText
          _id={_id}
        />
      )}
    </>
  );
}
