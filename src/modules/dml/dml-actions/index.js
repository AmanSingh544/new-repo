import { DML_SELECTED_ENTITY, DML_SELECTED_FILES, DML_SELECTED_MODE, DML_SELECTED_RULE, DML_SELECTED_MONTH, DML_SELECTED_YEAR } from "src/modules/dml/dml-action-types/index";


const setDmlSelectedFiles = (payload) => {
  return {
    type: DML_SELECTED_FILES,
    payload: payload,
  };
};


const setDmlSelectedEntity = (payload) => {
  return {
    type: DML_SELECTED_ENTITY,
    payload: payload,
  };
};

const setDmlSelectedMode = (payload) => {
  return {
    type: DML_SELECTED_MODE,
    payload: payload,
  };
};

const setDmlSelectedMonth = (payload) => {
  return {
    type: DML_SELECTED_MONTH,
    payload: payload,
  }
};

const setDmlSelectedYear = (payload) => {
  return {
    type: DML_SELECTED_YEAR,
    payload: payload,
  }
};

const setSelectedRule = (payload) => {
  return {
    type: DML_SELECTED_RULE,
    payload: payload,
  };
}

export const dmlActions = {
  setDmlSelectedFiles,
  setDmlSelectedEntity,
  setDmlSelectedMode, 
  setDmlSelectedMonth, 
  setDmlSelectedYear,
  setSelectedRule
};
