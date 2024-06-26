import React from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const GhgEmissionTooltip = ({
    hoverData,
    donutData,
    position,
    totalEmission
}) => {
    const {t} = useTranslation();
    const itemSplit = hoverData?.text.split("")
    const index = itemSplit.findIndex(data => !isNaN(parseFloat(data)))
    const convertLabel = ()=>{
        let gasNameContainer = "<span>";
        if (typeof itemSplit[index] === "string" && itemSplit[index]) {

          for (let i = 0; i < itemSplit.length; i++) {
            if (i !== index) {
              gasNameContainer += itemSplit[i]
            } else {
              gasNameContainer += "<sub>" + itemSplit[index] + "</sub>"
            }
          }
          gasNameContainer += "</span>"
        }

        if (gasNameContainer !== "<span>") {
        // This is intentional so that it does not enter the else block
        // gasNameContainer = gasNameContainer
        } else {
          gasNameContainer = hoverData?.text
        }
        return gasNameContainer
    }

    return (
        <div
            style={{
                width: "230px",
                height: "100px",
                boxShadow: "0px 0px 10px #19315B",
                background: "#FFFFFF",
                borderRadius: "5px",
                padding: "0px",
                marginRight: "10px",
                position: "absolute",
                top: position.y,
                left: position.x
            }}
        >
            <Grid className='grid1-ghg' >
                <span style={{
                    margin: "10px", backgroundColor: `${hoverData?.fillStyle}`,
                    borderRadius: "50%", display: "inline-block", height: "8px", width: "8px"
                }}></span> <span
                dangerouslySetInnerHTML={{
                    __html :convertLabel()
                }}
                >

                </span>
            </Grid>
            <Grid
                sx={{
                    background: "#FFFFFF",
                    borderBottomLeftRadius: "5px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderBottomRightRadius: "5px",
                    display: "flex",
                    flexDirection:"column",
                    justifyContent:"space-between"
                }}
            >
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "18px",
                                display: "flex",
                                alignItems: "center",
                                color: "#3C3C3C",
                                paddingLeft: "15px"
                            }}
                        >
                            {t("actualEmissions")}-
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                color: "#3C3C3C",
                                display: "flex",
                                alignItems: "center",
                                fontStyle: "normal",
                                fontWeight: "600"
                            }}
                        >
                            <span
                                style={{
                                    marginTop: "2px",
                                    fontFamily: "Inter",
                                    marginLeft: "5px",
                                }}
                            >
                                {
                                  donutData[0]?donutData[0]:""
                                }
                                KTCO<sub>2</sub>e
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "18px",
                                alignItems: "center",
                                color: "#3C3C3C",
                                paddingLeft: "15px",
                                display: "flex",
                            }}
                        >
                           {t("totalEmissions")}-
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                fontFamily: "Inter",
                                fontStyle: "normal",
                                fontWeight: "600",
                                alignItems: "center",
                                color: "#3C3C3C",
                                display: "flex",
                            }}
                        >
                            <span
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "2px",
                                    fontFamily: "Inter"
                                }}
                            >
                                {
                                  totalEmission[0]?totalEmission[0]:""
                                }
                                KTCO<sub>2</sub>e
                            </span>
                        </div>
                    </div>
                </div>
            </Grid>


        </div>
    )
}