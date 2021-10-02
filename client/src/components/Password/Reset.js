import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography, Container, Grid } from '@material-ui/core';
import useStyles from './styles';
import Field from '../Login/Field';
import { useParams, useHistory } from 'react-router-dom'

import { reset } from '../../actions/auth';

const Reset = () => {
  const classes = useStyles();
  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()
  const { token } = useParams()
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleSubmit = (e) => {
    e.preventDefault()
      dispatch(reset({ password: form, token: token}, history))
  }

  const handleChange = (e) => setForm(e.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  
  if(user) history.push('/dashboard')

  return (
    <div style={{paddingTop: '100px', paddingBottom: '100px'}}>
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} variant="outlined">
                <Typography variant="h6" gutter="5">Please enter your new password</Typography>
           
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                <Field name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Submit
          </Button>
          </Grid>
                </form>
            </Paper>
        </Container>
    </div>
   
  );
}

export default Reset
