import React, { useRef } from "react"; // Import useRef
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Grid } from "@mui/material";
import Fileblue from "src/assets/images/Fileblue.svg";
import historyDownload from "../../../assets/images/historyDownload1.svg";
import "../datamapping.scss";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import Loader from "src/components/loader";
import { downloadFileDynamic } from "src/modules/entity-management/entity-management-actions/entity-management-actions";
import constants from "src/constants";
import utils from "src/utils";
import { useTranslation } from "react-i18next";

export default function DataMappingSkip({
  historyData,
  skippedLabels,
  skippedDisArr,
  skippedBarArr,
  skippedRowLoading,
}) {
  const { t } = useTranslation();
  const data = {
    labels: skippedLabels,
    datasets: [
      {
        label: "",
        data: skippedBarArr,
        barThickness: 30,
        backgroundColor: "#C12C37",
        descriptions: skippedDisArr,
      },
    ],
  };

  const handleFailedRowClick = (item) => {
    let params = {
      referenceId: item?.referenceId,
    };
    downloadFileDynamic(
      constants.endPoints.downloadSkippedRow,
      params,
      "",
      handleDownloadFailedRowSuccess,
      handleDownloadFailedRowError
    );
  };

  function handleDownloadFailedRowSuccess(response) {
    utils.commonFunctions.downloadFile(response?.data);
  }

  function handleDownloadFailedRowError(error) {
    console.log("handleDownloadFailedRowError", error);
  }

  const renderSkipRowLoading = () => {
    if (skippedRowLoading) {
      return (
        <div className="nothingContainer">
          <Loader size={30} />
        </div>
      );
    } else if (!skippedRowLoading && !skippedBarArr.length) {
      return (
        <div className="nothingContainer">
          <NothingFoundView />
        </div>
      );
    } else {
      return (
        <Bar
          width={300}
          height={205}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Failure Count",
                fontSize: 25,
                position: "left",
              },
              tooltip: {
                enabled: true,
                position: "average",
                mode: "nearest",
                intersect: true,
                itemSort: (a, b) => b.parsed.y - a.parsed.y,
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 1,
                titleColor: "#000",
                bodyColor: "#000",
                titleAlign: "left",
                bodyAlign: "left",
                displayColors: true,
                callbacks: {
                  title: (tooltipItems) => {
                    if (tooltipItems && tooltipItems.length > 0) {
                      return tooltipItems[0].label;
                    }
                    return "";
                  },
                  label: (tooltipItem) => {
                    if (tooltipItem) {
                      const count = tooltipItem.formattedValue;
                      const datasetIndex = tooltipItem.datasetIndex;
                      const dataIndex = tooltipItem.dataIndex;
                      const description = data.datasets[datasetIndex].descriptions[dataIndex];
                      return [`Failure Count: ${count}`, `Description: ${description}`];
                    }
                    return "";
                  },
                },
              },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: true,
                },
              },
            },
          }}
          data={data}
        />
      );
    }
  }

  return (
    <div style={{ marginTop: "3%" }}>
      <Grid
        display={"flex"}
        style={{ margin: "0px" }}
        justifyContent={"space-between"}
        container
        spacing={1}
      >
        <Grid className="side-card" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} item width={"65%"} padding={0}  >
          <p className="skip" style={{
            marginTop: "1%", marginLeft: "10px", color: "#1C2325",
            fontWeight: "600"
          }}>
            {t("skippedEntriesVsErrorCodeInfographics")}
          </p>
          <Grid style={{ paddingLeft: "0px" }}>
            <CardContent
              sx={{
                paddingLeft: "0px",
              }}
            >
              {renderSkipRowLoading()}
            </CardContent>
          </Grid>
        </Grid>
        <Grid
          className="sideCardMain"
          sx={{ margin: "10px", padding: "0px" }}
          width={"32%"}
          item
        >
          <p className="skip" style={{
            marginTop: "1%", marginLeft: "10px", color: "#1C2325",
            fontWeight: "600"
          }}>
            {t("rawDataUploadHistory")}
          </p>
          <Card className="side-added-card" style={{ height: "90%" }}>
            <CardContent sx={{
              paddingBottom: "0px !important"
            }} >
              <div
                style={{
                  height: 200,
                  overflowY: "scroll",
                  marginBottom: "10px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  {historyData.length > 0 ?
                    historyData?.map((i) => {
                      return (
                        <div
                          className="DataHistoryList"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                          key={utils.commonFunctions.keyFinder()}
                        >
                          <div
                            className="IconTextDataHistory"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems:"center",
                              gap: "10px",
                            }}
                          >
                            <Grid
                              item
                              key={i?.label}
                              style={{ textAlign: "center",marginTop:"20px" }}
                            >
                              <img
                                width={30}
                                height={40}
                                src={Fileblue}
                                alt={"file blue"}
                              />
                            </Grid>
                            <Grid
                              item
                            >
                              <p className="side-label">{i?.label}</p>
                              <div className="count-download">
                                <p style={{background:"#b1000e",color:"white",fontWeight:"bold"}}  className="side-value">{i?.count}</p>
                                <p style={{background:"#50d987",color:"white",fontWeight:"bold"}} className="side-value1">{i?.successRow}</p>
                                <p  className="side-value2">{i?.failedRow}</p>
                                <img
                                  width={18}
                                  height={18}
                                  src={historyDownload}
                                  style={{ cursor: "pointer", marginTop: "1.5px" }}
                                  onClick={() => handleFailedRowClick(i)}
                                  alt="Download"
                                />
                              </div>
                            </Grid>
                          </div>
                          <Grid
                            item
                          >
                            <p className="side-date">
                              {i?.date.split(",")[0] && (
                                <p>{i?.date.split(",")[0]}</p>
                              )}
                              {i?.date.split(",")[1] && (
                                <p>{i?.date.split(",")[1]}</p>
                              )}
                            </p>
                          </Grid>
                        </div>
                      );
                    }) : <div style={{ display: "flex", height: "180px", width: "100%", justifyContent: "center", alignItems: "center" }}><NothingFoundView /></div>
                  }
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
