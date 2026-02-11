import { Box, Button, Typography } from "@mui/material";

export function InterviewPrep({
  interviewPrepDetails,
  scoreCardDetails,
  setValue,
}): JSX.Element {
  // console.log(
  //   "🚀 ~ InterviewPrep ~ interviewPrepDetails:",
  //   interviewPrepDetails
  // );
  return (
    <Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
          Purpose
        </Typography>
        {/* <ul>
          <li> */}
        <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
          {interviewPrepDetails?.applicationReview?.description ??
            "No Data found"}
        </Typography>
        {/* </li>
        </ul> */}
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
          Sample Questions
        </Typography>
        {/* <ul>
          {interviewPrepDetails?.interviewQuestions.map((item) => (
            <li key={item.id}>
              <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
                {item.whatIsQuestion}
              </Typography>
            </li>
          ))}
        </ul> */}

        {interviewPrepDetails?.interviewQuestions.length ? (
          <ul>
            {interviewPrepDetails?.interviewQuestions.map((item) => (
              <li key={item.id}>
                <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
                  {item.whatIsQuestion}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
            No Data Found
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, mt: 1, mb: 0.5 }}>
          Focus Attribute
        </Typography>
        {/* {interviewPrepDetails?.focusAttributes.map((item) => (
          <Box key={item.id}>
            {" "}
            {item?.attributes.map((data) => (
              <Typography
                key={data.id}
                variant="subtitle2"
                sx={{
                  color: "neutral.500",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  maxWidth: "40%",
                  p: 1,
                }}
              >
                {data.name}
              </Typography>
            ))}
          </Box>
        ))} */}
        {interviewPrepDetails?.focusAttributes.length ? (
          <Box>
            {interviewPrepDetails?.focusAttributes.map((item) => (
              <Typography
                key={item.id}
                variant="subtitle2"
                sx={{
                  color: "neutral.500",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  maxWidth: "40%",
                  p: 1,
                }}
              >
                {item?.attributes.map((data) => (
                  <Box key={item.id}>{data.name},</Box>
                ))}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
            No Data Found
          </Typography>
        )}
      </Box>
      {scoreCardDetails?.data?.assignedTo ? (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
            After the Interview
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              p: "7px 10px",
            }}
            onClick={() => {
              setValue(3)
            }}
          >
            Fill out your scorecard
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
