import * as React from "react";
import { styled } from "@mui/material/styles";
import "./progress.scss"
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: theme.palette.mode === "light" ? `linear-gradient(-270deg, #098BB0 60.7%, #0A4A7E 100%)` : "#308fe8",
  },
}));

export default function LinearProgressBar({ value }) {
  return (
    <BorderLinearProgress className="progress-bar-transportation" variant="determinate" value={value} />
  )
} 
