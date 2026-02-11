import { CustomTableWithHeader } from "@components/custom-table-with-header";

export function Reviewers({ data }): JSX.Element {

  return (
    <CustomTableWithHeader key='reviewers' tableProps={data} />
  )
}