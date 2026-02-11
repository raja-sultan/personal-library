import { Box } from "@mui/system";
import { CustomAccordion } from "common";
import { useSearchParams } from "next/navigation";
import { useGetApplicationCandidateQuery } from "@services/candidate/application-candidate/application-candidate-api";
import { PeopleOperationsCoordinator } from "./people-operations-coordinator";
import CandidatesDetailsProspect from "./prospect";
import dayjs from "dayjs";

export function OnTwoJobsTab(): JSX.Element {
  const params = useSearchParams();
  const candidateId = params.get("candidateID");
  const { data: candidateDetails } = useGetApplicationCandidateQuery({
    candidateId,
  });

  return (
    <Box
      sx={{
        height: "70vh",
        overflow: "scroll",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {candidateDetails?.data?.map((item: any) => (
        <CustomAccordion
          // expended={true}
          inlineHeaderRequired
          title={item?.department ?? "---"}
          key={item._id}
          subTitle={`${item?.stage} (${Math.abs(
            dayjs(item?.createdAt).diff(dayjs(), "days")
          )} Days ago)`}
        >
          <PeopleOperationsCoordinator />
        </CustomAccordion>
      ))}
      {/* {candidateDetails?.data?.prospect === true ? (
        <CustomAccordion
          inlineHeaderRequired
          title="Prospect"
          subTitle="Application Review (9 Days)"
        >
          <CandidatesDetailsProspect />
        </CustomAccordion>
      ) : null} */}
      <CustomAccordion
        expended={false}
        inlineHeaderRequired
        title="Prospect"
        subTitle="Application Review (9 Days)"
      >
        <CandidatesDetailsProspect />
      </CustomAccordion>
    </Box>
  );
}
