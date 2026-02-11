import { Box, Accordion, AccordionSummary, Button, Grid } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetEmailTemplatesQuery } from "@services/configuration/email-templates/email-templates-api";
import Link from "next/link";
import { EditIcon } from "@assets/jobs";
import { SubTemplateEmail } from "../my-templates/sub-templates";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

export function OrganizationEmailTemplatesTable(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const [tempId, setTempId] = useState<any>("");
  const [arrowControl, setArrowControl] = useState<boolean>(false);

  const { data } = useGetEmailTemplatesQuery({
    params: {
      limit: 10,
      offset: params.offset,
      search: "",
      refetchOnMountOrArgChange: true,
    },
  });

  const handleSubEmailTemplate = (Id: any) => {
    setTempId(Id);
    setArrowControl(!arrowControl);
  };

  const userId: any = useSelector((state: any) => state?.auth?.user?.userId);
  console.log("userId", userId);

  return (
    <Box
      sx={{
        maxHeight: 300,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
        pr: 2,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "background.default",
          py: 1.5,
          px: 2.5,
        }}
        container
        spacing={2}
      >
        <Grid item xs={3.3}>
          Templates
        </Grid>
        <Grid item xs={3.3}>
          Templates Type
        </Grid>
        <Grid item xs={3.3}>
          Last Updated
        </Grid>
        <Grid item xs={2}>
          Actions
        </Grid>
      </Grid>
      {data?.data?.map((item: any) => {
        return (
          <Accordion key={item?._id}>
            <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            // aria-controls="panel1-content"
            // id="panel1-header"
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  px: 1,
                  mt: 1,
                }}
                container
                spacing={2}
              >
                <Grid item xs={3.3}>
                  <StyledLink
                    href={`/configuration/email-templates/create-email-template?subTemplate=${item?._id}`}
                  >
                    <Box sx={{ minWidth: "40px" }}>
                      {item?.template_name ?? "---"}
                    </Box>
                  </StyledLink>
                </Grid>
                <Grid item xs={3.3} sx={{ color: "text.secondary" }}>
                  {item?.emailType ?? "---"}
                </Grid>
                <Grid item xs={3.3} sx={{ color: "text.secondary" }}>
                  {dayjs(item?.updatedAt).format("DD-MM-YYYY") ?? "---"}
                </Grid>
                <Grid item xs={2}>
                  <Link
                    href={`/configuration/email-templates/create-email-template?action=${item?._id}`}
                  >
                    <EditIcon />
                  </Link>
                  <Button
                    sx={{
                      minWidth: "0px",
                      px: "0px",
                      py: "0px",
                      position: "relative",
                      top: "-9px",
                      left: "4px",
                    }}
                    variant="outlined"
                    onClick={() => {
                      handleSubEmailTemplate(item?._id);
                    }}
                  >
                    {arrowControl ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </AccordionSummary>
            {tempId && <SubTemplateEmail tempId={tempId} itemsId={item?._id} />}
          </Accordion>
        );
      })}
    </Box>
  );
}

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
