import * as api from '../api/index'

import { ADD_NEW_CLIENT, UPDATE_CLIENT, DELETE_CLIENT, FETCH_CLIENTS_BY_USER, FETCH_CLIENT, START_LOADING, END_LOADING } from './constants'


export const getClient = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchClient(id);
      dispatch({ type: FETCH_CLIENT, payload: { client: data } });

    } catch (error) {
      console.log(error);
    }
  };


export const getClientsByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
    const  { data: { data } } = await api.fetchClientsByUser(searchQuery)
      
      dispatch({ type: FETCH_CLIENTS_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const createClient =(client, openSnackbar) => async (dispatch) => {

    try {
        const { data } = await api.addClient(client)
        dispatch({ type: ADD_NEW_CLIENT, payload: data })
        openSnackbar("Customer added successfully")

    } catch (error) {
        console.log(error)
    }
}


export const updateClient =(id, client, openSnackbar) => async (dispatch) => {

    const { data } = await api.updateClient(id, client)
    dispatch({ type: UPDATE_CLIENT, payload: data })
    openSnackbar("Customer updated successfully")
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteClient =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteClient(id)

        dispatch({type: DELETE_CLIENT, payload: id})
        openSnackbar("Customer deleted successfully")
    } catch (error) {
        console.log(error)
    }
}