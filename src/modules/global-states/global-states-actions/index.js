// import {
//   SET_SINGLE_VIEW_ENABLE,
//   SET_SINGLE_VIEW_DISABLE,
//   SET_MASTER_ENTITIES,
//   SET_ALL_COUNTRIES,
//   SET_ADD_GRAPH,
//   SET_EDIT_GRAPH,
//   SET_SINGLE_EXECUTIVE,
//   SET_SINGLE_DETAILED,
//   REGION_DATA,
//   TOTAL_EMISSION_COSTFUEL,
// } from "src/modules/global-states/global-states-action-types/index";

// const setAllCountries = (master) => {
//   return {
//     type: SET_ALL_COUNTRIES,
//     payload: master,
//   };
// };
// const setEnableSignleView = (data) => {
//   return {
//     type: SET_SINGLE_VIEW_ENABLE,
//     payload: data,
//   };
// };

// const setAllRegions = (regions) => {
//   return {
//     type: REGION_DATA,
//     payload: regions
//   }
// }

// const setSingleViewInfographic = (type, payload) => {
  
//   return {
//     type,
//     payload,
//   };
// };

// const setAddGraph = (payload) => {
//   return {
//     type: SET_ADD_GRAPH,
//     payload: payload,
//   };
// };

// const setEditGraph = (payload) => {
//   return {
//     type: SET_EDIT_GRAPH,
//     payload: payload,
//   };
// };

// const setSingleExecutive = (payload) => {
//   return {
//     type: SET_SINGLE_EXECUTIVE,
//     payload: payload,
//   };
// };

// const setSingleDetailed = (payload) => {
//   return {
//     type: SET_SINGLE_DETAILED,
//     payload: payload,
//   };
// };

// const setDisableSignleView = () => {
//   return {
//     type: SET_SINGLE_VIEW_DISABLE,
//     payload: null,
//   };
// };

// const setMasterEntities = (master) => {
//   return {
//     type: SET_MASTER_ENTITIES,
//     payload: master,
//   };
// };
// const setCostFuelLocal = (payload) => {
//   return {
//     type: TOTAL_EMISSION_COSTFUEL,
//     payload,
//   };
// };

// export const globalActions = {
//   setAllRegions,
//   setEnableSignleView,
//   setDisableSignleView,
//   setSingleDetailed,
//   setSingleExecutive,
//   setMasterEntities,
//   setSingleViewInfographic,
//   setAllCountries,
//   setAddGraph,
//   setEditGraph,
//   setCostFuelLocal
// };



import {
  SET_SINGLE_VIEW_ENABLE,
  SET_SINGLE_VIEW_DISABLE,
  SET_MASTER_ENTITIES,
  SET_ALL_COUNTRIES,
  SET_ADD_GRAPH,
  SET_EDIT_GRAPH,
  SET_SINGLE_EXECUTIVE,
  SET_SINGLE_DETAILED,
  REGION_DATA,
  COST_FUEL_ITEM_SHIPPED_EMISSION
} from "src/modules/global-states/global-states-action-types/index";

const setAllCountries = (master) => {
  return {
    type: SET_ALL_COUNTRIES,
    payload: master,
  };
};
const setEnableSignleView = (data) => {
  return {
    type: SET_SINGLE_VIEW_ENABLE,
    payload: data,
  };
};

const setAllRegions = (regions) => {
  return {
    type: REGION_DATA,
    payload: regions
  }
}

const setSingleViewInfographic = (type, payload) => {
  
  return {
    type,
    payload,
  };
};

const setAddGraph = (payload) => {
  return {
    type: SET_ADD_GRAPH,
    payload: payload,
  };
};

const setEditGraph = (payload) => {
  return {
    type: SET_EDIT_GRAPH,
    payload: payload,
  };
};

const setSingleExecutive = (payload) => {
  return {
    type: SET_SINGLE_EXECUTIVE,
    payload: payload,
  };
};

const setSingleDetailed = (payload) => {
  return {
    type: SET_SINGLE_DETAILED,
    payload: payload,
  };
};

const setDisableSignleView = () => {
  return {
    type: SET_SINGLE_VIEW_DISABLE,
    payload: null,
  };
};

const setMasterEntities = (master) => {
  return {
    type: SET_MASTER_ENTITIES,
    payload: master,
  };
};
const setCostFuelLocal = (payload) => {
  return {
    type: COST_FUEL_ITEM_SHIPPED_EMISSION,
    payload,
  };
};

export const globalActions = {
  setAllRegions,
  setEnableSignleView,
  setDisableSignleView,
  setSingleDetailed,
  setSingleExecutive,
  setMasterEntities,
  setSingleViewInfographic,
  setAllCountries,
  setAddGraph,
  setEditGraph,
  setCostFuelLocal
};
