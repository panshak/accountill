//Copyright (c) 2022 Panshak Solomon

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar';
import Home from './components/Home/Home';
import Invoice from './components/Invoice/Invoice';
import Invoices from './components/Invoices/Invoices';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails';
import ClientList from './components/Clients/ClientList';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Forgot from './components/Password/Forgot';
import Reset from './components/Password/Reset';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <div>
      <BrowserRouter>
        <SnackbarProvider>
          {user && <NavBar />}
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/invoice" exact element={<Invoice />} />
            <Route path="/edit/invoice/:id" exact element={<Invoice />} />
            <Route path="/invoice/:id" exact element={<InvoiceDetails />} />
            <Route path="/invoices" exact element={<Invoices />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/settings" exact element={<Settings />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/customers" exact element={<ClientList />} />
            <Route path="/forgot" exact element={<Forgot />} />
            <Route path="/reset/:token" exact element={<Reset />} />
          </Routes>
          {/* <Navigate exact from="/new-invoice" to="/invoice" /> */}
          <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
