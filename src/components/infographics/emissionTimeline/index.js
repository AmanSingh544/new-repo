import React, { useState, useEffect } from "react";
import LineChart from "src/components/infographics/charts/lineChart";
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
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";

export default function EmissionTimeline({ single }) {
  const [chartData, setChartData] = useState([]);
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
  const renderLineChart = () => {
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
      constants.endPoints.emissionTimeline,
      params,
      "",
      handleEtSuccess,
      handleEtError
    );
  };

  const handleEtSuccess = (response) => {
    setLoading(false)
    setChartData(response?.data?.result?.data);
  };

  const handleEtError = (error) => {
    setLoading(false)
  };

  useEffect(() => {
    renderLineChart();
  }, [scope.length, bu.length, team.length, region.length, country.length, calendar_filters]);
  if (loading) {
    return <Loader size={30} />;
  }
  else if (!loading && !chartData.length) {
    return <NothingFoundView />;
  }
  else {
    console.log(single,chartData,"emissionTimeLine")
    return <LineChart single={single} chartData={chartData} />;
  }
}
