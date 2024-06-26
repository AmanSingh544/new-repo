import { DML_CALENDAR_FILTERS } from "src/modules/dml-filters/dml-filters-action-types";


const setDmlCalendarFilters = (filters) => {
  return {
    type: DML_CALENDAR_FILTERS,
    payload: filters,
  };
};

export const dmlFilterActions = {
  setDmlCalendarFilters,
};
