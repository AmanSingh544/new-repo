import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const EmissionScopeToolTip = ({
    hoverData,
    donutData,
    position,
    enabledInfoClick
}) => {
  const {t} = useTranslation();
  return (
    <div
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              width: "230px",
              height: "80px",
              boxShadow: "0px 0px 10px #19315B",
              background: "#FFFFFF",
              borderRadius: "5px",
              padding: "0px",
              marginRight: "10px"
            }}
          >
          <Typography sx={{
                  display: "flex",whiteSpace:"break-spaces", alignItems: " center", background: "#DBDBDB !important", borderWidth: "1px", fontSize: "14px", fontWeight: "600", color: "#000000", padding: "5px", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"
                }}   >
                  {hoverData?.text}
                </Typography>
            <Grid
              sx={{
                background: "#FFFFFF",
                borderBottomLeftRadius: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
                height: "42px !important",
                borderBottomRightRadius: "5px",
                display: "flex"
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
                      color: "#3C3C3C",
                      paddingLeft: "10px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {t("actualEmissions")}-
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "600",
                      color: "#DF0000",
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
                      {
                        enabledInfoClick?localStorage.getItem("totalEmissionScopes"):
                      donutData.filter((data)=>data?.scope===Number(hoverData?.text.split(" ")[1]))[0]?.emission
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
