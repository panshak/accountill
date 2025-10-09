import * as api from '../api/index'
import { AUTH, CREATE_PROFILE } from './constants'


export const signin =(formData, openSnackbar, setLoading) => async(dispatch) => {

    try {
        //login the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data})
        // setLoading(false)
        openSnackbar("Signin successfull")
        // history.push('/dashboard')
        window.location.href="/dashboard"

    } catch (error) {
        // console.log(error?.response?.data?.message)
        openSnackbar(error?.response?.data?.message)
        setLoading(false)
    }
}

export const signup =(formData, openSnackbar, setLoading) => async(dispatch) => {

    try {
        // 1. Sign up the user. Server now returns { result, userProfile, token }
        const { data } = await api.signUp(formData)
        
        // 2. Dispatch AUTH with the full data object (contains user, profile, token)
        dispatch({ type: AUTH, data}) 
        
        // 3. FIX: Dispatch CREATE_PROFILE using the userProfile data from the backend response
        dispatch({ type: CREATE_PROFILE, payload: data.userProfile }); // Use data.userProfile, NOT 'info'

        // history.push('/dashboard')
        window.location.href="/dashboard"
        openSnackbar("Sign up successfull")

    } catch (error) {
        console.log(error)
        openSnackbar(error?.response?.data?.message)
        setLoading(false)
    }
}



export const forgot =(formData) => async(dispatch) => {
    try {
        await api.forgot(formData)
    } catch (error) {
        console.log(error)
    }
}


export const reset =(formData, history) => async(dispatch) => {

    try {
        await api.reset(formData)
        history.push('/dashboard')

    } catch (error) {
        alert(error)
    }
}
