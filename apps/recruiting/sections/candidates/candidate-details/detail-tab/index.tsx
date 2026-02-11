import { Button, Grid, Stack, Typography } from "@mui/material";
import { NameAndCompanyModal } from "../name-and-company-modal";
import { useState } from "react";
import { useGetDetailTabDataApiQuery } from "@services/candidate/detail-tab/detail-tab-api";
import { useSearchParams } from "next/navigation";
import { awsBaseUrl } from "@root/config";

export function DetailTab(): JSX.Element {
  const [jobInfo, setJobInfo] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateID");
  const { data } = useGetDetailTabDataApiQuery({ candidateId });

  const profileData = {
    info: [
      {
        label: "Other Phone Number",
        value: data?.data?.info?.phone?.phoneNumber ?? "---",
      },
      {
        label: "Personal Email",
        value: data?.data?.info?.email?.emailAddress ?? "---",
      },
      {
        label: "Education",
        value: (
          <pre style={{ margin: "0px", fontFamily: "inherit" }}>
            {data?.data?.education instanceof Array
              ? data?.data?.education?.map((items: any) => {
                  return `${items?.degree}\n`;
                })
              : "---"}
          </pre>
        ),
      },
    ],
    gdpr: [
      { label: "Rule", value: data?.data?.gdbr ?? "---" },
      { label: "Data due to be deleted on", value: data?.data?.gdbr ?? "---" },
    ],
    sourceAndResponsibility: [
      { label: "Source", value: data?.data?.detail?.source ?? "---" },
      {
        label: "Recruiter",
        value: data?.data?.candidateResponsibleFor?.recruiter ?? "---",
      },
      {
        label: "Coordinator",
        value: data?.data?.candidateResponsibleFor?.coordinator ?? "---",
      },
    ],
  };
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        sx={{
          height: "60vh",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grid item xs={12}>
          <Stack direction="row-reverse">
            <Button
              variant="outlined"
              onClick={() => {
                setJobInfo(true);
              }}
            >
              Edit
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Info</Typography>
        </Grid>
        {profileData.info.map((item) => {
          return (
            <Grid
              item
              sm={4}
              xs={6}
              key={item.value}
              sx={{ pl: { md: 5, xs: 1 } }}
            >
              <Typography variant="body1" fontWeight={500}>
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.disabled"
              >
                {item.value}
              </Typography>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Typography variant="h6">GDPR</Typography>
        </Grid>
        {profileData.gdpr.map((item) => {
          return (
            <Grid
              item
              sm={4}
              xs={6}
              key={item.value}
              sx={{ pl: { md: 5, xs: 1 } }}
            >
              <Typography variant="body1" fontWeight={500}>
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.disabled"
              >
                {item.value}
              </Typography>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Typography variant="h6">Source & Responsibility</Typography>
        </Grid>
        {profileData.sourceAndResponsibility.map((item) => {
          return (
            <Grid
              item
              sm={4}
              xs={6}
              key={item.value}
              sx={{ pl: { md: 5, xs: 1 } }}
            >
              <Typography variant="body1" fontWeight={500}>
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.disabled"
              >
                {item.value}
              </Typography>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Typography variant="h6">All Attachments</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mt: 2 }}>
            People Operations Coordinator (8)
          </Typography>
          {data?.data?.resume && (
            <div>
              <iframe
                title="Resume"
                height="500"
                src={`https://docs.google.com/gview?url=${
                  awsBaseUrl + data?.data?.resume
                }&embedded=true`}
                frameBorder="0"
              />
            </div>
          )}
        </Grid>
      </Grid>
      <NameAndCompanyModal jobInfo={jobInfo} setJobInfo={setJobInfo} />
    </>
  );
}
