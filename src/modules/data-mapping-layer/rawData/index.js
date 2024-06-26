import { TabContext } from "@material-ui/lab";
import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import routeNames from "src/constants/routeNames";
import { useNavigate } from "react-router-dom";
import CustomButton from "src/components/buttons/Buttons";
import { StyledMenu } from "src/components/styledMenu";
import { getImageFromURL, IMAGES } from "src/constants/images";
import "../datamapping.scss";
import SelectTable from "./selectTable";
import { useSelector, useDispatch } from "react-redux";
import { modes, scopeEntityData, monthsName } from "src/constants/appConstants";
import Loader from "src/components/loader";
import { uploadFile } from "src/modules/entity-management/entity-management-actions/entity-management-actions";
import { toast } from "react-toastify";
import constants from "src/constants";
import { dmlActions } from "src/modules/dml/dml-actions/index";
import { useRequestApi } from "src/customHooks/useRequestApi";
import { t } from "i18next";
import utils from "src/utils";

export default function RawData() {
  const { request } = useRequestApi();
  const { selectedEntity, selectedModeDml, selectedMonth, selectedYear } = useSelector((state) => ({
    selectedEntity: state.dmlReducer.selectedEntity,
    selectedModeDml: state.dmlReducer.selectedModeDml,
    selectedMonth: state.dmlReducer.selectedMonth,
    selectedYear: state.dmlReducer.selectedYear,
  }));
  const { setDmlSelectedEntity, setDmlSelectedMode, setDmlSelectedMonth, setDmlSelectedYear } = dmlActions;
  const [selectedScope, setScope] = React.useState(selectedEntity);
  const [selectedMode, setMode] = React.useState(selectedModeDml);
  const [selectMonth, setSelectMonth] = React.useState(selectedMonth);
  const [selectYear, setSelectYear] = React.useState(selectedYear);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [selectedReferenceId, setSelectedReferenceId] = useState('');
  const [isFileProcessed, setIsFileProcessed] = useState(false);
  const open = Boolean(anchorEl);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { selectedFiles } = useSelector((state) => state.dmlReducer);
  const { selectedRule } = useSelector((state) => state.dmlReducer);
  const [ruleSelected, setRuleSelected] = useState(false);
  let apiTimeout = null;



  const handleProcessClick = (event) => {
    if (Object.keys(selectedFiles).length) {
      if (selectedFiles.length > 0 && selectedFiles[0].name) {
        if (selectedScope && selectedMode && selectMonth && selectYear && ruleSelected) {
          setAnchorEl(event.currentTarget);
          handleFileUpload();
        } else {
          alert("Please select scope, mode, month, year & rule.");
        }
      }
    } else {
      alert("Please select file first.");
    }
  };


  const handleFileUpload = () => {
    const formData = new FormData();
    let params = {
      scopeId: 3,
      entityId: 9,
      mode: selectedMode,
      monthsName: selectMonth,
      years: selectYear
    };
    if (Object.keys(selectedFiles).length) {
      if (selectedFiles.length > 0 && selectedFiles[0].name) {
        setFileUploading(true);
        formData.append("file", selectedFiles[0]);
        uploadFile(
          constants.endPoints.uploadStructuredSheetDataMapping,
          params,
          formData,
          handleUploadFileSuccess,
          handleUploadFileError
        );
      } else {
        alert("Please select file again.");
      }

    }
  };

  function handleClickOutside(event) {
    // console.log(event.target.innerText, "EEEEE");
    if (event.target.innerText !== "Process") {
      const statusBar = document.getElementById("progressMatrix");
      if (statusBar && !statusBar.contains(event.target)) {
        showNotification();
        event.stopPropagation();
      }
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    }
  }, [])

  function showNotification() {
    toast.info("File upload is under process!", { autoClose: 8000 })
  }

  function handleUploadFileSuccess(response) {
    setFileUploading(false);
    if (response?.data?.referenceId) {
      setSelectedReferenceId(response?.data?.referenceId)
    }
    toast.success("File uploaded successfully.");
  }
  useEffect(() => {
    if (selectedReferenceId) {
      apiTimeout = setTimeout(checkFileStatusApiCall, 5000)
    }
  }, [selectedReferenceId])


  function handleUploadFileError(error) {
    // This is intentional for error logging.
    console.log("handleUploadFileError", error);
    handleClose()
    setFileUploading(false);
    toast.error(error?.response?.data?.message);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setScope(event.target.value);
    dispatch(setDmlSelectedEntity(event.target.value));
  };
  const handleChangeMode = (event) => {
    setMode(event.target.value);
    dispatch(setDmlSelectedMode(event.target.value));
  };
  const handleChangeMonth = (event) => {
    setSelectMonth(event.target.value);
    dispatch(setDmlSelectedMonth(event.target.value));
  }
  const handleChangeYear = (event) => {
    setSelectYear(event.target.value);
    dispatch(setDmlSelectedYear(event.target.value))
  }
  const [value] = React.useState("1");

  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate(routeNames.dataMappingLayer);
  };

  const handleViewMetricCLick = () => {
    handleClose();
    navigate(routeNames.dataMappingLayer);
  };
  const handleViewRuleClick = () => {
    if (Object.keys(selectedFiles).length) {
      if (selectedFiles.length > 0 && selectedFiles[0].name) {
        if (selectedScope && selectedMode && ruleSelected) {
          naviagte(routeNames.viewRule);
        } else {
          alert("Please select scope, mode, rule first.");
        }
      } else {
        alert("Please select file first.");
      }
    } else {
      alert("Please select file first.");
    }
  };

  const handleRuleRowClick = (e) => {
    setRuleSelected(e);
  };
  useEffect(() => {
    if (selectedRule.length) {
      setRuleSelected(true)
    }
    else {
      setRuleSelected(false)
    }
  }, [selectedRule])

  const checkFileStatusApiCall = async () => {
    setIsFileProcessed(false);
    let params = {};
    if (selectedReferenceId) {
      params.referenceId = selectedReferenceId;
      await request(constants.apiConstants.METHOD_GET, constants.endPoints.checkFileStatus, params, null, handleCheckFileStatusApiCallSuccess, handleCheckFileStatusApiCallError);
    }
  }

  const handleCheckFileStatusApiCallSuccess = (response) => {
    if (response?.data?.processed) {
      setIsFileProcessed(true);
      clearTimeout(apiTimeout);
    }
    else {

      if (selectedReferenceId) {
        apiTimeout = setTimeout(checkFileStatusApiCall, 5000);
      }
    }
  }
  const handleCheckFileStatusApiCallError = (error) => {
    // This is intentional for error logging.
    console.log("handleCheckFileStatusApiCallError", error);
    setIsFileProcessed(false);
    clearTimeout(apiTimeout);
  }

  const getSelectionIcon = () => {
    return (
      <img
        src={getImageFromURL(`${IMAGES.SELECTICON}`)}
        alt={getImageFromURL(`${IMAGES.SELECTICON}`)}
        width={15}
        style={{ marginLeft: "-30%", cursor: "pointer" }}
      />
    )
  }

  const currentYear = new Date().getFullYear();
  const years = Array(11).fill().map((_, i) => Number(currentYear) - i);
  console.log(years, 'currentYear');


  return (
    <div
      className="data-mapping-container"
      style={{ height: "90vh", overflowY: "scroll" }}
    >
      <p className="uploadHead">Uploaded File - Raw Data</p>
      <Box className="uploadRawBox">
        {selectedFiles.length > 0 && selectedFiles[0].name && (
          <Box className="uploadFile">
            {selectedFiles.length > 0 &&
              selectedFiles[0].name &&
              selectedFiles[0].name}
            <img
              onClick={handleClick1}
              src={getImageFromURL(`${IMAGES.CROSSICON}`)}
              alt={getImageFromURL(`${IMAGES.CROSSICON}`)}
              width={15}
              height={15}
            />
          </Box>
        )}
      </Box>
      <div style={{ marginTop: "3%" }} className="rowDataBody">
        <Grid container display={"flex"} alignItems={"center"} gap={"10px  "}>
          <Grid item>
            <p className="uploadHead">Entity</p>
            <FormControl sx={{ minWidth: 330, marginTop: "4%" }} size="small">
              <Select
                className="selectField"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiList-root": {
                        ".MuiMenuItem-root": {
                          fontSize: "14px !important"
                        }
                      }
                    },
                    style: {
                      maxHeight: 200,
                      fontSize: "14px",
                      marginTop: "10px",
                    },
                  },
                }}
                id="demo-simple-select"
                value={!selectedScope ? "none" : selectedScope}
                onChange={handleChange}
                IconComponent={() => (
                  getSelectionIcon()
                )}
              >
                <MenuItem style={{ display: "none" }} value={"none"}>
                  {t("scope")}
                </MenuItem>
                {scopeEntityData.map((item) => (
                  <MenuItem
                    value={item.name}
                    disabled={
                      item.name !== "Scope 3.9(Downstream Transportation)"
                        ? true
                        : false
                    }
                    key={utils.commonFunctions.keyFinder()}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <p className="miscellanous" sx={{ fontWeight: "500" }} >{t("miscellaneousInput")}</p>
            <FormControl sx={{ minWidth: 250, marginTop: "5%" }} size="small">
              <Select
                className="selectField"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiList-root": {
                        ".MuiMenuItem-root": {
                          fontSize: "14px !important"
                        }
                      }
                    },
                    style: {
                      maxHeight: 200,
                      fontSize: "14px",
                      marginTop: "10px",
                    },
                  },
                }}
                id="demo-simple-select"
                value={!selectedMode ? "none" : selectedMode}
                InputLabelProps={{ shrink: false }}
                onChange={handleChangeMode}
                IconComponent={() => (
                  getSelectionIcon()
                )}
              >
                <MenuItem style={{ display: "none" }} value={"none"}>
                  {t("mode")}
                </MenuItem>
                {modes.map((item) => (
                  <MenuItem value={item.name} key={utils.commonFunctions.keyFinder()}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div className="period-select">
            <Grid>
              <p className="month-year" sx={{ fontWeight: "500" }}>{t("Select Month")}</p>
              <FormControl sx={{ minWidth: 150, marginTop: "11%" }} size="small">
                <Select
                  className="selectField"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiList-root": {
                          ".MuiMenuItem-root": {
                            fontSize: "14px !important"
                          }
                        }
                      },
                      style: {
                        maxHeight: 200,
                        fontSize: "14px",
                        marginTop: "10px",
                        paddingRight: "10px"
                      },
                    },
                  }}
                  id="demo-simple-select"
                  value={!selectMonth ? "none" : selectMonth}
                  InputLabelProps={{ shrink: false }}
                  onChange={handleChangeMonth}
                  IconComponent={() => (
                    getSelectionIcon()
                  )}>
                  <MenuItem
                    style={{ display: "none" }}
                    value={"none"}>
                    {t("Month")}
                  </MenuItem>
                  {monthsName.map((item) => (
                    <MenuItem value={item.name} key={utils.commonFunctions.keyFinder()}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <p className="month-year" sx={{ fontWeight: "500" }}>{t("Select Year")}</p>
              <FormControl sx={{ minWidth: 150, marginTop: "11%" }} size="small">
                <Select
                  className="selectField"
                  id="selectField"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiList-root": {
                          ".MuiMenuItem-root": {
                            fontSize: "14px !important"
                          }
                        }
                      },
                      style: {
                        maxHeight: 200,
                        fontSize: "14px",
                        marginTop: "10px",
                      },
                    },
                  }}
                  value={!selectYear ? "none" : selectYear}
                  InputLabelProps={{ shrink: false }}
                  onChange={handleChangeYear}
                  IconComponent={() => (
                    getSelectionIcon()
                  )}>
                  <MenuItem
                    style={{ display: "none" }}
                    value={"none"}>
                    {t("Year")}
                  </MenuItem>
                  {years.map((item) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </div>
        </Grid>

        <div style={{ marginTop: "5%", marginBottom: "3%" }}>
          <Grid container>
            <Grid item lg={4}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box>
                    <Box display="flex">
                      <Button
                        sx={{ whiteSpace: "nowrap" }}
                        className="selectButton"
                      >
                        {t("selectRule")}
                      </Button>
                      <Button
                        sx={{ whiteSpace: "nowrap" }}
                        className="addButton"
                      >
                        {t("addRule")}
                      </Button>
                      <Button
                        sx={{ whiteSpace: "nowrap" }}
                        className="addButton"
                      >
                        {t("editRule")}
                      </Button>
                    </Box>
                  </Box>
                </TabContext>
              </Box>
            </Grid>
            <Grid item lg={4}></Grid>
            <Grid item lg={4}  >
              <Box display="flex" justifyContent="flex-end">
                <CustomButton
                  buttonTextStyle={{
                    color: "#FFF",
                    fontSize: "15px !important",
                    fontWeight: "500",
                    padding: "20px 10px !important"
                  }}
                  typeView={"viewRule"}
                  buttonText={"View Rule"}
                  buttonWidth={{ width: "100px" }}
                  onClick={() => {
                    handleViewRuleClick();
                  }}
                  bgColor={"#b1000e"}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        <Card className="selectTableCard">
          <SelectTable handleRuleRowClick={handleRuleRowClick} />
        </Card>
        <Box display="flex" justifyContent="flex-end">
          <CustomButton
            buttonTextStyle={{
              color: "#FFF",
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "3%",
              padding: "20px 23px !important"
            }}
            typeView={"viewRule"}
            onClick={handleProcessClick}
            buttonWidth={{ width: "100px" }}
            buttonText={"Process"}
            bgColor={"#b1000e"}
          />
        </Box>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiModal-backdrop": {
              background: "rgba(0, 0, 0, 0.25)",
            },
            "& .MuiPaper-root": {
              borderRadius: "11px",
              width: "360px",
              left: "37% !important",
              top: "32%!important",
            },
            "& .MuiMenuItem-root": {
              cursor: "grab",
            },
            "& .MuiMenuItem-root:active": {
              backgroundColor: "#ADD8E6 !important",
            },
            "& .MuiMenuItem-root:hover": {
              background: "#ADD8E6",
            },
          }}
        >
          <div
            style={{
              height: "220px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center !important",
            }}
            className="scrollbar progressMatrix"
            id="progressMatrix"
          >

            {fileUploading ? (
              <div style={{ width: "100%", justifyContent: "center" }}>
                {" "}
                <Loader />{" "}
              </div>
            ) : (
              <Box
                display="flex"
                height={"100%"}
                flexDirection={"column"}
                justifyContent="center"
                width={"100%"}
              >
                {
                  isFileProcessed ? <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "50px auto 0px",
                      padding: "10px 40px",
                      border: "1px solid #00BE1E",
                      borderRadius: "11px",
                      background: "#D1F4DA",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {t("scopeDataProcessedSuccessfully")}
                    </span>
                    <span
                      onClick={() => {
                        naviagte(routeNames.scope39);
                      }}
                      style={{
                        fontWeight: "500",
                        cursor: "pointer",
                        fontSize: "12px",
                        textDecorationLine: "underline",
                        color: "#b1000e",
                        marginTop: "10px",
                        whiteSpace: "nowrap",
                      }}
                      className="tamplateBtn"
                    >
                      {t("downstreamTransportation")}
                    </span>
                  </div> :

                    <div className="progress-outer">
                      <div className={`progress `}>
                        <div
                          className={`progress-bar`}
                          style={{
                            width: 50 + "%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ width: 40, height: 40 }}>
                            <CircularProgressbarWithChildren
                              value={"0.5"}
                              styles={buildStyles({
                                textColor: "#111",
                                pathColor: "#26A400",
                                fontSize: 12,
                              })}
                              maxValue={1}
                            ></CircularProgressbarWithChildren>
                          </div>{" "}
                          <span>{t("inProgress")}</span>{" "}
                          <span
                            className="progress-info"
                            id="status-bar">50%</span>
                        </div>
                      </div>
                    </div>
                }
                <div
                  style={{
                    height: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomButton
                    onClick={handleViewMetricCLick}
                    override={true}
                    buttonWidth={{
                      marginTop: "5%",
                    }}
                    buttonTextStyle={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                    buttonText="View Metrics"
                    bgColor={"#CECECE"}
                  />
                </div>
              </Box>
            )}
          </div>
        </StyledMenu>
      </div>
    </div >
  );
}
