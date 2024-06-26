import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./DeCarbonLeverLayout.scss"
import { dispatchSimulatorModeFilters } from 'src/components/filters/selectFilter';
import { store } from "../../../../../redux/store";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { simulatorFilterActions } from '../SimulatorFilterLayout/simulator-filter-actions';
export const DeCarbonLeverLayout = ({
    leverBtnVal,
    handleLeverChange,
    handleModeChangeTo,
    handleLoadDayChange,
    loadDay,
    handleMidMetricLayout,
    handleAirMidMetricLayout,
    setShowEmissionData,
    setShowAirEmissionData,
    handleDecarbonizationLeverChange,
    clearAll
}) => {
    const [airToOceanBtnActive,setAirToOceanBtnActive] = useState(false)
const {
    setSimulatorModeFilters,
} = simulatorFilterActions;

// console.log({ "store": store.getState().simulatorFilters.modes });

const { pathname } = useLocation();

const dispatch = useDispatch();

const { modes } = useSelector(
    (state) => {
        let isSimulator = pathname.includes("simulator")
        if (isSimulator) {
            return state.simulatorFilters
        }
        else {
            return state.detailedFilters
        }
    }
);

const handleSelectAirFilter = () => {
    const modeAir = {
        "id": 5,
        "name": "Air",
        "slug": "air",
        "type": "Main",
        "locale": "en",
        "created_at": "2021-11-15T08:27:03.000Z",
        "updated_at": "2021-11-15T08:27:03.000Z",
        "cover": null
    }
    dispatchSimulatorModeFilters(modeAir, modes, setSimulatorModeFilters, dispatch)
}
const handleSelectLoadFilter = () => {
    const modeRoad = {
        "id": 3,
        "name": "Road",
        "slug": "road",
        "type": "Main",
        "locale": "en",
        "created_at": "2021-11-15T08:27:03.000Z",
        "updated_at": "2021-11-15T08:27:03.000Z",
        "cover": null
    };

    dispatchSimulatorModeFilters(modeRoad, modes, setSimulatorModeFilters, dispatch);
}

const airToOceanHandler = () => {
    setAirToOceanBtnActive(true)
}

const airToOceanBtnClear = () => setAirToOceanBtnActive(false)

return (
    <Grid className='DeCarbonLayoutMainDiv' sx={{}} >
        <Grid sx={{
            margin: "16px 10px 0px 10px"
        }} ><Typography className='DecarbHeading'  >Decarbonisation Levers</Typography>
        </Grid>
        <Grid className='leverBtnDiv' display={"flex"} >
            <Grid className='modesShiftBtn' display={'flex'}  >
                <div className={`modeBtn ${leverBtnVal === "mode" ? "activeLever" : ""}`} onClick={() => {
                    handleDecarbonizationLeverChange(false,false,'mode');//handleModeChangeTo("mode");
//DEFINITION:- handleDecarbonizationLeverChange = (showEmissionData, showAirEmissionData, leverBtnVal, loadDay)
                    handleSelectAirFilter();
                    handleAirMidMetricLayout();
                }}
                ><Typography className={`leverBtnText`} >Mode Shift</Typography>
                </div>

                <div className={`loadBtn ${leverBtnVal === "load" ? "activeLever" : ""}`}
                    onClick={() => {
                        handleDecarbonizationLeverChange(false,false,'load','');//handleLeverChange("load");
                        handleSelectLoadFilter();
                        handleMidMetricLayout();
                        setShowEmissionData(false)
                        airToOceanBtnClear();
                    }}
                ><Typography className={`leverBtnText`}  >Load Consolidation</Typography>
                </div>
            </Grid>
            {
                leverBtnVal &&
                <Grid className="valBtnDiv"  >
                    {leverBtnVal === "mode" &&
                        <div className='modeBtnDiv'  >
                            <Typography
                                className='modHeadText'
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    letterSpacing: "-0.02em",
                                    color: "#0A4A7E"
                                }}
                            >Mode</Typography>
                            <div className= { `${airToOceanBtnActive ? 'airOceanDivActive' : "airOceanDiv"}` }
                                onClick={() => {
                                    handleDecarbonizationLeverChange(false,true,'mode','');//handleModeChangeTo("mode");
                                    airToOceanHandler();
                                    setShowAirEmissionData(true);
                                }}>
                                Air to Ocean
                            </div>
                            {/* airOceanDiv */}
                        </div>
                    }
                    {leverBtnVal === "load" &&
                        <div className='modeBtnDiv' >
                            <Typography
                                className='modHeadText'
                            >Load Consolidation</Typography>
                            <div className='loadConsolDiv' >
                                <div className={`loadDay ${loadDay === 3 ? "dayActive" : ""}`}
                                    onClick={() => {
                                        setShowEmissionData(true)
                    // const handleLoadDayChange = (showEmissionData, showAirEmissionData,leverBtnVal,loadDay) => { 
                                        handleLoadDayChange(true,false,'load',3);
                                        // handleLeverChange(("load"))
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#E8E8E8",
                                        borderRadius: "5px 0px 0px 5px",
                                        height: "35px",
                                        width: "120px",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        letterSpacing: "-0.02em",
                                        color: "#1C1C1C",
                                        cursor: "pointer"
                                    }}  >
                                    3 Day
                                </div>
                                <div className={`loadDay ${loadDay === 5 ? "dayActive" : ""}`}
                                    onClick={() => {
                                        setShowEmissionData(true)
                                        handleLoadDayChange(true,false,'load',5);
                                    }} style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#E8E8E8",
                                        borderLeft: "1px solid #A7A7A7",
                                        height: "35px",
                                        width: "120px",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        letterSpacing: "-0.02em",
                                        color: "#1C1C1C",
                                        cursor: "pointer"
                                    }}  >
                                    5 Day
                                </div>
                                <div className={`loadDay ${loadDay === 7 ? "dayActive" : ""}`}
                                    onClick={() => {
                                        setShowEmissionData(true)
                                        handleLoadDayChange(true,false,'load',7);
                                    }} style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#E8E8E8",
                                        height: "35px",
                                        width: "120px",
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        letterSpacing: "-0.02em",
                                        color: "#1C1C1C",
                                        borderLeft: "1px solid #A7A7A7",
                                        borderRadius: "0px 5px 5px 0px",
                                        cursor: "pointer"
                                    }}  >
                                    7 Day
                                </div>
                            </div>
                        </div>
                    }
                    <div className='resetBtnDiV' >
                        <button
                            onClick={() => {
                                dispatch(setSimulatorModeFilters([]));
                                setShowEmissionData(false);
                                setShowAirEmissionData(false);
                                clearAll();// handleLeverChange("");
                                airToOceanBtnClear();
                            }}
                            className='resetModeBtnDiv'
                        >Reset</button>
                    </div>
                </Grid>
            }
        </Grid>
    </Grid >
)
}
