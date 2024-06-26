import { Divider, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import "./ModeOfTransPortation.scss"
import { RenderGraphType } from './RenderGraphType/RenderGraphType'
import utils from 'src/utils'
import Loader from 'src/components/loader'
import NothingFoundView from 'src/components/nothingFoundView/NothingFoundView'

export const ModeOfTransportationLayout = ({
    ModegraphList,
    selectedGraphType,
    setSelectedGraphType,
    leverBtnVal,
    graphData,
    graph1Loading,
    graph2Loading,
    // showEmissionData,
    // displayGraphLayout,
}) => {
    const renderGraph1 = () => {
        if (graph1Loading) {
            return (<Loader />);
        }
        else if (!graph1Loading && !graphData?.graph1Data?.chartData?.length) {
            return (<div style={{ display: "flex", height: "90%", justifyContent: "center", alignItems: "center" }}><NothingFoundView /></div>)
        }
        else {
            return (<RenderGraphType buDataProp={graphData?.graph1Data} selectedGraphType={selectedGraphType}
                ModeVsEmissionDataProp={graphData?.graph1Data}
                laneVsEmissionDataProps={graphData?.graph1Data}
                TotalEmissionDataProp={graphData?.graph1Data}//TotalEmissionDataProp1}
                graphPosition={1} />)
        }
    }

    const renderGraph2 = () => {
        if (graph2Loading) {
            return (<Loader />);
        }
        else if (!graph2Loading && !graphData?.graph2Data?.chartData?.length) {
            return (<div style={{ display: "flex", height: "90%", justifyContent: "center", alignItems: "center" }}><NothingFoundView /></div>)
        }
        else {
            return (graph2Loading ? <Loader /> :
                <RenderGraphType
                    buDataProp={graphData?.graph2Data}
                    selectedGraphType={selectedGraphType}
                    ModeVsEmissionDataProp={graphData?.graph2Data}
                    laneVsEmissionDataProps={graphData?.graph2Data}
                    TotalEmissionDataProp={graphData?.graph2Data}//TotalEmissionDataProp2}
                    graphPosition={2}
                />)
        }
    }
    return (
            <Grid margin={"0px 30px"}
            sx={{
                background: " #FFFFFF",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.05)",
                borderRadius: "15px",
                height: "460px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
            }}
        >
            <Grid sx={{
                margin: "25px 0px 5px 25px",
                height: "10%",
                width: "250px"
            }} >
                <FormControl sx={{ minWidth: "100%" }}>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ height: "35px", fontSize: "14px", fontWeight: "400", fontFamily: "Inter", }}
                        value={selectedGraphType ? selectedGraphType : "none"}
                        // label="Age"
                        onChange={(e) => { setSelectedGraphType(e.target.value) }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: '#FFFF',
                                    padding: "0px",
                                    width: "250px",
                                    '& .MuiMenuItem-root': {
                                        padding: 2,
                                        fontSize: "14px",
                                        fontFamily: "Inter",
                                        border: "1px solid #EFEFEF",
                                        fontWeight: "400",
                                        color: "#000000"
                                    },
                                },
                            },
                        }}
                    >
                        {/* <MenuItem style={{ display: "none" }} value={"none"} >Mode of Transport</MenuItem> */}

                        {ModegraphList.map((graph) => {
                            return <MenuItem key={utils.commonFunctions.keyFinder()} value={graph}>{graph}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid sx={{
                height: "90%",
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 25px"
            }}>
                <Grid className='BaselineEmissionDiv' sx={{
                    width: "45%"
                }} >

                    <Typography sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#172B54",
                        textAlign: "start",
                        marginBottom: "13px",

                    }} className='baseLineText EmissionKpiHead' >
                        Baseline Emission
                    </Typography>
                    <Divider sx={{
                        border: "1px Solid #CECECE"
                    }} />
                    {
                        renderGraph1()
                    }


                </Grid>
                <Grid className='BaselineEmissionDiv' sx={{
                    width: "45%"
                }} >

                    <Typography sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#172B54",
                        textAlign: "start",
                        marginBottom: "13px",

                    }} className='AchievablePerformance EmissionKpiHead' >
                        Achievable Performance
                    </Typography>
                    <Divider sx={{
                        border: "1px Solid #CECECE"
                    }} />
                    {
                        renderGraph2()

                    }

                </Grid>

            </Grid>

        </Grid>
    )
}
