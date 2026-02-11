"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import CustomCard from "@components/custom-card";
import { CustomLoader } from "@components/loader";
import { renderUserImage } from "@root/utils/render-user-image";
import { useGetUserReviewIdQuery } from "@services/user-review/user-review-api";
import PerformReviewForm from "./perform-review-form";
import { styles } from "./styles";

function PerformReviewsSection(): JSX.Element {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const userStatus = useSearchParams().get("status");
  const templateId = useSearchParams().get("templateId");
  const reviewType = useSearchParams().get("reviewType");
  const backPath = useSearchParams().get("back");

  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedReview, setSelectedReview] = useState<Record<
    string,
    string
  > | null>(null);
  const [active, setActive] = useState<number | null>(0);

  const { data: getReviewCycle, isLoading } = useGetUserReviewIdQuery({ id });
  const launchStatus = getReviewCycle?.data?.launchStatus;


  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setActive(null);
    };

  const sortedReviews = getReviewCycle?.data?.reviewTypes
    ?.slice()
    .sort((a, b) => {
      const sortOrder = {
        downward_review: 1,
        self_review: 2,
        upward_review: 3,
        peer_review: 4,
      };
      return sortOrder[a._id] - sortOrder[b._id];
    });
  function formatName(name: string): string {
    const [first, last] = name.split("_");
    return `${first} ${last}`;
  }
  function getTemplateId(reviewId: string): string | undefined {
    let tempId: string | undefined;
    if (reviewId === "self_review")
      tempId = getReviewCycle?.data?.selfReviewTemplate;
    if (reviewId === "downward_review")
      tempId = getReviewCycle?.data?.downwardReviewTemplate;
    if (reviewId === "upward_review")
      tempId = getReviewCycle?.data?.upwardReviewTemplate;
    if (reviewId === "peer_review")
      tempId = getReviewCycle?.data?.peerReviewTemplate;
    return tempId;
  }


  function handleReview(reviewId: string, status: string): void {
    router.push(
      `?id=${id}&templateId=${getTemplateId(reviewId)}&reviewType=${reviewId}&status=${status}`
    );
  }

  useEffect(() => {
    const firstReview = sortedReviews?.[0];
    const reviewId = firstReview?._id;
    if (firstReview) {
      setExpanded(reviewId);
      const user = firstReview?.user?.[0];
      setSelectedReview(user?.users);
      router.push(
        `?id=${id}&templateId=${getTemplateId(reviewId)}&reviewType=${reviewId}&status=${user?.status}`
      );
    }
  }, [getReviewCycle]);


  return (
    <>
      <CustomCard
        cardProps={{ sx: styles.topCard }}
        header
        cardHeader={{
          title: getReviewCycle?.data?.name ?? "--",
          onBack: () => {
            router.push(backPath ? "/profile" : "/reviews");
          },
        }}
      />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} xl={2.5} lg={3} md={3} width="100%">
            <CustomCard cardProps={{ sx: styles.leftCard }}>
              {sortedReviews?.length ? (
                sortedReviews?.map((review: any, i: number) => (
                  <Accordion
                    key={review?._id}
                    classes={{ expanded: "expanded", root: "_root" }}
                    sx={styles.accordion}
                    defaultExpanded={i === 0}
                    // expanded={launchStatus==="ENDED"? true  : review?._id === expanded}
                    expanded={review?._id === expanded}
                    onChange={handleChange(review?._id)}
                  >
                    <AccordionSummary
                      classes={{
                        expanded: "summary_expanded",
                        content: "content",
                      }}
                      sx={styles.accordionSummary}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={400}
                        textTransform="capitalize"
                      >
                        {formatName(review?._id)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="acc_Detail">
                      {review?.user?.map((obj: any, j: number) => (
                        <Box
                          key={obj?._id}
                          sx={styles.userWrapper}
                          className={active === j ? "active" : ""}
                          onClick={() => {
                            setActive(j);
                            setSelectedReview(obj?.users);
                          }}
                        >
                          {renderUserImage({
                            profileImage: obj?.users?.profileImage,
                            firstName: obj?.users?.firstName,
                            lastName: obj?.users?.lastName,
                            height: 32,
                            width: 32,
                          })}
                          <Box
                            flex={1}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              handleReview(review?._id, obj?.status);
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              textTransform="capitalize"
                            >
                              {obj?.users?.firstName} {obj?.users?.lastName}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              variant="subtitle2"
                              fontWeight={400}
                              textTransform="capitalize"
                            >
                              {obj?.users?.employeeTitle}
                            </Typography>
                          </Box>
                          {obj?.status === "COMPLETED" && (
                            <Radio name={obj?.users?._id + j} checked />
                          )}
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography ml={2} mt={2}>
                  No review available right now!
                </Typography>
              )}
            </CustomCard>
          </Grid>
          <Grid item xs={12} xl={9.5} lg={9} md={9} width="100%">
            <PerformReviewForm
              selectedReview={selectedReview}
              templateId={templateId}
              reviewType={reviewType}
              disabled={launchStatus === "ENDED"}
              id={id}
              userStatus={userStatus}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default PerformReviewsSection;
