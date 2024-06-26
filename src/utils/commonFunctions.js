import { toast } from "react-toastify";
import moment from "moment";
import constants from "src/constants";
import { graphNames_new as graphNames, graphNames_new, rawCostFuelData, templateScopeEntity } from "src/constants/appConstants";

const isNullUndefined = (item) => {
  try {
    return item === null || item === undefined || item === "";
  } catch (err) {
    return true;
  }
};

const showToast = (isError, message = constants.constStrings.errorMessage) => {
  if (!isError) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

const changesISODateToNormal = (date) => {
  return (
    new Date(date).getDate() +
    "-" +
    new Date(date).getMonth() +
    "-" +
    new Date(date).getFullYear()
  );
};

const yyyymmddWithtime = (date) => {
  if (date) {
    const d = new Date(`${date} 00:00:00`);
    return d.toISOString();
  } else {
    return date;
  }
};

const dataFormat = (date, format) => {
  if (date) {
    const d = moment(date, format).format(format);
    return d;
  } else {
    return date;
  }
};

const keyFinder = () => {
  let r = Math.random()
    .toString(36)
    .substring(7)
    .toString();
  return r;
};

// const selectItemName = (id) => {
//   if (id === matrixListAccToBE.EMISSION_TIMELINE) {
//     return matrixList.EMISSION_TIMELINE;
//   } else if (id === matrixListAccToBE.EMISSION_SCOPES) {
//     return matrixList.EMISSION_SCOPES;
//   } else if (id === matrixListAccToBE.EMISSION_BY_REGION) {
//     return matrixList.EMISSION_BY_REGION;
//   } else if (id === matrixListAccToBE.EMISSION_BY_COUNTRY) {
//     return matrixList.EMISSION_BY_COUNTRY;
//   } else if (id === matrixListAccToBE.EMISSION_ACROSS_ACTIVITY) {
//     return matrixList.EMISSION_ACROSS_ACTIVITY;
//   } else if (id === matrixListAccToBE.EMISSION_ACROSS_TRANSPORTATION) {
//     return matrixList.EMISSION_ACROSS_TRANSPORTATION;
//   } else if (id === matrixListAccToBE.SALES_BY_EMISSION) {
//     return matrixList.SALES_BY_EMISSION;
//   } else if (id === matrixListAccToBE.GHG_WISE_EMISSION) {
//     return matrixList.GHG_WISE_EMISSION;
//   } else if (id === matrixListAccToBE.EMISSION_BY_SUPPLIER) {
//     return matrixList.EMISSION_BY_SUPPLIER;
//   }
// };

function getGraphName(graph_id) {
  switch (graph_id) {
    case "EMISSION_TIMELINE":
      return graphNames.EMISSION_TIMELINE;
    case "EMISSION_SCOPES":
      return graphNames.EMISSION_SCOPES;
    case "EMISSION_BY_REGION":
      return graphNames.EMISSION_BY_REGION;
    case "EMISSION_BY_COUNTRY":
      return graphNames.EMISSION_BY_COUNTRY;
    case "EMISSION_BY_REGION":
      return graphNames.EMISSION_BY_REGION;
    case "EMISSION_BY_COUNTRY_DETAILED":
      return graphNames.EMISSION_BY_COUNTRY_DETAILED;
    case "EMISSION_ACROSS_ACTIVITY":
      return graphNames.EMISSION_ACROSS_ACTIVITY;
    case "EMISSION_ACROSS_TRANSPORTATION":
      return graphNames.EMISSION_ACROSS_TRANSPORTATION;
    case "SALES_BY_EMISSION":
      return graphNames.SALES_BY_EMISSION;
    case "GHG_WISE_EMISSION":
      return graphNames.GHG_WISE_EMISSION;
    case "SUPPLIER_VS_EMISSIONS":
      return graphNames.SUPPLIER_VS_EMISSIONS;
    case "COST_FUEL_ITEM_SHIPPED_EMISSION":
      return graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION;
    case "LANES_VS_EMISSION":
      return graphNames.LANES_VS_EMISSION;
    case "PROCESS_VS_EMISSIONS":
      return graphNames.PROCESS_VS_EMISSIONS;
    case "EMISSION_PERFORMANCE":
      return graphNames.EMISSION_PERFORMANCE;
    case "MODES_VS_EMISSION":
      return graphNames.MODES_VS_EMISSION;
    case "TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES":
      return graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES;
    case "TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES":
      return graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES;
    case "TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES":
      return graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES;
    case "UPSTREAM_NETWORKS_VS_EMISSION":
      return graphNames.UPSTREAM_NETWORKS_VS_EMISSION;
    case "DOWNSTREAM_ASSET_TYPE_VS_EMISSION":
      return graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION;
    case "CONTINENT_VS_EMISSION":
      return graphNames.CONTINENT_VS_EMISSION;
    // default:
    //     return null;
  }
}

const selectItemName = (graph_id) => {
  return getGraphName(graph_id);
  // const selectedGraph = infoDetailedSummary.find((item) => item.graph_id === id);
  // return selectedGraph ? selectedGraph.name : null;
};

function downloadFile(fileData) {
  const downloadLink = document.createElement("a");
  const url = window.URL.createObjectURL(fileData);
  downloadLink.href = url;
  downloadLink.click();
  window.URL.revokeObjectURL(url);
}
function downloadFileUsingUrl(url) {
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.click();
}

function decideTemplateScopeEntityWise(scope, entity) {
  let url = '';
  url = templateScopeEntity[`scope${scope}Entity${entity}`];
  return url;
}

const makeCostFuelDataWithConstants = (data) => {
  let foundIndex;
  let templateArrCostFuel = JSON.parse(JSON.stringify(rawCostFuelData))
  data.map((item) => {
    foundIndex = templateArrCostFuel.findIndex(x => x.name == item.name);
    templateArrCostFuel[foundIndex] = item;
  })
  return templateArrCostFuel;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default {
  isNullUndefined,
  showToast,
  changesISODateToNormal,
  yyyymmddWithtime,
  dataFormat,
  keyFinder,
  selectItemName,
  downloadFile,
  downloadFileUsingUrl,
  decideTemplateScopeEntityWise,
  makeCostFuelDataWithConstants,
  getComparator,
  stableSort
};
