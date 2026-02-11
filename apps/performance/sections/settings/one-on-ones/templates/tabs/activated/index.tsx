import { useState, type ChangeEvent } from "react";
import { Box, Card, Grid, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "@assets/icons";
import { useGetTemplatesQuery } from "@services/settings/one-on-ones/templetes-api";
import { TamplateCard } from "@sections/settings/one-on-ones/templates/tamplate-card/index";
import { PERMISSIONS } from "@enums/permissions";
import { ComponentLoader } from "@components/component-loader";

let timer: ReturnType<typeof setTimeout>;

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S.TEMPLATES;

export function Activated(): JSX.Element {
  const [searchValue, setSearchValue] = useState();
  const { data: templatesData, isLoading } = useGetTemplatesQuery({
    status: "activated",
    search: searchValue,
    limit: 50,
    offset: 0,
  });

  const activeDropdownValues = [
    { text: "Preview", permission: PERMISSION.PREVIEW },
    { text: "Deactivate", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
    { text: "Duplicate", permission: PERMISSION.DUPLICATE },
    { text: "Edit", permission: PERMISSION.EDIT },
    { text: "Delete", permission: PERMISSION.DELETE },
  ];

  const duplicateValue = [
    { text: "Preview", permission: PERMISSION.PREVIEW },
    { text: "Deactivate", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
    { text: "Edit", permission: PERMISSION.EDIT },
    { text: "Delete", permission: PERMISSION.DELETE },
  ];

  const builtInTampleteValue = [
    { text: "Preview", permission: PERMISSION.PREVIEW },
    { text: "Deactivate", permission: PERMISSION.ACTIVATE_OR_DEACTIVATE },
    { text: "Duplicate", permission: PERMISSION.DUPLICATE },
  ];

  function handleSearch(value): void {
    setSearchValue(value);
  }

  function changeHandler({ target: { value } }: ChangeEvent<HTMLInputElement>): void {
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
              {templatesData?.data?.oneOnOneTemplate.length ? (
                templatesData?.data?.oneOnOneTemplate.map((item: any) => {
                  let dropdownValues;

                  if (!item?.duplicate) {
                    dropdownValues = duplicateValue;
                  } else if (item?.builtIn) {
                    dropdownValues = builtInTampleteValue;
                  } else {
                    dropdownValues = activeDropdownValues;
                  }

                  return (
                    <Grid key={item._id} item xs={12} lg={6}>
                      <TamplateCard
                        comapyLogo={item?.company?.logo}
                        id={item?._id}
                        name={item?.company?.title}
                        title={item?.title}
                        description={item?.description}
                        visibility={item?.visibility}
                        dropdownValues={dropdownValues}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12} sx={{ textAlign: "center", color: "primary.main" }}>
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
