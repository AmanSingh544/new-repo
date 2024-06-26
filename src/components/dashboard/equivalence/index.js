import Box from "@mui/material/Box";
import {
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc,
} from "src/utils/utilityFunction";
import "./index.scss";
import DonutChart from "src/components/infographics/charts/donutChart";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRequestApi } from "src/customHooks/useRequestApi";
import constants from "src/constants";
import { storePotentialEmissions } from "src/modules/dash-equivalence/dash-equivalence-actions/dash-equivalence-actions";
import utils from "src/utils";
import { Apicalls } from "src/utils/services/axiosClient";
import { useTranslation } from "react-i18next";
import {
  placeHolderImage,
  failedImageMessage,
} from "src/constants/appConstants";
import { FaPencilAlt } from "react-icons/fa";
import CustomButton from "src/components/buttons/Buttons";
import { StyledMenu } from "src/components/styledMenu";
import { getImageFromURL, IMAGES } from "src/constants/images";
import Loader from "src/components/loader";
import { toast } from "react-toastify";

const Equivalence = () => {
  const { t } = useTranslation();
  const [sliderVal, setSliderVal] = useState(50);
  const [equivalenceData, setEquivalenceData] = useState([]);
  const [equiTotalEmm, setEquiTotalEmm] = useState("0");
  const [labelArr, setLabelArr] = useState([]);
  const [sliceColorArr, setSliceColorArr] = useState([]);
  const [sliceIcon, setSliceIcon] = useState([]);
  const [donutDataArr, setDonutDataArr] = useState([]);
  const [emissionArr, setEmissionArr] = useState([]);
  const [marks, setMarks] = useState([]);
  const [positionLeft, setPositionLeft] = useState(0);
  const [positionTop, setPositionTop] = useState(0);
  const [totalSavedEmission, setTotalSavedEmission] = useState("");
  const [equivalenceHidden, setEquivalenceHidden] = useState([]);
  const [equivalenceShow, setEquivalenceShow] = useState([]);
  const [settingEquivalents, setSettingEquivalents] = useState(false);
  const ref = React.createRef();
  const { request } = useRequestApi();
  const dispatch = useDispatch();
  const {
    bu,
    team,
    region,
    country,
    scope,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) => state.eqFilters);

  const { regionData } = useSelector((state) => state.globalRed);

  const { potentialEmissions } = useSelector((state) => ({
    potentialEmissions: state.dashEquivalenceReducer.potentialEmissions,
  }));

  useEffect(() => {
    getEquivalenceData();
  }, [
    scope.length,
    bu.length,
    team.length,
    country.length,
    region.length,
    calendar_filters,
  ]);



  const getEquivalenceData = async () => {
    let params = {};
    if (makeScopeArray(scope)) {
      params.scope = JSON.stringify(makeScopeArray(scope));
    }
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    if (makeRegion(region, regionData)) {
      params.region = JSON.stringify(makeRegion(region, regionData));
    }
    if (makeRc(country)) {
      params.rc = JSON.stringify(makeRc(country));
    }
    if (makeBu(bu, bu_filters)) {
      params.bu = JSON.stringify(makeBu(bu, bu_filters));
    }
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
    }
    Apicalls.getApiCall(
      constants.endPoints.equvalenceDashBoard,
      params,
      "",
      handleEquivalenceDashSuccess,
      handleEquivalenceDashError
    );
  };

  const handleEquivalenceDashSuccess = (response) => {
    if (response) {
      setEquivalenceData(response?.data?.result?.data);
      setEquiTotalEmm(response?.data?.result?.total_emission);
      generateMarksArray(response?.data?.result?.total_emission);
    }
  };

  const generateMarksArray = (val) => {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push({
        value: calculateValue(val, i),
        label: calculateLabel(val, i),
      });
    }
    setMarks(arr);
  };

  const calculateValue = (val, i) => {
    return (100 / 8) * i;
  };
  const calculateLabel = (val, i) => {
    if (val) {
      return ((parseFloat(val) / 4) * (i - 4)).toFixed(1);
    }
  };
  const handleEquivalenceDashError = (error) => {
    console.log("error handleEquivalenceDashError", error);
  };

  useEffect(() => {
    getPotentialEmissionData();
  }, []);

  const getPotentialEmissionData = async () => {
    //Potential emission is the data what we get for the donut.
    const response = await request(
      constants.apiConstants.METHOD_GET,
      constants.endPoints.potentialEmission,
      null
    );
    if (response) {
      if (response.data.status_code === constants.apiConstants.STATUS_200) {
        const {
          data: { result: data },
        } = response;
        dispatch(storePotentialEmissions(data.data));
        setTotalSavedEmission(response?.data?.result?.total_saved_energy);
        localStorage.setItem(
          "total_saved_energy",
          response?.data?.result?.total_saved_energy?.toFixed(0)
        );
      }
    }
  };

  useEffect(() => {
    if (potentialEmissions.length > 0) {
      makeDonutArr(potentialEmissions);
      makeLabelArr(potentialEmissions);
      makeColorArr(potentialEmissions);
      makeIconArr(potentialEmissions);
      makeEmission(potentialEmissions);
    }
  }, [potentialEmissions]);

  const makeEmission = (arr) => {
    let emissionarr = [];
    arr.length > 0 &&
      arr.map((item) => {
        emissionarr.push(item.emissions);
      });
    setEmissionArr(emissionarr);
  };
  const makeDonutArr = (arr) => {
    let donutArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        donutArr.push(Number(item.percentage.split("%")[0]).toFixed(2));
      });
    setDonutDataArr(donutArr);
  };

  const makeIconArr = (arr) => {
    let iconArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        iconArr.push(item.icon);
      });
    setSliceIcon(iconArr);
  };
  const makeLabelArr = (arr) => {
    let labelArr = [];
    arr.length > 0 &&
      arr.map((item) => {
        labelArr.push(item.name);
      });
    setLabelArr(labelArr);
  };

  const makeColorArr = (arr) => {
    let sliceColor = [];
    arr.length > 0 &&
      arr.map((item) => {
        sliceColor.push(item.color_code);
      });
    setSliceColorArr(sliceColor);
  };


  const handleCardInc = (e) => {
    if (equiTotalEmm) {
      e.preventDefault();
      setSliderVal(200);
    }
  };
  const handleCardDec = (e) => {
    if (equiTotalEmm) {
      e.preventDefault();
      setSliderVal(0);
    }
  };

  const handleMouseHoverOut = (e) => {
    setSliderVal(50);
  };

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  function valuetext(value) {
    return `${value}`;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setPositionTop(
      (window.screen.height -
        document.querySelector(".MuiAppBar-positionFixed")?.clientHeight -
        470) /
      2
    );
    setPositionLeft(
      (window.screen.width -
        document.querySelector(".MuiDrawer-root")?.clientWidth -
        600) /
      2 +
      document.querySelector(".MuiDrawer-root")?.clientWidth
    );
  }, [anchorEl])

  useEffect(() => {
    getClientEquivalence();
  }, []);

  function getClientEquivalence() {
    Apicalls.getApiCall(
      constants.endPoints.clientEquivalence,
      "",
      "",
      handleClientEquivalenceSuccess,
      handleClientEquivalenceError
    );
  }

  const handleClientEquivalenceSuccess = (response) => {
    console.log("response303",response)
    let selectedArrFromBe = [];
    let deSelectedArrFromBe = [];
    if (response?.data?.result) {
      response?.data?.result?.equi_show?.map((item, index) => {
        selectedArrFromBe.push({
          ...item,
          elePosition: index,
          show: true,
        });
      });

      response?.data?.result?.equi_hide?.map((item, index) => {
        deSelectedArrFromBe.push({
          ...item,
          elePosition: response?.data?.result?.equi_show?.length + index,
          show: false,
        });
      });
      setEquivalenceShow(selectedArrFromBe);
      setEquivalenceHidden(deSelectedArrFromBe);
    }
  };
  const handleClientEquivalenceError = (error) => {
    console.log("handleClientEquivalenceError", error);
  };

  const handleClickCheckBox = (e, currentItem) => {
    if (equivalenceShow.length >= 6 && e?.target?.checked) {
      alert("At max 6 equivalents can be applied.");
    } else {
      if (currentItem.show) {
        const filteredArray = equivalenceShow.filter(
          (item) => item.id !== currentItem.id
        );
        setEquivalenceShow(filteredArray);
        let newItem = { ...currentItem };
        newItem.show = false;
        let newTempDeselectedArr = [...equivalenceHidden];
        newTempDeselectedArr.push(newItem);
        setEquivalenceHidden([...newTempDeselectedArr]);
      } else {
        const filteredArray = equivalenceHidden.filter(
          (item) => item.id !== currentItem.id
        );
        setEquivalenceHidden(filteredArray);
        let newItem = { ...currentItem };
        newItem.show = true;
        let newTempSelectedArr = [...equivalenceShow];
        newTempSelectedArr.push(newItem);
        newTempSelectedArr.sort((a, b) => {
          if (a.elePosition > b.elePosition) {
            return 1;
          }
          if (b.elePosition > a.elePosition) {
            return -1;
          }
          return 0;
        });
        setEquivalenceShow([...newTempSelectedArr]);
      }
    }
  };

  const findSelectedEquivalents = () => {
    let selectedEquivalents = [];
    equivalenceShow.forEach((item) => {
      selectedEquivalents.push(item.id);
    });
    return selectedEquivalents;
  };

  const handleSave = () => {
    if (equivalenceShow.length === 6) {
      editEquivalenceSetting();
    } else {
      alert("Minimium 6 equivalents needs to be selected.");
    }
  };
  const editEquivalenceSetting = () => {
    setSettingEquivalents(true);
    let data = {
      show: findSelectedEquivalents(),
    };
    Apicalls.putApiCall(
      constants.endPoints.editEquivalence,
      data,
      handleEditEquivalenceSettingSuccess,
      handleEditEquivalenceSettingError
    );
  };

  const handleEditEquivalenceSettingSuccess = (response) => {
    setSettingEquivalents(false);
    getEquivalenceData();
    handleClose();
  };
  const handleEditEquivalenceSettingError = (error) => {
    setSettingEquivalents(false);
    toast.error("Error updating equivalents.");
  };

  const getTenantName = () => {
    if (localStorage.getItem("user")) {
      const { tenant_name } = JSON.parse(localStorage.getItem("user"));
      return tenant_name;
    }
    return "";
  };

  const tenantNameCorrectFormat = () => {
    return getTenantName().split(" ").map((data) => {
      const str = data;
      const str2 =
        str.charAt(0).toUpperCase() + str.slice(1);
      return str2;
    }).join(" ");
  }
  const stylesStyledMenu = () => {
    return {
      "& .MuiModal-backdrop": {
        background: "rgba(0, 0, 0, 0.25)",
      },
      "& .MuiPaper-root": {
        borderRadius: "11px",
        width: "600px",
        top: positionTop && `${positionTop}px!important`,
        left: positionLeft && `${positionLeft}px!important`,
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
    }
  }
  return (
    <div ref={ref} className="executive-index" style={{ padding: "20px 32px" }} onClick={(e) => handleMouseHoverOut(e)}
    >
      <Grid container spacing={2} className="main_container_lg">
        {equivalenceData?.length > 0 && (
          <Grid item md={6} sm={12} xs={12} className="main_card_1">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography className="cardbx_right_text1">
                {tenantNameCorrectFormat()} {equiTotalEmm?.toFixed(2)}
                <span> KTCO<sub>2</sub>e</span>{" emissions is equivalent to"}
              </Typography>
              <CustomButton
                buttonText={"Edit"}
                onClick={handleClick}
                buttonWidth={{ width: "13%" }}
                boxShadow="0px 0px 6px rgba(0, 0, 0, 0.25)"
                buttonTextStyle={{ color: "#000000" }}
                bgColor={"#FFFFFF"}
                variant="outlined"
                icon={<FaPencilAlt />}
              />
            </Box>

            <Box className="slider_bx">
              <Slider
                sx={{
                  "& .MuiSlider-markLabel": {
                    paddingTop: "0.5rem",
                  },
                }}
                value={sliderVal}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                marks={marks}
              />
            </Box>

            <Grid container spacing={3} style={{ alignItems: "stretch" }}>
              {equivalenceData &&
                equivalenceData?.map((d, i) => {
                  return (
                    <Grid
                      item
                      md={4}
                      sm={12}
                      xs={12}
                      lg={4}
                      style={{ display: "flex" }}
                      key={utils.commonFunctions.keyFinder()}
                    >
                      <div
                        className={`${d.type == "consume"
                          ? "card_box1 bx1"
                          : "card_box1 card_bx2 bx2"
                          }`}
                        onMouseOver={
                          d.type == "consume" ? handleCardInc : handleCardDec
                        }
                      >
                        <img
                          className="icon_img"
                          src={d.icon ? d.icon : placeHolderImage}
                          alt={failedImageMessage}
                        />
                        <p>{d.value.toLocaleString("en-AU")}</p>
                        <label>{d.name}</label>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        )}
        <StyledMenu
          id="demo-customized-menu"
          className="equi-edit-list"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={stylesStyledMenu()}
        >
          <Typography
            component={"div"}
            sx={{
              padding: "20px 20px 20px 10px",
              background: "#0094BA",
              border: "1px solid #0094BA",
              borderRadius: "11px 11px 0px 0px",
            }}
            disableRipple
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                fontSize: "17px",
              }}
              component={"span"}
            >
              {t("equivalentsList")}
            </Typography>
            <Typography
              sx={{
                fontWeight: "600",
                float: "right",
                color: "#fff",
              }}
              component={"span"}
              className="infoData-font"
            >
              {`Selected (${equivalenceShow.length}) - 6`}
            </Typography>
          </Typography>
          <MenuList
            sx={{
              overflowX: "hidden",
              padding: "0px",
              height: "320px",
              overflowY: "auto"
            }}
            className="scrollbar"
          >
            {equivalenceShow.length > 0 &&
              equivalenceShow?.map((i) => {
                return (
                  <MenuItem
                    sx={{
                      padding: "8px 15px",
                    }}
                    key={utils.commonFunctions.keyFinder()}
                    disableRipple
                  >
                    <img width={25} height={25} src={i?.icon} alt={i?.icon} />

                    <Typography
                      className="infoData-font"
                      sx={{ marginLeft: "30px", width: "85%" }}
                      component={"span"}
                    >
                      {i?.name}
                    </Typography>

                    <Checkbox
                      color="default"
                      icon={
                        <img
                          alt={IMAGES.UNCHECKEDBOX}
                          className="checkbox-img"
                          src={
                            getImageFromURL(`${IMAGES.UNCHECKEDBOX}`)
                          }

                        />
                      }
                      checkedIcon={
                        <img
                          src={getImageFromURL(`${IMAGES.CHECKEDBOX}`)}
                          alt={IMAGES.CHECKEDBOX}
                          className="checkbox-img"
                        />
                      }
                      onChange={(e) => handleClickCheckBox(e, i)}
                      checked={i?.show}
                    />
                  </MenuItem>
                );
              })}
            {equivalenceHidden.length > 0 && (
              <Divider
                variant="fullWidth"
                sx={{ borderStyle: "solid", borderWidth: "1px", width: "100%" }}
              />
            )}
            {equivalenceHidden.length > 0 &&
              equivalenceHidden?.map((i) => {
                return (
                  <MenuItem
                  disableRipple
                    sx={{
                      padding: "8px 15px",
                    }}
                    key={utils.commonFunctions.keyFinder()}
                  >
                    <img width={25} height={25} src={i?.icon} alt={i?.icon} />

                    <Typography
                      className="infoData-font"
                      sx={{ marginLeft: "30px", width: "85%" }}
                      component={"span"}
                    >
                      {i?.name}
                    </Typography>

                    <Checkbox
                      color="default"
                      icon={
                        <img
                          className="checkbox-img"
                          alt={IMAGES.UNCHECKEDBOX}
                          src={
                            getImageFromURL(`${IMAGES.UNCHECKEDBOX}`)
                          }
                        />
                      }
                      checkedIcon={
                        <img
                          className="checkbox-img"
                          alt={IMAGES.CHECKEDBOX}
                          src={getImageFromURL(`${IMAGES.CHECKEDBOX}`)}
                          
                        />
                      }
                      onChange={(e) => handleClickCheckBox(e, i)}
                      checked={i?.show}
                    />
                  </MenuItem>
                );
              })}
          </MenuList>

          <Typography
            display="flex"
            justifyContent={"flex-end"}
            component={"div"}
            style={{
              borderTop: "1px solid #DCDCDC",
              padding: "20px 25px",
              backgroundColor: "#F5F5F5",
            }}
          >
            {settingEquivalents ? (
              <Loader />
            ) : (
              <CustomButton
                override={true}
                onClick={handleSave}
                buttonWidth={{ width: "100px", height: "28px !important" }}
                buttonTextStyle={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                buttonText={"Save"}
                bgColor={"#1D1E1F"}
              />
            )}
          </Typography>
        </StyledMenu>

        {/* <Grid
          component={"div"}
          item
          style={{ paddingLeft: "45px" }}
          sm={10}
          xs={10}
          md={6}
          lg={6}
          className="main_card_2"
        >
          <div className="donut-executive-">
            <Typography
              className="cardbx_right_text"
              style={{ textAlign: 'left', width: "100%", height: "10%" }}
            >
              {utils.commonFunctions.isNullUndefined(totalSavedEmission)
                ? (tenantNameCorrectFormat() + " " + t("saved")) + t("ktCoeOfPotentialEmissions")
                : tenantNameCorrectFormat() + " " + t("saved") +
                (totalSavedEmission?.toFixed(0) +
                  t("ktCoeOfPotentialEmissions"))}
            </Typography>
            <Box
              display="flex"
              flexDirection={"column"}
              className="donut-executive-div"
              sx={{
                borderRadius: "11px",
                background: "#FFFFFF",
                border: "1px solid #ffffff",
                boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <DonutChart
                cutout={window.screen.width > 1500 ? 90 : 65}
                type={"equivalence"}
                backgroundColor={
                  sliceColorArr
                }
                emissionArr={emissionArr}
                sliceIcon={sliceIcon}
                donutData={donutDataArr}
                labels={labelArr}
                totalSavedEmission={totalSavedEmission}
                loading={false}
              />
            </Box>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Equivalence;

