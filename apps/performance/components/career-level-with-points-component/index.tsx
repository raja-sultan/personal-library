import { Box, List, ListItem, Typography } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

interface Props {
    minWidth?: number | string;
    title: string;
    points: { id: string, text: string }[];
}

export function CareerLevelWithPointsComponent({ minWidth = 321, title, points }: Props): JSX.Element {
    return (
        <Box minWidth={minWidth}>
            <Typography
                sx={styles.title}
                variant='body1'
                fontWeight={600}
                color={ThemeModeColor('neutral.900', 'neutral.800')}
            >
                {title}
            </Typography>
            <List sx={{ p: '16px' }}>
                {points?.map((point) => (
                    <ListItem key={point?.id} sx={styles.pointList}>
                        <Typography variant='body2'>{point?.text}</Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}


const styles = {
    title: ({ palette: { neutral } }) => ({
        backgroundColor: neutral[50],
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${neutral[100]}`,
        mb: '4px'
    }),
    pointList: ({ palette: { neutral } }) => ({
        position: 'relative',
        '&::before': {
            position: 'absolute',
            content: `''`,
            left: 0,
            top: '15px',
            padding: '4px',
            backgroundColor: neutral[300],
            borderRadius: '50px'
        }
    })
}