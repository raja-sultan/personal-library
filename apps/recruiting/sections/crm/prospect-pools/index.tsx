import { Button, Grid, Popover, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import {
  FormProvider,
  IsFetching,
  NoContent,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { reportsData, resourcesData } from "./prospect-pools.data";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { ArrowDownIcon, PersonIcon } from "@assets/icons";
import React, { useState } from "react";
import { EventWidget } from "../events/event-widget";
import { useRouter } from "next/navigation";
import {
  useGetCRMDepartmentListQuery,
  useGetCRMOfficeListQuery,
  useGetCRMProspectPoolsQuery,
} from "@services/crm/prospect-pools/prospect-pools-api";
import { ProspectPoolAccordion } from "./prospect-pools-accordion";

export function ProspectPools(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [prospect, setProspect] = useState<HTMLButtonElement | null>(null);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const addProspect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProspect(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeProspect = () => {
    setProspect(null);
  };

  const open = Boolean(anchorEl);
  const prospectOpen = Boolean(prospect);
  const id = open ? "simple-popover" : undefined;
  const [search, setSearch] = useState<any>("");
  const [department, setDepartment] = useState<any>("");
  const [office, setOffice] = useState<any>("");
  const [prospectOwnByMe, setProspectOwnByMe] = useState<boolean>(false);
  const [archivedPools, setArchivedPools] = useState<boolean>(false);

  const handleCheckboxChange = (event: any) => {
    const { checked } = event.target;
    setProspectOwnByMe(checked);
  };
  const handleCheckboxArchivedPools = (event: any) => {
    const { checked } = event.target;
    setArchivedPools(checked);
  };
  const router = useRouter();
  const theme = useTheme();
  const methods = useForm();
  const { handleSubmit } = methods;
  function onSubmit(): void {}

  const { data, isLoading, isError, isSuccess } = useGetCRMProspectPoolsQuery({
    search,
    department,
    office,
    prospectsOwnByMe: prospectOwnByMe,
    archivedPools,
  });

  const { data: departments } = useGetCRMDepartmentListQuery({});
  const { data: offices } = useGetCRMOfficeListQuery({});

  const departmentData = departments?.data?.map((item: any) => ({
    label: item?.departmentName,
    value: item?.departmentName,
  }));
  const officeData = offices?.data?.map((item: any) => ({
    label: item?.officeName,
    value: item?.officeName,
  }));

  return (
    <>
      <Typography
        fontWeight={600}
        variant="h4"
        pb={2}
        sx={{
          color: "text.primary",
        }}
      >
        CRM
      </Typography>
      <Grid container direction="row" pb={1}>
        <Grid item md={8} xs={12} container gap={10}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
              <div>
                <Button
                  sx={{
                    bgcolor: theme?.palette?.background?.paper,
                    color: theme.palette.neutral[500],
                    border: "1px solid #D0D5DD",
                    borderRadius: "10px",
                  }}
                  aria-describedby={id}
                  variant="outlined"
                  endIcon={
                    <ArrowDownIcon sx={{ ml: 15 }} width="12px" height="12px" />
                  }
                  onClick={handlePopover}
                >
                  Filter Pools
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column" px={2}>
                    <Typography variant="h6" py={2} fontWeight={600}>
                      Filter by an attribute
                    </Typography>
                    <Box display="flex" gap={2} flexWrap="wrap">
                      <RHFCustomSelect
                        sx={{ width: { md: 300, xs: 250 } }}
                        fullWidth={false}
                        placeholder="All Department"
                        name="allDepartment"
                        value={department}
                        onChange={(e: any) => {
                          setDepartment(e.target.value);
                        }}
                        options={departmentData}
                      />
                      <RHFCustomSelect
                        sx={{ width: { md: 300, xs: 250 } }}
                        fullWidth={false}
                        placeholder="All Offices"
                        name="allOffices"
                        options={officeData}
                        value={office}
                        onChange={(e: any) => {
                          setOffice(e.target.value);
                        }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      py={1}
                    >
                      <RHFCheckbox
                        name="prospectOwnByMe"
                        label="Prospect own by me"
                        onChange={handleCheckboxChange}
                      />

                      <RHFCheckbox
                        name="archivedPools"
                        label="Archived pools"
                        onChange={handleCheckboxArchivedPools}
                      />
                    </Box>
                  </Grid>
                </Popover>
              </div>
              <RHFTextField
                name="search"
                sx={{
                  width: { md: 300, xs: 220 },
                  bgcolor: theme?.palette?.background?.paper,
                  color: theme.palette.neutral[500],
                  border: "1px solid #D0D5DD",
                  borderRadius: "10px",
                }}
                value={search}
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
                EndIcon={<SearchIcon />}
              />
            </Box>
          </FormProvider>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="end"
          gap={2}
          item
          md={4}
          xs={12}
        >
          <Button variant="outlined" onClick={addProspect}>
            Add Prospect
          </Button>
          <Popover
            id={id}
            open={prospectOpen}
            anchorEl={prospect}
            onClose={closeProspect}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Grid container direction="column" px={2}>
              <Typography
                variant="body2"
                py={1}
                fontWeight={400}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  router.push("/add-candidate");
                }}
              >
                Add individual Prospect
              </Typography>
              <Typography variant="body2" pb={1} fontWeight={400}>
                Bulk import prospect
              </Typography>
            </Grid>
          </Popover>
          <Button
            variant="contained"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/configure-pool");
            }}
          >
            Configure CRM
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item md={8.7} xs={12} bgcolor={theme?.palette?.background?.paper}>
          <Box display="flex" alignContent="center" alignItems="center">
            <Typography fontWeight={600} p={2} variant="h5">
              Prospect Pools
            </Typography>
          </Box>
          <Box px={2} pb={2}>
            {isLoading && (
              <Box position="relative" height="50vh">
                <IsFetching isFetching />
              </Box>
            )}
            {isError && (
              <Box display="flex" justifyContent="center" mt={2}>
                <NoContent />
              </Box>
            )}
            {isSuccess && (
              <>
                <Box
                  // pr={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ backgroundColor: "background.default" }}
                  p={2}
                  px={3}
                >
                  <Typography fontWeight={600} variant="h6">
                    All Prospect
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<PersonIcon />}
                    variant="contained"
                  >
                    {data?.data.allProspects}
                  </Button>
                </Box>
                {data?.data.prospectPoolsWithStages.map((item: any) => (
                  <ProspectPoolAccordion
                    title={item?.poolName}
                    inlineHeaderRequired
                    key={item?._id}
                    subTitle={item?.poolDescription}
                    poolCount={item?.poolCount}
                    prospect={data}
                    poolStagesArray={item?.poolStages}
                  />
                ))}
              </>
            )}

            {/* <Box
              mt={2}
              pr={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ backgroundColor: "background.default" }}
            >
              <Box>
                <Typography fontWeight={600} pl={2} pt={2} variant="h6">
                  Prospects without a pool
                </Typography>
                <Typography variant="body2" pl={2}>
                  Prospects for roles that are not currently open and have
                  expressed general interest in your company
                </Typography>
              </Box>
              <Button
                sx={{ borderRadius: 0.5 }}
                startIcon={<PersonIcon />}
                variant="contained"
                size="small"
              >
                {data?.data.map((item: any) => item?.prospectsWithoutPool)}
              </Button>
            </Box> */}
          </Box>
        </Grid>
        <Grid item md={3.1} xs={12}>
          <Grid
            borderRadius={1}
            bgcolor={theme?.palette?.background?.paper}
            direction="column"
            container
            py={1}
            px={2}
            mb={3}
          >
            <Typography variant="h5" fontWeight={600} pt={0.5} pb={1}>
              Resources
            </Typography>
            {resourcesData?.map((ele) => (
              <Grid
                key={ele?.id}
                container
                gap={1.5}
                my={1}
                alignItems="start"
                color={theme.palette.primary?.main}
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{ fontSize: theme.typography?.h5 }}
                />
                <Typography variant="body2">{ele?.title}</Typography>
              </Grid>
            ))}
          </Grid>

          <Grid
            borderRadius={1}
            bgcolor={theme?.palette?.background?.paper}
            direction="column"
            container
            py={2}
            px={2}
            mb={3}
          >
            <EventWidget />
          </Grid>

          <Grid
            borderRadius={1}
            bgcolor={theme?.palette?.background?.paper}
            direction="column"
            container
            py={1}
            px={2}
            mb={3}
          >
            <Typography variant="h5" fontWeight={600} pt={0.5} pb={1}>
              Reports
            </Typography>
            {reportsData?.map((ele) => (
              <Grid
                key={ele?.id}
                container
                gap={1.5}
                my={1}
                alignItems="start"
                color={theme.palette.primary?.main}
              >
                <Typography variant="body2">{ele?.title}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
