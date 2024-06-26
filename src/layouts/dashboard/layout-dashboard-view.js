import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Filters from "src/components/filters";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "src/layouts/header/Header";
import CustomizeGraphs from "src/components/addgraph";
import AuthContext from "src/components/dashboard/entityManagement/entity-management-common/table/defaultContext";

export default function DashboardComponent({ listItems }) {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const [headerHeight, setHeaderHeight] = useState("60px");
  const { bu, team, scope, region } = useSelector((state) => state.filters);
  const filtersApplied =
    bu?.length || team?.length || scope?.length || region?.length;

  useState(() => {
    if (document.querySelector(".root-toolbar") && !filtersApplied) {
      setHeaderHeight(
        `${document.querySelector(".root-toolbar").clientHeight}px`
      );
    } else if (document.querySelector(".root-toolbar") && filtersApplied) {
      setHeaderHeight(
        `${document.querySelector(".root-toolbar").clientHeight +
        document.querySelector(".filters-container").clientHeight
        }px`
      );
    }
  }, [document.querySelector(".root-toolbar")]);
  return (
    <>
      <CustomizeGraphs type="addGraph" />
      <CustomizeGraphs type="editGraph" />
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          "& .MuiAppBar-root": {
            height: "60px",
          },
        }}
        
      >
        <CssBaseline />
        <AuthContext.Provider value = {{open}}>
        <Header listItems={listItems} open={open} setOpen={setOpen} />
        
        <Box
          component="main"
          sx={{
            background:
              "#F5F5F5",
            height: `calc(100vh - ${headerHeight})`,
            borderTop: "1px solid #F5F5F5 !important",
            width: "100%",
            display: !pathname.includes("equivalence") && "inline-grid",
            marginTop: headerHeight,
            "& .MuiGrid-spacing-xs-4": {
              "& .MuiGrid-item": {
                padding: "0px",
              },
            },
          }}
        >
          {pathname.includes("detailed-summary") === true && <Filters />}
          {pathname.includes("executive-summary") === true && <Filters />}
          {pathname.includes("equivalence") === true && <Filters />}
          {pathname.includes("singleview") === true && <Filters />}

          <Outlet context={{ open }} />
        </Box>
        </AuthContext.Provider>
      </Box>
    </>
  );
}
