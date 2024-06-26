import React from 'react'
import HorizontalBarChart from '../charts/horizontalBarChart'

export const FranchiseWiseEmission = () => {

  const labelArr = [['Franchise 1'], ['Franchise 2'], ['Franchise 3'], ['Franchise 4'], ['Franchise 5'], ['Franchise 6']]
  const barDataArr = ['36', '32', '28', '72', '34', '15']

  return (

    <HorizontalBarChart
      roundBar={true}
      type={"franchiseWiseEmission"}
      labelsArr={labelArr}
      barDataArr={barDataArr}
      loading={false}
      typeCss={"franchise-Wise-Emission"}
    />
  )
}
