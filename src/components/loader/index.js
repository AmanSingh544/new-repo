import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({size, parentStyle}) {
  return (
    <Box
      sx={[{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }, parentStyle]}
    >
      <CircularProgress size={size} />
    </Box>
  );
}