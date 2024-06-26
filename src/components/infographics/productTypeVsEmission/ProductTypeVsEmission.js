import React from 'react'
import BarChart from '../charts/barChart'

export const ProductTypeVsEmission = () => {
  const buDataProp = {
    labelArr: ["PT -1", "PT -2", "PT -3", "PT -4","PT -5","PT -6"],
    barDataArr: [650, 260, 330, 260, 330, 100],
    bgColorArr: "#005876",
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
        type="ProductTypeVsEmission"
        labelsArr={buDataProp?.labelArr}
        barDataArr={buDataProp?.barDataArr}
        totalData={buDataProp?.totalData}
        backgroundColorArr={buDataProp?.bgColorArr}
      />
    </>

  )
}
