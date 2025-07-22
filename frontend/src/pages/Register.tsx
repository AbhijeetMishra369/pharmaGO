import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Register: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Typography color="text.secondary">
          Registration page coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;