import "@assets/css/header.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "@utils/DummyData";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@mui/material/Collapse";
import utils from "src/utils";

export default function Navbar({ isDrawerOpen, handleDrawerOpen }) {

  return (
    <React.Fragment>
      <div className="sideBaarNavigation">
        
        {navItems.map((item, key) => (
          <MenuItem
            key={utils.commonFunctions.keyFinder()}
            item={item}
            isDrawerOpen={isDrawerOpen}
            handleDrawerOpen={handleDrawerOpen}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

const MenuItem = ({ item, isDrawerOpen, handleDrawerOpen }) => {
  const { subMenu } = item
  return (subMenu !== undefined && subMenu.length > 0) ? (
    <MultiLevel
      item={item}
      isDrawerOpen={isDrawerOpen}
      handleDrawerOpen={handleDrawerOpen}
    />
  ) : (
    <SingleLevel
      item={item}
      isDrawerOpen={isDrawerOpen}
      handleDrawerOpen={handleDrawerOpen}
    />
  );
};

const SingleLevel = ({ item }) => {

  return (
    <>
      <ListItem button>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    </>
  );
};

const MultiLevel = ({ item, isDrawerOpen, handleDrawerOpen }) => {
  const { subMenu: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isDrawerOpen) {
      setOpen((prev) => !prev);
    } else {
      handleDrawerOpen();
    }
  };

  return (
    <>
      <ListItem
        component={Link}
        to={item.to}
        value={item.name}
        button onClick={handleClick}
        key={item.id}
        secondaryAction={(m) => { }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>

      <Collapse
        in={isDrawerOpen && open}
        className={"subDropDownMenu"}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <Link
              to={isDrawerOpen ? child.to : ""}
              style={{ textDecoration: "none", color: "black" }}
              key={utils.commonFunctions.keyFinder()}
            >
              <MenuItem component={Link} to={child.to} item={child} />
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};
