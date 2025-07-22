import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  LocalPharmacy,
  Dashboard,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer', mr: 3 }}
          onClick={() => navigate('/')}
        >
          <LocalPharmacy sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            PharmaGo
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: isActive('/') ? 'bold' : 'normal',
              textDecoration: isActive('/') ? 'underline' : 'none',
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/medicines')}
            sx={{
              fontWeight: isActive('/medicines') ? 'bold' : 'normal',
              textDecoration: isActive('/medicines') ? 'underline' : 'none',
            }}
          >
            Medicines
          </Button>
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/orders')}
                sx={{
                  fontWeight: isActive('/orders') ? 'bold' : 'normal',
                  textDecoration: isActive('/orders') ? 'underline' : 'none',
                }}
              >
                My Orders
              </Button>
              {user?.role === 'ADMIN' && (
                <Button
                  color="inherit"
                  onClick={() => navigate('/admin')}
                  sx={{
                    fontWeight: isActive('/admin') ? 'bold' : 'normal',
                    textDecoration: isActive('/admin') ? 'underline' : 'none',
                  }}
                >
                  Admin Panel
                </Button>
              )}
            </>
          )}
        </Box>

        {/* Right side - Cart and User */}
        <Box display="flex" alignItems="center" gap={1}>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}

          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    {user?.name}
                  </Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleNavigation('/dashboard')}>
                  <Dashboard sx={{ mr: 1 }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/profile')}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box display="flex" gap={1}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                variant={isActive('/login') ? 'outlined' : 'text'}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/register')}
                variant={isActive('/register') ? 'outlined' : 'text'}
              >
                Register
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobile menu (you can implement this later) */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;