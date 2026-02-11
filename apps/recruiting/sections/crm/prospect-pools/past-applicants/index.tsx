import { Button, Typography } from "@mui/material";
import { PersonIcon } from "@assets/icons";
import { PastApplicantsData } from "./past-applicants.data";

export function PastApplicants(): JSX.Element {
    return (
        <Typography>
            {PastApplicantsData?.map((item: any) => (

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
            ))}

        </Typography>
    )
}