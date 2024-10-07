import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, Button, TextField, Select, MenuItem, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

interface Tenant {
  id: number;
  name: string;
  currencies: Currency[];
}

const AdminDashboard: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [newTenantName, setNewTenantName] = useState('');
  const [selectedCurrencies, setSelectedCurrencies] = useState<number[]>([]);

  useEffect(() => {
    // Fetch tenants and currencies from API
    // This is a mock implementation. Replace with actual API calls.
    setTenants([
      { id: 1, name: 'Tenant A', currencies: [] },
      { id: 2, name: 'Tenant B', currencies: [] },
    ]);
    setCurrencies([
      { id: 1, name: 'US Dollar', code: 'USD', symbol: '$' },
      { id: 2, name: 'Euro', code: 'EUR', symbol: '€' },
      { id: 3, name: 'British Pound', code: 'GBP', symbol: '£' },
    ]);
  }, []);

  const handleCreateTenant = () => {
    // API call to create new tenant with selected currencies
    console.log('Creating tenant:', newTenantName, 'with currencies:', selectedCurrencies);
    setNewTenantName('');
    setSelectedCurrencies([]);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Create Tenant</Typography>
            <TextField
              label="Tenant Name"
              value={newTenantName}
              onChange={(e) => setNewTenantName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Select
              multiple
              value={selectedCurrencies}
              onChange={(e) => setSelectedCurrencies(e.target.value as number[])}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={currencies.find(c => c.id === value)?.code} />
                  ))}
                </Box>
              )}
              fullWidth
              margin="dense"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.name} ({currency.code})
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" onClick={handleCreateTenant} sx={{ mt: 2 }}>
              Create Tenant
            </Button>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Existing Tenants</Typography>
            {tenants.map((tenant) => (
              <Box key={tenant.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{tenant.name}</Typography>
                <Typography variant="body2">
                  Currencies: {tenant.currencies.map(c => c.code).join(', ') || 'None'}
                </Typography>
              </Box>
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;