import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ paymentHistory }) {


    let paymentDates = []
    for(let i = 0; i < paymentHistory.length; i++) {
            paymentDates = [...paymentDates, paymentHistory[i].datePaid]
    }


    let paymentReceived = []
    for(let i = 0; i < paymentHistory.length; i++) {
            paymentReceived = [...paymentReceived, paymentHistory[i].amountPaid]
    }


  const series = [
    // {
    //   name: "Cases",
    //   data: [
    //     555,
    //     12038,
    //     69030,
    //     88369,
    //     167466,
    //     932638,
    //     2055423,
    //     3343777,
    //     3845718,
    //   ],
    // },
    // {
    //   name: "Recovered",
    //   data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481],
    // },
    {
      name: "Payment Recieved",
      data: paymentReceived,
    },
  ];
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: paymentDates,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        width: '85%',
        margin: '10px auto',
        padding: '10px'
      }}
    >
      {/* <br />
      <h2>Payment history</h2>
      <br /> */}
      {/* <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={300}
      /> */}
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
        
      />
    </div>
  );
}

export default Chart