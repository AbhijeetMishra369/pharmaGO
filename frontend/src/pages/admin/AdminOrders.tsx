import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminOrders: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
        <Typography color="text.secondary">
          Order management coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminOrders;