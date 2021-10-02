import React from 'react';
import { TextField, Grid } from '@material-ui/core';

const Input = ({ name, handleChange, label, half, autoFocus, type, value }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      value={value}
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);

export default Input;
