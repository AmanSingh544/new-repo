import React from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const ModeVsEmissionTooltip = ({
    hoverData,
    position,
    PieData,
}) => {
    let ActualEmission = PieData?.datasets[0]?.data[hoverData?.index]
    const totalActual = (Number(ActualEmission) / (Number(localStorage.getItem("totalModesVsEmission") == 0 ? 100 : Number(localStorage.getItem("totalModesVsEmission")))) * 100).toFixed(2);
    const {t} = useTranslation();

    return (
        <div
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                width: "180px",
                height: "130px",
                boxShadow: "0px 0px 10px #19315B",
                background: "#FFFFFF",
                borderRadius: "5px",
                padding: "0px",
                marginRight: "10px",
            }}
        >
            <Grid sx={{
                display: "flex", whiteSpace: "break-spaces", alignItems: " center", background: "#DBDBDB !important", borderWidth: "1px", fontSize: "14px", fontWeight: "600", color: "#000000", padding: "2px", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"
            }}   >
                <span style={{
                    height: "8px", width: "8px", margin: "10px", backgroundColor: `${hoverData?.fillStyle}`,
                    borderRadius: "50%", display: "inline-block",
                }}></span>  {hoverData?.text}
            </Grid>
            <Grid
                sx={{
                    background: "#FFFFFF",
                    borderBottomLeftRadius: "5px",
                    paddingTop: "10px",
                    borderBottomRightRadius: "5px",
                    display: "flex",
                    flexDirection:"column",
                    justifyContent:"space-between"
                }}
            >
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex",flexDirection:"column" }}>
                        <div
                            style={{
                                fontSize: "13px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                color: "#333333",
                                paddingLeft: "25px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {t("actualEmissions")}
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "600",
                                color: "#1C1C1C",
                                paddingLeft: "21px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <span
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "2px",
                                    fontFamily: "Inter"
                                }}
                            >
                                {ActualEmission}
                                KTCO<sub>2</sub>e
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%"}}>
                    <div style={{ display: "flex" ,flexDirection:"column" }}>
                        <div
                            style={{
                                fontSize: "13px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "18px",
                                color: "#333333",
                                paddingLeft: "25px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            % {t("totalActualEmission")}
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "600",
                                color: "#1C1C1C",
                                paddingLeft: "21px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <span
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "2px",
                                    fontFamily: "Inter"
                                }}
                            >
                                {totalActual}%
                            </span>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    )
}