import { Grid, Typography, Avatar, Paper, Button } from "@material-ui/core";
import { useState } from "react";
import Field from "./Field";
import { GoogleLogin } from "react-google-login";
// import ProgressButton from "react-progress-button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import styles from "./Login.module.css";
import { createProfile } from "../../actions/profile";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePicture: "",
  bio: "",
};

const AuthForm = ({ isSignup = false, onSubmit }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch(
      createProfile({
        name: result?.name,
        email: result?.email,
        userId: result?.googleId,
        phoneNumber: "",
        businessName: "",
        contactAddress: "",
        logo: result?.imageUrl,
        website: "",
      })
    );

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unseccassful. Try again later");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof onSubmit === "function") {
      try {
        setIsLoading(true);
        await Promise.resolve(onSubmit(formData));
        setIsLoading(false);
      } catch (err) {
        // handle error
        setIsLoading(false);
      }
    }
  };

  return (
    <Paper className={classes.paper} elevation={2}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isSignup ? "Sign up" : "Sign in"}
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
            type={"password"}
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <button
                disabled={isLoading}
                type="submit"
                className={styles.submitBtn}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            )}
          </div>
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className={styles.googleBtn}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
        <Grid container justifyContent="center">
          <Grid item>
            {isSignup ? (
              <Link to="/login">Already have an account? Sign in</Link>
            ) : (
              <Link to="/signup">Don't have an account? Sign Up</Link>
            )}
          </Grid>
        </Grid>
        <Link to="forgot">
          <p
            style={{ textAlign: "center", color: "#1d7dd6", marginTop: "20px" }}
          >
            Forgotten Password?
          </p>
        </Link>
      </form>
    </Paper>
  );
};

export default AuthForm;
