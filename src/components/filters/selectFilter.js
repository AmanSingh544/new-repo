import React, { useState, useRef, useEffect } from "react";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import { getRegionNameAbb } from "src/utils/utilityFunction";
import variants from "./filterConstants";
import { useRequestApi } from "src/customHooks/useRequestApi";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "src/modules/filters/filter-actions";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemText from "@mui/material/ListItemText";
import { styles } from "./filterStyles";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { globalActions } from "src/modules/global-states/global-states-actions";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";
import { equivalenceFilterActions } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions/index";
import { detailedFilterActions } from "../dashboard/detailed-summary/detailed-filters/detailed-filter-actions";
import constants from "src/constants";
import { simulatorFilterActions } from "../dashboard/Risk&Recommendation/Simulator/SimulatorFilterLayout/simulator-filter-actions";
import Loader from "../loader";


export const dispatchSimulatorModeFilters = (item, modes, setSimulatorModeFilters, dispatch) => {

  if (!item.name.includes("All")) {
    if (modes.findIndex((o) => o === item.name) >= 0) {
      dispatch(
        setSimulatorModeFilters(modes.filter((x) => x !== item.name))
      );
    } else {
      dispatch(setSimulatorModeFilters([item.name]));
    }
  }
}

export function GlobalFilters() {

  const { pathname } = useLocation();
  const { singleDetailed } = useSelector(
    (state) => state.globalRed
  );
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;

  const { var1, var2, var3, var4, var5, var6, var7 } = variants;

  const filterArrays = isDetailed
    ? [var1, var3, var2, var4, var5, var6, var7]
    : [var1, var3, var2, var4];

  const [globalFilterdata, setglobalFilterData] = useState();
  const [isToShow, setIsToShow] = useState(false);
  const { request } = useRequestApi();

  const getTenantId = () => {
    if (localStorage.getItem("user")) {
      const { tenant_id } = JSON.parse(localStorage.getItem("user"));
      return tenant_id;
    }
    return "";
  };

  useEffect(() => {
    const fetchDataAndExecuteEffect = async () => {
      try {
        setIsToShow(false);
        const response = await request(
          constants.apiConstants.METHOD_GET,
          constants.endPoints.allFilters(getTenantId()),
          null
        );

        const { data } = response;
        setglobalFilterData(data?.result?.data);
        if (globalFilterdata.length > 0) setIsToShow(true)
        console.log("ALL FILTER DATA", data?.result?.data);
      } catch (err) {
        // Handle errors
        setIsToShow(true);
      }
    };

    fetchDataAndExecuteEffect();
  }, []); // Empty dependency array to execute once on mount

  return (
    <>
      <div>
        {isToShow ? (
          <div>
            {filterArrays?.map((data, index) => (
              <SelectFilter key={index} type={data ? data[0]?.name : ""} data={data} allFilterData={globalFilterdata} />
            ))}
          </div>
        )
          //}
          : (
            <div style={{marginLeft:'30em'}}>
              <Loader/>
            </div>
          )}
      </div>
    </>);
}

