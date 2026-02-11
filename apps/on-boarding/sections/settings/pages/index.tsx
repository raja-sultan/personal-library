import React from "react";

import { PageFilters } from "./page-filters";
import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { AddedPages } from "./added-pages";
import { useRouter } from "next/navigation";

export function PagesSection(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Typography variant="h5">Welcome Experience Pages</Typography>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/settings/pages/page-rules");
          }}
        >
          Create New Page
        </Button>
      </Stack>
      <PageFilters />
      <AddedPages />
    </>
  );
}
