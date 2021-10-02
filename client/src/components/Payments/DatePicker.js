import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ setSelectedDate, selectedDate}) {
  // The first commit of Material-UI


  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around" style={{width: '97%', paddingLeft: '10px', paddingBottom: '15px'}}>
        <KeyboardDatePicker
          fullWidth
          disableToolbar
          variant="outline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date paid"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
