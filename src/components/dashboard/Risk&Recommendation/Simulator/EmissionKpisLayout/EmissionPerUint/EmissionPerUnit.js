import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import {
    buildStyles,
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GreenUpArrow from "src/assets/images/GreenUpArrow.svg"
import utils from 'src/utils';

const SideHeadContent = ({ leverBtnVal, SideHead, HeadRed, HeadGreen, unit }) => {
    return <>
        <Typography className='EmissionKpiHead' sx={{
            fontWeight: "500",
            fontSize: "13px",
            color: "6C6C6C",
            padding: "12px 0px 0px 15px "
        }} >{SideHead}</Typography>
        <Typography className={`EmissionKpiRed ${!leverBtnVal ? "IncreseRed" : ""} `} sx={{
            fontWeight: 500,
            fontSize: "13px",
            textAlign: "start",
            paddingLeft: "15px",
            color: "#D30D00",
            paddingTop: "4px"
        }} >{HeadRed} {unit}</Typography>
        <Typography className={`EmissionKpiGreen ${!leverBtnVal ? "hideGreen" : ""}`} sx={{
            fontWeight: 500,
            fontSize: "15px",
            textAlign: "start",
            paddingLeft: "15px",
            color: "#b1000e",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            paddingTop: "5px",
            gap: "5px"
        }} > <img src={GreenUpArrow} alt="greenarrowup" /> {HeadGreen}CO2e</Typography>
    </>
}
const CircleContent = ({
    leverBtnVal,
    SideHead,
    HeadRed,
    HeadGreen,
    unit,
    percentSavedValue,
    showEmissionData,
    showAirEmissionData
}) => {
    return <Grid sx={{ height: "28%", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
        <Grid sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        }} >
            <Typography className='EmissionKpiHead' sx={{
                fontWeight: "500",
                fontSize: "14px",
                color: "#6c6c6c",

                padding: "10px 0px 0px 15px "
            }} >{SideHead}</Typography>
            <Typography className={`EmissionKpiBlue ${!leverBtnVal ? "removeBlue" : ""}`} sx={{
                fontWeight: 500,
                fontSize: "13px",
                textAlign: "start",
                paddingLeft: "15px",
                color: "#555f63",
                paddingTop: "4px"
            }} > {unit === "$" ? (
                <>
                    {unit} {HeadRed ? Number(HeadRed).toLocaleString() : HeadRed}
                </>
            ) : (
                <>
                    {HeadRed ? Number(HeadRed).toLocaleString() : HeadRed} {unit}
                </>
            )}
            </Typography>
            {showEmissionData && <Typography className={`EmissionKpiBlueDark ${!leverBtnVal ? "removeBlueDark" : ""}`} sx={{
                fontWeight: 500,
                fontSize: "13px",
                textAlign: "start",
                paddingLeft: "15px",
                color: "#b1000e",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-start",
                paddingBottom: "5px",
                gap: "5px"
            }} > {unit === "$" ? (
                <>
                    {utils.commonFunctions.isNullUndefined(HeadGreen) ? '' : unit} {HeadGreen ? Number(HeadGreen).toLocaleString() : HeadGreen}
                </>
            ) : (
                <>
                    {HeadGreen ? Number(HeadGreen).toLocaleString() : HeadGreen} {utils.commonFunctions.isNullUndefined(HeadGreen) ? '' : unit}
                </>
            )}
            </Typography>}
            {showAirEmissionData && <Typography className={`EmissionKpiBlue ${!leverBtnVal ? "removeBlueDark" : ""}`} sx={{
                fontWeight: 500,
                fontSize: "13px",
                textAlign: "start",
                paddingLeft: "15px",
                color: "#b1000e",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-start",
                paddingBottom: "5px",
                gap: "5px"
            }} > {unit === "$" ? (
                <>
                    {utils.commonFunctions.isNullUndefined(HeadGreen) ? '' : unit} {HeadGreen ? Number(HeadGreen).toLocaleString() : HeadGreen}
                </>
            ) : (
                <>
                    {HeadGreen ? Number(HeadGreen).toLocaleString() : HeadGreen} {utils.commonFunctions.isNullUndefined(HeadGreen) ? '' : unit}
                </>
            )}
            </Typography>}
        </Grid>
        <Grid sx={{ width: "120px", display: "flex", justifyContent: "flex-end" }}>
            <div className='circularProgressBarMainDiv'  >
                <CircularProgressbarWithChildren
                    className='circularProgressWithChildrenfull'
                    value={
                        leverBtnVal ? percentSavedValue : (0)
                    }
                    strokeWidth={10}
                    styles={buildStyles({
                        textColor: "#b1000e",
                        pathColor: "#b1000e",
                        fontSize: 11,
                    })}
                    maxValue={100}
                >
                    <Typography sx={{
                        fontWeight: "600 !important",
                        fontSize: "16px !important",
                        textAlign: "center !important",
                        color: "#b1000e",
                    }} className={`semiCircleVlue EmissionperUnit ${leverBtnVal ? "turnGrey" : ""}`}>
                        {`${leverBtnVal ? utils.commonFunctions.isNullUndefined(percentSavedValue) ? '' : isNaN(percentSavedValue) ? 0 : Number(percentSavedValue).toFixed(2) : ''}%`}
                    </Typography>
                </CircularProgressbarWithChildren>

            </div>
        </Grid>
    </Grid>
}

export const EmissionPerUnit = ({
    leftTopTextProp,
    leftMiddleTextProp,
    leftBottomTextProp,
    leverBtnVal,
    showEmissionData,
    showAirEmissionData,
    rightcirclePercentage,
}) => {
    return (
        <Grid className='actualEmmisionDiv' sx={{
            // boxShadow: " 0px 0px 15px rgba(0, 0, 0, 0.15)",
            borderRadius: "15px",
            width: "35%",
            marginLeft: "20px",
            height: "300px",
            display: "flex",
            flexDirection: "Column",
            background: "#ffffff"
        }} >

            <CircleContent
                leverBtnVal={leverBtnVal}
                showEmissionData={showEmissionData}
                showAirEmissionData={showAirEmissionData}
                SideHead={leftTopTextProp?.heading}
                HeadRed={leftTopTextProp?.redValue}
                HeadGreen={leftTopTextProp?.greenValue}
                unit={leftTopTextProp?.unit}
                percentSavedValue={leftTopTextProp?.percentSavedValue} />
            <Divider sx={{ border: "2px dashed #ECECEC" }} variant='middle' />
            <CircleContent
                leverBtnVal={leverBtnVal}
                showEmissionData={showEmissionData}
                showAirEmissionData={showAirEmissionData}
                SideHead={leftMiddleTextProp?.heading}
                HeadRed={leftMiddleTextProp?.redValue}
                HeadGreen={leftMiddleTextProp?.greenValue}
                unit={leftMiddleTextProp?.unit}
                percentSavedValue={leftMiddleTextProp?.percentSavedValue} />
            <Divider sx={{ border: "2px dashed #ECECEC" }} variant='middle' />
            <CircleContent
                leverBtnVal={leverBtnVal}
                showEmissionData={showEmissionData}
                showAirEmissionData={showAirEmissionData}
                SideHead={leftBottomTextProp?.heading}
                HeadRed={leftBottomTextProp?.redValue}
                HeadGreen={leftBottomTextProp?.greenValue}
                unit={leftBottomTextProp?.unit}
                percentSavedValue={leftBottomTextProp?.percentSavedValue} />

            <Typography textAlign={"center"} sx={{
                fontWeight: "600 !important",
                fontSize: "14px !important",
                textAlign: "center !important",
                color: "#1C1C1C !important",

            }} >Per Unit Savings</Typography>
        </Grid>
    )
}
