import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Loader from "src/components/loader";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc,
} from "src/utils/utilityFunction";
import constants from "src/constants";
import ProgressBarWithLabel from "src/components/infographics/progressBars/rectangularBar";
import { Apicalls } from "src/utils/services/axiosClient";
import { useSelector } from "react-redux";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import utils from "src/utils";

export default function EmissionActivity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { regionData } = useSelector((state) => state.globalRed);
  const {
    scope,
    region,
    country,
    bu,
    team,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) => state.filters);
  const totalEmission = (arr) => {
    let emission = 0;
    for (let i = 0; i < arr?.length; i++) {
      emission += parseFloat(arr[i]);
    }
    return emission;
  };
  const renderEmissionActivity = () => {
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
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
    }

    Apicalls.getApiCall(
      constants.endPoints.emissionActivity,
      params,
      "",
      handleActivitySuccess,
      handleActivityError
    );
  };

  const handleActivitySuccess = (response) => {
    setLoading(false)
    setData(response?.data?.result?.data);
  };

  const handleActivityError = (error) => {
    setLoading(false)
  };

  const emissionArr = data?.map((data) => {
    return parseFloat(data.emission);
  });
  const mappedData = data?.map((emData) => {
    let label = emData.activity;
    let p = (parseFloat(emData.emission) / parseFloat(totalEmission(emissionArr))) * 100

    let progress = isNaN(p) ? 0 : parseFloat(p.toFixed(2))
    return {
      label: label?.charAt(0).toUpperCase() + label?.slice(1),
      progress,
      value: `${emData.emission} KT`,
      color:
        progress <= 15
          ? "#02CFE5"
          : progress > 15 && progress <= 30
            ? "#00B3C7"
            : progress > 30 && progress <= 45
              ? "#0385AE"
              : progress > 45 && progress <= 60
                ? "#0374AE"
                : progress > 60 && progress <= 75
                  ? "#00558E"
                  : progress > 75 && progress <= 90
                    ? "#004F87"
                    : "#00406C",
    };
  });

  useEffect(() => {
    renderEmissionActivity();
  }, [scope.length, bu.length, team.length, region.length, country.length, calendar_filters]);
  if (loading) {
    return <div style={{ justifyContent: "center", alignItems: "center", margin: "auto" }}><Loader size={30} /></div>;
  }
  else if (!loading && !data.length) {
    return <NothingFoundView />;
  }


  else {
    return (
      <Box className="emission-activity">
        {mappedData?.map(({ label, value, progress, color }, indx, arr) => {
          return (
            <Box
              key={utils.commonFunctions.keyFinder()}
              display={"flex"}
              style={{
                padding: "8px 0px",
                justifyContent: "flex-end",
                marginRight: "40px"
              }}
              alignItems="center"
              justifyContent={"center"}
            >
              <div
                className="emission-activity-label"
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#3C3C3C",
                }}
              >
                {label}
              </div>
              <ProgressBarWithLabel
                numValue={value}
                value={progress}
                color={color}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
}
