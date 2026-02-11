import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { AssignScoreCardModel } from "./assign-scorecard-model";
import { useRouter, useSearchParams } from "next/navigation";
import { SendFormModel } from "./send-form-model";
import { useState } from "react";
import { useRequestAvailabilityMutation } from "@services/candidate/stages/interview-stage";
import toast from "react-hot-toast";
// import Link from "next/link";

export enum CandidateInterviewAvailabilityEnum {
  NOT_REQUESTED = "not requested",
  REQUESTED = "requested",
  RECEIVED = "received",
  CONFIRMATION_SENT = "confirmation sent",
  SEND_INTERVIEW_CONFIRMATION = "send interview confirmation",
  ENTER_AVAILABILITY_MANUALLY = "enter availability manually",
  INTERVIEW_CONDUCTED = "interview conducted",
}
export function MainStage({ interviews, title }: any): JSX.Element {
  console.log(
    "🚀 ~ MainStage............-----,,,,,,,, ~ interviews:",
    interviews
  );
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");
  const [requestAvail] = useRequestAvailabilityMutation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(interviews.length).fill(
      CandidateInterviewAvailabilityEnum.NOT_REQUESTED
    )
  );
  const handleChange =
    (index: number, interviewId) =>
    async (event: SelectChangeEvent): Promise<void> => {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = event.target.value;
      setSelectedOptions(newSelectedOptions);

      try {
        const res = await requestAvail({
          body: {
            availabilityStatus: event.target.value,
            candidateId,
          },
          interviewId,
        }).unwrap();
        toast.success(res?.data?.message ?? "Request Updated successfully");
      } catch (error) {
        toast.error(error?.data?.message ?? "Something went wrong");
      }
    };
  // console.log(interviews, "interviews");

  return (
    <>
      <Typography variant="h6">Interviews</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {interviews?.map((interview: any, index: number) => {
          // console.log("interview", interview);

          return (
            <TableBody
              sx={{
                "& .MuiTableCell-root": { borderBottom: 0, p: 0 },
              }}
              key={interview?._id}
            >
              {!interviews.length ? (
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">
                      No Interview Found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="left">
                    <Typography variant="subtitle1">
                      {interview?.applicationReview?.interviewName}
                    </Typography>
                    <Select
                      disabled={!interview?.scheduledInterview}
                      id={`dropdown-${index}`}
                      value={
                        interview?.scheduledInterviewhere
                          ? interview?.scheduledInterview?.availability
                          : selectedOptions[index]
                      }
                      onChange={handleChange(index, interview?._id)}
                    >
                      {Object.values(CandidateInterviewAvailabilityEnum).map(
                        (option, idx: number) => (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </TableCell>
                  <TableCell>
                    {!interview?.scheduledInterview && (
                      <Button
                        variant="text"
                        onClick={() => {
                          push(
                            `/schedule-interview?jobId=${jobId}&candidateId=${candidateId}&stageId
=${interview?.stageId}&interviewId=${interview?._id}`
                          );
                        }}
                      >
                        Schedule Interview
                      </Button>
                    )}
                    <AssignScoreCardModel
                      jobId={jobId}
                      candidateId={candidateId}
                      interviewId={interview?._id}
                    />
                    {/* {!interview?.scheduledInterview && ( */}

                    {/* <Button
                      onClick={() => {
                        push(
                          `/interview-details?jobId=${jobId}&candidateId=${candidateId}&stageId
=${interview?.stageId}&interviewId=${interview?._id}&stageName=${title}`
                        );
                      }}
                      disabled={
                        interview?.applicationReview?.interviewName?.length ===
                        0
                      }
                      variant="text"
                    >
                      Interview Kit
                    </Button> */}
                    {interview?.applicationReview?.interviewName ? (
                      <Button
                          onClick={() => {
                            push(
                              `/interview-details?jobId=${jobId}&candidateId=${candidateId}&stageId=${interview?.stageId}&interviewId=${interview?._id}&stageName=${title}`
                            );
                          }}
                          variant="text"
                        >
                          Interview Kit
                        </Button>
                    ) : (
                      <Button
                      disabled
                      onClick={() => {
                        push(
                          `/interview-details?jobId=${jobId}&candidateId=${candidateId}&stageId=${interview?.stageId}&interviewId=${interview?._id}&stageName=${title}`
                        );
                      }}
                      variant="text"
                    >
                      Interview Kit
                    </Button>
                    )}

                    {/* <Button
                      variant="text"
                      onClick={() => {
                        push(
                          `/interview-details?jobId=${jobId}&candidateId=${candidateId}&stageId
=${interview?.stageId}&interviewId=${interview?._id}`
                        );
                      }}
                    >
                      Interview Kit
                    </Button> */}
                    {/* )} */}
                    <SendFormModel
                      jobId={jobId}
                      candidateId={candidateId}
                      interviewId={interview?._id}
                      stageId={interview?.stageId}
                    />
                    <Button
                      variant="text"
                      onClick={() => {
                        push(
                          `/preliminary-screen-call?jobId=${jobId}&stageId=${interview?.stageId}&interviewId=${interview?._id}&candidateId=${candidateId}`
                        );
                      }}
                    >
                      Collect Feedback
                    </Button>
                    <Button variant="text">Request Availability</Button>
                    <Button variant="text">Manage Offer</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          );
        })}
      </Table>
    </>
  );
}
