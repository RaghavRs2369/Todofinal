import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Page = forwardRef(
  ({ titleName = 'Welcome', children, ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{titleName}</title>
      </Helmet>
      {children}
    </Box>
  )
);

export default Page;