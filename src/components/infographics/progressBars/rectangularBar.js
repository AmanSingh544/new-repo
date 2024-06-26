import * as React from "react";
import Box from "@mui/material/Box";

export default function ProgressBarWithLabel({ value, color, numValue }) {
  let colorGradient = value > 40 ? `rgb(0, ${207 - (value * 1.5)}, ${229 - (value)})` : `rgb(2, ${207 - (value * 1.5)}, ${229 - (value)})`
  return (
    <Box sx={{ width: "70%", margin: "0px 10px", height: "20px" }} display={"flex"}>
      <div className="" style={{ width: value + 10 + "%", background: colorGradient, paddingLeft: '8px', display: "flex", alignItems: "center" }}>
        <span style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px" }}>{value}%</span>
      </div>
      <div className="emission-activity-value">{numValue}</div>
    </Box>
  );
}
