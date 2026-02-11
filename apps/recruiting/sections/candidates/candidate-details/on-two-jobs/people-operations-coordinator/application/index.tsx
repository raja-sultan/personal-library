import { Box, Typography } from "@mui/material";
import { CustomAccordion } from "common";
import { awsBaseUrl } from "@root/config";
import { styles } from "./styles";
import { useGetApplicationCandidateQuery } from "@services/candidate/application-candidate/application-candidate-api";
import dayjs from "dayjs";
// import FormsApplications from "./forms";
import { useSearchParams } from "next/navigation";
import { accordionData } from "./types";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import FormDetailsTable from "./form-details-table";
// import FormDetailsTable from "@sections/jobs/job-details/forms/form-details-table";


export function Application(): JSX.Element {
  // const [numPages, setNumPages] = useState<number>();
  const params = useSearchParams();
  const candidateId = params.get("candidateID");

  // API HANDLERS
  // const { data, isError, isFetching, isLoading, isSuccess } =
  const { data } = useGetApplicationCandidateQuery({
    candidateId,
  });
  console.log("🚀 ~ file: index.tsx:59 ~ Application ~ data:", data);
  // console.log(
  //   "🚀 ~ file: index.tsx:17 ~ Application ~ data:",
  //   awsBaseUrl + data?.data?.[0]?.resume
  // );

  return (
    <Box sx={styles.mainCardStyling}>
      {data?.data?.map((item) => (
        <Box key={item.id}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Applied through {item?.detail?.source} for {item?.department} {" "} ({item?.office}) on {" "}
            {dayjs(item?.createdAt).format("MMMM D, YYYY")}.
          </Typography>
        </Box>
      ))}

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Resume (Public)
      </Typography>

      <iframe
        title="Resume"
        height="300"
        src={`https://docs.google.com/gview?url=${
          awsBaseUrl + data?.data?.[0]?.resume
        }&embedded=true`}
        frameBorder="0"
      />

      {/* {data?.data?.map((item) => (
        <Box key={item.id}>
          <Box>{`${awsBaseUrl}${item?.resume}`}</Box>
        </Box>
      ))} */}

      <Box>
        {accordionData.map((item: any) => (
          <CustomAccordion title={item.title} key={item.id}>
            {data?.data[0]?.job_posts.length === 0 ? (
              <Typography variant="subtitle1">No data</Typography>
            ) : (
              <Box>
                {data?.data[0]?.job_posts?.map((answer) => (
                  <Box sx={{ mb: 1 }} key={answer._id}>
                    {answer?.customApplicationQuestions?.map(
                      (question, wer) => (
                        <Typography variant="subtitle1" key={wer}>
                          {question ?? "-"}
                        </Typography>
                      )
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </CustomAccordion>
        ))}
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
        Forms
      </Typography>
      <FormDetailsTable />
      {/* <FormsApplications /> */}
    </Box>
  );
}
