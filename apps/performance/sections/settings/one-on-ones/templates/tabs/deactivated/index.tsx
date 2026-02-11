import { useState, type ChangeEvent } from "react";
import { Box, Card, Grid, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "@assets/icons";
import { TamplateCard } from "../../tamplate-card";
import { useGetTemplatesQuery } from "@services/settings/one-on-ones/templetes-api";
import { PERMISSIONS } from "@enums/permissions";
import { ComponentLoader } from "@components/component-loader";

let timer: ReturnType<typeof setTimeout>;

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S.TEMPLATES;

const deactivatedDropdownValues = [
  { text: "Preview", permission: PERMISSION.PREVIEW },
  { text: "Activated", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
  { text: "Duplicate", permission: PERMISSION.DUPLICATE },
  { text: "Edit", permission: PERMISSION.EDIT },
  { text: "Delete", permission: PERMISSION.DELETE },
];


const duplicateValue = [
  { text: "Preview", permission: PERMISSION.PREVIEW },
  { text: "Activated", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
  { text: "Edit", permission: PERMISSION.EDIT },
  { text: "Delete", permission: PERMISSION.DELETE },
];

const defultTampleteValue = [
  { text: "Preview", permission: PERMISSION.PREVIEW },
  { text: "Activated", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
  { text: "Duplicate", permission: PERMISSION.DUPLICATE },
];

export function Deactivated(): JSX.Element {
  const [searchValue, setSearchValue] = useState();
  const { data: templatesData, isLoading } = useGetTemplatesQuery({
    status: "deactivated",
    search: searchValue,
    limit: 50,
    offset: 0,
  });

  function handleSearch(value): void {
    setSearchValue(value);
  }

  function changeHandler({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(value);
    }, 1500);
  }

  return (
    <Card sx={{ p: 2 }}>
      {isLoading ? <ComponentLoader /> :
        <>
          <TextField
            variant="outlined"
            name="search"
            placeholder="Search"
            onChange={changeHandler}
            sx={{
              minWidth: "320px",
              "& input::placeholder": {
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              },
            }}
            InputProps={{
              sx: { height: "44px", mb: 2 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box>
            <Grid container spacing={2}>
              {templatesData?.data?.oneOnOneTemplate?.length ? (
                templatesData?.data?.oneOnOneTemplate?.map((item: any) => {
                  let dropdownValues;

                  if (!item?.duplicate) {
                    dropdownValues = duplicateValue;
                  } else if (item?.builtIn) {
                    dropdownValues = defultTampleteValue;
                  } else {
                    dropdownValues = deactivatedDropdownValues;
                  }

                  return (
                    <Grid key={item._id} item xs={12} md={6}>
                      <TamplateCard
                        comapyLogo={item?.company?.logo}
                        id={item._id}
                        name={item?.company?.title}
                        title={item.title}
                        description={item.description}
                        visibility={item.visibility}
                        dropdownValues={dropdownValues}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: "center", color: "primary.main" }}
                >
                  No data
                </Grid>
              )}
            </Grid>
          </Box>
        </>
      }
    </Card>
  );
}
