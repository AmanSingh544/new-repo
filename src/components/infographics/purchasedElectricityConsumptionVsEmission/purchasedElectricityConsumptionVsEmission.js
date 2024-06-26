import React from 'react'
import BarChart from '../charts/barChart'

export const PurchasedElectricityConsumptionVsEmission = () => {
    const buDataProp = {
        totalData: [{
            bu_id: "4f895080-0f76-4fac-8356-6f66b1f299f8",
            emission: 0,
            emission_percentage: "0.0"
          }],
        labelArr: ["Diesel", "Petrol", "Biogas", "H2 Fuel"],
        barDataArr: [650, 560, 230, 100],
        bgColorArr: ["#00183F", "#555f63", "#00A0CA", "#b1000e"],
        
    
      }
      return (
        <>
          <BarChart
            single={true}
            roundBar={false}
            type="PurchasedElectricityConsumptionVsEmission"
            labelsArr={buDataProp?.labelArr}
            barDataArr={buDataProp?.barDataArr}
            totalData={buDataProp?.totalData}
            backgroundColorArr={buDataProp?.bgColorArr}
          />
        </>
    
      )
    }
