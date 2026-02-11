import { Button, Typography } from "@mui/material";
import { PersonIcon } from "@assets/icons";
import { collegerecruitmentData } from "./college-recruitment.data";

export function CollegeRecruitment(): JSX.Element {
    return (
        <Typography>
            {collegerecruitmentData?.map((item: any) => (
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