export default function SelectFilter({ data, type, allFilterData }) {
  //Filter dropdowns
  const {
    setScopeFilters,
    setBuFilters,
    setCountryFilters,
    setRegionFilters,
    setTeamFilters,
    setRemoveFilters,
    setTeamFiltersWithIds,
    setBuFilterWithIds,
  } = filterActions;
  const {
    setEqScopeFilters,
    setEqBuFilters,
    setEqRegionFilters,
    setEqCountryFilters,
    setEqTeamFilters,
    setEqRemoveFilters,
    setEqBuFilterWithIds,
    setEqTeamFiltersWithIds,
  } = equivalenceFilterActions;

  const { setAllRegions } = globalActions;

  const {
    setDetailedBuFilterWithIds,
    setDetailedBuFilters,
    setDetailedCountryFilters,
    setDetailedRegionFilters,
    setDetailedRemoveFilters,
    setDetailedScopeFilters,
    setDetailedTeamFilters,
    setDetailedModeFilters,
    setDetailedActivityFilters,
    setDetailedMovementFilters,
    setDetailedTeamFiltersWithIds,
  } = detailedFilterActions;

  const {
    setSimulatorBuFilterWithIds,
    setSimulatorBuFilters,
    setSimulatorCountryFilters,
    setSimulatorRegionFilters,
    setSimulatorRemoveFilters,
    setSimulatorScopeFilters,
    setSimulatorTeamFilters,
    setSimulatorTeamFiltersWithIds,
    setSimulatorModeFilters,
    setSimulatorMovementFilters,
    setSimulatorActivityFilters
  } = simulatorFilterActions;

  const { var1, var_2, var2, var3, var4, var5, var6, var7 } = variants;
  const { pathname } = useLocation();
  const { singleDetailed } = useSelector(
    (state) => state.globalRed
  );
  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed-summary") || singleDetailed;
  let isSimulator = pathname.includes("simulator")
  const [filterValue, setFilterValue] = useState(data);


  // **********************************************

  const [allData, setAllData] = useState();


  const getTenantId = () => {
    if (localStorage.getItem("user")) {
      const { tenant_id } = JSON.parse(localStorage.getItem("user"));
      return tenant_id;
    }
    return "";
  };

  const fetchAllFiltersData = async () => {
    const response = await request(
      constants.apiConstants.METHOD_GET,
      constants.endPoints.allFilters(getTenantId()),
      null
    );

    try {
      const { data } = response;
      setAllData(data?.result?.data)
      // console.log("ALL FILTER DATA", data?.result?.data);
    } catch (err) {
    }
  };

  // ***********************************allData?.regions*****

  const fetchRegions = async () => {
    const mappedRegion = allData?.regions ? Object.keys(allData?.regions)?.map((item) => {
      return { id: item, name: getRegionNameAbb(allData?.regions[item]) };
    }) : [];
    const regionFilter = [
      {
        id: 11,
        name: "All Region",
        slug: "all r/c*",
        type: "SubMain",
        locale: "en",
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null,
        options: mappedRegion,
      },
    ];
    setFilterValue(regionFilter);

  };

  const fetchModes = async () => {
    const mappedMode = allData?.modes ? Object.keys(allData?.modes)?.map((item) => {
      return { id: item, name: allData?.modes[item] };
    }) : [];


    const modeFilter = [
      {
        id: 11,
        slug: "modes",
        name: "All Modes",
        type: "SubMain",
        locale: "en",
        options: mappedMode,
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null
      },
    ];
    setFilterValue(modeFilter);

  };


  const fetchMovement = async () => {
    const allMovement = allData?.movement_type ? Object.keys(allData?.movement_type)?.map((item) => {
      return { id: item, name: allData?.movement_type[item] };
    }) : [];


    const movementFilter = [
      {
        id: 11,
        slug: "movement type",
        type: "SubMain",
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null,
        options: allMovement,
        name: "Movement Type",
        locale: "en"
      },
    ];
    setFilterValue(movementFilter);

  };

  const fetchActivity = async () => {
    const allActivity = allData?.activities ? Object.keys(allData?.activities)?.map((item) => {
      return { id: item, name: allData?.activities[item] };
    }) : [];


    const activityFilter = [
      {
        id: 89,
        slug: "activity type",
        cover: null,
        options: allActivity,
        type: "SubMain",
        locale: "en",
        created_at: "2021-11-15T08:30:22.000Z",
        name: "All Activity",
        updated_at: "2021-11-15T08:30:22.000Z",
      },
    ];
    setFilterValue(activityFilter);

  };



  const fetchCountries = async () => {
    const mappedCountry = allData?.countries ? Object.keys(allData?.countries)?.map((countryCode) => {
      return { id: countryCode, name: allData?.countries[countryCode] };
    }) : [];
    // dispatch(setEqBuFilterWithIds(data));
    // dispatch(setDetailedBuFilterWithIds(data));
    // dispatch(setSimulatorBuFilterWithIds(data))
    // dispatch(setBuFilterWithIds(data));
    const countryFilter = [
      {
        id: 11,
        name: "All Country",
        slug: "all r/c*",
        type: "SubMain",
        locale: "en",
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null,
        options: mappedCountry,
      },
    ];
    setFilterValue(countryFilter);

  };


  useEffect(() => {
    setAllData(allFilterData);
    //fetchAllFiltersData()
  }, [])


  // ***************************************************
  const filterDefault = (type) => {
    let defaultFilter;
    if (isDetailed) {
      switch (type) {
        case "All Scopes":
          defaultFilter = var1;
          break;
        case "All Region":
          defaultFilter = var_2;
          break;
        case "All Country":
          defaultFilter = var2;
          break;
        case "All BU":
          defaultFilter = var3;
          break;
        case "All Team":
          defaultFilter = var4;
          break;
        case "All Modes":
          defaultFilter = var5;
          break;
        case "Movement Type":
          defaultFilter = var6;
          break;
        case "All Activity":
          defaultFilter = var7;
          break;
        default:
          defaultFilter = [];
      }
    } else if (isSimulator) {
      switch (type) {
        case "All Scopes":
          defaultFilter = var1;
          break;
        case "All Region":
          defaultFilter = var_2;
          break;
        case "All Country":
          defaultFilter = var2;
          break;
        case "All BU":
          defaultFilter = var3;
          break;
        case "All Team":
          defaultFilter = var4;
          break;
        case "All Modes":
          defaultFilter = var5;
          break;
        case "Movement Type":
          defaultFilter = var6;
          break;
        case "All Activity":
          defaultFilter = var7;
          break;
        default:
          defaultFilter = [];
      }
    }
    else {
      switch (type) {
        case "All Scopes":
          defaultFilter = var1;
          break;
        case "All Region":
          defaultFilter = var_2;
          break;
        case "All Country":
          defaultFilter = var2;
          break;
        case "All BU":
          defaultFilter = var3;
          break;
        case "All Team":
          defaultFilter = var4;
          break;
        default:
          defaultFilter = [];
      }
    }

    return defaultFilter;
  };
  const dispatch = useDispatch();

  const getFilters = (state) => {
    if (isEquivalence) {
      return state.eqFilters;
    }
    else if (isDetailed) {
      return state.detailedFilters;
    }
    else if (isSimulator) {
      return state.simulatorFilters;
    }
    else {
      return state.filters;
    }
  }

  const {
    bu,
    team,
    scope,
    region,
    country,
    removedFilters,
    bu_filters
  } = useSelector((state) => getFilters(state));
  const { modes, activity, movement } = useSelector(
    (state) => {
      if (isSimulator) {
        console.log("sim", state.simulatorFilters)
        return state.simulatorFilters
      }
      else {
        return state.detailedFilters
      }
    }

  );

  const [open, setOpen] = useState(false);
  const { request } = useRequestApi();
  const [position, setPosition] = useState(0);
  const inputRef = useRef(null);
  // *****************************
  const settingState = (e) => {
    if (type === "All BU") {
      if (Array.from(e.target.classList).includes("MuiSelect-select")) {
        setOpen(!open);
      }
    }



    if (type === "All Team") {
      if (Array.from(e.target.classList).includes("MuiSelect-select")) {
        setOpen(!open);
      }
    }
  }
  // ******************************

  const handleToggle = (e) => {
    if (
      type === "All Country" ||
      type === "All Scopes" ||
      type === "All Region" ||
      type === "All Modes" ||
      type === "Movement Type" ||
      type === "All Activity"
    ) {
      if (Array.from(e.target.classList).includes("MuiSelect-select")) {
        setOpen(!open);
      }
    } else {
      settingState(e);
    }
  };



  // const fetchRegions = async () => {
  //   const response = await request(
  //     constants.apiConstants.METHOD_GET,
  //     constants.endPoints.regionList(getTenantId()),
  //     null
  //   );
  //   try {
  //     const { data } = response;
  //     const regionWiseData = data?.results;
  //     dispatch(setAllRegions(regionWiseData));
  //     const mappedRegion = regionWiseData?.map((item) => {
  //       return { id: item.id, name: getRegionNameAbb(item.region_name) };
  //     });
  //     const regionFilter = [
  //       {
  //         id: 11,
  //         name: "All Region",
  //         slug: "all r/c*",
  //         type: "SubMain",
  //         locale: "en",
  //         created_at: "2021-11-15T08:30:22.000Z",
  //         updated_at: "2021-11-15T08:30:22.000Z",
  //         cover: null,
  //         options: mappedRegion,
  //       },
  //     ];

  //     setFilterValue(regionFilter);
  //   } catch (err) {
  //   }
  // };

  // const fetchCountries = async () => {
  //   const response = await request(
  //     constants.apiConstants.METHOD_GET,
  //     constants.endPoints.businessUnitList(getTenantId()),
  //     null
  //   );

  //   try {
  //     const { data } = response;
  //     console.log("fetchCountriesfetchCountries", data)
  //     const key = "country";
  //     const mappedCountry = [
  //       ...new Map(data?.map((item) => [item[key], item])).values(),
  //     ].map((item) => {
  //       return { id: item.id, name: item.country };
  //     });
  //     dispatch(setEqBuFilterWithIds(data));
  //     dispatch(setDetailedBuFilterWithIds(data));
  //     dispatch(setSimulatorBuFilterWithIds(data))
  //     dispatch(setBuFilterWithIds(data));

  //     const countryFilter = [
  //       {
  //         id: 11,
  //         name: "All Country",
  //         slug: "all r/c*",
  //         type: "SubMain",
  //         locale: "en",
  //         created_at: "2021-11-15T08:30:22.000Z",
  //         updated_at: "2021-11-15T08:30:22.000Z",
  //         cover: null,
  //         options: mappedCountry,
  //       },
  //     ];
  //     setFilterValue(countryFilter);
  //   } catch (err) {
  //   }
  // };

  const setFiltersFunc = (filteredBu) => {
    if (isEquivalence) {
      dispatch(setEqBuFilters(filteredBu));
    }
    else if (isDetailed) {
      dispatch(setDetailedBuFilters(filteredBu));
    }
    else if (isSimulator) {
      dispatch(setSimulatorBuFilters(filteredBu))
    }
    else {
      dispatch(setBuFilters(filteredBu));
    }
  }

  const fetchBUs = () => {
    const mappedBu = allData?.bu_list ? Object.keys(allData?.bu_list)?.map((item) => {
      return { id: item, name: allData?.bu_list[item] };
    }) : [];


    const buFilter = [
      {
        id: 11,
        name: "All BU",
        slug: "all bu",
        type: "SubMain",
        locale: "en",
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null,
        options: mappedBu,
      },
    ];

    setFilterValue((prevState) => {
      for (let i = 0; i < mappedBu?.length; i++) {
        if (
          prevState.findIndex((item) => item.name === mappedBu[i].name) >= 0
        ) {
          buFilter.push(mappedBu[i]);
        }
      }
      return buFilter;
    });

    for (let i = 0; i < mappedBu?.length; i++) {
      if (bu.findIndex((item) => item === mappedBu[i].name) >= 0) {
        buFilter.push(mappedBu[i]);
      }
    }

    const filteredBu = buFilter
      .filter((data) => !data.name.includes("All"))
      .map((data) => data.name);

    setFiltersFunc(filteredBu);
    dispatch(setDetailedBuFilterWithIds(allData?.bu_list ? Object.keys(allData?.bu_list)?.map((item) => {
      return { id: item, name: allData?.bu_list[item] };
    }) : []));
  };

  const dispatchFilteredTeamsFunc = (filteredTeams) => {
    if (isEquivalence) {
      dispatch(setEqTeamFilters(filteredTeams));
    }
    else if (isDetailed) {
      dispatch(setDetailedTeamFilters(filteredTeams));
    }
    else if (isSimulator) {
      dispatch(setSimulatorTeamFilters(filteredTeams));
    }
    else {
      dispatch(setTeamFilters(filteredTeams));
    }
  }

  const dispatchEqTeamFiltersWithIds = (teamsFetched) => {
    if (isEquivalence) {
      dispatch(setEqTeamFiltersWithIds(teamsFetched));
    }
    else if (isDetailed) {
      dispatch(setDetailedTeamFiltersWithIds(teamsFetched));
    }
    else if (isSimulator) {
      dispatch(setSimulatorTeamFiltersWithIds(teamsFetched));
    }
    else {
      dispatch(setTeamFiltersWithIds(teamsFetched));
    }
  }

  const fetchTeams = async () => {

    const mappedTeams = allData?.teams ? Object.keys(allData?.teams)?.map((item) => {
      return { id: item, name: allData?.teams[item] };
    }) : [];
    const teamFilter = [
      {
        id: 11,
        name: "All Team",
        slug: "all team",
        type: "SubMain",
        locale: "en",
        created_at: "2021-11-15T08:30:22.000Z",
        updated_at: "2021-11-15T08:30:22.000Z",
        cover: null,
        options: mappedTeams,
      },
    ];
    // dispatchEqTeamFiltersWithIds(teamsFetched);

    setFilterValue((prevState) => {
      for (const mappedTeam of mappedTeams) {
        if (
          prevState.findIndex((item) => item.name === mappedTeam.name) >= 0
        ) {
          teamFilter.push(mappedTeam);
        }
      }
      return teamFilter;
    });

    for (const mappedTeam of mappedTeams) {
      if (team.findIndex((item) => item === mappedTeam.name) >= 0) {
        teamFilter.push(mappedTeam);
      }
    }

    const filteredTeams = teamFilter
      .filter((data) => !data.name.includes("All"))
      .map((data) => data.name);

    dispatchFilteredTeamsFunc(filteredTeams);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allScopesDispatchFunc = (item) => {
    if (scope.findIndex((o) => o === item.name) >= 0) {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqScopeFilters(scope.filter((x) => x !== item.name)));
            break;
          case isDetailed:
            dispatch(setDetailedScopeFilters(scope.filter((x) => x !== item.name)));
            break;
          case isSimulator:
            dispatch(setSimulatorScopeFilters(scope.filter((x) => x !== item.name)));
            break;
          default:
            dispatch(setScopeFilters(scope.filter((x) => x !== item.name)));
            break;
        }
      }
    } else {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqScopeFilters([...scope, item.name]));
            break;
          case isDetailed:
            dispatch(setDetailedScopeFilters([...scope, item.name]));
            break;
          case isSimulator:
            dispatch(setSimulatorScopeFilters([...scope, item.name]));
            break;
          default:
            dispatch(setScopeFilters([...scope, item.name]));
            break;
        }
      }
    }
  }

  const allRegionDispatchFunc = (item) => {
    if (region.findIndex((o) => o === item.name) >= 0) {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqRegionFilters(region.filter((x) => x !== item.name)));
            break;
          case isDetailed:
            dispatch(setDetailedRegionFilters(region.filter((x) => x !== item.name)));
            break;
          case isSimulator:
            dispatch(setSimulatorRegionFilters(region.filter((x) => x !== item.name)));
            break;

          default:
            dispatch(setRegionFilters(region.filter((x) => x !== item.name)));
            break;
        }
      }
    } else {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqRegionFilters([...region, item.name]));
            break;
          case isDetailed:
            dispatch(setDetailedRegionFilters([...region, item.name]));
            break;
          case isSimulator:
            dispatch(setSimulatorRegionFilters([...region, item.name]));
            break;
          default:
            dispatch(setRegionFilters([...region, item.name]));
            break;
        }
      }
    }
  }

  const allCountryDispatchFunc = (item) => {
    if (country.findIndex((o) => o === item.name) >= 0) {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqCountryFilters(country.filter((x) => x !== item.name)));
            break;
          case isDetailed:
            dispatch(setDetailedCountryFilters(country.filter((x) => x !== item.name)));
            break;
          case isSimulator:
            dispatch(setSimulatorCountryFilters(country.filter((x) => x !== item.name)));
            break;
          default:
            dispatch(setCountryFilters(country.filter((x) => x !== item.name)));
            break;
        }
      }
    } else {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqCountryFilters([...country, item.name]));
            break;
          case isDetailed:
            dispatch(setDetailedCountryFilters([...country, item.name]));
            break;
          case isSimulator:
            dispatch(setSimulatorCountryFilters([...country, item.name]));
            break;
          default:
            dispatch(setCountryFilters([...country, item.name]));
            break;
        }
      }
    }
  }

  const allBuDispatchFuc = (item) => {
    if (bu.findIndex((o) => o === item.name) >= 0) {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqBuFilters(bu.filter((x) => x !== item.name)));
            break;
          case isDetailed:
            dispatch(setDetailedBuFilters(bu.filter((x) => x !== item.name)));
            break;
          case isSimulator:
            dispatch(setSimulatorBuFilters(bu.filter((x) => x !== item.name)));
            break;
          default:
            dispatch(setBuFilters(bu.filter((x) => x !== item.name)));
            break;
        }
      }
    } else {
      if (!item.name.includes("All")) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqBuFilters([...bu, item.name]))
            break;
          case isDetailed:
            dispatch(setDetailedBuFilters([...bu, item.name]))
            break;
          case isSimulator:
            dispatch(setSimulatorBuFilters([...bu, item.name]))
            break;
          default:
            dispatch(setBuFilters([...bu, item.name]));
            break;
        }
      }
    }
  }

  const allTeamDispatchFunc = (item) => {
    if (!item.name.includes("All")) {
      if (team.findIndex((o) => o === item.name) >= 0) {
        switch (true) {
          case isEquivalence:
            dispatch(setEqTeamFilters(team.filter((x) => x !== item.name)));
            break;
          case isDetailed:
            dispatch(setDetailedTeamFilters(team.filter((x) => x !== item.name)));
            break;
          case isSimulator:
            dispatch(setSimulatorTeamFilters(team.filter((x) => x !== item.name)));
            break;
          default:
            dispatch(setTeamFilters(team.filter((x) => x !== item.name)));
            break;
        }
      } else {
        switch (true) {
          case isEquivalence:
            dispatch(setEqTeamFilters([...team, item.name]));
            break;
          case isDetailed:
            dispatch(setDetailedTeamFilters([...team, item.name]));
            break;
          case isSimulator:
            dispatch(setSimulatorTeamFilters([...team, item.name]));
            break;
          default:
            dispatch(setTeamFilters([...team, item.name]));
            break;
        }
      }
    }
  }

  const dispatchDetailedModeFilters = (item) => {

    if (!item.name.includes("All")) {
      if (modes.findIndex((o) => o === item.name) >= 0) {
        dispatch(
          setDetailedModeFilters(modes.filter((x) => x !== item.name))
        );
      } else {
        dispatch(setDetailedModeFilters([...modes, item.name]));
      }
    }
  }
  const dispatchSimulatorModeFilters = (item) => {
    if (!item.name.includes("All")) {
      if (modes.findIndex((o) => o === item.name) >= 0) {
        console.log(item, "itemcheck")
        dispatch(
          setSimulatorModeFilters(modes.filter((x) => x !== item.name))
        );
      } else {
        console.log(item, "itemcheck")
        dispatch(setSimulatorModeFilters([...modes, item.name]));
      }
    }
  }

  const dispatchDetailedMovementFilters = (item) => {
    if (!item.name.includes("All")) {
      if (movement.findIndex((o) => o === item.name) >= 0) {
        dispatch(
          setDetailedMovementFilters(
            movement.filter((x) => x !== item.name)
          )
        );
      } else {
        dispatch(setDetailedMovementFilters([...movement, item.name]));
      }
    }
  }
  const dispatchSimulatorMovementFilters = (item) => {
    if (!item.name.includes("All")) {
      if (movement.findIndex((o) => o === item.name) >= 0) {
        dispatch(
          setSimulatorMovementFilters(
            movement.filter((x) => x !== item.name)
          )
        );
      } else {
        dispatch(setSimulatorMovementFilters([...movement, item.name]));
      }
    }
  }

  const dispatchDetailedActivityFilters = (item) => {
    if (!item.name.includes("All")) {
      if (activity.findIndex((o) => o === item.name) >= 0) {
        dispatch(
          setDetailedActivityFilters(
            activity.filter((x) => x !== item.name)
          )
        );
      } else {
        dispatch(setDetailedActivityFilters([...activity, item.name]));
      }
    }
  }
  const dispatchSimulatorActivityFilters = (item) => {
    if (!item.name.includes("All")) {
      if (activity.findIndex((o) => o === item.name) >= 0) {
        dispatch(
          setSimulatorActivityFilters(
            activity.filter((x) => x !== item.name)
          )
        );
      } else {
        dispatch(setSimulatorActivityFilters([...activity, item.name]));
      }
    }
  }

  const allModesDispatchFunc = (item) => {
    if (isSimulator) {
      // console.log(item,"value")
      switch (type) {
        case "All Modes":
          dispatchSimulatorModeFilters(item);
          break;

        case "Movement Type":
          dispatchSimulatorMovementFilters(item);
          break;

        case "All Activity":
          dispatchSimulatorActivityFilters(item);
          break;
      }
    }
    else {
      switch (type) {
        case "All Modes":
          dispatchDetailedModeFilters(item);
          break;

        case "Movement Type":
          dispatchDetailedMovementFilters(item);
          break;

        case "All Activity":
          dispatchDetailedActivityFilters(item);
          break;
      }
    }

  }


  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value, "itemcheck")
    value.forEach((item) => {
      switch (type) {
        case "All Scopes":
          allScopesDispatchFunc(item);
          break;
        case "All Region":
          allRegionDispatchFunc(item);
          break;
        case "All Country":
          allCountryDispatchFunc(item);
          break;
        case "All BU":
          allBuDispatchFuc(item);
          break;
        case "All Team":
          allTeamDispatchFunc(item);
          break;
        default:
          allModesDispatchFunc(item);
          break;
      }
    });
  };

  useEffect(() => {
    if (allData) {
      if (type === "All Country") {
        fetchCountries();
      }
      if (type === "All BU") {
        fetchBUs();
      }
      if (type === "All Region") {
        fetchRegions();
      }
    }
  }, [allData]);

  // useEffect(() => {
  //   if (allData) {

  //   }
  // }, [allData]);

  // useEffect(() => {
  //   if (allData) {
  //     if (type === "All BU") {
  //       fetchBUs();
  //     }
  //     if (type === "All Country") {
  //       fetchCountries();
  //     }
  //   }
  // }, [allData]);

  useEffect(() => {
    if (allData) {
      if (type === "All Team") {
        let buIds = bu_filters
          ?.filter((data) => country.includes(data.country))
          ?.map((data) => {
            if (bu.includes(data.name)) {
              return data.id;
            }
          })
          ?.filter((data) => data);
        fetchTeams(country.length ? buIds : []);
      }
    }
  }, [allData]);

  useEffect(() => {
    if (allData) {
      if (type === "All Modes") {
        fetchModes();
      }
    }
  }, [allData]);

  useEffect(() => {
    if (allData) {
      if (type === "Movement Type") {
        fetchMovement();
      }
    }
  }, [allData]);

  useEffect(() => {
    if (allData) {
      if (type === "All Activity") {
        fetchActivity();
      }
    }
  }, [allData]);

  const dispatchScopeFilters = () => {
    const scopeFilters = scope.filter(
      (data) => !removedFilters?.includes(data)
    );
    switch (true) {
      case isEquivalence:
        dispatch(setEqScopeFilters(scopeFilters));
        break;
      case isDetailed:
        dispatch(setDetailedScopeFilters(scopeFilters));
        break;
      case isSimulator:

        dispatch(setSimulatorScopeFilters(scopeFilters));
        break;
      default:
        dispatch(setScopeFilters(scopeFilters));
        break;
    }
  }

  const dispatchRegionFilters = () => {
    const regionFilters = region.filter(
      (data) => !removedFilters?.includes(data)
    );
    switch (true) {
      case isEquivalence:
        dispatch(setEqRegionFilters(regionFilters));
        break;
      case isDetailed:
        dispatch(setDetailedRegionFilters(regionFilters));
        break;
      case isSimulator:

        dispatch(setSimulatorRegionFilters(regionFilters));
        break;
      default:
        dispatch(setRegionFilters(regionFilters));
        break;
    }
  }

  const dispatchCountryFilters = () => {
    const countryFilters = country.filter(
      (data) => !removedFilters?.includes(data)
    );
    switch (true) {
      case isEquivalence:
        dispatch(setEqCountryFilters(countryFilters));
        break;
      case isDetailed:
        dispatch(setDetailedCountryFilters(countryFilters));
        break;
      case isSimulator:

        dispatch(setSimulatorCountryFilters(countryFilters));
        break;
      default:
        dispatch(setCountryFilters(countryFilters));
        break;
    }
  }
  const dispatchBuFilters = () => {
    const buFilters = bu.filter((data) => !removedFilters?.includes(data));
    switch (true) {
      case isEquivalence:
        dispatch(setEqBuFilters(buFilters));
        break;
      case isDetailed:
        dispatch(setDetailedBuFilters(buFilters));
        break;
      case isSimulator:

        dispatch(setSimulatorBuFilters(buFilters));
        break;
      default:
        dispatch(setBuFilters(buFilters));
        break;
    }
  }

  const dispatchTeamFilters = () => {
    const teamFilters = team.filter(
      (data) => !removedFilters?.includes(data)
    );
    switch (true) {
      case isEquivalence:
        dispatch(setEqTeamFilters(teamFilters))
        break;
      case isDetailed:
        dispatch(setDetailedTeamFilters(teamFilters))
        break;
      case isSimulator:

        dispatch(setSimulatorTeamFilters(teamFilters))
        break;
      default:
        dispatch(setTeamFilters(teamFilters));
        break;
    }
  }

  const dispatchRemovedFilters = () => {
    if (isDetailed) {
      switch (type) {
        case "All Modes":
          const modeFilters = modes.filter((data) => !removedFilters?.includes(data));
          dispatch(setDetailedModeFilters(modeFilters));
          break;

        case "Movement Type":
          const movementFilters = movement.filter((data) => !removedFilters?.includes(data));
          dispatch(setDetailedMovementFilters(movementFilters));
          break;

        case "All Activity":
          const activityFilters = activity.filter((data) => !removedFilters?.includes(data));
          dispatch(setDetailedActivityFilters(activityFilters));
          break;
      }
    }
    // else if (isSimulator) {

    //   switch (type) {
    //     case "All Modes":
    //       const modeFilters = modes.filter((data) => !removedFilters?.includes(data));
    //       dispatch(setSimulatorModeFilters(modeFilters));
    //       break;

    //     case "Movement Type":
    //       const movementFilters = movement.filter((data) => !removedFilters?.includes(data));
    //       dispatch(setSimulatorMovementFilters(movementFilters));
    //       break;

    //     case "All Activity":
    //       const activityFilters = activity.filter((data) => !removedFilters?.includes(data));
    //       dispatch(setSimulatorActivityFilters(activityFilters));
    //       break;
    //   }
    // }
  }

  useEffect(() => {
    if (type) {
      if (type === "All Scopes") {
        dispatchScopeFilters();
      } else if (type === "All Region") {
        dispatchRegionFilters()
      } else if (type === "All Country") {
        dispatchCountryFilters();
      } else if (type === "All BU") {
        dispatchBuFilters();
      } else if (type === "All Team") {
        dispatchTeamFilters();
      } else {
        dispatchRemovedFilters();
      }
    }
  }, [removedFilters.length]);
  useEffect(() => {
    let allFilters = [];
    if (isDetailed) {
      allFilters = [
        ...bu,
        ...team,
        ...scope,
        ...region,
        ...country,
        ...modes,
        ...movement,
        ...activity,
      ];
    }
    else if (isSimulator) {
      allFilters = [
        ...bu,
        ...team,
        ...scope,
        ...region,
        ...country,
        ...modes,
        ...movement,
        ...activity,
      ];
    }

    else {
      allFilters = [...bu, ...team, ...region, ...scope, ...country];
    }
    switch (true) {
      case isEquivalence:
        dispatch(
          setEqRemoveFilters(
            removedFilters.filter((data) => !allFilters.includes(data))
          )
        )
        break;

      case isDetailed:
        dispatch(
          setDetailedRemoveFilters(
            removedFilters.filter((data) => !allFilters.includes(data))
          )
        )
        break;
      case isSimulator:

        dispatch(
          setSimulatorRemoveFilters(
            removedFilters.filter((data) => !allFilters.includes(data))
          )
        )
        break;

      default:
        dispatch(
          setRemoveFilters(
            removedFilters.filter((data) => !allFilters.includes(data))
          )
        );
        break;
    }
  }, [
    scope.length,
    team.length,
    bu.length,
    region.length,
    country.length,
    modes.length,
    movement.length,
    activity.length,
  ]);

  useEffect(() => {
    setPosition(
      inputRef.current
        ? inputRef.current.getBoundingClientRect().top +
        inputRef.current.getBoundingClientRect().height +
        5
        : 0
    );
  }, [inputRef]);

  const selectionImage = (props) => {
    return (
      <img
        {...props}
        className={`select-arrow material-icons ${props.className} ${open ? "select-dropdown-icon-up" : "select-dropdown-icon-down"
          }`}
        src={getImageFromURL(`${IMAGES.SELECTICON}`)}
        alt={IMAGES.SELECTICON}
      />
    );
  }

  const findChecked = (variant) => {
    switch (type) {
      case "All Scopes":
        return scope.findIndex((item) => item === variant?.name) >= 0;
      case "All Region":
        return region.findIndex((item) => item === variant?.name) >= 0;
      case "All Country":
        return country.findIndex((item) => item === variant?.name) >= 0;
      case "All BU":
        return bu.findIndex((item) => item === variant?.name) >= 0;
      case "All Team":
        return team.findIndex((item) => item === variant?.name) >= 0;
      case "All Modes":
        return modes.findIndex((item) => item === variant?.name) >= 0;
      case "Movement Type":
        return movement.findIndex((item) => item === variant?.name) >= 0;
      case "All Activity":
        return activity.findIndex((item) => item === variant?.name) >= 0;
      default:
        return false;
    }

  }
  return (
    <FormControl
      sx={{
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #C1C1C1 !important",
            borderRadius: "5px",
          },
        },

        "& .MuiOutlinedInput-root": {
          background: "#FFFFFF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C1C1C1 !important",
          },
        },
        "& .Mui-disabled": {
          cursor: "pointer !important",
        },
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>

        <Select
          ref={inputRef}

          MenuProps={{
            PaperProps: {
              sx: {},
            },
            open: open,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            // getContentAnchorEl: null,
            sx: {
              "&.MuiPopover-root": {
                position: "unset",
              },
              "& .MuiPaper-root": {
                top: `${position}px !important`,
                zIndex: "9999999999",
                width: "160px",
                "& .MuiList-root": {
                  "& .filter-dd-options": {
                    background: "transparent !important",
                  },
                },
              },
            },
          }}
          sx={styles.selectDropdown}
          data={data}
          className={`filter-dd  ${filterValue?.length > 1 ? " selected" : ""
            } ${type === "Movement Type" || type === "All Activity"
              ? "movementTypeDd"
              : ""
            }`}
          value={filterDefault(type)}
          onClick={handleToggle}
          multiple
          renderValue={(selected) => {
            // console.log("FILTERVALUE", filterValue)
            if (filterValue?.length > 1) {
              if (type === "All Scopes") {
                return "All Scopes";
              } 
              else if (type === "All Region") {
                return "All Region";
              } 
              else if (type === "All Country") {
                return "All Country";
              } else if (type === "All BU") {
                return "All BU";
              } else if (type === "All Team") {
                return "All Team";
              }
            } else {
              return selected?.map((x) => x.name);
            }
          }}
          IconComponent={(props) => selectionImage(props)}
          onChange={handleSelectChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {filterValue
            ? filterValue[0]["options"]?.map((variant) => {
              return (
                <MenuItem
                  sx={{ padding: "0px" }}
                  className="filter-dd-options"
                  disableRipple
                  key={variant ? variant.id : ""}
                  value={variant}
                >
                  <Checkbox
                    disableRipple
                    icon={
                      <img
                        className="checkbox-img"
                        src={getImageFromURL(`${IMAGES.UNCHECKEDBOX}`)}
                        alt={IMAGES.UNCHECKEDBOX}
                      />
                    }
                    checkedIcon={
                      <img
                        className="checkbox-img"
                        src={getImageFromURL(`${IMAGES.CHECKEDBOX}`)}
                        alt={IMAGES.UNCHECKEDBOX}
                      />
                    }
                    checked={findChecked(variant)}
                  />
                  <ListItemText
                    sx={styles.listItems}
                    primary={variant?.name}
                  />
                </MenuItem>
              );
            })
            : null}
        </Select>
      </ClickAwayListener>
    </FormControl>
  );
}
