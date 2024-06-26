import { Button, Typography, Breadcrumbs, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidetable } from "../side-table";
import "./scope-page.scss";
import constants from "src/constants";
import { Apicalls } from "src/utils/services/axiosClient";
import routeNames from "src/constants/routeNames";
import { useTranslation } from "react-i18next";
import utils from "src/utils";

export const ScopePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [circleSize, setCircleSize] = useState([{}, {}, {}]);
  const [steamBtn, setSteamBtn] = useState(false);
  const [steamBtnValue, setSteamBtnValue] = useState("upstream");
  const [categoriesList, setCategoriesList] = useState([]);
  const [scopeActive, setScopeActive] = useState(location?.state?.routeName + 1);
  const [activecls, setActivecls] = useState(1);
  const [colorCode, setColorCode] = useState("")
  const [activeAlert, SetActiveAlert] = React.useState()
  const [sourceData, setSourceData] = useState({});
  const naviagte = useNavigate();

  React.useEffect(() => {

    if (scopeActive === 3) {
      setSteamBtn(true);
    } else {
      setSteamBtn(false);
    }
    let data = circleSize.map((list, key) => {
      if (key + 1 === scopeActive) {
        return {
          background: "#A9E8FF",
          border: "2.5px solid #4CC7F4",
          transform: "scale(1.3)",
        };
      }
      return {};
    });
    localStorage.setItem("scopeName", location?.state?.routeName !== undefined ? location.state.routeName : 0);

    setCircleSize(data);

  }, [scopeActive]);
  React.useEffect(() => {

  }, [location.state])

  useEffect(() => {
    getScopeList();
  }, [scopeActive]);
  const getScopeList = (scope) => {

    let params = {};
    params.scope = scope ? scope : scopeActive;
    Apicalls.getApiCall(
      constants.endPoints.computation,
      params,
      "",
      handleGetScopeListSuccess,
      handleGetScopeListError
    );
  };

  const handleGetScopeListSuccess = (response) => {
    if (response?.data?.result?.data) {
      setCategoriesList(response?.data?.result);
      setSourceData(response?.data?.result?.data[0]);
      setColorCode(response?.data?.result?.data[0].color_code)
    } else {
      setCategoriesList(response?.data?.result);
      if (response.data.result.upstream !== undefined) {
        setSourceData(response?.data?.result?.[`${steamBtnValue}`][0]);
        setColorCode(response?.data?.result?.[`${steamBtnValue}`][0].color_code)
      }
    }

  };

  const handleGetScopeListError = (error) => {
    //This is intentional for error logging.
    console.log("handleGetScopeListError error", error);
  };

  const breadcrumbs = [
    <Typography
      underline="hover"
      key="1"
      style={{ cursor: "pointer" }}
      color="inherit"
      onClick={() => {
        naviagte(routeNames.computation);
      }}
      className="computaion-bread"
    >
      {t("computationLogic")}
    </Typography>,

    <Typography key="3" className="scope-bread" color="text.primary">
      {`Scope ${scopeActive}`}
    </Typography>,
  ];
  const circleClickHandler = (scope) => {
    if (scope < 2) {
      setActivecls(1);
    }

    setScopeActive(scope + 1)
    let style = {
      background: "#A9E8FF",
      border: "5px solid #4CC7F4",
      transform: "scale(1.3)",
    };

    let data = circleSize.map((list, key) => {
      if (key === scope) {
        return style;
      }

      return {};
    });
    localStorage.setItem("scopeName", scope);
    setCircleSize(data);
    if (scope === 2) {
      setSteamBtn(true);
    } else {
      setSteamBtn(false);
    }
    getScopeList(scope + 1);
    setSteamBtnValue("upstream");

  };
  const categoryDataHandler = (list, arr, stream) => {
    let obj = {};
    if (!stream) {
      obj.data = arr;
    } else {
      if (stream === "upstream") {
        obj[stream] = arr;
        obj.downstream = categoriesList.downstream;
      } else {
        if (stream === "downstream") {
          obj[stream] = arr;
          obj.upstream = categoriesList.upstream;
        }
      }
    }
    setActivecls(list.entity);
    setCategoriesList(obj);
    setColorCode(list.color_code)
    setSourceData(list);
  };

  const downStreamFunc = () => {
    setActivecls(categoriesList["downstream"][0].entity);
    setSourceData(categoriesList["downstream"][0])
    setColorCode(categoriesList["downstream"][0].color_code)
  };

  const upstreamFunc = () => {
    setActivecls(categoriesList["upstream"][0].entity);
    setSourceData(categoriesList["upstream"][0])
    setColorCode(categoriesList["upstream"][0].color_code)
  };

  useEffect(() => {
  }, [categoriesList]);

  React.useEffect(() => {
    if (localStorage.getItem("alertComputation")) {
      setSteamBtnValue(location?.state?.alertstate?.data?.stream)
      setActivecls(location?.state?.alertstate?.data?.entity)
    }
  }, [])
  const onAlertClick = (list, key) => {
    setScopeActive(list?.scope)
    SetActiveAlert(key)
    setSourceData(list)

    if (list?.scope < 3) {
      setActivecls(list?.entity);
    }
    if (list?.scope === 3) {
      setSteamBtnValue(list?.stream);
      setActivecls(list?.entity);
    }
  }

  const decideColorName = (colorCode) => {

    if (colorCode === "red") {
      return "redEmmision";
    }
    else if (colorCode === "orange") {
      return "orangeEmmision";
    }
    else if (colorCode === "blue") {
      return "blueEmmision";
    }
    return "";
  }

  const decideColorCode = (colorCode) => {
    if (colorCode === "red") {
      return "#FFD0D0";
    }
    else if (colorCode === "blue") {
      return "#A9E8FF";
    }
    return "orange";
  }

  const decideBgColorBtn = (color_code) => {
    if (color_code === "red") {
      return "#FFD0D0";
    }
    else if (color_code === "blue") {
      return "#A9E8FF";
    }
    return "orange";
  }

  const decideBorderColor = (color_code) => {
    if (color_code === "red") {
      return "#E92C2C";
    }
    else if (color_code === "blue") {
      return "#003E75";
    }
    return "#ff8c00";
  }

  const decideClassNameCtg = (color_code) => {
    if (color_code === "red") {
      return "redactive";
    }
    else if (color_code === "blue") {
      return "blueactive";
    }
    return "orangeactive";
  }

  return (
    <div className="scope-page-mainCont">
      <div className="scope-container"  >
        <div className="scope-breadcrumb" onClick={() => { SetActiveAlert("") }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className="scope-circle-cont">
          <div className="scope-circle-div" onClick={() => { SetActiveAlert("") }}>
            <div
              className="ScopeC circle1"
              style={circleSize[0]}
              onClick={() => circleClickHandler(0)}
            >
              <a className="circle-head">{t("scope1")}</a>
            </div>
            <div
              className="ScopeC circle1"
              style={circleSize[1]}
              onClick={() => circleClickHandler(1)}
            >
              <a className="circle-head">{t("scope2")}</a>
            </div>
            <div
              className="ScopeC circle1 3"
              style={circleSize[2]}
              onClick={() => circleClickHandler(2)}
            >
              <a className="circle-head">{t("scope3")}</a>
            </div>
          </div>
          {steamBtn && (
            <div className="scope-stream-div" onClick={() => { SetActiveAlert("") }}>
              <Button
                className={`${steamBtnValue === "upstream"
                  ? "activeclas stream-btn"
                  : "stream-btn"
                  }`}
                onClick={() => {
                  setSteamBtnValue("upstream");
                  upstreamFunc();
                }}
              >
                Upstream
              </Button>
              <Button
                className={`${steamBtnValue === "downstream"
                  ? "activeclas stream-btn"
                  : "stream-btn"
                  }`}
                onClick={() => {
                  setSteamBtnValue("downstream");
                  downStreamFunc();

                }}
              >
                {t("downstream")}
              </Button>
            </div>
          )}
        </div>
        {/* <div className="path-upstream">
          <div className="dotted-line-one"></div>
          <div className="dotted-line-two"></div>
          <div className="dotted-line-three"></div>
          <i class="fa-solid fa-angle-down" style={{color: 'gray', width: '2.5rem'}}></i>
        </div>
        <div className="path-downstream">
          <div className="down-line-one"></div>
        </div> */}
        <div className="scope-datalist-cont">
          <div className="scope-datalist-categories">
            <p className="categories-heading">{t("categories")}</p>

            <div className="categories-list" onClick={() => { SetActiveAlert("") }}>
              {categoriesList?.data
                ? categoriesList?.data?.map((list, key, arr) => {
                  return (
                    <Button
                      disableRipple
                      disableFocusRipple
                      key={utils.commonFunctions.keyFinder()}
                      style={
                        activecls === list.entity
                          ? {
                            background: decideBgColorBtn(list.color_code)
                            ,
                            border: `1px solid ${decideBorderColor(list.color_code)} !important`,
                          }
                          : {}
                      }
                      className={`categories-list-btn ${activecls === list.entity && colorCode}Category `}
                      sx={{
                        "& .listItem-No": {
                          background:
                            activecls === list.entity
                              ?
                              `${decideBorderColor(list.color_code)} !important`
                              : "",
                          color:
                            activecls === list.entity
                              ? "#FFFFFF !important"
                              : "",
                          border: activecls === list.entity && `1px solid ${decideBorderColor(list.color_code)} !important`,
                        },
                      }}
                      onClick={() => {
                        categoryDataHandler(list, arr);
                      }}
                    >
                      <div className="listItem-No">{list.entity}</div>
                      <div className="listItem-name">{list.name}</div>
                    </Button>
                  );
                })
                : categoriesList[`${steamBtnValue}`]?.map((list, key, arr) => {
                  return (
                    <Button
                      disableRipple
                      disableFocusRipple
                      key={utils.commonFunctions.keyFinder()}
                      style={
                        activecls === list.entity
                          ? {
                            background: decideBgColorBtn(list.color_code),
                            border: `1px solid ${decideBorderColor(list.color_code)} !important`
                          }
                          : {}
                      }
                      sx={{
                        "& .listItem-No": {
                          background:
                            activecls === list.entity
                              ? `${decideBorderColor(list.color_code)} !important` : "",
                          color:
                            activecls === list.entity
                              ? "#FFFFFF !important"
                              : "",
                          border:
                            activecls === list.entity &&
                            `1px solid ${decideBorderColor(list.color_code)} !important`,
                        },
                      }}
                      className={`categories-list-btn ${activecls === list.entity ? decideClassNameCtg(list.color_code) : ""} `}
                      onClick={() => {
                        categoryDataHandler(list, arr, steamBtnValue);
                      }}
                    >
                      <div className="listItem-No">{list.entity}</div>
                      <div className="listItem-name">{list.name}</div>
                    </Button>
                  );
                })}
            </div>



          </div>
          <div className="scope-datalist-emission-data ">
            <div className="emision-div">
              <p className="emission-heading">{t("emissionDataSource")}</p>
              <div className="emission-list-div">
                <List style={{ height: "100%" }}>
                  <ListItem
                    className={`emission-listItem ${decideColorName(colorCode)} `}
                    style={{
                      minHeight: "31px",
                      background: `${decideColorCode(colorCode)}`,
                    }}
                  >
                    <ListItemText className="emission-cotent">
                      <p className="emission-list-heading">
                        {sourceData?.emission_data_source ? sourceData?.emission_data_source : "DEFRA/ EPA/ CUSTOMER INPUT"}
                      </p>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </div>
            <div className="emision-div">
              <p className="emission-heading">{t("computationMethod")}</p>
              <div className="emission-list-div">
                <List style={{ height: "100%" }}>
                  <ListItem
                    className={`emission-listItem ${decideColorName(colorCode)}`}
                    style={{
                      minHeight: "31px",
                      background: `${decideColorCode(colorCode)}`,
                    }}
                  >
                    <ListItemText className="emission-cotent">
                      <p className="emission-list-heading">
                        {sourceData?.computation_method !== null ? sourceData?.computation_method : "NA"}
                      </p>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Sidetable
        activeAlert={activeAlert}
        onAlertClick={onAlertClick} />
    </div>
  );
};
