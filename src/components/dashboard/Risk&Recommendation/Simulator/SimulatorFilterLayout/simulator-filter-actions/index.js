import {
  SIMULATOR_SCOPE_SELECT,
  SIMULATOR_REGION_SELECT,
  SIMULATOR_COUNTRY_SELECT,
  SIMULATOR_BU_SELECT,
  SIMULATOR_TEAM_SELECT,
  SIMULATOR_REMOVE_FILTERS,
  SIMULATOR_BU_FILTERS,
  SIMULATOR_TEAM_FILTERS,
  SIMULATOR_CALENDAR_FILTERS,
  SIMULATOR_MODE_SELECT,
  SIMULATOR_MOVEMENT_SELECT,
  SIMULATOR_ACTIVITY_SELECT,
  SIMULATOR_ORIGIN_COUNTRY,
  SIMULATOR_DESTINATION_COUNTRY,
  SIMULATOR_ORIGIN_COUNTRY_NAME,
  SIMULATOR_DESTINATION_COUNTRY_NAME,
} from "src/components/dashboard/Risk&Recommendation/Simulator/SimulatorFilterLayout/simulator-filter-action-types/index";

const setSimulatorScopeFilters = (filter) => {
  return {
    type: SIMULATOR_SCOPE_SELECT,
    payload: filter,
  };
};

const setSimulatorRemoveFilters = (filter) => {
  return {
    type: SIMULATOR_REMOVE_FILTERS,
    payload: filter,
  };
};

const setSimulatorRegionFilters = (filter) => {
  return {
    type: SIMULATOR_REGION_SELECT,
    payload: filter,
  };
};

const setSimulatorCountryFilters = (filter) => {
  return {
    type: SIMULATOR_COUNTRY_SELECT,
    payload: filter,
  };
};

const setSimulatorBuFilters = (filter) => {
  return {
    type: SIMULATOR_BU_SELECT,
    payload: filter,
  };
};

const setSimulatorTeamFilters = (filter) => {
  return {
    type: SIMULATOR_TEAM_SELECT,
    payload: filter,
  };
};

const setSimulatorModeFilters = (filter) => {
  return {
    type: SIMULATOR_MODE_SELECT,
    payload: filter,
  };
};

const setSimulatorMovementFilters = (filter) => {
  return {
    type: SIMULATOR_MOVEMENT_SELECT,
    payload: filter,
  };
};

const setSimulatorActivityFilters = (filter) => {
  return {
    type: SIMULATOR_ACTIVITY_SELECT,
    payload: filter,
  };
};

const setSimulatorBuFilterWithIds = (bu) => {
  return {
    type: SIMULATOR_BU_FILTERS,
    payload: bu,
  };
};

const setSimulatorTeamFiltersWithIds = (teams) => {
  return {
    type: SIMULATOR_TEAM_FILTERS,
    payload: teams,
  };
};

const setSimulatorCalendarFilters = (filters) => {
  return {
    type: SIMULATOR_CALENDAR_FILTERS,
    payload: filters,
  };
};
const setSimulatorOriginCountry = (country)=>{
  return{
    type:SIMULATOR_ORIGIN_COUNTRY,
    payload:country
  }
}
const setSimulatorDestinationCountry = (country)=>{
  return{
    type:SIMULATOR_DESTINATION_COUNTRY,
    payload:country
  }
}
const setSimulatorOriginCountryName = (country)=>{
  return{
    type:SIMULATOR_ORIGIN_COUNTRY_NAME,
    payload:country
  }
}
const setSimulatorDestinationCountryName = (country)=>{
  return{
    type:SIMULATOR_DESTINATION_COUNTRY_NAME,
    payload:country
  }
}
export const simulatorFilterActions = {
  setSimulatorScopeFilters,
  setSimulatorRegionFilters,
  setSimulatorCountryFilters,
  setSimulatorBuFilters,
  setSimulatorTeamFilters,
  setSimulatorModeFilters,
  setSimulatorMovementFilters,
  setSimulatorActivityFilters,
  setSimulatorRemoveFilters,
  setSimulatorBuFilterWithIds,
  setSimulatorTeamFiltersWithIds,
  setSimulatorCalendarFilters,
  setSimulatorOriginCountry,
  setSimulatorDestinationCountry, 
   setSimulatorOriginCountryName,
  setSimulatorDestinationCountryName,

};
