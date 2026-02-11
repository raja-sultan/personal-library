import React from "react";
import { CompanyMarketingArray } from "./data";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { style } from "./style";
import Link from "next/link";

export default function CompanyMarketing(): JSX.Element {
  return (
    <Paper elevation={0} sx={style}>
      <Stack sx={style.headerStyle}>
        <Typography variant="h3" component="h3">
          Company Marketing
        </Typography>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="body1" component="span">
            Job Status: &nbsp;
          </Typography>
          <Typography variant="body1" component="span" color="success">
            Open
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h4" component="h4" mt="16px">
        Leverage your organization&apos;s existing marketing
      </Typography>
      <Typography variant="body1" component="h3" sx={style.descriptionStyle}>
        Your existing marketing presence (website, email newsletters, social
        media presence, etc.) should&apos;nt just be aimed at your potential
        customers. In fact, with a few tweaks, these channels are great ways to
        reach potential candidates.
      </Typography>
      <Typography variant="h4" component="h4" marginTop="16px">
        Why it works:
      </Typography>
      <Typography variant="h4" component="h4" marginTop="16px">
        How personnel library helps:
      </Typography>
      <Typography variant="body1" component="h3" sx={style.descriptionStyle}>
        We&apos;ll host your careers page and give you tips to make it
        successful. We&apos;ll also give you tracking links for your emails,
        newsletters, and social media so you can track which candidates come
        from these sources. That way, you can see which sources are the most
        effective and polish the ones that are&apos;nt.
      </Typography>
      {CompanyMarketingArray?.map((item) => (
        <Box key={item?.id}>
          <Typography
            variant="body1"
            component="h3"
            sx={style.descriptionStyle}
          >
            {item.srNo} {item.title}
          </Typography>
          <Typography
            variant="body1"
            component="h3"
            sx={style.descriptionStyle}
          >
            {item.description}
          </Typography>
        </Box>
      ))}

      <Typography variant="body1" component="h3" sx={style.descriptionStyle}>
        Job ads are great, but these marketing strategies will increase the
        percentage of candidates who are passionate about your brand before they
        even step into interview. So what are you waiting for?
        <Link href="/test"> Click here to get started </Link>
      </Typography>
    </Paper>
  );
}
