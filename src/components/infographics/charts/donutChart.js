import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";
import { CustomHtmlLegendPlugin } from "./customLegend";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import utils from "src/utils";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import Loader from "src/components/loader/index";
import React from "react";
import { EmissionScopeToolTip } from "src/components/LegendTooltip/emissionScopeToolTip";
import { GhgEmissionTooltip } from "src/components/LegendTooltip/GhgEmissionTooltip";
import { EquivalanveTooltip } from "src/components/LegendTooltip/equivalanceTooltip";

Chart.register(ArcElement, Tooltip, Title, Legend);
const images = [
  "https://gist.githubusercontent.com/rohanPanwar/529d5742e57985f56eb045245006d85f/raw/31a79ef02da6be98538eb8bb68f691c5714fa1a5/donuttree.svg",
  "https://gist.githubusercontent.com/rohanPanwar/2671851ae59aa0961de4f4ff85dfb2b8/raw/166a0f1e309e46a3a3d74cf6651d6e2992cd1088/sun.svg",
  "https://gist.githubusercontent.com/rohanPanwar/bd7b45b11b1bd9cc6b2f1beb8fab1cd8/raw/0c97d178b1958ab6585ff30357df15592be886fd/bulbicon.svg",
  "https://gist.githubusercontent.com/rohanPanwar/bd7b45b11b1bd9cc6b2f1beb8fab1cd8/raw/0c97d178b1958ab6585ff30357df15592be886fd/bulbicon.svg",
].map((png) => {
  const image = new Image();
  image.src = png;
  return image;
});

const drawRing = {
  afterDatasetsDraw: (chart) => {
    let ctx = chart.ctx;
    ctx.save();
    let image = new Image();
    let imagePadding = 20;
    let imageSize = "";
    image.src =
      "https://gist.githubusercontent.com/rohanPanwar/eca9b26448cb4a5aae48de724d2592e7/raw/647a6954623f37ae27d86e13e7d8abd065de1194/ring.svg";
    imageSize = 150;
    ctx.drawImage(
      image,
      chart.width / 2 - (imageSize + imagePadding) / 2,
      chart.height / 2 - (imageSize + imagePadding) / 2,
      170,
      170
    );
    ctx.restore();
  },
};


const drawImageSlice = {
  afterDatasetsDraw: (chart) => {
    let ctx = chart.ctx;
    ctx.save();
    let xCenter = chart.canvas.width / 2;
    let yCenter = chart.canvas.height / 2;
    let data = chart.config.data.datasets[0].data;
    let vTotal = data.reduce((a, b) => a + b, 0);
    data.forEach((v, i) => {
      let vAngle = data.slice(0, i).reduce((a, b) => a + b, 0) + v / 2;
      let angle = (360 / vTotal) * vAngle - 90;
      let radians = angle * (Math.PI / 180);
      let r = yCenter;
      let x = xCenter + (Math.cos(radians) * r) / 1.2;
      let y = yCenter + (Math.sin(radians) * r) / 1.2;
      ctx.translate(x, y);
      let image = images[i];
      ctx.drawImage(image, -image.width / 2, -image.height / 2, 60, 60);
      ctx.translate(-x, -y);
    });
    ctx.restore();
  },
};



const renderColor = (i, defColor) => {
  switch (i) {
    case 0:
      return "#00A3C5";
    case 1:
      return "#0066B9";
    case 2:
      return "#004A8E";
    default:
      return defColor;
  }
};

