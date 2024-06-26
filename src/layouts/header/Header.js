import React, { useState } from "react";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { headerStyles } from "./headerStyles";
import CarbonXLogo from "src/assets/images/company-logo-Ai.png"
import routeNames from "src/constants/routeNames";
import { styled } from "@mui/material/styles";
import { styles } from "src/layouts/styles";
import { getImageFromURL, IMAGES } from "src/constants/images";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import { actions } from "@redux/actions";
import { filterActions } from "src/modules/filters/filter-actions";
import { equivalenceFilterActions } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SideNav from "src/layouts/sideNav";
import { useTranslation } from "react-i18next";

const {
  authActions: { removeAuthenticatedUser },
} = actions;

const drawerWidth = window.screen.width >= 1100 ? 245 : 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "&.MuiDrawer-docked": {
    zIndex: "9",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, addGraph, editGraph }) => ({
  zIndex: addGraph || editGraph ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#00BE1E",
    color: "#00BE1E",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "& .MuiBadge-dot": {
    height: 6,
    minWidth: 6,
    borderRadius: 10,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const menuId = "primary-search-account-menu";

const Header = ({ listItems, open, setOpen }) => {
  const {
    setCalendarFilters,
    setBuFilterWithIds,
    setTeamFiltersWithIds,
    setRemoveFilters,
  } = filterActions;
  const {
    setEqBuFilters,
    setEqRegionFilters,
    setEqCalendarFilters,
    setEqScopeFilters,
    setEqTeamFilters,
    setEqTeamFiltersWithIds,
    setEqBuFilterWithIds,
    setEqRemoveFilters,
  } = equivalenceFilterActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { addGraph, editGraph } = useSelector((state) => state.globalRed);
  const { t } = useTranslation();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let userName = "";
  if (localStorage.getItem("user")) {

    const { first_name, last_name
    } = JSON.parse(localStorage.getItem("user"));

    userName = first_name + " " + last_name;
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("totalEmissionCostFuel")
    localStorage.removeItem("totalModesVsEmission")
    navigate(routeNames.homePage)

    const onLogoutActions = [
      setCalendarFilters,
      setEqCalendarFilters,
      setBuFilterWithIds,
      setTeamFiltersWithIds,
      setRemoveFilters,
      setEqBuFilters,
      setEqRegionFilters,
      setEqScopeFilters,
      setEqTeamFilters,
      setEqTeamFiltersWithIds,
      setEqBuFilterWithIds,
      setEqRemoveFilters,
    ];
    dispatch(removeAuthenticatedUser());
    for (let i = 0; i < onLogoutActions.length; i++) {
      dispatch(onLogoutActions[i](i < 2 ? {} : []));
    }
  };

  const permissions = localStorage.getItem("user");
  const filteredRoutes = listItems.map(route => {
    if (permissions?.includes(route.permission_key) || route.permission_key === "CARBON_ANALYTICS_VIEW") {
      if (route.item) {
        const filteredItems = route.item.filter(item => {
          if (Array.isArray(item.item)) {
            if (item?.item) {
              for (let x of item.item) {
                return permissions?.includes(x.permission_key);
              }
            }
          }
          return permissions?.includes(item.permission_key);
        });
        return {
          ...route,
          item: filteredItems
        };
      }
      return route;
    }
   // return route; // remove this line during deployment/checking
  }).filter(route => route);

  console.log(filteredRoutes, 'filteredRoutes');

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      sx={{ top: "4%" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{t("logout")}</ListItemText>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "none"
        }}
        open={open}
        addGraph={addGraph}
        editGraph={editGraph}
      >
        <Toolbar className="root-toolbar">
          <Box
            sx={{
              ...headerStyles.headerToolbar,
              flexDirection: open ? "row" : "row-reverse",
            }}
          >
            {open && (
              <Typography
                noWrap
                component="div"
                sx={{
                  ...styles.logoDiv,
                  ...(open ? { display: "none" } : { display: "flex" }),
                }}
              >
                <img
                  width={30}
                  height={30}
                  src={CarbonXLogo}
                  alt="carbonX logo"
                />
              </Typography>
            )}
            <Typography
              className="logo-text-close"
              variant="h6"
              noWrap
              component="div"
              sx={{
                ...styles.logoText,
                paddingLeft: "20px",
                ...(open ? { display: "none" } : headerStyles.justifyCenter),
                height: "100%",
                borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <img
                width={30}
                height={30}
                src={CarbonXLogo}
                alt={t("carbonXLogo")}
              />
              {t("carbonX")}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={styles.m14}
              style={!open ? { marginLeft: "17px" } : { marginLeft: "4px" }}
            >
              <img
                width={17}
                height={13.7}
                src={getImageFromURL(`${IMAGES.HAMBURGERICON}`)}
                alt={t("menuIcon")}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              ...styles.flexBox,
              marginLeft: "auto",
            }}
            className="header-right"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ margin: "0px 8px" }}
            >
              <Avatar
                sx={styles.avatarDim}
                alt="user avatar"
                src={getImageFromURL(`${IMAGES.DUMMYUSER}`)}
              />
            </StyledBadge>
            <span className="userName">{userName ? userName : "UserName"}</span>

            <IconButton onClick={handleProfileMenuOpen}>
              <img
                src={getImageFromURL(`${IMAGES.DROPDOWNICON}`)}
                alt="down icon"
              />
            </IconButton>
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer-open">
        <DrawerHeader sx={{ padding: "0px" }}>
          <Box sx={styles.flexContainer}>
            <Typography
              noWrap
              component="div"
              sx={{
                ...styles.logoDiv,
                ...(!open ? { display: "none" } : { display: "flex" }),
              }}
            >
              <img
                className="logoImage"
                src={CarbonXLogo}
                alt={t("carbonXLogo")}
              />
            </Typography>
            <Typography
              className="logo-text-open"
              variant="h6"
              noWrap
              component="div"
              sx={{
                ...styles.logoText,
                ...(!open && { display: "none" }),
              }}
            >
              {t("carbonX")}
            </Typography>
          </Box>
        </DrawerHeader>
        <Divider />
        <List sx={headerStyles.listTypoRoot}>
          {open && <div className="headerMainmenuClass" style={headerStyles.mainMenu}>{t("mainMenu")}</div>}
          <SideNav opened={open} listItems={filteredRoutes} />
        </List>
      </Drawer>
    </>
  );
};

export default Header;
