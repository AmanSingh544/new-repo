import React from 'react'
import HorizontalBarChart from '../charts/horizontalBarChart'


export const UpstreamWasteManagementVsEmission = () => {

  const labelArr = [['Recovery for recycling'], ['Disposal in a landfill'], ['Incineration'], ['Composting'], ['Waste-to-energy (WTE)']]
  const barDataArr = ['36', '32', '28', '72', '34', '15']

  return (

    <HorizontalBarChart
      roundBar={true}
      type={"UpstreamWasteManagementVsEmission"}
      labelsArr={labelArr}
      barDataArr={barDataArr}
      // maxEmissionBySupplier={maxEmissionBySupplier}
      loading={false}
      typeCss={"upstream-Waste-Management-Vs-Emission"}
    />
  )
}
