import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, LinearProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface UserData {
  id: number;
  qrValue: number;
  eWalletValue: number;
}

const EventSimulation: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const denominations = [50, 100, 500, 1500];
  const maxCombinedValue = 2000;

  useEffect(() => {
    // Initialize users
    const initialUsers = Array.from({ length: 1200 }, (_, index) => ({
      id: index + 1,
      qrValue: 0,
      eWalletValue: 0,
    }));
    setUsers(initialUsers);

    const simulationDuration = 60000; // 60 seconds
    const updateInterval = 1000; // 1 second

    const interval = setInterval(() => {
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          const randomAction = Math.random();
          if (randomAction < 0.4) { // 40% chance of top-up
            const denomination = denominations[Math.floor(Math.random() * denominations.length)];
            const newQrValue = Math.min(user.qrValue + denomination, maxCombinedValue - user.eWalletValue);
            setTotalTransactions(prev => prev + 1);
            setTotalRevenue(prev => prev + (newQrValue - user.qrValue));
            return { ...user, qrValue: newQrValue };
          } else if (randomAction < 0.8) { // 40% chance of purchase
            const purchaseAmount = Math.floor(Math.random() * 200) + 1; // Random purchase between 1 and 200 PHP
            if (user.qrValue + user.eWalletValue >= purchaseAmount) {
              let newQrValue = user.qrValue;
              let newEWalletValue = user.eWalletValue;
              if (newQrValue >= purchaseAmount) {
                newQrValue -= purchaseAmount;
              } else {
                newEWalletValue -= (purchaseAmount - newQrValue);
                newQrValue = 0;
              }
              setTotalTransactions(prev => prev + 1);
              return { ...user, qrValue: newQrValue, eWalletValue: newEWalletValue };
            }
          }
          return user;
        });
      });

      setSimulationProgress((prev) => Math.min(prev + (updateInterval / simulationDuration) * 100, 100));
    }, updateInterval);

    setTimeout(() => {
      clearInterval(interval);
    }, simulationDuration);

    return () => clearInterval(interval);
  }, []);

  const getTotalBalance = () => {
    return users.reduce((sum, user) => sum + user.qrValue + user.eWalletValue, 0);
  };

  const getAverageBalance = () => {
    const totalBalance = getTotalBalance();
    return totalBalance / users.length;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tenant A Event Simulation (1200 users)
      </Typography>
      <LinearProgress variant="determinate" value={simulationProgress} sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h4">{totalTransactions.toLocaleString()}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Total Revenue (PHP)</Typography>
            <Typography variant="h4">{totalRevenue.toLocaleString()}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Total Balance (PHP)</Typography>
            <Typography variant="h4">{getTotalBalance().toLocaleString()}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Typography variant="h6">Average Balance (PHP)</Typography>
            <Typography variant="h4">{getAverageBalance().toFixed(2)}</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventSimulation;