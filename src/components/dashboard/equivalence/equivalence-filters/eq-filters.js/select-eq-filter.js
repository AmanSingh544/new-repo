import React, { useState, useRef, useEffect } from "react";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { equivalenceFilterActions } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions/index";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemText from "@mui/material/ListItemText";
import { styles } from "src/components/filters/filterStyles";
import { getImageFromURL, IMAGES } from "src/constants/images";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

const { setEqScopeFilters, setEqBuFilters, setEqRegionFilters, setEqTeamFilters, setEqRemoveFilters } =
  equivalenceFilterActions;

export default function SelectEqFilter({ data }) {
  const dispatch = useDispatch();
  const { bu, team, scope, region, removedFilters } = useSelector((state) => state.eqFilters);
  const [filterValue, setFilterValue] = useState(data);
  const labelArr = filterValue.map((x) => x.name);
  const label = labelArr.filter((y) => !y.includes("All"))[0];
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const handleToggle = (e) => {
    if (Array.from(e.target.classList).includes("MuiSelect-select")) {
      setOpen(!open);
    }
  };

  const filterValues = (label, selected) => {
    switch (true) {
      case label.includes("Scope"):
        return selected.length === 4 ? "All Scopes" : "Select Scope";
      case label.includes("Country"):
        return selected.length === 4 ? "All Country" : "Select Country";
      case label.includes("BU"):
        return selected.length === 4 ? "All BU" : "Select BU";
      case label.includes("Team"):
        return selected.length === 4 ? "All Team" : "Select Team";
      default:
        return "";
    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    let duplicateRemoved = [];
    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setFilterValue(duplicateRemoved);
  };

  useEffect(() => {
    const allFilters = [...bu, ...team, ...scope, ...region]
    dispatch(setEqRemoveFilters(removedFilters.filter(data => !allFilters.includes(data))))
  }, [scope.length, team.length, bu.length, region.length])

  useEffect(() => {
    if (label) {
      if (label.includes("Scope") || label.includes("Country") || label.includes("BU") || label.includes("Team")) {
        setFilterValue((prevState) => {
          return prevState.filter((y) => !removedFilters.includes(y.name))
        })
      }
    }
  }, [removedFilters.length])

  useEffect(() => {
    if (labelArr.length === 1 && labelArr[0] === "All Scopes") {
      dispatch(setEqScopeFilters([]));
    }
    if (labelArr.length === 1 && labelArr[0] === "All Country") {
      dispatch(setEqRegionFilters([]));
    }
    if (labelArr.length === 1 && labelArr[0] === "All BU") {
      dispatch(setEqBuFilters([]));
    }
    if (labelArr.length === 1 && labelArr[0] === "All Team") {
      dispatch(setEqTeamFilters([]));
    }

    if (label) {
      if (label.includes("Scope")) {
        dispatch(
          setEqScopeFilters(
            filterValue.map((x) => x.name).filter((y) => !y.includes("All"))
          )
        );
      } else if (label.includes("Country")) {
        dispatch(
          setEqRegionFilters(
            filterValue.map((x) => x.name).filter((y) => !y.includes("All"))
          )
        );
      } else if (label.includes("BU")) {
        dispatch(
          setEqBuFilters(
            filterValue.map((x) => x.name).filter((y) => !y.includes("All"))
          )
        );
      } else if (label.includes("Team")) {
        dispatch(
          setEqTeamFilters(
            filterValue.map((x) => x.name).filter((y) => !y.includes("All"))
          )
        );
      }
    }
  }, [filterValue]);

  useEffect(() => {
    setPosition(
      inputRef.current
        ? inputRef.current.getBoundingClientRect().top +
        inputRef.current.getBoundingClientRect().height +
        22
        : 0
    );
  }, [inputRef]);

  const selectionIcon = (props) => {
    return (
      <img
        {...props}
        className={`select-arrow material-icons ${props.className} ${open ? "select-dropdown-icon-up" : "select-dropdown-icon-down"
          }`}
        src={getImageFromURL(`${IMAGES.SELECTICON}`)}
        alt={IMAGES.SELECTICON}
      />
    )
  }

  return (
    <FormControl
      sx={{
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #C1C1C1 !important",
            borderRadius: "5px",
          },
        },

        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C1C1C1 !important",
          },
        },
        "& .Mui-disabled": {
          cursor: "pointer !important",
        },
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Select
          ref={inputRef}
          MenuProps={{
            open: open,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            // getContentAnchorEl: null,
            sx: {
              "&.MuiPopover-root": {
                position: "unset",
              },
              "& .MuiPaper-root": {
                marginLeft: "-4px !important",
                top: `215px !important`,
                "& .MuiList-root": {
                  "& .filter-dd-options": {
                    background: "transparent !important",
                    padding:
                      window.screen.width > 1280
                        ? "0px 50px 5px 10px"
                        : "0px 30px 5px 10px",
                  },
                },
              },
            },
          }}
          sx={styles.selectDropdown}
          data={data}
          className={`filter-dd ${filterValue.length > 1 ? " selected" : ""}`}
          value={filterValue}
          onClick={handleToggle}
          multiple
          renderValue={(selected) => {
            if (filterValue.length > 1) {
              const label = selected
                .map((x) => x.name)
                .filter((y) => !y.includes("All"))[0];

              filterValues(label, selected);

            } else {
              return selected.map((x) => x.name);
            }
          }}
          IconComponent={(props) => selectionIcon(props)}
          onChange={handleSelectChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {data[0]["options"].map((variant) => (
            <MenuItem
              sx={{ padding: "0px" }}
              className="filter-dd-options"
              disableRipple
              key={variant.id}
              value={variant}
            >
              <Checkbox
                disableRipple
                icon={
                  <img
                    className="checkbox-img"
                    src={getImageFromURL(`${IMAGES.UNCHECKEDBOX}`)}
                    alt={IMAGES.UNCHECKEDBOX}
                  />
                }
                checkedIcon={
                  <img
                    className="checkbox-img"
                    src={getImageFromURL(`${IMAGES.CHECKEDBOX}`)}
                    alt={IMAGES.UNCHECKEDBOX}
                  />
                }
                checked={(() => {
                  if (label) {
                    if (label.includes("Scope")) {
                      return scope.findIndex((item) => item === variant.name) >= 0;
                    } else if (label.includes("Country")) {
                      return region.findIndex((item) => item === variant.name) >= 0;
                    } else if (label.includes("BU")) {
                      return bu.findIndex((item) => item === variant.name) >= 0;
                    } else if (label.includes("Team")) {
                      return team.findIndex((item) => item === variant.name) >= 0;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                })()}
              />
              <ListItemText sx={styles.listItems} primary={variant.name} />
            </MenuItem>
          ))}
        </Select>
      </ClickAwayListener>
    </FormControl >
  );
}

