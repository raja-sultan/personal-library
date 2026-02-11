"use client";
import { Box, Button } from "@mui/material";
import CustomCard from "@components/custom-card";
import { useRouter, useSearchParams } from "next/navigation";
import PublicUpdates from "./public";
import PrivateCurrentUpdates from "./private/current";
import PrivatePastUpdates from "./private/past";

export function UpdatesPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateType = searchParams.get("type");
  const editUpdate = searchParams.get("mode");

  // Object mapping for component selection
  const componentMap: Record<string, JSX.Element> = {
    public: <PublicUpdates />,
    current: <PrivateCurrentUpdates />,
    past: <PrivatePastUpdates />,
    default: <PrivateCurrentUpdates />, // Default component
  };

  // Determine which component to render based on updateType or editUpdate
  const componentToRender = componentMap[updateType ?? editUpdate ?? "default"];

  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "Updates",
          actions: (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {updateType !== "public" ? (

                <Button
                  onClick={() => {
                    router.push("/my-team");
                  }}
                  variant="outlined"
                  size="small"
                >
                  View Updates for your Team
                </Button>

              ) : null}
            </Box>
          ),
        }}
      />
      <br />
      {componentToRender}
    </>
  );
}
