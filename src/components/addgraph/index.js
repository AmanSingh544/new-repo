import React from "react";
import "./addGraph.scss"
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { globalActions } from "src/modules/global-states/global-states-actions";
import { OutlinedInput } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import CustomButton from "src/components/buttons/Buttons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import utils from "src/utils";

export default function CustomizeGraphs({ type }) {
  const [xAxis, setXaxis] = React.useState("Data X axis / Data 1");
  const { t } = useTranslation();
  const { setAddGraph, setEditGraph } = globalActions
  const dispatch = useDispatch()

  const { addGraph, editGraph } = useSelector(state => state.globalRed)

  const handleXChange = (e) => {
    setXaxis(e.target.value);
  };

  const selectionImgIcon = () => {
    return (
      <img
        width={15}
        height={7}
        style={{ marginRight: "10px" }}
        src={getImageFromURL(IMAGES.SELECTICON)}
        alt={IMAGES.SELECTICON}
      />
    )
  }

  return (
    <MuiDrawer
      sx={{
        "&.MuiDrawer-root": {
          "& .MuiDrawer-paper": {
            width: "26vw",
          },
        },
      }}
      anchor={"right"}
      open={type === "addGraph" ? addGraph : editGraph}
    >
      <Box
        sx={{
          display: "flex",
          margin: "20px 20px 30px 25px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: "500", color: "#5C5C5C" }}
          component={"div"}
        >
          {type === "addGraph" ? "Create" : "Edit"} {t("chart")}
        </Typography>
        <img
          onClick={() => {
            if (type === "addGraph") {
              dispatch(setAddGraph(!addGraph))
            } else {
              dispatch(setEditGraph(!editGraph))
            }
          }}
          style={{
            border: "2px solid #5E5E5E",
            cursor: "pointer",
            borderRadius: "3px",
            padding: "4px 5px",
          }}
          width={25}
          height={25}
          src={getImageFromURL(IMAGES.CROSSICON)}
          alt={IMAGES.CROSSICON}
        />
      </Box>
      <Typography
        component="div"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        margin={"0px 25px"}
      >
        <OutlinedInput
          inputProps={{
            maxLength: 50,
            minLength: 1,
          }}
          className="addGraph-input"
          placeholder={"Chart Title"}
          sx={{
            "&.MuiOutlinedInput-root": {
              background: "#FAFAFA",
              borderRadius: "5px",
              marginBottom: "18px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "7px 10px",
              color: "#696969",
              fontWeight: "500",
            },
          }}
        />
        {[1, 2, 3].map((dat) => {
          return (
            <FormControl
              key={utils.commonFunctions.keyFinder()}
              variant="outlined"
              sx={{
                "&.MuiFormControl-root": {
                  marginBottom: "18px",
                },
                "& .MuiOutlinedInput-root": {
                  background: "#FAFAFA",
                  borderRadius: "5px",
                },
              }}
            >
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={xAxis}
                onChange={handleXChange}
                className="addGraph-input"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "7px 10px",
                    color: "#696969",
                  },
                }}
                IconComponent={() => selectionImgIcon()}
              >
                {["Data X axis / Data 1", "X1", "X2", "X3"].map((dat) => {
                  return (
                    <MenuItem
                      sx={{
                        "&.MuiMenuItem-root": {
                          fontSize: "12px",
                        },
                      }}
                      value={dat}
                      key={utils.commonFunctions.keyFinder()}
                    >
                      {dat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        })}
        <Typography
          sx={{
            marginBottom: "18px",
            background: "#FAFAFA",
            border: "1px solid #D1D1D1",
            borderRadius: "5px",
            "& .MuiGrid-item": {
              padding: "15px 5px",
            },
            "& .MuiGrid-container": {
              padding: "15px",
            },
          }}
          component={"div"}
        >
          <p
            style={{
              padding: "7px 10px",
              borderBottom: "1px solid #DFDFDF",
              color: "#696969",
              fontSize: "12px",
            }}
          >
            {t("chartType")}
          </p>
          <Grid container spacing={2}>
            {[
              { type: "Line", icon: IMAGES.LINEGRAPHICON },
              { type: "Area", icon: IMAGES.AREAICON },
              { type: "Column", icon: IMAGES.COLUMNCHARTICON },
              {
                type: "Bar",
                icon: IMAGES.BARICON,
              },
              {
                type: "Pie",
                icon: IMAGES.PIEICON,
              },
              {
                type: "Scatter",
                icon: IMAGES.SCATTERICON,
              },
              {
                type: "Map",
                icon: IMAGES.MAPICON,
              },
              {
                type: "Others",
                icon: IMAGES.CHARTSICON,
              },
            ].map(({ icon, type }) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={utils.commonFunctions.keyFinder()}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      height: "58px",
                      background: "#F5F5F5",
                      border: "1px solid #D0D0D0",
                      borderRadius: "5px",
                    }}
                  >
                    <img className="addGraph-images" src={getImageFromURL(`${icon}`)} alt={icon} />
                  </Box>
                  <p
                    className="addGraph-labels"
                    style={{
                      color: "#696969",
                      textAlign: "center",
                    }}
                  >
                    {type.toUpperCase()}
                  </p>
                </Grid>
              );
            })}
          </Grid>
          {/* </div> */}
        </Typography>
        <Typography
          display="flex"
          justifyContent={"space-between"}
          component={"div"}
        >
          <CustomButton
            buttonWidth={{ width: "50%" }}
            buttonTextStyle={{
              color: "#373737",
              fontSize: "15px",
              margin: "20px 5px",
              fontWeight: "500",
            }}
            buttonText={t("reset")}
            bgColor={"#C9C9C9"}
          />
          <CustomButton
            buttonWidth={{ width: "50%" }}
            buttonTextStyle={{
              color: "#FFFFFF",
              fontSize: "15px",
              margin: "20px 5px",
              fontWeight: "500",
            }}
            buttonText={t("save")}
            bgColor={"#084A82"}
          />
        </Typography>
      </Typography>
    </MuiDrawer >
  );
}

