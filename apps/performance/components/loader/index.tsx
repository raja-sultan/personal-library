import { Box, CircularProgress } from "@mui/material";

export function CustomLoader(): JSX.Element {
    return (
        <Box
            key='custom-loader'
            position="fixed"
            height="100vh"
            width="100vw"
            top="0px"
            left="0px"
            sx={{ zIndex: 100, backdropFilter: "blur(1px)", overflowX: 'hidden' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress color="primary" />
        </Box>
    );
}