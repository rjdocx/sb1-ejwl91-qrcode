import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import AdminDashboard from './components/AdminDashboard';
import AdminAuditorDashboard from './components/AdminAuditorDashboard';
import TenantAdminDashboard from './components/TenantAdminDashboard';
import TenantCashierDashboard from './components/TenantCashierDashboard';
import TenantBartenderDashboard from './components/TenantBartenderDashboard';
import TenantAuditorDashboard from './components/TenantAuditorDashboard';
import QRUserView from './components/QRUserView';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import EventSimulation from './components/EventSimulation';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#ff4081',
          },
          secondary: {
            main: '#00e5ff',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-auditor"
            element={
              <ProtectedRoute role="admin-auditor">
                <AdminAuditorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant-admin"
            element={
              <ProtectedRoute role="tenant-admin">
                <TenantAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant-cashier"
            element={
              <ProtectedRoute role="tenant-cashier">
                <TenantCashierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant-bartender"
            element={
              <ProtectedRoute role="tenant-bartender">
                <TenantBartenderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant-auditor"
            element={
              <ProtectedRoute role="tenant-auditor">
                <TenantAuditorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/qr-user" element={<QRUserView />} />
          <Route path="/simulation" element={<EventSimulation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;