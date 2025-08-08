import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Medication,
  ShoppingCart,
  Receipt,
  Notifications,
  TrendingUp,
  LocalShipping,
  Schedule,
  Add,
  ArrowForward,
  Warning,
  CheckCircle,
  AccessTime,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - this would come from API calls
  const dashboardData = {
    recentOrders: [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'Delivered',
        total: 45.99,
        items: 3,
        statusColor: 'success',
      },
      {
        id: 'ORD-002',
        date: '2024-01-18',
        status: 'In Transit',
        total: 28.50,
        items: 2,
        statusColor: 'warning',
      },
      {
        id: 'ORD-003',
        date: '2024-01-20',
        status: 'Processing',
        total: 72.25,
        items: 4,
        statusColor: 'info',
      },
    ],
    upcomingReminders: [
      {
        id: 1,
        medicine: 'Vitamin D3',
        time: '09:00 AM',
        dosage: '1 tablet',
        priority: 'high',
      },
      {
        id: 2,
        medicine: 'Omega-3',
        time: '02:00 PM',
        dosage: '2 capsules',
        priority: 'medium',
      },
      {
        id: 3,
        medicine: 'Multivitamin',
        time: '08:00 PM',
        dosage: '1 tablet',
        priority: 'low',
      },
    ],
    healthMetrics: {
      totalOrders: 15,
      pendingOrders: 2,
      savedMedicines: 8,
      activeReminders: 5,
    },
    prescriptionStatus: {
      pending: 1,
      approved: 3,
      rejected: 0,
    },
  };

  const quickActions = [
    {
      title: 'Browse Medicines',
      description: 'Find and order your medicines',
      icon: <Medication sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      action: () => navigate('/medicines'),
    },
    {
      title: 'Upload Prescription',
      description: 'Get prescription medicines',
      icon: <Add sx={{ fontSize: 40 }} />,
      color: 'success.main',
      action: () => navigate('/medicines?upload=true'),
    },
    {
      title: 'View Cart',
      description: 'Review items in your cart',
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      action: () => navigate('/cart'),
    },
    {
      title: 'Track Orders',
      description: 'Check your order status',
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      color: 'info.main',
      action: () => navigate('/orders'),
    },
  ];

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Welcome back, {user?.firstName}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your health today
          </Typography>
        </Box>

        {/* Health Alert */}
        <Alert 
          severity="info" 
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/reminders')}>
              View All
            </Button>
          }
        >
          You have 3 medicine reminders scheduled for today. Don't forget to take your medications!
        </Alert>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                    onClick={action.action}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          bgcolor: `${action.color}15`,
                          color: action.color,
                          mb: 2,
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Recent Orders */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Orders
                  </Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/orders')}
                  >
                    View All
                  </Button>
                </Box>

                {dashboardData.recentOrders.map((order, index) => (
                  <Box key={order.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Receipt />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            Order {order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.items} items • {order.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={order.status}
                          color={order.statusColor as any}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          ${order.total}
                        </Typography>
                      </Box>
                    </Box>
                    {index < dashboardData.recentOrders.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Health Metrics */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" fontWeight={700} color="primary.main">
                      {dashboardData.healthMetrics.totalOrders}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Schedule sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h4" fontWeight={700} color="warning.main">
                      {dashboardData.healthMetrics.pendingOrders}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Orders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Medication sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      {dashboardData.healthMetrics.savedMedicines}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Saved Medicines
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Notifications sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
                    <Typography variant="h4" fontWeight={700} color="info.main">
                      {dashboardData.healthMetrics.activeReminders}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Reminders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Today's Reminders */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Today's Reminders
                  </Typography>
                  <IconButton onClick={() => navigate('/reminders')}>
                    <ArrowForward />
                  </IconButton>
                </Box>

                <List>
                  {dashboardData.upcomingReminders.map((reminder, index) => (
                    <ListItem key={reminder.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={reminder.medicine}
                        secondary={`${reminder.time} • ${reminder.dosage}`}
                      />
                      <Chip
                        size="small"
                        label={reminder.priority}
                        color={
                          reminder.priority === 'high'
                            ? 'error'
                            : reminder.priority === 'medium'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/reminders')}
                  sx={{ mt: 2 }}
                >
                  Manage Reminders
                </Button>
              </CardContent>
            </Card>

            {/* Prescription Status */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Prescription Status
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      Approved ({dashboardData.prescriptionStatus.approved})
                    </Typography>
                    <Typography variant="body2">75%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <List sx={{ py: 0 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="3 Prescriptions Approved"
                      secondary="Ready for ordering"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="1 Prescription Pending"
                      secondary="Under review"
                    />
                  </ListItem>
                </List>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate('/medicines?upload=true')}
                  sx={{ mt: 2 }}
                >
                  Upload New Prescription
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;