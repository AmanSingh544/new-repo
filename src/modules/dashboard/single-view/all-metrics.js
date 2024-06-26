import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import constants from "src/constants";
import { Apicalls } from "src/utils/services/axiosClient";
import "./single-view.scss";
import {
  failedImageMessage,
  C02Img,
} from "src/constants/appConstants";
import { useSelector } from "react-redux";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc,
  makeModes,
  makeActivity,
  makeMovementType
} from "src/utils/utilityFunction";
import Loader from "src/components/loader/index";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import { styles } from "src/components/metric-cards/styles";
import { useLocation } from "react-router-dom";
import utils from "src/utils";
//SPRINT-4

const formatNumber = (value, unit, currencySymbol) => {
  if (isNaN(Number(value))) {
    return value + (unit ? " " + unit : "");
  }
  if (unit) {
    if (unit === "$") {
      return unit + " " + Number(value).toLocaleString();
    } else if (currencySymbol.includes(unit)) {
      return unit + " " + Number(value).toLocaleString();
    } else {
      return Number(value).toLocaleString() + " " + unit;
    }
  }
  return Number(value).toLocaleString();
};

const formatValue = (value, unit, currencySymbol, textContainerOuter) => {
  if (textContainerOuter) {
    return (
      <>
        <span>{formatNumber(value, null, currencySymbol)}</span>&nbsp;
        <span
          className="content"
          dangerouslySetInnerHTML={{
            __html: textContainerOuter,
          }}
        ></span>
      </>
    );
  }
  return formatNumber(value, unit, currencySymbol);
};

const formatMetricValue = (value, unit, currencySymbol, textContainer, textContainerOuter) => {
  if (!value && value !== 0) {
    return "N/A";
  }
  return formatValue(value, unit, currencySymbol, textContainerOuter);
};

const AllMetrics = ({ isDetailSingle }) => {
  const [metricData, setMetricData] = useState([]);
  const [loadingAllMetrics, setAllMetrics] = useState(true);
  const { regionData } = useSelector((state) => state.globalRed);
  const { pathname } = useLocation();
  const { singleDetailed } =
    useSelector((state) => state.globalRed);
  const { scope, region, country, bu, team, calendar_filters, bu_filters, team_filters } = useSelector((state) => (pathname.includes("detailed-summary") || singleDetailed) ? state.detailedFilters : state.filters);
  const { modes, activity, movement } = useSelector(
    (state) => state.detailedFilters
  );
  const currencySymbol = ["$", "€"]
  useEffect(() => {
    getAllMetricsData();
  }, [
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    modes,
    activity,
    movement
  ]);

  const handleRemainingGetAllMetricsData = (params) => {
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
    }
    if (isDetailSingle) {
      if (makeModes(modes)) {
        params.mode = JSON.stringify(makeModes(modes));
      }
      if (makeMovementType(movement)) {
        params.movement_type = JSON.stringify(makeMovementType(movement));
      }
      if (makeActivity(activity)) {
        params.activities = JSON.stringify(makeActivity(activity));
      }
    }
  }

  function getAllMetricsData() {
    let params = {};
    if (makeScopeArray(scope)) {
      params.scope = JSON.stringify(makeScopeArray(scope));
    }
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    if (makeRegion(region, regionData)) {
      params.region = JSON.stringify(makeRegion(region, regionData));
    }
    if (makeRc(country)) {
      params.rc = JSON.stringify(makeRc(country));
    }
    if (makeBu(bu, bu_filters)) {
      params.bu = JSON.stringify(makeBu(bu, bu_filters));
    }
    handleRemainingGetAllMetricsData(params);


    params.type = isDetailSingle ? "detailed" : "executive";

    Apicalls.getApiCall(
      constants.endPoints.allMetricData,
      params,
      "",
      handleAllMetricSuccess,
      handleAllMetricError
    );
  }

  function handleAllMetricSuccess(response) {
    setAllMetrics(false);
    if (response?.data?.result?.data) {
      setMetricData(response?.data?.result?.data);
    }
  }

  function handleAllMetricError(error) {
    setAllMetrics(false);
  }

  const handleMetricDataManipulation = (index, unitArr, textContainer, unit) => {
    if (unit) {
      if (unit.includes("CO2e")) {
        unitArr = unit.split("");
        index = unit
          .split("")
          .findIndex((data) => !isNaN(parseInt(data)));
      }
    }
    if (unitArr.length) {
      for (let i = 0; i < unitArr.length; i++) {
        if (i != index) {
          textContainer.insertAdjacentHTML("beforeend", unitArr[i]);
        } else {
          textContainer.insertAdjacentHTML(
            "beforeend",
            unitArr[index].sub()
          );
        }
      }
    }
  }

  const handleSingleViewSx = (value) => {
    return !value ? { ...styles().singleViewCardNAhover } : { ...styles().singleViewCardHover }
  }

  const handleGridContenetRender = () => {
    if (loadingAllMetrics) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "250px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size={30} />
        </div>
      )
    }
    else if (!loadingAllMetrics && !metricData.length) {
      return (
        <div
          style={{
            background: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <NothingFoundView nothingFoundMsg={"No relevant result found."} />
        </div>
      )
    }
    else {
      return (
        metricData.map(({ name, value, icon, unit }) => {
          let index = "";
          let unitArr = [];
          const textContainer = document.createElement("span");
          handleMetricDataManipulation(index, unitArr, textContainer, unit)
          const textContainerOuter = textContainer.outerHTML;
          return (
            <Grid
              item
              md={3}
              lg={3}
              style={{ padding: "15px" }}
              className="metric-cards-single"
              key={utils.commonFunctions.keyFinder()}
            >
              <Box
                className="metric-card-trans"
                sx={
                  handleSingleViewSx(value)
                }
              >
                <Grid container sx={{ display: "flex" }}>
                  <Grid item md={8} lg={8}>
                    <Typography className="metric-label">{name}</Typography>
                  </Grid>
                  <Grid item md={4} lg={4} className="metric-icon-img">
                    <img
                      className="icon_img"
                      src={icon ? icon : C02Img}
                      alt={failedImageMessage}
                      style={{ width: "50px" }}
                    />
                  </Grid>
                </Grid>
                <Typography className="all-metric-value" sx={{ fontSize: "1vw !important" }}>
                  {formatMetricValue(value, unit, currencySymbol, textContainer, textContainerOuter)}
                </Typography>
              </Box>
            </Grid>
          );
        })
      )
    }
  }
  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        sx={{
          margin: "5px auto",
          width: "95%",
          padding: "0px 1rem",
          borderRadius: "7px",
          background: "#EAEAEA",
          border: "1px solid #D9D9D9",
        }}
      >
        <Grid
          container
          spacing={3.75}
          style={{
            padding: "15px 0px",
            height: "62vh",
            overflowY: "auto",
            width: "100%",
            margin: "0px",
          }}
        >
          {
            handleGridContenetRender()
          }
        </Grid>
      </Box>
    </>
  );
};

export default AllMetrics;
