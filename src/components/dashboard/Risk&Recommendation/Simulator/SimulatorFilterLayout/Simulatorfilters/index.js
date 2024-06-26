import React, { useState } from "react";
import ResetIcon from "src/assets/images/reset-icon.svg";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { Grid } from "@mui/material";
import "./filters.scss";
import { useTranslation } from "react-i18next";
import { CalendarFilter } from "src/components/filters/calendarFilter";
import { SimulatorSelectedFilter } from "./SimulatorSelectedFilter";
import { simulatorFilterActions } from "../simulator-filter-actions";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


export default function SimulatorFilters() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let isSimulator = pathname.includes("simulator")

  const returnFilters = (state) => {
    if (isSimulator) {
      return state.simulatorFilters;
    }
  }
  const {
    setSimulatorBuFilters,
    setSimulatorCountryFilters,
    setSimulatorRegionFilters,
    setSimulatorRemoveFilters,
    setSimulatorScopeFilters,
    setSimulatorTeamFilters,
    setSimulatorModeFilters,
    setSimulatorActivityFilters,
    setSimulatorMovementFilters,
    setSimulatorOriginCountry,
    setSimulatorDestinationCountry,
    setSimulatorOriginCountryName,
    setSimulatorDestinationCountryName,

  } = simulatorFilterActions;

  const { scope, region, country, team, bu, modes, movement, activity, removedFilters, origin_country, destination_country,destination_country_name
,origin_country_name  } = useSelector((state) => returnFilters(state));
  let removedArr = removedFilters;

  // const typeVal = filterBread
  let typeVal = [
    scope,
    region,
    country,
    bu,
    team,
    modes,
    movement,
    activity,
    origin_country_name,
    destination_country_name,
  ]

  function getType(index) {
    switch (index) {
      case 0:
        return 'Scope';
      case 1:
        return 'Region';
      case 2:
        return 'Country';
      case 3:
        return 'BU';
      case 4:
        return 'Team';
      case 5:
        return "Modes";
      case 6:
        return 'Movement';
      case 7:
        return 'Activity';
      case 8:
        return "OriginCountry";
      case 9:
        return "DestinationCountry"
      default:
        return '';
    }
  }
  const objectArray = [];

  typeVal.forEach((values, index) => {
    const type = getType(index);
    values?.forEach(value => {
      objectArray.push({ type, value });
    });
  });

  const { t } = useTranslation();
  const dispatchScopeFilters = (dataVal) => {
    const scopeFilters = scope.filter(
      (data) => data !== dataVal
    );
    dispatch(setSimulatorScopeFilters(scopeFilters));
  }
  const dispatchRegionFilters = (dataVal) => {
    const regionFilters = region.filter(
      (data) => data !== dataVal
    );
    dispatch(setSimulatorRegionFilters(regionFilters));
  }
  const dispatchCountryFilters = (dataVal) => {
    const countryFilters = country.filter(
      (data) => data !== dataVal
    );
    dispatch(setSimulatorCountryFilters(countryFilters));

  }
  const dispatchBuFilters = (dataVal) => {
    const buFilters = bu.filter(
      (data) => data !== dataVal
    );
    dispatch(setSimulatorBuFilters(buFilters));

  }
  const dispatchTeamFilters = (dataVal) => {
    const teamFilters = team.filter(
      (data) => data !== dataVal
    );
    dispatch(setSimulatorTeamFilters(teamFilters))
  }
  const dispatchModesFilters = (dataVal) => {

    const modesFilter = modes.filter(
      (data) => data !== dataVal
      )
      // console.log("MODESFILTER", filterData)
      dispatch(setSimulatorModeFilters(modesFilter))
  }
  const dispatchMovementFilters = (dataVal) => {
    const movementFilter = movement.filter(
      (data) => data !== dataVal
    )
    dispatch(setSimulatorMovementFilters(movementFilter))

  }
  const dispatchActivityFilters = (dataVal) => {
    const activityFilter = activity.filter(
      (data) => data !== dataVal
    )
    dispatch(setSimulatorActivityFilters(activityFilter))

  }
  const dispatchOriginCountryFilters = (dataVal) => {
    console.log(dataVal, "dataVal")
    dispatch(setSimulatorOriginCountry(""))
    // dispatch(setSimulatorOriginCountryName([]))
  }

  const dispatchDestinationCountryFilters = (dataVal) => {
    console.log(dataVal, "dataVal")
    dispatch(setSimulatorDestinationCountry(""))
    // dispatch(setSimulatorDestinationCountryName([]))
  }
  const [filterBreadArr, setFilterBreadArr] = useState({})

  const handleRemoveFilter = (filterData) => {
    // console.log(filterData,objectArray,"fiilterData")
    if (removedArr.findIndex((o) => o === filterData.value) > -1) {
      removedArr = removedArr.filter((data) => data === filterData.value);
    } else {
      removedArr.push(filterData.value);
    }


    if (isSimulator) {
      dispatch(setSimulatorRemoveFilters(removedArr));
      switch (filterData.type) {
        case "Scope":
          dispatchScopeFilters(filterData.value)
          break;
        case "Region":
          dispatchRegionFilters(filterData.value)
          break;
        case "Country":
          dispatchCountryFilters(filterData.value)
          break;
        case "BU":
          dispatchBuFilters(filterData.value)
          break;
        case "Team":
          dispatchTeamFilters(filterData.value)
          break;
        case "Modes":
          dispatchModesFilters(filterData.value)
          break;
        case "Movement":
          dispatchMovementFilters(filterData.value)
          break;
        case "Activity":
          dispatchActivityFilters(filterData.value)
          break
        case "OriginCountry":
          dispatchOriginCountryFilters(filterData.value)
          dispatch(setSimulatorOriginCountryName([]))
          break;
        case "DestinationCountry":
          dispatchDestinationCountryFilters(filterData.value)
          dispatch(setSimulatorDestinationCountryName([]))
          break;

      }
    }
    // onSaveClick()
  };


  const handleFilterArrUpdate = (value) => {
    setFilterBreadArr({ ...filterBreadArr, ...value})
  }

  const handleResetFilter = () => {
    let filterData = []
    objectArray.forEach(data => {
      filterData.push(data.value);
    });

    dispatch(setSimulatorRemoveFilters(filterData))
    dispatch(setSimulatorScopeFilters([]));
    dispatch(setSimulatorRegionFilters([]))
    dispatch(setSimulatorCountryFilters([]))
    dispatch(setSimulatorBuFilters([]))
    dispatch(setSimulatorTeamFilters([]));
    dispatch(setSimulatorModeFilters([]))
    dispatch(setSimulatorMovementFilters([]));
    dispatch(setSimulatorActivityFilters([]));
    dispatch(setSimulatorDestinationCountry(""))
    dispatch(setSimulatorOriginCountry(""))
    dispatch(setSimulatorDestinationCountryName([]))
    dispatch(setSimulatorOriginCountryName([]))

    // onSaveClick()
  };
  // console.log(objectArray, "filterBread")
  return (
    <div className="grid-fill">
      <div className="filterMainDiv"   >
        <Grid
          item
          className="SimulatorMianCont"
        >
          <SimulatorSelectedFilter  filterBreadArr={filterBreadArr} handleFilterArrUpdate={handleFilterArrUpdate} />
          <Grid className="calenderFilterSimulator" ><CalendarFilter /></Grid>
        </Grid>
        {
          // Object.values(filterBreadArr).filter(Boolean).length > 0 
          objectArray.length > 0
          &&
          <div className="filters-container">
            <div className="selected-filters">{t("selectedFilters")}</div>
            <div className="breadcrumb-container">
              {
                // Object.values(filterBreadArr).filter(Boolean).length > 0 && Object.values(filterBreadArr).filter(Boolean)
                objectArray.length > 0 && objectArray
                .map((data, index) => {
                    return <span className="breadCrumb simulator" key={index}>
                      {data.value}
                      <img
                        src={getImageFromURL(`${IMAGES.CROSSFILTERS}`)}
                        alt={IMAGES.CROSSFILTERS}
                        onClick={() => handleRemoveFilter(data)}
                      />
                    </span>
                  })}
              <button
                className="simulatorFilterResetBtn"
                onClick={() => {
                  // handleLeverChange("")
                  // handleClearBread()
                  handleResetFilter()
                }}

                style={{
                  background: "#231F20",
                  height: "26px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  fontSize: "14px",
                  padding: "7px",
                  width: "77px",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  borderRadius: "5px",
                  border: "0px",
                  cursor: "pointer"
                }}
              > <img src={ResetIcon} alt="reset icon" /> Clear</button>
            </div>

          </div>
        }

      </div >

    </div >
  );
}
