import { combineReducers } from 'redux'

import invoices from './invoices'
import clients from './clients'
import auth from './auth'
import profiles from './profiles'

// --- ADDED: Import the new dashboard reducer ---
import { dashboardReducer } from './dashboard' 
// ------------------------------------------------

export default combineReducers({ 
    invoices, 
    clients, 
    auth, 
    profiles, 
    
    // --- ADDED: Mount the new dashboard reducer state slice ---
    dashboard: dashboardReducer 
    // ----------------------------------------------------------
})