import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminUsers: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Typography color="text.secondary">
          User management coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminUsers;