import { Grid, Typography } from '@mui/material'
import React from 'react'
import "react-circular-progressbar/dist/styles.css";
import "./EmissionKpisLayout.scss"
import { ActualEmissionLayout } from './ActualEmissionDiv/ActualEmissionLayout';
import { EmissionPerUnit } from './EmissionPerUint/EmissionPerUnit';
import { simulatorActualMatrixName } from 'src/constants/appConstants';
import { findDataForEmissionKpis } from 'src/utils/utilityFunction';
export const EmissionKpisLayout = ({
  emissionKpiListData,
  leverBtnVal,
  showEmissionData,
  showAirEmissionData
}) => {
  return (
    <Grid
      className='emissionKpiMainCont'
    >
      <Typography
        className='emissionKpiText' >Emission KPI’s</Typography>
      <Grid sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "10px",
      }} >
        <Grid className='BaseLineDiv' display={"flex"} alignItems={"center"} justifyContent={"center"} >
          <span
            className='baseLineDivSpan'
          ></span>
          <Typography
            className='baseLineDivtext'
          >Baseline Performance</Typography>
        </Grid>
        <Grid className='BaseLineDiv' display={"flex"} alignItems={"center"} marginLeft={"20px"} justifyContent={"center"} >
          <span
            className='baseLineDivSpanGren'
          ></span>
          <Typography
            className='baseLineDivtext'
          >Achievable Performance</Typography>
        </Grid>

      </Grid>
      <Grid className='emissionKipsBoxDiv' display={"flex"} marginTop={"10px"} >
        <ActualEmissionLayout
          dataProp={findDataForEmissionKpis(simulatorActualMatrixName.actualEmission, emissionKpiListData)}
          leverBtnVal={(showAirEmissionData || showEmissionData) ? leverBtnVal:'' }
          showEmissionData={showEmissionData}
          showAirEmissionData={showAirEmissionData}
        />
        <EmissionPerUnit
          leverBtnVal={(showAirEmissionData || showEmissionData) ? leverBtnVal:'' }
          leftTopTextProp={findDataForEmissionKpis(simulatorActualMatrixName.emissionUnitShipment, emissionKpiListData)}
          leftMiddleTextProp={findDataForEmissionKpis(simulatorActualMatrixName.emissionUnitDistance, emissionKpiListData)}
          leftBottomTextProp={findDataForEmissionKpis(simulatorActualMatrixName.emissionUnitWeight, emissionKpiListData)}
          rightcirclePercentage={15.56}
          rightContText={"Per Unit Savings"}
          showEmissionData={showEmissionData}
          showAirEmissionData={showAirEmissionData}
        />
        <EmissionPerUnit
          leverBtnVal={(showAirEmissionData || showEmissionData) ? leverBtnVal:'' }
          leftTopTextProp={findDataForEmissionKpis(simulatorActualMatrixName.socialCostOfCarbon, emissionKpiListData)}
          leftMiddleTextProp={findDataForEmissionKpis(simulatorActualMatrixName.internalCarbonPricing, emissionKpiListData)}
          leftBottomTextProp={findDataForEmissionKpis(simulatorActualMatrixName.emissionTradingScheme, emissionKpiListData)}
          rightcirclePercentage={11.56}
          rightContText={"Total $ Savings"}
          showEmissionData={showEmissionData}
          showAirEmissionData={showAirEmissionData}
        />
      </Grid>
    </Grid>
  )
}
