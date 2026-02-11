import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
  styles,
} from "./focus-attributes.styles";
import { CustomAccordion, NoContentFound } from "common";
import toast from "react-hot-toast";
import { useFocusAttributes } from "./use-focus-attributes";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";

export function FocusAttributes(): JSX.Element {
  const {
    scoreCard,
    stagesAndInterviews,
    refetch,
    putFocusAttributes,
    isError,
    scoreCardLoading,
    tableContainerSX = {},
    theme,
    payload,
    setPayload,
  } = useFocusAttributes();

  if (scoreCardLoading) {
    return <StepperFormSkeleton />;
  }

  const updatePayload = async (
    interviewId: string,
    stageId: string,
    attributeName: string,
    checked: boolean,
    stageName: string // New parameter for stageName
  ) => {
    try {
      const updatedPayload: any = [...payload];

      const payloadIndex = updatedPayload.findIndex(
        (item: any) =>
          item.interviewId === interviewId && item.stageId === stageId
      );

      if (payloadIndex !== -1) {
        const focusAttributes: any =
          updatedPayload[payloadIndex].focusAttributes;

        const focusIndex = focusAttributes.findIndex(
          (focus) => focus.stageName === stageName
        );

        if (focusIndex !== -1) {
          const attrIndex = focusAttributes[focusIndex].attributes.findIndex(
            (attr) => attr.name === attributeName
          );

          if (attrIndex !== -1) {
            // Update isSelected status based on checked value
            focusAttributes[focusIndex].attributes[attrIndex].isSelected =
              checked;
          } else if (checked) {
            // If attribute not found and checkbox checked, add new attribute
            focusAttributes[focusIndex].attributes.push({
              name: attributeName,
              isSelected: true,
            });
          }
        } else if (checked) {
          // If focus not found and checkbox checked, add new focus with attribute
          updatedPayload[payloadIndex]?.focusAttributes?.push({
            stageName,
            attributes: [{ name: attributeName, isSelected: true }],
          });
        }
      } else if (checked) {
        updatedPayload.push({
          interviewId,
          stageId,
          focusAttributes: [
            {
              stageName,
              attributes: [{ name: attributeName, isSelected: true }],
            },
          ],
        });
      }

      await putFocusAttributes({
        params: {
          focusAttributesPerInterview: updatedPayload,
        },
      }).unwrap();

      setPayload(updatedPayload);
      toast.success("Focus Attributes Per Interview Updated Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.errors[0] ?? "Error Occurred");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Focus Attributes per interview
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 500, color: "text.secondary", mt: 0.5, mb: 3 }}
      >
        Mark which attributes should be focus attributes for interviews. Make
        sure each attribute is a focus attribute in at least one interview. This
        can also be done within each interview kit.
      </Typography>
      {scoreCard?.map((card) => (
        <CustomAccordion title={card.category ?? "-"} key={card._id}>
          <TableContainer sx={styles.tableContainer(tableContainerSX, theme)}>
            <Table stickyHeader>
              <TableHead>
                {/* Stages Rows */}
                <StyledTableRow>
                  <StyledTableCell>Stages</StyledTableCell>
                  {stagesAndInterviews?.data?.map((items) => (
                    <React.Fragment key={items._id}>
                      {items?.interviewPlan?.map((intPlan) => (
                        <StyledTableCell
                          colSpan={intPlan.interviews.length || 1}
                          key={intPlan._id}
                        >
                          {intPlan.stageName}
                        </StyledTableCell>
                      ))}
                    </React.Fragment>
                  ))}
                </StyledTableRow>
                {/* Interviews Rows */}
                <StyledTableRow>
                  <StyledTableCell sx={styles.cell}>Interviews</StyledTableCell>
                  {stagesAndInterviews?.data?.map((stage) => (
                    <React.Fragment key={stage._id}>
                      {stage?.interviewPlan?.map((item) => (
                        <React.Fragment key={item._id}>
                          {item?.interviews?.length === 0 ? (
                            <StyledTableCell>-</StyledTableCell>
                          ) : (
                            item?.interviews?.map((interview) => (
                              <StyledTableCell key={interview._id}>
                                {interview?.interviewName}
                              </StyledTableCell>
                            ))
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {/* Attributes Rows */}
                {card?.attributes?.map((attribute: any, index: any) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{attribute ?? "-"}</StyledTableCell>
                    {stagesAndInterviews?.data?.map((stage) => (
                      <React.Fragment key={stage._id}>
                        {stage?.interviewPlan?.map((stageName) => (
                          <React.Fragment key={stageName._id}>
                            {stageName?.interviews?.length === 0 && (
                              <StyledTableCell>-</StyledTableCell>
                            )}
                            {stageName?.interviews?.map((interview) => {
                              return (
                                <StyledTableCell key={interview._Id}>
                                  <Checkbox
                                    name="name"
                                    checked={payload?.some(
                                      (item: any) =>
                                        item.interviewId === interview._Id &&
                                        item.stageId === stageName._id &&
                                        item.focusAttributes?.some(
                                          (attr) =>
                                            attr.stageName === card.category &&
                                            attr.attributes.some(
                                              (a) =>
                                                a.name === attribute &&
                                                a.isSelected // Check if isSelected is true
                                            )
                                        )
                                    )}
                                    onChange={(e) =>
                                      updatePayload(
                                        interview._Id,
                                        stageName._id,
                                        attribute,
                                        e.target.checked,
                                        card.category
                                      )
                                    }
                                  />
                                </StyledTableCell>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </StyledTableRow>
                ))}
                {/* If there are no attributes */}
                {card?.attributes?.length === 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <NoContentFound />
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomAccordion>
      ))}
      {/* Checking if there is an error or if there is no data */}
      {isError === true ||
        (scoreCard?.length === 0 && (
          <Grid container justifyContent="center">
            <Grid
              item
              width={200}
              sx={{
                mt: { xs: 1, sm: 2 },
              }}
            >
              <NoContentFound />
            </Grid>
          </Grid>
        ))}
    </>
  );
}
