"use client";

import { Button } from "@mui/material";

import CustomCard from "@components/custom-card";
import HorizontalTabs from "@components/horizontal-tab";
import { useUserAttributes } from "./use-user-attributes";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { useAttributesListQuery } from "@services/settings/people/user-attribute-api";
import { useRouter } from "next/navigation";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const {PERMISSION} = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.USER_ATTRIBUTES;

export function UserAtributes(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "User attributes",
          description: `User attributes appear in the "Details" section of each employee's profile. Create additional custom attributes to filter and group employees in our data analytics products. `,
          actions: (
            <PermissionProtected permission={PERMISSION.CREATE}>
              <Button
                onClick={() => {
                  router.push("/settings/user-attributes/create");
                }}
                variant="contained"
              >
                Create Attribute
              </Button>
            </PermissionProtected>
          ),
        }}
      />
      <br />
      <HorizontalTabs tabsArray={["Active", "Archived"]}>
        <FilteredData archived={false} />
        <FilteredData archived />
      </HorizontalTabs>
    </>
  );
}

function FilteredData({ archived }: { archived: boolean }): JSX.Element {
  const { columns, offset, searchValue, setSearchValue, handleOffset } = useUserAttributes();

  const limit = 10;
  const { data, isLoading, isFetching, isSuccess, isError } = useAttributesListQuery({
    limit,
    offset,
    search: searchValue,
    archived,
  });

  return (
    <CustomTableWithHeader
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch: (value: string) => {
          setSearchValue(value);
        },
      }}
      tableProps={{
        data: data?.data?.userAttributes,
        columns,
        isSuccess,
        isFetching,
        isLoading,
        isError,
        totalPages: data?.data?.meta?.pages,
        currentPage: data?.data?.meta?.page,
        onPageChange: handleOffset,
        onSortByChange: (onSortData: any) => {
          return onSortData;
        },
      }}
    />
  );
}
