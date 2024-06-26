import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShowHide from "src/components/showHide/index";
import { Grid } from "@material-ui/core";
import { getImageFromURL, IMAGES } from "src/constants/images";
import InfoGraphicCard from "./infographicCard";
import "./info.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
// import {
//   matrixListDetailed,
//   allMatrixArr,
//   matrixListDetailedAccToBE,
//   allGraphDetailedSummary,
// } from "src/constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import { storeVisibleChartsShowHide, storeVisibleChartsDetailedShowHide } from "src/modules/dash-executive/dash-executive-actions/dash-executive-actions";
import CustomButton from "src/components/buttons/Buttons";
import { useTranslation } from "react-i18next";
import NothingFoundView from "../nothingFoundView/NothingFoundView";
import Loader from "../loader";
import utils from "src/utils";

export default function InfoGraphics() {
  const [selectedArr, setSelectedArr] = useState([]);
  const { pathname } = useLocation();
  const [deSelectedArr, setDeSelectedArr] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isResetActive, setIsResetActive] = useState(false);
  const [resetMove, setResetMove] = useState(true);
  const [moveSettings, setMoveSettings] = useState(false);
  const [info, setInfo] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { t } = useTranslation();
  const { singleDetailed } = useSelector((state) => state.globalRed);
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;
  let isExecutive = pathname.includes("executive-summary");
  const [selectedArrBckUp, setSelectedArrBckUp] = useState([]);
  const [deSelectedArrBckUp, setDeSelectedArrBckUp] = useState([]);
  const handleMoveClick = () => {
    setMoveSettings((prevState) => {
      return !prevState;
    });
  };

  function swapElements(arr, i1, i2) {
    let tempArr = [...arr];
    let temp = tempArr[i1];
    tempArr[i1] = tempArr[i2];
    tempArr[i2] = temp;
    return tempArr;
  }
  function onDragEnd(result) {
    if (result?.destination?.index === undefined && result.source?.index === undefined) return;
    const items = Array.from(info);
    const itemsInfo = Array.from(isDetailed ? visibleChartsThroughDetailedShowHide : visibleChartsThroughShowHide);
    // const itemsInfo = Array.from(visibleChartsThroughDetailedShowHide);
    const tempItems = swapElements(items, result.destination?.index, result.source?.index);
    const tempItemsInfo = swapElements(itemsInfo, result.destination?.index, result.source?.index);
    setInfo(tempItems);
    dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(tempItemsInfo) : storeVisibleChartsShowHide(tempItemsInfo));
  }

  const dispatch = useDispatch();

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

  console.log("visibleChartsThroughDetailedShowHide74", visibleChartsThroughDetailedShowHide, infoExecutiveSummary)
  useEffect(() => {
    if (isDetailed || isExecutive) {
      getUserGraphSettings();
    }
  }, [pathname]);

  useEffect(() => {
    const orderBckUp = selectedArrBckUp.map((data) => data?.graph_id);
    const orderInfo = info.map((data) => data?.graph_id);
    let reset = true;
    for (let i = 0; i < orderBckUp.length; i++) {
      if (orderBckUp[i] !== orderInfo[i]) {
        reset = false;
      }
    }
    setResetMove(reset);
  }, [selectedArrBckUp, info]);

  const getUserGraphSettings = () => {
    const getUserGraphEndpoint = isDetailed
      ? constants.endPoints.getUserGraphSettingDetailed
      : constants.endPoints.getUserGraphSetting;
    setIsPageLoading(true)
    Apicalls.getApiCall(
      getUserGraphEndpoint,
      "",
      "",
      handleUserGraphicSuccess,
      handleUserGraphicError
    );
  };
  const handleAllGraphDetailedSummary = (response, isDetailed, infoDetailedSummary, allMatrixArr) => {
    if (response?.data?.result?.length === isDetailed) {
      if (infoDetailedSummary.length) {
        setIsAllChecked(true)
      }
      else {
        setIsAllChecked(false)
      }
    }
    else if (allMatrixArr.length) {
      setIsAllChecked(true)
    }
    else {
      setIsAllChecked(false)
    }
  }
  /*
  const handleUserGraphicSuccess = (response) => {
    console.log("response350",response)
    setIsPageLoading(false);
    let selectedArrFromBe = [];
    let selectedArrRdx = [];
    if (response?.data?.result) {
      response?.data?.result?.map((item, index) => {
        selectedArrFromBe.push({
          ...item,
          name: isDetailed
            ? selectItemNameDetailed(item.graph_id)
            : utils.commonFunctions.selectItemName(item.graph_id),
          elePosition: index,
        });
        if (isDetailed) {
          selectedArrRdx.push(selectItemNameDetailed(item.graph_id));
        } else if (isExecutive) {
          selectedArrRdx.push(utils.commonFunctions.selectItemName(item.graph_id));
        }
      });
      setInfo(response?.data?.result);
      console.log("selectedArrRdx142",selectedArrRdx) // graphic header data
      dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectedArrRdx) : storeVisibleChartsShowHide(selectedArrRdx));
      setSelectedArr(selectedArrFromBe);
      setSelectedArrBckUp([...selectedArrFromBe]);
      generateDeselectedArr(
        [...selectedArrFromBe],
        isDetailed ? allGraphDetailedSummary : allMatrixArr,
        response?.data?.result?.length
      );

      handleAllGraphDetailedSummary(response, isDetailed, allGraphDetailedSummary, allMatrixArr)
    }
    if (selectedArrFromBe.length === 0) {
      setIsAllChecked(false)
    }
  };
*/
  const handleUserGraphicSuccess = (response) => {
    setIsPageLoading(false);
    let selectedArrRdx = []; // array of graph view_names only.
    let selectedArrFromBe = []; // array of graph name,eleposition,and details from api;
    if (response?.data?.result) {
      response?.data?.result?.map((item, index) => {
        const name = isDetailed ? selectItemNameDetailed(item.graph_id) : selectItemNameExecutive(item.graph_id);
        selectedArrFromBe.push({
          ...item,
          // name: selectItemNameDetailed(item.graph_id),
          name: name,
          elePosition: index,
        });
        // selectedArrRdx.push(selectItemNameDetailed(item.graph_id));
        if (isDetailed) {
          selectedArrRdx.push(name);
        } else if (isExecutive) {
          selectedArrRdx.push(name);
        }
      });
      selectedArrRdx = [...selectedArrRdx.filter(x=> x !== null && x !== 'null')];
      //setInfo(response?.data?.result);
      setInfo(selectedArrFromBe);
      dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectedArrRdx) : storeVisibleChartsShowHide(selectedArrRdx));
      setSelectedArr(selectedArrFromBe);
      setSelectedArrBckUp([...selectedArrFromBe]);
      generateDeselectedArr(
        [...selectedArrFromBe],
        isDetailed ? infoDetailedSummary : infoExecutiveSummary,
        //infoDetailedSummary,
        response?.data?.result?.length
      );
      //handleAllGraphDetailedSummary(response, isDetailed, allGraphDetailedSummary, allMatrixArr)
      handleAllGraphDetailedSummary(response, isDetailed, infoDetailedSummary, infoDetailedSummary)
    }
    if (selectedArrFromBe.length === 0) {
      setIsAllChecked(false)
    }
  };
  const handleUserGraphicError = (error) => {
    setIsPageLoading(false);
  };

  const resetMoveInfographicData = () => {

    let selectarr = [];
    setMoveSettings((prevState) => {
      return !prevState;
    });
    selectedArrBckUp.forEach((item) => {
      selectarr.push(isDetailed ? selectItemNameDetailed(item.graph_id) : selectItemNameExecutive(item.graph_id));
      //selectarr.push(selectItemNameDetailed(item.graph_id));
    });
    dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectarr) : storeVisibleChartsShowHide(selectarr));
    setInfo(selectedArrBckUp);
  };

  const saveMoveInfographicData = () => {
    setMoveSettings((prevState) => {
      return !prevState;
    });
    let data = {
      show: info.map((name) => {
        const arr = isDetailed ? infoDetailedSummary : infoExecutiveSummary;
        const item = arr.find((graph) => graph.name === name);
        return item ? item.graph_id : null;
      }),
    };

    if (isDetailed) {
      data.type = "detailed";
    } else {
      data.type = "executive";
    }
    if (!resetMove) {
      Apicalls.putApiCall(
        constants.endPoints.updateUserGraphSetting,
        data,
        handleUpdateGraphSettingSuccess,
        handleUpdateGraphSettingError
      );
    }
  };
  // this function is used to find the names of graphs which are not in api's response
  const generateDeselectedArr = (
    selectedArrFromBe, // refined response from api having apiresponse,nameeleposition
    allMatrixArr, // details having graphid,name,show- true/false;
    selectedArrLength // length of array of api response.
  ) => {
    // let tempDeselectedArr = allMatrixArr.filter(function (itemAllMatrix) {
    //   return !selectedArrFromBe.find(function (itemSelectedArrBe) {
    //     return itemAllMatrix.graph_id === itemSelectedArrBe.graph_id;
    //   });
    // });
    let tempDeselectedArr = allMatrixArr.filter(function (itemsfromAll) {
      return !selectedArrFromBe.find(function (itemSelectedArrBe) {
        return itemsfromAll.graph_id === itemSelectedArrBe.graph_id;
      });
    });

    tempDeselectedArr.map((item, index) => {
      item.elePosition = selectedArrLength + index;
    });
    setDeSelectedArr(tempDeselectedArr);
    setDeSelectedArrBckUp([...tempDeselectedArr]);
  };


  // const selectItemNameDetailed = (id) => {
  //   switch (id) {
  //     case matrixListDetailedAccToBE.COST_FUEL:
  //       return matrixListDetailed.COST_FUEL;
  //     case matrixListDetailedAccToBE.LANES_EMISSIONS:
  //       return matrixListDetailed.LANES_EMISSIONS;
  //     case matrixListDetailedAccToBE.CONTINENT_EMISSIONS:
  //       return matrixListDetailed.CONTINENT_EMISSIONS;
  //     case matrixListDetailedAccToBE.PROCESS_EMISSIONS:
  //       return matrixListDetailed.PROCESS_EMISSIONS;
  //     case matrixListDetailedAccToBE.SUPPLIER_EMISSIONS:
  //       return matrixListDetailed.SUPPLIER_EMISSIONS;
  //     case matrixListDetailedAccToBE.EMISSION_PERFORMANCE:
  //       return matrixListDetailed.EMISSION_PERFORMANCE;
  //     case matrixListDetailedAccToBE.MODES_EMISSIONS:
  //       return matrixListDetailed.MODES_EMISSIONS;
  //     case matrixListDetailedAccToBE.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
  //       return matrixListDetailed.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES;
  //     case matrixListDetailedAccToBE.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
  //       return matrixListDetailed.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES;
  //     case matrixListDetailedAccToBE.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
  //       return matrixListDetailed.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES;
  //     case matrixListDetailedAccToBE.EMISSION_BY_REGION:
  //       return matrixListDetailed.EMISSION_BY_REGION;
  //     case matrixListDetailedAccToBE.EMISSION_BY_COUNTRY:
  //       return matrixListDetailed.EMISSION_BY_COUNTRY;
  //       case matrixListDetailedAccToBE.BU_PERFORMANCE:
  //       return matrixListDetailed.BU_PERFORMANCE;
  //     case matrixListDetailedAccToBE.UPSTREAM_NETWORKS_VS_EMISSION:
  //       return matrixListDetailed.UPSTREAM_NETWORKS_VS_EMISSION;
  //     case matrixListDetailedAccToBE.DOWNSTREAM_ASSET_TYPE_VS_EMISSION:
  //       return matrixListDetailed.DOWNSTREAM_ASSET_TYPE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.DOWNSTREAM_LESSEE_VS_EMISSION:
  //       return matrixListDetailed.DOWNSTREAM_LESSEE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.UPSTREAM_ASSET_TYPE_VS_EMISSION:
  //       return matrixListDetailed.UPSTREAM_ASSET_TYPE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.UPSTREAM_LESSOR_VS_EMISSION:
  //       return matrixListDetailed.UPSTREAM_LESSOR_VS_EMISSION;
  //     case matrixListDetailedAccToBE.RMPO_WISE_EMISSIONS:
  //       return matrixListDetailed.RMPO_WISE_EMISSIONS;
  //     case matrixListDetailedAccToBE.NON_SCM_SOURCING_VS_EMISSION:
  //       return matrixListDetailed.NON_SCM_SOURCING_VS_EMISSION;
  //     case matrixListDetailedAccToBE.FRANCHISE_WISE_EMISSION:
  //       return matrixListDetailed.FRANCHISE_WISE_EMISSION;
  //     case matrixListDetailedAccToBE.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
  //       return matrixListDetailed.DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION;
  //     case matrixListDetailedAccToBE.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
  //       return matrixListDetailed.UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION;
  //     case matrixListDetailedAccToBE.DEDICATED_VEHICLE_TYPE_VS_EMISSION:
  //       return matrixListDetailed.DEDICATED_VEHICLE_TYPE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.OUTSOURCED_VEHICLE_TYPE_VS_EMISSION:
  //       return matrixListDetailed.OUTSOURCED_VEHICLE_TYPE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.WASTE_PROCESSING_COMPANIES_VS_EMISSION:
  //       return matrixListDetailed.WASTE_PROCESSING_COMPANIES_VS_EMISSION;
  //     case matrixListDetailedAccToBE.SOLD_PRODUCTS_VS_EMISSION:
  //       return matrixListDetailed.SOLD_PRODUCTS_VS_EMISSION;
  //     case matrixListDetailedAccToBE.REFRIGERATION_PROCESS_VS_EMISSIONS:
  //       return matrixListDetailed.REFRIGERATION_PROCESS_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS:
  //       return matrixListDetailed.REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS:
  //       return matrixListDetailed.FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.SPEND_VS_EMISSIONS:
  //       return matrixListDetailed.SPEND_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS:
  //       return matrixListDetailed.PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.INVESTMENT_COMPANY_BASED_EMISSIONS:
  //       return matrixListDetailed.INVESTMENT_COMPANY_BASED_EMISSIONS;
  //     case matrixListDetailedAccToBE.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS:
  //       return matrixListDetailed.EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS;
  //     case matrixListDetailedAccToBE.PRODUCT_TYPE_VS_EMISSION:
  //       return matrixListDetailed.PRODUCT_TYPE_VS_EMISSION;
  //     case matrixListDetailedAccToBE.BUSINESS_TRAVEL_VS_EMISSION:
  //       return matrixListDetailed.BUSINESS_TRAVEL_VS_EMISSION;
  //   }
  // };


  const selectItemNameDetailed = (id) => {   //// i have made this function inside utilityFunction.js
    const selectedGraph = infoDetailedSummary.find((item) => item.graph_id === id);
    return selectedGraph ? selectedGraph.name : null;
  };

  const selectItemNameExecutive = (id) => {   //// i have made this function inside utilityFunction.js
    const selectedGraph = infoExecutiveSummary.find((item) => item.graph_id === id);
    return selectedGraph ? selectedGraph.name : null;
  };


  const onAllPress = (newArr, isAllChecked) => {
    setIsResetActive(true);
    if (isAllChecked) {
      setSelectedArr(newArr);
      setDeSelectedArr([]);
    } else {
      setDeSelectedArr(newArr);
      setSelectedArr([]);
    }
    setIsAllChecked(isAllChecked);
  };

  const updateSelectedArr = (newArr) => {
    setIsResetActive(true);
    setSelectedArr(newArr);
  };
  const updateDeSelectedArr = (newArr) => {
    setIsResetActive(true);
    setDeSelectedArr(newArr);
  };

  const handleResetClick = () => {
    setSelectedArr(selectedArrBckUp);
    setDeSelectedArr(deSelectedArrBckUp);
    setIsResetActive(false);
    setIsAllChecked(!isAllChecked);
  };

  const handleSaveClick = () => {
    //here we are updating the user-graph-setting
    updateUserGraphSetting();
  };

  const findAndMakeArrToShow = () => {
    let tempArr = [];
    selectedArr.length &&
      selectedArr.map((item) => {
        return tempArr.push(item.graph_id);
      });
    return tempArr;
  };

  const updateUserGraphSetting = () => {
    let data = {
      show: findAndMakeArrToShow(),
      type: isDetailed ? "detailed" : "executive"
    };
    Apicalls.putApiCall(
      constants.endPoints.updateUserGraphSetting,
      data,
      handleUpdateGraphSettingSuccess,
      handleUpdateGraphSettingError
    );
  };

  const handleUpdateGraphSettingSuccess = (response) => {
    let selectedArrRdx = [];
    setIsResetActive(false);
    if (response?.data?.result) {
      response?.data?.result?.map((item) => {
        selectedArrRdx.push(isDetailed ? selectItemNameDetailed(item.graph_id) : selectItemNameExecutive(item.graph_id));
      });
      console.log("selectedArrRdx356", selectedArrRdx)
      dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectedArrRdx) : storeVisibleChartsShowHide(selectedArrRdx));
      setSelectedArrBckUp(response?.data?.result);
      handleUserGraphicSuccess(response);
    }
  };

  const handleUpdateGraphSettingError = (error) => {
    console.log("error handleUpdateGraphSettingError", error);
  };

  /*
  const handleInfographicsCardContainer = () => {
    if (!isDetailed) {
      if (visibleChartsThroughShowHide?.length === 0) {
        return (
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "auto 10px",
              borderRadius: "8px",
            }}
          >
            <NothingFoundView nothingFoundMsg="Oops, Seems like all the charts are hidden. Proceed with unhide to view them" />{" "}
          </div>
        )
      }
      else if (visibleChartsThroughShowHide?.length > 0) {
        return (
          visibleChartsThroughShowHide?.map((data, index) => {
            return (
              <Draggable
                isDragDisabled={!moveSettings}
                key={data}
                draggableId={data}
                index={index}
              >
                {console.log("data 393",data)}
                {(provided) => (
                  <InfoGraphicCard
                    dragHandleProps={{ ...provided.dragHandleProps }}
                    provided={{ ...provided.draggableProps }}
                    providerRef={provided.innerRef}
                    data={data}
                  />
                )}
              </Draggable>
            );
          })
        )
      }
    }
    else if (visibleChartsThroughDetailedShowHide?.length === 0) {
      return (
        <>
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "auto 10px",
              borderRadius: "8px",
              height: "90%"
            }}
          >
            <NothingFoundView nothingFoundMsg="Oops, Seems like all the charts are hidden. Proceed with unhide to view them" />{" "}
          </div>
        </>
      )
    }

    else {
      if (visibleChartsThroughDetailedShowHide?.length > 0) {
        return (
          visibleChartsThroughDetailedShowHide?.map((data, index) => {
            return (
              <Draggable
                isDragDisabled={!moveSettings}
                key={data}
                draggableId={data}
                index={index}
              >
                {(provided) => (
                  <InfoGraphicCard
                    dragHandleProps={{ ...provided.dragHandleProps }}
                    provided={{ ...provided.draggableProps }}
                    providerRef={provided.innerRef}
                    data={data}
                    isDetailed={isDetailed}
                  />
                )}
              </Draggable>
            );
          })
        )
      }
    }
  }
  */

  return (
    <>
      {
        isPageLoading ? <div style={{ height: "70vh" }}><Loader /></div> :
          <>
            <ShowHide
              selectedArr={selectedArr}
              deSelectedArr={deSelectedArr}
              onAllPress={onAllPress}
              isAllChecked={isAllChecked}
              handleSaveClick={handleSaveClick}
              updateSelectedArr={updateSelectedArr}
              updateDeSelectedArr={updateDeSelectedArr}
              handleResetClick={handleResetClick}
              isResetActive={isResetActive}
            />
            <div style={{ display: "flex", alignItems: "center", margin: "8px" }}>
              <div
                className={`${moveSettings ? "activeMove" : ""}`}
                onClick={handleMoveClick}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  float: "left",
                }}
              >
                <img
                  width={13}
                  height={13}
                  src={getImageFromURL(`${IMAGES.NAV4}`)}
                  alt={IMAGES.NAV4}
                />
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#1C1C1C",
                  }}
                >
                  {t("move")}
                </span>
              </div>
              {moveSettings && (
                <div style={{ display: "flex", width: "15%", alignItems: "center" }}>
                  <CustomButton
                    buttonWidth={{ width: "50%", height: "25px !important" }}
                    buttonTextStyle={{
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                    buttonText={t("reset")}
                    bgColor={"#1C2325"}
                    onClick={() => {
                      resetMoveInfographicData();
                    }}
                  />
                  <CustomButton
                    onClick={() => {
                      {
                        !resetMove
                          ? saveMoveInfographicData()
                          : setMoveSettings(false);
                      }
                    }}
                    buttonWidth={{ width: "50%", height: "25px !important" }}
                    buttonTextStyle={{
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "400",
                    }}
                    buttonText={t("save")}
                    bgColor={"#B1000E"}
                  />
                </div>
              )}
            </div>
            <Grid container spacing={2}>
              {
                 !isDetailed ?// (
                //!true ? 
                (visibleChartsThroughShowHide?.length === 0 ? (
                //!true ? (visibleChartsThroughDetailedShowHide?.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      background: "#ffffff",
                      height: "300px",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      margin: "auto 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <NothingFoundView nothingFoundMsg="Oops, Seems like all the charts are hidden. Proceed with unhide to view them" />{" "}
                  </div>
                ) : (
                  visibleChartsThroughShowHide?.length > 0 && <Container
                    visibleCharts={visibleChartsThroughShowHide}
                    // visibleChartsThroughDetailedShowHide?.length > 0 && <Container
                    //   visibleCharts={visibleChartsThroughDetailedShowHide}
                    isDetailed={isDetailed}
                    setInfo={setInfo}
                    moveSettings={moveSettings} />
                )
                ) : (
                  visibleChartsThroughDetailedShowHide?.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        background: "#ffffff",
                        height: "300px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        margin: "auto 10px",
                        borderRadius: "8px",
                      }}
                    >
                      <NothingFoundView nothingFoundMsg="Oops, Seems like all the charts are hidden. Proceed with unhide to view them" />{" "}
                    </div>
                  ) : (

                    visibleChartsThroughDetailedShowHide?.length > 0 && <Container
                      visibleCharts={visibleChartsThroughDetailedShowHide}
                      isDetailed={isDetailed}
                      setInfo={setInfo}
                      moveSettings={moveSettings} />
                  )
                )
              }
            </Grid>
          </>
      }
    </>
  );
}


