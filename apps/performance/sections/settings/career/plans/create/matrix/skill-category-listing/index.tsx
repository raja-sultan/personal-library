import { CareerSkillCategory } from "@components/career-skill-matrix";
import { Box } from "@mui/material";

export function SkillCategoryListing({ id, disabled, skills, }): JSX.Element {
    id //for edit and view 
    return (
        <>
            {skills?.map((item: any) => (
                <Box key={item}>
                    <CareerSkillCategory
                        disabled={disabled}
                        title={item.name}
                        titleProps={{ variant: 'body2', py: 1.55, height: '179px' }}
                        icon={false}
                    />
                </Box>

            ))}

        </>
    )
}
