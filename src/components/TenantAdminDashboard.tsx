import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, Select, MenuItem } from '@mui/material';
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

const TenantAdminDashboard: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<number | ''>('');

  useEffect(() => {
    // Fetch available currencies for this tenant from API
    // This is a mock implementation. Replace with actual API call.
    setCurrencies([
      { id: 1, name: 'US Dollar', code: 'USD', symbol: '$' },
      { id: 2, name: 'Euro', code: 'EUR', symbol: '€' },
    ]);
  }, []);

  const handleCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCurrency(event.target.value as number);
    // API call to update tenant's selected currency
    console.log('Selected currency:', event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tenant Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Select Currency</Typography>
            <Select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              fullWidth
              margin="dense"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.id} value={currency.id}>
                  {currency.name} ({currency.code})
                </MenuItem>
              ))}
            </Select>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Event Management</Typography>
            {/* Add event management functionality */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Staff Management</Typography>
            {/* Add staff management functionality */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Analytics</Typography>
            {/* Add analytics and reporting */}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantAdminDashboard;