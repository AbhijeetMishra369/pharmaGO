import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminMedicines: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Medicine Management
        </Typography>
        <Typography color="text.secondary">
          Medicine management coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminMedicines;