
//Copyright (c) 2022 Panshak Solomon

import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import Home from './components/Home/Home';
import Invoice from './components/Invoice/Invoice';
import Invoices from './components/Invoices/Invoices';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails'
import ClientList from './components/Clients/ClientList'
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'

// App wrapper that provides theme context
const AppWrapper = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

// Main app content that consumes theme context
function AppContent() {
  const { theme } = useContext(ThemeContext);
  
  // Create Material UI theme based on current theme setting
  const muiTheme = createTheme({
    palette: {
      type: theme,
      primary: {
        main: theme === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: theme === 'dark' ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: theme === 'dark' ? '#303030' : '#fafafa',
        paper: theme === 'dark' ? '#424242' : '#fff',
      },
    },
  });

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Applies baseline styles and respects theme */}
      <div>
        <BrowserRouter>
        <SnackbarProvider>
        {user && <NavBar />} 
        <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/invoice" exact component={Invoice} />
            <Route path="/edit/invoice/:id" exact component={Invoice} />
            <Route path="/invoice/:id" exact component={InvoiceDetails} />
            <Route path="/invoices" exact component={Invoices} />
            <Route path="/login" exact component={Login} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/customers" exact component={ClientList} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/reset/:token" exact component={Reset} />
            <Redirect exact from="/new-invoice" to="/invoice" />
          </Switch>
          <Footer />
          </SnackbarProvider>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default AppWrapper;
