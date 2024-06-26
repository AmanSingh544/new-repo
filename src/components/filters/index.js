import React, { useEffect, useState } from "react";
import SelectFilter, { GlobalFilters } from "./selectFilter";
import variants from "./filterConstants";
import { StyledMenu } from "../styledMenu";
import { styles } from "@layouts/styles.js";
import ResetIcon from "src/assets/images/reset-icon.svg";
import {
  Button,
  Checkbox,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  Grid
} from "@mui/material";
import routeNames from "src/constants/routeNames";
import { ReactComponent as ExpandIcon } from "../../assets/images/expand.svg";
import { globalActions } from "src/modules/global-states/global-states-actions";
import { getImageFromURL, IMAGES } from "src/constants/images";
import CustomButton from "src/components/buttons/Buttons";
import { CalendarFilter } from "./calendarFilter";
import { filterActions } from "src/modules/filters/filter-actions";
import { useSelector, useDispatch } from "react-redux";
import "./filters.scss";
import { equivalenceFilterActions } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions/index";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { detailedFilterActions } from "../dashboard/detailed-summary/detailed-filters/detailed-filter-actions";
import utils from "src/utils";
import { graphNames_new as graphNames } from "../../constants/appConstants";


export default function Filters() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { globalState, singleDetailed } =
    useSelector((state) => state.globalRed);
  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;

  const returnFilters = (state) => {
    if (isEquivalence) {
      return state.eqFilters;
    } else if (isDetailed) {
      return state.detailedFilters;
    } else {
      return state.filters;
    }
  }
  const {
    bu,
    team,
    country,
    region,
    scope,
    removedFilters,
  } = useSelector((state) => returnFilters(state));

  const { modes, activity, movement } = useSelector(
    (state) => state.detailedFilters
  );

  const {
    setEnableSignleView,
    setSingleViewInfographic,
    setSingleDetailed,
    setSingleExecutive,
  } = globalActions;
  const { setRemoveFilters } = filterActions;
  const { setEqRemoveFilters } = equivalenceFilterActions;
  const { setDetailedRemoveFilters } = detailedFilterActions;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [seeMore, setSeeMore] = React.useState(false);
  const [moreIndex, setMoreIndex] = React.useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { var1, var_2, var2, var3, var4, var5, var6, var7 } = variants;
  const { t } = useTranslation();
  const filterArr = () => {
    if (isDetailed) {
      return [
        ...scope,
        ...region,
        ...country,
        ...bu,
        ...team,
        ...modes,
        ...movement,
        ...activity,
      ];
    } else {
      return [...scope, ...region, ...country, ...bu, ...team];
    }
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetFilter = () => {
    setMoreIndex(false)
    setSeeMore(false)
    filterArr().forEach((data) => handleRemoveFilter(data));
    handleClose();
  };

  const handleChecked = (e) => {
    handleRemoveFilter(e.target.value);
  };

  let removedArr = removedFilters;
  const handleSingleView = () => {
    if (singleDetailed) {
      navigate(routeNames.detailed);
    } else {
      navigate(routeNames.executive);
    }
    dispatch(setEnableSignleView(false));
    dispatch(setSingleDetailed(false));
    dispatch(setSingleExecutive(false));
    const info = [
      graphNames.EMISSION_TIMELINE,
      graphNames.EMISSION_SCOPES,
      graphNames.EMISSION_BY_REGION,
      graphNames.EMISSION_BY_COUNTRY,
      graphNames.EMISSION_ACROSS_ACTIVITY,
      graphNames.EMISSION_ACROSS_TRANSPORTATION,
      graphNames.SALES_BY_EMISSION,
      graphNames.GHG_WISE_EMISSION,
      graphNames.SUPPLIER_VS_EMISSIONS,
      graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION,
      graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES,
      graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES,
      graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES,
      graphNames.BUSINESS_TRAVEL_VS_EMMISSION,
    ];

    for (let data of info) {
      dispatch(setSingleViewInfographic(data, false));
    }
  };
  const handleRemoveFilter = (filterData) => {
    if (removedArr.findIndex((o) => o === filterData) > -1) {
      removedArr = removedArr.filter((data) => data === filterData);
    } else {
      removedArr.push(filterData);
    }

    if (isEquivalence) {
      dispatch(setEqRemoveFilters(removedArr));
    } else if (isDetailed) {
      dispatch(setDetailedRemoveFilters(removedArr));
    } else {
      dispatch(setRemoveFilters(removedArr));
    }
  };

  const filterArrays = isDetailed
    ? [var1, var3, var_2, var2, var4, var5, var6, var7]
    : [var1, var3, var_2, var2, var4];

  useEffect(() => {
    if (!seeMore) {
      if (document.querySelector(".breadcrumb-container")) {
        let btnWidth = 0
        if (document.querySelector(".singleViewBtn")) {
          btnWidth = document.querySelector(".singleViewBtn").clientWidth
        }
        const widthFilterContainer = document.querySelector(".breadcrumb-container").clientWidth
        const wide = Array.from(document.querySelector(".breadcrumb-container").children).map(el => el.clientWidth).reduce(function (acc, obj) {
          return acc + parseFloat(obj);
        }, 0) + 10 * filterArr().length + btnWidth;
        const percent = Math.round(wide / widthFilterContainer * 100)

        if (percent >= 90) {
          setMoreIndex(filterArr().length)
          setSeeMore(true)
        } else {
          setSeeMore(false)
        }
      }
    }
  }, [document.querySelector(".breadcrumb-container"), filterArr().length]);

  useEffect(() => {
    if (moreIndex) {
      if (filterArr().length < moreIndex) {
        setMoreIndex(false)
        setSeeMore(false)
      }
    }
  }, [moreIndex, filterArr().length])

  useEffect(() => {
    if (filterArr().length === 0) {
      handleClose();
    }
  }, [filterArr().length]);

  const getSingleViewComponent = () => {
    if (!globalState) {
      if (isEquivalence) {
        return null;
      }
      else {
        return (<></>);
      }
    }
    else {
      if (isEquivalence) {
        return null;
      }
      else {
        return (
          <>
            {
              id !== "all-metrics" ? (<></>) : null
            }
            <Button
              variant="contained"
              className="viewBtnSingle"
              style={{
                background: "#D9D9D9",
                minWidth: "40px",
                marginLeft: "5px",
                padding: "6px",
              }}
              onClick={handleSingleView}
            >
              <ExpandIcon />
            </Button>
          </>
        );
      }
    }
  }

  return (
    <div className="grid-fill">
      <div className="filterMainDiv" style={{ width: "100%" }}  >

        {pathname.includes("Equivalence") && (
          <Typography
            sx={{ paddingBottom: "20px", paddingLeft: "10px" }}
            className="cardbx_right_text2"
          >
            {t("how")}{" "}
            <span style={{ borderBottom: "1px solid #333333" }}>
              {t("hitachiEnergy")}
            </span>{" "}
            {t("isDeliveringOnClimateChange")}
          </Typography>
        )}
        <Grid
          item
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", width: `${"100%"}` }}
        >
          <div>
            {/* {filterArrays?.map((data) => {
              return <SelectFilter type={data ? data[0].name : ""} data={data} />;
            })} */}
              <GlobalFilters/>
          </div>
          <CalendarFilter />
        </Grid>
        {filterArr().length !== 0 ? (
          <div className="filters-container">
            <div className="selected-filters">{t("selectedFilters")}</div>
            <div className="breadcrumb-container">
              {
                moreIndex
                  ?
                  filterArr()
                    ?.slice(0, moreIndex)
                    ?.map((data) => {
                      return (
                        <span className="breadCrumb" key={utils.commonFunctions.keyFinder()}>
                          {data}
                          <img
                            src={getImageFromURL(`${IMAGES.CROSSFILTERS}`)}
                            alt={IMAGES.CROSSFILTERS}
                            onClick={() => handleRemoveFilter(data)}
                          />
                        </span>
                      );
                    })
                  :
                  filterArr()?.map((data) => {
                    return (
                      <span className="breadCrumb" key={utils.commonFunctions.keyFinder()}>
                        {data}
                        <img
                          src={getImageFromURL(`${IMAGES.CROSSFILTERS}`)}
                          alt={IMAGES.CROSSFILTERS}
                          onClick={() => handleRemoveFilter(data)}
                        />
                      </span>
                    );
                  })
              }

              {!moreIndex && <Tooltip title={"Reset Filters"} placement="right-start" arrow>
                <div
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    marginLeft: "3px",
                    padding: "5px 10px",
                    background: "#b1000e",
                    borderRadius: "3px",
                  }}
                  onClick={handleResetFilter}
                >
                  <img src={ResetIcon} alt="reset icon" />
                </div>
              </Tooltip>}
              {moreIndex ? (
                <a
                  style={{
                    fontSize: "14px",
                    paddingTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  {" "}
                  {t("seeMore")}
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : null}
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiModal-backdrop": {
              background: "rgba(0, 0, 0, 0.25)",
            },
            "& .MuiPaper-root": {
              borderRadius: "11px",
              width: "600px",
              left: "30% !important",
              top: "20%!important",
            },
            "& .MuiMenuItem-root": {
              cursor: "grab",
            },
            "& .MuiMenuItem-root:active": {
              backgroundColor: "#ADD8E6 !important",
            },
            "& .MuiMenuItem-root:hover": {
              background: "#ADD8E6",
            },
          }}
        >
          <Typography
            component={"div"}
            sx={{
              padding: "20px 20px 20px 10px",
              background: "#b1000e",
              border: "1px solid #b1000e",
              borderRadius: "11px 11px 0px 0px",
            }}
            disableRipple
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                fontSize: "17px",
              }}
              component={"span"}
            >
              {t("selectedFilters")}
            </Typography>
            <Typography
              sx={{
                float: "right",
                fontWeight: "600",
                color: "#fff",
              }}
              component={"span"}
              className="infoData-font"
            >
              Selected - {filterArr().length}
            </Typography>
          </Typography>
          <MenuList
            sx={{
              height: "350px",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0px",
            }}
            className="scrollbar"
          >
            {filterArr()?.map((i) => {
              return (
                <>
                  <MenuItem
                    sx={{
                      padding: "8px 15px",
                    }}
                    disableRipple
                  >
                    <Checkbox
                      disableRipple
                      color="default"
                      value={i}
                      onClick={handleChecked}
                    />
                    <Typography
                      className="infoData-font"
                      sx={{ marginLeft: "30px", width: "85%" }}
                      component={"span"}
                    >
                      {i}
                    </Typography>
                  </MenuItem>
                </>
              );
            })}
          </MenuList>
          <Typography
            display="flex"
            justifyContent={"space-between"}
            component={"div"}
            style={{ borderTop: "1px solid #DCDCDC", padding: "20px 20px" }}
          >
            <CustomButton
              onClick={handleResetFilter}
              override={true}
              buttonWidth={{
                width: "100px",
                height: "28px !important",
                marginRight: "auto",
              }}
              buttonTextStyle={{
                color: "#1D1E1F",
                fontSize: "16px",
                fontWeight: "400",
              }}
              buttonText={t("reset")}
              bgColor={"#D9D9D9"}
            />
          </Typography>
        </StyledMenu>
      </div>
      <div className="singleViewBtn" style={{ margin: "1px 5px 0px 5px" }}>
        <Grid item className="viewBtnDiv" style={styles.alignFlexEnd}>
          {getSingleViewComponent()}
        </Grid>
      </div>
    </div>
  );
}