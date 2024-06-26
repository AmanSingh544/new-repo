import { DML_SELECTED_ENTITY, DML_SELECTED_FILES, DML_SELECTED_MODE, DML_SELECTED_RULE, DML_SELECTED_MONTH, DML_SELECTED_YEAR } from "src/modules/dml/dml-action-types/index";

const initialState = {
  selectedFiles: [],
  selectedEntity: '',
  selectedModeDml: '',
  selectMonth: '',
  selectedYear: '',
  selectedRule : []
};

export const dmlReducer = (state = initialState, action) => {
  switch (action.type) {
    case DML_SELECTED_FILES:
      return { ...state, selectedFiles: action.payload };
    case DML_SELECTED_ENTITY:
      return { ...state, selectedEntity: action.payload };
    case DML_SELECTED_MODE:
      return { ...state, selectedModeDml: action.payload };
    case DML_SELECTED_MONTH:
      return {...state, selectedMonth: action.payload};
    case DML_SELECTED_YEAR:
      return {...state, selectedYear: action.payload};
    case DML_SELECTED_RULE:
      return { ...state, selectedRule: action.payload};
    default:
      return state;
  }
};
