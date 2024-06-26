import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useSelector } from "react-redux";
import { CustomHtmlLegendPlugin } from "./customLegend";
import { Doughnut } from "react-chartjs-2";
import "./multiDonutChart.scss"
import React from "react";
Chart.register(ArcElement, Tooltip, Title, Legend);

export default function MultiSeriesDonut({ type, single, labelsArr, data }) {
  let centerData = `${parseFloat(localStorage.getItem("totalEmissionCostFuel")).toFixed(2)} KT`;
  const [ModifiedData, setModifiedData] = React.useState(data)
  const { totalEmissionCostFuelState } = useSelector(
    (state) => state.globalRed
  );
  const doughnutText = (type) => {

    let objTextId = { id: "doughnutText" };
    let objTextFill = {};
    if (type === "cost-fuel") {

      objTextFill = {
        afterDatasetsDraw(chart, args, pluginOptions) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart;
          let x = width / 2;
          let y = height / 2 + 15 / 2;
          ctx.fontFamily = "Inter";
          ctx.textAlign = "center";
          ctx.textBaseLine = "middle";
          ctx.fillStyle = "#00183F";
          ctx.font = "800 14px Inter";
          ctx.fillText(`${parseFloat(localStorage.getItem("totalEmissionCostFuel")).toFixed(2)} KT`, x, y)
          ctx.fillStyle = "#00183F";
          ctx.font = "800 14.5px Inter";
          ctx.fillStyle = "#00183F";
          ctx.fillText("CO", x - 5, y + 18);
          ctx.font = "800 8.5px Inter";
          ctx.fillText("2", x - 5 + 13, y + 20);
          ctx.font = "800 13.5px Inter";
          ctx.fillText("e", x - 5 + 13 + 7, y + 18);
          ctx.save();
        },
      };
    }

    return { ...objTextId, ...objTextFill };
  };
  React.useEffect(() => {
    if (parseFloat(totalEmissionCostFuelState).toFixed(2) === "0.00") {

      setModifiedData(data.map((data) => {
        return {
          backgroundColor: data.backgroundColor,
          borderWidth: data.borderWidth,
          label: data.label,
          name: data.name
        }
      }))
    }
    else {
      setModifiedData(data.map((data1) => {
        return data1
      }))
    }
  }, [data, localStorage.getItem("totalEmissionCostFuel")], totalEmissionCostFuelState)

  return (
    <div className={`multi-donut ${parseFloat(localStorage.getItem("totalEmissionCostFuel")).toFixed(2) === "0.00" ? "nullData" : ""}`}>
      <div
        id={"donut-main-container"}
        className={`donut-multi-container ${type} `}
        style={{ margin: "20px 0px", display: "flex" }}
      >
        <Doughnut
          data={{
            labels:
              labelsArr?.length > 0 ? labelsArr :
                //["Distance", "Fuel", "Cost", "Item Shipped"],
                ["Distance","Item Shipped"],
            datasets:
              data ??
                parseFloat(totalEmissionCostFuelState).toFixed(2) === "0.00" ? ModifiedData : (data ??
                  [
                    
                    {
                      label: "Distance",
                      backgroundColor: ["#00183F"],
                      data: [1],
                      value: 1,
                      borderWidth: 0,
                      unit: "Mn KM",
                    },
                   /* {
                      label: "Fuel",
                      backgroundColor: ["#555f63"],
                      data: [56984],
                      borderWidth: 0,
                      unit: "Ltrs",
                    },
                    {
                      label: "Cost",
                      backgroundColor: ["#19A6DE"],
                      data: [162958],
                      borderWidth: 0,
                      unit: "$",
                    }, */
                    {
                      label: "Item Shipped",
                      backgroundColor: ["#A9E8FF"],
                      data: [100],
                      borderWidth: 0,
                      unit: "",
                    },
                  ]),
                }}
          options={{
            cutout: centerData.length > 5 && centerData.length < 10 ? 40 : centerData.length > 10 && centerData.length < 15 ? 60 : centerData.length > 15 && centerData.length < 20 ? 82 : 35,
            plugins: {
              tooltip: {
                enabled: false,
              },
              legend: {
                display: false,
              },
            },
            hover: {
              mode: null
            },
            responsive: true,
            maintainAspectRatio: true,
          }}
          plugins={[
            doughnutText(type),
            CustomHtmlLegendPlugin(false, "legend-container-costfuel", true),
          ]}
        />
      </div>
      <div id="legend-container-costfuel"></div>
    </div>
  );
}
