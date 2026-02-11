import { TemplateCardBg } from "@assets/images";
import { Box, Typography } from "@mui/material";

export function TemplateCard({ background, levelsCount, skillsCount, title }): JSX.Element {

    return (
        <Box sx={styles.wrapper(background)}>
            <Box>
                <Typography variant="body1" color='common.white' fontWeight={700}>{title}</Typography>
                <Box display='flex' gap='10px'>
                    <Typography variant="body2" color='common.white' fontWeight={600}>{skillsCount} Skills,</Typography>
                    <Typography variant="body2" color='common.white' fontWeight={600}>{levelsCount} Levels</Typography>
                </Box>
            </Box>
        </Box>
    )
}

const styles = {
    wrapper: (background: string) => ({
        position: 'relative',
        minHeight: '146px',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'flex-end',
        background,
        backgroundImage: `url(${TemplateCardBg.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        cursor: 'pointer'
    })
}