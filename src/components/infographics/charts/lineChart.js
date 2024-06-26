import React from "react";
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
import { getImageFromURL, IMAGES } from "src/constants/images";
import "./chart.scss";
import { Line } from "react-chartjs-2";
import { CustomHtmlLegendPlugin } from "./customLegend";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Scope 1",
      data: [25, 100, 80, 300, 25, 100, 80, 300, 100, 75, 130],
      backgroundColor: "#121212",//"#00BA34",
      pointRadius: 2,
      borderColor: "#121212",//"#00BA34",
      borderWidth: 2,
    },
    {
      label: "Scope 2",
      data: [40, 250, 170, 400, 40, 250, 170, 400, 75, 110, 210],
      backgroundColor: "#e46962",//"#0094BA"
      pointRadius: 2,
      borderColor: "#e46962",//"#0094BA"
      borderWidth: 2,
    },
    {
      label: "Scope 3",
      data: [55, 300, 300, 250, 55, 300, 300, 250, 55, 95, 190],
      backgroundColor: "#b1000e",//"#00183F",
      pointRadius: 2,
      borderColor: "#b1000e",//"#00183F",
      borderWidth: 2,
    },
  ],
};

export default function LineChart({ single, chartData, chartViewPage, graphPosition }) {
  const { t } = useTranslation();
  const { calendar_filters } = useSelector((state) => state.filters);
  const [dataIndex, setDataIndexVal] = React.useState(0)
  const mappedArr = {
    labels: [],
    datasets: [],
  };

  Tooltip.positioners.nearest = function (elements, position) {
    if (!elements.length) {
      return false;
    }
    let offset = 0;
    let offsetY = 0;
    if (position.x < 200) {
      offset = 0;
    } else {
      offset = -180;
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

  function getMonthShortName(monthNo) {
    let monthShort = "";
    switch (monthNo) {
      case 1:
        monthShort = t("jan");
        break;
      case 2:
        monthShort = t("feb");
        break;
      case 3:
        monthShort = t("mar");
        break;
      case 4:
        monthShort = t("apr");
        break;
      case 5:
        monthShort = t("may");
        break;
      case 6:
        monthShort = t("jun");
        break;
      case 7:
        monthShort = t("jul");
        break;
      case 8:
        monthShort = t("aug");
        break;
      case 9:
        monthShort = t("sep");
        break;
      case 10:
        monthShort = t("oct");
        break;
      case 11:
        monthShort = t("nov");
        break;
      case 12:
        monthShort = t("dec");
        break;
      default:
        monthShort = "";
    }
    return monthShort;
  }

  chartData?.forEach((data) => {
    const mappedEmission = data?.data?.map(({ emission }) => {
      return emission;
    });

    mappedArr.datasets.push({
      label: data.label,
      data: mappedEmission,
      fill: false,
      tension: 0.1,
      borderWidth: 2,
      pointRadius: 2,
      backgroundColor:
        data.label === "Scope 1"
          ? "#121212"//"#00BA34"
          : data.label === "Scope 2"
            ? "#e46962"//"#0094BA"
            : data.label === "Scope 3"
              ? "#b1000e"//"#00183F"

              : chartViewPage==="detailRefrigerationFuel"?"#1D5E92":
              chartViewPage==="detailRefrigeration"?"#00A0CA":
              "#121212",//"#00BA34",
      borderColor:
        data.label === "Scope 1"
          ? "#121212"//"#00BA34"
          : data.label === "Scope 2"
            ? "#e46962"//"#0094BA"
            : data.label === "Scope 3"
              ? "#b1000e"//"#00183F"
              :  chartViewPage==="detailRefrigerationFuel"?"#1D5E92":
              chartViewPage==="detailRefrigeration"?"#00A0CA":
              "#121212",//"#00BA34",
    });
    data?.data?.forEach((emissionData) => {
      const { tag } =
        calendar_filters;
      if (tag === "month") {
        mappedArr.labels.push(
          getMonthShortName(emissionData.month) + " " + emissionData.year
        );
        mappedArr.labels = [...new Set(mappedArr.labels)];
      } else if (tag === "qrtr") {
        mappedArr.labels.push(
          `Q${emissionData.quarter}` + " " + emissionData.year
        );
        mappedArr.labels = [...new Set(mappedArr.labels)];
      } else if (tag === "year") {
        mappedArr.labels.push(emissionData.year);
        mappedArr.labels = [...new Set(mappedArr.labels)];
      } else {
        mappedArr.labels.push(`${getMonthShortName(emissionData.month)}` + " " + emissionData.year);
        mappedArr.labels = [...new Set(mappedArr.labels)];
      }
    });
  });

  return (
    <>
      <div className={`line-chart-container ${chartViewPage && chartViewPage === "simulator" ? "lineSimulatorMain" : chartViewPage === "detailRefrigeration" ? "detailRefrigeration" :chartViewPage === "detailRefrigerationFuel" ? "detailRefrigerationFuel": ""}`}>
        <div className={`line-chart-main ${chartViewPage && chartViewPage === "simulator" ? "lineSimulatorCont" : chartViewPage === "detailRefrigeration" ? "detailRefrigeration" :chartViewPage === "detailRefrigerationFuel" ? "detailRefrigerationFuel": ""}`} style={{ marginTop: "30px" }}>
          <img
            src={getImageFromURL(`${IMAGES.ARROWDIRECTION}`)}
            alt={IMAGES.ARROWDIRECTION}
          />
          <Line
            height={single && "100px"}
            options={{
              onHover: function (evt, chart, ele) {
                setDataIndexVal(chart[0]?.datasetIndex)
              },
              responsive: true,
              maintainAspectRatio: chartViewPage ? false : true,
              scales: {
                x: {
                  ticks: {
                    callback: function (val, index) {
                      const { tag } =
                        calendar_filters;
                      if (tag === "month" || tag === "qrtr") {
                        if (mappedArr?.labels[index]) {
                          if (
                            index === 0 ||
                            index === mappedArr?.labels.length - 1
                          ) {
                            return [
                              mappedArr?.labels[index]?.split(" ")[0],
                              mappedArr?.labels[index]?.split(" ")[1],
                            ];
                          } else {
                            return mappedArr?.labels[index]?.split(" ")[0];
                          }
                        } else {
                          return mappedArr?.labels[index];
                        }
                      } else if (tag === "year") {
                        return mappedArr?.labels[index];
                      } else {
                        return [
                          mappedArr?.labels[index]?.split(" ")[0],
                          mappedArr?.labels[index]?.split(" ")[1],
                        ];
                      }
                    },
                    font: {
                      size: window.screen.width > 1500 ? 15 : 12,
                      weight: "normal",
                    },
                  },
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: window.screen.width > 1500 ? 15 : 12,
                      weight: "normal",
                    },
                  },
                  title: {
                    display: true,
                    text: "KTCO₂e",
                    color: "#969696",
                    align: "start",
                    font: {
                      size: window.screen.width > 1500 ? 14 : 12,
                      weight: "normal",
                    },
                  },
                  grid: {
                    borderDash: [4, 4],
                    color: "rgba(232, 232, 232, 0.7)",
                    drawBorder: false,
                  },
                },
              },
              plugins: {
                htmlLegend: {
                  // ID of the container to put the legend in
                  containerID: `legend-container-line${graphPosition ? graphPosition : ""}`,
                },
                tooltip: {
                  position: "nearest",
                  enabled: (ctx) => {
                    return false;
                  },
                  mode: "index",

                  external: function (context) {
                    // Tooltip Element
                    let tooltipEl = document.getElementById(
                      "chartjs-tooltip-line"
                    );

                    // Create element on first render
                    if (!tooltipEl) {
                      tooltipEl = document.createElement("div");
                      tooltipEl.id = "chartjs-tooltip-line";
                      tooltipEl.innerHTML = "<table></table>";
                      document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    const tooltipModel = context.tooltip;
                    const dataSets = tooltipModel._tooltipItems.map(
                      (data) => data.dataset
                    );
                    if (tooltipModel.opacity === 0) {
                      tooltipEl.style.opacity = 0;
                      return;
                    }
                    // Set caret Position
                    tooltipEl.classList.remove(
                      "above",
                      "below",
                      "no-transform"
                    );
                    if (tooltipModel.yAlign) {
                      tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                      tooltipEl.classList.add("no-transform");
                    }

                    function getBody(bodyItem) {
                      return bodyItem.lines;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                      const titleLines = tooltipModel.title || [];
                      const bodyLines = tooltipModel.body.map(getBody);

                      let innerHtml = "<tbody>";

                      if (chartViewPage === "detailRefrigeration") {
                        bodyLines.forEach(function (body, i) {
                          let dataHtml = "";
                          let borderStyle = "";
                          let style =
                            "background: #FFFFFF;display: flex;  gap:13px";
                          let style2 = "padding: 2px 0px 2px 2px;";
                          style2 += "; font-size: 12px; margin-left: 20px";
                          style += "; border-width: 1px";
                          style += "; font-size: 12px";
                          style += "; font-weight: 600";
                          style += "; color: #6A6A6A";
                          style += "; padding: 5px 8px 5px 13px";
                          borderStyle =
                            i === dataSets.length - 1
                              ? "; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px"
                              : !i
                                ? ";border-top-left-radius: 8px;border-bottom-right-radius: 8px"
                                : "";
                          dataHtml +=
                            '<div style="' +
                            style +
                            borderStyle +
                            '">' +
                            '<div class="scope-container" style="display: flex;align-items: center">' +
                           
                          
                            // dataSets[dataIndex]?.backgroundColor +
                            '<span >' +
                            "Emission" +
                            "</span></div><span style='color: #1c1c1c'>" +
                            "136KT CO<sub>2</sub>e" +
                            "</span></div>";
                          const span =
                            '<div style="width: 180px;">' + dataHtml + "</div>";
  
                          innerHtml =
                            "<tr><td><div style='background: #ECECEC;box-shadow:0px 0px 10px #19315B;border-radius:8px'><p style='font-size:12px;font-weight:600;width: 100%;color:#1C1C1C;padding:8px 15px 5px 15px;border-bottom:1px solid #BBBBBB'>" +
                            titleLines[0] +
                            "</p>" +
                            span +
                            "</div></td></tr>";
                        });
                      }
                      else if (chartViewPage === "detailRefrigerationFuel"){
                        bodyLines.forEach(function (body, i) {

                          let dataHtml = "";
                          let borderStyle = "";
                          let style =
                            "background: #FFFFFF;display: flex;  gap:13px";
                          let style2 = "padding: 2px 0px 2px 2px;";
                          style2 += "; font-size: 12px";
                          style2 += "; margin-left: 20px";
                          style += "; border-width: 1px";
                          style += "; font-size: 12px";
                          style += "; font-weight: 600";
                          style += "; color: #6A6A6A";
                          style += "; padding: 5px 8px 5px 13px";
                          borderStyle =
                            i === dataSets.length - 1
                              ? "; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px"
                              : !i
                                ? ";border-top-left-radius: 8px;border-bottom-right-radius: 8px"
                                : "";
                          dataHtml +=
                            '<div style="' +
                            style +
                            borderStyle +
                            '">' +
                            '<div class="scope-container" style="display: flex;align-items: center">' +
            
            
                            // dataSets[dataIndex]?.backgroundColor +
                            '<span >' +
                            "Consumptions" +
                            "</span></div><span style='color: #1c1c1c'>" +
                            "1256KL" +
                            "</span></div>" +
                            // EMISSION
                            '<div style="' +
                            style +
                            borderStyle +
                            '">' +
                            '<div class="scope-container" style="display: flex;align-items: center">' +
            
            
                            // dataSets[dataIndex]?.backgroundColor +
                            '<span >' +
                            "Emission" +
                            "</span></div><span style='color: #1c1c1c'>" +
                            "136KT CO<sub>2</sub>e" +
                            "</span></div>";
                          const span =
                            '<div style="width: 210px;">' + dataHtml + "</div>";
            
                          innerHtml =
                            "<tr><td><div style='background: #ECECEC;box-shadow:0px 0px 10px #19315B;border-radius:8px'><p style='font-size:12px;font-weight:600;width: 100%;color:#1C1C1C;padding:8px 15px 5px 15px;border-bottom:1px solid #BBBBBB'>" +
                            `<span style= "background:#1D5E92; width:10px;" > </span>`
                            +titleLines[0] +
                            "</p>" +
                            span +
                            "</div></td></tr>";
                        });
                      }
                      else {
                        bodyLines.forEach(function (body, i) {
                          const label = dataSets[dataIndex]?.label ? dataSets[dataIndex]?.label : ""
                          const KTVal = Number(tooltipModel.dataPoints[dataIndex]?.formattedValue).toFixed(2) ? Number(tooltipModel?.dataPoints[dataIndex]?.formattedValue)?.toFixed(2) : ""
                          let dataHtml = "";
                          let borderStyle = "";
                          let style =
                            "background: #FFFFFF;display: flex;  gap:13px";
                          let style2 = "padding: 2px 0px 2px 2px;";
                          style2 += "; font-size: 12px";
                          style2 += "; margin-left: 20px";
                          style += "; border-width: 1px";
                          style += "; font-size: 12px";
                          style += "; font-weight: 600";
                          style += "; color: #6A6A6A";
                          style += "; padding: 5px 8px 5px 13px";
                          borderStyle =
                            i === dataSets.length - 1
                              ? "; border-bottom-left-radius: 8px;border-bottom-right-radius: 8px"
                              : !i
                                ? ";border-top-left-radius: 8px;border-bottom-right-radius: 8px"
                                : "";
                          dataHtml +=
                            '<div style="' +
                            style +
                            borderStyle +
                            '">' +
                            '<div class="scope-container" style="display: flex;align-items: center">' +
                            '<div class="container-tooltip" style="background: ' +
                            dataSets[dataIndex]?.backgroundColor +
                            '"><div class="circle" style="margin-top:3px;background-color: ' +
                            dataSets[dataIndex]?.backgroundColor +
                            ";border-color:" +
                            dataSets[dataIndex]?.backgroundColor +
                            '"></div></div><span style="margin-left: 10px">' +
                            label +
                            "</span></div><span style='color: #1c1c1c'>" +
                            KTVal +
                            " KT</span></div>";
                          const span =
                            '<div style="width: 230px;">' + dataHtml + "</div>";

                          innerHtml =
                            "<tr><td><div style='background: #ECECEC;box-shadow:0px 0px 10px #19315B;border-radius:8px'><p style='font-size:15px;font-weight:600;width: 100%;color:#1C1C1C;padding:8px 15px 5px 15px;border-bottom:1px solid #BBBBBB'>" +
                            titleLines[0] +
                            "</p>" +
                            span +
                            "</div></td></tr>";
                        });
                      }


                      innerHtml += "</tbody>";

                      let tableRoot = tooltipEl.querySelector("table");
                      tableRoot.innerHTML = innerHtml;
                    }

                    const position =
                      context.chart.canvas.getBoundingClientRect();
                    const bodyFont = "Inter";
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = "absolute";
                    tooltipEl.style.left =
                      position.left +
                      window.scrollX +
                      tooltipModel.caretX +
                      "px";
                    tooltipEl.style.top =
                      position.top +
                      window.scrollY +
                      tooltipModel.caretY +
                      "px";
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding =
                      tooltipModel.padding +
                      "px " +
                      tooltipModel.padding +
                      "px";
                    tooltipEl.style.pointerEvents = "none";
                  },
                },
                legend: {
                  display: false,
                },
              },
            }}
            data={mappedArr}
            plugins={[CustomHtmlLegendPlugin(true, `legend-container-line${graphPosition ? graphPosition : ""}`, false)]}
          />
        </div>
        <div id={`legend-container-line${graphPosition ? graphPosition : ""}`}></div>
      </div>
    </>
  );
}
