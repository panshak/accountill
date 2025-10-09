// client/src/reducers/dashboard.js

import { 
    // FIX: Corrected import path to load constants from the central file
    GET_DASHBOARD_KPI_REQUEST, 
    GET_DASHBOARD_KPI_SUCCESS, 
    GET_DASHBOARD_KPI_FAIL 
} from '../actions/constants'; // <-- CORRECTED

const initialState = {
    loading: false,
    kpis: {}, // Will hold the data from the server
    error: null,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_DASHBOARD_KPI_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
            
        case GET_DASHBOARD_KPI_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                kpis: action.payload, 
                error: null 
            };
            
        case GET_DASHBOARD_KPI_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
            
        default:
            return state;
    }
};