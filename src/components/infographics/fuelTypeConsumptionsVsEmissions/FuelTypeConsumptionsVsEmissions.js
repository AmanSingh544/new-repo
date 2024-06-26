import React from "react";
import "../charts/chart.scss";
import BarChart from "../charts/barChart";


export const FuelTypeConsumptionsVsEmissions = () => {



  const buDataProp = {
    labelArr: ["Diesel", "Petrol", "Biogas", "H2 Fuel"],
    barDataArr: [650, 560, 230, 100],
    bgColorArr: ["#00183F", "#555f63", "#00A0CA", "#b1000e"],
    totalData: [{
      bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
      emission: 0,
      emission_percentage: "0.0"
    }]

  }
  return (
    <>
      <BarChart
        single={true}
        roundBar={false}
        type="FuelTypeConsumptionsVsEmissions"
        labelsArr={buDataProp?.labelArr}
        barDataArr={buDataProp?.barDataArr}
        totalData={buDataProp?.totalData}
        backgroundColorArr={buDataProp?.bgColorArr}
      />
    </>

  )
}
