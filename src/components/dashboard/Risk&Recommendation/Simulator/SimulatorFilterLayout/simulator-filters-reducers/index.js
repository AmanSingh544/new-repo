import {
  SIMULATOR_SCOPE_SELECT,
  SIMULATOR_REGION_SELECT,
  SIMULATOR_COUNTRY_SELECT,
  SIMULATOR_BU_SELECT,
  SIMULATOR_BU_FILTERS,
  SIMULATOR_CALENDAR_FILTERS,
  SIMULATOR_REMOVE_FILTERS,
  SIMULATOR_TEAM_FILTERS,
  SIMULATOR_ACTIVITY_SELECT,
  SIMULATOR_MODE_SELECT,
  SIMULATOR_MOVEMENT_SELECT,
  SIMULATOR_TEAM_SELECT,
  SIMULATOR_ORIGIN_COUNTRY,
  SIMULATOR_DESTINATION_COUNTRY,
  SIMULATOR_ORIGIN_COUNTRY_NAME,
  SIMULATOR_DESTINATION_COUNTRY_NAME,
} from "src/components/dashboard/Risk&Recommendation/Simulator/SimulatorFilterLayout/simulator-filter-action-types/index";

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
  origin_country: "",
  destination_country: "",
  origin_country_name: [],
  destination_country_name: [],

};

export const simulatorFilterReducer = (state = initialState, action) => {

  switch (action.type) {

    case SIMULATOR_SCOPE_SELECT:
      return { ...state, scope: action.payload };
    case SIMULATOR_REGION_SELECT:
      return { ...state, region: action.payload };
    case SIMULATOR_COUNTRY_SELECT:
      return { ...state, country: action.payload };
    case SIMULATOR_BU_SELECT:
      return { ...state, bu: action.payload };
    case SIMULATOR_TEAM_SELECT:
      return { ...state, team: action.payload };
    case SIMULATOR_REMOVE_FILTERS:
      return { ...state, removedFilters: action.payload };
    case SIMULATOR_BU_FILTERS:
      return { ...state, bu_filters: action.payload };
    case SIMULATOR_TEAM_FILTERS:
      return { ...state, team_filters: action.payload };
    case SIMULATOR_MODE_SELECT:
      return { ...state, modes: action.payload };
    case SIMULATOR_MOVEMENT_SELECT:
      return { ...state, movement: action.payload };
    case SIMULATOR_ACTIVITY_SELECT:
      return { ...state, activity: action.payload };
    case SIMULATOR_CALENDAR_FILTERS:
      return { ...state, calendar_filters: action.payload };
    case SIMULATOR_ORIGIN_COUNTRY:
      return { ...state, origin_country: action.payload };
    case SIMULATOR_DESTINATION_COUNTRY:
      return { ...state, destination_country: action.payload };
      case SIMULATOR_ORIGIN_COUNTRY_NAME:
      return { ...state, origin_country_name: action.payload };
    case SIMULATOR_DESTINATION_COUNTRY_NAME:
      return { ...state, destination_country_name: action.payload };
    default:
      return state;
  }
};
