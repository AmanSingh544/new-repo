
import { Apicalls } from "src/utils/services/axiosClient";
import axios from "axios";
import constants from "src/constants";
export const getScopeRecordDataDynamic = (endpoint, params, data, successCallBack, errorCallBack) => {
  return function () {
    Apicalls.getApiCall(endpoint, params, data,
      (response) => {
        successCallBack(response)
      },
      (error) => {
        errorCallBack(error)
      })
  }
}


export const downloadFileDynamic = (endpoint, params, data, successCallBack, errorCallBack) => {
  const token = localStorage.getItem("token");
  axios({
    url: endpoint,
    method: constants.apiConstants.METHOD_GET,
    params,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${JSON.parse(token)}` : ""
    },
    responseType: "blob",
  })
    .then(function (response) {
      console.log('response : download file', response);
      successCallBack(response)
    })
    .catch(function (error) {
      console.log('error : download file', error);
      errorCallBack(error)
    });
}

export const downloadFileDynamic_POST = (endpoint, params, data, successCallBack, errorCallBack) => {
  const token = localStorage.getItem("token");
  axios({
    url: endpoint,
    method: constants.apiConstants.METHOD_POST,
    params,
    data,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${JSON.parse(token)}` : ""
    },
    responseType: "blob",
  })
    .then(function (response) {
      console.log('response : download file', response);
      successCallBack(response)
    })
    .catch(function (error) {
      console.log('error : download file', error);
      errorCallBack(error)
    });
}

export const uploadFileDynamic = (endpoint, params, data, successCallBack, errorCallBack) => {
  return function () {
    Apicalls.postApiCall(endpoint, params, data, successCallBack, errorCallBack)
  }
}

export const uploadFile = (endpoint, params, data, successCallBack, errorCallBack) => {
  const token = localStorage.getItem("token");
  axios({
    url: endpoint,
    method: constants.apiConstants.METHOD_POST,
    data: data,
    params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: token ? `Bearer ${JSON.parse(token)}` : ""
    },
  })
    .then(function (response) {
      console.log('response : upload file', response);
      if (response?.data?.status_code === constants.apiConstants.STATUS_200) {
        successCallBack(response)
      }
      else {
        errorCallBack(response)
      }
    })
    .catch(function (error) {
      console.log('error : upload file', error);
      errorCallBack(error)
    });
}