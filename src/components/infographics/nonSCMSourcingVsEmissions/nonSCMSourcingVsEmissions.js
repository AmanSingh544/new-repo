import React from 'react'
import BarChart from '../charts/barChart'

export const NONSCMSourcingVsEmissions = () => {
  const buDataProp = {
    labelArr: ["Non SCM", "Non SCM", "Non SCM", "Non SCM", "Non SCM", "Non SCM", "Non SCM"],
    barDataArr: [620, 230, 500, 130, 270, 230, 500],
    bgColorArr: ["#19A6DE"],
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
      subBu={"NonSCM"}
      labelsArr={buDataProp?.labelArr}
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      backgroundColorArr={buDataProp?.bgColorArr}
    />
  )
}
