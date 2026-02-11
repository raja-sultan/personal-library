import { CustomTableWithHeader } from "@components/custom-table-with-header";

export function Reviewees({ data }): JSX.Element {

  return (
    <CustomTableWithHeader key='reviewees' tableProps={data} />
  )
}