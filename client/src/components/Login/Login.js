import React, { useState } from 'react';
import Field from './Field';
import useStyles from './styles';
import styles from './Login.module.css';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { signup, signin } from '../../actions/auth';
import { createProfile } from '../../actions/profile';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useSnackbar } from 'react-simple-snackbar';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
  bio: '',
};

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar] = useSnackbar();
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignup) {
      dispatch(signup(formData, openSnackbar, setLoading));
    } else {
      dispatch(signin(formData, openSnackbar, setLoading));
    }
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
  };

  const googleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const token = credentialResponse.credential;

      // Save auth and create profile
      dispatch({
        type: 'AUTH',
        data: { result: decoded, token },
      });

      // Create new profile on first sign-in
      dispatch(
        createProfile({
          name: decoded.name,
          email: decoded.email,
          userId: decoded.sub || decoded.jti,
          phoneNumber: '',
          businessName: '',
          contactAddress: '',
          logo: decoded.picture,
          website: '',
        })
      );

      openSnackbar('Google sign-in successful!');
      history.push('/dashboard');
    } catch (error) {
      console.error('Google login failed', error);
      openSnackbar('Google sign-in failed. Try again.');
    }
  };

  const googleError = (error) => {
    console.error('Google Sign-In Error:', error);
    openSnackbar('Google Sign-In failed. Please try again.');
  };

  if (user) {
    history.push('/dashboard');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Field
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Field
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            <Field
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Field
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Field
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <div className={styles.buttons}>
            <div>
              {loading ? (
                <CircularProgress />
              ) : (
                <button className={styles.loginBtn}>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
              )}
            </div>

            <div className={styles.option}>
              <span>or</span>
            </div>

            <div>
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleError}
                  text="continue_with"
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
          </div>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>

          <Link to="/forgot">
            <p
              style={{
                textAlign: 'center',
                color: '#1d7dd6',
                marginTop: '20px',
              }}
            >
              Forgotten Password?
            </p>
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;


