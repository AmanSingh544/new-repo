/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
import {
  Chart,
  ArcElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { useRequestApi } from "src/customHooks/useRequestApi";
import {
  getBuName,
  makeScopeArray,
  makeActivity,
  makeEndDate,
  makeStartDate,
  makeModes,
  makeMovementType,
  makeTag,
} from "src/utils/utilityFunction";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { CustomHtmlLegendPlugin } from "./customLegend";
import "./chart.scss";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import Loader from "src/components/loader/index";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import { colorArrayGraphs } from "src/constants/appConstants";

Chart.register(
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

function createGradient(ctx, area, type) {
  let colorStart = "#D05761";//"#28BFE6";
  let colorMid = "#B1000E";//"#1194D2";
  let colorEnd = "#B1000E";//"#1194D2";

  if (type === "lanes") {
    colorStart = "#B1000E";// "#555f63";
    colorMid = "#E8999F";//"#099ABF";
    colorEnd = "#E8999F";//"#099ABF";
  }

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.7, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}



const findByLabelText = (date) => {

  let newDate = date?.split("-");
  if (newDate.length) {
    return `${newDate[1]}M-${checkWeek(newDate[2])}W-${newDate[0].slice(2)}Y`;
  }
  return "NA";
};

const checkWeek = (weekDate) => {
  let exactWeek = "";
  if (weekDate === "01") {
    exactWeek = 1;
  } else if (weekDate === "08") {
    exactWeek = 2;
  } else if (weekDate === "15") {
    exactWeek = 3;
  } else if (weekDate === "22") {
    exactWeek = 4;
  } else if (weekDate === "29") {
    exactWeek = 5;
  }
  return exactWeek;
};



export default function BarChart(props) {
  const {
    roundBar,
    type,
    setActiveBu,
    businessUnitPerformance,
    enableTeams,
    setData,
    setEnableTeams,
    emissionState,
    setEmissionState,
    single,
    barData,
    labelsArr,
    setLabelsArr,
    barDataArr,
    setBarDataArr,
    maxEmissionBySupplier,
    loading,
    totalData,
    isWeek,
    startDate,
    endDate,
    chartViewPage,
    graphPosition,
    showgraditentBar,
    backgroundColorArr,
    subBu,
    skippedLabels,
    skippedBarArr
  } = props
  const chartRef = useRef(null);
  const { pathname } = useLocation();
  const { singleDetailed, masterEntities } =
    useSelector((state) => state.globalRed);

  const [allTeams, setAllTeams] = useState([]);

  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;
  const [bgArrRegion, setBgArrRegion] = useState([]);
  const stateFilterFunc = (state) => {
    if (isEquivalence) {
      return state.eqFilters;
    }
    else if (isDetailed) {
      return state.detailedFilters;
    }
    else {
      return state.filters;
    }
  }
  const {
    scope,
    calendar_filters,
    bu_filters,
  } = useSelector((state) => stateFilterFunc(state));

  const { modes, activity, movement } = useSelector(
    (state) => state.detailedFilters
  );
  const { request } = useRequestApi();
  const [gradient, setGradient] = useState("");
  const { t } = useTranslation();
  let labels = "";
  let data = {};

  const getOrCreateTooltip = (chart, type) => {
    let tooltipEl = document.getElementById("chartjs-tooltip-region");
    switch (type) {
      case "lanes":
        tooltipEl = document.getElementById(`chartjs-tooltip-lanes${graphPosition ? graphPosition : ""}`);
        break;
      case "ContinentEmisn":
        tooltipEl = document.getElementById(`chartjs-tooltip-ContinentEmisn${graphPosition ? graphPosition : ""}`);
        break;
      case "EmissionPerformance":
        tooltipEl = document.getElementById(`chartjs-tooltip-emission-performance${graphPosition ? graphPosition : ""}`);
        break;
      case "buPerformance":
        tooltipEl = document.getElementById(`chartjs-tooltip-bu-performance${graphPosition ? graphPosition : ""}`);
        break;
      case "WasteProcessingCompaniesVsEmission":
        tooltipEl = document.getElementById(`chartjs-tooltip-WasteProcessingCompaniesVsEmission`);
        break;
      case "SoldProductVsEmissions":
        tooltipEl = document.getElementById(`chartjs-tooltip-SoldProductVsEmissions`);
        break;
      case "totalScope3":
        tooltipEl = document.getElementById("chartjs-tooltip-totalScope3");
        break;
      case "SpendVsEmission":
        tooltipEl = document.getElementById(`chartjs-tooltip-SpendVsEmission`);
        break;
      case "FuelTypeConsumptionsVsEmissions":
        tooltipEl = document.getElementById(`chartjs-tooltip-FuelTypeConsumptionsVsEmissions`);
        break;
      case "ProductTypeVsEmission":
        tooltipEl = document.getElementById(`chartjs-tooltip-ProductTypeVsEmission`);
        break;
      case "PurchasedElectricityConsumptionVsEmission":
        tooltipEl = document.getElementById(`chartjs-tooltip-PurchasedElectricityConsumptionVsEmission`);
        break;
      case "SkippedEntriesVsErrorCode":
        tooltipEl = document.getElementById(`chartjs-tooltip-SkippedEntriesVsErrorCode`);
        break;
    }
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      let tooltipId;
      switch (type) {
        case "lanes":
          tooltipId = `chartjs-tooltip-lanes${graphPosition ? graphPosition : ""}`;
          break;
        case "ContinentEmisn":
          tooltipId = `chartjs-tooltip-ContinentEmisn${graphPosition ? graphPosition : ""}`;
          break;
        // case "buPerformance":
        //   if(businessUnitPerformance){
        //     tooltipId = `chartjs-tooltip-business-unit${graphPosition ? graphPosition : ""}`;
        //   }else{
        //     tooltipId = `chartjs-tooltip-bu-performance${graphPosition ? graphPosition : ""}`;

        //   }
        case "EmissionPerformance":
          tooltipId = `chartjs-tooltip-emission-performance${graphPosition ? graphPosition : ""}`;
          break;
        case "buPerformance":
          tooltipId = `chartjs-tooltip-bu-performance${graphPosition ? graphPosition : ""}`;
          break;
        case "WasteProcessingCompaniesVsEmission":
          tooltipId = `chartjs-tooltip-WasteProcessingCompaniesVsEmission`;
          break;
        case "SoldProductVsEmissions":
          tooltipId = `chartjs-tooltip-SoldProductVsEmissions`;
          break;
        case "totalScope3":
          tooltipId = "chartjs-tooltip-totalScope3";
          break;
        case "SpendVsEmission":
          tooltipId = "chartjs-tooltip-SpendVsEmission";
          break;
        case "FuelTypeConsumptionsVsEmissions":
          tooltipId = "chartjs-tooltip-FuelTypeConsumptionsVsEmissions"
          break;
        case "PurchasedElectricityConsumptionVsEmission":
          tooltipId = "chartjs-tooltip-PurchasedElectricityConsumptionVsEmission"
          break;
        case "ProductTypeVsEmission":
          tooltipId = "chartjs-tooltip-ProductTypeVsEmission"
          break;
        case "SkippedEntriesVsErrorCode":
          tooltipId = "chartjs-tooltip-SkippedEntriesVsErrorCode";
          break;
        default:
          tooltipId = "chartjs-tooltip-region";
          break;
      }
      tooltipEl.id = tooltipId;

      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";


      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
    return tooltipEl;
  };

  const externalTooltipHandler = (
    context,
    type,
    emissionState,
    businessUnitPerformance,
    isWeek,
    startDate,
    endDate,
    masterEntities
  ) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart, type);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);
      let innerHtml = "";
      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      bodyLines.forEach((body, i) => {
        let style = "background: #FFFFFF";
        let style2 = "padding: 0px;";
        style2 += "; font-size: 13px";
        style2 += "; margin-left: 20px";
        style2 += "; color: #000000";
        style += "; border-width: 1px";
        style += "; font-size: 13px";
        style += "; font-weight: 600";
        style += "; color: #000000";
        style += (type === "lanes" || type === "ContinentEmisn" || type === "EmissionPerformance" || type === "buPerformance" || type === "PurchasedElectricityConsumptionVsEmission" || type === "FuelTypeConsumptionsVsEmissions" || type === "totalScope3" || type === "WasteProcessingCompaniesVsEmission" || type === "SoldProductVsEmissions" || type === "ProductTypeVsEmission" || type === "SpendVsEmission" || type === "SkippedEntriesVsErrorCode") ? "; padding: 8px 15px" : "; padding: 8px 20px"; style += "; border-top-left-radius: 5px";
        style += "; border-top-right-radius: 5px";
        let span = "";

        switch (type) {

          case "region":
            {
              if (emissionState) {
                const indexRegion = tooltip.dataPoints[0]["dataIndex"];
                const data = tooltip.dataPoints[0]["dataset"]["barData"][indexRegion];
                if (data) {
                  if (emissionState.bu) {
                    span =
                      '<div style="box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
                      style +
                      '">' +
                      tooltip.dataPoints[0]["label"] +
                      "</span>" +
                      "</div>" +
                      '<hr color="#BBBBBB" style="width:85%; margin: 0px auto"></hr>' +
                      '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                      '<div style= " ' +
                      style2 +
                      '"><div style="padding: 5px 15px 5px 0px">Teams - <span style="font-weight: 600";>' +
                      data["team_count"] +
                      '</span></div><div style="padding: 0px 15px 5px 0px">Total Emissions - <span style="font-size: 12px;font-weight: 600">' +
                      data["emissions"] +
                      "KTCO<sub>2</sub>e</span></div>" +
                      "</div></div></div>";
                  } else if (emissionState.team) {
                    span =
                      '<div style="box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
                      style +
                      '">' +
                      tooltip.dataPoints[0]["label"] +
                      "</span>" +
                      "</div>" +
                      '<hr color="#BBBBBB" style="width:85%; margin: 0px auto"></hr>' +
                      '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                      '<div style= " ' +
                      style2 +
                      '"><div style="padding: 5px 15px 5px 0px">Total Emissions - <span style="font-size: 12px;font-weight: 600">' +
                      data["emissions"] +
                      "KTCO<sub>2</sub>e</span></div>" +
                      "</div></div></div>";
                  }
                }
              }
            }
            break;

          case "totalScope3":
            {
              let getEntityName = ""
              if (masterEntities) {
                const mapped = masterEntities.filter(data => data.scope === 3)
                const entity = Number(tooltip.dataPoints[0]["label"].replace("S3.", ""))
                const filteredEntity = mapped.filter(data => data.entity === entity)
                if (filteredEntity.length) {
                  getEntityName = filteredEntity[0].name
                }
              }
              span =
                '<div style="width: 360px; height:80px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;font-family: Inter;' +
                style +
                '">' +
                tooltip.dataPoints[0]["label"] + " (" + getEntityName + ")" +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                '<div style= " ' +
                style2 +
                '"><div style="font-family: Inter;">Actual CO<sub>2</sub>e (in KT)- <span style="font-weight: 600">' +
                tooltip?.dataPoints[0]?.dataset?.data[
                tooltip?.dataPoints[0]?.dataIndex
                ] +
                '</span></div><div style="font-family: Inter;">% Total Actual Emission -  <span style="font-weight: 600">' +
                Number(tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.percent).toFixed(2) +
                "%</span></div>" +
                "</div></div></div>";
            }
            break;

          case "lanes":
            {
              const consignerCountry =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.source_country === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.source_country;

              const consigneeCountry =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.destination_country === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.destination_country;
              const firstMode =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.sub_activity === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.sub_activity;
              const BaseLine =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.emission === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.emission;

              const consignerBuName =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.bu_name === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.bu_name;
              span =
                '<div style="min-width: 285px; height:190px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:140px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-family: Inter;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Baseline CO<sub>2</sub>e(in KT)" +
                '</div><div  style = "width:130px;padding-right:10px; display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                BaseLine +
                " </span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;font-family: Inter;' +
                '">' +
                // "% Total Actual Emission" +
                "Consigner BU" +
                '</div><div  style = "width:130px;display:flex" > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // "42.6%" +
                consignerBuName +
                "</div> </div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                // "Week - Month - Year" +
                "First Mode" +
                '</div><div  style = "width:130px;padding-right:10px;display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;word-wrap: break-word;'>" +
                // "W1 - M3 - Y23" +
                firstMode +
                "</div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                // "Start Date" +
                "Consigner Country" +
                '</div><div  style = "width:130px;padding-right:10px;display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;word-wrap: break-word;'>" +
                // "27-02-2023" +
                consignerCountry +
                "</div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                // "End Date" +
                "Consignee Country" +
                '</div><div  style = "width:130px;padding-right:10px;display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;word-wrap: break-word;'>" +
                // "03-03-2023" +
                consigneeCountry +
                "</div></div></div>" +
                "</div>";
            }
            break;

          case "ContinentEmisn":
            {
              const Title =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.title === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.title;

              const ConsignerContinent =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.source_continent === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.source_continent;

              const ConsigneeContinent =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.destination_continent === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.destination_continent;
              const Emission =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.emission === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.emission;
              const PercentTotalEmisn =
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.emission_percentage === null
                  ? "NA"
                  : tooltip?.dataPoints[0]?.dataset?.dataApi[
                    tooltip?.dataPoints[0]?.dataIndex
                  ]?.emission_percentage;
              span =
                '<div style="min-width: 285px; height:190px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                '<span style="font-size:14px">' +
                Title +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:140px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-family: Inter;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Consigner Continent" +
                '</div><div  style = "width:130px;padding-right:10px; display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                ConsignerContinent +
                " </span></div></div></div>" +

                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;font-family: Inter;' +
                '">' +
                "Consignee Continent" +
                '</div><div  style = "width:130px;display:flex" > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                ConsigneeContinent +
                "</div> </div></div>" +

                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Emission" +
                '</div><div  style = "width:130px;padding-right:10px;display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;word-wrap: break-word;'>" +
                Emission +
                "</div></div></div>" +

                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% of Total Emission" +
                '</div><div  style = "width:130px;padding-right:10px;display:flex;word-wrap: break-word;"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;word-wrap: break-word;'>" +
                PercentTotalEmisn +
                "</div></div></div>" +
                "</div>";
            }
            break;
          case "buPerformance":
            {
              span =
                '<div style="width: 255px; height:100%; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Baseline Emission (in KTCO<sub>2</sub>e)</span>" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                tooltip?.dataPoints[0]?.dataset?.data[
                tooltip?.dataPoints[0]?.dataIndex
                ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% Total Actual Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.emission_percentage +
                "%"
                +
                "</div>";
            }
            break;

          case "EmissionPerformance":
            {
              const start_date = isWeek ? startDate : "NA";
              const dataIndex = tooltip?.dataPoints[0].dataIndex
              const end_date = isWeek ? endDate : "NA";
              const yearMonthWeek = isWeek
                ? findByLabelText(start_date)
                : // tooltip?.dataPoints[0]?.dataset?.dataApi[
                //   tooltip?.dataPoints[0]?.dataIndex
                // ]?.emission_percentage
                "NA";
              span =
                '<div style="width: 255px; height:100%; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Baseline CO<sub>2</sub>e(in KT)</span>" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                tooltip?.dataPoints[0]?.dataset?.data[
                tooltip?.dataPoints[0]?.dataIndex
                ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% Total Actual Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                tooltip?.dataPoints[0]?.dataset?.dataApi[
                  tooltip?.dataPoints[0]?.dataIndex
                ]?.emission_percentage +
                "%"
                +
                // "PGTR" +
                "</div> </div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Month-Week-Year" +
                // "First Mode" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                yearMonthWeek + //"W1 - M3 - Y23" +
                // "Ocean" +
                "</div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Start Date" +
                // "Consigner Country" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                start_date + //"27-02-2023" +
                // "South Korea" +
                "</div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "End Date" +
                // "Consignee Country" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                end_date + //"03-03-2023" +
                // "Argentina" +
                "</div></div></div>"
                +
                "</div>";
            }
            break;
          // case "buPerformance":
          //   {
          //     const start_date = isWeek ? startDate : "NA";
          //     const dataIndex = tooltip?.dataPoints[0].dataIndex
          //     const end_date = isWeek ? endDate : "NA";
          //     const yearMonthWeek = isWeek
          //       ? findByLabelText(start_date)
          //       : // tooltip?.dataPoints[0]?.dataset?.dataApi[
          //       //   tooltip?.dataPoints[0]?.dataIndex
          //       // ]?.emission_percentage
          //       "NA";
          //     span =
          //       '<div style="width: 255px; height:100%; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          //       style +
          //       '">' +
          //       // colors.backgroundColor +
          //       '<span style="font-size:14px;font-family: Inter;">' +
          //       tooltip.dataPoints[0]["label"] +
          //       // "name"+
          //       "</span>" +
          //       "</div>" +
          //       '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; border-bottom-right-radius: 5px; display:flex; ">' +
          //       '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          //       '">' +
          //       "<span>Baseline CO<sub>2</sub>e(in KT)</span>" +
          //       '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
          //       '">' +
          //       "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
          //       tooltip?.dataPoints[0]?.dataset?.data[
          //       tooltip?.dataPoints[0]?.dataIndex
          //       ] +
          //       "</span></div></div></div>" +
          //       ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          //       '">' +
          //       "% Total Actual Emission" +
          //       // "Consigner BU" +
          //       '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
          //       '">' +
          //       "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
          //       tooltip?.dataPoints[0]?.dataset?.dataApi[
          //         tooltip?.dataPoints[0]?.dataIndex
          //       ]?.emission_percentage +
          //       "%" 
          //       // +
          //       // "PGTR" +
          //       // "</div> </div></div>" +
          //       // ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          //       // '">' +
          //       // "Month-Week-Year" +
          //       // // "First Mode" +
          //       // '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
          //       // '">' +
          //       // "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
          //       // yearMonthWeek + //"W1 - M3 - Y23" +
          //       // // "Ocean" +
          //       // "</div></div></div>" +
          //       // ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          //       // '">' +
          //       // "Start Date" +
          //       // // "Consigner Country" +
          //       // '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
          //       // '">' +
          //       // "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
          //       // start_date + //"27-02-2023" +
          //       // // "South Korea" +
          //       // "</div></div></div>" +
          //       // ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          //       // '">' +
          //       // "End Date" +
          //       // // "Consignee Country" +
          //       // '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
          //       // '">' +
          //       // "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
          //       // end_date + //"03-03-2023" +
          //       // // "Argentina" +
          //       // "</div></div></div>"
          //        +
          //       "</div>";
          //   }
          //   break;

          case "WasteProcessingCompaniesVsEmission":
          case "SoldProductVsEmissions":
            {
              span =
                '<div style="width: 225px; height:120px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Actual CO<sub>2</sub>e(in KT)</span>" +
                '</div><div  style = "width:90px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                tooltip?.dataPoints[0]?.dataset?.data[
                tooltip?.dataPoints[0]?.dataIndex
                ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% Total Actual Emission" +
                // "Consigner BU" +
                "</div>";
            }
            break;
          case "SpendVsEmission":
            {


              span =
                '<div style="width: 255px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height: 70px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Actual CO<sub>2</sub>e(in KT)</span>" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // tooltip?.dataPoints[0]?.dataset?.data[
                // tooltip?.dataPoints[0]?.dataIndex
                // ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% Total Actual Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:100px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // tooltip?.dataPoints[0]?.dataset?.dataApi[
                //   tooltip?.dataPoints[0]?.dataIndex
                // ]?.emission_percentage +
                "20 %" +
                // "PGTR" +
                "</div> </div></div>" +

                "</div>";
            }
            break;
          case "FuelTypeConsumptionsVsEmissions":
            {



              span =
                '<div style="width: 210px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height: 70px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Consumptions</span>" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;color: #1c1c1c;'>" +
                "1256KL" +

                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +

                "136KT CO<sub>2</sub>e" +
                // "PGTR" +
                "</div> </div></div>" +

                "</div>";
            }
            break;
          case "ProductTypeVsEmission":
            {


              span =
                '<div style="width: 210px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height: 70px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Consumptions</span>" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;color: #1c1c1c;'>" +
                "1256KL" +
                // tooltip?.dataPoints[0]?.dataset?.data[
                // tooltip?.dataPoints[0]?.dataIndex
                // ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // tooltip?.dataPoints[0]?.dataset?.dataApi[
                //   tooltip?.dataPoints[0]?.dataIndex
                // ]?.emission_percentage +
                "136KT CO<sub>2</sub>e" +
                // "PGTR" +
                "</div> </div></div>" +

                "</div>";
            }
            break;
          case "PurchasedElectricityConsumptionVsEmission":
            {



              span =
                '<div style="width: 250px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height: 70px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Actual CO<sub>2</sub>e(in KT)</span>" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;color: #1c1c1c;'>" +
                "1256" +
                // tooltip?.dataPoints[0]?.dataset?.data[
                // tooltip?.dataPoints[0]?.dataIndex
                // ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "% Total Actual Emission" +
                // "Consigner BU" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // tooltip?.dataPoints[0]?.dataset?.dataApi[
                //   tooltip?.dataPoints[0]?.dataIndex
                // ]?.emission_percentage +
                "136%" +
                // "PGTR" +
                "</div> </div></div>" +

                "</div>";
            }
            break;
          case "SkippedEntriesVsErrorCode":
            {
              span =
                '<div style="width: 250px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
                style +
                '">' +
                // colors.backgroundColor +
                '<span style="font-size:14px;font-family: Inter;">' +
                tooltip.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height: 70px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "<span>Skipped Entries</span>" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;color: #1c1c1c;'>" +
                // tooltip?.dataPoints[0]?.dataset?.data[
                // tooltip?.dataPoints[0]?.dataIndex
                // ] +
                "</span></div></div></div>" +
                ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 11px; font-family: Inter; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Error Code" +
                // "Consigner BU" +
                '</div><div  style = "width:110px;display:flex;justify-content:flext-start;align-items:center" > <div style="font-weight:600;  padding-left:10px; font-size: 11px;display:flex; align-items:center; color:#1C1C1C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                // tooltip?.dataPoints[0]?.dataset?.dataApi[
                //   tooltip?.dataPoints[0]?.dataIndex
                // ]?.emission_percentage +
                // "PGTR" +
                "</div> </div></div>" +
                "</div>";
            }

        }
        // console.log("TOOLTIP", tooltip.dataPoints[0]?.dataset?.dataApi);
        innerHtml += "<tr><td style='white-space: nowrap;'>" + span + "</td></tr>";
      });

      const tableRoot = tooltipEl.querySelector("table");
      tableRoot.innerHTML = innerHtml;
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    let offsetSimulator = 0
    let offsetLane = 0
    if (type === "lanes") {

      if (tooltip.caretX > 300 && tooltip.caretX < 400) {
        offsetLane = -100
      }

    }
    if (type === "ContinentEmisn") {

      if (tooltip.caretX > 300 && tooltip.caretX < 400) {
        offsetLane = -100
      }

    }
    if (type === "SkippedEntriesVsErrorCode" && chartViewPage === "simulator") {
      if (tooltip.caretX > 300 && tooltip.caretX < 400) {
        offsetSimulator = -150
      }
      else if (tooltip.caretX > 100 && tooltip.caretX < 200) {
        offsetSimulator = 50
      }
      else if (tooltip.caretX > 200 && tooltip.caretX < 250) {
        offsetSimulator = -20
      }
      else if (tooltip.caretX > 250 && tooltip.caretX < 300) {
        offsetSimulator = -50
      }
      else if (tooltip.caretX > 400 && tooltip.caretX < 450) {
        offsetSimulator = -220
      }
    }
    if ((type === "buPerformance" || type === "EmissionPerformance" ) && chartViewPage === "simulator") {      if (tooltip.caretX > 300 && tooltip.caretX < 400) {
        offsetSimulator = -150
      }
      else if (tooltip.caretX > 100 && tooltip.caretX < 200) {
        offsetSimulator = 50
      }
      else if (tooltip.caretX > 200 && tooltip.caretX < 250) {
        offsetSimulator = -20
      }
      else if (tooltip.caretX > 250 && tooltip.caretX < 300) {
        offsetSimulator = -50
      }
      else if (tooltip.caretX > 400 && tooltip.caretX < 450) {
        offsetSimulator = -220
      }
    }
    if (type === "lanes" && chartViewPage === "simulator") {
      if (tooltip.caretX > 300 && tooltip.caretX < 350) {
        offsetSimulator = -60
      }
      if (tooltip.caretX > 350 && tooltip.caretX < 400) {
        offsetSimulator = -100
      }
      else if (tooltip.caretX > 200 && tooltip.caretX < 300) {
        offsetSimulator = -80
      }
      else if (tooltip.caretX > 100 && tooltip.caretX < 150) {
        offsetSimulator = 40
      }
      else if (tooltip.caretX > 400 && tooltip.caretX < 500) {
        offsetSimulator = -270
      }
    }

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + offsetLane + offsetSimulator + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip?.options?.bodyFont?.string;
    tooltipEl.style.padding = tooltip?.options?.padding + "px " + tooltip?.options?.padding + "px";
    // console.log('top===',positionY + tooltip.caretY,'(',positionY ,'- ', tooltip.caretY,);
    // console.log('left===',positionX +tooltip.caretX + offsetLane + offsetSimulator,'(',tooltip.caretX ,'-' ,offsetLane ,'-', offsetSimulator);
  };

  useEffect(() => {
    const chart = chartRef?.current;
    if (chart) {
      setGradient(createGradient(chart.ctx, chart.chartArea, type));
    }
  }, []);

  const bgArrPushFunc = (percent, bgArr) => {
    switch (true) {
      case percent <= 15:
        bgArr.push("#02CFE5");
        break;
      case percent >= 16 && percent <= 30:
        bgArr.push("#00B3C7");
        break;
      case percent >= 31 && percent <= 45:
        bgArr.push("#0385AE");
        break;
      case percent >= 46 && percent <= 60:
        bgArr.push("#0374AE");
        break;
      case percent >= 61 && percent <= 75:
        bgArr.push("#00558E");
        break;
      case percent >= 76 && percent <= 90:
        bgArr.push("#004F87");
        break;
      case percent >= 91 && percent <= 100:
        bgArr.push("#00406C");
        break;
    }
  }

  useEffect(() => {
    let bgArr = [];
    if (type === "region") {
      if (barDataArr) {
        if (barDataArr.length) {
          const totalEmissions = barDataArr.reduce(function (acc, obj) {
            return acc + parseFloat(obj);
          }, 0);

          const barDataPercent = barDataArr.map(
            (data) => (data / totalEmissions) * 100
          );
          for (let percent of barDataPercent) {
            bgArrPushFunc(percent, bgArr);
          }
          setBgArrRegion(bgArr);
        }
      }
    }
  }, [barDataArr, type]);

  const findOffset = (position) => {
    if (position < 100) {
      return 110;
    }
    else if (position > 100 && position < 200) {
      return 80;
    }
    else if (position > 200 && position < 300) {
      return -25;
    }
    else if (position > 300 && position < 400) {
      return -120;
    }
    else {
      return -170;
    }
  }

  Tooltip.positioners.average = function (elements, position) {
    if (!elements.length) {
      return false;
    }
    let offset = 0;
    let offsetY = 10;
    if (type === "lanes" || type === "ContinentEmisn" || type === "EmissionPerformance" || type === "buPerformance" || type === "SkippedEntriesVsErrorCode") {      if (position.x < 285) {
        offset = 150;
      } else {
        offset = -150;
      }
    }
    else if (type === "totalScope3") {
      offset = findOffset(position.x);
    }
    else {
      if (position.x < 180) {
        offset = 60;
      } else {
        offset = -60;
      }
    }
    return {
      x: position.x + offset,
      y: offsetY,
    };
  };

  const calculateMaxArr = () => {
    let maxEmssionInChartArr = [];
    barDataArr?.length > 0 &&
      barDataArr?.map(() => {
        maxEmssionInChartArr.push(maxEmissionBySupplier);
      });
    return maxEmssionInChartArr;
  };

  const isEmissionSubBu = ["DownStreamLesseeVsEmission", "DownStreamAssetTypeVsEmission", "UpStreamAssetTypeVsEmission", "UpStreamLessorVsEmission", "rmpo", "NonSCM"].includes(subBu);

  const barThicknessFunc = (subBu) => {
    if (subBu === "UpStreamAssetTypeVsEmission" || subBu === "UpStreamLessorVsEmission") {
      return 42;
    }
    else if (subBu === "rmpo" || subBu === "NonSCM") {
      return 20;
    }
    else {
      return 15;
    }
  }
  const buPerformanceFunc = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: isEmissionSubBu ? backgroundColorArr : colorArrayGraphs,
            barThickness: barThicknessFunc(subBu),
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }

  const EmissionPerformanceFunc = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: isEmissionSubBu ? backgroundColorArr : colorArrayGraphs,
            barThickness: barThicknessFunc(subBu),
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }

  const totalScopeFunc = () => {
    {
      let barLength = barDataArr.length;
      let labelsArrs = labelsArr.slice(0, barLength);

      data = {
        labels:
          labelsArrs ??
          [
            "S3.1",
            "S3.2",
            "S3.3",
            "S3.4",
            "S3.5",
            "S3.6",
            "S3.7",
            "S3.8",
          ],
        datasets: [
          {
            label: "Product A",
            dataApi: totalData,
            backgroundColor: colorArrayGraphs,
            barThickness: 15,
            data:
              barDataArr ??
              [50, 400, 175, 250, 400, 300, 230, 230],
          },
        ],
      };
    }
  }

  const supplierVsEmissionFunc = () => {
    {
      labels = labelsArr ?? [
        t("Supplier-1"),
        t("Supplier-2"),
        t("Supplier-3"),
        t("Supplier-4"),
        t("Supplier-5"),
        t("Supplier-6"),
        t("Supplier-7"),
      ];
      data = {
        labels,
        datasets: [
          {
            label: t("actualCoe"),
            data: barDataArr ?? [480, 650, 320, 250, 80, 150, 800],
            backgroundColor: colorArrayGraphs,
            barThickness: 18,
          },
        ],
      };
    }
  }

  const processVsEmissionFunc = () => {
    {
      data = {
        labels: labelsArr ?? [
          "P-1",
          "P-2",
          "P-3",
          "P-4",
          "P-5",
          "P-6",
          "P-7",
          "P-8",
          "P-9",
          "P-10",
        ],
        datasets: [
          {
            label: "Product A",
            backgroundColor: colorArrayGraphs,
            barThickness: 18,
            data: barDataArr ?? [
              50, 400, 175, 250, 400, 300, 230, 230, 50, 350,
            ],
          },
        ],
      };
    }
  }
  const wasteProcessingCompaniesVsEmissionFunc = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      let colorArr = [];
      for (let i = 0; i < barDataArr.length; i++) {
        colorArr.push(`#0a9cc${i}`);
      }
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: backgroundColorArr,
            barThickness: 20,
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }

  const soldProductVsEmissions = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      let colorArr = [];
      for (let i = 0; i < barDataArr.length; i++) {
        colorArr.push(`#0a9cc${i}`);
      }
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: backgroundColorArr,
            barThickness: 20,
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }
  const spendVsEmissionFunc = () => {
    {
      data = {
        labels: labelsArr ? labelsArr : [
          "Refrigerant",
          "Electricity",
          "Sourcing PG",
          "Capital Goods",
          "Transportation",

        ],

        datasets: barDataArr ? barDataArr : [
          {
            label: "Dataset 1",
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: "#0A9CC2",
            borderColor: "#0A9CC2",
            barThickness: 20,
            borderWidth: 1,
          },
          {
            label: "Dataset 2",
            data: [20, 30, 40, 50, 60, 70],
            backgroundColor: "#555f63",
            borderColor: "#555f63",
            barThickness: 20,
            borderWidth: 1,
          },]
      };
    }
  }
  const FuelTypeConsumptionsVsEmissionsFunc = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: backgroundColorArr,
            barThickness: 40,
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }
  const ProductTypeVsEmissionFunc = () => {
    {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      data = {
        labels: labelsArr ?? labels,
        datasets: [
          {
            label: t("actualCoe"),
            dataApi: totalData,
            data: barDataArr ?? [650, 880, 320, 250, 80],
            backgroundColor: "#005876",
            barThickness: 20,
            barPercentage: 0.5,
            categoryPercentage: 1,
          },
        ],
      };
    }
  }
  const PurchasedElectricityConsumptionVsEmissionFunc = () => {
    {
      labels = [t("aug"), t("sep"), t("oct")];
      data = {
        labels,
        datasets:
          [
            {
              label: "Electricity Consumption",
              data: [5, 5, 5],
              backgroundColor: "#b1000e",
              barThickness: 15,
            },
            {
              label: "Emission",
              data: [11, 11, 11],
              backgroundColor: "#555f63",
              barThickness: 15,
            },
          ],
      };
    }
  }
  const SkippedEntriesVsErrorCodeFunc = () => {
    labels = skippedLabels;
    data = {
      labels: skippedLabels,
      datasets: [
        {
          label: "",
          data: skippedBarArr,
          barThickness: 30,
          backgroundColor: "#19A6DE",
        }
      ]
    }
  }

  const defaultFunc = () => {
    labels = [t("aug"), t("sep"), t("oct")];
    data = {
      labels,
      datasets:
        [
          {
            label: t("targetCoe"),
            data: [5, 5, 5],
            backgroundColor: "#00183F",
            barThickness: 15,
          },
          {
            label: t("actualCoe"),
            data: [11, 11, 11],
            backgroundColor: "#003E75",
            barThickness: 15,
          },
          {
            label: t("salesTarget"),
            data: [9, 9, 9],
            backgroundColor: "#00B1B5",
            barThickness: 15,
          },
          {
            label: t("salesActual"),
            data: [6, 6, 6],
            backgroundColor: "#0085A3",
            barThickness: 15,
          },
        ],
    };
  }

  const supplierFunc = () => {
    {
      labels = labelsArr ??
        [
          "S - 1",
          "S - 2",
          "S - 3",
          "S - 4",
          "S - 5",
          "S - 6",
          "S - 7",
          "S - 8",
          "S - 9",
        ];
      data = {
        labels,
        datasets: [
          {
            label: t("targetCoe"),
            data: calculateMaxArr() ??
              [
                400, 400, 400, 400, 400, 400, 400, 400, 400,
              ],
            backgroundColor: colorArrayGraphs,
            categoryPercentage: 0.3,
            barPercentage: 0.5,
            borderRadius: 50,
            borderSkipped: false,
            order: 1,
          },
          {
            label: t("actualCoe"),
            data: barDataArr ?? [310, 100, 110, 250, 280, 100, 380, 200, 220],
            backgroundColor: gradient,
            barPercentage: 0.5,
            categoryPercentage: 0.3,
            borderSkipped: false,
            borderRadius: 50,
            order: 0,
          },
        ],
      }
    }
  }

  const regionFunc = () => {
    {
      labels = labelsArr ?? [
        "S - 1",
        "S - 2",
        "S - 3",
        "S - 4",
        "S - 5",
        "S - 6",
        "S - 7",
        "S - 8",
        "S - 9",
      ];

      data = {
        labels,
        datasets: [
          {
            label: "Target Emissions",
            barData: barData ?? [],
            data: calculateMaxArr ?? [
              400, 400, 400, 400, 400, 400, 400, 400, 400,
            ],
            backgroundColor: "#E6EFF1",
            barThickness: 15,
            borderRadius: 50,
            borderSkipped: false,
            order: 1,
          },
          {
            label: "Actual Emissions",
            barData: barData ?? [],
            data: barDataArr ?? [310, 100, 110, 250, 280, 100, 380, 200, 220],
            backgroundColor: bgArrRegion.length ? bgArrRegion : "#23ABA0",
            borderRadius: 50,
            barThickness: 15,
            borderSkipped: false,
            order: 0,
          },
        ],
      };
    }
  }

  const lanesFunc = () => {
    {
      labels =
        labelsArr.filter((data, key) => key < 10) ??
        [
          "S - 1",
          "S - 2",
          "S - 3",
          "S - 4",
          "S - 5",
          "S - 6",
          "S - 7",
          "S - 8",
          "S - 9",
        ];
      data = {
        labels,
        datasets: [
          {
            label: "Lanes",
            dataApi: totalData,
            data:
              barDataArr.filter((data, key) => key < 10) ??
              [310, 100, 110, 250, 280, 100, 380, 200, 220],
            backgroundColor: showgraditentBar ? backgroundColorArr : gradient,
            barThickness: 12,
            barPercentage: 0.5,
            categoryPercentage: 0.25,
            borderSkipped: false,
            borderRadius: 50,
            order: 0,
          },
        ],
      };
    }
  }

  const ContinentEmisnFunc = () => {
    {
      labels =
        labelsArr.filter((data, key) => key < 10) ??
        [
          "S - 1",
          "S - 2",
          "S - 3",
          "S - 4",
          "S - 5",
          "S - 6",
          "S - 7",
          "S - 8",
          "S - 9",
        ];
      data = {
        labels,
        datasets: [
          {
            label: "Continents",
            dataApi: totalData,
            data:
              barDataArr.filter((data, key) => key < 10) ??
              [310, 100, 110, 250, 280, 100, 380, 200, 220],
            backgroundColor: showgraditentBar ? backgroundColorArr : gradient,
            barThickness: 12,
            barPercentage: 0.5,
            categoryPercentage: 0.25,
            borderSkipped: false,
            borderRadius: 50,
            order: 0,
          },
        ],
      };
    }
  }

  if (!roundBar) {
    switch (type) {
      case "buPerformance":
        buPerformanceFunc();
        break;
      case "EmissionPerformance":
          EmissionPerformanceFunc();
          break;
      case "totalScope3":
        totalScopeFunc();
        break;

      case "supplierVsEmission":
        supplierVsEmissionFunc();
        break;

      case "processVsEmission":
        processVsEmissionFunc();
        break;

      case "SoldProductVsEmissions":
        soldProductVsEmissions();
        break;
      case "WasteProcessingCompaniesVsEmission":
        wasteProcessingCompaniesVsEmissionFunc()
        break;
      case "SpendVsEmission":
        spendVsEmissionFunc()
        break
      case "FuelTypeConsumptionsVsEmissions":
        FuelTypeConsumptionsVsEmissionsFunc()
        break;
      case "ProductTypeVsEmission":
        ProductTypeVsEmissionFunc()
        break;
      case "PurchasedElectricityConsumptionVsEmission":
        PurchasedElectricityConsumptionVsEmissionFunc()
        break;
      case "SkippedEntriesVsErrorCode":
        SkippedEntriesVsErrorCodeFunc()
        break;
      default:
        defaultFunc();
        break;
    }
  }
  else {
    switch (type) {
      case "supplier":
        supplierFunc();
        break;

      case "region":
        regionFunc();
        break;

      case "lanes":
        lanesFunc();
        break;
      case "ContinentEmisn":
        ContinentEmisnFunc();
        break;
    }
  }
  const regionContainer = document.querySelector(
    ".bar-chart-container-emission"
  );

  const getTeamName = (id) => {
    const filteredTeam = allTeams.filter((data) => data.id === id);
    return filteredTeam[0]["name"];
  };

  const makeTeamLabelArr = (arr) => {
    let labelArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        labelArr.push(getTeamName(item.team_id));
      });
    setLabelsArr(labelArr);
  };

  const makeTeamDataArr = (arr) => {
    let barDataArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        barDataArr.push(Number(parseFloat(item.emissions)).toFixed(2));
      });
    setBarDataArr(barDataArr);
  };

  const handleGetTeamsSuccess = (response) => {
    setData(response.data.result.data);
    makeTeamLabelArr(response.data.result.data);
    makeTeamDataArr(response.data.result.data);
  };

  const handleGetTeamsError = (error) => {
    console.log("ERROR TEAMS", error);
  };

  const getTenantId = () => {
    if (localStorage.getItem("user")) {
      const { tenant_id } = JSON.parse(localStorage.getItem("user"));
      return tenant_id;
    }
    return "";
  };

  const getTeams = async (buId, regionId, country) => {
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

    if (isDetailed) {
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
    Apicalls.getApiCall(
      constants.endPoints.emissionRegion,
      {
        region: JSON.stringify([regionId]),
        rc: JSON.stringify([country.toLowerCase()]),
        bu: JSON.stringify([buId]),
        ...params,
      },
      "",
      handleGetTeamsSuccess,
      handleGetTeamsError
    );
  };

  const getAllTeams = async () => {
    const response = await request(
      constants.apiConstants.METHOD_GET,
      constants.endPoints.allTeamsWithoutBu(getTenantId()),
      null
    );

    if (response && response.status === 200) {
      if (response.data && response.data.length) {
        setAllTeams(response.data);
      }
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    if (type === "region") {
      if (!single) {
        if (data?.labels?.length > 5) {
          if (regionContainer) {
            if (window.screen.width > 1600) {
              regionContainer.style.width = "700px";
            } else {
              regionContainer.style.width = "600px";
            }
          }
        }
      } else {
        document.querySelector(".singleViewGraph").style.height = "75vh";
        document.querySelector(".bar-chart-container.region").style.maxWidth =
          "100%";
      }
    } else if (type === "lanes") {
      const lanesContainer = document.querySelector(
        ".bar-chart-container.lanes"
      );

      const laneContainer = document.querySelector(
        ".bar-chart-container-emission.lanes"
      );
      if (data?.labels?.length > 5) {
        if (laneContainer) {
          if (lanesContainer) {
            lanesContainer.style.margin = "15px auto";
          }
          laneContainer.style.width = "100%";
        }
      } else {
        if (laneContainer) {
          laneContainer.style.width = "550px";
        }
      }
    }
    else if (type === "ContinentEmisn") {
      const continentsContainer = document.querySelector(
        ".bar-chart-container.ContinentEmisn"
      );

      const continentContainer = document.querySelector(
        ".bar-chart-container-emission.ContinentEmisn"
      );
      if (data?.labels?.length > 5) {
        if (continentContainer) {
          if (continentsContainer) {
            continentsContainer.style.margin = "15px auto";
          }
          continentContainer.style.width = "100%";
        }
      } else {
        if (continentContainer) {
          continentContainer.style.width = "550px";
        }
      }
    }
  }, [
    regionContainer,
    document.querySelector(".bar-chart-container"),
    document.querySelector(".bar-chart-container-emission"),
    labelsArr,
  ]);

  const HoverXLabelPlugin = {
    id: 'hoverXLabel',
    afterEvent(chart, args) {
      const event = args.event.native;
      const xScale = chart.scales['x'];
      let hoverXLabel = false;
  
      if (event.type === 'mousemove') {
        const { offsetX, offsetY } = event;
        const xTicks = xScale.ticks;
        const labelFontSize = xScale.options.ticks.font.size;
        const labelPadding = 10;
  
        // Find the hovered tick index
        const hoveredIndex = xTicks.findIndex((tick, index) => {
          const xPos = xScale.getPixelForTick(index);
          const labelWidth = chart.ctx.measureText(tick.label).width;
          const left = xPos - labelWidth / 2 - labelPadding;
          const right = xPos + labelWidth / 2 + labelPadding;
          return offsetX >= left && offsetX <= right;
        });
  
        if (hoveredIndex !== -1) {
          const tick = xTicks[hoveredIndex];
          const xPos = xScale.getPixelForTick(hoveredIndex);
          const labelWidth = chart.ctx.measureText(tick.label).width;
          const labelHeight = labelFontSize;
          const left = xPos - labelWidth / 2 - labelPadding;
          const right = xPos + labelWidth / 2 + labelPadding;
          const top = xScale.bottom - labelHeight - labelPadding;
          const bottom = xScale.bottom + labelPadding;
  
          if (offsetY >= top && offsetY <= bottom) {
            hoverXLabel = true;
  
            // Calculate tooltip position above the X-axis label
            let tooltipX = xPos;
          //  let tooltipY = top - labelPadding - labelFontSize; // Position above the label
            let tooltipY =  labelPadding + labelFontSize-10; // Position above the label

            // console.log(xScale.bottom,'-',labelHeight,'-',labelPadding,'top =xScale.bottom - labelHeight - labelPadding=',top)
            // console.log(labelPadding,'-',labelFontSize,'tooltipY=top - labelPadding - labelFontSize; =',tooltipY)
  
            // Ensure the tooltip stays within the canvas boundaries
            const canvasWidth = chart.width;
            const tooltipWidth = chart.ctx.measureText(tick.label).width + 2 * labelPadding; // Approximating tooltip width
            const padding = 10; // Additional padding to ensure tooltip doesn't touch the canvas edge
  
            // Adjust the tooltipX if it's too close to the edges
            //if (tooltipX + tooltipWidth / 2 > canvasWidth - padding) 
              {
              tooltipX = canvasWidth - padding - tooltipWidth*5 ;
            }
            //  else if (tooltipX - tooltipWidth / 2 < padding) {
            //   tooltipX = padding + tooltipWidth * 2;
            // }
            // console.log('tooltipX = ',tooltipX,'=>','canvasWidth - padding - tooltipWidth / 2',canvasWidth,padding,tooltipWidth)

            const tooltipContext = {
              chart,
              tooltip: {
                opacity: 1,
                xAlign: 'center',
                yAlign: 'bottom',
                caretX: tooltipX,
                caretY: tooltipY,
                title: [tick.label],
                body: [{ lines: [`Label: ${tick.label}`] }],
                dataPoints: [{
                  label: tick.label,
                  dataset: chart.data.datasets[0],
                  dataIndex: hoveredIndex
                }],
                options: chart?.tooltip,
                position: { x: tooltipX, y: tooltipY }
              }
            };
            externalTooltipHandler(tooltipContext, type, emissionState, businessUnitPerformance, isWeek, startDate, endDate, masterEntities);
            return; // Exit the function to prevent hiding the tooltip
          }
        }
      }
  
      if (!hoverXLabel) {
        // Check if the event is related to a data point
        const activeElements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length === 0) {
          // Hide the tooltip if not hovering over any label or data point
          const tooltipContext = {
            chart,
            tooltip: { opacity: 0 }
          };
          externalTooltipHandler(tooltipContext, type, emissionState, businessUnitPerformance, isWeek, startDate, endDate, masterEntities);
        }
      }
    }
  };
  
  
  
  
  const showBarChart = () => {
    return (
      <div
        className={`bar-chart-container ${type
          ? type === "region" || type === "lanes" || type === "ContinentEmisn" || type === "totalScope3"
            ? type + " scrollbar-horizontal"
            : type
          : ""
          } ${single ? "single" : ""} ${(chartViewPage && chartViewPage === "simulator") ? "simulatorViewBarMain" : ""} ${subBu ? subBu : ""}`}
      >
        <div
          className={`${type === "region" || type === "lanes" || type === "ContinentEmisn" || type === "totalScope3"
            ? "bar-chart-container-emission "
            : ""}${type ? type : ""} ${(chartViewPage && chartViewPage === "simulator") ? "simulatorViewBarCont" : ""} ${subBu ? subBu : ""}`}
          style={{
            width: type === "SpendVsEmission" && (labelsArr.length > 4 && labelsArr.length < 6 ? "600px" : labelsArr.length > 6 ? "1050px" : "100%"),
            height: type === "ContinentEmisn" ? 500 : ''
          }}
        >
          <img
            src={getImageFromURL(`${IMAGES.ARROWDIRECTION}`)}
            alt={IMAGES.ARROWDIRECTION}
          />
          <Bar
            ref={chartRef}
            height={single && type !== "lanes" && type !== "ContinentEmisn" && "120px"}

            options={{
              onClick: function (evt) {
                let elements = evt.chart.getElementsAtEventForMode(
                  evt,
                  "index",
                  { intersect: true },
                  false
                );
                let index = elements[0]?.index;
                if (emissionState?.bu) {
                  const filteredBu = barData.filter(
                    (data) =>
                      getBuName(data.bu_id, bu_filters) ===
                      evt.chart.data.labels[index]
                  );


                  if (filteredBu.length) {
                    if (filteredBu[0].team_count) {
                      setActiveBu(evt.chart.data.labels[index]);
                      const { bu_id, region_id, country } = filteredBu[0];
                      getTeams(bu_id, region_id, country);
                      setEmissionState({ rc: false, bu: false, team: true });
                    }
                  }
                }
              },
              hover: {
                mode: null,
              },
              responsive: true,
              maintainAspectRatio:
                type === "buPerformance" ||
                  type === "totalScope3" ||
                  type === "supplierVsEmission" ||
                  type === "supplier" ||
                  type === "processVsEmission" ||
                  type === "lanes" ||
                  type === "ContinentEmisn" ||
                  type === "WasteProcessingCompaniesVsEmission" ||
                  type === "SoldProductVsEmissions" ||
                  type === "SpendVsEmission" ||
                  type === "FuelTypeConsumptionsVsEmissions" ||
                  type === "PurchasedElectricityConsumptionVsEmission" ||
                  type === "ProductTypeVsEmission" ||
                  type === "SkippedEntriesVsErrorCode"

                  ? false
                  : true,
              scales: {
                x: {
                  stacked: roundBar ? true : type === "SpendVsEmission" ? true : false,
                  ticks: {
                    callback: function (val, index) {
                      if (data?.labels[index]) {

                        if (type === "lanes" || type === "ContinentEmisn" || chartViewPage === "simulator") {
                          if (!showgraditentBar) {
                            const splitNames = data?.labels[index].replaceAll(
                              " ",
                              "-"
                            );
                            if (splitNames.length < 4)
                              return splitNames;
                            else if (splitNames.split("-").length > 1) {
                              if (pathname.includes("singleview")) {
                                return splitNames.slice(0, 8) + "..."
                              }
                              else {
                                return [
                                  splitNames.split("-")[0].slice(0, 4) + "...",
                                ];
                              }
                            } else {
                              return data?.labels[index];
                            }
                          }
                          else {
                            return data?.labels[index]
                          }

                        } else {
                          return data?.labels[index];
                        }
                      }
                    },
                    font: {
                      size:
                        window.screen.width > 1500
                          ? 14
                          : type === "lanes" || type === "ContinentEmisn" || type === "SpendVsEmission"
                            ? 12
                            : 11,
                      weight: "400",
                    },
                    color: type !== "lanes" || type !== "ContinentEmisn" || type !== "SpendVsEmission" ? "#3C3C3C" : "#1C1C1C",
                  },
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  stacked: type === "SpendVsEmission" ? true : false,
                  ticks: {
                    ticks: {
                      font: {
                        size: window.screen.width > 1500 ? 14 : 10.5,
                        weight: "normal",
                      },
                      color: "#3C3C3C",
                    },
                    color: "#969696",
                  },
                  title: {
                    font: {
                      size: window.screen.width > 1500 ? 14 : 12,
                      weight: "normal",
                    },
                    display: true,
                    text: "KTCO₂e",
                    color: "#969696",
                    align: "start",
                  },
                  grid: {
                    drawBorder: false,
                    display:
                      type === "region" || type === "lanes" || type === "ContinentEmisn" || type === "SpendVsEmission"
                        ? true
                        : roundBar
                          ? false
                          : true,
                    borderDash: [4, 4],
                    color: "rgba(232, 232, 232, 0.7)",
                  },
                },
              },
              plugins: {
                tooltip: {
                  position: "average",
                  enabled: false,
                  external: function (context) {
                    if (roundBar && (type === "region" || type === "lanes" || type === "ContinentEmisn")) {
                      return externalTooltipHandler(context, type, emissionState);
                    } else if (!roundBar && (type === "buPerformance" || type === "EmissionPerformance" || type === "PurchasedElectricityConsumptionVsEmission" || type === "WasteProcessingCompaniesVsEmission" || type === "SoldProductVsEmissions" || type === "SpendVsEmission" || type === "FuelTypeConsumptionsVsEmissions" || type === "ProductTypeVsEmission" || type === "SkippedEntriesVsErrorCode")) {
                      return externalTooltipHandler(
                        context,
                        type,
                        undefined,
                        businessUnitPerformance,
                        isWeek,
                        startDate,
                        endDate
                      );
                    } else if (!roundBar && type === "totalScope3") {
                      return externalTooltipHandler(context, type, "", "", "", "","", masterEntities);
                    } else {
                      return {};
                    }
                  },
                },
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
                hoverXLabel: HoverXLabelPlugin
              },
            }}
            data={data}
            plugins={ 
            [
                !roundBar && CustomHtmlLegendPlugin(false, `legend-container-bar-${type}`, false),
                HoverXLabelPlugin
            ]
          }
            />
        </div>
        {(!roundBar ||
          (type !== "supplierVsEmission" && type !== "buPerformance" && type !== "EmissionPerformance")) && (            <div id={`legend-container-bar-${type}`} className={`legend ${type}`}></div>
          )}
      </div>
    )
  }

  if (labelsArr?.length) {
    return (
      showBarChart()
    );
  } else {
    if (!loading && !labelsArr?.length) {
      return <NothingFoundView />;
    } else {
      return <Loader size={30} />;
    }
  }
}