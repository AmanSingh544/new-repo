import {
  DETAILED_SCOPE_SELECT,
  DETAILED_REGION_SELECT,
  DETAILED_COUNTRY_SELECT,
  DETAILED_BU_SELECT,
  DETAILED_BU_FILTERS,
  DETAILED_CALENDAR_FILTERS,
  DETAILED_REMOVE_FILTERS,
  DETAILED_TEAM_FILTERS,
  DETAILED_ACTIVITY_SELECT,
  DETAILED_MODE_SELECT,
  DETAILED_MOVEMENT_SELECT,
  DETAILED_TEAM_SELECT,
} from "src/components/dashboard/detailed-summary/detailed-filters/detailed-filter-action-types";

const initialState = {
  scope: [],
  region: [],
  country: [],
  bu: [],
  team: [],
  modes: [],
  activity: [],
  movement: [],
  removedFilters: [],
  bu_filters: [],
  team_filters: [],
  calendar_filters: {},
};

export const detailedFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILED_SCOPE_SELECT:
      return { ...state, scope: action.payload };
    case DETAILED_REGION_SELECT:
      return { ...state, region: action.payload };
      case DETAILED_COUNTRY_SELECT:
        return { ...state, country: action.payload };
    case DETAILED_BU_SELECT:
      return { ...state, bu: action.payload };
    case DETAILED_TEAM_SELECT:
      return { ...state, team: action.payload };
    case DETAILED_REMOVE_FILTERS:
      return { ...state, removedFilters: action.payload };
    case DETAILED_BU_FILTERS:
      return { ...state, bu_filters: action.payload };
    case DETAILED_TEAM_FILTERS:
      return { ...state, team_filters: action.payload };
    case DETAILED_MODE_SELECT:
      return { ...state, modes: action.payload };
    case DETAILED_MOVEMENT_SELECT:
      return { ...state, movement: action.payload };
    case DETAILED_ACTIVITY_SELECT:
      return { ...state, activity: action.payload };
    case DETAILED_CALENDAR_FILTERS:
      return { ...state, calendar_filters: action.payload };
    default:
      return state;
  }
};
