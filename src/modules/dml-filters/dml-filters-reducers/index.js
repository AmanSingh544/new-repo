import { DML_CALENDAR_FILTERS } from "src/modules/dml-filters/dml-filters-action-types/index";

const initialState = {
  calendar_filters: {},
};

export const dmlFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case DML_CALENDAR_FILTERS:
      return { ...state, calendar_filters: action.payload };
    default:
      return state;
  }
};
