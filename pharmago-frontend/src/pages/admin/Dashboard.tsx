import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  Medication,
  Receipt,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  AccessTime,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Block,
  CheckCircleOutline,
  PendingActions,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 15420,
      activeUsers: 8945,
      totalOrders: 2341,
      totalRevenue: 156780,
      growthRates: {
        users: 12.5,
        orders: 8.3,
        revenue: 15.7,
      }
    },
    salesData: [
      { name: 'Jan', revenue: 12000, orders: 180 },
      { name: 'Feb', revenue: 15000, orders: 220 },
      { name: 'Mar', revenue: 18000, orders: 280 },
      { name: 'Apr', revenue: 22000, orders: 340 },
      { name: 'May', revenue: 25000, orders: 380 },
      { name: 'Jun', revenue: 28000, orders: 420 },
    ],
    categoryData: [
      { name: 'Pain Relief', value: 35, color: '#8884d8' },
      { name: 'Antibiotics', value: 25, color: '#82ca9d' },
      { name: 'Vitamins', value: 20, color: '#ffc658' },
      { name: 'Cardiovascular', value: 15, color: '#ff7c7c' },
      { name: 'Others', value: 5, color: '#8dd1e1' },
    ]
  };

  // Mock recent data
  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2024-01-20', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joinDate: '2024-01-19', orders: 12 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending', joinDate: '2024-01-18', orders: 0 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', joinDate: '2024-01-17', orders: 8 },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', status: 'Delivered', total: 45.99, date: '2024-01-20' },
    { id: 'ORD-002', customer: 'Jane Smith', status: 'Processing', total: 128.50, date: '2024-01-20' },
    { id: 'ORD-003', customer: 'Mike Johnson', status: 'Pending', total: 67.25, date: '2024-01-19' },
    { id: 'ORD-004', customer: 'Sarah Wilson', status: 'Shipped', total: 89.99, date: '2024-01-19' },
  ];

  const pendingPrescriptions = [
    { id: 1, patient: 'Emily Davis', medicine: 'Amoxicillin 500mg', uploadDate: '2024-01-20', status: 'Under Review' },
    { id: 2, patient: 'Robert Brown', medicine: 'Lisinopril 10mg', uploadDate: '2024-01-19', status: 'Pending Approval' },
    { id: 3, patient: 'Lisa Garcia', medicine: 'Metformin 850mg', uploadDate: '2024-01-18', status: 'Under Review' },
  ];

  const quickStats = [
    {
      title: 'Total Users',
      value: analyticsData.overview.totalUsers.toLocaleString(),
      change: `+${analyticsData.overview.growthRates.users}%`,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      positive: true,
    },
    {
      title: 'Active Orders',
      value: analyticsData.overview.totalOrders.toLocaleString(),
      change: `+${analyticsData.overview.growthRates.orders}%`,
      icon: <Receipt sx={{ fontSize: 40 }} />,
      color: 'success.main',
      positive: true,
    },
    {
      title: 'Total Revenue',
      value: `$${analyticsData.overview.totalRevenue.toLocaleString()}`,
      change: `+${analyticsData.overview.growthRates.revenue}%`,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      positive: true,
    },
    {
      title: 'Active Users',
      value: analyticsData.overview.activeUsers.toLocaleString(),
      change: '+5.2%',
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'info.main',
      positive: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': case 'delivered': case 'approved': return 'success';
      case 'pending': case 'under review': return 'warning';
      case 'processing': case 'shipped': return 'info';
      case 'cancelled': case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor your pharmacy operations and analytics
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {stat.positive ? (
                          <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                        ) : (
                          <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          color={stat.positive ? 'success.main' : 'error.main'}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: `${stat.color}15`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Revenue & Orders Trend
                </Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="right" dataKey="orders" fill="#8884d8" />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Category Distribution */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Sales by Category
                </Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {analyticsData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Management Tables */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)} sx={{ mb: 3 }}>
                  <Tab label="Recent Users" />
                  <Tab label="Recent Orders" />
                  <Tab label="Pending Prescriptions" />
                </Tabs>

                {tabValue === 0 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Join Date</TableCell>
                          <TableCell>Orders</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                  {user.name.charAt(0)}
                                </Avatar>
                                <Typography variant="subtitle2">{user.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.status}
                                color={getStatusColor(user.status) as any}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                            <TableCell>{user.orders}</TableCell>
                            <TableCell>
                              <IconButton onClick={(e) => handleMenuClick(e, user)}>
                                <MoreVert />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {tabValue === 1 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {order.id}
                              </Typography>
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status) as any}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                ${order.total}
                              </Typography>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <IconButton onClick={(e) => handleMenuClick(e, order)}>
                                <MoreVert />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {tabValue === 2 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Patient</TableCell>
                          <TableCell>Medicine</TableCell>
                          <TableCell>Upload Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pendingPrescriptions.map((prescription) => (
                          <TableRow key={prescription.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                  {prescription.patient.charAt(0)}
                                </Avatar>
                                <Typography variant="subtitle2">{prescription.patient}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{prescription.medicine}</TableCell>
                            <TableCell>{prescription.uploadDate}</TableCell>
                            <TableCell>
                              <Chip
                                label={prescription.status}
                                color="warning"
                                size="small"
                                icon={<PendingActions />}
                              />
                            </TableCell>
                            <TableCell>
                              <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                                Review
                              </Button>
                              <Button size="small" variant="contained" color="success">
                                Approve
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/users')}
                  >
                    Manage Users
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/orders')}
                  >
                    Manage Orders
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/medicines')}
                  >
                    Manage Medicines
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Visibility sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Edit sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Block sx={{ mr: 1 }} />
            Block/Unblock
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default AdminDashboard;