import * as api from '../api/index'
import { AUTH, CREATE_PROFILE } from './constants'


export const signin =(formData, openSnackbar) => async(dispatch) => {

    try {
        //login the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data})

        openSnackbar("Signin successfull")
        // history.push('/dashboard')
        window.location.href="/dashboard"

    } catch (error) {
        // console.log(error?.response?.data?.message)
        openSnackbar(error?.response?.data?.message)
    }
}

export const signup =(formData, openSnackbar) => async(dispatch) => {

    try {
        //Sign up the user
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data})
        const { info } = await api.createProfile({name: data?.result?.name, email: data?.result?.email, userId: data?.result?._id, phoneNumber: '', businessName: '', contactAddress: '', logo: '', website: ''});
        dispatch({ type: CREATE_PROFILE, payload: info });
        window.location.href="/dashboard"
        // history.push('/dashboard')
        openSnackbar("Sign up successfull")

    } catch (error) {
        console.log(error)
        openSnackbar(error?.response?.data?.message)
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
