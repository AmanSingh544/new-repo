import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import HorizontalBarChart from "./charts/horizontalBarChart";
import DonutChart from "src/components/infographics/charts/donutChart";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  findEndDateAccToSlctdMonth,
  findEndDateAccToSlctdWeek,
  findStartDateAccToSlctdMonth,
  findStartDateAccToSlctdWeek,
  getParamsAccToFilters
} from "src/utils/utilityFunction";
// import {matrixListDetailed} from "../../constants/appConstants"
import { Grid, Select } from "@material-ui/core";
import PieChart from "./charts/pieChart";
import EmissionTimeline from "./emissionTimeline";
import EmissionScopes from "src/components/infographics/emissionScopes/EmissionScopes";
import BarChart from "./charts/barChart";
import { ReactComponent as SingleViewIcon } from "src/assets/images/singleview.svg";
import { ReactComponent as DropdownDotsIcon } from "src/assets/images/dropdowndots.svg";
import { globalActions } from "src/modules/global-states/global-states-actions";
import IconButton from "@mui/material/IconButton";
import EmissionActivity from "./emissionActivity";
import EmissionTransportation from "./emissionTransportation";
import CostFuel from "./costFuel";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { arraysQtrs, fiveWeekArr, fourWeekArr, monthsName } from "src/constants/appConstants";
import NothingFoundView from "../nothingFoundView/NothingFoundView";
import Loader from "src/components/loader/index";
import LanesEmission from "./lanesVsEmission";
import EmissionByRegionDetailed from "./emissionByRegion";
import EmissionByCountryDetailed from "./emissionByCountry";
import { FormControl, MenuItem } from "@mui/material";
import utils from "src/utils";
import { UpstreamNetworksVsEmission } from "./upstreamNetworksVsEmission/upstreamNetworksVsEmission";
import { DownStreamAssetTypeVsEmission } from "./downStreamAssetVsEmission/DownStreamAssetTypeVsEmission";
import { DownStreamLesseeVsEmission } from "./downLesseeVsEmission/DownStreamLesseeVsEmission";
import { UpStreamAssetTypeVsEmission } from "./upStreamAssetTypeVsEmission/upStreamAssetTypeVsEmission";
import { UpStreamLessorVsEmission } from "./upStreamLessorVsEmission/upStreamLessorVsEmission";
import { RmpowiseEmissions } from "./rmpowiseEmissions/rmpowiseEmissions";
import { NONSCMSourcingVsEmissions } from "./nonSCMSourcingVsEmissions/nonSCMSourcingVsEmissions";
import { FranchiseWiseEmission } from "./franchiseWiseEmission/FranchiseWiseEmission";
import { UpstreamWasteManagementVsEmission } from "./upstreamWasteManagementVsEmission/UpstreamWasteManagementVsEmission";
import { DownstreamWasteManagementVsEmission } from "./downStreamWasteManagementVsEmission/downstreamWasteManagementVsEmission";
import { DedicatedVehicleTypeVsEmissions } from "./dedicatedVehicleTypeVsEmissions/DedicatedVehicleTypeVsEmissions";
import { OutsourcedVehicleTypeVsEmissions } from "./outsourcedVehicleTypeVsEmissions/OutsourcedVehicleTypeVsEmissions";
import { WasteProcessingCompaniesVsEmission } from "./wasteProcessingCompaniesVsEmission/WasteProcessingCompaniesVsEmission";
import { SoldProductVsEmissions } from "./soldProductVsEmissions/SoldProductVsEmissions";
import { RefrigerationProcessVsEmissions } from "./refrigerationProcessVsEmissions/RefrigerationProcessVsEmissions";
import { RefrigerantTypeConsumptionsVsEmissions } from "./refrigerantTypeConsumptionsVsEmissions/RefrigerantTypeConsumptionsVsEmissions";
import { FuelTypeConsumptionsVsEmissions } from "./fuelTypeConsumptionsVsEmissions/FuelTypeConsumptionsVsEmissions";
import { SpendVsEmission } from "./spendVsEmission/SpendVsEmission";
import { PurchasedElectricityConsumptionVsEmission } from "./purchasedElectricityConsumptionVsEmission/purchasedElectricityConsumptionVsEmission";
import { BusinessTravelVsEmission } from "./businessTravelVsEmmission/BusinessTravelVsEmission"
import InvestmentCompanybasedEmission from "./investmentCompanybasedEmission/InvestmentCompanybasedEmission";
import ExtractionProductionTransmissionVsEmission from "./extractionProductionTransmissionVsEmission/ExtractionProductionTransmissionVsEmission";
import { ProductTypeVsEmission } from "./productTypeVsEmission/ProductTypeVsEmission";
import ContinentEmission from "./continentVsEmission";
import { graphNames_new as graphNames } from "src/constants/appConstants";

const {
  setEnableSignleView,
  setSingleViewInfographic,
  setSingleExecutive,
  setSingleDetailed,
  setCostFuelLocal
} = globalActions;

