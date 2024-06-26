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

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCOPE_SELECT:
      return { ...state, scope: action.payload };
    case REGION_SELECT:
      return { ...state, region: action.payload };
    case COUNTRY_SELECT:
      return { ...state, country: action.payload };
    case BU_SELECT:
      return { ...state, bu: action.payload };
    case TEAM_SELECT:
      return { ...state, team: action.payload };
    case REMOVE_FILTERS:
      return { ...state, removedFilters: action.payload };
    case BU_FILTERS:
      return { ...state, bu_filters: action.payload };
    case TEAM_FILTERS:
      return { ...state, team_filters: action.payload };
    case CALENDAR_FILTERS:
      return { ...state, calendar_filters: action.payload };
    default:
      return state;
  }
};
