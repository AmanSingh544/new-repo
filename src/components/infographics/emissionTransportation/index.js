import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LinearProgressBar from "src/components/infographics/progressBars/progressBar";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { useSelector } from "react-redux";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc
} from "src/utils/utilityFunction";
import Loader from "src/components/loader/index";
import { useTranslation } from 'react-i18next';
import utils from "src/utils";

export default function EmissionTransportation() {
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
  const { t } = useTranslation();
  const totalEmission = (arr) => {
    let emission = 0;
    for (let i = 0; i < arr?.length; i++) {
      emission += parseFloat(arr[i]);
    }
    return emission;
  };
  const renderEmissionTransportation = () => {
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
      constants.endPoints.emissionTransportation,
      params,
      "",
      handleTransportationSuccess,
      handleTransportationError
    );
  };

  const handleTransportationSuccess = (response) => {
    setLoading(false)
    setData(response?.data?.result?.data);
  }

  const handleTransportationError = (error) => {
    setLoading(false)
  }

  const emissionArr = data?.map((data) => {
    return parseFloat(data?.emission);
  });
  const mappedData = data?.map((emData) => {
    let label = emData.sub_activity;
    return {
      label: "By " + label?.charAt(0).toUpperCase() + label?.slice(1),
      value: (
        (parseFloat(emData.emission) / parseFloat(totalEmission(emissionArr) === 0 ? 100 : totalEmission(emissionArr))) *
        100
      ).toFixed(2),
      image: emData?.icon ? emData?.icon : getImageFromURL(`${IMAGES.BYSHIP}`)
    };
  });

  useEffect(() => {
    renderEmissionTransportation();
  }, [scope.length, bu.length, team.length, region.length, country.length, calendar_filters]);
  if (loading) {
    return <Loader size={30} />;
  }
  else if (!loading && !data.length) {
    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItem: "center", margin: "auto", height: "100%" }}>
      <img src={getImageFromURL(IMAGES.INFO_ICON)} alt={"Failed to load"} style={{ width: "40px", alignSelf: "center" }} />
      <h4 style={{ alignSelf: "center", fontWeight: "400" }}>{t('nothingFoundMessage')}</h4>
    </div>
  }
  else {
    return (
      <Box
        className="emission-transportation"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        {mappedData?.map(({ label, image, value }) => {
          return (
            <Typography
              key={utils.commonFunctions.keyFinder()}
              component={"div"}
              display={"flex"}
              justifyContent="space-between"
              alignItems={"flex-end"}
            >
              <img
                src={image}
                alt={image}
                width={35}
                height={26.31}
                style={{ margin: "0px 0px 10px 0px" }}

              />
              <Typography
                component="div"
                className="innner-transport"
              >
                <div
                  className="emission-transportation-text"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  {label}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LinearProgressBar value={value} />
                  <div
                    className="emission-transportation-value"
                  >
                    {value}%
                  </div>
                </div>
              </Typography>
            </Typography>
          );
        })}

      </Box>
    );
  }
}
