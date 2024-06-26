import React from 'react'
import BarChart from '../charts/barChart'

export const SpendVsEmission = () => {
    const buDataProp = {
        labelArr: [
            "Refrigerant",
            "Electricity",
            "Sourcing PG",
            "Capital Goods",
            "Transportation", 
            "Business Travel",
            "Employee Commute" 
          ],
        barDataArr: [
            {
              label: "Cost",
              data: [10, 20, 30, 40, 50, 60,70],
              backgroundColor: "#0A9CC2",
              borderColor: "#0A9CC2",
              barThickness: 20,
              borderWidth: 1,
            },
            {
              label: "Spend",
              data: [20, 30, 40, 50, 60, 70,80],
              backgroundColor: "#555f63",
              borderColor: "#555f63",
              barThickness: 20,
              borderWidth: 1,
            },],
        // bgColorArr: ["#00A0CA"],
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
          type="SpendVsEmission"
          // subBu={"WasteProcessingCompaniesVsEmission"}
          labelsArr={buDataProp?.labelArr}
          barDataArr={buDataProp?.barDataArr}
          totalData={buDataProp?.totalData}
        //   backgroundColorArr={buDataProp?.bgColorArr}
        />
      )}
