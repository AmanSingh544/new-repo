// import React from 'react'
// import "../charts/chart.scss";
// import DonutChart from '../charts/donutChart';

// export const BusinessTravelVsEmission = () => {
//     const donutDataProp = {
//         labelArr: ['Air Short', 'Air Long', 'Rail'],
//         donutDataArr: [42.6, 28.7, 28.7],
//         bgColorArr: ['rgba(0, 74, 134, 1)', 'rgba(0, 160, 202, 1)', 'rgba(25, 166, 222, 1)']
//     }
//     // alert("Vishnu");
//   return (
//     <div className='business-emission'>
//         <>
//         <DonutChart
//           type={"BusinessTravelVsEmmission"}
//           donutDataArr={donutDataProp?.donutDataArr}
//           labelsArr={donutDataProp?.labelArr}
//           backgroundColorArr={donutDataProp?.bgColorArr}
//           loading={false}
//           />
//         </>
//     </div>
//   )
// }
import React from 'react'
import DonutChart from '../charts/donutChart'

export const BusinessTravelVsEmission = () => {
  return (
    <DonutChart
              type={"ExtractionProductionTransmissionVsEmission"}
              donutData={
                [42.6, 28.7, 28.7]
              }
              labels={["Air long","Air short","Rail"]}
              cutout={
                window.screen.width > 1500
                  ? 80
                  : window.screen.width > 1280 && window.screen.width < 1500
                    ? 75
                    : 65
              }
              backgroundColor={
                ["rgba(0, 160, 202, 1)","rgba(0, 74, 134, 1)","rgba(25, 166, 222, 1)"]
              }
            />
  )
}


