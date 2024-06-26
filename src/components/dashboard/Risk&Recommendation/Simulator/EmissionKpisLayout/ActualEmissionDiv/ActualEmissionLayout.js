import { Grid, Typography } from '@mui/material'
import React from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import utils from 'src/utils';
export const ActualEmissionLayout = ({
  dataProp,
  leverBtnVal,
  showEmissionData,
  showAirEmissionData
}) => {
  return (
    <Grid className='actualEmmisionDiv' sx={{
      background: "#FFFFFF",
      boxShadow: " 0px 0px 15px rgba(0, 0, 0, 0.15)",
      borderRadius: "15px",
      width: "27%",
      height: "300px",
    }} >
      <Typography className='EmissionKpiHead' sx={{
        fontWeight: "500",
        fontSize: "14px",
        color: "#6c6c6c",
        textAlign: "center",
        paddingTop: "12px",

      }} >{dataProp?.heading}</Typography>
      <Typography className={`EmissionKpiBlue ${!leverBtnVal ? "removeBlue" : ""}`} sx={{
        fontWeight: 500,
        fontSize: "13px",
        textAlign: "center",
        color: "#555f63",
        paddingTop: "4px"
      }} > {dataProp?.redValue ? Number(dataProp?.redValue).toLocaleString() : dataProp?.redValue}  {dataProp?.unit}</Typography>
      {showEmissionData && <Typography className={`EmissionKpiBlue ${!leverBtnVal ? "removeBlueDark" : ""}`} sx={{
        fontWeight: 500,
        fontSize: "13px",
        textAlign: "center",
        color: "#b1000e",
        paddingTop: "4px",
      }}>  {dataProp?.greenValue ? Number(dataProp?.greenValue).toLocaleString() : dataProp?.greenValue} {utils.commonFunctions.isNullUndefined(dataProp?.greenValue) ? '' : dataProp?.unit}</Typography>}

      {showAirEmissionData && <Typography className={`EmissionKpiBlue ${!leverBtnVal ? "removeBlueDark" : ""}`} sx={{
        fontWeight: 500,
        fontSize: "13px",
        textAlign: "center",
        color: "#b1000e",
        paddingTop: "4px"
      }}>  {dataProp?.greenValue ? Number(dataProp?.greenValue).toLocaleString() : dataProp?.greenValue} {utils.commonFunctions.isNullUndefined(dataProp?.greenValue) ? '' : dataProp?.greenUnit}</Typography>}
      <Grid className={`circularProgressWithChildrenSemi ${!leverBtnVal ? "increaseMargin" : ""}`} display={"flex"} justifyContent={"center"} >
        <div style={{ width: 200, height: "40%" }} >
          <CircularProgressbarWithChildren

            value={

              leverBtnVal ? dataProp?.percentSavedValue : (0)
            }
            circleRatio={0.5}
            strokeWidth={9}
            styles={{
              root: {
                transform: "rotate(0.75turn)"
              }, ...buildStyles({
                // textColor: "#b1000e",
                // pathColor: "#b1000e",
                // trailColor: "#a7a7a7a", // color of the trail (background)
                // strokeLinecap: "butt",
                textColor: "#b1000e",
                pathColor: "#b1000e",
                trailColor: "#a7a7a7a", // color of the trail (background)
                strokeLinecap: "butt",
              })
            }}
            maxValue={100}
          >
            <Typography sx={{
              fontWeight: "600 !important",
              fontSize: "19px !important",
              textAlign: "center !important",
              color: "#b1000e ",
              // marginBottom: "20px !important"
            }}
            
              className={`semiCircleVlue ${leverBtnVal ? "turnGrey" : ""}`}
            >
              {`${leverBtnVal ? utils.commonFunctions.isNullUndefined(dataProp?.percentSavedValue) ? '' : isNaN(dataProp?.percentSavedValue) ? 0 : Number(dataProp?.percentSavedValue).toFixed(1) : ('')}%`}
            </Typography>
            <Typography sx={{
              fontWeight: "600 !important",
              fontSize: "14px !important",
              textAlign: "center !important",
              color: "#1C1C1C !important",
              marginTop: "55px !important"
            }} className="semiCircletext">Total CO2e Savings</Typography>
            {/* <div className="data-mapping-status">{i?.status}</div> */}
          </CircularProgressbarWithChildren>
        </div>
      </Grid>

    </Grid>
  )
}
