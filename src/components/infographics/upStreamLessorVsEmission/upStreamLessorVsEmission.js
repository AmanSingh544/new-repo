import React from 'react'
import BarChart from '../charts/barChart'

export const UpStreamLessorVsEmission = () => {
  const buDataProp = {
    labelArr: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9"],

    bgColorArr: ["#006897", '#64CDFE'],
    totalData: [{
      emission: 0,
      emission_percentage: "0.0",
      bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
    }],
    barDataArr: [620, 230, 500, 130, 270, 230, 500, 130, 270]
  }
  return (
    <BarChart
      single={true}
      roundBar={false}
      type="buPerformance"
      subBu={"UpStreamLessorVsEmission"}
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      labelsArr={buDataProp?.labelArr}
      backgroundColorArr={buDataProp?.bgColorArr}
    />
  )
}
