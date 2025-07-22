import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Cart: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography color="text.secondary">
          Shopping cart coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;