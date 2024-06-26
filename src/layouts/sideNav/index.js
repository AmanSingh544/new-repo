import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useLocation, NavLink } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useDispatch } from "react-redux";
import { globalActions } from "src/modules/global-states/global-states-actions";
import { hasChildren } from "./hasChildren";
import { getImageFromURL, IMAGES } from "src/constants/images";
import "./sideNav.scss";
import constants from "src/constants";
import { Tooltip, Typography } from "@mui/material";
import utils from "src/utils";

export default function SideNav({ listItems, opened }) {
  return listItems?.map((item, key) => (
    <MenuItem opened={opened} item={item} key={key} />
  ));
}

const MenuItem = ({ item, opened }) => {
  const Data = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Data item={item} opened={opened} />;
};

const styles = {
  listItems: {
    "& .MuiTypography-root": {
      fontWeight: "400",
    },
  },
};

const SingleLevel = ({ item, opened }) => {
  const dispatch = useDispatch();
  const { setSingleDetailed, setSingleExecutive } = globalActions;
  const [activeNavValue, setActiveValue] = React.useState("Executive Summary");

  const handleReduxState = (e) => {
    dispatch(setSingleExecutive(false));
    dispatch(setSingleDetailed(false));
  };
  const handleNavClick = (e) => {
    setActiveValue(e.target.innerHTML);
  };
  React.useEffect(() => { }, [activeNavValue]);

  let route = "";
  switch (item.label) {
    case "Executive Summary":
      route = constants.routeNames.executive;
      break;
    case "Detailed Summary":
      route = constants.routeNames.detailed;
      break;
    case "Equivalence":
      route = constants.routeNames.equivalence;
      break;
    case "Computations":
      route = constants.routeNames.computation;
      break;
    case "scope":
      route = constants.routeNames.scope;
      break;
    case "Vehicle Master":
      route = constants.routeNames.vehicleMaster;
      break;
    case "Location Master":
      route = constants.routeNames.locationMaster;
      break;
    case "Scope 1.1":
      route = constants.routeNames.scope11;
      break;
    case "Scope 1.2":
      route = constants.routeNames.scope12;
      break;
    case "Scope 1.3":
      route = constants.routeNames.scope13;
      break;
    case "Scope 2":
      route = constants.routeNames.scope2;
      break;
    case "Scope 3.1":
      route = constants.routeNames.scope31;
      break;
    case "Scope 3.2":
      route = constants.routeNames.scope32;
      break;
    case "Scope 3.3":
      route = constants.routeNames.scope33;
      break;
    case "Scope 3.4":
      route = constants.routeNames.scope34;
      break;
    case "Scope 3.5":
      route = constants.routeNames.scope35;
      break;
    case "Scope 3.6":
      route = constants.routeNames.scope36;
      break;
    case "Scope 3.7":
      route = constants.routeNames.scope37;
      break;
    case "Scope 3.8":
      route = constants.routeNames.scope38;
      break;
    case "Downstream Transportation":
      route = constants.routeNames.scope39;
      break;
    case "Scope 3.10":
      route = constants.routeNames.scope310;
      break;
    case "Scope 3.11":
      route = constants.routeNames.scope311;
      break;
    case "Scope 3.12":
      route = constants.routeNames.scope312;
      break;
    case "Scope 3.13":
      route = constants.routeNames.scope313;
      break;
    case "Scope 3.14":
      route = constants.routeNames.scope314;
      break;
    case "Scope 3.15":
      route = constants.routeNames.scope315;
      break;
    case "Data Mapping Layer":
      route = constants.routeNames.dataMappingLayer;
      break;
    case "Simulator":
      route = constants.routeNames.simulator;
      break;
    default:
      break;
  }

  if (route) {
    return (
      <NavLink
        to={route}
        onClick={(e) => {
          handleReduxState();
          handleNavClick(e);
        }}
        className="links"
      >
        {({ isActive }) => {
          return (
            <ListItem
              disableRipple
              disableTouchRipple
              button
              style={{
                width: "100%",
              }}
              sx={
                opened && {
                  "& .MuiListItemText-root": {
                    padding: "0px 0px",
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: "30px",
                  },
                }
              }
              className={`list-item-container ${item?.label?.includes("Scope") || item?.label?.includes("Downstream Transportation") ? "scope-transactional" : item.label.replace(" ", "").toLowerCase()} ${!opened ? "closed" : "opened"} ${isActive ? " active" : ""}`}
            >
              <div
                className={`subIcon ${item?.label?.includes("Scope") ||
                  item?.label?.includes("Downstream Transportation")
                  ?
                  "scope-transactional"
                  : item.label.replace(" ", "").toLowerCase()
                  }${isActive ? " activesub" : ""}`}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "2px",
                  padding: "8px 0px 8px 22px ",
                }}
              >
                {!opened ? (
                  <Tooltip title={item.label} placement="right-start" arrow>
                    <span>{isActive ? item?.activeIcon : item?.icon}</span>
                  </Tooltip>
                ) : (
                  <span>{isActive ? item?.activeIcon : item?.icon}</span>
                )}
                <Typography>{item?.label}</Typography>
              </div>
            </ListItem>
          );
        }}
      </NavLink>
    );
  } else {
    return (
      <ListItem
        disableRipple
        disableTouchRipple
        button
        sx={
          opened && {
            "& .MuiListItemText-root": {
              padding: "0px 0px",
            },
            "& .MuiListItemIcon-root": {
              minWidth: "30px",
            },
          }
        }
        className={`list-item-container ${item.label
          .replace(" ", "")
          .toLowerCase()}`}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          className="list-items"
          primary={item.label}
          sx={styles.listItems}
        />
      </ListItem>
    );
  }
};

