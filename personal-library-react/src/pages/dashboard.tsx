import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

// This component demonstrates the structure. Components from the sections directory can be imported as needed.
// For now, this is a basic dashboard layout that matches the Next.js version.

export default function Dashboard(): JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: 600 }}
        color="text.primary"
      >
        Welcome back, User
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Dashboard content will be populated here. Import and use components from the sections directory.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
