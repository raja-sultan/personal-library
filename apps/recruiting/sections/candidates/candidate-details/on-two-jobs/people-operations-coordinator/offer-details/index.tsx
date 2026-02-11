import { TypingBro } from "@assets/images";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { CreateOfferModal } from "./create-offer-modal";
import { useState } from "react";
import { OfferDetailsVersion } from "./version-one";
import { useSearchParams } from "next/navigation";
import { useGetOfferCandidateQuery } from "@services/candidate/candidate-details/on-two-jobs/offer-details/offer-details-api";
import { IsFetching } from "common";

export function OfferDetails(): JSX.Element {
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateID");
  const { data, isLoading } = useGetOfferCandidateQuery({ candidateId });
  const [createOffer, setCreateOffer] = useState<boolean>(false);
  const [showCreatedOffer, setShowCreatedOffer] = useState<boolean>(false);

  if (isLoading) {
    return (
      <Box position="relative" height="25vh">
        <IsFetching isFetching />
      </Box>
    );
  }

  if (showCreatedOffer) return <OfferDetailsVersion />;

  return (
    <Box>
      {data?.data?.length > 0 ? (
        <Box>
          <OfferDetailsVersion data={data?.data} />
        </Box>
      ) : (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Image
            src={TypingBro}
            width={170}
            height={144}
            alt="picture of the Typing Bro"
          />
          <Typography sx={{ textAlign: "center" }}>
            There is no offer created yet for this job.
          </Typography>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              setCreateOffer(true);
            }}
          >
            Create Offer
          </Button>

          {createOffer && (
            <CreateOfferModal
              setShowCreatedOffer={setShowCreatedOffer}
              createOffer={createOffer}
              setCreateOffer={setCreateOffer}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
