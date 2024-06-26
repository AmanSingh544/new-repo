import React from 'react'
import BarChart from '../charts/barChart'

export const WasteProcessingCompaniesVsEmission = () => {
  const buDataProp = {
    labelArr: ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5", "Company 6"],
    barDataArr: [620, 230, 500, 130, 270, 230],
    bgColorArr: ["#00A0CA"],
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
      type="WasteProcessingCompaniesVsEmission"
      // subBu={"WasteProcessingCompaniesVsEmission"}
      labelsArr={buDataProp?.labelArr}
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      backgroundColorArr={buDataProp?.bgColorArr}
    />
  )
}
