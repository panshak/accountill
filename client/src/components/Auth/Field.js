import React, { useState } from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Field = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  placeholder,
}) => {
  const [showPass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass((show) => !show);
  };

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={showPass ? "text" : type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {!showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Field;
