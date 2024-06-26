import {
  DETAILED_SCOPE_SELECT,
  DETAILED_REGION_SELECT,
  DETAILED_COUNTRY_SELECT,
  DETAILED_BU_SELECT,
  DETAILED_TEAM_SELECT,
  DETAILED_REMOVE_FILTERS,
  DETAILED_BU_FILTERS,
  DETAILED_TEAM_FILTERS,
  DETAILED_CALENDAR_FILTERS,
  DETAILED_MODE_SELECT,
  DETAILED_MOVEMENT_SELECT,
  DETAILED_ACTIVITY_SELECT
} from "src/components/dashboard/detailed-summary/detailed-filters/detailed-filter-action-types";

const setDetailedScopeFilters = (filter) => {
  return {
    type: DETAILED_SCOPE_SELECT,
    payload: filter,
  };
};

const setDetailedRemoveFilters = (filter) => {
  return {
    type: DETAILED_REMOVE_FILTERS,
    payload: filter,
  };
};

const setDetailedRegionFilters = (filter) => {
  return {
    type: DETAILED_REGION_SELECT,
    payload: filter,
  };
};

const setDetailedCountryFilters = (filter) => {
  return {
    type: DETAILED_COUNTRY_SELECT,
    payload: filter,
  };
};

const setDetailedBuFilters = (filter) => {
  return {
    type: DETAILED_BU_SELECT,
    payload: filter,
  };
};

const setDetailedTeamFilters = (filter) => {
  return {
    type: DETAILED_TEAM_SELECT,
    payload: filter,
  };
};

const setDetailedModeFilters = (filter) => {
  return {
    type: DETAILED_MODE_SELECT,
    payload: filter,
  };
};

const setDetailedMovementFilters = (filter) => {
  return {
    type: DETAILED_MOVEMENT_SELECT,
    payload: filter,
  };
};

const setDetailedActivityFilters = (filter) => {
  return {
    type: DETAILED_ACTIVITY_SELECT,
    payload: filter,
  };
};

const setDetailedBuFilterWithIds = (bu) => {
  return {
    type: DETAILED_BU_FILTERS,
    payload: bu,
  };
};

const setDetailedTeamFiltersWithIds = (teams) => {
  return {
    type: DETAILED_TEAM_FILTERS,
    payload: teams,
  };
};

const setDetailedCalendarFilters = (filters) => {
  return {
    type: DETAILED_CALENDAR_FILTERS,
    payload: filters,
  };
};

export const detailedFilterActions = {
  setDetailedScopeFilters,
  setDetailedRegionFilters,
  setDetailedCountryFilters,
  setDetailedBuFilters,
  setDetailedTeamFilters,
  setDetailedModeFilters,
  setDetailedMovementFilters,
  setDetailedActivityFilters,
  setDetailedRemoveFilters,
  setDetailedBuFilterWithIds,
  setDetailedTeamFiltersWithIds,
  setDetailedCalendarFilters,
};
