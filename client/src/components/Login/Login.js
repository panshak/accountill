import React, { useState } from 'react'
import Field from './Field'
import useStyles from './styles'
import styles from './Login.module.css'
import jwtDecode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { signup, signin } from '../../actions/auth'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { createProfile } from '../../actions/profile'
import { useSnackbar } from 'react-simple-snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import GoogleButton from 'react-google-button'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profilePicture: '', bio: '' }

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [loading, setLoading] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, openSnackbar, setLoading))
    } else {
      dispatch(signin(formData, openSnackbar, setLoading))
    }
    setLoading(true)
  }

  const switchMode = () => setIsSignup((prevState) => !prevState)

  if(user) { history.push('/dashboard') }

  // This function should call your backend Google OAuth endpoint
  const handleGoogleLogin = () => {
    // Change this URL if your backend login endpoint is different
    window.location.href = "http://localhost:5000/auth/google"
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
            <Field
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            { isSignup && <Field name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <div className={styles.buttons}>
            <div>
              {loading
                ? <CircularProgress />
                : <button className={styles.loginBtn}>{ isSignup ? 'Sign Up' : 'Sign In' }</button>
              }
            </div>
            <div className={styles.option}><span>or</span></div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
              <GoogleButton onClick={handleGoogleLogin} />
            </div>
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
          <Link to="forgot">
            <p style={{textAlign: 'center', color: '#1d7dd6', marginTop: '20px'}}>Forgotten Password?</p>
          </Link>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
