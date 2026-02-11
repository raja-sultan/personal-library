import { ClipboardIcon } from "@assets/icons/clipboard-icon";
import { EditIcon } from "@assets/icons/edit-icon";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import { NameAndCompanyModal } from "./name-and-company-modal";
import { useState } from "react";
import { CvPreviewModal } from "./cv-preview-modal";
import styled from "@emotion/styled";
import { ApplicationTabSection } from "./application-candidate-tab";
import { MakeANote } from "./make-a-note";
import { CandidateTags } from "./candidate-tags";
import { FollowUpReminder } from "./follow-up-reminder";
import Tools from "./tools";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useGetDetailTabDataApiQuery } from "@services/candidate/detail-tab/detail-tab-api";

export function CandidateDetail(): any {
  const theme = useTheme();
  const router = useRouter();
  const [jobInfo, setJobInfo] = useState<boolean>(false);
  const [cvPreview, setCvPreview] = useState<boolean>(false);
  const params = useSearchParams();
  const candidateId = params.get("candidateID");
  const { data, refetch, isSuccess, isError } = useGetDetailTabDataApiQuery({
    candidateId,
  });
  // console.log(data);

  if (isError) {
    toast.error("candidate not found!");
    router.push("/candidates");
    return;
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: "10px",
          p: 2,
          height: "76vh",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <StyledLink href="/candidates">
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.primary.main, fontWeight: "600" }}
          >
            Back to search results
          </Typography>
        </StyledLink>

        <Box sx={{ py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isSuccess ? (
              <Typography variant="h6">{`${data?.data?.nameAndCompany?.firstName} ${data?.data?.nameAndCompany?.lastName}`}</Typography>
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height={30}
                sx={{ borderRadius: 0.5 }}
              />
            )}
            <Button
              sx={{ minWidth: 0, p: 0.5, ml: 2 }}
              onClick={() => {
                setCvPreview(true);
              }}
            >
              <ClipboardIcon />
            </Button>
            <Button
              sx={{ minWidth: 0, p: 0.5 }}
              onClick={() => {
                setJobInfo(true);
              }}
            >
              <EditIcon />
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" gap={0.2}>
            {isSuccess ? (
              <Typography variant="body2">
                {data?.data?.info?.email?.emailAddress}
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height={30}
                sx={{ borderRadius: 0.5 }}
              />
            )}
            {isSuccess ? (
              <Typography variant="body2">
                {data?.data?.info?.phone?.phoneNumber}
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="10%"
                height={30}
                sx={{ borderRadius: 0.5 }}
              />
            )}
          </Box>
        </Box>

        <Grid container>
          <Grid item xs={12} lg={9}>
            <Box sx={{ my: 2 }}>
              <ApplicationTabSection />
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box sx={{ p: 2 }}>
              <FollowUpReminder
                reminderForList={data?.data?.candidateResponsibleFor}
              />
              <MakeANote notes={data?.data?.notes} refetch={refetch} />
              <CandidateTags
                candidateTags={data?.data?.nameAndCompany?.candidateTags}
                refetch={refetch}
              />
              <Tools />
            </Box>
          </Grid>
        </Grid>
      </Card>
      <NameAndCompanyModal jobInfo={jobInfo} setJobInfo={setJobInfo} />
      <CvPreviewModal
        cvPreview={cvPreview}
        setCvPreview={setCvPreview}
        resume={data?.data?.resume}
      />
    </>
  );
}

const StyledLink = styled(Link)({
  textDecoration: "none",
});
