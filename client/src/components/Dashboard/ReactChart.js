import * as React from 'react';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';



const ReactChart =({ paymentHistory }) => {

    const payments = paymentHistory.map((payment) => {
        return ({year: moment(payment.datePaid).format("MMM Do YY"), population: payment.amountPaid})
      })


      console.log(payments)

    const data = payments


    return (
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
    );
  }

  export default ReactChart