"use client";
import Link from "next/link";
import CustomCard from "@components/custom-card";
import { useOneOnOnes } from "./use-one-on-ones";
import { NoDataFound } from "@components/no-data";
import { OneOnOneDataNotFound } from "@assets/icons";
import { Button } from "@mui/material";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomLoader } from "@components/loader";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S._1_ON_1S;


export function OneOnOnesSection({
  title = "My 1-on-1s",
  createBtnText = "Create 1-on-1",
}: {
  title?: string;
  createBtnText?: string;
}): JSX.Element {
  const { tableData, handleSearch, initialData } = useOneOnOnes();

  const headers = {
    title,
    description: "Create 1:1 meeting with your people",
    actions: (
      <>
        <Link href="/one-on-ones/manage-templates">
          <Button variant="outlined" size="small">
            Manage Templates
          </Button>
        </Link>
        <PermissionProtected permission={PERMISSION.CREATE}>
          <Link href="/one-on-ones/create">
            <Button variant="contained" size="small">
              {createBtnText}
            </Button>
          </Link>
        </PermissionProtected>
      </>
    ),
  };

  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
      {!tableData?.isLoading && !initialData?.length && !tableData?.data && (
        <CustomCard
          subHeader
          cardProps={{ sx: { minHeight: "75vh" } }}
          cardSubHeader={headers}
        >
          <NoDataFound
            icon={<OneOnOneDataNotFound sx={{ marginBottom: "2rem" }} />}
            isCustomCard={false}
            heading="No 1:1 meetings found"
            description="It looks like you don't have any one-on-one meetings set up yet. Meeting one-on-one is an excellent way to stay in touch and track progress together. Collaborate on an agenda, assign action items, and take notes."
            buttonText="Set up your first 1:1 meeting"
          />
        </CustomCard>
      )}
      {!tableData?.isLoading && !(!initialData?.length && !tableData?.data) && (
        <CustomTableWithHeader
          primaryHeader
          secondaryHeader
          tableProps={tableData}
          primaryHeaderProps={headers}
          secondaryHeaderProps={{ handleSearch }}
        />
      )}
    </>
  );
}
