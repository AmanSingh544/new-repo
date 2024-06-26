import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import "./SimulatorLayout.scss"
import { SimulatorFilterLayout } from './SimulatorFilterLayout/SimulatorFilterLayout'
import { DeCarbonLeverLayout } from './DecarbonLeverLayout/DeCarbonLeverLayout'
import { EmissionKpisLayout } from './EmissionKpisLayout/EmissionKpisLayout'
import { MidMatricsLayout } from './midMatricsLayout/MidMatricsLayout'
import { ModeOfTransportationLayout } from './modeOfTranspoerationLayout/ModeOfTransportationLayout'
import { Apicalls } from 'src/utils/services/axiosClient'
import constants from 'src/constants'
import { simulatorActualMatrixName, simulatorMatrixName } from 'src/constants/appConstants'
import { simulatorFilterActions } from './SimulatorFilterLayout/simulator-filter-actions'
import { useSelector } from 'react-redux'
import { getParamsAccToFilters } from 'src/utils/utilityFunction'
import Spinner from 'src/components/spinner/index';


let simulatorEmissionKpiListData = [];
let actualEmissionKpiListData = [];
export const SimulatorLayout = ({ variants }) => {
  const [leverBtnVal, setLeverBtnVal] = React.useState("");
  const [loadDay, setLoadDay] = React.useState('');
  const [showMidMetrics, setShowMidMetrics] = useState(false);
  const [showAirMidMetrics, setShowAirMidMetrics] = useState(false)
  const ModegraphList = ["Total Emission", "BU Performance(BU Vs Emission)", "Mode Vs Emissions", "Lanes Vs Emissions", "Consignor Vs Emissions"]
  const [selectedGraphType, setSelectedGraphType] = React.useState("");
  const [emissionKpiListData, setEmissionKpiListData] = useState([]);
  const [graphBaselineData, setGraphBaselineData] = useState([]);
  const [graphAchievableData, setGraphAchievableData] = useState([]);
  const [graph1Loading, setGraph1Loading] = useState(true);
  const [graph2Loading, setGraph2Loading] = useState(true);
  const [airActualEmission, setAirActualEmission] = useState("");
  const { regionData } = useSelector((state) => state.globalRed);
  const [showEmissionData, setShowEmissionData] = useState(false);
  const [showAirEmissionData, setShowAirEmissionData] = useState(false);
  const [isloading, setIsloading] = useState(true);

  const {
    scope,
    region,
    country,
    bu,
    team,
    calendar_filters,
    bu_filters,
    team_filters,
    modes,
    movement,
    activity,
    destination_country,
    origin_country
  } = useSelector((state) =>
    state.simulatorFilters
  );
  let dataForParams = {
    scope,
    calendar_filters,
    region,
    regionData,
    country,
    bu,
    bu_filters,
    team,
    team_filters,
    modes,
    movement,
    activity
  };
  const {
    setSimulatorModeFilters,
  } = simulatorFilterActions;

  const mergeSimulatorAndActualEmissionValues = () => {
    if (actualEmissionKpiListData.length && simulatorEmissionKpiListData.length) {
      for (let i = 0; i < actualEmissionKpiListData.length; i++) {
        const id = actualEmissionKpiListData[i].metric_id;
        const matchingObject = simulatorEmissionKpiListData.find(obj => obj.metric_id === id);
        if (matchingObject) {
          actualEmissionKpiListData[i].greenValue = matchingObject.greenValue;
          actualEmissionKpiListData[i].greenUnit = matchingObject.greenUnit;
          actualEmissionKpiListData[i].percentSavedValue = calculatePercentSavedValue(actualEmissionKpiListData[i], matchingObject)
        }
      }
    }
    setEmissionKpiListData([...actualEmissionKpiListData]);
  }
  const calculatePercentSavedValue = (obj1, obj2) => {
    debugger
    if (obj1.redValue === 0) {
      return obj1.redValue;
    }
    else {
      // Assuming that baseline unit is always higher than achievable unit and is 1000 more than achievable unit.

      //const obj1_redValue = obj1.greenUnit !== obj1.unit ? Math.round(obj1.redValue * 1000) : obj1.redValue;
      // let diffBtwValues = obj1_redValue - obj2.greenValue;
      // return (diffBtwValues / obj1_redValue) * 100;

      const diffBtwValues = (obj1.db_value ?? 100) - (obj2.db_value ?? 1);
      return (diffBtwValues / (obj1.db_value ?? 100)) * 100;
    }
  }

  useEffect(() => {
    let params = {};
    params = getParamsAccToFilters(dataForParams, true);
    params.type = "detailed";
    params.origin_country = origin_country;
    params.destination_country = destination_country;
    getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
    if (leverBtnVal === "load") {
      params.data_for = "";
      params.mode = "[\"Road\"]";
      if (showEmissionData) {
        params.data_for = "consolidation";
        params.consolidation_day = loadDay;
        params.mode = "";
      }
      getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
    }
    if (leverBtnVal === "mode") {
      params.data_for = "";
      params.mode = "[\"Air\"]";
      if (showAirEmissionData) {
        params.data_for = "mode shift";
        params.mode = "";
      }
      getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
    }
  },
    [scope, bu, team, region, country, calendar_filters, modes.length, movement.length, activity.length, origin_country, destination_country])

  const getEmisionKpisData = (params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay) => {
    // forSimulator is true when we need simulator or difference.

    let payload = params;
    params.type = "detailed";
    params.origin_country = origin_country;
    params.destination_country = destination_country;
    if (leverBtnVal === "load") {
      params.data_for = "";
      params.mode = "[\"Road\"]";
      if (showEmissionData) {
        params.data_for = "consolidation";
        params.consolidation_day = loadDay;
        params.mode = "";
      }
    }
    if (leverBtnVal === "mode") {
      params.data_for = "";
      params.mode = "[\"Air\"]";
      if (showAirEmissionData) {
        params.data_for = "mode shift";
        params.mode = "";
      }
    }
    setIsloading(true);
    const x = Apicalls.getApiCall
      (constants.endPoints.allMetricData,
        params,
        '',
        (response) => handleEmissionKpisSuccess(response, showEmissionData, showAirEmissionData, leverBtnVal, loadDay),
        handleEmissionKpisError
      )

  }
  const handleEmissionKpisSuccess = (response, showEmissionData, showAirEmissionData, leverBtnVal, loadDay) => {
    simulatorEmissionKpiListData = [];
    for (let x of response?.data?.result?.data) {
      x.heading = decideKpiName(x.name);
      if (showEmissionData || showAirEmissionData) {
        x.greenValue = x.value;
        x.greenUnit = x.unit;
      }
      else {
        x.redValue = x.value;
      }
    }
    if (showEmissionData || showAirEmissionData) {
      simulatorEmissionKpiListData = [...response?.data?.result?.data];
    }
    else {
      actualEmissionKpiListData = [...response?.data?.result?.data];
    }
    mergeSimulatorAndActualEmissionValues();
    setTimeout(() => {
      setIsloading(false);
    }, 1500);
  }

  const handleEmissionKpisError = (error) => {
    //This is intentional for logging error.
    console.log("error handleEmissionKpisError", error);
    setIsloading(false);
  }

  const decideKpiName = (name) => {
    switch (name) {
      case simulatorActualMatrixName.actualEmission: return simulatorMatrixName.actualEmission;
      case simulatorActualMatrixName.distanceTravelled: return simulatorMatrixName.distanceTravelled;
      case simulatorActualMatrixName.totalShipmentCount: return simulatorMatrixName.totalShipmentCount;
      case simulatorActualMatrixName.totalTonnageOfGoodShipped: return simulatorMatrixName.totalTonnageOfGoodShipped;
      case simulatorActualMatrixName.countriesInvolved: return simulatorMatrixName.countriesInvolved;
      case simulatorActualMatrixName.emissionUnitDistance: return simulatorMatrixName.emissionUnitDistance;
      case simulatorActualMatrixName.emissionUnitShipment: return simulatorMatrixName.emissionUnitShipment;
      case simulatorActualMatrixName.emissionUnitWeight: return simulatorMatrixName.emissionUnitWeight;
      case simulatorActualMatrixName.socialCostOfCarbon: return simulatorMatrixName.socialCostOfCarbon;
      case simulatorActualMatrixName.internalCarbonPricing: return simulatorMatrixName.internalCarbonPricing;
      case simulatorActualMatrixName.emissionTradingScheme: return simulatorMatrixName.emissionTradingScheme;
    }
  }

  const handleLeverChange = (value) => {
    if (emissionKpiListData.length) {
      setLeverBtnVal(value);
      if (value === "load") {
        console.log("EMISSIOMROAD", emissionKpiListData)
        setLoadDay(true);
        let params = {};
        params = getParamsAccToFilters(dataForParams, true);
        params.type = "detailed";
        params.mode = "[Road]";
        params.data_for = "consolidation";
        params.consolidation_day = "";
        params.origin_country = origin_country;
        params.destination_country = destination_country;
        getEmisionKpisData(params, true);
      }
    }
  }

  const handleModeChangeTo = (value) => {
    setSelectedGraphType("Total Emission");
    if (emissionKpiListData.length) {
      setLeverBtnVal(value);
      if (value === "mode") {
        console.log("EMISSIOMMODE", emissionKpiListData)
        let params = {};
        params = getParamsAccToFilters(dataForParams, true);
        params.type = "detailed";
        params.data_for = "mode shift";
        params.mode = "";
        params.origin_country = origin_country;
        params.destination_country = destination_country;
        getEmisionKpisData(params, true);
        setAirActualEmission(!airActualEmission);
      }
    }
  }
  const handleDecarbonizationLeverChange = (showEmissionData, showAirEmissionData, leverBtnVal, loadDay) => {
    setSelectedGraphType("Total Emission");
    simulatorEmissionKpiListData = [];
    if (emissionKpiListData.length) {
      setShowEmissionData(showEmissionData);
      setShowAirEmissionData(showAirEmissionData);
      setLeverBtnVal(leverBtnVal);
      setLoadDay(loadDay);
      if (leverBtnVal === 'mode') {
        let params = {};
        params = getParamsAccToFilters(dataForParams, true);
        getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
      }
      if (leverBtnVal === 'load') {
        console.log("EMISSIOMROAD", emissionKpiListData)
        let params = {};
        params = getParamsAccToFilters(dataForParams, true);
        getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
      }
    }
  }

  const clearAll = () => {
    setLeverBtnVal('');
    setLoadDay('');
    setShowEmissionData(false);
    setShowAirEmissionData(false);
    simulatorEmissionKpiListData = [];
  }
  const handleMidMetricLayout = () => {
    setShowMidMetrics(true)
  }

  const handleAirMidMetricLayout = () => {
    setShowAirMidMetrics(true)
  }

  // Function Definition of getEmisionKpisData 
  // const getEmisionKpisData = (params, showEmissionData, showAirEmissionData,leverBtnVal,loadDay) => {
  const handleLoadDayChange = (showEmissionData, showAirEmissionData, leverBtnVal, loadDay) => {
    setSelectedGraphType("Total Emission");

    setShowEmissionData(true);
    setShowAirEmissionData(false);
    setLeverBtnVal('load');
    setLoadDay(loadDay);

    let params = {};
    params = getParamsAccToFilters(dataForParams, true);
    params.type = "detailed";
    params.data_for = "consolidation";
    params.consolidation_day = loadDay;
    params.origin_country = origin_country;
    params.destination_country = destination_country;
    getEmisionKpisData(params, showEmissionData, showAirEmissionData, leverBtnVal, loadDay);
  }

  const decideApiEndpointOnGraphType = (graphType) => {
    switch (graphType) {
      case "Total Emission": return constants.endPoints.emissionScopes;
      case "BU Performance(BU Vs Emission)": return constants.endPoints.buEmission;
      case "Mode Vs Emissions": return constants.endPoints.emissionTransportation;
      case "Lanes Vs Emissions": return constants.endPoints.lanesVsEmission;
      case "Consignor Vs Emissions": return constants.endPoints.consignerVsEmission;
    }
  }

  useEffect(() => {
    decideApiCallOnGraphBasis(selectedGraphType);
  }, [selectedGraphType, scope, bu, team, region, country, calendar_filters, modes.length, movement.length, activity.length, origin_country, destination_country, leverBtnVal, loadDay])

  const decideApiCallOnGraphBasis = (selectedGraphType) => {
    switch (selectedGraphType) {
      case "Total Emission": getGraphsData("Total Emission");
        break;
      case "BU Performance(BU Vs Emission)": getGraphsData("BU Performance(BU Vs Emission)");
        break;
      case "Mode Vs Emissions": getGraphsData("Mode Vs Emissions");
        break;
      case "Lanes Vs Emissions": getGraphsData("Lanes Vs Emissions");
        break;
      case "Consignor Vs Emissions": getGraphsData("Consignor Vs Emissions");
        break;
    }
  }


  const getGraphsData = async (graphType) => {
    try {
      let paramsBaseline = getParamsAccToFilters(dataForParams, true);
      paramsBaseline.type = "detailed";
      paramsBaseline.origin_country = origin_country;
      paramsBaseline.destination_country = destination_country;
      paramsBaseline.mode ="";
      let paramsAchievable = getParamsAccToFilters(dataForParams, true);
      paramsAchievable.type = "detailed";
      if (leverBtnVal === "mode") {
        paramsAchievable.data_for = "mode shift";
      }
      if (leverBtnVal === "load") {
        paramsAchievable.data_for = "consolidation";
      }
      paramsAchievable.consolidation_day = loadDay;
      paramsAchievable.origin_country = origin_country;
      paramsAchievable.destination_country = destination_country;
      paramsAchievable.mode ="";
  
      // Call both APIs concurrently using Promise.all
      const [baselineResponse, achievableResponse] = await Promise.all([
        getGraphsDataBaselineAchievable(paramsBaseline, true, graphType),
        getGraphsDataBaselineAchievable(paramsAchievable, false, graphType),
      ]);
  
      // Handle the responses if needed
      setGraph1Loading(false);
      setGraph2Loading(false);
      if (baselineResponse?.data?.result?.data) {
        setGraphBaselineData(baselineResponse?.data?.result?.data);
      }
      if (achievableResponse?.data?.result?.data) {
        setGraphAchievableData(achievableResponse?.data?.result?.data);
      }  
    } catch (error) {
      // Handle errors if any of the API calls fail
      console.error("An error occurred:", error);
    }
  };
  
  const getGraphsDataBaselineAchievable = (params, isBaseline, graphType) => {
  
    return new Promise((resolve, reject) => {
      const setLoading = isBaseline ? setGraph1Loading : setGraph2Loading;
  
      setLoading(true);
  
      Apicalls.getApiCall(
        decideApiEndpointOnGraphType(graphType),
        params,
        '',
        (response) => {
         // handleGraphsDataBaselineSuccess(response, isBaseline, graphType);
          setLoading(false);
          resolve(response); // Resolve the promise after success
        },
        (error) => {
          handleGraphsDataBaselineError(error, isBaseline, graphType);
          setLoading(false);
          reject(error); // Reject the promise on error
        }
      );
    });
  };

  const handleGraphsDataBaselineSuccess = (response, isBaseline, graphType) => {
    if (isBaseline) {
      setGraph1Loading(false);
      if (response?.data?.result?.data) {
        // console.log("response handleGraphsDataBaselineSuccess", response);
        // setGraphBaselineData(response?.data?.result?.data);
      }
    }
    else {
      setGraph2Loading(false);
      if (response?.data?.result?.data) {
        // console.log("response handleGraphsAchievableSuccess", response);
        // setGraphAchievableData(response?.data?.result?.data);
      }
    }
  }


  const handleGraphsDataBaselineError = (error, isBaseline, graphType) => {
    if (isBaseline) {
      setGraph1Loading(false);
    }
    else {
      setGraph2Loading(false);
    }
    //This is intentional for error logging.
    console.log("error handleGraphsDataBaselineError", error);
  }

  const findBuName = (data) => {
    data.map((item) => {
      item.bu_name = findBuNameFromBuId(item)
    })
    return data;
  }
  const findBuNameFromBuId = (item) => {
    let tempArr = bu_filters?.filter(function (itemBuFilters) {
      return itemBuFilters.id === item.bu_id;
    });
    if (tempArr.length) {
      return tempArr[0]?.name
    }
    return " ";
  }

  const makeArrWithBuName = (tempArr) => {
    let tempArrF = tempArr?.filter(function (itemBuFilters) {
      return tempArr.find(function (tempArrItem) {
        if (itemBuFilters.id === tempArrItem.bu_id) {
          itemBuFilters.emission = tempArrItem.emission
        }
        return itemBuFilters.id === tempArrItem.bu_id;
      });
    });
    return tempArrF;
  }

  const decideGraphData = () => {
    if (selectedGraphType) {
      switch (selectedGraphType) {
        case "Total Emission": {
          //This is for making data for the total emission baseline.
          return {
            graph1Data: {
              chartData: makeChartData(graphBaselineData, "pie", "baseline"),
              labelArr: makeLabelData(graphBaselineData, "scope", "Scope", "baseline"),
              bgColorArr: ['#b1000e', '#4CC7F4', '#555f63']
            },
            graph2Data: {
              chartData: makeChartData(graphAchievableData, "pie", "achievable"),
              labelArr: makeLabelData(graphAchievableData, "scope", "Scope", "achievable"),
              bgColorArr: ['#b1000e', '#4CC7F4', '#555f63']
            }
          }
        }
        case "BU Performance(BU Vs Emission)": return {
          graph1Data: {
            chartData: makeChartData(graphBaselineData, "pie", "baseline"),
            labelArr: makeLabelData(makeArrWithBuName(graphBaselineData), "bu_name", "", "baseline"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: graphBaselineData
          },
          graph2Data: {
            chartData: makeChartData(graphAchievableData, "pie", "achievable"),
            labelArr: makeLabelData(makeArrWithBuName(graphAchievableData), "bu_name", "", "achievable"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: graphAchievableData
          }
        };
        case "Mode Vs Emissions":
          //This is for making data for the Mode Vs Emission baseline.
          return {
            graph1Data: {
              chartData: makeChartData(graphBaselineData, "pie", "baseline"),
              labelArr: makeLabelData(graphBaselineData, "sub_activity", "", "baseline"),
              bgColorArr: ['#b1000e', '#4CC7F4', '#555f63']
            },
            graph2Data: {
              chartData: makeChartData(graphAchievableData, "pie", "achievable"),
              labelArr: makeLabelData(graphAchievableData, "sub_activity", "", "achievable"),
              bgColorArr: ['#b1000e', '#4CC7F4', '#555f63']
            }
          };
        case "Lanes Vs Emissions": return {
          graph1Data: {
            chartData: makeChartData(graphBaselineData, "pie", "baseline"),
            labelArr: makeLabelData(graphBaselineData, "lane", "", "baseline"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: (graphBaselineData)
          },
          graph2Data: {
            chartData: makeChartData(graphAchievableData, "pie", "achievable"),
            labelArr: makeLabelData(graphAchievableData, "lane", "", "achievable"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: (graphAchievableData)
          }
        };

        case "Consignor Vs Emissions": return {
          graph1Data: {
            chartData: makeChartData(graphBaselineData, "pie", "baseline"),
            labelArr: makeLabelData(graphBaselineData, "consigner_name", "", "baseline"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: findBuName(graphBaselineData)
          },
          graph2Data: {
            chartData: makeChartData(graphAchievableData, "pie", "achievable"),
            labelArr: makeLabelData(graphAchievableData, "consigner_name", "", "achievable"),
            bgColorArr: ['#b1000e', '#4CC7F4', '#555f63'],
            totalData: findBuName(graphAchievableData)
          }
        };
      }
    }
    return {};
  }
  const makeChartData = (arr, graphRenderType, graphAccEmissionType) => {
    console.log("call in makeChartData", arr);
    let chartData = [];
    arr.length > 0 &&
      arr.map((item) => {
        chartData.push(Number(parseFloat(item.emission)).toFixed(2));
      });
    return chartData;
  }

  const makeLabelData = (arr, keyName, legendName, graphAccEmissionType) => {
    let labelArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        labelArr.push(`${legendName}${item[keyName]}`);
      });
    return labelArr;
  }

  return (
    <>
      {isloading && <Spinner />}
      <Grid className='simulatorLayoutMain' >
        <Grid className='simulatorFilterLayoutMain' >
          <SimulatorFilterLayout />
        </Grid>
          <DeCarbonLeverLayout
            leverBtnVal={leverBtnVal}
            handleLeverChange={handleLeverChange}
            handleModeChangeTo={handleModeChangeTo}
            handleLoadDayChange={handleLoadDayChange}
            loadDay={loadDay}
            setSimulatorModeFilters={setSimulatorModeFilters}
            handleMidMetricLayout={handleMidMetricLayout}
            handleAirMidMetricLayout={handleAirMidMetricLayout}
            setShowEmissionData={setShowEmissionData}
            setShowAirEmissionData={setShowAirEmissionData}
            handleDecarbonizationLeverChange={handleDecarbonizationLeverChange}
            clearAll={clearAll}
          />
          <EmissionKpisLayout
            emissionKpiListData={emissionKpiListData ?? []}
            leverBtnVal={leverBtnVal ? leverBtnVal : ''}
            showEmissionData={showEmissionData}
            showAirEmissionData={showAirEmissionData} />
          <MidMatricsLayout
            dataMetrics={emissionKpiListData ?? []}
            showEmissionData={showEmissionData}
            showAirEmissionData={showAirEmissionData} />
          {
            leverBtnVal === "load" && showEmissionData &&
            <ModeOfTransportationLayout
              ModegraphList={ModegraphList}
              leverBtnVal={leverBtnVal}
              setSelectedGraphType={setSelectedGraphType}
              selectedGraphType={selectedGraphType}
              graphData={decideGraphData()}
              graph1Loading={graph1Loading}
              graph2Loading={graph2Loading}
              setShowEmissionData={setShowEmissionData}
              setShowAirEmissionData={setShowAirEmissionData}
            />
          }
          {
            leverBtnVal === "mode" && showAirEmissionData &&
            <ModeOfTransportationLayout
              ModegraphList={ModegraphList}
              leverBtnVal={leverBtnVal}
              setSelectedGraphType={setSelectedGraphType}
              selectedGraphType={selectedGraphType}
              graphData={decideGraphData()}
              graph1Loading={graph1Loading}
              graph2Loading={graph2Loading}
              setShowEmissionData={setShowEmissionData}
              setShowAirEmissionData={setShowAirEmissionData}
            />
          }
      </Grid>
    </>
  )
}
