const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.width = "100%";
    listContainer.style.justifyContent = "space-around";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

export const CustomHtmlLegendPlugin = (
  customBoxDiv,
  containerId,
  disableClick,
  onlegengHover,
  onlegengLeaves
) => {
  return {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, containerId);
      while (ul.firstChild) {

        ul.firstChild.remove();
      }
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
      // console.log(items, "labelArrpieDatabgColorArr")
      items.forEach((item, indx) => {
        const li = document.createElement("li");
        li.style.alignItems = "center";
        li.style.cursor = "pointer";
        li.style.display = "flex";
        li.style.fontSize = "14px";
        li.style.fontWeight = "500";
        li.style.fontFamily = "Inter";
        li.style.color = "#333333";
        li.style.flexDirection = "row";
        li.style.marginLeft = "10px";
        li.style.textTransform = "capitalize";
        if (disableClick) {
          if (chart.config.data.datasets[indx]) {
            item.fillStyle =
              chart.config.data.datasets[indx]["backgroundColor"][0];
          }
        }

        if (!disableClick) {
          li.onclick = () => {
            const { type } = chart.config;
            if (type === "pie" || type === "doughnut") {
              // Pie and doughnut charts only have a single dataset and visibility is per item
              chart.toggleDataVisibility(item.index);
            } else {
              chart.setDatasetVisibility(
                item.datasetIndex,
                !chart.isDatasetVisible(item.datasetIndex)
              );
            }
            chart.update();
          };
          if (onlegengHover) {
            li.onmouseover = (ev) => {
              onlegengHover(ev, item)
            }

          }
          if (onlegengLeaves) {
            li.onmouseleave = (ev) => {
              onlegengLeaves()
            }
          }


        }

        // Color box
        if (!customBoxDiv) {
          const boxSpan = document.createElement("span");
          boxSpan.style.background = item.fillStyle;
          boxSpan.style.borderColor = item.strokeStyle;
          boxSpan.style.borderWidth = item.lineWidth + "px";
          boxSpan.style.borderRadius = "10px";
          boxSpan.style.display = "inline-block";
          boxSpan.style.height = "8px";
          boxSpan.style.marginRight = "10px";
          boxSpan.style.width = "8px";

          const textContainer = document.createElement("p");
          textContainer.style.color = item.fontColor;
          textContainer.style.margin = 0;
          textContainer.style.padding = 0;
          textContainer.style.textDecoration = item.hidden
            ? "line-through"
            : "";

          const text = document.createTextNode(item.text);
          const itemSplit = item.text.split("");
          const index = itemSplit.findIndex((data) => !isNaN(parseFloat(data)));
          let gasNameContainer = document.createElement("span");
          let costfuelData = document.createElement("span");
          if (typeof itemSplit[index] === "string" && itemSplit[index]) {
            for (let i = 0; i < itemSplit.length; i++) {
              if (i !== index) {
                gasNameContainer.insertAdjacentHTML("beforeend", itemSplit[i]);
              } else {
                gasNameContainer.insertAdjacentHTML(
                  "beforeend",
                  itemSplit[index].sub()
                );
              }
            }
          }
          if (containerId !== "legend-container-ghg") {
            gasNameContainer = null;
          }
          textContainer.appendChild(
            gasNameContainer
              ? gasNameContainer.textContent
                ? gasNameContainer
                : text
              : text
          );

          if (disableClick) {
            if (chart.config.data.datasets[indx]) {
              costfuelData.textContent =
                chart.config.data.datasets[indx]["unit"] &&
                  chart.config.data.datasets[indx]["unit"] !== "$"
                  ? `${chart.config.data.datasets[indx]["data"][0]} ${chart.config.data.datasets[indx]["unit"]}`
                  : chart.config.data.datasets[indx]["unit"] &&
                    chart.config.data.datasets[indx]["unit"] === "$"
                    ? `${chart.config.data.datasets[indx]["unit"]} ${chart.config.data.datasets[indx]["data"][0]}`
                    : chart.config.data.datasets[indx]["data"][0];

              costfuelData.style.fontSize = "13px";
              costfuelData.style.fontWeight = "800";
              costfuelData.style.float = "right";
            }
            textContainer.appendChild(costfuelData);
          }
          li.appendChild(boxSpan);
          li.appendChild(textContainer);
        } else {
          const boxdiv = document.createElement("div");
          const boxCircle = document.createElement("div");
          boxdiv.className = "container-tooltip";
          boxdiv.style.background = item.fillStyle;
          boxCircle.className = "circle";
          boxCircle.style.background = item.fillStyle;
          boxCircle.style.marginTop = "3px";
          boxCircle.style.borderColor = item.fillStyle;

          boxdiv.appendChild(boxCircle);
          const textContainer = document.createElement("p");
          textContainer.style.color = item.fontColor;
          textContainer.style.marginLeft = "10px";
          textContainer.style.padding = 0;
          textContainer.style.textDecoration = item.hidden
            ? "line-through"
            : "";

          const text = document.createTextNode(item.text);
          textContainer.appendChild(text);
          li.appendChild(boxdiv);
          li.appendChild(textContainer);

        }
        ul.appendChild(li);

      });
    },
  };
};
