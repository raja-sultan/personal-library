import { Button, Typography } from "@mui/material";
import { coldoutreachData } from "./cold-outreach.data";
import { PersonIcon } from "@assets/icons";

export function ColdOutreach(): JSX.Element {
  return (
    <Typography>
      {coldoutreachData?.map((item: any) => (
        <>
          <Typography sx={{ border: "0.2px solid #F2F4F7", display: "flex", justifyContent: "space-between" }} padding={1} key={item.id}>
            {item?.title && item.title}
            <Button
              size="small"
              startIcon={<PersonIcon />}
              variant="contained"
            >
              1
            </Button>
          </Typography>
          {item?.component && item.component}
        </>
      ))}
    </Typography>
  )
}