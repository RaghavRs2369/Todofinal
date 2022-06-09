import * as React from 'react';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

export default function LoadingBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <LinearProgress />
    </Box>
  );
}