function Container({
  visibleCharts,
  isDetailed,
  moveSettings,
  setInfo
}) {
  const [charts, setCharts] = useState([]);
  const dispatch = useDispatch();

  const reCreateChart = (destination, source) => {
    const newResult = JSON.parse(JSON.stringify([[...charts[0]], [...charts[1]]]));
    const desIndex = Number(destination.droppableId);
    const sourceIndex = Number(source.droppableId);

    // const temp = newResult[desIndex][destination.index];
    // newResult[desIndex][destination.index] = newResult[sourceIndex][source.index];

    // newResult[sourceIndex][source.index] = temp;
    // return [...newResult[0], ...newResult[1]];
    // Check if source and destination indices are valid
    if (newResult[desIndex] && newResult[desIndex][destination.index] &&
      newResult[sourceIndex] && newResult[sourceIndex][source.index]) {
      const temp = newResult[desIndex][destination.index];
      newResult[desIndex][destination.index] = newResult[sourceIndex][source.index];
      newResult[sourceIndex][source.index] = temp;
    }
    // Return new array with valid items
    return newResult.reduce((acc, arr) => arr ? [...acc, ...arr] : acc, []);
  }
  const reOrderList = (dropId, from, to) => {
    // console.log("vishnu",dropId,from,to)
    const newList = [...charts];
    const remove = newList[dropId][to];
    newList[dropId][to] = newList[dropId][from];
    newList[dropId][from] = remove;
    return [...newList[0], ...newList[1]];
  }
  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) return;
    // if ((result.draggableId === 'Cost-Fuel-Item Shipped-Emission' && result.destination.droppableId === '1') || (result.destination.droppableId === '0' && charts[0][result.destination.index] === 'Cost-Fuel-Item Shipped-Emission') && result.source.droppableId !== '0') return;
    if (result.destination.droppableId !== result.source.droppableId) var tempItemsInfo = reCreateChart(result.destination, result.source);
    else var tempItemsInfo = reOrderList(Number(result.destination.droppableId), result.source.index, result.destination.index);
    setInfo(tempItemsInfo);
    dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(tempItemsInfo) : storeVisibleChartsShowHide(tempItemsInfo));
  }
  useEffect(() => {
    const mid = visibleCharts.length % 2 ? Math.ceil(visibleCharts.length / 2) : visibleCharts.length / 2;
    setCharts([visibleCharts.slice(0, mid), visibleCharts.slice(mid)]);
  }, [visibleCharts])
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {
          charts.map((visibleCharts, index) => {
            if (!Array.isArray(visibleCharts)) {
              return null; // Skip rendering Droppable if the array is empty
            }
            return <Droppable droppableId={`${index}`} key={index}>
              {
                (provided, snapshot) => {
                  return <Grid
                    style={{ marginTop: '10px' }}
                    sm={6}
                    {...provided.droppableProps}
                    innerRef={provided.innerRef}
                  >
                    {
                      visibleCharts?.map((data, index) => {
                        // Check if data is defined and is not empty
                        if (typeof data !== 'undefined' && data !== null && data !== '') {
                          return (
                            <Draggable
                              isDragDisabled={!moveSettings}
                              key={data}
                              draggableId={data}
                              index={index}
                            >
                              {
                                (provided) => {
                                  typeof data !== 'string' && console.log("vishnu", data);
                                  return <InfoGraphicCard
                                    dragHandleProps={{ ...provided.dragHandleProps }}
                                    provided={{ ...provided.draggableProps }}
                                    providerRef={provided.innerRef}
                                    data={data}
                                    isDetailed={isDetailed}
                                    col={12}
                                  />
                                }
                              }
                            </Draggable>
                          )
                        }
                        else return null
                      })
                    }
                    {provided.placeholder}
                  </Grid>
                }
              }
            </Droppable>
          })
        }
      </DragDropContext>
    </>
  )
}