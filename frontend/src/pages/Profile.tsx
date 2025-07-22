import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography color="text.secondary">
          User profile coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;