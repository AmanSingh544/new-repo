import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import "./index.scss";
import { globalActions } from "src/modules/global-states/global-states-actions";
import { useDispatch } from "react-redux";
import Metrics from "@components/metric-cards";
import InfoGraphics from "@components/infographics";
import Typography from "@mui/material/Typography";
import { useRequestApi } from "src/customHooks/useRequestApi";
import constants from "src/constants";
import { graphNames_new as graphNames } from "../../../constants/appConstants";

export default function Executive() {
  const { request } = useRequestApi();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { setMasterEntities, setEnableSignleView, setSingleViewInfographic } =
    globalActions;
  const { open } = useOutletContext();
  const masterEntity = async () => {
    const response = await request(constants.apiConstants.METHOD_GET, constants.endPoints.masterEntities, null);
    if (response) {
      if (response.data) {
        if (response.data.message === "Data fetched successfully!") {
          const {
            data: { result: data },
          } = response;
          dispatch(setMasterEntities(data.data));
        }
      }
    }
  };
  useEffect(() => {
    masterEntity();
  }, []);

  useEffect(() => {
    if (!pathname.includes("singleview")) {
      dispatch(setEnableSignleView(false));
    } else {
      dispatch(setEnableSignleView(true));
    }
    // const info = [
    //   "Emission Timeline",
    //   "Emission Scopes",
    //   "Emission By Region",
    //   "Emission By Country",
    //   "Emission Across Activity",
    //   "Emission Across Transportation",
    //   "Sales Vs Emission",
    //   "GHG Wise Emission",
    //   "Emission By Supplier",
    //   "COST_FUEL_ITEM_SHIPPED_EMISSION",
    //   "Emission By Region Detailed",
    //   "Emission By Country Detailed",
    //   "Lanes Vs Emission",
    //   "Process Vs Emissions",
    //   "Supplier Vs Emissions",
    //   "Emission Performance",
    //   "Modes Vs Emission",
    //   "Total Scope-1 Emission vs Categories",
    //   "Total Scope-2 Emission vs Categories",
    //   "Total Scope-3 Emission vs Categories",
    //   "Upstream Networks Vs Emission",
    //   "Downstream Asset Type Vs Emission",
    //   "Continent Vs Emission"
    // ];

    const info = [
      graphNames.EMISSION_TIMELINE,
      graphNames.EMISSION_SCOPES,
      graphNames.EMISSION_BY_REGION,
      graphNames.EMISSION_BY_COUNTRY,
      graphNames.EMISSION_ACROSS_ACTIVITY,
      graphNames.EMISSION_ACROSS_TRANSPORTATION,
      graphNames.SALES_BY_EMISSION,
      graphNames.GHG_WISE_EMISSION,
      graphNames.SUPPLIER_VS_EMISSIONS,
      graphNames.COST_FUEL_ITEM_SHIPPED_EMISSION,
      // "Emission By Region Detailed",
      // "Emission By Country Detailed",
      graphNames.LANES_VS_EMISSION,
      graphNames.PROCESS_VS_EMISSIONS,
      graphNames.EMISSION_PERFORMANCE,
      graphNames.MODES_VS_EMISSION,
      graphNames.TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES,
      graphNames.TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES,
      graphNames.TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES,
      graphNames.UPSTREAM_NETWORKS_VS_EMISSION,
      graphNames.DOWNSTREAM_ASSET_TYPE_VS_EMISSION,
      graphNames.CONTINENT_VS_EMISSION,
    ];

    for (const value of info) {
      dispatch(setSingleViewInfographic(value, false));
    }
  }, [pathname]);

  return (
    <>
      {
        <>
          <Typography
            className="scrollable-container"
            noWrap
            component="div"
            sx={{
              background: "#F5F5F5",
              padding: "0px 24px",
              "&.MuiTypography-root": {
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: `calc(100vh - ${document.querySelector(".grid-fill")?.clientHeight +
                  document.querySelector(".mui-fixed")?.clientHeight
                  }px)`,
              },
            }}
          >
            <Metrics open={open} />
            <InfoGraphics />
          </Typography>
        </>
      }
    </>
  );
}

