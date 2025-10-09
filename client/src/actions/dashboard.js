// client/src/actions/dashboard.js

import * as api from '../api'; // Assumes you have an API wrapper function defined here
import {
    GET_DASHBOARD_KPI_REQUEST,
    GET_DASHBOARD_KPI_SUCCESS,
    GET_DASHBOARD_KPI_FAIL
} from './constants'; // <-- IMPORTING from the constants file

export const getDashboardKPIs = () => async (dispatch) => {
    try {
        dispatch({ type: GET_DASHBOARD_KPI_REQUEST });

        // Assuming you have defined the fetchDashboardKPIs function in your API wrapper
        const { data } = await api.fetchDashboardKPIs();

        dispatch({ type: GET_DASHBOARD_KPI_SUCCESS, payload: data });

    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_DASHBOARD_KPI_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};