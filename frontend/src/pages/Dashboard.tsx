import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Customer dashboard coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;