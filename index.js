import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import ShowHide from "src/components/showHide/index";
import { Grid } from "@material-ui/core";
import { getImageFromURL, IMAGES } from "src/constants/images";
import InfoGraphicCard from "./infographicCard";
import "./info.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
// import { getImageFromURL, IMAGES } from "src/constants/images";
import {
  matrixListAccToBE,
  matrixList,
  matrixListDetailed,
  allMatrixArr,
  matrixListDetailedAccToBE,
  allGraphDetailedSummary,
} from "src/constants/appConstants";
import { useDispatch, useSelector } from "react-redux";
import { storeVisibleChartsShowHide, storeVisibleChartsDetailedShowHide } from "src/modules/dash-executive/dash-executive-actions/dash-executive-actions";
import CustomButton from "src/components/buttons/Buttons";
import { useTranslation } from "react-i18next";
import NothingFoundView from "../nothingFoundView/NothingFoundView";

export default function InfoGraphics() {
  const [selectedArr, setSelectedArr] = useState([]);
  const { pathname } = useLocation();
  const [deSelectedArr, setDeSelectedArr] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isResetActive, setIsResetActive] = useState(false);
  const [resetMove, setResetMove] = useState(true);
  const [moveSettings, setMoveSettings] = useState(false);
  const [info, setInfo] = useState([]);
  const { t } = useTranslation();
  const { singleDetailed } = useSelector((state) => state.globalRed);
  // let isEquivalence = pathname.includes("equivalence");
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

  const dispatch = useDispatch();

  const { visibleChartsThroughShowHide } = useSelector((state) => ({
    visibleChartsThroughShowHide:
      state.dashExecutiveReducer.visibleChartsThroughShowHide,
  }));
  const { visibleChartsThroughDetailedShowHide } = useSelector((state) => ({
    visibleChartsThroughDetailedShowHide:
      state.dashExecutiveReducer.visibleChartsThroughDetailedShowHide,
  }));

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
    Apicalls.getApiCall(
      getUserGraphEndpoint,
      "",
      "",
      handleUserGraphicSuccess,
      handleUserGraphicError
    );
  };

  const handleUserGraphicSuccess = (response) => {
    console.log("response handleUserGraphicSuccess", response);
    // let dataArrRedx = isDetailed
    let selectedArrFromBe = [];
    let deselectedArrFromBe = [];
    let selectedArrRdx = [];
    if (response?.data?.result) {
      response?.data?.result?.map((item, index) => {
        selectedArrFromBe.push({
          ...item,
          name: isDetailed
            ? selectItemNameDetailed(item.graph_id)
            : selectItemName(item.graph_id),
          elePosition: index,
        });
        if (isDetailed) {
          selectedArrRdx.push(selectItemNameDetailed(item.graph_id));
        } else if (isExecutive) {
          selectedArrRdx.push(selectItemName(item.graph_id));
        }
      });
      console.log("SELECTED ARR FROM BE", selectedArrFromBe);
      setInfo(response?.data?.result);
      dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectedArrRdx) : storeVisibleChartsShowHide(selectedArrRdx));
      setSelectedArr(selectedArrFromBe);
      setSelectedArrBckUp([...selectedArrFromBe]);
      generateDeselectedArr(
        [...selectedArrFromBe],
        isDetailed ? allGraphDetailedSummary : allMatrixArr,
        response?.data?.result?.length
      );
      response?.data?.result?.length === isDetailed ? allGraphDetailedSummary.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false) : allMatrixArr.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
    if (selectedArrFromBe.length === 0) {
      setIsAllChecked(false)
    }
    console.log("selectedArrFromBe-->>", selectedArrFromBe);
  };

  const handleUserGraphicError = (error) => {
    console.log("error handleUserGraphicSuccess", error);
  };

  const resetMoveInfographicData = () => {
    let selectarr = [];
    setMoveSettings((prevState) => {
      return !prevState;
    });
    selectedArrBckUp.map((item) => {
      selectarr.push(isDetailed ? selectItemNameDetailed(item.graph_id) : selectItemName(item.graph_id));
    });
    dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectarr) : storeVisibleChartsShowHide(selectarr));
    setInfo(selectedArrBckUp);
  };

  const saveMoveInfographicData = () => {
    setMoveSettings((prevState) => {
      return !prevState;
    });
    let data = {
      show: info.map((data) => data.graph_id),
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

  const generateDeselectedArr = (
    selectedArrFromBe,
    allMatrixArr,
    selectedArrLength
  ) => {
    let tempDeselectedArr = allMatrixArr.filter(function (itemAllMatrix) {
      return !selectedArrFromBe.find(function (itemSelectedArrBe) {
        return itemAllMatrix.graph_id === itemSelectedArrBe.graph_id;
      });
    });

    tempDeselectedArr.map((item, index) => {
      item.elePosition = selectedArrLength + index;
    });
    setDeSelectedArr(tempDeselectedArr);
    console.log("tempDeselectedArr-->>", [...tempDeselectedArr]);
    setDeSelectedArrBckUp([...tempDeselectedArr]);
    console.log("tempDeselectedArr-->>", tempDeselectedArr);
  };

  const selectItemName = (id) => {
    if (id === matrixListAccToBE.EMISSION_TIMELINE) {
      return matrixList.EMISSION_TIMELINE;
    } else if (id === matrixListAccToBE.EMISSION_SCOPES) {
      return matrixList.EMISSION_SCOPES;
    } else if (id === matrixListAccToBE.EMISSION_BY_REGION) {
      return matrixList.EMISSION_BY_REGION;
    } else if (id === matrixListAccToBE.EMISSION_BY_COUNTRY) {
      return matrixList.EMISSION_BY_COUNTRY;
    } else if (id === matrixListAccToBE.EMISSION_ACROSS_ACTIVITY) {
      return matrixList.EMISSION_ACROSS_ACTIVITY;
    } else if (id === matrixListAccToBE.EMISSION_ACROSS_TRANSPORTATION) {
      return matrixList.EMISSION_ACROSS_TRANSPORTATION;
    } else if (id === matrixListAccToBE.SALES_BY_EMISSION) {
      return matrixList.SALES_BY_EMISSION;
    } else if (id === matrixListAccToBE.GHG_WISE_EMISSION) {
      return matrixList.GHG_WISE_EMISSION;
    } else if (id === matrixListAccToBE.EMISSION_BY_SUPPLIER) {
      return matrixList.EMISSION_BY_SUPPLIER;
    }
  };

  const selectItemNameDetailed = (id) => {
    if (id === matrixListDetailedAccToBE.COST_FUEL) {
      return matrixListDetailed.COST_FUEL;
    } else if (id === matrixListDetailedAccToBE.LANES_EMISSIONS) {
      return matrixListDetailed.LANES_EMISSIONS;
    } else if (id === matrixListDetailedAccToBE.CONTINENT_EMISSIONS) {
      return matrixListDetailed.CONTINENT_EMISSIONS;
    } else if (id === matrixListDetailedAccToBE.PROCESS_EMISSIONS) {
      return matrixListDetailed.PROCESS_EMISSIONS;
    } else if (id === matrixListDetailedAccToBE.SUPPLIER_EMISSIONS) {
      return matrixListDetailed.SUPPLIER_EMISSIONS;
    } else if (id === matrixListDetailedAccToBE.EMISSION_PERFORMANCE) {
      return matrixListDetailed.EMISSION_PERFORMANCE;
    } else if (id === matrixListDetailedAccToBE.MODES_EMISSIONS) {
      return matrixListDetailed.MODES_EMISSIONS;
    } else if (id === matrixListDetailedAccToBE.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES) {
      return matrixListDetailed.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES;
    } else if (id === matrixListDetailedAccToBE.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES) {
      return matrixListDetailed.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES;
    } else if (id === matrixListDetailedAccToBE.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES) {
      return matrixListDetailed.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES;
    } else if (id === matrixListDetailedAccToBE.EMISSION_BY_REGION) {
      return matrixListDetailed.EMISSION_BY_REGION;
    } else if (id === matrixListDetailedAccToBE.EMISSION_BY_COUNTRY) {
      return matrixListDetailed.EMISSION_BY_COUNTRY;
    }
  };

  const onAllPress = (newArr, isAllChecked) => {
    console.log("newArr, isAllChecked", newArr, isAllChecked);
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
    console.log("newArr selected-->>", newArr);
    setIsResetActive(true);
    setSelectedArr(newArr);
    // newArr.length > 0 && newArr.length === allMatrixArr.length ? setIsAllChecked(true) : setIsAllChecked(false)
  };
  const updateDeSelectedArr = (newArr) => {
    console.log("newArr-->>", newArr);
    setIsResetActive(true);
    setDeSelectedArr(newArr);
    // newArr.length > 0 && newArr.length === allMatrixArr.length ? setIsAllChecked(false) : setIsAllChecked(true)
  };

  const handleResetClick = () => {
    console.log(
      "selectedArrBckUp, deSelectedArrBckUp",
      selectedArrBckUp,
      deSelectedArrBckUp
    );
    setSelectedArr(selectedArrBckUp);
    setDeSelectedArr(deSelectedArrBckUp);
    setIsResetActive(false);
    setIsAllChecked(!isAllChecked);
  };

  const handleSaveClick = () => {
    console.log("call in handleSaveClick");
    //here we are updating the user-graph-setting
    updateUserGraphSetting();
  };

  const findAndMakeArrToShow = () => {
    let tempArr = [];
    selectedArr.length &&
      selectedArr.map((item) => {
        tempArr.push(item.graph_id);
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
    console.log("response handleUpdateGraphSettingSuccess", response);
    let selectedArrRdx = [];
    setIsResetActive(false);
    if (response?.data?.result) {
      response?.data?.result?.map((item) => {
        selectedArrRdx.push(isDetailed ? selectItemNameDetailed(item.graph_id) : selectItemName(item.graph_id));
      });
      dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(selectedArrRdx) : storeVisibleChartsShowHide(selectedArrRdx));
      setSelectedArrBckUp(response?.data?.result);
      handleUserGraphicSuccess(response);
    }
  };

  const handleUpdateGraphSettingError = (error) => {
    console.log("error handleUpdateGraphSettingError", error);
  };

  return (
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
              // disabled={resetMove}
              buttonWidth={{ width: "50%", height: "25px !important" }}
              buttonTextStyle={{
                color: "#FFFFFF",
                fontSize: "13px",
                // margin: "20px 5px",
                fontWeight: "400",
              }}
              buttonText={t("reset")}
              bgColor={"#E92C2C"}
              onClick={() => {
                resetMoveInfographicData();
              }}
            />
            <CustomButton
              // disabled={resetMove}
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
                // margin: "20px 5px",
                fontWeight: "400",
              }}
              buttonText={t("save")}
              bgColor={"#009D06"}
            />
          </div>
        )}
      </div>
      <Grid container spacing={2}>
        {
          !isDetailed ? (
            visibleChartsThroughShowHide?.length === 0 ? (
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
              visibleChartsThroughShowHide?.length > 0 && <Containers
                visibleCharts={visibleChartsThroughShowHide}
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
              visibleChartsThroughDetailedShowHide?.length > 0 && <Containers
                visibleCharts={visibleChartsThroughDetailedShowHide}
                isDetailed={isDetailed}
                setInfo={setInfo}
                moveSettings={moveSettings} />
            )
          )
        }
      </Grid>
    </>
  );
}
const Containers = ({
  visibleCharts,
  isDetailed,
  moveSettings,
  setInfo
}) => {
  const [charts, setCharts] = useState([visibleCharts.slice(0, visibleCharts.length / 2), visibleCharts.slice(visibleCharts.length / 2)]);
  const dispatch = useDispatch();
  const reCreateChart = (destination, source) => {
    const newResult = [...charts];
    const desIndex = destination.droppableId;
    const sourceIndex = Number(source.droppableId);
    const [sorRemove] = newResult[sourceIndex].splice(source.index, 1);
    const [desRemove] = newResult[desIndex].splice(destination.index, 1, sorRemove);
    newResult[sourceIndex].splice(source.index, 0, desRemove);
    // console.log("vishnu",sourceIndex)
    return [...newResult[0], ...newResult[1]];
  }
  const reOrderList = (dropId, from, to) => {
    const newList = [...charts];
    const remove = newList[dropId][to];
    newList[dropId][to] = newList[dropId][from];
    newList[dropId][from] = remove;
    return newList;
  }
  function onDragEnd(result) {
    if (!result.destination) return;
    // console.log("vishnu",result.draggableId === 'Cost-Fuel-Item Shipped-Emission' && result.destination.droppableId !== '1',result.destination.droppableId)
    if ((result.draggableId === 'Cost-Fuel-Item Shipped-Emission' && result.destination.droppableId === '1') || (result.destination.droppableId === '0' && charts[0][result.destination.index] === 'Cost-Fuel-Item Shipped-Emission') && result.source.droppableId !== '0') return;
    if (result.destination.draggableId !== result.source.droppableId) var tempItemsInfo = reCreateChart(result.destination, result.source);
    else var tempItemsInfo = reOrderList(result.destination.draggableId, result.source.index, result.destination.index);
    // if( result?.destination?.index === null) return;
    // const items = Array.from(info);
    // const itemsInfo = Array.from(isDetailed ? visibleChartsThroughDetailedShowHide : visibleChartsThroughShowHide);
    // const tempItems= swapElements(items,result.destination.index, result.source.index);
    // const tempItemsInfo= swapElements(itemsInfo, result.destination.index, result.source.index);
    setInfo(tempItemsInfo);
    dispatch(isDetailed ? storeVisibleChartsDetailedShowHide(tempItemsInfo) : storeVisibleChartsShowHide(tempItemsInfo));
  }
  useEffect(() => {
    setCharts([visibleCharts.slice(0, visibleCharts.length / 2), visibleCharts.slice(visibleCharts.length / 2)])
  }, [visibleCharts])
  return <>
    <DragDropContext onDragEnd={onDragEnd}>
      {
        charts.map((visibleChart, index) => {
          return <Droppable droppableId={`${index}`} key={index}>
            {(provided, snapshot) => (
              <Grid
                container
                spacing={2}
                xs={6}
                style={{
                  marginTop: "8px",
                  // marginBottom: "10px",
                  alignItems: "stretch",
                }}
                {...provided.droppableProps}
                innerRef={provided.innerRef}
              >
                {
                  visibleChart?.map((data, index) => {
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
                            col={12}
                          />
                        )}
                      </Draggable>)
                  })
                }
              </Grid>
            )}
          </Droppable>
        })
      }
    </DragDropContext>
  </>
}