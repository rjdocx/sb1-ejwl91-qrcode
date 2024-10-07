import React from 'react';

const TenantBartenderDashboard: React.FC = () => {
  return (
    <div className="dashboard tenant-bartender-dashboard">
      <h1>Tenant Bartender Dashboard</h1>
      <div className="dashboard-content">
        <div className="widget">
          <h2>QR Code Scanner</h2>
          {/* Add QR code scanner functionality */}
        </div>
        <div className="widget">
          <h2>Menu Items</h2>
          {/* Add menu items and pricing */}
        </div>
        <div className="widget">
          <h2>Recent Transactions</h2>
          {/* Add recent transactions list */}
        </div>
      </div>
    </div>
  );
};

export default TenantBartenderDashboard;