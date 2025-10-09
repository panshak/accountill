import * as api from '../api/index'
import { ADD_NEW, UPDATE, DELETE, GET_INVOICE, FETCH_INVOICE_BY_USER, START_LOADING, END_LOADING } from './constants'

// ✅ FIXED VERSION
export const getInvoicesByUser = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    // get logged-in user info
    const user = JSON.parse(localStorage.getItem('profile'))
    // handle both normal signup and Google login
    const userId = user?.result?._id || user?.result?.googleId || user?.jti

    // call API with userId instead of undefined
    const { data: { data } } = await api.fetchInvoicesByUser(userId)

    dispatch({ type: FETCH_INVOICE_BY_USER, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error?.response || error)
  }
}

export const getInvoice = (id) => async (dispatch)=> {
  const user = JSON.parse(localStorage.getItem('profile'))
  try {
    const { data } = await api.fetchInvoice(id)
    const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id || user?.result?.googleId})
    const invoiceData = {...data, businessDetails}
    dispatch({ type: GET_INVOICE, payload: invoiceData })
  } catch (error) {
    console.log(error.response)
  }
}

export const createInvoice =(invoice, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.addInvoice(invoice)
    dispatch({ type: ADD_NEW, payload: data })
    history.push(`/invoice/${data._id}`)
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updateInvoice =(id, invoice) => async (dispatch) => {
  try {
    const { data } = await api.updateInvoice(id, invoice)
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteInvoice =(id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteInvoice(id)
    dispatch({type: DELETE, payload: id})
    openSnackbar("Invoice deleted successfully")
  } catch (error) {
    console.log(error.response)
  }
}
