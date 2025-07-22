import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Medicines: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>
        <Typography color="text.secondary">
          Medicine catalog coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Medicines;