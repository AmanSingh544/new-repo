import { Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IMAGES } from "src/constants/images";
import "../datamapping.scss";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import utils from "src/utils";
import Fileblue from "src/assets/images/Fileblue.svg"
import Filered from "src/assets/images/Filered.svg"
import Filegreen from "src/assets/images/Filegreen.svg"
import Loader from "src/components/loader";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";

const renderDataLayerCard = (i, key, isLoading, dataInSss, fileIconArr) => {
  console.log("data-level",i,fileIconArr)
  if (isLoading) {
    return (
      <div style={{ height: "18vh" }}><Loader /></div>
    )
  }
  else if (dataInSss) {
    return (
      <div style={{ height: "18vh", display: "flex", justifyContent: "center", alignItems: "center" }}><NothingFoundView /></div>
    )
  }
  else {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Box display="block">
            <p
              className="data-mapping-count"
              style={{ color: `${i?.color}` }}
            >
              {i?.count}
            </p>
            <p className="data-mapping-label" style={{ marginTop: 3, marginBottom: 10 }}>
              {i?.label}
            </p>
          </Box>
          <img
            width={35}
            height={35}
            src={fileIconArr[key]}
            alt={IMAGES.NOTEPAD}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 90, height: 90 }}>
            <CircularProgressbarWithChildren
              value={
                (i?.percent)
              }
              styles={buildStyles({
                textColor: "#111",
                pathColor: i?.color,
                fontSize: 11,
              })}
              maxValue={100}
            >
              <div className="data-mapping-value">
                {`${Number(i?.percent)?.toFixed(0)}%`}
              </div>
              <div className="data-mapping-status">{i?.status}</div>
            </CircularProgressbarWithChildren>
          </div>
        </Box>
      </>
    )
  }
}

export default function DataMappingLayerCard({ listData, isLoading, dataInSss }) {
  React.useEffect(() => {
    const timer = setInterval(() => {
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const fileIconArr = [Fileblue,
    Filegreen,
    Filered]

  return (
    <Grid container spacing={3}>
      {listData.length > 0 && listData?.map((i, key) => {
        return (
          <Grid item lg={4} key={utils.commonFunctions.keyFinder()}>
            <Card className="data-mapping-card">
              <CardContent>
                {
                  renderDataLayerCard(i, key, isLoading, dataInSss, fileIconArr)
                }
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
