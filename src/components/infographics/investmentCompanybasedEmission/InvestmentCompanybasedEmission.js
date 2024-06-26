import React from 'react'
import HorizontalBarChart from '../charts/horizontalBarChart'

const InvestmentCompanybasedEmission = () => {
    const labelArr = [  'Company name 1','Company name 2','Company name 3','Company name 4','Company name 5','Company name 6']
    const barDataArr = ['36', '32', '28', '72', '34', '15']
  
    return (
      <HorizontalBarChart
        roundBar={true}
        type={"InvestmentCompanybasedEmission"}
        labelsArr={labelArr}
        barDataArr={barDataArr}
        bgArr = {["#092F72","#1C4B9E","#b1000e","#35B9F5","#00D3E9","#9AF6FF"]}
        // maxEmissionBySupplier={maxEmissionBySupplier}
        loading={false}
        typeCss={"downstream-Waste-Management-Vs-Emission"}
      />
    )
  }
  
export default InvestmentCompanybasedEmission