export default function DonutChart({
  type,
  donutData,
  ghgEmissionsArr,
  labels,
  cutout,
  backgroundColor,
  setEnabledInfoClick,
  enabledInfoClick,
  emissionArr,
  sliceIcon,
  totalSavedEmission,
  loading,
}) {
  const { masterEntities } = useSelector((state) => state.globalRed);
  const { scope } = useSelector((state) => state.filters);
  let centerData = `${localStorage.getItem("totalEmissionScopes")} KT`;
  const { t } = useTranslation();
  const [hoverData, setHoverData] = React.useState()
  const [legendToolTipVisible, setLegendToolTipVisible] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  // console.log("windowas-->>", window);




  let labelsDonut = labels;
  let dataDonut = donutData;
  const totalEmission = (arr) => {
    let emission = 0;
    for (let i = 0; i < arr?.length; i++) {
      emission += parseFloat(arr[i]);
    }
    return emission.toFixed(2);
  };

  const doughnutText = (type, totalSavedEmissionValue) => {

    let objTextId = { id: "doughnutText" };
    let objTextFill = {};
    if (type === "emissionScopes") 
    {
      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;

          let x = width / 2 + 40;
          let y = height / 2 + 40 / 1.5;
          ctx.font = "10px Inter";
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#989898";
          ctx.fillText("TOTAL EMISSION", x, y);
          ctx.fillStyle = "#333333";
          ctx.font = `${centerData.length > 20 ? "bold 15px Inter" : "bold 19px Inter"}`;
          ctx.fontFamily = "Inter";
          ctx.fillText(
            `${localStorage.getItem("totalEmissionScopes")} KT`,
            x,
            y + 23
          );
          ctx.fillStyle = "#333333";
          ctx.font = "500 13px Inter";
          ctx.fillStyle = "#333333";
          ctx.fillText("CO", x, y + 40);
          ctx.font = "500 7px Inter";
          ctx.fillText("2", x + 12, y + 40);
          ctx.font = "500 13px Inter";
          ctx.fillText("e", x + 12 + 7, y + 40);
          ctx.save();
        },
      };
    } else if (type === "ghgEmission") {
      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;
          let x = width / 2 + 35;
          let y = height / 2 + 45;
          ctx.font = "bold 25px Inter";
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#555555";
          ctx.fillText("CO", x, y);
          ctx.font = "bold 14px Inter";
          ctx.fillText("2", x + 23, y);
          ctx.font = "bold 25px Inter";
          ctx.fillText("e", x + 23 + 12, y);
          ctx.save();
        },
      };
    } else if (type === "equivalence") {
      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;
          let x = width / 2 + 15;
          let y = height / 2 + 40 / 2;
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#023465";
          ctx.font = "700 18px Inter";
          ctx.fillText("Saved", x, y);
          ctx.fillStyle = "#023465";
          ctx.font = "1000 25px Inter";
          ctx.fillText(
            `${utils.commonFunctions.isNullUndefined(
              localStorage.getItem("total_saved_energy")
            )
              ? " "
              : localStorage.getItem("total_saved_energy")
            }KT`,
            x,
            y + 25
          );
          ctx.fillStyle = "#023465";
          ctx.textBaseLine = "middle";
          ctx.save();
        },
      };
    }
    else if (type === "ExtractionProductionTransmissionVsEmission") 
    {
      // console.log("vishnu",centerData);
      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;

          let x = width / 2 + 10;
          let y = height / 2 -10;
          ctx.font = "10px Inter";
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#989898";
          // ctx.fillText("TOTAL EMISSION", x, y);
          ctx.fillStyle = "#4F4F4F";
          ctx.font = `${centerData.length > 20 ? "bold 15px Inter" : "bold 19px Inter"}`;
          ctx.fontFamily = "Inter";
          ctx.fillText(
            `152KT`,
            x,
            y + 23
          );
          ctx.fillStyle = "#4F4F4F";
          ctx.font = "600 15px Inter";
          ctx.fillStyle = "#4F4F4F";
          ctx.fillText("CO", x-10, y + 38);
          ctx.font = "600 12px Inter";
          ctx.fillText("2", x + 6, y + 38);
          ctx.font = "600 15px Inter";
          ctx.fillText("e", x + 13, y + 38);
          ctx.save();
        },
      };
    }
    else if (type === "BusinessTravelVsEmmission") 
    {
      // console.log("vishnu",centerData);
      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;

          let x = width / 2 + 10;
          let y = height / 2 -10;
          ctx.font = "10px Inter";
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#989898";
          // ctx.fillText("TOTAL EMISSION", x, y);
          ctx.fillStyle = "#4F4F4F";
          ctx.font = `${centerData.length > 20 ? "bold 15px Inter" : "bold 19px Inter"}`;
          ctx.fontFamily = "Inter";
          ctx.fillText(
            `152KT`,
            x,
            y + 23
          );
          ctx.fillStyle = "#4F4F4F";
          ctx.font = "600 15px Inter";
          ctx.fillStyle = "#4F4F4F";
          ctx.fillText("CO", x-10, y + 38);
          ctx.font = "600 12px Inter";
          ctx.fillText("2", x + 6, y + 38);
          ctx.font = "600 15px Inter";
          ctx.fillText("e", x + 13, y + 38);
          ctx.save();
        },
      };
    }
  

    return { ...objTextId, ...objTextFill };
  };
  const entityName = (scope, entity) => {
    const entity_name = masterEntities.filter(
      (data) => data.scope === scope && data.entity === entity
    );
    if (entity_name.length) {
      return entity_name[0].name;
    }
  };
  let labelsAlignmentObj = {};
  let hoverModeObj = {};
  if (type === "emissionScopes" ) {
    labelsAlignmentObj = {
      title: {
        display: false,
        formatter: (value, ctx) => {
          const labelsArray = ctx.chart.data.labels;
          return labelsArray[ctx.dataIndex];
        },
        font: {
          weight: "normal",
          size: 16,
        },
      },
      value: {
        formatter: (value, context) => {
          return "";
        },
        color: "#000000",
        align: "end",
        anchor: "end",
        font: {
          size: 12,
          weight: "normal",
        },
      },
    };

    const emissionScopeArr = donutData?.map((data) => {
      return `${parseFloat(data.emission)}`;
    });

    localStorage.setItem(
      "totalEmissionScopes",
      totalEmission(emissionScopeArr)
    );
    if (scope.length === 1) {
      labelsDonut = donutData?.map((data) => {
        return `${data?.entity ? entityName(data.scope, data.entity) : ""}`;
      });
    } else if (scope.length > 1) {
      labelsDonut = donutData?.map((data) => {
        return `Scope ${data?.scope ? data.scope : ""}`;
      });
    }

    if (enabledInfoClick) {
      const scopeNum = parseInt(enabledInfoClick.replace("Scope ", ""));
      labelsDonut = donutData?.map((data) => {
        return `${data?.entity ? entityName(scopeNum, data.entity) : ""}`;
      });
    }
    dataDonut = donutData?.map((data) => {
      return `${(
        (parseFloat(data.emission) /
          parseFloat(totalEmission(emissionScopeArr))) *
        100
      ).toFixed(1)}`;
    });
  }
  if (type === "equivalence") {
    labelsDonut = labels?.map((data) => {
      return `${data}`;
    });
  }

  let hoverObj = {};
  if (type === "equivalence") {
    hoverObj = {
      borderWidth: 0,
      hoverOffset: 15,
      hoverBackgroundColor: (ctx) => {
        if (ctx.dataIndex >= 0) {
          return backgroundColor[ctx.dataIndex]
        }
      }
    };

  }
  else if (type === "ghgEmission") {
    hoverObj = {};
  } else {
    hoverObj = {
      borderWidth: 0,
      hoverOffset: 15,
      hoverBorderColor: (ctx) => {
        if (ctx.active) {
          return renderColor(ctx.dataIndex, "#099CC1");
        }
      },
      hoverBorderWidth: 0,
    };
  }

  let externalToolTip = {
    external: function (context) {
      // Tooltip Element

      let tooltipEl = document.getElementById("chartjs-tooltip");

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";
        tooltipEl.innerHTML = "<table></table>";
        document.body.appendChild(tooltipEl);
      }
      // Hide if no tooltip
      const tooltipModel = context.tooltip;
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove("above", "below", "no-transform");
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

        let innerHtml = "<thead>";

        titleLines.forEach(function (title) {
          innerHtml += "<tr><th>" + title + "</th></tr>";
        });
        innerHtml += "</thead><tbody>";
        if (type === "equivalence") {
          bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            let style = "background: #FFFFFF";
            let style2 = "padding: 2px 0px 2px 2px;";
            style2 += "; font-size: 12px";
            style2 += "; margin-left: 20px";
            style += "; border-width: 1px";
            style += "; font-size: 12px";
            style += "; font-weight: 600";
            style += "; color: #000000";
            style += "; padding: 3px";
            style += "; border-top-left-radius: 5px";
            style += "; border-top-right-radius: 5px";
            const span =
              '<div style="width: 130px;box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
              style +
              '">' +
              '<span style="height: 16px;width: 16px;margin: 10px;background-color: ' +
              colors.backgroundColor +
              ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter">' +
              tooltipModel.dataPoints[0]["label"] +
              "</span>" +
              "</div>" +
              '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
              '<div style= " ' +
              style2 +
              '">' +
              "</div></div></div>";
            innerHtml += "<tr><td>" + span + "</td></tr>";
          });
        } else {
          bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            let style = "background: #FFFFFF";
            let style2 = "padding: 2px 0px 2px 3px;";
            style2 += "; font-size: 12px";
            style2 += "; font-family: Inter";
            style2 += "; margin-left: 30px";
            style += "; border-width: 1px";
            style += "; font-size: 12px";
            style += "; font-weight: 600";
            style += "; color: #000000";
            style += "; padding: 3px";
            style += "; border-top-left-radius: 5px";
            style += "; border-top-right-radius: 5px";
            const span =
              '<div style="width: 130px;box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
              style +
              '">' +
              '<span style="height: 8px;width: 8px;margin: 10px;background-color: ' +
              colors.backgroundColor +
              ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter">' +
              tooltipModel.dataPoints[0]["label"] +
              "</span>" +
              "</div>" +
              '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
              '<div style= " ' +
              style2 +
              '">' +
              "Actual Emissions" +
              '</div><div style="font-weight:600; ' +
              style2 +
              '">' +
              localStorage.getItem("totalEmissionScopes") +
              " KTCO<sub>2</sub>e</div>" +
              "</div></div>";
            innerHtml += "<tr><td>" + span + "</td></tr>";
          });
        }

        innerHtml += "</tbody>";

        let tableRoot = tooltipEl.querySelector("table");
        tableRoot.innerHTML = innerHtml;
      }

      const position = context.chart.canvas.getBoundingClientRect();
      const bodyFont = "Inter";
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.position = "absolute";
      tooltipEl.style.left =
        position.left + window.scrollX + tooltipModel.caretX + "px";
      tooltipEl.style.top =
        position.top + window.scrollY + tooltipModel.caretY + "px";
      tooltipEl.style.font = bodyFont.string;
      tooltipEl.style.padding =
        tooltipModel.padding + "px " + tooltipModel.padding + "px";
      tooltipEl.style.pointerEvents = "none";
    },
  };
  if (type === "ghgEmission") {
    labelsAlignmentObj = {
      title: {
        align: "center",
        formatter: (value, ctx) => {
          const labelsArray = ctx.chart.data.labels;
          return labelsArray[ctx.dataIndex];
        },
        font: {
          weight: "normal",
          size: 13,
        },
      },
      value: {
        formatter: (value, context) => {
          return "";
        },
        color: "#000000",
        align: "end",
        anchor: "end",
        font: {
          size: 12,
          weight: "normal",
        },
      },
    };
  }
  if (type === "equivalence") {
    labelsAlignmentObj = {
      value: {
        formatter: (value, context) => {
          return "";
        },
        align: "end",
        anchor: "start",
        offset: 20,
        font: {
          size: 15,
          color: "#FFFFFF",
          weight: "normal",
        },
      },
    };
  }

  if (type === "ghgEmission") {
    externalToolTip = {
      external: function (context) {
        // Tooltip Element

        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add("no-transform");
        }

        function getBody(bodyItem) {
          return bodyItem?.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = "<thead>";

          titleLines.forEach(function (title) {
            innerHtml += "<tr><th>" + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";

          if (type === "equivalence") {
            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let style = "background: #FFFFFF";
              let style2 = "padding: 2px 0px 2px 2px;";
              style2 += "; font-size: 12px";
              style2 += "; margin-left: 20px";
              style += "; border-width: 1px";
              style += "; font-size: 12px";
              style += "; font-weight: 600";
              style += "; color: #000000";
              style += "; padding: 3px";
              style += "; border-top-left-radius: 5px";
              style += "; border-top-right-radius: 5px";
              const span =
                '<div style="width: 130px;box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
                style +
                '">' +
                '<span style="height: 16px;width: 16px;margin: 10px;background-color: ' +
                colors.backgroundColor +
                ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
                tooltipModel.dataPoints[0]["label"] +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                '<div style= " ' +
                style2 +
                '">' +
                "</div></div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          } else if (type === "ghgEmission") {
            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let indexEmission = tooltipModel.dataPoints[i]["dataIndex"]
              let actualEmission = tooltipModel.dataPoints[i]["dataset"]["ghgEmissions"][indexEmission]
              let totalEmission = tooltipModel.dataPoints[i].parsed;
              let style = "background: #FFFFFF";
              const itemSplit = tooltipModel.dataPoints[0]["label"].split("")
              const index = itemSplit.findIndex(data => !isNaN(parseFloat(data)))
              let gasNameContainer = "<span>";
              if (typeof itemSplit[index] === "string" && itemSplit[index]) {

                for (let i = 0; i < itemSplit.length; i++) {
                  if (i !== index) {
                    gasNameContainer += itemSplit[i]
                  } else {
                    gasNameContainer += "<sub>" + itemSplit[index] + "</sub>"
                  }
                }
                gasNameContainer += "</span>"
              }

              if (gasNameContainer !== "<span>") {
                gasNameContainer = "<span>";
              } else {
                gasNameContainer = tooltipModel.dataPoints[0]["label"]
              }
              const span =
                '<div style="width: 230px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center; background: #DBDBDB !important;' +
                style +
                '">' +
                '<span style="height: 8px;width: 8px;margin: 10px; background: #DBDBDB; background-color: ' +
                colors.backgroundColor +
                ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
                gasNameContainer +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:62px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex;" >  <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Actual Emissions-" +
                '</div> <div style="font-weight:600; font-size: 12px;display:flex; align-items:center; color:black ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px; font-family: Inter;'>" +
                actualEmission +
                " KTCO<sub>2</sub>e</span></div></div>" +
                ' <div style="display:flex;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Total Emissions-" +
                '</div> <div style="font-weight:600; font-size: 12px;display:flex; align-items:center; color:#3C3C3C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                totalEmission +
                "%" +
                "</div></div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          }

          innerHtml += "</tbody>";

          let tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        const bodyFont = "Inter";
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          position.left + window.scrollX + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          position.top + window.scrollY + tooltipModel.caretY + "px";
        tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + "px " + tooltipModel.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    };
  } else if (type === "emissionScopes") {
    externalToolTip = {
      external: function (context) {
        // Tooltip Element

        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
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

          let innerHtml = "<thead>";

          titleLines.forEach(function (title) {
            innerHtml += "<tr><th>" + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";

          if (type === "equivalence") {
            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let style = "background: #FFFFFF";
              let style2 = "padding: 2px 0px 2px 2px;";
              style2 += "; font-size: 12px";
              style2 += "; margin-left: 20px";
              style += "; border-width: 1px";
              style += "; font-size: 12px";
              style += "; font-weight: 600";
              style += "; color: #000000";
              style += "; padding: 3px";
              style += "; border-top-left-radius: 5px";
              style += "; border-top-right-radius: 5px";
              const span =
                '<div style="width: 130px;box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
                style +
                '">' +
                '<span style="height: 16px;width: 16px;margin: 10px;background-color: ' +
                colors.backgroundColor +
                ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
                tooltipModel.dataPoints[0]["label"] +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                '<div style= " ' +
                style2 +
                '">' +
                "</div></div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          } else {
            bodyLines.forEach(function (body, i) {
              let style = "background: #FFFFFF";
              let style2 = "padding: 2px 0px 2px 3px;";
              style2 += "; font-size: 12px";
              style2 += "; margin-left: 30px";
              style += "; border-width: 1px";
              style += "; font-size: 14px";
              style += "; font-weight: 600";
              style += "; color: #000000";
              style += "; padding: 3px";
              style += "; border-top-left-radius: 5px";
              style += "; border-top-right-radius: 5px";
              const tooltipIndex = tooltipModel["dataPoints"][0]["dataIndex"];

              const span =
                '<div style="width: 260px; height:80px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center; background: #DBDBDB !important;' +
                style +
                '">' +
                '<span style="height: 8px;width: 8px;margin: 10px 1px; background: #DBDBDB; background-color: ' +

                ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
                tooltipModel.dataPoints[0]["label"] +
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; padding-bottom:10px; height:42px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                '<div style=" width:100%; " ><div style="display:flex;" >  <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                "Actual Emissions-" +
                '</div> <div style="font-weight:600; font-size: 10px;display:flex; align-items:center; color:black ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                donutData[tooltipIndex]["emission"] +
                " KTCO<sub>2</sub>e</span></div></div>" +
                ' <div style="display:flex;" > <div style= "font-size: 11px; font-family: Open Sans; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
                '">' +
                '</div> <div style="font-weight:600; font-size: 12px;display:flex; align-items:center; color:#3C3C3C ' +
                '">' +
                "<span style='margin-left: 5px; margin-top: 2px'>" +
                "</div></div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          }

          innerHtml += "</tbody>";

          let tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        const bodyFont = "Inter";
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          position.left + window.scrollX + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          position.top + window.scrollY + tooltipModel.caretY + "px";
        tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + "px " + tooltipModel.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    };
  } 
  else if (type === "ExtractionProductionTransmissionVsEmission") {
    externalToolTip = {
      external: function (context) {
        // Tooltip Element

        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
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

          let innerHtml = "<thead>";

          titleLines.forEach(function (title) {
            innerHtml += "<tr><th>" + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";

       
          bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            
            let style = "background: #FFFFFF";
            

            const span =
              '<div style="width: 230px; height:100px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center; background: #DBDBDB !important;' +
              style +
              '">' +
              '<span style="height: 8px;width: 8px;margin: 10px; background: #DBDBDB; background-color: ' +
              colors.backgroundColor +
              ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
              tooltipModel.dataPoints[0]["label"] +
              "</span>" +
              "</div>" +
              '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:62px !important; border-bottom-right-radius: 5px; display:flex; ">' +
              '<div style=" width:100%; " ><div style="display:flex;" >  <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
              '">' +
              "Actual CO2e(in KTCo<sub>2</sub>e)-" +
              '</div> <div style="font-weight:600; font-size: 12px;display:flex; align-items:center; color:#3C3C3C ' +
              '">' +
              "<span style='margin-left: 5px; margin-top: 2px; font-family: Inter;'>" +
              "952.67" +
              "</span></div></div>" +
              ' <div style="display:flex;" > <div style= "font-size: 12px; font-family: Inter; font-style: normal;font-weight: 500;line-height: 18px;color: #3C3C3C; padding-left:10px;  display:flex; align-items:center;' +
              '">' +
              "Total Actual Emissions-" +
              '</div> <div style="font-weight:600; font-size: 12px;display:flex; align-items:center; color:#3C3C3C ' +
              '">' +
              "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
              "42.6" +
              "%" +
              "</div></div></div>";
            innerHtml += "<tr><td>" + span + "</td></tr>";
          });
          

          innerHtml += "</tbody>";

          let tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        const bodyFont = "Inter";
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          position.left + window.scrollX + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          position.top + window.scrollY + tooltipModel.caretY + "px";
        tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + "px " + tooltipModel.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    };
  }
  else if (type === "equivalence") {
    externalToolTip = {
      external: function (context) {
        // Tooltip Element

        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.innerHTML = "<table></table>";
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
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

          let innerHtml = "<thead>";

          titleLines.forEach(function (title) {
            innerHtml += `<tr><th>` + title + "</th></tr>";
          });
          innerHtml += "</thead><tbody>";

          if (type === "equivalence") {
            bodyLines.forEach(function (body, i) {


              let dataIndex = tooltipModel.dataPoints[i].dataIndex;
              let sliceIcon1 =
                tooltipModel.dataPoints[i].dataset.sliceIcon[dataIndex];
              let emision =
                tooltipModel.dataPoints[i].dataset.emissionArr[dataIndex];

              const colors = tooltipModel.labelColors[i];
              const sliceEmission = tooltipModel.dataPoints[i].dataset.emissionArr[dataIndex]
              let style = `background: ${colors.backgroundColor}`;
              let style2 = "padding: 2px 0px 2px 2px;";
              style2 += "; font-size: 12px";
              style2 += "; margin-left: 20px";
              style += "; border-width: 1px";
              style += "; font-size: 12px";
              style += "; font-weight: 600";
              style += "; color: #000000";
              style += "; padding: 3px";
              style += "; border-top-left-radius: 5px";
              style += "; border-top-right-radius: 5px";
              const span =
                `<div  style="width: 200px; height:130px; box-shadow:0px 0px 10px #19315B; display:flex; flex-direction:row;
                justify-content:center; background: #023465 ;border-radius: 5px ;gap:5px">
                <div style="display:flex; justify-content:center; padding-top:30px; padding-left:10px;  "  ><img fill=#FFFFFF src= ${sliceIcon1} height=31; width=41 ></div>
                <div style="padding-right:15px" >
                
                <div style="display: flex;align-items: center; font-family: 'Open Sans'; font-style: normal; font-weight: 600; font-size: 15px; line-height: 113.68%; color: #FEFEFE; padding-top:20px ;padding-bottom:10px ` +
                '   ">' +
                +emision +
                " Units" +
                "</div>" +
                `<div style= "background: #023465; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;font-family: Inter;
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 16px;
                color: #FFFFFF; padding-bottom:10px;">` +
                tooltipModel.dataPoints[0]["label"] +
                "<br>" +
                '</div><hr style="padding-right:20px;   " > <div style="font-family: Open Sans; padding-top:10px; padding-bottom:10px;  font-style: normal; font-weight: 600; font-size: 13px; line-height: 113.68%; color: #FEFEFE; " " ' +
                '">' +
                "Saved - " +
                sliceEmission +
                "KT" +
                "</div></div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          } else {
            bodyLines.forEach(function (body, i) {
              const colors = tooltipModel.labelColors[i];
              let style = "background: #FFFFFF";
              let style2 = "padding: 2px 0px 2px 3px;";
              style2 += "; font-size: 12px";
              style2 += "; font-family: Inter";
              style2 += "; margin-left: 30px";
              style += "; border-width: 1px";
              style += "; font-size: 12px";
              style += "; font-weight: 600";
              style += "; color: #000000";
              style += "; padding: 3px";
              style += "; border-top-left-radius: 5px";
              style += "; border-top-right-radius: 5px";
              const span =
                '<div style="width: 130px;box-shadow:0px 0px 10px #19315B; border-radius: 5px"><div style="display: flex;align-items: center;' +
                style +
                '">' +
                '<span style="height: 8px;width: 8px;margin: 10px;background-color: ' +
                colors.backgroundColor +
                ';border-radius: 50%;display: inline-block;"></span><span style="font-family: Inter;">' +
                tooltipModel.dataPoints[0]["label"] +
                // "name"+
                "</span>" +
                "</div>" +
                '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">' +
                '<div style= " ' +
                style2 +
                '">' +
                "Actual Emissions" +
                '</div><div style="font-weight:600;font-family: Inter;' +
                style2 +
                '">' +
                localStorage.getItem("totalEmissionScopes") +
                " KTCO<sub>2</sub>e</div>" +
                "</div></div>";
              innerHtml += "<tr><td>" + span + "</td></tr>";
            });
          }

          innerHtml += "</tbody>";

          let tableRoot = tooltipEl.querySelector("table");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        const bodyFont = "Inter";
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
          position.left + window.scrollX + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          position.top + window.scrollY + tooltipModel.caretY + "px";
        tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + "px " + tooltipModel.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    };
  } else {
    externalToolTip = {};
    hoverModeObj = { mode: null };
  }


  const onlegengHover = (event, item) => {
    console.log(item, "custom legend")
    setPosition({ x: event.pageX - 170, y: event.pageY + 20 });

    setLegendToolTipVisible(true)
    setHoverData(item)

  }
  const onlegengLeaves = () => {
    setLegendToolTipVisible(false)

  }
  if (loading) {
    return <Loader size={30} />;
  } else if (!loading && !donutData.length) {
    return <NothingFoundView />;
  } else {
    return (
      <div className={`dnoutMainClass ${type}`} style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
      }}
        onMouseLeave={onlegengLeaves}
      >
        <div id={"donut-main-container"} className={`donut-container ${type} ${enabledInfoClick ? `enabledInfoClick ${enabledInfoClick?.replace(" ", "-")}` : ""}`} >
          <Doughnut
            onMouseMove={onlegengLeaves}
            onMouseLeave={onlegengLeaves}
            data={{
              labels: labelsDonut,
              datasets: [
                {
                  label: t("percentOfEmissions"),
                  ghgEmissions: ghgEmissionsArr ?? ghgEmissionsArr,
                  data: dataDonut,
                  backgroundColor,
                  sliceIcon,
                  emissionArr,
                  ...hoverObj,
                },
              ],
            }}
            options={{
              onClick: (evt) => {
                let elements = evt.chart.getElementsAtEventForMode(
                  evt,
                  "index",
                  { intersect: true },
                  false
                );
                let index = elements[0]?.index;
                if (
                  evt.chart.data.labels[index] === "Scope 1" ||
                  evt.chart.data.labels[index] === "Scope 2" ||
                  evt.chart.data.labels[index] === "Scope 3"
                ) {
                  setEnabledInfoClick(evt.chart.data.labels[index]);
                }
              },
              cutoutPercentage: 0,
              hover: hoverModeObj,
              cutout: type === "emissionScopes" ? centerData.length > 5 && centerData.length < 10 ? 60 : centerData.length > 9 && centerData.length < 15 ? 90 : centerData.length > 14 ? 100 : 65 : 70,
              responsive: true,
              // maintainAspectRatio:type ==="ExtractionProductionTransmissionVsEmission"?false:true,
              layout: {
                padding:
                  type === "ghgEmission"
                    ? {
                      left: 45,
                      right: 45,
                      top: 40,
                      bottom: 40,
                    }
                    : type === "equivalence"
                      ? {
                        top: 30,
                        bottom: 30,
                        left: 15,
                        right: 15
                      }
                      : type === "emissionScopes"
                        ? 40
                        :
                        10,
              },
              plugins: {
                htmlLegend: {
                  containerID:
                    type === "ghgEmission"
                      ? "legend-container-ghg"
                      : "legend-container",
                },
                tooltip: {
                  enabled: false,
                  position: "nearest",
                  ...externalToolTip,
                },
                responsive: true,
                scales: {
                  xAxes: [
                    {
                      display: true,
                    },
                  ],
                  yAxes: [
                    {
                      display: true,
                    },
                  ],
                },
                position: "bottom",
                datalabels: {
                  labels: { ...labelsAlignmentObj },
                  color: "#f4f4f4",
                  anchor: (context) => {
                    if (context.active) {
                      return "center";
                    }
                  },
                  font: (context) => {
                    if (context.active && type === "emissionScopes") {
                      return {
                        weight: "bold",
                        size: window.screen.width > 1280 ? 15 : 14,
                      };
                    }
                    return {
                      weight: "normal",
                      size:
                        type === "equivalence"
                          ? window.screen.width > 1280
                            ? 15
                            : 14
                          : window.screen.width > 1280
                            ? 14
                            : 13,
                    };
                  },
                  formatter: (value, context) => {
                    if (type === "emissionScopes" || type === "equivalence") {
                      return value + "%";
                    }
                  },
                },
                legend: {
                  display: false,
                },
              },
            }}
            plugins={[
              doughnutText(type, totalSavedEmission),
              type === "equivalence" && drawRing,
              type !== "ghgEmission" || type != "ExtractionProductionTransmissionVsEmission"&& ChartDataLabels,
              type === "equivalence" &&
              CustomHtmlLegendPlugin(false, "legend-container-eq", false, onlegengHover, onlegengLeaves),
              type === "emissionScopes" &&
              CustomHtmlLegendPlugin(false, "legend-container", false, onlegengHover, onlegengLeaves),
              type === "ghgEmission" &&
              CustomHtmlLegendPlugin(false, "legend-container-ghg", false, onlegengHover, onlegengLeaves),
              type === "ExtractionProductionTransmissionVsEmission" &&
              CustomHtmlLegendPlugin(false, "legend-container-ExtractionProductionTransmissionVsEmission", false, onlegengHover, onlegengLeaves),
            ]}
          />
          {legendToolTipVisible && (
            (type === "emissionScopes" ?
              <EmissionScopeToolTip enabledInfoClick={enabledInfoClick} hoverData={hoverData} donutData={donutData} position={position} /> : type === "ghgEmission" ? <GhgEmissionTooltip enabledInfoClick={enabledInfoClick} hoverData={hoverData} donutData={ghgEmissionsArr} position={position} totalEmission={dataDonut} /> : type === "equivalence" ? <EquivalanveTooltip sliceIcon={sliceIcon}
                emissionArr={emissionArr} hoverData={hoverData} position={position} /> : "")

          )}
          {type === "equivalence" && <div id="legend-container-eq" style={{ marginTop: "15px" }} onMouseLeave={onlegengLeaves} ></div>}
          {type === "emissionScopes" && <div id="legend-container" onMouseLeave={onlegengLeaves} ></div>}
          {type === "ghgEmission" && <div id="legend-container-ghg" onMouseLeave={onlegengLeaves} ></div>}
          {type === "ExtractionProductionTransmissionVsEmission" && <div id="legend-container-ExtractionProductionTransmissionVsEmission" onMouseLeave={onlegengLeaves} ></div>}


        </div>

      </div>

    );
  }
}
