import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthForm from "./auth-form";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const user = JSON.parse(localStorage.getItem("profile"));

  if (user) {
    history.push("/dashboard");
  }

  const dispatch = useDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <Switch>
        <Route path="/login">
          <AuthForm onSubmit={() => dispatch(signin())} />
        </Route>
        <Route path="/signup">
          <AuthForm isSignup onSubmit={() => dispatch(signup())} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Auth;
