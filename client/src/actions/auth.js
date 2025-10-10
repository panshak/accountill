import * as api from '../api/index'
import { AUTH, CREATE_PROFILE } from './constants'


export const signin = (formData, openSnackbar, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        
        if (!data?.result) {
            openSnackbar("Login failed. Please check your credentials.");
            return { success: false };
        }

        dispatch({ type: AUTH, data });
        localStorage.setItem('profile', JSON.stringify({ result: data.result, token: data.token }));
        
        openSnackbar("Sign in successful!");
        return { success: true };

    } catch (error) {
        const message = error?.response?.data?.message || "Sign in failed. Please try again.";
        openSnackbar(message);
        console.error("Signin error:", error);
        return { success: false, error: message };
    }
}

export const signup = (formData, openSnackbar, setLoading) => async (dispatch) => {
    try {
        // Sign up the user
        const { data } = await api.signUp(formData);
        
        if (!data?.result) {
            openSnackbar("Registration failed. Please try again.");
            return { success: false };
        }

        // Create the user's profile
        const profileData = {
            name: data.result.name,
            email: data.result.email,
            userId: data.result._id,
            phoneNumber: '',
            businessName: '',
            contactAddress: '',
            logo: '',
            website: ''
        };

        try {
            const { info } = await api.createProfile(profileData);
            dispatch({ type: CREATE_PROFILE, payload: info });
        } catch (profileError) {
            console.log("Profile creation error:", profileError);
            // Continue even if profile creation fails
        }

        // Dispatch auth data and store in localStorage
        dispatch({ type: AUTH, data });
        localStorage.setItem('profile', JSON.stringify({ result: data.result, token: data.token }));
        
        openSnackbar("Sign up successful!");
        return { success: true };

    } catch (error) {
        const message = error?.response?.data?.message || "Sign up failed. Please try again.";
        openSnackbar(message);
        console.error("Signup error:", error);
        return { success: false, error: message };
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
