import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminDashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary">
          Admin dashboard coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard;