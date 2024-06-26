import React from 'react'
import HorizontalBarChart from '../charts/horizontalBarChart'


export const OutsourcedVehicleTypeVsEmissions = () => {

  const labelArr = [['Vehicle type 1'], ['Vehicle type 2'], ['Vehicle type 3'], ['Vehicle type 4'], ['Vehicle type 5']]
  const barDataArr = ['36', '32', '28', '72', '34', '15']

  return (

    <HorizontalBarChart
      roundBar={true}
      type={"OutsourcedVehicleTypeVsEmissions"}
      labelsArr={labelArr}
      barDataArr={barDataArr}
      // maxEmissionBySupplier={maxEmissionBySupplier}
      loading={false}
      typeCss={"outsourced-Vehicle-Type-Vs-Emissions"}
    />
  )
}
