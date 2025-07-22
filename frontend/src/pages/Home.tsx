import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from '@mui/material';
import {
  LocalPharmacy,
  LocalShipping,
  Schedule,
  Security,
  Support,
  Verified,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <LocalPharmacy color="primary" sx={{ fontSize: 40 }} />,
      title: 'Wide Medicine Selection',
      description: 'Access thousands of medicines from trusted manufacturers.',
    },
    {
      icon: <LocalShipping color="primary" sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered to your doorstep within 24 hours.',
    },
    {
      icon: <Schedule color="primary" sx={{ fontSize: 40 }} />,
      title: 'Medicine Reminders',
      description: 'Never miss a dose with our intelligent reminder system.',
    },
    {
      icon: <Security color="primary" sx={{ fontSize: 40 }} />,
      title: 'Secure & Safe',
      description: 'Your health data and payments are completely secure.',
    },
    {
      icon: <Support color="primary" sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Our healthcare experts are available round the clock.',
    },
    {
      icon: <Verified color="primary" sx={{ fontSize: 40 }} />,
      title: 'Verified Products',
      description: 'All medicines are verified and sourced from licensed vendors.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Your Health,
                <br />
                Our Priority
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
                Get your medicines delivered fast and safely. Order online and enjoy 
                hassle-free healthcare at your fingertips.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/medicines')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      Browse Medicines
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/dashboard')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      My Dashboard
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/medicines')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      Browse Medicines
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/api/placeholder/500/400"
                alt="Healthcare illustration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Why Choose PharmaGo?
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          We provide the best healthcare solutions with cutting-edge technology
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" component="div" fontWeight="bold">
                10K+
              </Typography>
              <Typography variant="h6">
                Happy Customers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" component="div" fontWeight="bold">
                5K+
              </Typography>
              <Typography variant="h6">
                Medicines Available
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" component="div" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="h6">
                Customer Support
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" component="div" fontWeight="bold">
                100%
              </Typography>
              <Typography variant="h6">
                Authentic Products
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of satisfied customers who trust PharmaGo for their healthcare needs.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip label="Free Delivery" color="primary" variant="outlined" />
          <Chip label="24/7 Support" color="primary" variant="outlined" />
          <Chip label="Secure Payments" color="primary" variant="outlined" />
          <Chip label="Verified Products" color="primary" variant="outlined" />
        </Box>
        {!isAuthenticated && (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 4 }}
          >
            Create Account Now
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default Home;