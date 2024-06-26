import React from 'react'
import DonutChart from '../charts/donutChart'

const ExtractionProductionTransmissionVsEmission = () => {
  return (
    <DonutChart
              type={"ExtractionProductionTransmissionVsEmission"}
              // ghgEmissionsArr={ghgEmissionsArr}
              donutData={
                [23, 100.3, 56,]
              }
              labels={["Extraction","Production","Transmission"]}
              cutout={
                window.screen.width > 1500
                  ? 80
                  : window.screen.width > 1280 && window.screen.width < 1500
                    ? 75
                    : 65
              }
              backgroundColor={
                ["#0094BA","#00183F","#02E7DD"]
              }
            />
  )
}

export default ExtractionProductionTransmissionVsEmission
