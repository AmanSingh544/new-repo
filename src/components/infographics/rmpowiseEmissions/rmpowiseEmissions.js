import React from 'react'
import BarChart from '../charts/barChart'

export const RmpowiseEmissions = () => {
  const buDataProp = {
    labelArr: ["RMPO 1", "RMPO 2", "RMPO 3", "RMPO 4", "RMPO 5", "RMPO 6", "RMPO 7", "RMPO 8"],
    barDataArr: [620, 230, 500, 130, 270, 230, 500, 130],
    bgColorArr: ["#0094BA"],
    totalData: [{
      bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
      emission: 0,
      emission_percentage: "0.0"
    }]

  }
  return (
    <BarChart
      single={true}
      roundBar={false}
      type="buPerformance"
      subBu={"rmpo"}
      labelsArr={buDataProp?.labelArr}
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      backgroundColorArr={buDataProp?.bgColorArr}
    />
  )
}
