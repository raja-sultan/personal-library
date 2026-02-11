import { Avatar, Box, Skeleton } from "@mui/material";

export default function CommentSkelton(): JSX.Element {
  return (
    <Box mb="20px">
      <Box display="flex" alignItems="center" gap="12px" mb="10px">
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton width="100%" />
      </Box>
      <Skeleton variant="rectangular" width="100%">
        <Box sx={{ paddingTop: "15%" }} />
      </Skeleton>
    </Box>
  );
}
