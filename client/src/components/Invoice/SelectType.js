/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectType({ type, setType }) {

    
const options = [
    { title: 'Invoice' },
    { title: 'Receipt' },
    { title: 'Estimate' },
    { title: 'Quotation' },
    { title: 'Bill' },
    
  ];

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.title || ''}
    //   getOptionSelected={(option, value) => option.title === value.value}
      value={type}
      onChange={(event, value) => setType(value)}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Type" variant="outlined" />}
    />
  );
}
