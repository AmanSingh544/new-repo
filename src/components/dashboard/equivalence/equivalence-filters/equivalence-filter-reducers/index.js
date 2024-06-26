import {
  EQ_SCOPE_SELECT,
  EQ_REGION_SELECT,
  EQ_COUNTRY_SELECT,
  EQ_BU_SELECT,
  EQ_TEAM_SELECT,
  EQ_REMOVE_FILTERS,
  EQ_BU_FILTERS,
  EQ_TEAM_FILTERS,
  EQ_CALENDAR_FILTERS,
} from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-action-types/index";

const initialState = {
  scope: [],
  region: [],
  country: [],
  bu: [],
  team: [],
  removedFilters: [],
  bu_filters: [],
  team_filters: [],
  calendar_filters: {},
};

export const equivalenceFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case EQ_SCOPE_SELECT:
      return { ...state, scope: action.payload };
    case EQ_REGION_SELECT:
      return { ...state, region: action.payload };
    case EQ_COUNTRY_SELECT:
      return { ...state, country: action.payload };
    case EQ_BU_SELECT:
      return { ...state, bu: action.payload };
    case EQ_TEAM_SELECT:
      return { ...state, team: action.payload };
    case EQ_REMOVE_FILTERS:
      return { ...state, removedFilters: action.payload };
    case EQ_BU_FILTERS:
      return { ...state, bu_filters: action.payload };
    case EQ_TEAM_FILTERS:
      return { ...state, team_filters: action.payload };
    case EQ_CALENDAR_FILTERS:
      return { ...state, calendar_filters: action.payload };
    default:
      return state;
  }
};
