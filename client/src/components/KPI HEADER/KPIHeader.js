// /client/src/components/KPIHeader.js

import React from 'react';
// Import your CSS module or assume global styling

const KPIHeader = ({ data, isSticky }) => {
    // Determine the class based on the scroll state (assuming global/Dashboard module styles)
    const headerClass = `kpi-header ${isSticky ? 'sticky-active' : ''}`;
    
    // Note: The totalAmount and totalPaid are coming from the existing Dashboard component logic
    // We are adding a mock profit for now, assuming Expenses will be added later on the server.
    const totalProfit = data.totalRevenue - data.totalExpenses; 

    return (
        <header className={headerClass}>
            <div className="kpi-card">
                <span className="kpi-label">Payment Received</span>
                <span className="kpi-value">${data.totalRevenue?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="kpi-card">
                <span className="kpi-label">Pending Amount</span>
                {/* Pending amount is Total Amount - Total Paid */}
                <span className="kpi-value">${(data.totalAmount - data.totalRevenue)?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="kpi-card highlight-profit">
                <span className="kpi-label">Total Revenue</span>
                <span className="kpi-value">${data.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
        </header>
    );
};

export default KPIHeader;