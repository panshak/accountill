import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import SignupForm from "./signup-form";
import LoginForm from "./login-form";

const Auth = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const user = JSON.parse(localStorage.getItem("profile"));

  if (user) {
    history.push("/dashboard");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
      </Switch>
    </Container>
  );
};

export default Auth;
