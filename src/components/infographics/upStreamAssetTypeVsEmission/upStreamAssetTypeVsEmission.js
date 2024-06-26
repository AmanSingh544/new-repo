import React from 'react'
import BarChart from '../charts/barChart'

export const UpStreamAssetTypeVsEmission = () => {
  const buDataProp = {

    barDataArr: [620, 230, 500, 130, 270, 230, 500, 130, 270],
    bgColorArr: ["#0A9CC2", '#b1000e'],
    totalData: [{
      bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
      emission: 0,
      emission_percentage: "0.0"
    }],
    labelArr: ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9"]
  }

  return (
    <BarChart
      barDataArr={buDataProp?.barDataArr}
      totalData={buDataProp?.totalData}
      backgroundColorArr={buDataProp?.bgColorArr}

      single={true}
      roundBar={false}
      type="buPerformance"
      subBu={"UpStreamAssetTypeVsEmission"}
      labelsArr={buDataProp?.labelArr}

    />
  )
}
