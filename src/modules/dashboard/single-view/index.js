import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { ReactComponent as PreviousIcon } from "src/assets/images/previous.svg";
import PieChart from "src/components/infographics/charts/pieChart";
import {
  findStartDateAccToSlctdMonth,
  findEndDateAccToSlctdMonth,
  findEndDateAccToSlctdWeek,
  findStartDateAccToSlctdWeek,
  getParamsAccToFilters
} from "src/utils/utilityFunction";
import { ReactComponent as NextIcon } from "src/assets/images/next.svg";
import CustomButton from "src/components/buttons/Buttons";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { globalActions } from "src/modules/global-states/global-states-actions";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BarChart from "src/components/infographics/charts/barChart";
import "./single-view.scss";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { getImageFromURL, IMAGES } from "src/constants/images";
import AllMetrics from "./all-metrics";
import DonutChart from "src/components/infographics/charts/donutChart";
import EmissionActivity from "src/components/infographics/emissionActivity";
import EmissionTimeline from "src/components/infographics/emissionTimeline";
import EmissionScopes from "src/components/infographics/emissionScopes/EmissionScopes";
import EmissionTransportation from "src/components/infographics/emissionTransportation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import {
  arraysQtrs,
  // allGraphDetailedSummary,
  // allMatrixArr,
  // matrixListDetailed,
  graphNames_new as graphNames,
  fiveWeekArr,
  fourWeekArr,
  monthsName
} from "src/constants/appConstants";
import Loader from "src/components/loader/index";
import CostFuel from "src/components/infographics/costFuel";
import LanesEmission from "src/components/infographics/lanesVsEmission";
import ContinentEmission from "src/components/infographics/continentVsEmission";
import EmissionByRegionDetailed from "src/components/infographics/emissionByRegion";
import HorizontalBarChart from "src/components/infographics/charts/horizontalBarChart";
import utils from "src/utils";
import { UpstreamNetworksVsEmission } from "src/components/infographics/upstreamNetworksVsEmission/upstreamNetworksVsEmission";
import { DownStreamAssetTypeVsEmission } from "src/components/infographics/downStreamAssetVsEmission/DownStreamAssetTypeVsEmission";
import { DownStreamLesseeVsEmission } from "src/components/infographics/downLesseeVsEmission/DownStreamLesseeVsEmission";
import { UpStreamAssetTypeVsEmission } from "src/components/infographics/upStreamAssetTypeVsEmission/upStreamAssetTypeVsEmission";
import { UpStreamLessorVsEmission } from "src/components/infographics/upStreamLessorVsEmission/upStreamLessorVsEmission";
import { RmpowiseEmissions } from "src/components/infographics/rmpowiseEmissions/rmpowiseEmissions";
import { NONSCMSourcingVsEmissions } from "src/components/infographics/nonSCMSourcingVsEmissions/nonSCMSourcingVsEmissions";
import { FranchiseWiseEmission } from "src/components/infographics/franchiseWiseEmission/FranchiseWiseEmission";
import { UpstreamWasteManagementVsEmission } from "src/components/infographics/upstreamWasteManagementVsEmission/UpstreamWasteManagementVsEmission";
import { DownstreamWasteManagementVsEmission } from "src/components/infographics/downStreamWasteManagementVsEmission/downstreamWasteManagementVsEmission";
import { DedicatedVehicleTypeVsEmissions } from "src/components/infographics/dedicatedVehicleTypeVsEmissions/DedicatedVehicleTypeVsEmissions";
import { OutsourcedVehicleTypeVsEmissions } from "src/components/infographics/outsourcedVehicleTypeVsEmissions/OutsourcedVehicleTypeVsEmissions";
import { WasteProcessingCompaniesVsEmission } from "src/components/infographics/wasteProcessingCompaniesVsEmission/WasteProcessingCompaniesVsEmission";
import { SoldProductVsEmissions } from "src/components/infographics/soldProductVsEmissions/SoldProductVsEmissions";
import { RefrigerationProcessVsEmissions } from "src/components/infographics/refrigerationProcessVsEmissions/RefrigerationProcessVsEmissions";
import { RefrigerantTypeConsumptionsVsEmissions } from "src/components/infographics/refrigerantTypeConsumptionsVsEmissions/RefrigerantTypeConsumptionsVsEmissions";
import { FuelTypeConsumptionsVsEmissions } from "src/components/infographics/fuelTypeConsumptionsVsEmissions/FuelTypeConsumptionsVsEmissions";
import { SpendVsEmission } from "src/components/infographics/spendVsEmission/SpendVsEmission";
import { BusinessTravelVsEmission } from "src/components/infographics/businessTravelVsEmmission/BusinessTravelVsEmission";
import InvestmentCompanybasedEmission from "src/components/infographics/investmentCompanybasedEmission/InvestmentCompanybasedEmission";
import ExtractionProductionTransmissionVsEmission from "src/components/infographics/extractionProductionTransmissionVsEmission/ExtractionProductionTransmissionVsEmission";
import { PurchasedElectricityConsumptionVsEmission } from "src/components/infographics/purchasedElectricityConsumptionVsEmission/purchasedElectricityConsumptionVsEmission";
import { ProductTypeVsEmission } from "src/components/infographics/productTypeVsEmission/ProductTypeVsEmission";
import EmissionByCountryDetailed from "src/components/infographics/emissionByCountry";



