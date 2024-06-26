import { Grid, Typography } from '@mui/material'
import React from 'react'
import { simulatorActualMatrixName, simulatorMatrixName } from 'src/constants/appConstants'
import { findValueForEmissionKpis, findDataForEmissionKpis } from 'src/utils/utilityFunction'
// import { HeadGreen, utils, unit,  } from "../EmissionKpisLayout/EmissionPerUint/EmissionPerUnit"


export const MidMatricsLayout = ({ dataMetrics, showMidMetrics, showEmissionData, showAirEmissionData }) => {

  const distanceTravelled = findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.greenValue;
  const displayUnit = distanceTravelled >= 1000000 ? "Mn Km" : "KM";

  return (
    <Grid margin={"20px 30px"} sx={{
      background: " #FFFFFF",
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.05)",
      borderRadius: "15px",
      height: "100px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
    }} >
      <Grid sx={{ width: "25%" }} display={"flex"} flexDirection={"column"} >
        <Typography sx={{
          fontWeight: "400",
          fontSize: "15px",
          color: "#1C1C1C",
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "5px"
        }} >
          Distance Travelled
        </Typography>
        <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          // color: "#172B54",
          color:"#566064",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.value} {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.unit}
        </Typography>
        {showEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.greenValue} {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.unit}
          </Typography>}
        {showAirEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.greenValue} {findValueForEmissionKpis(simulatorActualMatrixName.distanceTravelled, dataMetrics)?.unit}
          </Typography>}
      </Grid>
      <span style={{
        border: "3px solid #DADCE2",
        height: "47px",
        borderRadius: "3px"
        // width:
      }} ></span>
      <Grid sx={{ width: "25%" }} display={"flex"} flexDirection={"column"} >
        <Typography sx={{
          fontWeight: "400",
          fontSize: "15px",
          color: "#1C1C1C",
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "5px"
        }} >
          Total Shipment Count
        </Typography>
        <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          // color: "#172B54",
          color:"#566064",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.value}
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.unit}
        </Typography>
        {showEmissionData && <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          color: "#b1000e",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.greenValue}
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.unit}
        </Typography>}
        {showAirEmissionData && <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          color: "#b1000e",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.greenValue}
          {findValueForEmissionKpis(simulatorActualMatrixName.totalShipmentCount, dataMetrics)?.unit}
        </Typography>}
      </Grid>
      <span style={{
        border: "3px solid #DADCE2",
        height: "47px",
        borderRadius: "3px"
        // width:
      }} ></span>
      <Grid sx={{ width: "25%" }} display={"flex"} flexDirection={"column"} >
        <Typography sx={{
          fontWeight: "400",
          fontSize: "15px",
          // color: "#1C1C1C",
          color: "#566064",

          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "5px"
        }} >
          Weight Shipped
        </Typography>
        <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          // color: "#172B54",
          color: "#566064",

          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.value} T
          {/* {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.unit} */}
        </Typography>
        {showEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.greenValue} T
            {/* {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.unit} */}
          </Typography>}
        {showAirEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.greenValue} T
            {/* {findValueForEmissionKpis(simulatorActualMatrixName.totalTonnageOfGoodShipped, dataMetrics)?.unit} */}
          </Typography>}
      </Grid>
      <span style={{
        border: "3px solid #DADCE2",
        height: "47px",
        borderRadius: "3px"
        // width:
      }} ></span>
      <Grid sx={{ width: "25%" }} display={"flex"} flexDirection={"column"} >
        <Typography sx={{
          fontWeight: "400",
          fontSize: "15px",
          color: "#1C1C1C",
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: "5px"
        }} >
          Countries Involved
        </Typography>
        <Typography sx={{
          fontWeight: "600",
          fontSize: "20px",
          // color: "#172B54",
          color:"#566064",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }} >
          {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.value} {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.unit}
        </Typography>
        {showEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.value} {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.unit}
          </Typography>}
        {showAirEmissionData &&
          <Typography sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#b1000e",
            letterSpacing: "-0.02em",
            textAlign: "center"
          }} >
            {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.value} {findValueForEmissionKpis(simulatorActualMatrixName.countriesInvolved, dataMetrics)?.unit}
          </Typography>}
      </Grid>
      {/* <Divider orientation='vertical' sx={{height:"100%",width:"10px"}}  variant='middle' />   */}
    </Grid>
  )
}
