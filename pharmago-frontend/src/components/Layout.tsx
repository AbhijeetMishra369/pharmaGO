import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LocalPharmacy,
  ShoppingCart,
  AccountCircle,
  Dashboard,
  Medication,
  Receipt,
  Notifications,
  AdminPanelSettings,
  Logout,
  Home,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = 3; // This would come from cart context/state

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home />, public: true },
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard />, auth: true },
    { label: 'Medicines', path: '/medicines', icon: <Medication />, auth: true },
    { label: 'Orders', path: '/orders', icon: <Receipt />, auth: true },
    { label: 'Reminders', path: '/reminders', icon: <Notifications />, auth: true },
  ];

  const adminNavigationItems = [
    { label: 'Admin Dashboard', path: '/admin', icon: <AdminPanelSettings /> },
    { label: 'User Management', path: '/admin/users', icon: <AccountCircle /> },
    { label: 'Medicine Management', path: '/admin/medicines', icon: <Medication /> },
    { label: 'Order Management', path: '/admin/orders', icon: <Receipt /> },
  ];

  const NavigationList = ({ mobile = false }: { mobile?: boolean }) => (
    <List sx={{ width: mobile ? 250 : 'auto' }}>
      {navigationItems.map((item) => {
        if (item.auth && !user) return null;
        if (!item.public && !item.auth && user) return null;
        
        return (
          <ListItem
            button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              if (mobile) setMobileMenuOpen(false);
            }}
            selected={location.pathname === item.path}
            sx={mobile ? {} : { display: 'inline-flex', width: 'auto' }}
          >
            <ListItemIcon sx={mobile ? {} : { minWidth: 'auto', mr: 1 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        );
      })}
      
      {user?.role === UserRole.ADMIN && mobile && (
        <>
          <Divider />
          {adminNavigationItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </>
      )}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 4,
            }}
            onClick={() => navigate('/')}
          >
            <LocalPharmacy sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
              PharmaGo
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <NavigationList />
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user && (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/cart')}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>

                {user.role === UserRole.ADMIN && !isMobile && (
                  <Button
                    color="inherit"
                    startIcon={<AdminPanelSettings />}
                    onClick={() => navigate('/admin')}
                    sx={{ mr: 1 }}
                  >
                    Admin
                  </Button>
                )}

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.firstName.charAt(0)}
                  </Avatar>
                </IconButton>
              </>
            )}

            {!user && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <LocalPharmacy sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            PharmaGo
          </Typography>
        </Box>
        <NavigationList mobile />
      </Drawer>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        {user && (
          <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        )}
        <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, minHeight: 0 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'grey.100',
          py: 3,
          px: 2,
          mt: 'auto',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 PharmaGo. All rights reserved. Your trusted online pharmacy.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;