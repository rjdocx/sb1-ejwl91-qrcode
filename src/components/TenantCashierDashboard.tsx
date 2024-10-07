import React from 'react';

const TenantCashierDashboard: React.FC = () => {
  return (
    <div className="dashboard tenant-cashier-dashboard">
      <h1>Tenant Cashier Dashboard</h1>
      <div className="dashboard-content">
        <div className="widget">
          <h2>Top-up</h2>
          {/* Add top-up functionality */}
        </div>
        <div className="widget">
          <h2>Refunds</h2>
          {/* Add refund functionality */}
        </div>
        <div className="widget">
          <h2>Transaction History</h2>
          {/* Add transaction history viewer */}
        </div>
      </div>
    </div>
  );
};

export default TenantCashierDashboard;