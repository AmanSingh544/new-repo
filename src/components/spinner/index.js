import "./spinner.scss";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const spinner = ({ size, parentStyle }) => {

    return (
        <>
            <Box className="loading-overlay">
                    <CircularProgress className="img" size={size} />
            </Box>
        </>
    )
}
export default spinner;

