import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Paper, Typography, Container, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Field from "../Login/Field";
import { forgot } from "../../actions/auth";
import styles from "./Password.module.css";
import { unicodeToChar } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const Forgot = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [form, setForm] = useState("");
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot({ email: form }));
    window.navigator.onLine ? setStep(1) : setStep(2);
  };

  const handleChange = (e) => setForm(e.target.value);

  if (user) history.push("/dashboard");

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} variant="outlined">
          {step === 0 && (
            <div>
              <Typography variant="h6" gutter="5">
                {unicodeToChar(t("forgot.email_address"))}
              </Typography>
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Field
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {" "}
                    Submit{" "}
                  </Button>
                </Grid>
              </form>
            </div>
          )}

          {step === 1 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: "55px", color: "#3e6947" }}
                ></i>
              </div>
              <br />
              <p>{unicodeToChar(t("forgot.success_msg"))}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => history.push("/")}
                >
                  {unicodeToChar(t("forgot.back_to_home"))}
                </button>
                <button className={styles.button} onClick={() => setStep(0)}>
                  {unicodeToChar(t("forgot.resend"))}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <i
                  className="fas fa-check-circle"
                  style={{ fontSize: "55px", color: "#3e6947" }}
                ></i>
              </div>
              <br />
              <p>{unicodeToChar(t("forgot.connection_error"))}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => history.push("/")}
                >
                  {unicodeToChar(t("forgot.back_to_home"))}
                </button>
                <button className={styles.button} onClick={() => setStep(0)}>
                  {unicodeToChar(t("forgot.resend"))}
                </button>
              </div>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Forgot;
