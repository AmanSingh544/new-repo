import { axiosClient } from "src/utils/services/axiosClient";
import { useState } from "react";
import constants from "src/constants";

function useRequestApi() {
  const [loading, setLoading] = useState(true)
  const request = async (method, endpoint, params, data, successCallBack, errorCallBack) => {
    let response;

    try {
      response = await axiosClient(method, params, data)[method](endpoint, params, data);
      setLoading(false) 
      if(response.status === constants.apiConstants.STATUS_200) {
        if(successCallBack){
          successCallBack(response, loading)
        }
      }
      else{
        if(errorCallBack){
          errorCallBack(response, loading)
        }
      } 
    } catch (error) {
      setLoading(false)
      //This is intentional for error logging.
      console.log("ERROR", error);
      if(error.response) {
        if(error?.response?.status === constants.apiConstants.STATUS_401){
          localStorage.clear();
          window.location = "/";
        }
      }
      if(errorCallBack){
        errorCallBack(error, loading)
      }
    }

    return response;
  };

  return { request, loading };
}

export { useRequestApi };
