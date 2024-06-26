import React, { useState, useEffect } from "react";
import { getImageFromURL, IMAGES } from "src/constants/images";
import CustomButton from "src/components/buttons/Buttons";
import "./metric.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledMenu } from "src/components/styledMenu/index";
import MenuList from "@mui/material/MenuList";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import { Divider, Grid, Typography } from "@mui/material";
import { useRequestApi } from "src/customHooks/useRequestApi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc,
  makeModes,
  makeActivity,
  makeMovementType,
} from "src/utils/utilityFunction";
import Loader from "../loader";
import NothingFoundView from "../nothingFoundView/NothingFoundView";
import { C02Img } from "src/constants/appConstants";
import { toast } from "react-toastify";
import utils from "src/utils";

//Move Metrics Component
const MoveMetrics = ({ label, checked, idx, id, onChange, emissionValue, unit }) => {
  const [expandIconShow, setExpandIconShow] = useState(false);
  const showExpand = () => {
    setExpandIconShow(true);
  };
  const hideExpand = () => {
    setExpandIconShow(false);
  };

  const handleSrcCheckBoxImage = (checked) => {
    return checked ? getImageFromURL(`${IMAGES.CHECKEDBOX}`) : getImageFromURL(`${IMAGES.UNCHECKEDBOX}`);
  }

  const handleAltCheckBoxImage = (checked) => {
    return !checked ? IMAGES.CHECKEDBOX : IMAGES.UNCHECKEDBOX;
  }

  const handleIconAltCheckBoxImage = (checked) => {
    return checked ? IMAGES.CHECKEDBOX : IMAGES.UNCHECKEDBOX;
  }

  const handleFirsttUnitChange = (unit) => {
    return unit && unit === "$" ? unit : "";
  }

  const handleSecondtUnitChange = (unit) => {
    return unit && unit !== "$" ? unit : ""
  }
  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={idx}>
      {(provided) => (
        <MenuItem
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onMouseEnter={showExpand}
          onMouseLeave={hideExpand}
          sx={{
            padding: "4px 20px",
            background: "#FFFFFF",
            "& .MuiCheckbox-root:hover": {
              background: "transparent",
            },
          }}
          onChange={onChange}
          disableRipple
        >
          <Checkbox
            name={id}
            sx={{
              "&.MuiCheckbox-root": {
                padding: "6px 15px 6px 5px",
              },
            }}
            disableRipple
            color="default"
            icon={
              <img
                className="checkbox-img"
                src={handleSrcCheckBoxImage(checked)}
                alt={handleIconAltCheckBoxImage(checked)}
              />
            }
            checkedIcon={
              <img
                className="checkbox-img"
                src={handleSrcCheckBoxImage(checked)}
                alt={handleAltCheckBoxImage(checked)}
              />
            }
          />
          <Typography
            sx={{
              fontSize: "13px!important",
              fontWeight: "400",
              color: checked ? "#333333" : "#8B8B8B",
              width: "70%",
              whiteSpace: "break-spaces",
              padding: "4px 10px",
            }}
            component={"span"}
          >
            {label + `${utils.commonFunctions.isNullUndefined(emissionValue) ? '' : ` - ${handleFirsttUnitChange(unit)}${Number(emissionValue).toLocaleString()} ${handleSecondtUnitChange(unit)}`}`}
          </Typography>
          {expandIconShow && (
            <MenuIcon
              className="dragIcon handle"
              style={{ color: "#8B8B8B" }}
            />
          )}
        </MenuItem>
      )}
    </Draggable>
  );
};
export default function Metrics({ open }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();
  const [positionLeft, setPositionLeft] = useState(0);
  const [positionTop, setPositionTop] = useState(0);
  const [ToggleState, setToggleState] = useState(1);
  const { regionData } = useSelector((state) => state.globalRed);
  const [getAllMetricData, setAllMetricData] = useState([]);
  const { singleDetailed } = useSelector(
    (state) => state.globalRed
  );
  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;
  let isExecutive = pathname.includes("executive-summary");

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";
  const { request } = useRequestApi();
  const openMetric = Boolean(anchorEl);
  const [allMetrics, setAllMetrics] = useState([]);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [loadingAllMatrix, setLoadingAllMatrix] = useState(false);
  const [moveDash, setMoveDash] = useState(0);
  const { t } = useTranslation();

  const calanderFilter = (state) => {
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
    bu,
    team,
    region,
    country,
    scope,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) => calanderFilter(state));

  const { modes, movement, activity } = useSelector(
    (state) => state.detailedFilters
  );

  const makeParams =() => {
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
    if (makeRegion(region, regionData)) {
      params.region = JSON.stringify(makeRegion(region, regionData));
    }
    if (makeRc(country)) {
      params.rc = JSON.stringify(makeRc(country));
    }
    if (makeBu(bu, bu_filters)) {
      params.bu = JSON.stringify(makeBu(bu, bu_filters));
    }
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
    }
    if (makeModes(modes)) {
      params.mode = JSON.stringify(makeModes(modes));
    }
    if (makeMovementType(movement)) {
      params.movement_type = JSON.stringify(makeMovementType(movement));
    }
    if (makeActivity(activity)) {
      params.activities = JSON.stringify(makeActivity(activity));
    }
    return params;
  };

  const getAllMetrics = () => {
    const endpointMetrics = isDetailed
      ? constants.endPoints.allMetricDataDetailed
      : constants.endPoints.allMetricDataExecutive;
    const params=  makeParams();
    Apicalls.getApiCall(
      endpointMetrics,
      params,
      "",
      handleAllMetricsSuccess,
      handleAllMetricsError
    );
  };
  function getAllMetricsData() {
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
    if (makeRegion(region, regionData)) {
      params.region = JSON.stringify(makeRegion(region, regionData));
    }
    if (makeRc(country)) {
      params.rc = JSON.stringify(makeRc(country));
    }
    if (makeBu(bu, bu_filters)) {
      params.bu = JSON.stringify(makeBu(bu, bu_filters));
    }
    // handleRemainingGetAllMetricsData(params)
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
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
    setLoadingAllMatrix(true)
    //params.type = isDetailed ? "detailed" : "executive";
    const endpointMetrics = isDetailed
      ? constants.endPoints.allMetricDataDetailed
      : constants.endPoints.allMetricDataExecutive;
    Apicalls.getApiCall(
      endpointMetrics,
      params,
      "",
      handleAllMetricToggleSuccess,
      handleAllMetricToggleError
    );
  }

  function handleAllMetricToggleSuccess(response) {
    setLoadingAllMatrix(false);
    if (response?.data?.result?.data) {
      setAllMetricData(response?.data?.result?.data?.sort((a,b) => { return a.position-b.position}));
    }
  }
  useEffect(() => {
    getUserSetting();
  }, [getAllMetricData])

  function handleAllMetricToggleError(error) {
    //This is intentional for error logging.
    console.log("handleAllMetricToggleError", error);
    setLoadingAllMatrix(false);
    setAllMetricData([]);
  }

  const handleAllMetricsSuccess = (response) => {
    setAllMetrics(response?.data?.result?.data);
  };

  const handleAllMetricsError = (error) => {
    //This is intentional for error logging.
    console.log("handleAllMetricsError error", error);
  };

  const handleUnitDollorChange = (unit) => {
    if (unit) {
      if (unit === "$" || unit === "KTCO2e") {
        return "";
      }
      else {
        return ` ${unit}`;
      }
    }
    else {
      return "";
    }
  }

  const handlValueChange = (value, unit) => {
    if (value) {
      return `${unit && unit === "$" ? "$" : ""}` + value + `${handleUnitDollorChange(unit)}`
    }
    else if (value === 0) {
      return `${value}`;
    }
    else {
      return "N/A";
    }
  }

  const metricData = allMetrics?.filter(x => x.visibility)?.sort((a,b)=>{return a.position - b.position})?.map(({ name, value, unit, icon }) => {
    return {
      label: name,
      value: handlValueChange(value, unit),
      unit: unit,
      iconUrl: icon,
      icon: `${IMAGES.CLOUDICON}`,
    };
  });
  const handleMetricSave = async () => {
    if (data.filter((obj) => obj.visibility).length === 5) {
      const endpointMetricsSaveType = isDetailed ? "detailed" : "executive";
      setAnchorEl(null);
      let moveMetricData = data.length
        ? data?.filter((data) => data.visibility)?.map((data) => data.metric_id)
        : [];
      await request("put", constants.endPoints.moveMetrics, {
        show: moveMetricData,
        type: endpointMetricsSaveType,
      });
      getAllMetrics();
      toast.success("Metrics Updated !!");
    } else {
      alert("Only 5 Metrics Need To be Selected");
    }
  };

  const handleChangeCheckbox = (val) => {
    let isAvailable = data.filter(
      (obj) => obj.metric_id === val && obj.visibility === true
    );

    const visibilityStatus = (a, b) => {
      if (a.visibility === b.visibility) {
        return 0;
      }
      else if (a.visibility) {
        return -1;
      }
      else {
        return 1;
      }
    }
    const sortFilterData = (dd) => {
      return dd.sort((a, b) => visibilityStatus(a, b));
    }
    if (isAvailable.length !== 0) {
      const dd = data.filter((data) => !(data.metric_id === val && data.visibility === true))
      const d = sortFilterData(dd);
      d.push({
        metric_id: isAvailable[0].metric_id,
        name: isAvailable[0].name,
        icon: isAvailable[0].icon,
        visibility: false,
        created_at: isAvailable[0].created_at,
        position: isAvailable[0].position,
        unit: isAvailable[0].unit,
        updated_at: isAvailable[0].updated_at,
        value: isAvailable[0].value
      });

      setData(d.sort((a, b) => visibilityStatus(a, b)));

    } else {
      setData(
        data
          .map((obj) => {
            if (obj.metric_id === val) {
              return {
                metric_id: obj.metric_id,
                name: obj.name,
                icon: obj.icon,
                visibility: true,
                created_at: obj.created_at,
                position: obj.position,
                unit: obj.unit,
                updated_at: obj.updated_at,
                value: obj.value
              };
            } else {
              return obj;
            }
          })
          .sort((a, b) => visibilityStatus(a, b))
      );
    }
  };

  const handleClick = async (event) => {
    setAnchorEl(event?.currentTarget);
    getUserSetting();
  };

  const getUserSetting = () => {
    const endpointMetricsUser = isDetailed
      ? constants.endPoints.allMetricDataDetailed
      : constants.endPoints.allMetricDataExecutive;
    const params = makeParams();
    Apicalls.getApiCall(
      endpointMetricsUser,
      params,
      "",
      handleMcSettingSuccess,
      handleMcSettingError
    );
  }

  function handleMcSettingSuccess(res) {
    // if (res?.data?.result?.data_hide) {
    //   res?.data?.result?.data_hide?.map((item) => {
    //     let obj = getAllMetricData?.find(o => o.metrics_id === item.id);
    //     item.value = obj?.value
    //   })
    // }
    // if (res?.data?.result?.data_show) {
    //   res?.data?.result?.data_show?.map((item) => {
    //     let obj = getAllMetricData?.find(o => o.metrics_id === item.id);
    //     item.value = obj?.value
    //     item.unit = obj?.unit
    //   })
    // }
    // setDataAll([
    //   ...res?.data?.result?.data_show,
    //   ...res?.data?.result?.data_hide,
    // ]);
    // setData([...res?.data?.result?.data_show, ...res?.data?.result?.data_hide]);
    const show = res?.data?.result?.data?.filter(x => x.visibility);
    const hide = res?.data?.result?.data?.filter(x => !x.visibility);
    setDataAll(show.concat(hide)?.sort((a,b) => { return  (a.position == null ||  a.position === "null" )? 1 :a.position-b.position}));
    setData(show.concat(hide)?.sort((a,b) => { return (a.position == null ||  a.position === "null" )? 1 : a.position-b.position}));

  }
  function handleMcSettingError(error) {
    //This is intentional to log error 
    console.log("handleMcSettingError-->>", error);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const metricPosition = (name) => {
    const position = dataAll?.filter((data) => data.name === name)[0]["metric_id"];
    return position;
  };

  const handleResetClick = async () => {
    const endpointMetricsSaveType = isDetailed ? "detailed" : "executive";
    const resetMoveMetricData = [
      metricPosition("Actual Emissions"),
      metricPosition("Total Distance Covered"),
      metricPosition("Total Shipments"),
      metricPosition("Total Tonnage of Goods"),
      metricPosition("Social Cost of Carbon"),
    ];

    await request("put", constants.endPoints.moveMetrics, {
      show: resetMoveMetricData,
      type: endpointMetricsSaveType,
    });
    getAllMetrics();
    handleClose();
  };

  const currencySymbol = ["$", "€"];
  const firstFalse = (data) => {
    const index = data.findIndex((item) => item.visibility === false);
    if (index !== -1) {
      setMoveDash(index);
    } else {
      console.log("There is no false value in the array");
    }
  };

  useEffect(() => {
    if (isDetailed || isExecutive) {
      getAllMetrics();
      getAllMetricsData();
    }
  }, [
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    modes.length,
    movement.length,
    activity.length,
    pathname,
  ]);

  useEffect(() => {
    if (ToggleState === 2) {
      getAllMetricsData();
    }
  }, [
    ToggleState,
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    pathname,
    modes,
    activity,
    movement,
  ]);

  useEffect(() => {
    setPositionTop(
      (window.screen.height -
        document.querySelector(".MuiAppBar-positionFixed")?.clientHeight -
        482) /
      2
    );
    setPositionLeft(
      (window.screen.width -
        document.querySelector(".MuiDrawer-root")?.clientWidth -
        700) /
      2 +
      document.querySelector(".MuiDrawer-root")?.clientWidth
    );
  }, [openMetric]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const {
      source: { index: srcIndex },
      destination: { index: destIndex },
    } = result;
    const restrictIndex = data.findIndex((data) => !data.visibility) - 1;
    if (srcIndex > restrictIndex) {
      return;
    }
    if (destIndex > restrictIndex) {
      return;
    }
    const item = Array.from(data);
    const [reorderItem] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, reorderItem);
    setData(item);
  };
  useEffect(() => {
    firstFalse(data);
  }, [data]);

  const handleLoadingAllMatrix = () => {

    if (loadingAllMatrix) {
      return (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      )
    }
    else if (!loadingAllMatrix && !data.length) {
      return (
        <NothingFoundView />
      )
    }
    else {
      return (
        data.map((data, key) => {
          return (
            <>
              <MoveMetrics
                onChange={() => handleChangeCheckbox(data.metric_id)}
                label={data.name}
                checked={data.visibility}
                id={data.metric_id}
                idx={key}
                arr={data}
                unit={data.unit}
                dashed={moveDash > 0 && moveDash}
                emissionValue={data?.value}
              />
              {moveDash - 1 === key && (
                <Divider
                  variant="middle"
                  sx={{
                    marginTop: "0px !important",
                    marginBottom: "0px !important",
                    borderWidth: "1px",
                  }}
                />
              )}{" "}
            </>
          );
        })
      )
    }
  }

  const handleGridCardSx = (value) => {
    if (!value) {
      return { ...styles().metricCardNAhover, }
    }
    else {
      return { ...styles().metricCardHover }
    }
  }
  return (
    <>
      <div style={styles().metricContainer} onClick={handleClick}>
        <span style={styles().customizeText}>{t("metrics")}</span>
        <img
          width={13}
          height={13}
          src={getImageFromURL(`${IMAGES.NAV4}`)}
          alt={IMAGES.NAV4}
        />
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        type="metricCard"
        anchorEl={anchorEl}
        open={openMetric}
        onClose={handleClose}
        className="showHideDrag"
        sx={{
          "& .MuiModal-backdrop": {
            background: "rgba(0, 0, 0, 0.25)",
          },
          "& .MuiPaper-root": {
            borderRadius: "11px",
            width: "700px",
            top: positionTop && `${positionTop}px!important`,
            left: positionLeft && `${positionLeft}px!important`,
          },
          "& .MuiMenuItem-root": {
            cursor: "grab",
          },
          "& .MuiMenuItem-root:active": {
            backgroundColor: "#e1e1e1 !important",
          },
          "& .MuiMenuItem-root:hover": {
            background: "#ADD8E6",
          },
        }}
      >
        <Typography
          sx={{
            padding: "18px 20px 18px 25px",
            background: "#384144",
            border: "1px solid #384144",
            borderRadius: "11px 11px 0px 0px",
            fontSize: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          component={"div"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Typography
              sx={{ color: "#fff" }}
              component={"span"}
            >
              {t("Selected Cards")} -{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                color: "#fff",
                fontWeight: "600",
              }}
              component={"span"}
            >
              {data.filter((obj) => obj.visibility).length}(5)
            </Typography>
          </Box>

          <Typography
            sx={{ color: "#fff", fontSize: "17px", marginRight: "20px" }}
            component={"span"}
          >
            {t("listOfKpiMetrics")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              width={30}
              height={30}
              src={getImageFromURL(
                ToggleState === 1 ? `${IMAGES.ListWhite}` : `${IMAGES.List}`
              )}
              alt={IMAGES.List}
              onClick={() => toggleTab(1)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <img
              width={23}
              height={25}
              src={getImageFromURL(
                ToggleState === 2 ? `${IMAGES.GridWhite}` : `${IMAGES.Grid}`
              )}
              onClick={() => toggleTab(2)}
              alt={IMAGES.GridWhite}
            />
          </Box>
        </Typography>
        <div className={`content ${getActiveClass(1, "active-content")}`}>
          {ToggleState === 1 ? (
            <DragDropContext onDragStart={ondragstart} onDragEnd={onDragEnd}>
              <MenuList
                className="container-drag scrollbar"
                sx={{
                  height: "350px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "0px",
                }}
              >
                <Droppable id="move-matix" droppableId="droppable" >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ height: "100%" }}
                    >
                      {handleLoadingAllMatrix()}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </MenuList>
            </DragDropContext>
          ) : (
            ""
          )}
        </div>
        <div
          className={`content ${getActiveClass(2, "active-content")} dashboard`}
        >
          {ToggleState === 2 ? (
            <div style={{ padding: "15px", height: 350, overflow: "scroll" }}>
              <Grid container spacing={1}>
                {getAllMetricData?.map(({ name, value, icon, unit }) => {

                  let index = "";
                  let unitArr = [];
                  const textContainer = document.createElement("span");
                  if (unit) {
                    if (unit.includes("CO2e")) {
                      unitArr = unit.split("");
                      index = unit
                        .split("")
                        .findIndex((data) => !isNaN(parseInt(data)));
                    }
                  }

                  if (unitArr.length) {
                    for (let i = 0; i < unitArr.length; i++) {
                      if (i != index) {
                        textContainer.insertAdjacentHTML(
                          "beforeend",
                          unitArr[i]
                        );
                      } else {
                        textContainer.insertAdjacentHTML(
                          "beforeend",
                          unitArr[index].sub()
                        );
                      }
                    }
                  }

                  const textContainerOuter = textContainer.outerHTML;
                  return (
                    <Grid item lg={4} className="metric-card-executive" key={utils.commonFunctions.keyFinder()}>
                      <Grid
                        container
                        style={{ display: "flex" }}
                        className="metric-cards-single executive"
                        sx={handleGridCardSx(value)}
                      >
                        <Grid item md={8} lg={8}>
                          <Typography className="metric-label">
                            {name}
                          </Typography>
                        </Grid>
                        <Grid item md={4} lg={4} className="metric-icon-img">
                          <img
                            className="icon_img"
                            src={icon ? icon : C02Img}
                            style={{ width: "30px" }}
                          />
                        </Grid>
                        <Typography
                          className="all-metric-value"
                          sx={{ fontSize: "1vw !important" }}
                        >
                          {
                            textContainer ? (
                              textContainer.textContent ? (
                                <>
                                  <span>
                                    {
                                      !isNaN(Number(value))
                                        ? Number(value).toLocaleString()
                                        : value
                                    }
                                  </span>
                                  &nbsp;
                                  <span
                                    className="content"
                                    dangerouslySetInnerHTML={{
                                      __html: textContainerOuter,
                                    }}
                                  ></span>
                                </>
                              ) : value ? (
                                !isNaN(Number(value)) ? (
                                  (unit
                                    ? currencySymbol.includes(unit)
                                      ? unit
                                      : ""
                                    : "") +
                                  Number(value).toLocaleString() +
                                  (unit
                                    ? !currencySymbol.includes(unit)
                                      ? " " + unit
                                      : ""
                                    : "")
                                ) : (
                                  value + (unit ? " " + unit : "")
                                )
                              ) : value === 0 ? (
                                `${unit
                                  ? currencySymbol.includes(unit)
                                    ? unit
                                    : ""
                                  : ""
                                } ${value} ${unit
                                  ? !currencySymbol.includes(unit)
                                    ? " " + unit
                                    : ""
                                  : ""
                                }`
                              ) : (
                                "N/A"
                              )
                            ) : value ? (
                              !isNaN(Number(value)) ? (
                                (unit
                                  ? currencySymbol.includes(unit)
                                    ? unit
                                    : ""
                                  : "") +
                                Number(value).toLocaleString() +
                                (unit
                                  ? !currencySymbol.includes(unit)
                                    ? " " + unit
                                    : ""
                                  : "")
                              ) : (
                                value + (unit ? " " + unit : "")
                              )
                            ) : (
                              "N/A"
                            )}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                }
                )}
              </Grid>
            </div>
          ) : (
            ""
          )}
        </div>

        <Typography
          display="flex"
          justifyContent={"space-between"}
          component={"div"}
          style={{
            borderTop: "1px solid #DCDCDC",
            background: "#f5f5f5",
            padding: "20px 20px",
          }}
        >
          <CustomButton
            onClick={handleResetClick}
            override={true}
            buttonWidth={{
              width: "100px",
              height: "28px !important",
            }}
            buttonTextStyle={{
              color: "#1D1E1F",
              fontSize: "16px",
              fontWeight: "500",
            }}
            buttonText={"reset"}
            bgColor={"#D9D9D9"}
          />
          <CustomButton
            override={true}
            onClick={handleMetricSave}
            buttonWidth={{ width: "100px", height: "28px !important" }}
            buttonTextStyle={{
              color: "#F5F5F5",
              fontSize: "16px",
              fontWeight: "400",
            }}
            buttonText={t("save")}
            bgColor={"#C12C37"}
          />
        </Typography>
      </StyledMenu>
      <Box sx={styles().cardFlexBox}>
        {// dashboard 5 metrics
        metricData?.map(({ label, icon, value, iconUrl, unit }) => {
          const calculateFontSize = () => {
            const largValue = metricData?.reduce((acc, obj) => {
              return obj.value.length > acc ? obj.value.length : acc;
            }, 0);

            if (largValue > 13) {
              return `${1}vw`;
            } else if (largValue > 15) {
              return `1vw`;
            } else {
              return "1.5vw";
            }
          };
          let index = "";
          let unitArr = [];
          const valueWithSub = value.split(" ")[0];
          const textContainer = document.createElement("span");
          const valueWithCom = value.split(" ");
          let val12 = "";
          
          if (valueWithCom.length > 1) {
            // console.log("sameer",valueWithCom[2]);
            if(valueWithCom[2]===undefined){
              val12 = `${Number(valueWithCom[0]).toLocaleString()} ${valueWithCom[1]
              }`;
            }else{
              val12 = `${Number(valueWithCom[0]).toLocaleString()} ${valueWithCom[1]
                } ${valueWithCom[2]}`;
            }
          } else if (valueWithCom.length == 1) {
            val12 = valueWithCom[0];
          }
          
          if (unit) {
            if (unit.includes("CO2e")) {
              unitArr = unit.split("");
              index = unit
                .split("")
                .findIndex((data) => !isNaN(parseInt(data)));
            }
          }

          if (unitArr.length) {
            for (let i = 0; i < unitArr.length; i++) {
              if (i != index) {
                textContainer.insertAdjacentHTML("beforeend", unitArr[i]);
              } else {
                textContainer.insertAdjacentHTML(
                  "beforeend",
                  unitArr[index].sub()
                );
              }
            }
          }
          const textContainerOuter = textContainer.outerHTML;
          return (
            <Box
              key={utils.commonFunctions.keyFinder()}
              className="container-hover"
              sx={
                value === "N/A"
                  ? {
                    ...styles(open).cardStyleNA,
                  }
                  : { ...styles(open).cardStyle }
              }
            >
              <Box
                className="label-cont"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography
                    component="div"
                    className="label-container-hover"
                    sx={{
                      margin: "5px 0px",
                      fontSize: "12.5px",
                      fontWeight: "600",
                      color: "#3C3C3C",
                      width: "100%",
                      whiteSpace: "break-spaces",
                    }}
                  >
                    {label}
                  </Typography>
                  <Box
                    className="animation-hover"
                    sx={{
                      "&.MuiBox-root": {
                        margin: "10px 5px 5px 20px",
                        transition: "margin-top 300ms",
                      },
                    }}
                  >
                    <img
                      src={iconUrl ? iconUrl : getImageFromURL(icon)}
                      alt={iconUrl ? iconUrl : getImageFromURL(icon)}
                    />
                  </Box>
                </Box>
                <Box
                  className="value-container-hover"
                  sx={{
                    fontSize: calculateFontSize(),
                  }}
                >
                  {textContainer ? (
                    textContainer.textContent && valueWithSub !== "N/A" ? (
                      <>
                        <span>
                          {!isNaN(Number(valueWithSub))
                            ? Number(valueWithSub).toLocaleString()
                            : valueWithSub}
                        </span>
                        &nbsp;
                        <span
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: textContainerOuter,
                          }}
                        ></span>
                      </>
                    ) : val12 === "N/A" &&
                      label === "% of Earth to Mars Trip" ? (
                      <span style={{ fontSize: "14px" }}>0</span>
                    ) : (
                      <span style={{ fontSize: "14px" }}>
                        {!isNaN(Number(val12))
                          ? Number(val12).toLocaleString() +
                          (unit ? " " + unit : "")
                          : val12.split("")[0] === "$" ? `$${Number(val12.slice(1, val12.length)).toLocaleString()}` : val12}
                      </span>
                    )
                  ) : (
                    value
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
