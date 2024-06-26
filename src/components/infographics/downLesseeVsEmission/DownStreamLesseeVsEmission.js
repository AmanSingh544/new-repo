import React from 'react'
import BarChart from '../charts/barChart'

export const DownStreamLesseeVsEmission = () => {
  const buDataProp = {
    labelArr: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9"],
    totalData: [{
      bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
      emission: 0,
      emission_percentage: "0.0"
    }],
    barDataArr: [620, 230, 500, 130, 270, 230, 500, 130, 270],
    bgColorArr: ["#0A9CC2", '#b1000e'],

  }
  return (
    <BarChart

      type="buPerformance"
      subBu={"DownStreamLesseeVsEmission"}
      labelsArr={buDataProp?.labelArr}
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      single={true}
      roundBar={false}
      backgroundColorArr={buDataProp?.bgColorArr}
    />
  )
}
