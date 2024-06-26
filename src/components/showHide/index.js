import React, { useState, useRef, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import CustomButton from "src/components/buttons/Buttons";
import { getImageFromURL, IMAGES } from "src/constants/images";
import MenuList from "@mui/material/MenuList";
import { StyledMenu } from "src/components/styledMenu/index";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import utils from "src/utils";
import { graphNames_new as graphNames } from "src/constants/appConstants";

const fontStyle = {
  fontSize: "11.5px",
  fontWeight: "500",
  color: "#5C5C5C",
};
const constStyles = {
  fontSize: "13px",
  fontWeight: "400",
  color: "#ffffff",
};

const metricContainer = {
  marginTop: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  float: "right",
};
const customizeText = {
  marginRight: "5px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#1C1C1C",
};
const styles = {
  metricContainer,
  customizeText,
};

export default function ShowHide({
  selectedArr,
  deSelectedArr,
  onAllPress,
  handleSaveClick,
  updateSelectedArr,
  updateDeSelectedArr,
  handleResetClick,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [positionLeft, setPositionLeft] = useState(0);
  const [positionTop, setPositionTop] = useState(0);
  const inputRef = useRef(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    setAnchorEl(null);
    handleSaveClick();
  };

  const handleReset = () => {
    handleClose();
    handleResetClick();
  };

  useEffect(() => {
    setPositionTop(
      (window.screen.height -
        document.querySelector(".MuiAppBar-positionFixed")?.clientHeight -
        482) /
      2
    );
    setPositionLeft(
      (window.screen.width -
        document.querySelector(".MuiDrawer-root")?.clientWidth -
        500) /
      2 +
      document.querySelector(".MuiDrawer-root")?.clientWidth
    );
  }, [open]);

  const handleAllChangeTab = (e) => {
    //handle all change click
    let newSelectedArr = [];
    let newDeSelectedArr = [];
    if (e?.target?.checked) {
      //Then merging both the arrays and passing in callback for getting the selected Array to be updated.
      let tempDeSelectedArr = JSON.parse(JSON.stringify(deSelectedArr));
      let newAddedTempSelectedArr = tempDeSelectedArr.map((item) => {
        item.show = true;
        return item;
      });
      newSelectedArr = [...selectedArr, ...newAddedTempSelectedArr];
      onAllPress([...newSelectedArr], e?.target?.checked);
    } else {
      let tempSelectedArr = JSON.parse(JSON.stringify(selectedArr));
      let newAddedTempDeSelectedArr = tempSelectedArr.map((item) => {
        item.show = false;
        return item;
      });
      newDeSelectedArr = [...newAddedTempDeSelectedArr, ...deSelectedArr];
      onAllPress(newDeSelectedArr, e?.target?.checked);
    }
  };

  const handleSingleSlideClick = (e, currentItem) => {
    if (currentItem.show) {
      const filteredArray = selectedArr.filter(
        (item) => item.graph_id !== currentItem.graph_id
      );
      updateSelectedArr(filteredArray);
      let newItem = { ...currentItem };
      newItem.show = false;
      let newTempDeselectedArr = [...deSelectedArr];
      newTempDeselectedArr.push(newItem);
      updateDeSelectedArr([...newTempDeselectedArr]);
    } else {
      const filteredArray = deSelectedArr.filter(
        (item) => item.graph_id !== currentItem.graph_id
      );
      updateDeSelectedArr(filteredArray);
      let newItem = { ...currentItem };
      newItem.show = true;
      let newTempSelectedArr = [...selectedArr];
      newTempSelectedArr.push(newItem);

      newTempSelectedArr.sort((a, b) => {

        let result = 0;
        if (a.elePosition > b.elePosition) {
          result = 1;
        } else {
          if (b.elePosition > a.elePosition) {
            result = -1;
          }
        }
        return result;
      });

      updateSelectedArr([...newTempSelectedArr]);
    }
  };
  return (
    <>
      <div ref={inputRef} style={styles.metricContainer} onClick={handleClick}>
        <span style={styles.customizeText}>Show/Hide</span>
        <img
          width={13}
          height={13}
          src={getImageFromURL(`${IMAGES.NAV4}`)}
          alt={IMAGES.NAV4}
        />
      </div>

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

            width: "500px",
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
        }}
      >
        <Typography
          component={"div"}
          sx={{
            padding: "10px 20px 10px 10px",
            background: "#384144",
            border: "1px solid #384144",
            borderRadius: "11px 11px 0px 0px",
          }}
          disableRipple
        >
          <Checkbox
            disableRipple
            color="default"
            icon={
              <img
                width={23}
                height={23}
                src={getImageFromURL(`${IMAGES.EYENEW}`)}
                alt={IMAGES.EYENEW}
              />
            }
            checkedIcon={
              <img
                width={23}
                height={23}
                src={getImageFromURL(`${IMAGES.UnHide}`)}
                alt={IMAGES.UnHide}
              />
            }
            onChange={handleAllChangeTab}
            checked={!selectedArr.length ? false : true}
          />
          <Typography
            sx={{
              ...constStyles,
              fontWeight: "600",
              marginLeft: "10px",
            }}
            className="infoData-font"
            component={"span"}
          >
            {!selectedArr.length ? t("unhideAll") : t("hideAll")}
          </Typography>
          <Typography
            sx={{
              float: "right",
              margin: "10px",
              ...fontStyle,
              fontWeight: "600",
              color: "#fff",
            }}
            component={"span"}
            className="infoData-font"
          >
            {t("hidden")} ({deSelectedArr.length})
          </Typography>
        </Typography>
        <MenuList
          sx={{
            height: "350px",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "0px",
          }}
          className="scrollbar"
        >
          {
            console.log("selearr",selectedArr)
          }
          {selectedArr.length > 0 &&
            selectedArr.map((infoData) => {

              return (
                <> 
                { infoData.name !=undefined &&
                  <MenuItem
                  key={utils.commonFunctions.keyFinder()}
                  sx={{
                    padding: "4px 10px",
                  }}
                  disableRipple
                >
                  <Checkbox
                    disableRipple
                    color="default"
                    icon={
                      <img
                        width={17}
                        height={18}
                        src={getImageFromURL(`${IMAGES.EYESLASHFILL}`)}
                        alt={IMAGES.EYESLASHFILL}
                      />
                    }
                    checkedIcon={
                      <img
                        width={23}
                        height={23}
                        src={getImageFromURL(`${IMAGES.EYEFILL}`)}
                        alt={IMAGES.EYEFILL}
                      />
                    }
                    checked={infoData.show}
                    onChange={(e) => handleSingleSlideClick(e, infoData)}
                  />
                  <Typography
                    className="infoData-font"
                    sx={{ marginLeft: "10px", ...fontStyle }}
                    component={"span"}
                  >
                    {infoData.name ===graphNames.EMISSION_BY_COUNTRY_DETAILED
                      ? "Country Vs Emission"
                      : infoData.name === graphNames.EMISSION_BY_REGION_DETAILED
                        ? "Emission By Region"
                        : infoData.name}
                  </Typography>
                </MenuItem>
                }
                
                </>
              );
            })}
          {deSelectedArr.length > 0 && (
            <Divider
              variant="middle"
              sx={{ borderStyle: "dashed", borderWidth: "1px" }}
            />
          )}
          {deSelectedArr.length > 0 &&
            deSelectedArr.map((infoData) => {
              return (
                <>
                {

                  infoData.name !=undefined &&
                <MenuItem
                  key={utils.commonFunctions.keyFinder()}
                  sx={{
                    padding: "6px 10px",
                  }}
                  disableRipple
                >
                  <Checkbox
                    disableRipple
                    color="default"
                    icon={
                      <img
                        width={23}
                        height={23}
                        src={getImageFromURL(`${IMAGES.EYESLASHFILL}`)}
                        alt={IMAGES.EYESLASHFILL}
                      />
                    }
                    checkedIcon={
                      <img
                        width={17}
                        height={18}
                        src={getImageFromURL(`${IMAGES.EYEFILL}`)}
                        alt={IMAGES.EYEFILL}
                      />
                    }
                    checked={infoData.show}
                    onChange={(e) => handleSingleSlideClick(e, infoData)}
                  />
                  <Typography
                    className="infoData-font"
                    sx={{ marginLeft: "10px", ...fontStyle }}
                    component={"span"}
                  >
                    {infoData.name ===graphNames.EMISSION_BY_COUNTRY_DETAILED
                      ? "Country Vs Emission"
                      : infoData.name === graphNames.EMISSION_BY_REGION_DETAILED
                        ? "Emission By Region"
                        : infoData.name}
                  </Typography>
                </MenuItem>
                  }
                  </>
              );
            })}
        </MenuList>
        <Typography
          display="flex"
          justifyContent={"space-between"}
          component={"div"}
          style={{
            borderTop: "1px solid #DCDCDC",
            padding: "20px 25px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <CustomButton
            onClick={handleReset}
            override={true}
            buttonWidth={{
              width: "100px",
              height: "28px !important",
            }}
            buttonTextStyle={{
              color: "#1D1E1F",
              fontSize: "16px",
              fontWeight: "500",
            }}
            buttonText={"reset"}
            bgColor={"#D9D9D9"}
          />
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
            bgColor={"#C12C37"}
          />
        </Typography>
      </StyledMenu>
    </>
  );
}
