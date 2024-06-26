import axios from "axios";
import utils from "..";
import constants from "src/constants";

export const axiosClient = (method, params, data) => {
  const access_token = JSON.parse(localStorage.getItem("token"))
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 300000,
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
      },
    params,
    data,
  });
}

/** Axios Instance */

const axiosInstance = axios.create({
  // provide base url here
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  },
});

// request
axiosInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : "";
    console.log("Request config=====>>>>>", config);
    return config;
  },
  function (error) {
    console.log("Request error=====>>>>>", error);
    return Promise.reject(error);
  }
);

// response
axiosInstance.interceptors.response.use(
  function (response) {
    console.log("Response config=====>>>>>", response);
    return response;
  },
  function (error) {
    console.log("Response error=====>>>>>", error);
    if (error?.response?.data?.status_code === constants.apiConstants.STATUS_401) {
      localStorage.clear();
      window.location = "/";
    }
    return Promise.reject(error);
  }
);

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const postApiCall = (
  endPoint,
  params,
  data,
  successCallback,
  errorCallback
) => {
  axiosInstance
    .post(endPoint, data, { params })
    .then((response) => {
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallback(response);
      }
      else {
        errorCallback(response);
      }
    })
    .catch((error) => {
      console.log("error.response", error.response);
      if (!utils.commonFunctions.isNullUndefined(error)) {
        if (error.message == constants.apiConstants.NETWORK_ERROR) {
          console.log("in network error", error);
        } else if (error.code === constants.apiConstants.ECONNABORTED_ERROR) {
          console.log("in ECONNABORTED", error);
        }
      }
      errorCallback(error);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (
  endPoint,
  params = "",
  data,
  successCallback,
  errorCallback
) => {
  axiosInstance
    .get(endPoint, { params, data })
    .then((response) => {
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallback(response);
      }
      else {
        errorCallback(response);
      }
    })
    .catch((error) => {
      console.log("error.response", error.response);
      if (!utils.commonFunctions.isNullUndefined(error)) {
        if (error.message == constants.apiConstants.NETWORK_ERROR) {
          console.log("in network error", error);
        } else if (error.code === constants.apiConstants.ECONNABORTED_ERROR) {
          console.log("in ECONNABORTED", error);
        }
      }
      errorCallback(error);
    });
};
/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */

const deleteApiCall = (
  endPoint,
  params = "",
  successCallback,
  errorCallback
) => {
  axiosInstance
    .delete(endPoint + params, {})
    .then((response) => {
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallback(response);
      }
      else {
        errorCallback(response);
      }
    })
    .catch((error) => {
      console.log("error.response", error.response);
      if (!utils.commonFunctions.isNullUndefined(error)) {
        if (error.message == constants.apiConstants.NETWORK_ERROR) {
          console.log("in network error", error);
        } else if (error.code === constants.apiConstants.ECONNABORTED_ERROR) {
          console.log("in ECONNABORTED", error);
        }
      }
      errorCallback(error);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const patchApiCall = (endPoint, params, successCallback, errorCallback) => {
  axiosInstance
    .patch(endPoint, params)
    .then((response) => {
      if (response?.data?.status_code === constants.apiConstants.STATUS_201) {
        successCallback(response);
      }
      else {
        errorCallback(response);
      }
    })
    .catch((error) => {
      console.log("error.response", error.response);
      if (!utils.commonFunctions.isNullUndefined(error)) {
        if (error.message == constants.apiConstants.NETWORK_ERROR) {
          console.log("in network error", error);
        } else if (error.code === constants.apiConstants.ECONNABORTED_ERROR) {
          console.log("in ECONNABORTED", error);
        }
      }
      errorCallback(error);
    });
};




const putApiCall = (
  endPoint,
  data,
  successCallback,
  errorCallback
) => {
  axiosInstance
    .put(endPoint, { ...data })
    .then((response) => {
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallback(response);
      }
      else {
        errorCallback(response);
      }
    })
    .catch((error) => {
      console.log("error.response", error.response);
      if (!utils.commonFunctions.isNullUndefined(error)) {
        if (error.message == constants.apiConstants.NETWORK_ERROR) {
          console.log("in network error", error);
        } else if (error.code === constants.apiConstants.ECONNABORTED_ERROR) {
          console.log("in ECONNABORTED", error);
        }
      }
      errorCallback(error);
    });
};

const setAuthorizationToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
};

// Generic POST method
async function genericPostMethod(endpoint, payload, params, successCallback, errorCallback) {
  try {
      const response = await axiosInstance.post(endpoint, payload, { params });
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallback?.(response);
      } else {
          errorCallback?.(response);
      }
     } 
     catch (error) {
      console.error('Error in generic POST method:', error);
      errorCallback?.(error);
  }
}

export const Apicalls = {
  postApiCall,
  getApiCall,
  putApiCall,
  setAuthorizationToken,
  patchApiCall,
  deleteApiCall,
  genericPostMethod
}
