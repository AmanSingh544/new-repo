import React from 'react'
import HorizontalBarChart from '../charts/horizontalBarChart'


export const DownstreamWasteManagementVsEmission = () => {

  const labelArr = [['Recovery for recycling'], ['Disposal in a landfill'], ['Incineration'], ['Composting'], ['Waste-to-energy (WTE)']]
  const barDataArr = ['36', '32', '28', '72', '34', '15']

  return (
    <HorizontalBarChart
      roundBar={true}
      type={"DownstreamWasteManagementVsEmission"}
      labelsArr={labelArr}
      barDataArr={barDataArr}
      // maxEmissionBySupplier={maxEmissionBySupplier}
      loading={false}
      typeCss={"downstream-Waste-Management-Vs-Emission"}
    />
  )
}