export default function InfoGraphicCard({
  data,
  provided,
  dragHandleProps,
  providerRef,
  isDetailed,
  col = 6
}) {
  const { pathname } = useLocation();
  const { regionData } = useSelector((state) => state.globalRed);
  const [bgColorArr, setBgColorArr] = useState([]);
  const [ghgDonutData, setGhgDonutData] = useState([]);
  const [ghgEmissionsArr, setGhgEmissionsArr] = useState([]);
  const [ghgLabelData, setGhgLabelData] = useState([]);
  const [labelsEmissionBySuplier, setLabelsEmissionBySuplier] = useState([]);
  const [dataEmissionBySuplier, setDataEmissionBySuplier] = useState([]);
  const [labelsProcessVsEmission, setProcessVsEmission] = useState([]);
  const [dataProcessVsEmission, setDataProcessVsEmission] = useState([]);
  const [maxEmissionBySupplier, setEmissionBySupplier] = useState(0);
  const [ebsLoading, setEbsLoading] = useState(true);
  const [processEmissionLoading, setProcessEmissionLoading] = useState(true);
  const [modesBgColor, setModesBgColor] = useState([])
  const [dataModesVsEmission, setDataModesVsEmission] = useState([]);
  const [labelsModesVsEmission, setModesVsEmission] = useState([]);
  const [modesVsEmissionLoading, setModesVsEmissionLoading] = useState(true);


  const [labelslanesVsEmission, setLabelLanesVsEmission] = useState([]);
  const [datalanesVsEmission, setDataLanesVsEmission] = useState([]);
  const [lanesVsEmissionLoading, setLanesVsEmissionLoading] = useState(true);
  const [totalLanesVsEmissionData, setLanesVsEmissionData] = useState([]);

  const [labelsContinentVsEmission, setLabelContinentVsEmission] = useState([]);
  const [dataContinentVsEmission, setDataContinentVsEmission] = useState([]);
  const [continentVsEmissionLoading, setContinentVsEmissionLoading] = useState(true);
  const [totalContinentVsEmissionData, setContinentVsEmissionData] = useState([]);

  const [dataCostFuel, setDataCostFuel] = useState([]);
  const [costFuelLoading, setCostFuelLoading] = useState(true);

  const [labelsBuPerformance, setLabelBuPerformance] = useState([]);
  const [dataBuPerformance, setDataBuPerformance] = useState([]);
  const [buPerformanceLoading, setBuPerformanceLoading] = useState(true);
  const [totalBuPerformanceData, setBuPerformanceData] = useState([]);
  const [ghgLoading, setGhgLoading] = useState(true);
  const [totalScope1EmissionVsCategories, setTotalScope1EmissionVsCategories] =
    useState([]);
  const [totalScope2EmissionVsCategories, setTotalScope2EmissionVsCategories] =
    useState([]);
  const [totalScope3EmissionVsCategories, setTotalScope3EmissionVsCategories] =
    useState([]);
  const [
    labelTotalScope3EmissionVsCategories,
    setLabelTotalScope3EmissionVsCategories,
  ] = useState([]);
  const [businessTravelVsEmmission, setBusinessTravelVsEmmission] = useState([])

  const [labelScope1, setLabelScope1] = useState([])
  const [labelScope2, setLabelScope2] = useState([])
  const [totalScope3Data, setTotalScope3Data] = useState([]);
  const [totalScope3DataAccStream, setTotalScope3DataAccStream] = useState([]);

  const [totalScoe1Loading, setTotalScoe1Loading] = useState(true);
  const [totalScoe2Loading, setTotalScoe2Loading] = useState(true);
  const [totalScoe3Loading, setTotalScoe3Loading] = useState(true);

  const [selectedStream, setSelectedStream] = useState('Downstream');

  const [filteredYearArr, setFilteredYearArr] = useState([]);
  const [filteredMonthArr, setFilteredMonthArr] = useState([]);
  const [filteredWeekArr, setFilteredWeekArr] = useState([]);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  const dispatch = useDispatch();
  const {
    scope,
    region,
    country,
    bu,
    team,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) =>
    isDetailed ? state.detailedFilters : state.filters
  );

  const { modes, activity, movement } = useSelector(
    (state) => state.detailedFilters
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


  const [enabledInfoClick, setEnabledInfoClick] = useState("");
  const handleSingleView = () => {
    dispatch(setEnableSignleView(true));
    const pathFrom = pathname.replace("/carbon-analytics/", "");
    if (pathFrom === "detailed-summary") {
      dispatch(setSingleDetailed(true));
    } else if (pathFrom === "executive-summary") {
      dispatch(setSingleExecutive(true));
    }
  };
  useEffect(() => {
    switch (data) {
      case graphNames.GHG_WISE_EMISSION:
        getGhgEmission();
        break;
      case graphNames.EMISSION_BY_SUPPLIER:
      case graphNames.SUPPLIER_VS_EMISSIONS:
        getEmissionBySupplier();
        break;
      case graphNames.PROCESS_VS_EMISSIONS:
        getProcessVsEmissionData();
        break;
      case graphNames.MODES_VS_EMISSION:
        getModesVsEmissionData();
        break;
      case graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION:
        getCostFuelData();
        break;
      case graphNames.LANES_VS_EMISSION:
        getLanesVsEmission();
        break;
      case graphNames.CONTINENT_VS_EMISSION:
        getContinentVsEmission();
        break;
      case graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
        getTotalScope1EmissionVsCategoriesData();
        break;
      case graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
        getTotalScope2EmissionVsCategoriesData();
        break;
      case graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
        getTotalScope3EmissionVsCategoriesData();
        break;
      case graphNames.EMISSION_PERFORMANCE:
        getBuPerformance();
        break;
      case graphNames.BU_PERFORMANCE:
        getBuPerformanceWithoutDates();
        break;
      default:
        break;
    }
  }, [
    data,
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
    selectedYear,
    selectedMonth,
    selectedWeek
  ]);

  const getBuPerformanceWithoutDates = useCallback(() => {
    //Here we will calling the Lanes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    if (selectedMonth) {
      params.start_date = findStartDateAccToSlctdMonth(selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdMonth(selectedMonth, selectedYear)
    }

    if (selectedWeek) {
      params.tag = "week"
      params.start_date = findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)
    }

    setBuPerformanceLoading(true);
    Apicalls.getApiCall(
      constants.endPoints.buEmission,
      params,
      "",
      handleBuPerformanceSuccess,
      handleBuPerformanceError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
    selectedYear,
    selectedMonth,
    selectedWeek
  ]);

  const getBuPerformance = useCallback(() => {
    //Here we will calling the Lanes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    if (selectedMonth) {
      params.start_date = findStartDateAccToSlctdMonth(selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdMonth(selectedMonth, selectedYear)
    }

    if (selectedWeek) {
      params.tag = "week"
      params.start_date = findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)
    }

    setBuPerformanceLoading(true);
    Apicalls.getApiCall(
      constants.endPoints.buEmission,
      params,
      "",
      handleBuPerformanceSuccess,
      handleBuPerformanceError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
    selectedYear,
    selectedMonth,
    selectedWeek
  ]);

  const handleBuPerformanceSuccess = (response) => {
    setBuPerformanceLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "buPerformance"); //here ebs bar data is made
      makeLabelArr(makeArrWithBuName(response?.data?.result?.data), "buPerformance", "bu_name"); //here ebs is emission by supplier, here label of bar data is made
      setBuPerformanceData(response?.data?.result?.data);
    }
  };
  const handleBuPerformanceError = (error) => {
    setBuPerformanceLoading(false);
  };

  const makeArrWithBuName = (tempArr) => {
    // let tempArrF = bu_filters?.filter(function (itemBuFilters) {
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

  const getTotalScope1EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};

    params = getParamsAccToFilters(dataForParams, isDetailed);
    params.scope = "[1]";

    Apicalls.getApiCall(
      constants.endPoints.emissionScopes,
      params,
      "",
      handleTotalScope1EmissionVsCategoriesSuccess,
      handleTotalScope1EmissionVsCategoriesError
    );
  }, [data, scope, bu, team, region, calendar_filters, modes, movement, activity]);

  const handleTotalScope1EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe1Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope1EmissionVsCategories"); //here ebs bar data is made
    }
  }

  const handleTotalScope1EmissionVsCategoriesError = () => {
    setTotalScoe1Loading(false);
  }



  const getTotalScope2EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);
    params.scope = "[2]";

    Apicalls.getApiCall(
      constants.endPoints.scope2EmissionCateg,
      params,
      "",
      handleTotalScope2EmissionVsCategoriesSuccess,
      handleTotalScope2EmissionVsCategoriesError
    );
  }, [data, scope, bu, team, region, calendar_filters, modes, activity, movement]);

  const handleTotalScope2EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe2Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope2EmissionVsCategories"); //here ebs bar data is made
    }
  }

  const handleTotalScope2EmissionVsCategoriesError = () => {
    setTotalScoe2Loading(false);
  }



  const getTotalScope3EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);
    params.scope = "[3]";

    Apicalls.getApiCall(
      constants.endPoints.emissionScopes,
      params,
      "",
      handleTotalScope3EmissionVsCategoriesSuccess,
      handleTotalScope3EmissionVsCategoriesError
    );
  }, [data, scope, bu, team, region, calendar_filters, modes, activity, movement]);

  const handleTotalScope3EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe3Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope3EmissionVsCategories"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "totalScope3EmissionVsCategories");
      setTotalScope3Data(calculatePercent(response?.data?.result?.data))

    }
  }

  const handleTotalScope3EmissionVsCategoriesError = () => {
    setTotalScoe3Loading(false);
  }

  const calculatePercent = (arr) => {
    let vTotal = arr.reduce((a, b) => a + b.emission, 0);
    arr.map((item) => {
      item.percent = ((item.emission / vTotal) * 100).toFixed(2);
    })
    return arr;
  }



  const getLanesVsEmission = useCallback(() => {
    //Here we will calling the Lanes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    Apicalls.getApiCall(
      constants.endPoints.lanesVsEmission,
      params,
      "",
      handleLanesVsEmissionSuccess,
      handleLanesVsEmissionError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
  ]);

  const handleLanesVsEmissionSuccess = (response) => {
    console.log("lanesresponse", response)
    setLanesVsEmissionLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "lanesVsEmission"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "lanesVsEmission", "lane"); //here ebs is emission by supplier, here label of bar data is made
      setLanesVsEmissionData((response?.data?.result?.data));
    }
  };
  const handleLanesVsEmissionError = (error) => {
    setLanesVsEmissionLoading(false);
  };

  const getContinentVsEmission = useCallback(() => {
    //Here we will calling the Lanes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    Apicalls.getApiCall(
      constants.endPoints.continentVsEmission,
      params,
      "",
      handleContinentVsEmissionSuccess,
      handleContinentVsEmissionError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
  ]);

  const handleContinentVsEmissionSuccess = (response) => {
    setContinentVsEmissionLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "continentVsEmission"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "continentVsEmission", "title"); //here ebs is emission by supplier, here label of bar data is made
      setContinentVsEmissionData((response?.data?.result?.data));
    }
  };
  const handleContinentVsEmissionError = (error) => {
    setContinentVsEmissionLoading(false);
  };

  const findBuName = (data) => {
    data.map((item) => {
      item.bu_name = findBuNameFromBuId(item);
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


  const getCostFuelData = useCallback(() => {
    //Here we will calling the cost fuel data api.

    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);
    Apicalls.getApiCall(
      constants.endPoints.getCostFuelData,
      params,
      "",
      handleCostFuelSuccess,
      handleCostFuelError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes,
    movement,
    activity,
  ]);

  const handleCostFuelSuccess = (response) => {
    console.log("response 5600", response)
    setCostFuelLoading(false);
    if (response) {
      makeLabelArr(response?.data?.result?.data, "costFuel", "name"); //here ebs is emission by supplier, here label of bar data is made
      setDataCostFuel(utils.commonFunctions.makeCostFuelDataWithConstants(makeDataCostFuel(response?.data?.result?.data)));
      let totalEmissionCostFuel = response?.data?.result?.emission;
      localStorage.setItem(
        "totalEmissionCostFuel",
        totalEmissionCostFuel?.toFixed(2)
      );
      dispatch(setCostFuelLocal(totalEmissionCostFuel?.toFixed(2)))
    }
  };
  const handleCostFuelError = (error) => {
    setCostFuelLoading(false);
  };


  const makeDataCostFuel = (data) => {
    let tempArr = data?.map((item) => {
      if (item.name === "Item Shipped") {
        item.label = item.name;
        //  item.backgroundColor = ["#A9E8FF"];
        item.backgroundColor = ["#B1000E"];
        item.data = [item.value];
        item.borderWidth = 0;
        item.unit = "";
      } else if (item.name === "Distance") {
        item.label = item.name;
        //  item.backgroundColor = ["#00183F"];
        item.backgroundColor = ["#1C2325"];
        item.data = [item.value];
        item.borderWidth = 0;
        item.unit = [item.unit];
      } else if (item.name === "Fuel") {
        item.label = item.name;
        item.backgroundColor = ["#555f63"];
        item.data = [item.value];
        item.borderWidth = 0;
        item.unit = "Ltrs";
      } else if (item.name === "Cost") {
        item.label = item.name;
        item.backgroundColor = ["#19A6DE"];
        item.data = [item.value];
        item.borderWidth = 0;
        item.unit = "$";
      }
      return item;
    });

    return tempArr;
  };
  const getModesVsEmissionData = useCallback(() => {
    //Here we will calling the modes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    Apicalls.getApiCall(
      constants.endPoints.emissionTransportation,
      params,
      "",
      handleModesVsEmissionSuccess,
      handleModesVsEmissionError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes,
    movement,
    activity,
  ]);

  const handleModesVsEmissionSuccess = (response) => {
    setModesVsEmissionLoading(false);

    let bgColorArr = []
    if (response) {
      response?.data?.result?.data?.map(data => {
        if (data.sub_activity === "Ocean") {
          //  bgColorArr.push("#b1000e")
          bgColorArr.push("#1C2325")
        } else if (data.sub_activity === "Barge") {
          bgColorArr.push("#4CC7F4")
        } else if (data.sub_activity === "Road") {
          //  bgColorArr.push("#00183F")
          bgColorArr.push("#B1000E")
        } else if (data.sub_activity === "Rail") {
          bgColorArr.push("#555f63")
        } else if (data.sub_activity === "Air") {
          //  bgColorArr.push("#00A0CA")
          bgColorArr.push("#B3B3B3")
        }
      })

      setModesBgColor(bgColorArr)
      makeBarDataArr(response?.data?.result?.data, "modesVsEmission"); //here ebs bar data is made
      makeLabelArr(
        response?.data?.result?.data,
        "modesVsEmission",
        "sub_activity"
      ); //here ebs is emission by supplier, here label of bar data is made
      let totalEmissionModeVsEmission = response?.data?.result?.data?.reduce(
        (x, item) => {
          return x + item.emission;
        },
        0
      );
      localStorage.setItem("totalModesVsEmission", totalEmissionModeVsEmission);
    }
  };
  const handleModesVsEmissionError = (error) => {
    setModesVsEmissionLoading(false);
  };

  const getProcessVsEmissionData = useCallback(() => {
    //Here we will calling the process vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);
    Apicalls.getApiCall(
      constants.endPoints.processVsEmission,
      params,
      "",
      handleProcessVsEmissionSuccess,
      handleProcessVsEmissionError
    );
  }, [
    data,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes,
    movement,
    activity,
  ]);

  const handleProcessVsEmissionSuccess = (response) => {
    setProcessEmissionLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "processVsEmission"); //here ebs bar data is made
      makeLabelArr(
        response?.data?.result?.data,
        "processVsEmission",
        "process"
      ); //here ebs is emission by supplier, here label of bar data is made
    }
  };
  const handleProcessVsEmissionError = (error) => {
    setProcessEmissionLoading(false);
  };

  const getEmissionBySupplier = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    Apicalls.getApiCall(
      constants.endPoints.emissionBySupplier,
      params,
      "",
      handleEmissionBySupplierSuccess,
      handleEmissionBySupplierError
    );
  }, [data, scope, bu, team, region, country, calendar_filters, modes, movement, activity]);

  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const handleEmissionBySupplierSuccess = (response) => {
    setEbsLoading(false);
    if (response) {
      calculateMaxEmissionBySupplier(response?.data?.result?.data);
      makeBarDataArr(response?.data?.result?.data, "emissionBySupplier"); //here ebs bar data is made
      makeLabelArr(
        response?.data?.result?.data,
        "emissionBySupplier",
        "supplier"
      ); //here ebs is emission by supplier, here label of bar data is made
    }
  };
  const handleEmissionBySupplierError = () => {
    setEbsLoading(false);
  };

  const calculateMaxEmissionBySupplier = (arr) => {
    let newArr = [...arr];
    let tempArr = [];
    newArr.length > 0 &&
      newArr.map((item) => {
        return tempArr.push(Number(parseFloat(item.emission)));
      });
    let maxEmssion = tempArr.reduce((a, b) => Math.max(a, b), -Infinity);
    setEmissionBySupplier(maxEmssion);
  };
  const handleTotalScope1EmissionVsCategories = (arr) => {
    let newArrr = [];
    let labelArrr = [];
    if (arr.length) {
      let ans = array_move(arr, 0, 1);
      arr.filter(data => data).map((data) => {
        if (data.entity === 1) {
          labelArrr.push([
            "Static Combustion",
            `${data.emission ?? ""}KTCO₂e`,
          ])
        } else if (data.entity === 2) {
          labelArrr.push([
            "Fugitive Combustion",
            `${data.emission ?? ""}KTCO₂e`,
          ])
        } else if (data.entity === 3) {
          labelArrr.push([
            "Mobile Combustion",
            `${data.emission ?? ""}KTCO₂e`,
          ])
        }
      })
      setLabelScope1(labelArrr)
      ans.map((item) => {
        newArrr.push(Number(parseFloat(item.emission)).toFixed(2));
      });
    }
    setTotalScope1EmissionVsCategories(newArrr);
  }

  const handleTotalScope2EmissionVsCategories = (arr) => {
    let newArr = [];
    let labelArr = [];
    if (arr.length) {
      let ans = array_move(arr, 0, 1);

      arr.map((data) => {
        labelArr.push([
          data.scope_category,
          `${data.emission ?? ""}KTCO₂e`,
        ])
      })

      setLabelScope2(labelArr)
      ans.map((item) => {
        newArr.push(Number(parseFloat(item.emission)).toFixed(2));
      });

    }
    setTotalScope2EmissionVsCategories(newArr);
  }

  const handleTotalScope3EmissionVsCategories = (arr, barDataArr) => {
    let tempArr = [];
    if (selectedStream === "Upstream") {
      tempArr = sortDataAccToStream(arr, "Upstream")
      tempArr.map((item) => {
        barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
      });
    }
    else if (selectedStream === "Downstream") {
      tempArr = sortDataAccToStream(arr, "Downstream")
      tempArr.map((item) => {
        barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
      });
    }
    else {
      tempArr = arr;
    }
    setTotalScope3DataAccStream(tempArr)
    setTotalScope3EmissionVsCategories(barDataArr)
  }

  const makeBarDataArr = (arr, value) => {
    let barDataArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
      });

    switch (value) {
      case "emissionBySupplier":
        setDataEmissionBySuplier(barDataArr);
        break;
      case "processVsEmission":
        setDataProcessVsEmission(barDataArr);
        break;
      case "modesVsEmission":
        setDataModesVsEmission(barDataArr);
        break;
      case "lanesVsEmission":
        setDataLanesVsEmission(barDataArr);
        break;
      case "continentVsEmission":
        setDataContinentVsEmission(barDataArr);
        break;
      case "totalScope1EmissionVsCategories":
        handleTotalScope1EmissionVsCategories(arr)
        break;
      case "totalScope2EmissionVsCategories":
        handleTotalScope2EmissionVsCategories(arr)
        break;
      case "totalScope3EmissionVsCategories":
        handleTotalScope3EmissionVsCategories(arr, barDataArr)
        break;
      case "buPerformance":
        setDataBuPerformance(barDataArr)
        break;
      // case "businessTravelVsEmmissions":
      //   setBusinessTravelVsEmmission(arr)
      //   break;
    }
  };

  const makeLabelArr = (arr, value, key) => {
    let labelArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        labelArr.push(item[key]);
      });
    if (value === "emissionBySupplier") {
      setLabelsEmissionBySuplier(labelArr);
    } else if (value === "processVsEmission") {
      setProcessVsEmission(labelArr);
    } else if (value === "modesVsEmission") {
      setModesVsEmission(labelArr);
    } else if (value === "costFuel") {
      //This is intentional and will be used in future.
    } else if (value === "lanesVsEmission") {
      setLabelLanesVsEmission(labelArr);
    }
    else if (value === "continentVsEmission") {
      setLabelContinentVsEmission(labelArr);
    } else if (value === "totalScope3EmissionVsCategories") {

      labelArr = [];
      let tempArr = [];
      if (selectedStream === "Upstream") {
        tempArr = sortDataAccToStream(arr, "Upstream")
      }
      else if (selectedStream === "Downstream") {
        tempArr = sortDataAccToStream(arr, "Downstream")
      }
      else {
        tempArr = arr;
      }
      tempArr.map((item) => {
        labelArr.push(`S${item.scope}.${item.entity}`);
      });
      setLabelTotalScope3EmissionVsCategories(labelArr);

    }
    else if (value === "buPerformance") {
      setLabelBuPerformance(labelArr)
    }
  };

  const sortDataAccToStream = (arr, stream) => {
    let tempUpstreamArr = arr.filter(function (itemMainArr) {
      return itemMainArr.stream === stream;
    });
    return tempUpstreamArr;
  }

  const getGhgEmission = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, isDetailed);

    Apicalls.getApiCall(
      constants.endPoints.ghgEmissions,
      params,
      "",
      handleGhgSuccess,
      handleGhgError
    );
  }, [data, scope, bu, team, region, country, calendar_filters]);

  const handleGhgSuccess = (response) => {
    setGhgLoading(false);
    if (response) {
      makeGhgDonutArr(
        response?.data?.result?.data,
        response?.data?.result?.total_emission
      );
      makeGhgLabelArr(response?.data?.result?.data);
      makeBgColorArr(response?.data?.result?.data);
    }
  };

  const handleGhgError = () => {
    setGhgLoading(false);
  };

  const makeGhgDonutArr = (arr, totalGhgEmissionLocal) => {
    let donutArr = [];
    let ghgEmissionArr = [];
    arr.length > 0 &&
      totalGhgEmissionLocal > 0 &&
      arr.map((item) => {
        ghgEmissionArr.push(parseFloat(item.emission))
        donutArr.push(
          Number(
            (parseFloat(item.emission) / parseFloat(totalGhgEmissionLocal)) *
            100
          ).toFixed(2)
        );
      });
    setGhgEmissionsArr(ghgEmissionArr)
    setGhgDonutData(donutArr);
  };

  const makeGhgLabelArr = (arr) => {
    let labelArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        labelArr.push(item.gas);
      });
    setGhgLabelData(labelArr);
  };

  const renderGasColor = (gas) => {
    let gasColor;
    switch (gas) {
      case "CO2":
        gasColor = "#004A8E";
        break;
      case "SF6":
        gasColor = "#4CC7F4";
        break;
      case "N2O":
        gasColor = "#00B3DC";
        break;
      case "PFCs":
        gasColor = "#3ABFDD";
        break;
      case "NF3":
        gasColor = "#0066B9";
        break;
      case "CH4":
        gasColor = "#0077B0";
        break;
      case "HFCs":
        gasColor = "#0E76A8";
        break;
      default:
        gasColor = null;
    }
    return gasColor;
  };

  const makeBgColorArr = (arr) => {
    let colorArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        colorArr.push(renderGasColor(item.gas));
      });

    setBgColorArr(colorArr);
  };

  const handleSingleViewInfographic = (infoName) => {
    // console.log(infoName, "infoNameinfoName")
    // if (infoName === "Cost-Fuel-Item Shipped-Emission") {
    //   dispatch(
    //     setSingleViewInfographic("COST_FUEL_ITEM_SHIPPED_EMISSION", true)
    //   );
    // } else {
      dispatch(setSingleViewInfographic(infoName, true));
   // }

  };

  const handleChangeStream = (e) => {
    let tempArr = [];
    let barDataArr = [];
    let labelArr = [];
    setSelectedStream(e?.target?.value)
    if (e?.target?.value === "Upstream") {
      tempArr = sortDataAccToStream(totalScope3Data, "Upstream")
    }
    else if (e?.target?.value === "Downstream") {
      tempArr = sortDataAccToStream(totalScope3Data, "Downstream")
    }
    tempArr.map((item) => {
      barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
    });
    tempArr.map((item) => {
      labelArr.push(`S${item.scope}.${item.entity}`);
    });
    setLabelTotalScope3EmissionVsCategories(labelArr);
    setTotalScope3DataAccStream(tempArr)
    setTotalScope3EmissionVsCategories(barDataArr);
  }
  const calendarFilterZeroLength = () => {
    setFilteredYearArr([(new Date().getMonth() + 1) === 1 ? new Date().getFullYear() - 1 : new Date().getFullYear()]);
  }
  const handleMonthCalendarChange = () => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      setFilteredYearArr([calendar_filters?.start_year]);
    } else {
      setFilteredYearArr([calendar_filters?.start_year, calendar_filters.end_year]);
    }
  }
  const handleYearCalendarChange = () => {
    if (calendar_filters?.start === calendar_filters.end) {
      setFilteredYearArr([calendar_filters?.start]);
    } else {
      let tempYearArr = [];
      for (let i = calendar_filters?.start; i <= calendar_filters.end; i++) {
        tempYearArr.push(i);
      }
      setFilteredYearArr([...tempYearArr]);
    }
  }

  const handleYQrtrCalendarChange = () => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      setFilteredYearArr([calendar_filters?.start_year]);
    } else {
      let tempYearArr = [];
      for (let i = calendar_filters?.start_year; i <= calendar_filters.end_year; i++) {
        tempYearArr.push(i);
      }
      setFilteredYearArr([...tempYearArr]);
    }
  }
  useEffect(() => {
    setSelectedYear('')
    setSelectedMonth('');
    setSelectedWeek('');
    setFilteredYearArr([]);
    setFilteredMonthArr([]);
    setFilteredWeekArr([]);

    switch (true) {
      case Object.keys(calendar_filters).length === 0:
        calendarFilterZeroLength()
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "month":
        handleMonthCalendarChange()
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "year":
        handleYearCalendarChange()
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "qrtr":
        handleYQrtrCalendarChange()
        break;
      default:
        break;
    }

  }, [calendar_filters])

  const decideParamMakeMonth = () => {
    if (new Date().getMonth() === 0) {
      return 12;
    }
    else {
      return new Date().getMonth();
    }
  }

  const makeMonthNameArr = (startingMonth, endMonth) => {
    let filteredMonthArrName = monthsName.filter((item, index) => {
      return index >= startingMonth - 1 && index <= endMonth - 1
    })
    setFilteredMonthArr(filteredMonthArrName);
  }



  const handleWeekChange = (item) => {
    setSelectedWeek(item);
  }
  const handleMonthChange = (item) => {
    let newWeekArr = [];
    setSelectedMonth(item);
    setSelectedWeek('');
    if (item === "Feb") {
      newWeekArr = fourWeekArr
    }
    else {
      newWeekArr = fiveWeekArr
    }
    setFilteredWeekArr(newWeekArr)
  }

  const handleCalendarMonth = (item) => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      makeMonthNameArr(calendar_filters?.start, calendar_filters.end)
    }
    else {
      if (item === calendar_filters?.start_year) {
        let firstYearMonths = monthsName.filter((item, index) => {
          return calendar_filters?.start - 1 <= index;
        })
        setFilteredMonthArr(firstYearMonths)
      }
      else {
        let lastYearMonths = monthsName.filter((item, index) => {
          return calendar_filters?.end - 1 >= index;
        })
        setFilteredMonthArr(lastYearMonths)
      }
    }
  }

  const handleCalendarQrtr = (item) => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      makeMonthNameArrFromQtr(calendar_filters?.start, calendar_filters?.end)
    }
    else {
      if (item === calendar_filters?.start_year) {
        makeMonthNameArrFromQtr(calendar_filters?.start, 4)
      }
      else {
        makeMonthNameArrFromQtr(1, calendar_filters?.end)
      }

    }
  }
  const handleYearChange = (item, index) => {
    setSelectedYear(item);
    setSelectedMonth('');
    setSelectedWeek('');

    if (Object.keys(calendar_filters).length === 0) {
      makeMonthNameArr(decideParamMakeMonth(), decideParamMakeMonth())
    }
    else if (Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "month") {
      handleCalendarMonth(item)
    }
    else if (Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "year") {
      makeMonthNameArr(1, 12)
    }
    else if (Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "qrtr") {
      handleCalendarQrtr(item)
    }
  }

  const makeMonthNameArrFromQtr = (startQtr, endQtr) => {
    let tempMonthArrFrmQtr = [];
    for (let i = startQtr; i <= endQtr; i++) {
      tempMonthArrFrmQtr = [...tempMonthArrFrmQtr, ...arraysQtrs[`quarter${i}Arr`]]
    }
    setFilteredMonthArr(tempMonthArrFrmQtr)
  }

  const getClassName = (data) => {
    switch (data) {
      case graphNames.EMISSION_ACROSS_ACTIVITY:
        return "activity-across";
      case graphNames.EMISSION_TIMELINE:
        return "emissionTimeline";
      case graphNames.EMISSION_BY_SUPPLIER:
        return "emissionSupplier";
      case graphNames.EMISSION_SCOPES:
        return "emissionScope";
      case graphNames.EMISSION_ACROSS_TRANSPORTATION:
        return "emissionTransportation";
      case graphNames.SALES_BY_EMISSION:
        return "salesVsEmission";
      case graphNames.GHG_WISE_EMISSION:
        return "ghgEmissionInfo";
      case graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
        return "totalScope1emissionvsCategories";
      case graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
        return "totalScope2emissionvsCategories";
      case graphNames.UPSTREAM_NETWORKS_VS_EMISSION:
        return "upstreamNetworksVsEmission";
      case graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION:
        return "downstreamAssetTypeVsEmission";
      case graphNames.BUSINESS_TRAVEL_VS_EMMISSION:
        return "businessTravelVsEmission";
      default:
        return "";
    }
  };

  const handleCastFuelLoading = (data) => {
    if (data === graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION) {
      if (costFuelLoading) {
        return (<Loader size={30} />)
      }
      else if (!costFuelLoading && !dataCostFuel.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          //(<CostFuel labelsArr={["Distance", "Fuel", "Cost", "Item Shipped"]} data={dataCostFuel} />)
          (<CostFuel labelsArr={["Distance", "Item Shipped"]} data={dataCostFuel} />)
        )
      }
    }
  }

  const handleEmmissionVsCategories = (data) => {
    if (data === graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES) {
      if (totalScoe1Loading) {
        return (<Loader size={30} />)
      }
      else if (scope.includes("Scope 1") || !scope.length) {
        return (
          <HorizontalBarChart
            roundBar={true}
            type={"regionTotalScope1"}
            labelsArr={labelScope1}
            barDataArr={totalScope1EmissionVsCategories}
            maxEmissionBySupplier={maxEmissionBySupplier}
            loading={ebsLoading}
            typeCss={"region-total-scope-1"}
          />
        )
      }
      else {
        return (
          <NothingFoundView />
        )
      }
    }
  }

  const handleHorizontalBarChart = (data) => {
    if (data === graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES) {
      if (totalScoe2Loading) {
        return (<Loader size={30} />)
      }
      else if (scope.includes("Scope 2") || !scope.length) {
        return (
          <HorizontalBarChart
            roundBar={true}
            type={"regionTotalScope2"}
            labelsArr={labelScope2}
            barDataArr={totalScope2EmissionVsCategories}
            maxEmissionBySupplier={maxEmissionBySupplier}
            loading={ebsLoading}
            typeCss={"region-total-scope-2"}
          />
        )
      }
      else {
        return (
          <NothingFoundView />
        )
      }

    }
  }

  const handleBarChart = (data) => {
    if (data === graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES) {
      if (totalScoe3Loading) {
        return (<Loader size={30} />)
      }
      else if (!totalScoe3Loading && !totalScope3EmissionVsCategories.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <BarChart barDataArr={totalScope3EmissionVsCategories} labelsArr={labelTotalScope3EmissionVsCategories} roundBar={false} type="totalScope3" loading={false} totalData={totalScope3DataAccStream} />
        )
      }
    }
  }
  const handleLanesEmission = (data) => {
    if (data === graphNames.LANES_VS_EMISSION) {
      if (lanesVsEmissionLoading) {
        return (<Loader size={30} />)
      }
      else if (!lanesVsEmissionLoading && !datalanesVsEmission.length) {
        return (<NothingFoundView />)
      }
      else {

        return (
          <LanesEmission
            single={false}
            roundBar={true}
            type={"lanes"}
            labelsArr={labelslanesVsEmission}
            barDataArr={datalanesVsEmission}
            loading={lanesVsEmissionLoading} //ebsLoading
            totalData={totalLanesVsEmissionData}
          />)
      }
    }
  }

  const handleContinentEmission = (data) => {
    if (data === graphNames.CONTINENT_VS_EMISSION) {
      // console.log(labelsContinentVsEmission,dataContinentVsEmission,totalContinentVsEmissionData,'aksaman');
      if (continentVsEmissionLoading) {
        return (<Loader size={30} />)
      }
      else if (!continentVsEmissionLoading && !dataContinentVsEmission.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <ContinentEmission
            single={false}
            roundBar={true}
            type={"ContinentEmisn"}
            labelsArr={labelsContinentVsEmission}
            barDataArr={dataContinentVsEmission}
            loading={continentVsEmissionLoading} //ebsLoading
            totalData={totalContinentVsEmissionData}
          />)
      }
    }
  }

  const handleProcessVsEmissions = (data) => {
    if (data === graphNames.PROCESS_VS_EMISSIONS) {
      if (processEmissionLoading) {
        return (<Loader size={30} />)
      }
      else if (!processEmissionLoading && !dataProcessVsEmission.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <BarChart
            roundBar={false}
            type={"processVsEmission"}
            labelsArr={labelsProcessVsEmission}
            barDataArr={dataProcessVsEmission}
            loading={processEmissionLoading}
          />
        )
      }
    }
  }

  const handleSupplierVsEmissions = (data) => {
    if (data === "Supplier Vs Emissions") {
      if (ebsLoading) {
        return (<Loader size={30} />)
      }
      else if (!ebsLoading && !dataEmissionBySuplier.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <BarChart
            roundBar={false}
            type="supplierVsEmission"
            labelsArr={labelsEmissionBySuplier}
            barDataArr={dataEmissionBySuplier}
            maxEmissionBySupplier={maxEmissionBySupplier}
            loading={ebsLoading}
          />
        )
      }
    }
  }
  const handleBUPerformanceWithoutDates = (data) => {
    if (data === "BU Performance") {
      if (buPerformanceLoading) {
        return (<Loader size={30} />)
      }
      else if (!buPerformanceLoading && !dataBuPerformance.length) {
        return (<NothingFoundView />)
      }
      else {
        return (

          <>

            <BarChart
              roundBar={false}
              type="buPerformance"
              businessUnitPerformance={true}
              labelsArr={labelsBuPerformance}
              barDataArr={dataBuPerformance}
              loading={buPerformanceLoading}
              isWeek={selectedWeek.length ? true : false}
              totalData={totalBuPerformanceData}
              startDate={findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
              endDate={findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
            />

          </>

        )
      }
    }
  }

  const handleBUPerformance = (data) => {
    if (data === graphNames.BU_PERFORMANCE) {
      if (buPerformanceLoading) {
        return (<Loader size={30} />)
      }
      else if (!buPerformanceLoading && !dataBuPerformance.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <>
            <BarChart
              roundBar={false}
              type="buPerformance"
              labelsArr={labelsBuPerformance}
              barDataArr={dataBuPerformance}
              loading={buPerformanceLoading}
              isWeek={selectedWeek.length ? true : false}
              totalData={totalBuPerformanceData}
              startDate={findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
              endDate={findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
            />

          </>

        )
      }
    }
  }

  const handleEmissionPerformance = (data) => {
    if (data === graphNames.EMISSION_PERFORMANCE) {
      if (buPerformanceLoading) {
        return (<Loader size={30} />)
      }
      else if (!buPerformanceLoading && !dataBuPerformance.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <>
            <BarChart
              roundBar={false}
              type="EmissionPerformance"
              labelsArr={labelsBuPerformance}
              barDataArr={dataBuPerformance}
              loading={buPerformanceLoading}
              isWeek={selectedWeek.length ? true : false}
              totalData={totalBuPerformanceData}
              startDate={findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
              endDate={findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear)}
            />

          </>

        )
      }
    }
  }
  const handlePieChart = (data) => {
    if (data === graphNames.MODES_VS_EMISSION) {
      if (modesVsEmissionLoading) {
        return (<Loader size={30} />)
      }
      else if (!modesVsEmissionLoading && !dataModesVsEmission.length) {
        return (<NothingFoundView />)
      }
      else {
        return (
          <PieChart
            pieData={dataModesVsEmission}
            labelsArr={labelsModesVsEmission}
            bgColorArr={modesBgColor}
          />
        )
      }
    }
  }

  const handleEmissionBySupplier = (data) => {
    if (data === graphNames.EMISSION_BY_SUPPLIER) {
      if (ebsLoading) {
        return (<Loader size={30} />)
      }
      else if (!ebsLoading && !dataEmissionBySuplier.length) {
        return (
          <NothingFoundView />
        )
      }
      else {
        return (
          <BarChart
            roundBar={true}
            type={"supplier"}
            labelsArr={labelsEmissionBySuplier}
            barDataArr={dataEmissionBySuplier}
            maxEmissionBySupplier={maxEmissionBySupplier}
            loading={ebsLoading}
          />
        )
      }
    }
  }

  return (
    <>

      {
        //  data!=="Emission By Region Detailed" && 
        Object.values(graphNames).includes(data) &&
        <Grid
          {...provided}
          {...dragHandleProps}
          innerRef={providerRef}
          component={"div"}
          items
          sm={12}
          md={col}

          className={"infographic-grid"}
        >
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="flex-start"
            className={`infographic-container ${getClassName(data)}`}

            sx={{
              borderRadius: "9px",
              background: "#FFFFFF",
              border: "1px solid #ffffff",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "41px",
                margin: "16px 15px 0px 15px",
                paddingBottom: "10px",
                borderBottom: "0.8px solid #E4E5E7",

              }}
            >
              <span
                className="infographic-container-label"
                // style={{ color: "#003C6C", fontWeight: "600" }}
                style={{ color: "#380e0e", fontWeight: "600", fontSize: "12px" }}
              >
                <span
                  onClick={() => {
                    if (enabledInfoClick) {
                      if (data === graphNames.EMISSION_SCOPES) {
                        setEnabledInfoClick("");
                      }
                    }
                  }}
                  style={enabledInfoClick ? { cursor: "pointer" } : {}}
                >
                  {data === graphNames.EMISSION_BY_COUNTRY
                    ? "Country Vs Emission"
                    : data === graphNames.EMISSION_BY_REGION
                      ? "Emission By Region"
                      : data === graphNames.EMISSION_BY_COUNTRY_DETAILED ? "Country Vs Emission"  
                      : data === graphNames.BU_PERFORMANCE ? "BU Performance" : data}
                </span>{" "}
                {enabledInfoClick && (
                  <span>
                    <span style={{ marginRight: "5px" }}>&gt;</span>
                    {enabledInfoClick}ppp
                  </span>
                )}
              </span>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }} >



                {(data === graphNames.EMISSION_PERFORMANCE || data === graphNames.SOLD_PRODUCTS_VS_EMISSIONS) &&
                  <>
                    <FormControl sx={{ Width: 110 }} size="small">
                      <Select
                        style={{ width: "110px", marginRight: "10px", marginLeft: "10px", height: "25px" }}
                        variant="outlined"
                        value={!selectedYear ? "none" : selectedYear}
                        MenuProps={{
                          PaperProps: {

                            style: {
                              maxHeight: 200,
                              fontSize: "12px",
                              marginTop: "50px",
                            },
                          },
                        }}
                        className={"buYearInfo"}
                        select
                        size="small"
                      >
                        <MenuItem style={{ display: "none" }} value={"none"}>
                          Year
                        </MenuItem>
                        {filteredYearArr.length > 0 && filteredYearArr.map((item, index) => {
                          return <MenuItem
                            value={item}
                            className={"buYearInfoMenu"}
                            key={utils.commonFunctions.keyFinder()}
                            onClick={() => handleYearChange(item, index)}
                          >
                            {item}
                          </MenuItem>
                        })}

                      </Select>
                    </FormControl>
                    <FormControl sx={{ Width: 105 }} size="small">
                      <Select
                        style={{ marginRight: "10px", height: "25px" }}
                        variant="outlined"
                        value={!selectedMonth ? "none" : selectedMonth}
                        className={"buMonthInfo"}
                        select
                        MenuProps={{
                          PaperProps: {

                            style: {
                              maxHeight: 200,
                              fontSize: "12px",
                              marginTop: "50px",
                            },
                          },
                        }}
                        size="small"
                        disabled={selectedYear ? false : true}
                      >
                        <MenuItem style={{ display: "none" }} value={"none"}>
                          Month
                        </MenuItem>
                        {filteredMonthArr.length > 0 && filteredMonthArr.map((item, index) => {
                          return <MenuItem
                            value={item.value}
                            className={"buMonthInfoMenu"}
                            key={utils.commonFunctions.keyFinder()}
                            onClick={() => handleMonthChange(item.value)}
                          >
                            {item.value}
                          </MenuItem>
                        })}

                      </Select>
                    </FormControl>
                  </>
                }
                {data === graphNames.EMISSION_PERFORMANCE &&
                  <FormControl sx={{ Width: 90 }} size="small">
                    <Select
                      variant="outlined"
                      value={!selectedWeek ? "none" : selectedWeek}
                      select
                      className={"buWeekInfo"}
                      MenuProps={{
                        PaperProps: {

                          style: {
                            maxHeight: 200,
                            fontSize: "14px",
                            marginTop: "50px",
                          },
                        },
                      }}

                      disabled={selectedMonth.length ? false : true}
                      style={{ height: "25px" }}
                    >
                      <MenuItem style={{ display: "none" }} value={"none"}>
                        Week
                      </MenuItem>
                      {
                        filteredWeekArr.length > 0 && filteredWeekArr.map((item, index) => {
                          return <MenuItem
                            value={item}
                            className={"buWeekInfoMenu"}
                            key={utils.commonFunctions.keyFinder()}
                            onClick={() => handleWeekChange(item)}
                          >
                            {item}
                          </MenuItem>
                        })}

                    </Select>
                  </FormControl>
                }


                {data === graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES &&
                  <FormControl className="streamFormControl" size="small">
                    <Select
                      variant="outlined"
                      value={selectedStream}
                      onChange={handleChangeStream}
                      className="scopeStream"
                      select
                      size="small"
                      MenuProps={{
                        PaperProps: {
                          classes: "streamPaper",
                          style: {
                            maxHeight: 200,
                            fontSize: "14px",
                            marginTop: "60px",
                          },
                        },
                      }}
                      style={{ height: "25px" }}
                    >
                      <MenuItem style={{ display: "none" }} value={"none"}>
                        Stream
                      </MenuItem>
                      <MenuItem key={1} value="Upstream">
                        Upstream
                      </MenuItem>
                      <MenuItem key={2} value="Downstream">
                        Downstream
                      </MenuItem>

                    </Select>
                  </FormControl>
                }
                {
                  (data === graphNames.NON_SCM_SOURCING_VS_EMISSIONS ||
                    data === graphNames.RMPO_WISE_EMISSIONS ||
                    data === graphNames.PRODUCT_TYPE_VS_EMISSIONS) &&
                    <FormControl className="NSCMDROPDownFormControl" >                    <Select
                      labelId="demo-simple-NSCM-label"
                      id="demo-simple-select-NSCM"
                      variant="outlined"
                      className="NSCMDROPDown"
                      defaultValue={"Purchased Goods"}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            background: '#EBEBEB',
                            padding: "0px",
                            minWidth: "25px",
                            marginTop: "50px",
                            '& .MuiMenuItem-root': {
                              padding: 1,
                              fontSize: "12px",
                              fontFamily: "Inter",
                              border: "1px solid #EFEFEF",
                              fontWeight: "400",
                              color: "#000000",

                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value={"Purchased Goods"}>Purchased Goods</MenuItem>
                      <MenuItem value={"Capitals Goods"}>Capitals Goods</MenuItem>

                    </Select>
                  </FormControl>
                }
                <Link
                  onClick={() => {
                    handleSingleView();
                    handleSingleViewInfographic(data);
                  }}
                  to={`/carbon-analytics/singleview/${data
                    ?.toLowerCase()
                    ?.replaceAll(" ", "-")}`}
                >
                  <IconButton aria-label="delete" disableFocusRipple disableRipple>
                    <SingleViewIcon />
                  </IconButton>
                </Link>
                <IconButton aria-label="delete" disableFocusRipple disableRipple>
                  <DropdownDotsIcon />
                </IconButton>
              </div>
            </div>
            {data === graphNames.EMISSION_TIMELINE && <EmissionTimeline />}
            {data === graphNames.EMISSION_SCOPES && (
              <EmissionScopes
                setEnabledInfoClick={setEnabledInfoClick}
                enabledInfoClick={enabledInfoClick}
              />
            )}
            {
              handleCastFuelLoading(data)
            }
            {
              handleEmmissionVsCategories(data)
            }
            {
              handleHorizontalBarChart(data)
            }
            {
              handleBarChart(data)
            }
            {
              handleLanesEmission(data)
            }
            {
              handleContinentEmission(data)
            }
            {
              handleProcessVsEmissions(data)
            }
            {
              handleSupplierVsEmissions(data)
            }
            {
              handleBUPerformance(data)
            }
            {
              handleEmissionPerformance(data)
            }

            {
              handlePieChart(data)
            }
            {data === graphNames.GHG_WISE_EMISSION && (
                <DonutChart
                  type={"ghgEmission"}
                  ghgEmissionsArr={ghgEmissionsArr}
                  donutData={
                    ghgDonutData // [23, 23, 23, 10.3, 23, 23, 23]
                  }
                  labels={
                    ghgLabelData
                  }
                  cutout={
                    window.screen.width > 1500
                      ? 80
                      : window.screen.width > 1280 && window.screen.width < 1500
                        ? 75
                        : 65
                  }
                  backgroundColor={
                    bgColorArr
                  }
                  loading={ghgLoading}
                />
              )
            }
            {data === graphNames.SALES_BY_EMISSION && (
              <BarChart type={"SalesVsEmission"} roundBar={false} loading={false} />
            )}
            {handleEmissionBySupplier(data)}
            {data === graphNames.EMISSION_ACROSS_ACTIVITY && (
              <div className="emission-main-cont">
                <EmissionActivity />{" "}
              </div>
            )}
            {data === graphNames.EMISSION_ACROSS_TRANSPORTATION && (
              <EmissionTransportation />
            )}
            {data === graphNames.EMISSION_BY_REGION && (
              <EmissionByRegionDetailed single={false} />
            )}
            {data === graphNames.EMISSION_BY_COUNTRY_DETAILED && (
              <EmissionByCountryDetailed single={false} />
            )}
            {data === graphNames.UPSTREAM_NETWORKS_VS_EMISSION && (
              <UpstreamNetworksVsEmission />
            )}
            {data === graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION && (
              <DownStreamAssetTypeVsEmission />
            )}
            {data === graphNames.DOWNSTREAM_LESSEE_VS_EMISSION && (
              <DownStreamLesseeVsEmission />
            )}
            {data === graphNames.UPSTREAM_ASSET_TYPE_VS_EMISSION && (
              <UpStreamAssetTypeVsEmission />
            )}
            {data === graphNames.UPSTREAM_LESSOR_VS_EMISSION && (
              <UpStreamLessorVsEmission />
            )}
            {data === graphNames.RMPO_WISE_EMISSIONS && (
              <RmpowiseEmissions />
            )}
            {data === graphNames.NON_SCM_SOURCING_VS_EMISSIONS && (
              <NONSCMSourcingVsEmissions />
            )}
            {data === graphNames.FRANCHISE_WISE_EMISSION && (
              <FranchiseWiseEmission />
            )}
            {data === graphNames.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION && (
              <UpstreamWasteManagementVsEmission />
            )}
            {data === graphNames.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION && (
              <DownstreamWasteManagementVsEmission />
            )}
            {data === graphNames.DEDICATED_VEHICLE_TYPE_VS_EMISSIONS && (
              <DedicatedVehicleTypeVsEmissions />
            )}
            {data === graphNames.OUTSOURCED_VEHICLE_TYPE_VS_EMISSIONS && (
              <OutsourcedVehicleTypeVsEmissions />
            )}
            {data === graphNames.WASTE_PROCESSING_COMPANIES_VS_EMISSIONS && (
              <WasteProcessingCompaniesVsEmission />
            )}
            {data === graphNames.SOLD_PRODUCTS_VS_EMISSIONS && (
              <SoldProductVsEmissions />
            )}
            {data === graphNames.REFRIGERATION_PROCESS_VS_EMISSION && (
              <RefrigerationProcessVsEmissions />
            )}
            {data === graphNames.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS && (
              <RefrigerantTypeConsumptionsVsEmissions />
            )}
            {data === graphNames.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS && (
              <FuelTypeConsumptionsVsEmissions />
            )}
            {data === graphNames.SPEND_VS_EMISSION && (
              <SpendVsEmission />
            )}
            {data === graphNames.PURCHASED_ELECTRICITY_CONSUMPTION_VS_EMISSION && (
              <PurchasedElectricityConsumptionVsEmission />
            )}
            {data === graphNames.BUSINESS_TRAVEL_VS_EMMISSION && (
              <BusinessTravelVsEmission />
            )}
            {data === graphNames.INVESTMENT_COMPANY_BASED_EMISSION && (
              <InvestmentCompanybasedEmission />
            )}
            {data === graphNames.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSION && (
              <ExtractionProductionTransmissionVsEmission />
            )}
            {data === graphNames.PRODUCT_TYPE_VS_EMISSIONS && (
              <ProductTypeVsEmission />
            )}
          </Box>
        </Grid>
      }
    </>
  );
}