const {
  setSingleViewInfographic
} = globalActions;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SingleView = () => {
  const { setCostFuelLocal } = globalActions;
  const open = false;
  const { regionData } = useSelector((state) => state.globalRed);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    singleDetailed,
    // 

    emission_by_region,
    emission_performance,
    lanes_vs_emission,
    cost_fuel_item_shipped_emission,
    modes_vs_emission,
    total_scope_1_emission_vs_categories,
    total_scope_2_emission_vs_categories,
    total_scope_3_emission_vs_categories,
    process_vs_emissions,
    supplier_vs_emissions,
    upstream_networks_vs_emission,
    downstream_asset_type_vs_emission,
    downstream_lessee_vs_emission,
    upstream_asset_type_vs_emission,
    upstream_lessor_vs_emission,
    rmpo_wise_emissions,
    non_scm_sourcing_vs_emissions,
    franchise_wise_emission,
    downstream_waste_management_vs_emission,
    upstream_waste_management_vs_emission,
    dedicated_vehicle_type_vs_emissions,
    outsourced_vehicle_type_vs_emissions,
    waste_processing_companies_vs_emissions,
    sold_products_vs_emissions,
    refrigeration_process_vs_emission,
    refrigerant_type_consumptions_vs_emissions,
    fuel_type_consumptions_vs_emissions,
    spend_vs_emission,
    purchased_electricity_consumption_vs_emission,
    investment_company_based_emission,
    extraction_production_transmission_vs_emission,
    product_type_vs_emissions,
    business_travel_vs_emmission,

    emission_by_country,
    emission_by_country_detailed,
    continent_vs_emission,
    bu_performance,
    emission_timeline,
    emission_scopes,
    emission_across_activity,
    emission_across_transportation,
    sales_by_emission,
    ghg_wise_emission,
    emission_by_supplier,

  } = useSelector((state) => state.globalRed);
  const [ghgDonutData, setGhgDonutData] = useState([]);
  const [ghgLabelData, setGhgLabelData] = useState([]);
  const [labelsEmissionBySuplier, setLabelsEmissionBySuplier] = useState([]);
  const [dataEmissionBySuplier, setDataEmissionBySuplier] = useState([]);
  const [labelsProcessVsEmission, setProcessVsEmission] = useState([]);
  const [dataProcessVsEmission, setDataProcessVsEmission] = useState([]);
  const [maxEmissionBySupplier, setEmissionBySupplier] = useState(0);
  const personName = [];
  const [allMetricView, setAllMetricView] = React.useState(false);
  const [infographicName, setInfograpicName] = React.useState("");
  const [ebsLoading, setEbsLoading] = useState(true);
  const [processEmissionLoading, setProcessEmissionLoading] = useState(true);
  const [hiddenInfographoicArr, setHiddenInfographoicArr] = useState([]);
  const [modesVsEmissionLoading, setModesVsEmissionLoading] = useState(true);
  const [dataModesVsEmission, setDataModesVsEmission] = useState([]);
  const [labelsModesVsEmission, setModesVsEmission] = useState([]);
  const [modesBgColor, setModesBgColor] = useState([])
  const [dataCostFuel, setDataCostFuel] = useState([]);
  const [costFuelLoading, setCostFuelLoading] = useState(true);

  const [labelslanesVsEmission, setLabelLanesVsEmission] = useState([]);
  const [datalanesVsEmission, setDataLanesVsEmission] = useState([]);
  const [lanesVsEmissionLoading, setLanesVsEmissionLoading] = useState(true);
  const [totalLanesVsEmissionData, setLanesVsEmissionData] = useState([]);

  const [labelsContinentVsEmission, setLabelContinentVsEmission] = useState([]);
  const [dataContinentVsEmission, setDataContinentVsEmission] = useState([]);
  const [continentVsEmissionLoading, setContinentVsEmissionLoading] = useState(true);
  const [totalContinentVsEmissionData, setContinentVsEmissionData] = useState([]);

  const [labelsBuPerformance, setLabelBuPerformance] = useState([]);
  const [dataBuPerformance, setDataBuPerformance] = useState([]);
  const [buPerformanceLoading, setBuPerformanceLoading] = useState(true);
  const [totalBuPerformanceData, setBuPerformanceData] = useState([]);

  const [totalScoe1Loading, setTotalScoe1Loading] = useState(true);
  const [totalScoe2Loading, setTotalScoe2Loading] = useState(true);
  const [totalScoe3Loading, setTotalScoe3Loading] = useState(true);

  const [
    totalScope1EmissionVsCategoriesData,
    setTotalScope1EmissionVsCategoriesData,
  ] = useState([]);
  const [
    totalScope2EmissionVsCategoriesData,
    setTotalScope2EmissionVsCategoriesData,
  ] = useState([]);
  const [
    totalScope3EmissionVsCategoriesData,
    setTotalScope3EmissionVsCategoriesData,
  ] = useState([]);
  const [
    labelTotalScope3EmissionVsCategories,
    setLabelTotalScope3EmissionVsCategories,
  ] = useState([]);

  const [totalScope3Data, setTotalScope3Data] = useState([]);
  const [totalScope3DataAccStream, setTotalScope3DataAccStream] = useState([]);
  const [selectedStream, setSelectedStream] = useState("Downstream");

  const [filteredYearArr, setFilteredYearArr] = useState([]);
  const [filteredMonthArr, setFilteredMonthArr] = useState([]);
  const [filteredWeekArr, setFilteredWeekArr] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [ghgEmissionsArr, setGhgEmissionsArr] = useState([]);

  const [enabledInfoClick, setEnabledInfoClick] = useState("");

  const {
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) =>
    singleDetailed ? state.detailedFilters : state.filters
  );

  const { modes, activity, movement } = useSelector(
    (state) => state.detailedFilters
  );
  const { visibleChartsThroughShowHide } = useSelector((state) => ({
    visibleChartsThroughShowHide:
      state.dashExecutiveReducer.visibleChartsThroughShowHide,
  }));
  const { visibleChartsThroughDetailedShowHide } = useSelector((state) => ({
    visibleChartsThroughDetailedShowHide:
      state.dashExecutiveReducer.visibleChartsThroughDetailedShowHide,
  }));

  const infoDetailedSummary = useSelector((state) => ({
    visibleChartsThroughDetailedSummary:
      state.dashExecutiveReducer.visibleChartsThroughDetailedSummary,
  })).visibleChartsThroughDetailedSummary;

  const infoExecutiveSummary = useSelector((state) => ({
    visibleChartsThroughExecutiveSummary:
      state.dashExecutiveReducer.visibleChartsThroughExecutiveSummary,
  })).visibleChartsThroughExecutiveSummary;

  const { t } = useTranslation();
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
  const generateDeselectedArr = () => {
    let filteredArrNames = [];
    let tempDeselectedArr = [];
    if (singleDetailed) {
      tempDeselectedArr = infoDetailedSummary.filter(function (
        itemAllGraphic
      ) {
        return !visibleChartsThroughDetailedShowHide.find(function (item) {
          return itemAllGraphic.name === item;
        });
      });
    }
    else {
      tempDeselectedArr = infoExecutiveSummary.filter((item) => {
        return !visibleChartsThroughShowHide.find((name) => item.name === name)
      });
    }

    tempDeselectedArr.map((item) => {
      filteredArrNames.push(item.name);
    });
    setHiddenInfographoicArr(
      singleDetailed
        ? generateNamesDetailed(filteredArrNames)
        // : generateNames(filteredArrNames)
        : generateNamesExecutive(filteredArrNames)
    );
  };

  useEffect(() => {
    generateDeselectedArr();
  }, []);

  const generateNames = (arrFromRdx) => {
    let newNames = [];
    arrFromRdx.map((item) => {
      if (item === "Emission Scopes") {
        newNames.push("Emission By Scopes");
      } else if (item === "Emission Timeline") {
        newNames.push("Emission By Timeline");
      } else if (item === "Emission by Region") {
        newNames.push("Emission By Region");
      } else if (item === "Emission by Country") {
        newNames.push("Emission By Country");
      } else if (item === "Emission Across Activity") {
        newNames.push("Emission Across Activity");
      } else if (item === "Emission Across Transportation") {
        newNames.push("Emission Across Transportation");
      } else if (item === "Sales Vs Emission") {
        newNames.push("Sales Vs Emission");
      } else if (item === "GHG Wise Emission") {
        newNames.push("GHG Wise Emission");
      } else if (item === "Emission By Supplier") {
        newNames.push("Emissions By Supplier");
      }
    });
    return newNames;
  };

  // const generateNamesDetailed = (arrFromRdx) => {
  //   let newNames = [];

  //   arrFromRdx.map((id) => {
  //     switch (id) {
  //       case matrixListDetailed.COST_FUEL:
  //         newNames.push(matrixListDetailed.COST_FUEL);
  //         break;
  //       case matrixListDetailed.LANES_EMISSIONS:
  //         newNames.push(matrixListDetailed.LANES_EMISSIONS);
  //         break;
  //       case matrixListDetailed.CONTINENT_EMISSIONS:
  //         newNames.push(matrixListDetailed.CONTINENT_EMISSIONS);
  //         break;
  //       case matrixListDetailed.PROCESS_EMISSIONS:
  //         newNames.push(matrixListDetailed.PROCESS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.SUPPLIER_EMISSIONS:
  //         newNames.push(matrixListDetailed.SUPPLIER_EMISSIONS);
  //         break;
  //       case matrixListDetailed.EMISSION_PERFORMANCE:
  //         newNames.push(matrixListDetailed.EMISSION_PERFORMANCE);
  //         break;
  //       case matrixListDetailed.MODES_EMISSIONS:
  //         newNames.push(matrixListDetailed.MODES_EMISSIONS);
  //         break;
  //       case matrixListDetailed.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
  //         newNames.push(matrixListDetailed.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES);
  //         break;
  //       case matrixListDetailed.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
  //         newNames.push(matrixListDetailed.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES);
  //         break;
  //       case matrixListDetailed.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
  //         newNames.push(matrixListDetailed.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES);
  //         break;
  //       case matrixListDetailed.EMISSION_BY_REGION:
  //         newNames.push(matrixListDetailed.EMISSION_BY_REGION);
  //         break;
  //       case matrixListDetailed.EMISSION_BY_COUNTRY:
  //         newNames.push(matrixListDetailed.EMISSION_BY_COUNTRY);
  //         break;
  //       case matrixListDetailed.UPSTREAM_NETWORKS_VS_EMISSION:
  //         newNames.push(matrixListDetailed.UPSTREAM_NETWORKS_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.DOWNSTREAM_ASSET_TYPE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.DOWNSTREAM_ASSET_TYPE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.DOWNSTREAM_LESSEE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.DOWNSTREAM_LESSEE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.UPSTREAM_ASSET_TYPE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.UPSTREAM_ASSET_TYPE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.UPSTREAM_LESSOR_VS_EMISSION:
  //         newNames.push(matrixListDetailed.UPSTREAM_LESSOR_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.RMPO_WISE_EMISSIONS:
  //         newNames.push(matrixListDetailed.RMPO_WISE_EMISSIONS);
  //         break;
  //       case matrixListDetailed.NON_SCM_SOURCING_VS_EMISSION:
  //         newNames.push(matrixListDetailed.NON_SCM_SOURCING_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.FRANCHISE_WISE_EMISSION:
  //         newNames.push(matrixListDetailed.FRANCHISE_WISE_EMISSION);
  //         break;
  //       case matrixListDetailed.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
  //         newNames.push(matrixListDetailed.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
  //         newNames.push(matrixListDetailed.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.DEDICATED_VEHICLE_TYPE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.DEDICATED_VEHICLE_TYPE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.OUTSOURCED_VEHICLE_TYPE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.OUTSOURCED_VEHICLE_TYPE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.WASTE_PROCESSING_COMPANIES_VS_EMISSION:
  //         newNames.push(matrixListDetailed.WASTE_PROCESSING_COMPANIES_VS_EMISSION);
  //         break;

  //       case matrixListDetailed.SOLD_PRODUCTS_VS_EMISSION:
  //         newNames.push(matrixListDetailed.SOLD_PRODUCTS_VS_EMISSION)
  //         break;
  //       case matrixListDetailed.REFRIGERATION_PROCESS_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.REFRIGERATION_PROCESS_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.SPEND_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.SPEND_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.INVESTMENT_COMPANY_BASED_EMISSIONS:
  //         newNames.push(matrixListDetailed.INVESTMENT_COMPANY_BASED_EMISSIONS);
  //         break;
  //       case matrixListDetailed.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS:
  //         newNames.push(matrixListDetailed.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS);
  //         break;
  //       case matrixListDetailed.PRODUCT_TYPE_VS_EMISSION:
  //         newNames.push(matrixListDetailed.PRODUCT_TYPE_VS_EMISSION);
  //         break;
  //       case matrixListDetailed.BU_PERFORMANCE:
  //         newNames.push(matrixListDetailed.BU_PERFORMANCE);
  //         break;
  //       default:
  //         break;
  //     }
  //   })
  //   return newNames;
  // };

  const generateNamesDetailed = (arrFromRdx) => {
    let newNames = [];
    arrFromRdx.map((name) => {
      newNames.push((infoDetailedSummary.find((item) => item.name === name))?.name);
    });
    return newNames;
  }

  const generateNamesExecutive = (arrFromRdx) => {
    let newNames = [];
    arrFromRdx.map((name) => {
      newNames.push((infoExecutiveSummary.find((item) => item.name === name))?.name);
    });
    return newNames;
  }

  // const names = singleDetailed ? generateNamesDetailed(visibleChartsThroughDetailedShowHide) : generateNames(visibleChartsThroughShowHide);
  const names = singleDetailed ? generateNamesDetailed(visibleChartsThroughDetailedShowHide) : generateNamesExecutive(visibleChartsThroughShowHide);
  const getTotalScope1EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    params.scope = "[1]";

    Apicalls.getApiCall(
      constants.endPoints.emissionScopes,
      params,
      "",
      handleTotalScope1EmissionVsCategoriesSuccess,
      handleTotalScope1EmissionVsCategoriesError
    );
  }, [
    infographicName,
    scope,
    bu,
    team,
    region,
    calendar_filters,
    modes,
    movement,
    activity,
  ]);

  const handleTotalScope1EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe1Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope1EmissionVsCategories"); //here ebs bar data is made
    }
  };

  const handleTotalScope1EmissionVsCategoriesError = () => {
    setTotalScoe1Loading(false);
  };

  const getTotalScope2EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    params.scope = "[2]";
    Apicalls.getApiCall(
      constants.endPoints.scope2EmissionCateg,
      params,
      "",
      handleTotalScope2EmissionVsCategoriesSuccess,
      handleTotalScope2EmissionVsCategoriesError
    );
  }, [
    infographicName,
    scope,
    bu,
    team,
    region,
    calendar_filters,
    modes,
    activity,
    movement,
  ]);

  const handleTotalScope2EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe2Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope2EmissionVsCategories"); //here ebs bar data is made
    }
  };

  const handleTotalScope2EmissionVsCategoriesError = () => {
    setTotalScoe2Loading(false);
  };

  const getTotalScope3EmissionVsCategoriesData = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    params.scope = "[3]";

    Apicalls.getApiCall(
      constants.endPoints.emissionScopes,
      params,
      "",
      handleTotalScope3EmissionVsCategoriesSuccess,
      handleTotalScope3EmissionVsCategoriesError
    );
  }, [
    infographicName,
    scope,
    bu,
    team,
    region,
    calendar_filters,
    modes,
    activity,
    movement,
  ]);

  const handleTotalScope3EmissionVsCategoriesSuccess = (response) => {
    setTotalScoe3Loading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "totalScope3EmissionVsCategories"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "totalScope3EmissionVsCategories");
      setTotalScope3Data(calculatePercent(response?.data?.result?.data));
    }
  };

  const handleTotalScope3EmissionVsCategoriesError = () => {
    setTotalScoe3Loading(false);
  };

  const calculatePercent = (arr) => {
    let vTotal = arr.reduce((a, b) => a + b.emission, 0);
    arr.map((item) => {
      item.percent = ((item.emission / vTotal) * 100).toFixed(3);
    });
    return arr;
  };

  const getEmissionPerformance = useCallback(() => {
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    if (selectedMonth) {
      params.start_date = findStartDateAccToSlctdMonth(selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdMonth(selectedMonth, selectedYear)
    }

    if (selectedWeek) {
      params.tag = "week";
      params.start_date = findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear);
      params.end_date = findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear);
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
    infographicName,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes,
    movement,
    activity,
    selectedYear,
    selectedMonth,
    selectedWeek
  ]);
  const getBuPerformanceWithoutDates = useCallback(() => {
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    if (selectedMonth) {
      params.start_date = findStartDateAccToSlctdMonth(selectedMonth, selectedYear)
      params.end_date = findEndDateAccToSlctdMonth(selectedMonth, selectedYear)
    }

    if (selectedWeek) {
      params.tag = "week";
      params.start_date = findStartDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear);
      params.end_date = findEndDateAccToSlctdWeek(selectedWeek, selectedMonth, selectedYear);
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
    infographicName,
    scope,
    bu,
    team,
    region,
    country,
    calendar_filters,
    modes,
    movement,
    activity,
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
    //This is intentional for error logging.

  };

  const makeArrWithBuName = (tempArr) => {
    //  let tempArrF = bu_filters?.filter(function (itemBuFilters) {
    let tempArrF = tempArr?.filter(function (itemBuFilters) {
      return tempArr.find(function (tempArrItem) {
        if (itemBuFilters.id === tempArrItem.bu_id) {
          itemBuFilters.emission = tempArrItem.emission;
        }
        return itemBuFilters.id === tempArrItem.bu_id;
      });
    });
    return tempArrF;
  };

  const getLanesVsEmission = useCallback(() => {
    //Here we will calling the Lanes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);

    Apicalls.getApiCall(
      constants.endPoints.lanesVsEmission,
      params,
      "",
      handleLanesVsEmissionSuccess,
      handleLanesVsEmissionError
    );
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

  const handleLanesVsEmissionSuccess = (response) => {
    setLanesVsEmissionLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "lanesVsEmission"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "lanesVsEmission", "lane"); //here ebs is emission by supplier, here label of bar data is made
      setLanesVsEmissionData((response?.data?.result?.data));
    }
  };
  const handleLanesVsEmissionError = (error) => {
    setLanesVsEmissionLoading(false);
    console.log("handleLanesVsEmissionError", error);
  };

  const getContinentVsEmission = useCallback(() => {
    //Here we will calling the Continent vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);

    Apicalls.getApiCall(
      constants.endPoints.continentVsEmission,
      params,
      "",
      handleContinentVsEmissionSuccess,
      handleContinentVsEmissionError
    )
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

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
    });
    return data;
  };
  const findBuNameFromBuId = (item) => {
    let tempArr = bu_filters?.filter(function (itemBuFilters) {
      return itemBuFilters.id === item.bu_name;
    });
    if (tempArr.length) {
      return tempArr[0]?.name;
    }
    return " ";
  };

  const getCostFuelData = useCallback(() => {
    //Here we will calling the modes vs emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    Apicalls.getApiCall(
      constants.endPoints.getCostFuelData,
      params,
      "",
      handleCostFuelSuccess,
      handleCostFuelError
    );
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

  const handleCostFuelSuccess = (response) => {
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
    console.log("handleCostFuelError", error);
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
        item.unit = "KM";
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
    params = getParamsAccToFilters(dataForParams, singleDetailed);

    Apicalls.getApiCall(
      constants.endPoints.emissionTransportation,
      params,
      "",
      handleModesVsEmissionSuccess,
      handleModesVsEmissionError
    );
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

  const handleModesVsEmissionSuccess = (response) => {
    setModesVsEmissionLoading(false);
    if (response) {
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
    console.log("handleModesVsEmissionError-->>", error);
  };

  const getProcessVsEmission = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);

    Apicalls.getApiCall(
      constants.endPoints.processVsEmission,
      params,
      "",
      handleProcessVsEmissionSuccess,
      handleProcessVsEmissionError
    );
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

  const handleProcessVsEmissionSuccess = (response) => {
    setProcessEmissionLoading(false);
    if (response) {
      makeBarDataArr(response?.data?.result?.data, "processVsEmission"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "processVsEmission", "process"); //here ebs is emission by supplier, here label of bar data is made
    }
  };
  const handleProcessVsEmissionError = (error) => {
    setProcessEmissionLoading(false);
  };

  const getEmissionBySupplier = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);

    Apicalls.getApiCall(
      constants.endPoints.emissionBySupplier,
      params,
      "",
      handleEmissionBySupplierSuccess,
      handleEmissionBySupplierError
    );
  }, [
    infographicName,
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

  const handleEmissionBySupplierSuccess = (response) => {
    setEbsLoading(false);
    if (response) {
      calculateMaxEmissionBySupplier(response?.data?.result?.data);
      makeBarDataArr(response?.data?.result?.data, "emissionBySupplier"); //here ebs bar data is made
      makeLabelArr(response?.data?.result?.data, "emissionBySupplier", "supplier"); //here ebs is emission by supplier, here label of bar data is made
    }
  };
  const handleEmissionBySupplierError = (error) => {
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
        let newArr = [];
        if (arr.length) {
          let ans = array_move(arr, 0, 1);

          ans.map((item) => {
            newArr.push(Number(parseFloat(item.emission)).toFixed(2));
          });
        }
        setTotalScope1EmissionVsCategoriesData(newArr);
        break;
      case "totalScope2EmissionVsCategories":
        let newArrr = [];
        if (arr.length) {
          let ans = array_move(arr, 0, 1);
          ans.map((item) => {
            newArrr.push(Number(parseFloat(item.emission)).toFixed(2));
          });
        }
        setTotalScope2EmissionVsCategoriesData(newArrr);
        break;
      case "totalScope3EmissionVsCategories":
        let tempArr = [];
        if (selectedStream === "Upstream") {
          tempArr = sortDataAccToStream(arr, "Upstream");
          tempArr.map((item) => {
            barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
          });
        } else if (selectedStream === "Downstream") {
          tempArr = sortDataAccToStream(arr, "Downstream");
          tempArr.map((item) => {
            barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
          });
        } else {
          tempArr = arr;
        }
        setTotalScope3DataAccStream(tempArr);
        setTotalScope3EmissionVsCategoriesData(barDataArr);
        break;
      case "buPerformance":
        setDataBuPerformance(barDataArr);
        break;
      default:
        break;
    }
  };

  const makeLabelArr = (arr, value, key) => {
    let labelArr = [];
    let bgColorArr = []

    arr.length > 0 &&
      arr?.map((item) => {
        labelArr.push(item[key]);
      });

    switch (value) {
      case "emissionBySupplier":
        setLabelsEmissionBySuplier(labelArr);
        break;
      case "processVsEmission":
        setProcessVsEmission(labelArr);
        break;
      case "modesVsEmission":
        setModesVsEmission(labelArr);

        labelArr?.map((data) => {
          if (data === "Ocean") {
            //  bgColorArr.push("#b1000e");
            return bgColorArr.push("#1C2325")
          } else if (data === "Barge") {
            return bgColorArr.push("#4CC7F4");
          } else if (data === "Road") {
            //  bgColorArr.push("#00183F")
            return bgColorArr.push("#B1000E")
          } else if (data === "Rail") {
            return bgColorArr.push("#555f63");
          } else if (data === "Air") {
            //  bgColorArr.push("#00A0CA")
            return bgColorArr.push("#B3B3B3")
          }
        });
        setModesBgColor(bgColorArr);
        break;
      case "costFuel":
        //This is intentional.
        break;
      case "lanesVsEmission":
        setLabelLanesVsEmission(labelArr);
        break;
      case "continentVsEmission":
        setLabelContinentVsEmission(labelArr);
        break;
      case "totalScope3EmissionVsCategories":
        labelArr = [];
        let tempArr = [];
        if (selectedStream === "Upstream") {
          tempArr = sortDataAccToStream(arr, "Upstream");
        } else if (selectedStream === "Downstream") {
          tempArr = sortDataAccToStream(arr, "Downstream");
        } else {
          tempArr = arr;
        }
        tempArr.map((item) => {
          labelArr.push(`S${item.scope}.${item.entity}`);
        });
        setLabelTotalScope3EmissionVsCategories(labelArr);
        break;
      case "buPerformance":
        setLabelBuPerformance(labelArr);
        break;
      default:
        break;
    }

  };

  const generateTtlScp2EmvVsCtg = () => {
    return [
      [
        "Purchased Electricity",
        `${totalScope2EmissionVsCategoriesData[0] ?? ""
        }KTCO₂e`,
      ],
      [
        "Purchased Steam",
        `${totalScope2EmissionVsCategoriesData[1] ?? ""}KTCO₂e`,
      ],
      [
        "Purchased Others",
        `${totalScope2EmissionVsCategoriesData[2] ?? ""}KTCO₂e`,
      ],
    ]
  }
  const generateTtlScp1EmvVsCtg = () => {
    return [
      [
        "Fugitive Combustion",
        `${totalScope1EmissionVsCategoriesData[0] ?? ""
        }KTCO₂e`,
      ],
      [
        "Static Combustion",
        `${totalScope1EmissionVsCategoriesData[1] ?? ""
        }KTCO₂e`,
      ],
      [
        "Mobile Combustion",
        `${totalScope1EmissionVsCategoriesData[2] ?? ""
        }KTCO₂e`,
      ],
    ]

  }

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

  const sortDataAccToStream = (arr, stream) => {
    let tempUpstreamArr = arr.filter(function (itemMainArr) {
      return itemMainArr.stream === stream;
    });
    return tempUpstreamArr;
  };

  const getGhgEmission = useCallback(() => {
    //Here we will calling the ghg emission api.
    let params = {};
    params = getParamsAccToFilters(dataForParams, singleDetailed);
    Apicalls.getApiCall(
      constants.endPoints.ghgEmissions,
      params,
      "",
      handleGhgSuccess,
      handleGhgError
    );
  }, [infographicName, scope, bu, team, region, country, modes, movement, activity, calendar_filters]);

  const onClickPrev = () => {
    dispatch(setSingleViewInfographic(infographicName, false));
    const findPrevIndex =
      names.findIndex((data) => data === infographicName) - 1;
    if (findPrevIndex === -1) return;
    setInfograpicName(names[findPrevIndex]);
  };

  const onClickNext = () => {
    dispatch(setSingleViewInfographic(infographicName, false));
    const findNextIndex =
      names.findIndex((data) => data === infographicName) + 1;
    if (findNextIndex === names.length) return;
    setInfograpicName(names[findNextIndex]);
  };

  const handleGhgSuccess = (response) => {
    if (response) {
      makeGhgDonutArr(
        response?.data?.result?.data,
        response?.data?.result?.total_emission
      );
      makeGhgLabelArr(response?.data?.result?.data);
    }
  };

  const handleGhgError = (error) => {
    //// This is intentional error logging.
    console.log("error", error)
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

  const decideChangeCall = (event) => {
    dispatch(setSingleViewInfographic(infographicName, false));
    const {
      target: { value },
    } = event;
    //Here we are filtering the hidden arr to prevent change callback from firing.
    let tempFilteredArr = hiddenInfographoicArr.filter((item) => {
      return item === value;
    });
    if (!tempFilteredArr?.length) {
      handleChange(event);
    }
  };

  // const desc = () => {
  //   switch (infographicName) {
  //     case "Emission By Timeline":
  //       return "Distribution of emissions across scope-1, scope-2, and scope-3";
  //     case "BU Performance":
  //       return "Distribution of Emission across BUs";

  //     case "Emission By Scopes":
  //       return "Total Emission volume across all 3 scopes(1,2,3) and respective categories";
  //     case "Emission By Region":
  //       return "Emission hotspots across levels - Region, Country, Business unit";
  //     case "Emission By Country":
  //       return "Emission hotspots across levels - Region, Country, Business unit";
  //     case "Emission Across Activity":
  //       return "Emissions volume across all activities of the value chain";
  //     case "Emission Across Transportation":
  //       return "Emissions acrosss all modes of transporation";
  //     case "Sales Vs Emission":
  //       return "Distribution of emissions by product and sales level";
  //     case "GHG Wise Emission":
  //       return "Volume of Emissions across all major GHGs";
  //     case "Emission Performance":
  //       return "Emission Volume by different Business Units across weeks, months, and year";
  //     case "Cost-Fuel-Item Shipped-Emission":
  //       return "Total volume of Emission by total cost, fuel consumed & Distance of transportation";
  //     case "Lanes Vs Emission":
  //       return "Transporation related emissions across lanes from every Consigner to Consignee pair";
  //     case "Continent Vs Emission":
  //       return "Transporation related emissions across Continent from every Consigner to Consignee pair";
  //     case "Total Scope-1 Emission vs Categories":
  //       return "Total Scope 1(Direct) Emission across all its categories";
  //     case "Emission By Region Detailed":
  //       return "Emission hotspots across levels - Region, Country, Business unit";
  //     case "Emission By Country Detailed":
  //       return "Emission hotspots across levels - Region, Country, Business unit";
  //     case "Modes Vs Emission":
  //       return "Emissions volume across all modes of transporation";
  //     case "Total Scope-2 Emission vs Categories":
  //       return "Total Scope 2(Indirect) Emission across all its categories Total Emission/Volume of Scope 2 by Different categories";
  //     case "Total Scope-3 Emission vs Categories":
  //       return "Total Scope 3(Indirect) Emission across all its categories Total Emission/Volume of Scope 3 by Different categories";
  //     case "Process Vs Emissions":
  //       return "Emission distribution across all processes of the value chain Total Volume/Emission by different process";
  //     case "Supplier Vs Emissions":
  //       return "Emission Volume by all Tier-1 suppliers and vendors";
  //     case "Emissions By Supplier":
  //       return "Emission Volume by all Tier-1 suppliers and vendors";
  //     default:
  //       return t("distributionOfEmissionsAtScopeLevelAcrossEverySingleProductAndProductCategory");
  //   }
  // };

  const desc = () => {
    switch (infographicName) {
      case graphNames.EMISSION_TIMELINE:
        return "Distribution of emissions across scope-1, scope-2, and scope-3";
      case graphNames.BU_PERFORMANCE:
        return "Distribution of Emission across BUs";
      case graphNames.EMISSION_SCOPES:
        return "Total Emission volume across all 3 scopes(1,2,3) and respective categories";
      case graphNames.EMISSION_BY_REGION:
        return "Emission hotspots across levels - Region, Country, Business unit";
      case graphNames.EMISSION_BY_COUNTRY:
        return "Emission hotspots across levels - Region, Country, Business unit";
      case graphNames.EMISSION_BY_COUNTRY_DETAILED:
        return "Emission hotspots across levels - Region, Country, Business unit";
      case graphNames.EMISSION_ACROSS_ACTIVITY:
        return "Emissions volume across all activities of the value chain";
      case graphNames.EMISSION_ACROSS_TRANSPORTATION:
        return "Emissions acrosss all modes of transportation";
      case graphNames.SALES_BY_EMISSION:
        return "Distribution of emissions by product and sales level";
      case graphNames.GHG_WISE_EMISSION:
        return "Volume of Emissions across all major GHGs";
      case graphNames.EMISSION_PERFORMANCE:
        return "Emission Volume by different Business Units across weeks, months, and year";
      case graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION:
        return "Total volume of Emission by total cost, fuel consumed & Distance of transportation";
      case graphNames.LANES_VS_EMISSION:
        return "Transportation related emissions across lanes from every Consigner to Consignee pair";
      case graphNames.CONTINENT_VS_EMISSION:
        return "Transportation related emissions across Continent from every Consigner to Consignee pair";
      case graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
        return "Total Scope 1(Direct) Emission across all its categories";
      // case graphNames.EMISSION_BY_REGION:
      //   return "Emission hotspots across levels - Region, Country, Business unit";
      case graphNames.MODES_VS_EMISSION:
        return "Emissions volume across all modes of transportation";
      case graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
        return "Total Scope 2(Indirect) Emission across all its categories Total Emission/Volume of Scope 2 by Different categories";
      case graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
        return "Total Scope 3(Indirect) Emission across all its categories Total Emission/Volume of Scope 3 by Different categories";
      case graphNames.PROCESS_VS_EMISSIONS:
        return "Emission distribution across all processes of the value chain Total Volume/Emission by different process";
      case graphNames.SUPPLIER_VS_EMISSIONS:
        return "Emission Volume by all Tier-1 suppliers and vendors";
      case graphNames.EMISSION_BY_SUPPLIER:
        return "Emission Volume by all Tier-1 suppliers and vendors";
      default:
        return t("distributionOfEmissionsAtScopeLevelAcrossEverySingleProductAndProductCategory");
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInfograpicName(value);
    if (value == "All Metrics") {
      navigate("/carbon-analytics/singleview/all-metrics");
      setAllMetricView(true);
    } else {
      setAllMetricView(false);
      navigate(
        `/carbon-analytics/singleview/${value
          ?.toLowerCase()
          ?.replaceAll(" ", "-")}`
      );
    }
  };

  useEffect(() => {
    switch (true) {
      // case emissionScopeSingle:
      //   setInfograpicName(graphNames.EMISSION_BY_REGION);
      //   break;
      case emission_timeline:
        setInfograpicName(graphNames.EMISSION_TIMELINE);
        break;
      case emission_across_activity:
        setInfograpicName(graphNames.EMISSION_ACROSS_ACTIVITY);
        break;
      case ghg_wise_emission:
        setInfograpicName(graphNames.GHG_WISE_EMISSION);
        break;
      case sales_by_emission:
        setInfograpicName(graphNames.SALES_BY_EMISSION);
        break;
      case emission_by_supplier:
        setInfograpicName(graphNames.EMISSION_BY_SUPPLIER);
        break;
      case emission_across_transportation:
        setInfograpicName(graphNames.EMISSION_ACROSS_TRANSPORTATION);
        break;
      case emission_by_region:
        setInfograpicName(graphNames.EMISSION_BY_REGION);
        break;
      case emission_by_country:
        setInfograpicName(graphNames.EMISSION_BY_COUNTRY);
        break;
      case emission_by_country_detailed:
        setInfograpicName(graphNames.EMISSION_BY_COUNTRY_DETAILED);
        break;
      case cost_fuel_item_shipped_emission:
        setInfograpicName(graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION);
        break;
      case business_travel_vs_emmission:
        setInfograpicName(graphNames.BUSINESS_TRAVEL_VS_EMMISSION);
        break;
      case lanes_vs_emission:
        setInfograpicName(graphNames.LANES_VS_EMISSION);
        break;
      case continent_vs_emission:
        setInfograpicName(graphNames.CONTINENT_VS_EMISSION);
        break;
      case process_vs_emissions:
        setInfograpicName(graphNames.PROCESS_VS_EMISSIONS);
        break;
      case supplier_vs_emissions:
        setInfograpicName(graphNames.SUPPLIER_VS_EMISSIONS);
        break;
      case bu_performance:
        setInfograpicName(graphNames.BU_PERFORMANCE);
        break;
      case modes_vs_emission:
        setInfograpicName(graphNames.MODES_VS_EMISSION);
        break;
      // case emissionRegionDetailedSingle:
      //   setInfograpicName(graphNames.EMISSION_BY_REGION);
      //   break;
      // case emissionCountryDetailedSingle:
      //   setInfograpicName(graphNames.EMISSION_BY_COUNTRY);
      //   break;
      case total_scope_1_emission_vs_categories:
        setInfograpicName(graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES);
        break;
      case total_scope_2_emission_vs_categories:
        setInfograpicName(graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES);
        break;
      case total_scope_3_emission_vs_categories:
        setInfograpicName(graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES);
        break;
      case upstream_networks_vs_emission:
        setInfograpicName(graphNames.UPSTREAM_NETWORKS_VS_EMISSION);
        break;
      case downstream_asset_type_vs_emission:
        setInfograpicName(graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION);
        break;
      case upstream_asset_type_vs_emission:
        setInfograpicName(graphNames.UPSTREAM_ASSET_TYPE_VS_EMISSION);
        break;
      case rmpo_wise_emissions:
        setInfograpicName(graphNames.RMPO_WISE_EMISSIONS);
        break;
      case non_scm_sourcing_vs_emissions:
        setInfograpicName(graphNames.NON_SCM_SOURCING_VS_EMISSIONS);
        break;
      case franchise_wise_emission:
        setInfograpicName(graphNames.FRANCHISE_WISE_EMISSION);
        break;
      case downstream_waste_management_vs_emission:
        setInfograpicName(graphNames.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION);
        break;
      case upstream_waste_management_vs_emission:
        setInfograpicName(graphNames.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION);
        break;
      case dedicated_vehicle_type_vs_emissions:
        setInfograpicName(graphNames.DEDICATED_VEHICLE_TYPE_VS_EMISSIONS);
        break;
      // case productTypeVsEmissionSingle:
      //   setInfograpicName(graphNames.PRODUCT_TYPE_VS_EMISSIONS);
      //   break;
      case outsourced_vehicle_type_vs_emissions:
        setInfograpicName(graphNames.OUTSOURCED_VEHICLE_TYPE_VS_EMISSIONS);
        break;
      case waste_processing_companies_vs_emissions:
        setInfograpicName(graphNames.WASTE_PROCESSING_COMPANIES_VS_EMISSIONS);
        break;
      case sold_products_vs_emissions:
        setInfograpicName(graphNames.SOLD_PRODUCTS_VS_EMISSIONS);
        break;
      case refrigeration_process_vs_emission:
        setInfograpicName(graphNames.REFRIGERATION_PROCESS_VS_EMISSION);
        break;
      case refrigerant_type_consumptions_vs_emissions:
        setInfograpicName(graphNames.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS);
        break;
      case fuel_type_consumptions_vs_emissions:
        setInfograpicName(graphNames.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS);
        break;
      case spend_vs_emission:
        setInfograpicName(graphNames.SPEND_VS_EMISSION);
        break;
      case purchased_electricity_consumption_vs_emission:
        setInfograpicName(graphNames.PURCHASED_ELECTRICITY_CONSUMPTION_VS_EMISSION);
        break;
      case investment_company_based_emission:
        setInfograpicName(graphNames.INVESTMENT_COMPANY_BASED_EMISSION);
        break;
      case extraction_production_transmission_vs_emission:
        setInfograpicName(graphNames.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSION);
        break;
      case product_type_vs_emissions:
        setInfograpicName(graphNames.PRODUCT_TYPE_VS_EMISSIONS);
        break;
      case emission_performance:
        setInfograpicName(graphNames.EMISSION_PERFORMANCE);
        break;
      case upstream_lessor_vs_emission:
        setInfograpicName(graphNames.UPSTREAM_LESSOR_VS_EMISSION);
        break;
      case downstream_lessee_vs_emission:
        setInfograpicName(graphNames.DOWNSTREAM_LESSEE_VS_EMISSION);
        break;
      default:
        // Handle case where none of the conditions are true
        break;
    }
  }, [
    emission_scopes,
    //   emissionTimelineSingle,
    emission_by_region,
    emission_by_country,
    emission_by_country_detailed,
    // emissionCountryDetailedSingle,
    emission_across_activity,
    ghg_wise_emission,
    sales_by_emission,
    emission_by_supplier,
    emission_across_transportation,
    cost_fuel_item_shipped_emission,
    business_travel_vs_emmission,
    lanes_vs_emission,
    continent_vs_emission,
    process_vs_emissions,
    supplier_vs_emissions,
    emission_performance,
    bu_performance,
    modes_vs_emission,
    total_scope_2_emission_vs_categories,
    total_scope_2_emission_vs_categories,
    total_scope_2_emission_vs_categories,
  ]);

  useEffect(() => {
    switch (infographicName) {
      case graphNames.GHG_WISE_EMISSION:
        getGhgEmission();
        break;
      case graphNames.EMISSION_BY_SUPPLIER:
      case graphNames.SUPPLIER_VS_EMISSIONS:
        getEmissionBySupplier();
        break;
      case graphNames.PROCESS_VS_EMISSIONS:
        getProcessVsEmission();
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
      case graphNames.EMISSION_PERFORMANCE:
        getEmissionPerformance();
        break;
      case graphNames.BU_PERFORMANCE:
        getBuPerformanceWithoutDates();
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
      case graphNames.BUSINESS_TRAVEL_VS_EMISSION:
        // Handle logic for "Business Travel Vs Emission"
        break;
      // Add more cases as needed
      default:
      // Handle default case if needed
    }
  }, [
    infographicName,
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    selectedYear,
    selectedMonth,
    selectedWeek,
  ]);

  const handleChangeStream = (e) => {
    let tempArr = [];
    let barDataArr = [];
    let labelArr = [];
    setSelectedStream(e?.target?.value);
    if (e?.target?.value === "Upstream") {
      tempArr = sortDataAccToStream(totalScope3Data, "Upstream");
    } else if (e?.target?.value === "Downstream") {
      tempArr = sortDataAccToStream(totalScope3Data, "Downstream");
    }
    tempArr.map((item) => {
      barDataArr.push(Number(parseFloat(item.emission)).toFixed(2));
    });
    tempArr.map((item) => {
      labelArr.push(`S${item.scope}.${item.entity}`);
    });
    setLabelTotalScope3EmissionVsCategories(labelArr);
    setTotalScope3DataAccStream(tempArr);
    setTotalScope3EmissionVsCategoriesData(barDataArr);
  };
  const handleMonthCalendarFilter = () => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      setFilteredYearArr([calendar_filters?.start_year]);
    } else {
      setFilteredYearArr([calendar_filters?.start_year, calendar_filters.end_year]);
    }
  }

  const handleYearCalendarFilter = () => {
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

  const handleQrtrCalendarFilter = () => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      setFilteredYearArr([calendar_filters?.start_year]);
    } else {
      let tempYearArr = [];
      for (
        let i = calendar_filters?.start_year;
        i <= calendar_filters.end_year;
        i++
      ) {
        tempYearArr.push(i);
      }
      setFilteredYearArr([...tempYearArr]);
    }
  }

  useEffect(() => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedWeek("");
    setFilteredYearArr([]);
    setFilteredMonthArr([]);
    setFilteredWeekArr([]);

    switch (true) {
      case Object.keys(calendar_filters).length === 0:
        setFilteredYearArr([
          new Date().getMonth() + 1 === 1
            ? new Date().getFullYear() - 1
            : new Date().getFullYear(),
        ]);
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "month":
        handleMonthCalendarFilter();
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "year":
        handleYearCalendarFilter();
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "qrtr":
        handleQrtrCalendarFilter()
        break;
      default:
        break;
    }

  }, [calendar_filters]);

  const decideParamMakeMonth = () => {
    if (new Date().getMonth() === 0) {
      return 12;
    } else {
      return new Date().getMonth();
    }
  };

  const makeMonthNameArr = (startingMonth, endMonth) => {
    let filteredMonthArrName = monthsName.filter((item, index) => {
      return index >= startingMonth - 1 && index <= endMonth - 1;
    });
    setFilteredMonthArr(filteredMonthArrName);
  };

  const handleWeekChange = (item, index) => {
    setSelectedWeek(item);
  };
  const handleMonthChange = (item) => {
    let newWeekArr = [];
    setSelectedMonth(item);
    setSelectedWeek("");
    if (item === "Feb") {
      newWeekArr = fourWeekArr;
    } else {
      newWeekArr = fiveWeekArr;
    }
    setFilteredWeekArr(newWeekArr);
  };
  const handleMonthChangeFilter = (item) => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      makeMonthNameArr(calendar_filters?.start, calendar_filters.end);
    } else {
      if (item === calendar_filters?.start_year) {
        let firstYearMonths = monthsName.filter((item, index) => {
          return calendar_filters?.start - 1 <= index;
        });
        setFilteredMonthArr(firstYearMonths);
      } else {
        let lastYearMonths = monthsName.filter((item, index) => {
          return calendar_filters?.end - 1 >= index;
        });
        setFilteredMonthArr(lastYearMonths);
      }
    }
  }

  const handleQrtrChangeFilter = (item) => {
    if (calendar_filters?.start_year === calendar_filters.end_year) {
      makeMonthNameArrFromQtr(calendar_filters?.start, calendar_filters?.end);
    } else {
      if (item === calendar_filters?.start_year) {
        makeMonthNameArrFromQtr(calendar_filters?.start, 4);
      } else {
        makeMonthNameArrFromQtr(1, calendar_filters?.end);
      }
    }
  }
  const handleYearChange = (item, index) => {
    setSelectedYear(item);
    setSelectedMonth("");
    setSelectedWeek("");

    switch (true) {
      case Object.keys(calendar_filters).length === 0:
        makeMonthNameArr(decideParamMakeMonth(), decideParamMakeMonth());
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "month":
        handleMonthChangeFilter(item);
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "year":
        makeMonthNameArr(1, 12);
        break;
      case Object.keys(calendar_filters).length > 0 && calendar_filters?.tag === "qrtr":
        handleQrtrChangeFilter(item);
        break;
      default:
        break;
    }

  };

  const makeMonthNameArrFromQtr = (startQtr, endQtr) => {
    let tempMonthArrFrmQtr = [];
    for (let i = startQtr; i <= endQtr; i++) {
      tempMonthArrFrmQtr = [
        ...tempMonthArrFrmQtr,
        ...arraysQtrs[`quarter${i}Arr`],
      ];
    }
    setFilteredMonthArr(tempMonthArrFrmQtr);
  };

  const decideClassNameAccToInfo = (infographicName) => {
    switch (infographicName) {
      case graphNames.GHG_WISE_EMISSION:
        return "ghgSingleView";
      case graphNames.EMISSION_BY_SCOPES:
        return "EmissionByScopes";
      case graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION:
        return "costFuelItem";
      case graphNames.MODES_VS_EMISSION:
        return "modesVsEmission";
      case graphNames.PROCESS_VS_EMISSION:
        return "processVsEmissions";
      case graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
        return "totalScope-1emissionvsCategories";
      case graphNames.BUSINESS_TRAVEL_VS_EMISSION:
        return "businessTravelVsEmission";
      default:
        return "";
    }
  };

  const findCutOut = (width) => {
    if (width > 1500) {
      return 80;
    }
    else if (width > 1280 && width < 1500) {
      return 75;
    }
    return 65;
  }

  const renderEmissionBySupplier = () => {
    if (ebsLoading) {
      return (
        <Loader size={30} />
      )
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
          single={true}
          labelsArr={labelsEmissionBySuplier}
          barDataArr={dataEmissionBySuplier}
          maxEmissionBySupplier={maxEmissionBySupplier}
          loading={ebsLoading}
        />
      )
    }
  }

  const renderCostFuel = () => {
    if (costFuelLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!costFuelLoading && !dataCostFuel.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <CostFuel
          single={true}
          //  labelsArr={["Distance", "Fuel", "Cost", "Item Shipped"]}
          labelsArr={["Distance", "Item Shipped"]}
          data={dataCostFuel}
        />
      )
    }
  }

  const renderTotalScope1EmissionVsCtg = () => {
    if (totalScoe1Loading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!totalScoe1Loading && !totalScope1EmissionVsCategoriesData.length) {
      return (
        <NothingFoundView />
      )
    }
    else if (scope.length > 0) {
      if (scope.includes("Scope 1")) {
        return (
          <HorizontalBarChart
            roundBar={true}
            type={"regionTotalScope1"}
            labelsArr={generateTtlScp1EmvVsCtg()}
            barDataArr={totalScope1EmissionVsCategoriesData}
            loading={totalScoe1Loading}
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
    else {
      return (
        <HorizontalBarChart
          roundBar={true}
          type={"regionTotalScope1"}
          labelsArr={generateTtlScp1EmvVsCtg()}
          barDataArr={totalScope1EmissionVsCategoriesData}
          loading={totalScoe1Loading}
          typeCss={"region-total-scope-1"}
        />
      )
    }
  }

  const renderTotalScope2EmissionVsCtg = () => {
    if (totalScoe2Loading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!totalScoe2Loading && !totalScope2EmissionVsCategoriesData.length) {
      return (
        <NothingFoundView />
      )
    }
    else if (scope.length > 0) {
      if (scope.includes("Scope 2")) {
        return (
          <HorizontalBarChart
            roundBar={true}
            type={"regionTotalScope2"}
            labelsArr={generateTtlScp2EmvVsCtg()}
            barDataArr={totalScope2EmissionVsCategoriesData}
            loading={totalScoe2Loading}
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
    else {
      return (
        <HorizontalBarChart
          roundBar={true}
          type={"regionTotalScope2"}
          labelsArr={generateTtlScp2EmvVsCtg()}
          barDataArr={totalScope2EmissionVsCategoriesData}
          loading={totalScoe2Loading}
          typeCss={"region-total-scope-2"}
        />
      )
    }
  }


  const renderTotalScope3EmissionVsCtg = () => {
    if (totalScoe3Loading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!totalScoe3Loading && !totalScope3EmissionVsCategoriesData.length) {
      return (
        <NothingFoundView />
      )
    }
    else if (scope.length > 0) {
      if (scope.includes("Scope 3")) {
        return (
          <BarChart
            barDataArr={totalScope3EmissionVsCategoriesData}
            labelsArr={labelTotalScope3EmissionVsCategories}
            roundBar={false}
            type="totalScope3"
            loading={totalScoe3Loading}
            totalData={totalScope3DataAccStream}
          />
        )
      }
      else {
        return (
          <NothingFoundView />
        )
      }
    }
    else {
      return (
        <BarChart
          barDataArr={totalScope3EmissionVsCategoriesData}
          labelsArr={labelTotalScope3EmissionVsCategories}
          roundBar={false}
          type="totalScope3"
          loading={totalScoe3Loading}
          totalData={totalScope3DataAccStream}
        />
      )
    }
  }
  const renderLanesVsEmission = () => {
    if (lanesVsEmissionLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!lanesVsEmissionLoading && !datalanesVsEmission.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <LanesEmission
          single={true}
          roundBar={true}
          type={"lanes"}
          labelsArr={labelslanesVsEmission}
          barDataArr={datalanesVsEmission}
          loading={lanesVsEmissionLoading}
          totalData={totalLanesVsEmissionData}
        />
      )
    }
  }

  const renderContinentVsEmission = () => {
    if (continentVsEmissionLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!continentVsEmissionLoading && !dataContinentVsEmission.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <ContinentEmission
          single={true}
          roundBar={true}
          type={"ContinentEmisn"}
          labelsArr={labelsContinentVsEmission}
          barDataArr={dataContinentVsEmission}
          loading={continentVsEmissionLoading}
          totalData={totalContinentVsEmissionData}
        />
      )
    }
  }

  const renderProcessVsEmission = () => {
    if (processEmissionLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!processEmissionLoading && !dataProcessVsEmission.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <BarChart
          roundBar={false}
          type="processVsEmission"
          single={true}
          labelsArr={labelsProcessVsEmission}
          barDataArr={dataProcessVsEmission}
          loading={processEmissionLoading}
        />
      )
    }
  }

  const renderSupplierVsEmission = () => {
    if (ebsLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!ebsLoading && !dataEmissionBySuplier.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <BarChart
          roundBar={false}
          type="supplierVsEmission"
          single={true}
          labelsArr={labelsEmissionBySuplier}
          barDataArr={dataEmissionBySuplier}
          maxEmissionBySupplier={maxEmissionBySupplier}
          loading={ebsLoading}
        />
      )
    }
  }

  const renderBuPerformance = () => {
    if (buPerformanceLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!buPerformanceLoading && !dataBuPerformance.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <BarChart
          single={true}
          roundBar={false}
          type="buPerformance"
          labelsArr={labelsBuPerformance}
          barDataArr={dataBuPerformance}
          loading={buPerformanceLoading}
          isWeek={selectedWeek.length ? true : false}
          totalData={totalBuPerformanceData}
          startDate={findStartDateAccToSlctdWeek(
            selectedWeek,
            selectedMonth,
            selectedYear
          )}
          endDate={findEndDateAccToSlctdWeek(
            selectedWeek,
            selectedMonth,
            selectedYear
          )}
          disabled={selectedMonth.length ? false : true}
        />
      )
    }
  }
  const renderEmissionPerformance = () => {
    if (buPerformanceLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!buPerformanceLoading && !dataBuPerformance.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        <BarChart
          single={true}
          roundBar={false}
          type="EmissionPerformance"
          // businessUnitPerformance={true}
          labelsArr={labelsBuPerformance}
          barDataArr={dataBuPerformance}
          loading={buPerformanceLoading}
          isWeek={selectedWeek.length ? true : false}
          totalData={totalBuPerformanceData}
          startDate={findStartDateAccToSlctdWeek(
            selectedWeek,
            selectedMonth,
            selectedYear
          )}
          endDate={findEndDateAccToSlctdWeek(
            selectedWeek,
            selectedMonth,
            selectedYear
          )}
          disabled={selectedMonth.length ? false : true}
        />
      )
    }
  }

  const renderModeVsEmission = () => {
    if (modesVsEmissionLoading) {
      return (
        <Loader size={30} />
      )
    }
    else if (!modesVsEmissionLoading && !dataModesVsEmission.length) {
      return (
        <NothingFoundView />
      )
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
  const renderUpstreamNetworkVsEmission = () => {
    return <UpstreamNetworksVsEmission />
  }
  const renderDownstreamAssetTypeVsEmission = () => {
    return <DownStreamAssetTypeVsEmission />
  }
  const renderDownstreamLesseeVSEmissionn = () => {
    return <DownStreamLesseeVsEmission />
  }
  const renderUpstreamAssetTypeVsEmission = () => {
    return <UpStreamAssetTypeVsEmission />
  }
  const renderUpstreamLessorVsEmission = () => {
    return <UpStreamLessorVsEmission />
  }
  const renderRMPOwiseEmissions = () => {
    return <RmpowiseEmissions />
  }
  const renderNonSCMSourcingVsEmissions = () => {
    return <NONSCMSourcingVsEmissions />
  }
  const renderfranchisewiseEmission = () => {
    return <FranchiseWiseEmission />
  }
  const renderupstreamWasteManagementVsEmission = () => {
    return <UpstreamWasteManagementVsEmission />
  }
  const renderdownstreamWasteManagementVsEmission = () => {
    return <DownstreamWasteManagementVsEmission />
  }
  const renderdedicatedVehicleTypeVsEmissions = () => {
    return <DedicatedVehicleTypeVsEmissions />
  }
  const renderoutsourcedVehicleTypeVsEmissions = () => {
    return <OutsourcedVehicleTypeVsEmissions />
  }
  const renderProductTypeEmission = () => {
    return <ProductTypeVsEmission />
  }

  const renderSelectedImage = (props) => {
    return (
      <img
        {...props}
        className={`select-arrow material-icons ${props.className
          } ${open
            ? "select-dropdown-icon-up"
            : "select-dropdown-icon-down"
          }`}
        src={getImageFromURL(`${IMAGES.SELECTICON}`)}
        alt={IMAGES.SELECTICON}
      />
    )
  }

  const renderwasteProcessingCompaniesVsEmissions = () => {
    return <WasteProcessingCompaniesVsEmission />
  }
  const rendersoldProductsVsEmissions = () => {
    return <SoldProductVsEmissions />
  }
  const renderrefrigerationProcessVsEmission = () => {
    return <RefrigerationProcessVsEmissions />
  }
  const renderrefrigerantTypeConsumptionsVsEmissions = () => {
    return <RefrigerantTypeConsumptionsVsEmissions />
  }
  const renderfuelTypeConsumptionsVsEmissions = () => {
    return <FuelTypeConsumptionsVsEmissions />
  }
  const renderBusinessTravelVsEmission = () => {
    return <BusinessTravelVsEmission />
  }
  const renderspendVsEmission = () => {
    return <SpendVsEmission />
  }
  const renderinvestmentCompanyBasedEmission = () => {
    return <InvestmentCompanybasedEmission />

  }
  const renderExtractionProductionTransmissionVsEmission = () => {
    return <ExtractionProductionTransmissionVsEmission />
  }
  const renderpurchasedElectricityConsumptionVsEmission = () => {
    return <PurchasedElectricityConsumptionVsEmission />
  }
  return (
    <>
      <Box
        component="main"
        className="main-single-container"
        sx={{
          width: "100%",
          height: "100vh",
          background: "#F5F5F5",
          "& .MuiGrid-spacing-xs-4": {
            "& .MuiGrid-item": {
              padding: "0px",
            },
          },
        }}
      >
        <Grid container className={`${!allMetricView ? "eq-page" : ""}`}>
          <Grid item md={!allMetricView ? 8.5 : 12}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 259,
                  margin: !allMetricView ? "8px 5px" : "10px 30px",
                }}
                className={`${allMetricView ? "select_box_long" : "select_box"
                  }`}
              >
                <Select
                  //   displayEmpty
                  value={infographicName}
                  onChange={decideChangeCall}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    color: "#CECECE",
                    ".MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #CECECE !important",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#CECECE",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#CECECE",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "#CECECE !important",
                    },
                    menuItem: {
                      "&:hover": {
                        backgroundColor: "#009900 !important",
                      },
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
                        marginTop: "5px",
                        borderRadius: "11px",
                        fontWeight: 900,
                      },
                    },
                  }}
                  IconComponent={(props) => (
                    renderSelectedImage(props)
                  )}
                >
                  <MenuItem value="All Metrics" className="all-single">
                    <span style={{ fontSize: "13px" }}>{t("allMetrics")}</span>
                  </MenuItem>
                  <Divider />
                  {names.map((name) => (
                    <MenuItem
                      className="single-dd"
                      sx={{ color: "#5C5C5C", padding: "0.5rem 1rem" }}
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name === graphNames.EMISSION_BY_COUNTRY_DETAILED
                        ? "Country Vs Emission"
                        : name === graphNames.BU_PERFORMANCE ? "BU Performance" : name}
                    </MenuItem>
                  ))}
                  {hiddenInfographoicArr?.length > 0 && <Divider />}
                  {hiddenInfographoicArr?.length > 0 &&
                    hiddenInfographoicArr.map((name) => (
                      <MenuItem
                        className="single-dd"
                        sx={{ color: "#353637", padding: "0.5rem 1rem" }}
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                        disabled={true}
                      >
                        {name === graphNames.EMISSION_BY_COUNTRY_DETAILED
                        ? "Country Vs Emission"
                        : name === graphNames.BU_PERFORMANCE ? "BU Performance" : name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {infographicName === graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES && (
                <FormControl sx={{ Width: 190, marginRight: "auto" }} size="small">
                  <Select
                    variant="outlined"
                    value={selectedStream}
                    onChange={handleChangeStream}
                    select
                    size="small"
                  >
                    <MenuItem value="none" style={{ display: "none" }} >
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
              )}
              {infographicName === graphNames.EMISSION_PERFORMANCE && (
                <div style={{ marginRight: "auto" }}>
                  <FormControl sx={{ Width: 110 }} size="small">
                    <Select
                      style={{ width: "110px", marginRight: "10px" }}
                      variant="outlined"
                      value={!selectedYear ? "none" : selectedYear}
                      select
                      MenuProps={{
                        PaperProps: {

                          style: {
                            maxHeight: 200,
                            fontSize: "12px",
                            marginTop: "10px",
                          },
                        },
                      }}
                      className={"buYearInfo"}
                      size="small"
                    >
                      <MenuItem style={{ display: "none" }} className={"buYearInfoMenu"} value={"none"}>
                        Year
                      </MenuItem>
                      {filteredYearArr.length > 0 &&
                        filteredYearArr.map((item, index) => {
                          return (
                            <MenuItem
                              value={item}
                              className={"buYearInfoMenu"}
                              key={utils.commonFunctions.keyFinder()}
                              onClick={() => handleYearChange(item, index)}
                            >
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ Width: 110 }} size="small">
                    <Select
                      style={{ width: "100px", marginRight: "10px" }}
                      variant="outlined"
                      value={!selectedMonth ? "none" : selectedMonth}
                      select
                      MenuProps={{
                        PaperProps: {

                          style: {
                            maxHeight: 200,
                            fontSize: "12px",
                            marginTop: "10px",
                          },
                        },
                      }}
                      className={"buMonthInfo"}
                      disabled={selectedYear ? false : true}
                    >
                      <MenuItem style={{ display: "none" }} value={"none"}>
                        Month
                      </MenuItem>
                      {filteredMonthArr.length > 0 &&
                        filteredMonthArr.map((item, index) => {
                          return (
                            <MenuItem
                              value={item.value}
                              key={utils.commonFunctions.keyFinder()}
                              onClick={() => handleMonthChange(item.value)}
                            >
                              {item.value}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ Width: 100 }} size="small">
                    <Select
                      variant="outlined"
                      value={!selectedWeek ? "none" : selectedWeek}
                      select
                      className={"buWeekInfo"}
                      MenuProps={{
                        PaperProps: {

                          style: {
                            maxHeight: 200,
                            fontSize: "12px",
                            marginTop: "10px",
                          },
                        },
                      }}
                      size="small"
                      disabled={selectedMonth.length ? false : true}
                    >
                      <MenuItem style={{ display: "none" }} value={"none"}>
                        Week
                      </MenuItem>
                      {filteredWeekArr.length > 0 &&
                        filteredWeekArr.map((item, index) => {
                          return (
                            <MenuItem
                              value={item}
                              key={utils.commonFunctions.keyFinder()}
                              onClick={() => handleWeekChange(item, index)}
                            >
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              )}
              {(infographicName === graphNames.RMPO_WISE_EMISSIONS || infographicName === graphNames.NON_SCM_SOURCING_VS_EMISSIONS || infographicName === graphNames.PRODUCT_TYPE_VS_EMISSIONS) && (
                <FormControl className="NSCMDROPDownFormControl" >
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    labelId="demo-simple-NSCM-label"
                    id="demo-simple-select-NSCM"
                    variant="outlined"
                    className="NSCMDROPDown"
                    // style={{ height: "20px !important", fontSize: "12px !important" }}
                    // value={}
                    defaultValue={"Purchased Goods"}
                    // label="Age"
                    // onChange={(e) => { setSelectedGraphType(e.target.value) }}
                    MenuProps={{
                      PaperProps: {
                        classes: "streamPaperNSCM",
                        sx: {
                          bgcolor: '#EBEBEB',
                          // padding: "0px",
                          minWidth: "100px",
                          marginTop: "10px",
                          '& .MuiMenuItem-root': {
                            padding: 1,
                            fontSize: "13px",
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
              )}
              {!allMetricView && (
                <div style={{ display: "flex" }} className="box_next_prev_btn">
                  <CustomButton
                    className="prev_btn"
                    onClick={onClickPrev}
                    disabled={
                      !names.findIndex((data) => data === infographicName)
                    }
                    icon={
                      <PreviousIcon
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "8px",
                        }}
                      />
                    }
                    buttonText={t("previous")}
                    buttonTextStyle={{ color: "#FAFAFA" }}
                    bgColor={"#C12325"}
                  />
                  <CustomButton
                    disabled={
                      names.findIndex((data) => data === infographicName) ===
                      names?.length - 1
                    }
                    icon={
                      <NextIcon
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "8px",
                        }}
                      />
                    }
                    onClick={onClickNext}
                    buttonText={t("next")}
                    buttonTextStyle={{ color: "#FAFAFA", marginRight: "0px" }}
                    bgColor={"#C12325"}
                  />
                </div>
              )}
            </div>
            {!allMetricView ? (
              <Box
                display="flex"
                flexDirection={"column"}
                sx={{
                  marginLeft: "5px",
                  padding: "1rem 0rem 1rem 0rem",
                  borderRadius: "7px",
                  background: "#FFFFFF",
                  border: "1px solid #D9D9D9",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                  height: "400px",
                  overflowY: "auto",
                }}
                className={`singleViewGraph ${decideClassNameAccToInfo(infographicName)
                  } `}
              >
                {
                  infographicName === graphNames.EMISSION_SCOPES &&
                  <div
                    className="region-label"
                    style={{ padding: "10px 20px" }}
                  >
                    <span
                      onClick={() => {
                        if (enabledInfoClick) {
                          if (infographicName === graphNames.EMISSION_SCOPES) {
                            setEnabledInfoClick("");
                          }
                        }
                      }}
                      style={{
                        color: "#9A9A9A",
                        fontSize: "14px",
                        cursor: enabledInfoClick ? "pointer" : "",

                      }}
                    >
                      {infographicName}
                    </span>
                    {enabledInfoClick && (
                      <span style={{ textTransform: "capitalize" }}>
                        &nbsp;/&nbsp;{enabledInfoClick}
                      </span>)}
                  </div>
                }


                {infographicName === graphNames.GHG_WISE_EMISSION && (
                  <DonutChart
                    type={"ghgEmission"}
                    ghgEmissionsArr={ghgEmissionsArr}
                    donutData={
                      ghgDonutData
                    }
                    labels={
                      ghgLabelData
                    }
                    cutout={findCutOut(window.screen.width)}
                    backgroundColor={[
                      "#004A8E",
                      "#4CC7F4",
                      "#00B3DC",
                      "#3ABFDD",
                      "#0066B9",
                      "#0077B0",
                      "#0E76A8",
                    ]}
                    loading={false}
                  />
                )}

                {infographicName === graphNames.EMISSION_TIMELINE && (
                  <EmissionTimeline single={true} />
                )}
                {infographicName === graphNames.EMISSION_SCOPES && (
                  <EmissionScopes single={true} setEnabledInfoClick={setEnabledInfoClick} enabledInfoClick={enabledInfoClick} />
                )}
                {infographicName === graphNames.EMISSION_BY_SUPPLIER && renderEmissionBySupplier()}

                {infographicName === graphNames.EMISSION_ACROSS_ACTIVITY && (
                  <div className="emission-single-scope">
                    <EmissionActivity />
                  </div>
                )}
                {infographicName === graphNames.EMISSION_ACROSS_TRANSPORTATION && (
                  <Box
                    className="emission-transportation-singleview"
                    sx={{
                      flexGrow: 1,
                      margin: "0px 40px 0px 40px",
                    }}
                  >
                    <EmissionTransportation />
                  </Box>
                )}
                {infographicName === graphNames.SALES_BY_EMISSION && (
                  <BarChart
                    type={"SalesVsEmission"}
                    single={true}
                    roundBar={false}
                    loading={false}
                  />
                )}
                {/* {
                infographicName === graphNames.EMISSION_BY_REGION && (
                  <EmissionByRegionDetailed single={true} />
                )
              } */}
                {
                  infographicName === graphNames.EMISSION_BY_COUNTRY_DETAILED && (
                    <EmissionByCountryDetailed single={true} />
                  )
                }
                {
                  infographicName === graphNames.EMISSION_BY_COUNTRY && (
                    <EmissionByCountryDetailed single={true} />
                  )
                }
                {
                  infographicName === graphNames.EMISSION_BY_REGION && (
                    <EmissionByRegionDetailed single={true} />
                  )
                }
                {
                  infographicName === graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION && renderCostFuel()
                }
                {
                  infographicName === graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES && renderTotalScope1EmissionVsCtg()
                }
                {
                  infographicName === graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES && renderTotalScope2EmissionVsCtg()
                }
                {
                  infographicName === graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES && renderTotalScope3EmissionVsCtg()
                }
                {
                  infographicName === graphNames.LANES_VS_EMISSION && renderLanesVsEmission()
                }
                {
                  infographicName === graphNames.CONTINENT_VS_EMISSION && renderContinentVsEmission()
                }
                {
                  infographicName === graphNames.PROCESS_VS_EMISSIONS && renderProcessVsEmission()
                }
                {
                  infographicName === graphNames.SUPPLIER_VS_EMISSIONS && renderSupplierVsEmission()
                }
                {
                  infographicName === graphNames.EMISSION_PERFORMANCE && renderEmissionPerformance()
                }
                {
                  infographicName === graphNames.BU_PERFORMANCE && renderBuPerformance()
                }
                {
                  infographicName === graphNames.MODES_VS_EMISSION && renderModeVsEmission()
                }
                {
                  infographicName === graphNames.UPSTREAM_NETWORKS_VS_EMISSION && renderUpstreamNetworkVsEmission()
                }
                {
                  infographicName === graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION && renderDownstreamAssetTypeVsEmission()
                }
                {
                  infographicName === graphNames.DOWNSTREAM_LESSEE_VS_EMISSION && renderDownstreamLesseeVSEmissionn()
                }
                {
                  infographicName === graphNames.UPSTREAM_ASSET_TYPE_VS_EMISSION && renderUpstreamAssetTypeVsEmission()
                }
                {
                  infographicName === graphNames.UPSTREAM_LESSOR_VS_EMISSION && renderUpstreamLessorVsEmission()
                }
                {
                  infographicName === graphNames.RMPO_WISE_EMISSIONS && renderRMPOwiseEmissions()
                }
                {
                  infographicName === graphNames.NON_SCM_SOURCING_VS_EMISSIONS && renderNonSCMSourcingVsEmissions()
                }
                {
                  infographicName === graphNames.FRANCHISE_WISE_EMISSION && renderfranchisewiseEmission()
                }
                {
                  infographicName === graphNames.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION && renderupstreamWasteManagementVsEmission()
                }
                {
                  infographicName === graphNames.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION && renderdownstreamWasteManagementVsEmission()
                }
                {
                  infographicName === graphNames.DEDICATED_VEHICLE_TYPE_VS_EMISSIONS && renderdedicatedVehicleTypeVsEmissions()
                }
                {
                  infographicName === graphNames.OUTSOURCED_VEHICLE_TYPE_VS_EMISSIONS && renderoutsourcedVehicleTypeVsEmissions()
                }
                {
                  infographicName === graphNames.WASTE_PROCESSING_COMPANIES_VS_EMISSIONS && renderwasteProcessingCompaniesVsEmissions()
                }
                {
                  infographicName === graphNames.SOLD_PRODUCTS_VS_EMISSIONS && rendersoldProductsVsEmissions()
                }
                {
                  infographicName === graphNames.REFRIGERATION_PROCESS_VS_EMISSION && renderrefrigerationProcessVsEmission()
                }
                {
                  infographicName === graphNames.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS && renderrefrigerantTypeConsumptionsVsEmissions()
                }
                {
                  infographicName === graphNames.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS && renderfuelTypeConsumptionsVsEmissions()
                }
                {
                  infographicName === graphNames.SPEND_VS_EMISSION && renderspendVsEmission()
                }
                {
                  infographicName === graphNames.BUSINESS_TRAVEL_VS_EMMISSION && renderBusinessTravelVsEmission()
                }
                {
                  infographicName === graphNames.INVESTMENT_COMPANY_BASED_EMISSION && renderinvestmentCompanyBasedEmission()
                }
                {
                  infographicName === graphNames.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSION && renderExtractionProductionTransmissionVsEmission()
                }
                {
                  infographicName === graphNames.PURCHASED_ELECTRICITY_CONSUMPTION_VS_EMISSION && renderpurchasedElectricityConsumptionVsEmission()
                }
                {
                  infographicName === graphNames.PRODUCT_TYPE_VS_EMISSIONS && renderProductTypeEmission()
                }
              </Box>
            ) : (
              <AllMetrics isDetailSingle={singleDetailed} />
            )}
          </Grid>
          {!allMetricView && (
            <Grid item md={3.5} style={{ padding: "3.5rem 3.5rem 0rem 1rem" }}>
              <Box
                display="flex"
                flexDirection={"column"}
                sx={{
                  padding: "1rem 1rem 1rem 1.5rem",
                  borderRadius: "7px",
                  background: "#FFFFFF",
                  border: "1px solid #D9D9D9",
                  fontSize: "15px",
                  fontWeight: "400",
                  lineHeight: "137%",
                  color: "#747474",
                  height: "100%",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  style={{
                    marginBottom: "2rem",
                    color: "#545454",
                    fontSize: "13.25px",
                    fontWeight: 550,
                  }}
                >
                  {t("description")}
                </Typography>
                <span style={{ fontSize: "13.25px", color: "#747474" }}>
                  {desc()}
                </span>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default SingleView;