const MultiLevel = ({ item, opened }) => {
  const { item: children } = item;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {

    const isCarbonAnalytics = pathname.includes("carbon-analytics");
    const isEntityManagement = pathname.includes("entity-management");

    switch (true) {
      case isCarbonAnalytics && item.label === "Carbon Analytics":
      case isEntityManagement && item.label === "Entity Management":
        setOpen(true);
        break;
      case isEntityManagement &&
        (pathname === "/entity-management/master/vehicle-entity" ||
          pathname === "/entity-management/master/location-entity") &&
        item.label === "Master Data":
      case isEntityManagement &&
        pathname === "/entity-management/transactional/scope-3-9" &&
        item.label === "Transformed Data":
      case pathname === "/risk-recommendation/simulator" &&
        item.label === "Risk Recommendation":
        setOpen(true);
        break;
      case pathname === "/data-mapping-layer/upload":
      default:
        setOpen(false);
    }

  }, [opened, pathname]);

  const checkPathName = (pathname) => {

    if (pathname.includes("carbon-analytics")) {
      return "ca_active"
    }
    else if (pathname.includes("/master")) {
      return "master_active"
    }
    else if (pathname.includes("/transactional")) {
      return "transactional_active"
    }
    else if (pathname.includes("/risk-recommendation")) {
      return "rr_active"
    }

    return ""

  }
  return (
    <React.Fragment>
      <ListItem
        className={`list-item-container ${checkPathName(pathname)

          } ${!opened ? "closed" : ""} ${item.label
            .replace(" ", "")
            .toLowerCase()}`}
        button
        sx={
          opened && {
            "& .MuiListItemText-root": {
              padding: "0px 0px",
            },
            "& .MuiListItemIcon-root": {
              minWidth: "20px",
            },
            "& .MuiSvgIcon-root": {
              color: "#868686",
              width: "20px",
              height: "20px",
            },
          }
        }
        onClick={handleClick}
      >
        {!opened ? (
          <Tooltip title={item.label} placement="right-start" arrow>
            <ListItemIcon>{item.icon}</ListItemIcon>
          </Tooltip>
        ) : (
          <ListItemIcon>{item.icon}</ListItemIcon>
        )}
        <ListItemText
          className="list-items"
          primary={item.label}
          sx={styles.listItems}
        />
        <div className="dd-icon-image" style={{ paddingRight: "14px" }}>
          <img
            style={{
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform 300ms",
            }}
            width={12}
            height={12}
            src={getImageFromURL(`${IMAGES.SELECTICON}`)}
            alt={IMAGES.SELECTICON}
          />
        </div>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          "& .MuiListItem-root": {
            padding: "0px 0px",
          },
          "& .executivesummary.MuiListItem-root": {
            width: "fit-content",
          },
          "& .equivalence.MuiListItem-root": {
            width: "fit-content",
          },
          "& .MuiListItemIcon-root": {
            minWidth: "45px",
          },
          "& .MuiListItemText-root": {
            padding: "8px 10px",
            margin: "0px",
          },
        }}
      >
        <List component="div" disablePadding>
          {children?.map((child, key) => (
            <MenuItem key={utils.commonFunctions.keyFinder()} opened={opened} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment >
  );
};

