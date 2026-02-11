import CustomCard from "@components/custom-card"
import { PermittedFeedbackTypes } from "./permitted-feeback-types"
import { PublicPraiseWall } from "./public-praise-wall"

export function FeedbackSettings(): JSX.Element {
  return (
    <>
      <CustomCard
        cardProps={{ sx: { py: 1.4 } }}
        subHeader
        cardSubHeader={{
          title: "Feedback Settings",
        }}
      />
      <PermittedFeedbackTypes />
      <PublicPraiseWall />
    </>
  );
}