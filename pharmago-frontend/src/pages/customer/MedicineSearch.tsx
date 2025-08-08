import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  Pagination,
  Avatar,
  Rating,
  Divider,
  Alert,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingCart,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Star,
  LocalPharmacy,
  Upload,
  AttachFile,
  Visibility,
} from '@mui/icons-material';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  manufacturer: string;
  prescription: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  dosageForm: string;
  strength: string;
  packSize: string;
}

const MedicineSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Check if user came from prescription upload
  const showUpload = searchParams.get('upload') === 'true';

  // Mock medicines data
  const [medicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      category: 'Pain Relief',
      price: 12.99,
      originalPrice: 15.99,
      description: 'Effective pain relief and fever reducer',
      manufacturer: 'PharmaCorp',
      prescription: false,
      inStock: true,
      stockCount: 150,
      rating: 4.5,
      reviewCount: 234,
      image: '/api/placeholder/200/200',
      dosageForm: 'Tablet',
      strength: '500mg',
      packSize: '20 tablets',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      category: 'Antibiotics',
      price: 25.50,
      description: 'Antibiotic for bacterial infections',
      manufacturer: 'MediTech',
      prescription: true,
      inStock: true,
      stockCount: 75,
      rating: 4.8,
      reviewCount: 156,
      image: '/api/placeholder/200/200',
      dosageForm: 'Capsule',
      strength: '250mg',
      packSize: '21 capsules',
    },
    {
      id: 3,
      name: 'Vitamin D3 1000 IU',
      genericName: 'Cholecalciferol',
      category: 'Vitamins',
      price: 18.75,
      description: 'Essential vitamin for bone health',
      manufacturer: 'HealthPlus',
      prescription: false,
      inStock: true,
      stockCount: 200,
      rating: 4.3,
      reviewCount: 89,
      image: '/api/placeholder/200/200',
      dosageForm: 'Tablet',
      strength: '1000 IU',
      packSize: '30 tablets',
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      genericName: 'Ibuprofen',
      category: 'Pain Relief',
      price: 16.25,
      originalPrice: 19.99,
      description: 'Anti-inflammatory pain reliever',
      manufacturer: 'PharmaCorp',
      prescription: false,
      inStock: false,
      stockCount: 0,
      rating: 4.2,
      reviewCount: 312,
      image: '/api/placeholder/200/200',
      dosageForm: 'Tablet',
      strength: '400mg',
      packSize: '24 tablets',
    },
    {
      id: 5,
      name: 'Lisinopril 10mg',
      genericName: 'Lisinopril',
      category: 'Cardiovascular',
      price: 32.00,
      description: 'ACE inhibitor for blood pressure',
      manufacturer: 'CardioMed',
      prescription: true,
      inStock: true,
      stockCount: 45,
      rating: 4.6,
      reviewCount: 67,
      image: '/api/placeholder/200/200',
      dosageForm: 'Tablet',
      strength: '10mg',
      packSize: '30 tablets',
    },
    {
      id: 6,
      name: 'Omega-3 Fish Oil',
      genericName: 'Omega-3 Fatty Acids',
      category: 'Supplements',
      price: 24.99,
      description: 'Heart and brain health supplement',
      manufacturer: 'NutriHealth',
      prescription: false,
      inStock: true,
      stockCount: 120,
      rating: 4.4,
      reviewCount: 445,
      image: '/api/placeholder/200/200',
      dosageForm: 'Softgel',
      strength: '1000mg',
      packSize: '60 softgels',
    },
  ]);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    prescription: 'all',
    inStock: true,
    manufacturer: '',
  });

  const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'Supplements', 'Cardiovascular'];
  const manufacturers = ['PharmaCorp', 'MediTech', 'HealthPlus', 'CardioMed', 'NutriHealth'];

  useEffect(() => {
    if (showUpload) {
      setPrescriptionOpen(true);
    }
  }, [showUpload]);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || medicine.category === filters.category;
    const matchesPrice = medicine.price >= filters.priceRange[0] && medicine.price <= filters.priceRange[1];
    const matchesPrescription = filters.prescription === 'all' || 
                               (filters.prescription === 'prescription' && medicine.prescription) ||
                               (filters.prescription === 'otc' && !medicine.prescription);
    const matchesStock = !filters.inStock || medicine.inStock;
    const matchesManufacturer = !filters.manufacturer || medicine.manufacturer === filters.manufacturer;

    return matchesSearch && matchesCategory && matchesPrice && matchesPrescription && matchesStock && matchesManufacturer;
  });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedicines = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--;
      } else {
        delete newCart[medicineId];
      }
      return newCart;
    });
  };

  const toggleFavorite = (medicineId: number) => {
    setFavorites(prev => 
      prev.includes(medicineId) 
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
  };

  const handlePrescriptionUpload = () => {
    // Handle prescription upload logic
    setPrescriptionOpen(false);
    // Show success message or navigate
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Find Your Medicines
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Search from our wide selection of genuine medicines and healthcare products
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search medicines, brands, or conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterOpen(true)}
                >
                  Filters
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Upload />}
                  onClick={() => setPrescriptionOpen(true)}
                >
                  Upload Prescription
                </Button>
              </Grid>
            </Grid>

            {/* Active Filters */}
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {filters.category && (
                <Chip
                  label={`Category: ${filters.category}`}
                  onDelete={() => setFilters(prev => ({ ...prev, category: '' }))}
                  size="small"
                />
              )}
              {filters.manufacturer && (
                <Chip
                  label={`Brand: ${filters.manufacturer}`}
                  onDelete={() => setFilters(prev => ({ ...prev, manufacturer: '' }))}
                  size="small"
                />
              )}
              {filters.prescription !== 'all' && (
                <Chip
                  label={`Type: ${filters.prescription === 'prescription' ? 'Prescription' : 'OTC'}`}
                  onDelete={() => setFilters(prev => ({ ...prev, prescription: 'all' }))}
                  size="small"
                />
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Results Info */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {filteredMedicines.length} medicines found
          </Typography>
          {Object.keys(cart).length > 0 && (
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/cart')}
              sx={{ position: 'relative' }}
            >
              View Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
            </Button>
          )}
        </Box>

        {/* Medicine Grid */}
        <Grid container spacing={3}>
          {paginatedMedicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={4} key={medicine.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocalPharmacy sx={{ fontSize: 80, color: 'grey.400' }} />
                  </CardMedia>
                  
                  {/* Prescription Badge */}
                  {medicine.prescription && (
                    <Chip
                      label="Prescription Required"
                      color="warning"
                      size="small"
                      sx={{ position: 'absolute', top: 8, left: 8 }}
                    />
                  )}

                  {/* Stock Badge */}
                  {!medicine.inStock && (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    />
                  )}

                  {/* Discount Badge */}
                  {medicine.originalPrice && medicine.originalPrice > medicine.price && (
                    <Chip
                      label={`${Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF`}
                      color="success"
                      size="small"
                      sx={{ position: 'absolute', top: medicine.prescription ? 48 : 8, left: 8 }}
                    />
                  )}

                  {/* Favorite Button */}
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => toggleFavorite(medicine.id)}
                  >
                    {favorites.includes(medicine.id) ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {medicine.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {medicine.genericName} • {medicine.manufacturer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {medicine.strength} • {medicine.packSize}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={medicine.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({medicine.reviewCount})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="h6" color="primary.main" fontWeight={600}>
                      ${medicine.price}
                    </Typography>
                    {medicine.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ${medicine.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  {medicine.inStock && (
                    <Typography variant="body2" color="success.main" gutterBottom>
                      In Stock ({medicine.stockCount} available)
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/medicines/${medicine.id}`)}
                    startIcon={<Visibility />}
                  >
                    View Details
                  </Button>
                  
                  {medicine.inStock && !medicine.prescription && (
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                      {cart[medicine.id] ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => removeFromCart(medicine.id)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography>{cart[medicine.id]}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => addToCart(medicine.id)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<ShoppingCart />}
                          onClick={() => addToCart(medicine.id)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Box>
                  )}

                  {medicine.prescription && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ ml: 'auto' }}
                      onClick={() => setPrescriptionOpen(true)}
                    >
                      Upload Prescription
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Filter Dialog */}
        <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Filter Medicines</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    label="Category"
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(_, value) => setFilters(prev => ({ ...prev, priceRange: value as number[] }))}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 50, label: '$50' },
                    { value: 100, label: '$100+' },
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filters.prescription}
                    label="Type"
                    onChange={(e) => setFilters(prev => ({ ...prev, prescription: e.target.value }))}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="prescription">Prescription Only</MenuItem>
                    <MenuItem value="otc">Over the Counter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Manufacturer</InputLabel>
                  <Select
                    value={filters.manufacturer}
                    label="Manufacturer"
                    onChange={(e) => setFilters(prev => ({ ...prev, manufacturer: e.target.value }))}
                  >
                    <MenuItem value="">All Manufacturers</MenuItem>
                    {manufacturers.map(manufacturer => (
                      <MenuItem key={manufacturer} value={manufacturer}>{manufacturer}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.inStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    />
                  }
                  label="Show only in-stock items"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setFilters({
                  category: '',
                  priceRange: [0, 100],
                  prescription: 'all',
                  inStock: true,
                  manufacturer: '',
                });
              }}
            >
              Clear All
            </Button>
            <Button onClick={() => setFilterOpen(false)} variant="contained">
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>

        {/* Prescription Upload Dialog */}
        <Dialog open={prescriptionOpen} onClose={() => setPrescriptionOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Upload Prescription</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Upload a clear image of your prescription. Our pharmacists will review it and approve your order.
            </Alert>
            
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.light', color: 'white' },
                transition: 'all 0.3s ease',
              }}
            >
              <AttachFile sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & drop your prescription here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or click to browse files
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: JPG, PNG, PDF (Max size: 5MB)
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPrescriptionOpen(false)}>Cancel</Button>
            <Button onClick={handlePrescriptionUpload} variant="contained">
              Upload Prescription
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Cart Button */}
        {Object.keys(cart).length > 0 && (
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default MedicineSearch;