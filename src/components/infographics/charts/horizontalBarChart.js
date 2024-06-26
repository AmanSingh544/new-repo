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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { CustomHtmlLegendPlugin } from "./customLegend";
import "./chart.scss";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

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
  let colorStart = "#28BFE6";
  let colorMid = "#1194D2";
  let colorEnd = "#1194D2";

  if (type === "lanes") {
    colorStart = "#555f63";
    colorMid = "#099ABF";
    colorEnd = "#099ABF";
  }
  if (type === "regionTotalScope1") {
    colorStart = "#0194ba";
    colorMid = "#0194ba";
    colorEnd = "#0194ba";
  }

  if (type === "regionTotalScope2") {
    colorStart = "#18a6de";
    colorMid = "#18a6de";
    colorEnd = "#18a6de";
  }

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.7, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

const getOrCreateTooltip = (chart, type) => {
  let tooltipEl = document.getElementById("chartjs-tooltip-region");
  if (type === "lanes") {
    tooltipEl = document.getElementById("chartjs-tooltip-lanes");
  } else if (type === "buPerformance") {
    tooltipEl = document.getElementById("chartjs-tooltip-bu");
  } else if (type === "OutsourcedVehicleTypeVsEmissions") {
    tooltipEl = document.getElementById("chartjs-tooltip-OutsourcedVehicleTypeVsEmissions");
  } else if (type === "regionTotalScope1") {
    tooltipEl = document.getElementById("chartjs-tooltip-regionTotalScope1");
  } else if (type === "regionTotalScope2") {
    tooltipEl = document.getElementById("chartjs-tooltip-regionTotalScope2");
  }
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id =
      type === "lanes"
        ? "chartjs-tooltip-lanes"
        : type === "buPerformance"
          ? "chartjs-tooltip-bu"
          : type === "OutsourcedVehicleTypeVsEmissions"
            ? "chartjs-tooltip-OutsourcedVehicleTypeVsEmissions"
            :type === "regionTotalScope1"
              ? "chartjs-tooltip-regionTotalScope1"
              : type === "regionTotalScope2"
                ? "chartjs-tooltip-regionTotalScope2"
                : "chartjs-tooltip-region";
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

const externalTooltipHandler = (context, type) => {
  // Tooltip Element
  console.log(type,"chartToolTip")
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
      let style2 = "padding: 2px 0px 2px 2px;";
      style2 += "; font-size: 12px";
      style2 += "; margin-left: 20px";
      style2 += "; color: #000000";
      style += "; border-width: 1px";
      style += "; font-size: 12px";
      style += "; font-weight: 600";
      style += "; color: #000000";
      style +=
        type === "lanes"
          ? "; padding: 8px 15px"
          : type === "regionTotalScope1" || type === "regionTotalScope2"
            ? "; padding: 8px 10px"
            : "; padding: 8px 20px";
      style += "; border-top-left-radius: 5px";
      style += "; border-top-right-radius: 5px";
      let span = "";

      if (type === "regionTotalScope1") {
        span =
          '<div style="width: 185px; height:80px; box-shadow:0px 0px 2px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          style +
          '">' +
          "<span style='height: 8px;width: 8px;border-radius: 50%;margin-right:5px;background-color:" +
          "#0094ba" +
          "';></span>" +
          tooltip.dataPoints[0]["label"].split(",")[0] +
          "</span>" +
          "</div>" +
          '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
          '<div style= " ' +
          style2 +
          '"><div></div><div></div><div>Total Emissions <br><span style="font-size: 12px;font-weight: 600">' +
          tooltip.dataPoints[0].dataset.data[tooltip.dataPoints[0].dataIndex] +
          "KTCO<sub>2</sub>e</span></div>" +
          "</div></div></div>";
      } else if (type === "regionTotalScope2") {
        span =
          '<div style="width: 185px; height:80px; box-shadow:0px 0px 2px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          style +
          '">' +
          "<span style='height: 8px;width: 8px;border-radius: 50%;margin-right:5px;background-color:" +
          "#0094ba" +
          "';></span>" +
          tooltip.dataPoints[0]["label"].split(",")[0] +
          "</span>" +
          "</div>" +
          '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
          '<div style= " ' +
          style2 +
          '"><div></div><div></div><div>Total Emissions <br><span style="font-size: 12px;font-weight: 600">' +
          tooltip.dataPoints[0].dataset.data[tooltip.dataPoints[0].dataIndex] +
          "KTCO<sub>2</sub>e</span></div>" +
          "</div></div></div>";
      } else if (type === "lanes") {
        span =
          '<div style="width: 285px; height:190px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          style +
          '">' +
          '<span style="font-size:14px">' +
          tooltip.dataPoints[0]["label"] +
          "</span>" +
          "</div>" +
          '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:140px !important; border-bottom-right-radius: 5px; display:flex; ">' +
          '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Baseline CO2e(in KT)" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "952.67" +
          " KTCO<sub>2</sub>e</span></div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Consigner BU" +
          '</div><div  style = "width:120px" > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "PGTR" +
          "</div> </div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "First Mode" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "Ocean" +
          "</div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Consigner Country" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "South Korea" +
          "</div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Consignee Country" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "Argentina" +
          "</div></div></div>" +
          "</div>";
      } else if (type === "buPerformance") {
        span =
          '<div style="width: 285px; height:190px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          style +
          '">' +
          '<span style="font-size:14px">' +
          tooltip.dataPoints[0]["label"] +
          "</span>" +
          "</div>" +
          '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:140px !important; border-bottom-right-radius: 5px; display:flex; ">' +
          '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Baseline CO2e(in KT)" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "952.67" +
          " KTCO<sub>2</sub>e</span></div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "% Total Actual Emission" +
          '</div><div  style = "width:120px" > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "42.6%" +
          "</div> </div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Week - Month - Year" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "W1 - M3 - Y23" +
          "</div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Start Date" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "27-02-2023" +
          "</div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "End Date" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "03-03-2023" +
          "</div></div></div>" +
          "</div>";
      }else if (type === "OutsourcedVehicleTypeVsEmissions") {
        span =
          '<div style="width: 265px; height:110px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center;padding-left:5px; background: #DBDBDB !important;' +
          style +
          '">' +
          '<span style="font-size:14px">' +
          tooltip.dataPoints[0]["label"] +
          "</span>" +
          "</div>" +
          '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px;  border-bottom-right-radius: 5px; display:flex; ">' +
          '<div style=" width:100%; " ><div style="display:flex; justify-content: space-between; " >  <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "Actual CO2e(in KT)" +
          '</div><div  style = "width:120px"  > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "952.67" +
          " KTCO<sub>2</sub>e</span></div></div></div>" +
          ' <div style="display:flex  ; justify-content: space-between;" > <div style= "font-size: 12px; font-family: Open Sans; font-style: normal;font-weight: 400;margin: 5px;color: #333333; padding-left:10px;  display:flex; align-items:center;' +
          '">' +
          "% Total Actual Emission" +
          '</div><div  style = "width:120px" > <div style="font-weight:600;  padding-left:10px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C ' +
          '">' +
          "<span style='margin-left: 5px; margin-top: 2px'>" +
          "42.6%" +
          "</div> </div></div>" +
          
          "</div>";
      }

      innerHtml += "<tr><td>" + span + "</td></tr>";
    });

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};


