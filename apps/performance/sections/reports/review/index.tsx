import React from 'react'
import { useReview } from '@sections/reports/review/use-review';
import { CustomHeaderTableTabs } from '@components/custom-header-table-tabs';
import { CustomPopover } from '@components/custom-popover';
import { CustomLoader } from '@components/loader';

export function Review(): React.JSX.Element {
  const { tableData, handleSearch, handleFilter } = useReview();
  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            actions: (
              <CustomPopover
                btnText="All Stages"
                options={["all stages", "Active", "Ended",]}
                handleChange={handleFilter}
              />
            ),
            handleSearch,
          },
          tableProps: tableData,
        }}
      />
    </>

  );
}