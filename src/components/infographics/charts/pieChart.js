import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from 'react-chartjs-2';
import './pieChart.scss'
import { CustomHtmlLegendPlugin } from './customLegend';
import { ModeVsEmissionTooltip } from 'src/components/LegendTooltip/ModesVsEmissionToolTip';

Chart.register(ArcElement, Tooltip, Title, Legend);
const PieChart = ({ pieData, labelsArr, loading, chartViewPage, graphPosition }) => {
    const [hoverData, setHoverData] = React.useState();
    const [legendToolTipVisible, setLegendToolTipVisible] = React.useState(false)
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    let hoverObj = {
        borderWidth: 0,
        hoverOffset: 6
    };

    const bgColorArrFixed = ['#e1e1e1', '#1c2325', '#ac0915','#00A0CA','#00183F','#b1000e','#844658','#465884'];
    const labelArrFixed =   ['Air',     'Ocean',    'Road',   'Barge',  'Rail',   'Scope3', 'Scope2', 'Scope1'];

    const getBackgroundColor = (label) => {
        const index = labelArrFixed.indexOf(label);
        return index !== -1 ? bgColorArrFixed[index] : null;
    };
    const defaultColors = ['#b1000e', '#000000', '#555f63','#00A0CA','#00183F'];
    const mappedColour = labelsArr.map(label => getBackgroundColor(label)) ?? defaultColors;
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
                bodyLines.forEach(function (body, i) {
                    const colors = tooltipModel.labelColors[i];
                    let totalEmission = tooltipModel.dataPoints[i].parsed;
                    // console.log(tooltipModel, "tooltipModeltooltipModel")
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
                    const itemSplit = tooltipModel.dataPoints[0]["label"].split("")
                    const index = itemSplit.findIndex(data => !isNaN(parseFloat(data)))
                    const totalActual = (Number(totalEmission) / (Number(localStorage.getItem("totalModesVsEmission") == 0 ? 100 : Number(localStorage.getItem("totalModesVsEmission")))) * 100).toFixed(2);
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
                    }
                    else {
                        gasNameContainer = tooltipModel.dataPoints[0]["label"]
                    }
                    const span =
                        '<div style="width: 180px; height:130px; box-shadow:0px 0px 10px #19315B; background:#FFFFFF;  border-radius: 5px"><div style="display: flex;align-items: center; background: #DBDBDB !important;' +
                        style +
                        '">' +
                        '<span style="height: 8px;width: 8px;margin: 10px 7px 10px 5px; background: #DBDBDB; background-color: ' +
                        colors.backgroundColor +
                        ';border-radius: 50%;display: inline-block;"></span><span style="text-transform: capitalize;" >' +
                        tooltipModel.dataPoints[0]["label"] +
                        "</span>" +
                        "</div>" +
                        '<div style= "background: #FFFFFF; border-bottom-left-radius: 5px;padding-top:10px; height:100px !important; border-bottom-right-radius: 5px; display:flex; ">' +
                        '<div style=" width:100%; " ><div style="display:flex ; flex-direction:column ;" >  <div style= "font-size: 13px; font-style: normal; font-family: Inter;font-weight: 400;line-height: 18px;color: #333333; padding-left:20px;  display:flex; align-items:center;' +
                        '">' +
                        "Actual Emissions" +
                        '</div> <div style="font-weight:600;  padding-left:15px; font-size: 12px;display:flex; align-items:center; color:#1C1C1C' +
                        '">' +
                        "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                        totalEmission +
                        " KTCO<sub>2</sub>e</span></div></div>" +
                        ' <div style="display:flex ,flex-direction:column ;" > <div style= "font-size: 13px; font-family: Inter; font-style: normal;font-weight: 400;line-height: 18px;color: #333333; padding-left:20px; padding-top:8px;  display:flex; align-items:center;' +
                        '">' +
                        "% Total Actual Emission" +
                        '</div> <div style="font-weight:600;  padding-left:15px; font-size: 13px;display:flex; align-items:center; color:#1C1C1C ' +
                        '">' +
                        "<span style='margin-left: 5px; margin-top: 2px;font-family: Inter;'>" +
                        totalActual +
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

    Tooltip.positioners.average = function (elements, position) {
        if (!elements.length) {
            return false;
        }
        let offset = 0;
        let offsetY = 10;
        if (position.x < 285) {
            offset = 150;
        } else {
            offset = -150;
        }
        return {
            x: position.x + offset,
            y: offsetY,
        };
    };

    const data = {
        labels: labelsArr ?? labelArrFixed,
        datasets: [
            {
                data: pieData ?? [46, 25, 17, 15, 26],
                backgroundColor: mappedColour ?? defaultColors,
                hoverBackgroundColor: mappedColour ?? defaultColors,
                ...hoverObj,
            },
        ],
    };
    const onlegengHover = (event, item) => {
        console.log(item, "custom legend")
        setPosition({ x: event.pageX - 170, y: event.pageY + 20 });
        setLegendToolTipVisible(true)
        setHoverData(item)

    }
    const onlegengLeaves = () => {
        setLegendToolTipVisible(false)

    }
    return (
        <div className={`pieChartContainer 
        ${(chartViewPage && chartViewPage === "simulator") ? "simulatorViewPieMain" : ""}`}
            onMouseLeave={onlegengLeaves} >
            <div className={`pieChartMain ${(chartViewPage && chartViewPage === "simulator") ? "simulatorViewPieCont" : ""}`}
                onMouseLeave={onlegengLeaves} >
                <Pie
                    onMouseMove={onlegengLeaves}
                    onMouseLeave={onlegengLeaves}
                    data={data}
                    options={
                        {
                            layout: {
                                padding: 10
                            },
                            cutoutPercentage: 10,
                            maintainAspectRatio: (chartViewPage && chartViewPage === "simulator") ? false : true,

                            plugins: {
                                htmlLegend: {
                                    // ID of the container to put the legend in
                                    containerID: `legend-container${graphPosition ? graphPosition : ""}`,
                                },
                                tooltip: {
                                    enabled: false,
                                    position: "nearest",
                                    ...externalToolTip,
                                },
                                cutoutPercentage: 0,
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
                                legend: {
                                    display: false
                                },
                            }
                        }
                    }
                    plugins={[
                        CustomHtmlLegendPlugin(false, `legend-container${graphPosition ? graphPosition : ""}`, false, onlegengHover, onlegengLeaves)
                    ]}

                />
                {legendToolTipVisible && <ModeVsEmissionTooltip hoverData={hoverData} position={position} PieData={data} />}
            </div>
            <div id={`legend-container${graphPosition ? graphPosition : ""}`} className='pie-legend' onMouseLeave={onlegengLeaves} ></div>
        </div>

    )
};

export default PieChart;