export default function HorizontalBarChart({
  roundBar,
  type,
  single,
  labelsArr,
  barDataArr,
  maxEmissionBySupplier,
  loading,
  typeCss,
  types,
  bgArr
}) {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState("");
  const { t } = useTranslation();
  let labels = "";
  let data = {};

  Tooltip.positioners.nearest = function (elements, position) {
    if (!elements.length) {
      return false;
    }
    let offset = 0;
    let offsetY = 0;
    if (position.x < 400) {
      offset = 0;
    } else {
      offset = -60;
    }

    if (position.y < 100) {
      offsetY = 0
    } else {
      offsetY = -90
    }


    return {
      x: position.x + offset,
      y: position.y + offsetY
    }
  }

  useEffect(() => {
    const chart = chartRef?.current;
    if (chart) {
      setGradient(createGradient(chart.ctx, chart.chartArea, type));
    }
  }, []);

  const calculateMaxArr = () => {
    let maxEmssionInChartArr = [];
    barDataArr?.length > 0 &&
      barDataArr?.map(() => {
        maxEmssionInChartArr.push(maxEmissionBySupplier);
      });
    return maxEmssionInChartArr;
  };

  if (!roundBar) {
    if (type === "buPerformance") {
      labels = [t("BU-1"), t("BU-2"), t("BU-3"), t("BU-4"), t("BU-5")];
      data = {
        labels,
        datasets: [
          {
            label: t("actualCoe"),
            data: [650, 880, 320, 250, 80],
            backgroundColor: "#0A9CC2",
            barThickness: 15,
          },
        ],
      };
    } else if (type === "supplierVsEmission") {
      labels = [
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
            data: [480, 650, 320, 250, 80, 150, 800],
            backgroundColor: "#19BCB9",
            barThickness: 15,
          },
        ],
      };
    } else if (type === "processVsEmission") {
      data = {
        labels: [
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
            backgroundColor: [
              "#19A6DE",
              "#19A6DE",
              "#73E3FF",
              "#73E3FF",
              "#0A6DD8",
              "#73E3FF",
              "#19A6DE",
              "#73E3FF",
              "#0A6DD8",
              "#0A6DD8",
            ],
            data: [50, 400, 175, 250, 400, 300, 230, 230, 50, 350],
          },
        ],
      };
    } else {
      labels = [t("aug"), t("sep"), t("oct")];

      data = {
        labels,
        datasets: [
          {
            label: t("targetCoe"),
            data: [5, 5, 5],
            backgroundColor: "#4CC7F4",
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
  } else {
    if (type === "supplier") {
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
            label: t("targetCoe"),
            data: calculateMaxArr() ?? [
              400, 400, 400, 400, 400, 400, 400, 400, 400,
            ],
            backgroundColor: "#E6EFF1",
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
      };
    } else if (type === "regionTotalScope1") {
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
            data: barDataArr,
            backgroundColor: gradient,
            barThickness: 40,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            return "67";
          },
        },
      };
    } else if (type === "regionTotalScope2") {
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
            data: barDataArr,
            backgroundColor: "#19A6DE",
            barThickness: 40,
            // categoryPercentage: 0.5,
            // barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            return "67";
          },
        },
      };
    } else if (type === "lanes") {
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
            label: "Lanes",
            data: [310, 100, 110, 250, 280, 100, 380, 200, 220],
            backgroundColor: gradient,
            barPercentage: 0.5,
            categoryPercentage: 0.25,
            borderSkipped: false,
            borderRadius: 50,
            order: 0,
          },
        ],
      };
    }
    else if (type === "franchiseWiseEmission") {
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
            data: barDataArr,
            backgroundColor: "#64CDFE",
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            
            return "67";
          },
        },
      };
    }
    else if (type === "UpstreamWasteManagementVsEmission") {
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
            data: barDataArr,
            backgroundColor: "#b1000e",
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            
            return "67";
          },
        },
      };
    }
    else if (type === "DownstreamWasteManagementVsEmission") {
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
            data: barDataArr,
            backgroundColor: "#B1000E",//"#555f63",
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            
            return "67";
          },
        },
      };
    }
    else if (type === "InvestmentCompanybasedEmission") {
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
            data: barDataArr,
            backgroundColor: bgArr,
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            
            return "67";
          },
        },
      };
    }
    else if (type === "DedicatedVehicleTypeVsEmissions") {
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
            data: barDataArr,
            backgroundColor: "#19A6DE",
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
            
            return "67";
          },
        },
      };
    }
    else if (type === "OutsourcedVehicleTypeVsEmissions") {
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
            data: barDataArr,
            backgroundColor: "#19A6DE",
            barThickness: 17,
            categoryPercentage: 0.5,
            barPercentage: 1.0,
            borderSkipped: false,
            order: 0,
          },
        ],
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
         
            return "67";
          },
        },
      };
    }
  }
  const regionContainer = document.querySelector(
    ".bar-chart-container-emission"
  );

  useEffect(() => {
    if (type === "regionTotalScope1") {
      if (data?.labels?.length > 4) {
        if (regionContainer) {
          regionContainer.style.width = "600px";
        }
      }
    } else if (type === "regionTotalScope2") {
      //This is intentional, as per what i got in code.
    }
  }, [regionContainer, document.querySelector(".bar-chart-container.lanes")]);

  // console.log(maxEmissionBySupplier, "deatiledForScope2")
  return (
    <div
      style={{ margin: "46px!important" }}
      className={`bar-chart-container ${typeCss} scrollbar-horizontal
        } ${single ? "single" : ""}`}
    >
      <div
        className={`${type === "regionTotalScope1" ||
          type === "lanes" ||
          type === "regionTotalScope2"
          ? "bar-chart-container-emission "
          : ""
          }${type ? type : ""}`}
        style={{ height: "75%!important" }}
      >
        <img
          className="horizotalArrow"
          src={getImageFromURL(`${IMAGES.ARROWDIRECTION}`)}
          alt={IMAGES.ARROWDIRECTION}
        />
        <Bar
          ref={chartRef}
          height={single && type !== "lanes" && "120px"}
          options={{
            onClick: function (evt) {

            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                ticks: {
                  font: {
                    size:
                      window.screen.width > 1500
                        ? 14
                        : type === "lanes"
                          ? 12
                          : 11,
                    weight: "400",
                    min: 0,
                  },
                  color: type !== "lanes" ? "#3C3C3C" : "#1C1C1C",
                },
                grid: {
                  display: true,
                  drawBorder: false,
                  color: "#EDEDED",
                },
                title: {
                  font: {
                    size: window.screen.width > 1500 ? 14 : 12,
                    weight: "normal",
                  },
                  display: true,
                  text: "KTCO₂e",
                  color: "#969696",
                  align: type === "OutsourcedVehicleTypeVsEmissions" ? "end" : "start",
                },
              },
              y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                  font: {
                    size: window.screen.width > 1500 ? 14 : 11.5,
                    weight: "600",
                  },
                  color: "#000",
                },
                title: {
                  font: {
                    size: window.screen.width > 1500 ? 14 : 12,
                    weight: "normal",
                  },
                  display: true,
                  text: type === "UpstreamWasteManagementVsEmission" || type === "DownstreamWasteManagementVsEmission" ||type==="InvestmentCompanybasedEmission"|| type === "DedicatedVehicleTypeVsEmissions" || type === "OutsourcedVehicleTypeVsEmissions" ? "" : "KTCO₂e",
                  color: "#969696",
                  align: "start",
                },
                grid: {
                  drawBorder: false,
                  display: roundBar && type !== "lanes" ? false : true,
                  borderDash: [4, 4],
                  color: "rgba(232, 232, 232, 0.7)",
                },
              },
            },
            plugins: {
              datalabels: {
                align: "center",
                anchor: "center",
                color: function (context) {
                  return "#f4f4f4";
                },
                font: function (context) {
                  return {
                    size: 14,
                    weight: "bold",
                  };
                },
                formatter: function (value, context) {
                  const totalScopeData = context.dataset.data.reduce(function (
                    acc,
                    obj
                  ) {
                    return acc + parseFloat(obj);
                  },
                    0);
                  const percentMap = data.datasets[0].data.map((data) =>

                    ((parseFloat(data) / totalScopeData) * 100).toFixed(2)
                    // data
                  );
                  if (type === "franchiseWiseEmission" || type === "UpstreamWasteManagementVsEmission" || type === "DownstreamWasteManagementVsEmission" || type==="InvestmentCompanybasedEmission" || type === "DedicatedVehicleTypeVsEmissions" || type === "OutsourcedVehicleTypeVsEmissions") {
                    return "";
                  }

                  else {
                    if (parseFloat(percentMap[context.dataIndex])) {
                      return `${percentMap[context.dataIndex]}`;
                    } else {
                      return "";
                    }
                  }

                },
              },
              tooltip: {
                position: "nearest",
                enabled: false,
                external: function (context) {
                  if (
                    roundBar &&
                    (type === "region" ||
                      type === "lanes" ||
                      type === "regionTotalScope1" ||
                      type === "regionTotalScope2" 
                      || type === "OutsourcedVehicleTypeVsEmissions"
                      )
                  ) {
                    return externalTooltipHandler(context, type);
                  } else if (!roundBar && (type === "buPerformance")) {
                    return externalTooltipHandler(context, type);
                  }
                  else {
                    return {};
                  }
                },
              },

              legend: {
                display: false,
              },
              title: {
                display: true,
              },
            },
            indexAxis: "y",
          }}
          data={data}
          plugins={[
            ChartDataLabels,
            !roundBar &&
            CustomHtmlLegendPlugin(false, "legend-container-bar", false),
          ]}
        />
      </div>
      {(!roundBar ||
        type !== "supplierVsEmission" ||
        type !== "buPerformance") && <div id="legend-container-bar"></div>}
    </div>
  );
}
