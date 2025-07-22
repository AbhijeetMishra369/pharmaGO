import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Orders: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Typography color="text.secondary">
          Order history coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Orders;