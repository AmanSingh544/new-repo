import React from 'react'
import { useTranslation } from 'react-i18next'

export const EquivalanveTooltip = ({
    hoverData,
    sliceIcon,
    position,
    emissionArr
}) => {

    const {t} = useTranslation();
    return (
        <div
            className='equivool'
            style={{
                position: "absolute",
                top: position.y - 380,
                left: position.x - 800,
                width: "200px", height: "130px", boxShadow: "0px 0px 10px #19315B", display: "flex", flexDirection: "row",
                justifyContent: "center", background: "#023465", borderRadius: "5px", gap: "5px",
            }}
        >
            <div
                style={{
                    display: "flex", justifyContent: "center", paddingTop: "30px", paddingLeft: "10px",
                }}
            >
                <img style={{
                    height:"31px",
                    width:"41px"
                }}  src={`${sliceIcon[hoverData?.index]?sliceIcon[hoverData?.index]:""}`} alt="toltipImg" />
            </div>
            <div
                style={{
                    paddingRight: "15px"
                }}
            >
                <div
                    style={{ display: "flex", alignItems: "center", fontFamily: 'Open Sans', fontStyle: "normal", fontWeight: "600", fontSize: "15px", lineHeight: "113.68%", color: "#FEFEFE", paddingTop: "20px", paddingBottom: "10px" }}
                >
                    {emissionArr[hoverData?.index]?emissionArr[hoverData?.index]:""} {t("units")}
                </div>
                <div style={{
                    background: "#023465", borderBottomLeftRadius: "5px", borderBottomRightRadius: '5px', fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: " #FFFFFF", paddingBottom: "10px",
                }} >
                    {hoverData?.text}
                </div>
                <hr style={{ paddingRight: "20px" }} />
                <div
                    style={{ fontFamily: "Open Sans", paddingTop: "10px", paddingBottom: "10px", fontStyle: "normal", fontWeight: "600", fontSize: "13px", lineHeight: "113.68%", color: " #FEFEFE" }}
                >
                    {t("saved")} - {emissionArr[hoverData?.index]?emissionArr[hoverData?.index]:""}KT
                </div>
            </div>
        </div>
    )
}