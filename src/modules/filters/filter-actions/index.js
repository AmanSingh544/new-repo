import {
  SCOPE_SELECT,
  REGION_SELECT,
  COUNTRY_SELECT,
  BU_SELECT,
  TEAM_SELECT,
  REMOVE_FILTERS,
  BU_FILTERS,
  TEAM_FILTERS,
  CALENDAR_FILTERS,
} from "src/modules/filters/filter-action-types/index";

const setScopeFilters = (filter) => {
  return {
    type: SCOPE_SELECT,
    payload: filter,
  };
};

const setRemoveFilters = (filter) => {
  return {
    type: REMOVE_FILTERS,
    payload: filter,
  };
};

const setRegionFilters = (filter) => {
  return {
    type: REGION_SELECT,
    payload: filter,
  };
};

const setCountryFilters = (filter) => {
  return {
    type: COUNTRY_SELECT,
    payload: filter,
  };
};

const setBuFilters = (filter) => {
  return {
    type: BU_SELECT,
    payload: filter,
  };
};

const setTeamFilters = (filter) => {
  return {
    type: TEAM_SELECT,
    payload: filter,
  };
};

const setBuFilterWithIds = (bu) => {
  return {
    type: BU_FILTERS,
    payload: bu,
  };
};

const setTeamFiltersWithIds = (teams) => {
  return {
    type: TEAM_FILTERS,
    payload: teams,
  };
};

const setCalendarFilters = (filters) => {
    return {
        type: CALENDAR_FILTERS,
        payload: filters
    }
}

export const filterActions = {
  setScopeFilters,
  setRegionFilters,
  setCountryFilters,
  setBuFilters,
  setTeamFilters,
  setRemoveFilters,
  setBuFilterWithIds,
  setTeamFiltersWithIds,
  setCalendarFilters
};
