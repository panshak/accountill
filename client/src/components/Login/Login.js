import React, { useState } from 'react'
import Field from './Field'
import useStyles from './styles'
import styles from './Login.module.css'
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { signup, signin } from '../../actions/auth'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { createProfile } from '../../actions/profile'
import { useSnackbar } from 'react-simple-snackbar'
import CircularProgress from '@material-ui/core/CircularProgress';



const initialState ={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', bio: ''}

const Login = () => {

    const classes = useStyles();
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false);
     // eslint-disable-next-line 
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [loading, setLoading] = useState(false)
    
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleChange =(e)=> {
        setFormData( {...formData, [e.target.name] : e.target.value} )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password || (isSignup && (!formData.firstName || !formData.lastName))) {
            openSnackbar("Please fill in all required fields");
            return;
        }
        
        if (isSignup && formData.password !== formData.confirmPassword) {
            openSnackbar("Passwords don't match");
            return;
        }

        setLoading(true)
        try {
            if(isSignup) {
                const response = await dispatch(signup(formData, openSnackbar, setLoading));
                console.log('Signup response:', response);
                if (response?.success) {
                    openSnackbar("Sign up successful!");
                    window.location.href = '/dashboard';
                } else {
                    openSnackbar(response?.error || "Sign up failed. Please try again.");
                }
            } else {
                const response = await dispatch(signin(formData, openSnackbar, setLoading));
                console.log('Signin response:', response);
                if (response?.success) {
                    openSnackbar("Sign in successful!");
                    window.location.href = '/dashboard';
                } else {
                    openSnackbar(response?.error || "Sign in failed. Please check your credentials.");
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            openSnackbar("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    const switchMode =() => {
        setIsSignup((prevState) => !prevState)
    }

    const googleSuccess = async (res) => {
        const result = jwtDecode(res.credential);
        const token = res?.credential;
        dispatch(createProfile({name: result?.name, email: result?.email, userId: result?.jti, phoneNumber: '', businessName: '', contactAddress: '', logo: result?.picture, website: ''}))

        try {
            dispatch({ type: "AUTH", data: {result, token}})

            window.location.href='/dashboard'
            
        } catch (error) {
            console.log(error)
        }
    }
    const googleError =(error) => {
        console.log(error)
        console.log("Google Sign In was unseccassful. Try again later")
    }


    if(user) {
      history.push('/dashboard')
    }

    return (
        <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={2}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Field name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Field name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Field name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Field name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Field name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <div className={styles.buttons}>
               <div>
                    <button 
                      type="submit"
                      className={`${styles.loginBtn} ${loading ? styles.loading : ''}`}
                      disabled={loading}
                    >
                      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                      </span>
                      {loading && (
                        <CircularProgress 
                          size={24}
                          style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                            color: '#1976d2'
                          }}
                        />
                      )}
                    </button>
                </div>
                <div className={styles.option}>
                  <span>or</span>
                </div>
                <div> 
                  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                      onSuccess={googleSuccess}
                      onError={googleError}
                      text='continue_with'
                      useOneTap
                      auto_select
                      state_cookie_domain='single_host_origin'
                    />
                  </GoogleOAuthProvider>
                </div>
          </div>
          <div className={styles.signupContainer}>
            <Button onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
          </div>
        <Link to="forgot"><p style={{textAlign: 'center', color: '#1d7dd6', marginTop: '20px'}}>Forgotten Password?</p></Link>
        </form>
      </Paper>
    </Container>
    )
}

export default Login
