import { CustomTableWithHeader } from '@components/custom-table-with-header'
import React from 'react'
import { DetailDrawer } from '../detail-drawer'
import { useCompanyResults } from './use-comapny-result'

export function CompanyResult(): JSX.Element {

  const { tableData, detailDrawer, handleDetailDrawer, singleCompanyResult,
    singleCompanyLoading } = useCompanyResults()

  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        tableProps={tableData}
      />

      {detailDrawer && <DetailDrawer
        open={Boolean(detailDrawer) && !singleCompanyLoading}
        data={singleCompanyResult?.data}
        onClose={() => { handleDetailDrawer(null) }}
      />}


    </>
  )

}