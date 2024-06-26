import { Grid } from '@mui/material'
import React from 'react'
import BarChart from 'src/components/infographics/charts/barChart'
import LineChart from 'src/components/infographics/charts/lineChart'
import PieChart from 'src/components/infographics/charts/pieChart'
import LanesEmission from 'src/components/infographics/lanesVsEmission'
import Loader from 'src/components/loader'

export const RenderGraphType = ({
  labelArr,
  pieData,
  bgColorArr,
  buDataProp,
  graphPosition,
  selectedGraphType,
  ModeVsEmissionDataProp,
  laneVsEmissionDataProps,
  consignorvsEmissionProps,
  TotalEmissionDataProp,
  graphLoading
}) => {
  // console.log("TotalEmissionDataProp-->>", TotalEmissionDataProp);

  return (
    <>
{    console.log("selectedGraphType",selectedGraphType)
}    <Grid className='Achievable GraphDiv' sx={{ display: "flex", height: "100%" }} >
      {selectedGraphType === "Mode Vs Emissions" && 
        <PieChart
          chartViewPage={"simulator"}
          pieData={ModeVsEmissionDataProp?.chartData}
          labelsArr={ModeVsEmissionDataProp?.labelArr}
          bgColorArr={ModeVsEmissionDataProp?.bgColorArr}
          graphPosition={graphPosition}
        //  loading={modesVsEmissionLoading}
        />}
      {
        selectedGraphType === "BU Performance(BU Vs Emission)" &&
        <BarChart
          roundBar={false}
          type="buPerformance"
          chartViewPage={"simulator"}
          labelsArr={buDataProp?.labelArr}
          barDataArr={buDataProp?.chartData}
          totalData={buDataProp?.totalData}
          graphPosition={graphPosition}
        />

      }
      {
        selectedGraphType === "Lanes Vs Emissions" &&
        <LanesEmission
          chartViewPage={"simulator"}
          single={false}
          roundBar={true}
          type={"lanes"}
          graphPosition={graphPosition}
          labelsArr={laneVsEmissionDataProps?.labelArr}
          barDataArr={laneVsEmissionDataProps?.chartData}
          //   // maxEmissionBySupplier={maxEmissionBySupplier}
          //   // loading={lanesVsEmissionLoading} //ebsLoading}
          totalData={laneVsEmissionDataProps.totalData}
        />
      }
      {/* {
        selectedGraphType === "Mode of Transport" &&
        <LineChart chartViewPage={"simulator"} graphPosition={graphPosition} chartData={consignorvsEmissionProps?.chartData} />
      } */}
      {selectedGraphType === "Total Emission" &&
        <PieChart
          chartViewPage={"simulator"}
          pieData={TotalEmissionDataProp?.chartData}
          labelsArr={TotalEmissionDataProp?.labelArr}
          bgColorArr={TotalEmissionDataProp?.bgColorArr}
          graphPosition={graphPosition}
        />
        }
      {
        selectedGraphType === "Consignor Vs Emissions" &&
        <BarChart
          roundBar={false}
          type="buPerformance"
          chartViewPage={"simulator"}
          labelsArr={buDataProp?.labelArr.slice(0, 6)}
          barDataArr={buDataProp?.chartData.slice(0, 6)}
          totalData={buDataProp?.totalData.slice(0, 6)}
          graphPosition={graphPosition}
        />
      }

    </Grid>
    </>
  )
}
