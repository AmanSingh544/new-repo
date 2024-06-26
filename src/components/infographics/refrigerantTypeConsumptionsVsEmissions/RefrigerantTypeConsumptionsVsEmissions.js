import React from "react";
import LineChart from "../charts/lineChart";


export const RefrigerantTypeConsumptionsVsEmissions = () => {
  const dataProp = {
    chartData: [{
        data: [{ month: null, year: 2019, quarter: null, emission: 0.04 },
        { month: null, year: 2020, quarter: null, emission: 0.00 },
        { month: null, year: 2021, quarter: null, emission: 0.00 },
        { month: null, year: 2022, quarter: null, emission: 0.00 }],
        label: "Road"
    },

   
    ]
}
  return (
    <>
      <LineChart chartViewPage={"detailRefrigerationFuel"} chartData={dataProp?.chartData} />
    </>

  )
}
