import { EQ_SCOPE_SELECT, EQ_COUNTRY_SELECT, EQ_REGION_SELECT, EQ_BU_SELECT, EQ_TEAM_SELECT, EQ_REMOVE_FILTERS, EQ_BU_FILTERS, EQ_TEAM_FILTERS, EQ_CALENDAR_FILTERS } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-action-types/index";


const setEqScopeFilters = (filter) => {
    return {
        type: EQ_SCOPE_SELECT,
        payload: filter
    }
} 


const setEqRemoveFilters = (filter) => {
    return {
        type: EQ_REMOVE_FILTERS,
        payload: filter
    }
}

const setEqRegionFilters = (filter) => {
    return {
        type: EQ_REGION_SELECT,
        payload: filter
    }
} 

const setEqCountryFilters = (filter) => {
    return {
        type: EQ_COUNTRY_SELECT,
        payload: filter
    }
} 

const setEqBuFilters = (filter) => {
    return {
        type: EQ_BU_SELECT,
        payload: filter
    }
} 

const setEqTeamFilters = (filter) => {
    return {
        type: EQ_TEAM_SELECT,
        payload: filter
    }
} 

const setEqBuFilterWithIds = (bu) => {
    return {
      type: EQ_BU_FILTERS,
      payload: bu,
    };
  };
  
  const setEqTeamFiltersWithIds = (teams) => {
    return {
      type: EQ_TEAM_FILTERS,
      payload: teams,
    };
  };
  
  const setEqCalendarFilters = (filters) => {
      return {
          type: EQ_CALENDAR_FILTERS,
          payload: filters
      }
  }
  

export const equivalenceFilterActions = {
    setEqScopeFilters,
    setEqRegionFilters,
    setEqCountryFilters,
    setEqBuFilters,
    setEqTeamFilters,
    setEqRemoveFilters, 
    setEqBuFilterWithIds, 
    setEqTeamFiltersWithIds, 
    setEqCalendarFilters
}
