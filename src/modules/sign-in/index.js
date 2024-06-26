import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify"
import { Apicalls } from "src/utils/services/axiosClient";
import { useDispatch } from "react-redux";
import { authActions } from "@modules/auth/auth-actions";
import SignInView from "./signIn-view";
import routeNames from "src/constants/routeNames";
import constants from "src/constants";
import {  storeVisibleChartsDetailedSummary,storeVisibleChartsExecutiveSummary } from "src/modules/dash-executive/dash-executive-actions/dash-executive-actions";
const defaultState = {
  open: true,
};

const { setAuthenticatedUser } = authActions;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(defaultState);
  const handleFieldChange = (e) => {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    axios
      .post(constants.endPoints.login, {
        email: state.email,
        password: state.password
      })
      .then((res) => {
        if(res?.data?.data?.tenant_id!=="04a571d3-3120-4e60-b794-b132d6431632"){
          return toast.error("Invalid Credential, Please contact administrator !")
        }
        Apicalls.setAuthorizationToken(res?.data?.data?.access)
        dispatch(
          setAuthenticatedUser({
            userInformation: res?.data?.data,
            token: res?.data?.data?.access,
          })
        );
        toast.success("Login Successful")
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        localStorage.setItem(
          "token",
          JSON.stringify(res?.data?.data?.access)
        );
        navigate(routeNames.detailed);
        handleConfiguration(res);
      })
      .catch(err => {
        setState({ email: "", password: "" })
        toast.error(err.response.data.message)
      })
  };

  const getConfigurationData = async () => {
    let params = {};
    const user = JSON.parse(localStorage.getItem('user'));
    params = { tenant_id: user?.tenant_id }

    Apicalls.postApiCall(
      "https://scai-dev-api.3sc.ai/configuration/v1",
      params,
      "",
      handleConfiguration,
      handleConfigurationError
    );
  }

  const handleConfiguration = (response) => {
    if (response?.data?.data?.permissions) {
      makegrapghnames(response.data?.data?.permissions)
    }
  };

  const handleConfigurationError = (err) => {
    console.log(err);
  }

  const makegrapghnames = (data) => {
    // let temp = [
    //   "EX_BU_PERFORMANCE",
    //   "EX_MODES_VS_EMISSION",
    //   "EX_TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES", 
    //   "EX_EMISSION_BY_COUNTRY_DETAILED",
    //   "EX_EMISSION_PERFORMANCE"
    // ];
    let infographicsData = [];
  //  let onlyViewsNames = [];
    // C_EMISSION_BY_SUPPLIER
    const graphKeysDetailed = data.filter(item => item.substr(0,2) === "C_");
    const graphKeysExecutive = data.filter(item => item.substr(0,3) === "EX_");

    graphKeysDetailed.forEach(item => {
      let obj = {
        graph_id: item.slice(2),
        name: item.substr(2,).toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, firstChar => firstChar.toUpperCase()),
      };
      infographicsData.push(obj);
      //onlyViewsNames.push(obj.name);
    });
    dispatch(storeVisibleChartsDetailedSummary(infographicsData)); // all object
    
    let infographicsExecutive = [];
    graphKeysExecutive?.forEach(item => {
      let obj = {
        graph_id: item.slice(3),
        name: item.substr(3,).toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, firstChar => firstChar.toUpperCase()),
      };
      infographicsExecutive.push(obj);
    });
    dispatch(storeVisibleChartsExecutiveSummary(infographicsExecutive)); // all object

  }
  return (
    <SignInView
      email={state.email}
      password={state.password}
      handleFieldChange={handleFieldChange}
      handleLogin={handleLogin}
    />
  );
};

export default SignIn;
