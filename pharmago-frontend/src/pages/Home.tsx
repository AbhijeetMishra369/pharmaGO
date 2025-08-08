import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import {
  LocalPharmacy,
  Delivery,
  Security,
  AccessTime,
  Medication,
  Receipt,
  Notifications,
  VerifiedUser,
  ArrowForward,
  Star,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <LocalPharmacy sx={{ fontSize: 40 }} />,
      title: 'Wide Medicine Selection',
      description: 'Access to thousands of genuine medicines and healthcare products.',
      color: 'primary.main',
    },
    {
      icon: <Delivery sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery to your doorstep within 24 hours.',
      color: 'success.main',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure & Licensed',
      description: 'All medicines are sourced from licensed pharmacies and verified.',
      color: 'warning.main',
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your healthcare needs.',
      color: 'error.main',
    },
  ];

  const services = [
    {
      icon: <Medication />,
      title: 'Prescription Medicines',
      description: 'Upload prescription and get medicines delivered',
      image: '/api/placeholder/300/200',
    },
    {
      icon: <Receipt />,
      title: 'Order Tracking',
      description: 'Track your orders in real-time',
      image: '/api/placeholder/300/200',
    },
    {
      icon: <Notifications />,
      title: 'Medicine Reminders',
      description: 'Never miss your medication schedule',
      image: '/api/placeholder/300/200',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Medicines Available' },
    { number: '500+', label: 'Cities Covered' },
    { number: '24/7', label: 'Customer Support' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight={700}
                gutterBottom
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Your Health,
                <br />
                Our Priority
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
              >
                Order medicines online and get them delivered to your doorstep.
                Safe, secure, and convenient healthcare solutions.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {user ? (
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      onClick={() => navigate('/register')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' },
                        px: 4,
                        py: 1.5,
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
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      Browse Medicines
                    </Button>
                  </>
                )}
              </Box>

              <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} sx={{ color: '#FFD700', fontSize: 20 }} />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Trusted by 50,000+ customers
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 400,
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <LocalPharmacy sx={{ fontSize: 120, opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    component="div"
                    fontWeight={700}
                    color="primary.main"
                    gutterBottom
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h3" component="h2" fontWeight={600} gutterBottom>
              Why Choose PharmaGo?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We provide the best online pharmacy experience with quality medicines
              and exceptional service.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h3" component="h2" fontWeight={600} gutterBottom>
              Our Services
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive healthcare solutions at your fingertips
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <Box sx={{ transform: 'scale(2.5)' }}>
                      {service.icon}
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h3" component="h2" fontWeight={600} gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who trust PharmaGo for their healthcare needs.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {!user && (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Sign Up Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
              
              {user && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/medicines')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Browse Medicines
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;