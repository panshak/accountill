import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvoices: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace these URLs with your backend API endpoints
        const usersRes = await axios.get("http://localhost:5000/api/users/count");
        const invoicesRes = await axios.get("http://localhost:5000/api/invoices/count");
        const customersRes = await axios.get("http://localhost:5000/api/customers/count");

        setStats({
          totalUsers: usersRes.data.count,
          totalInvoices: invoicesRes.data.count,
          totalCustomers: customersRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Invoices</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalInvoices}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Customers</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.totalCustomers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
