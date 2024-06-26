import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getImageFromURL, IMAGES } from "src/constants/images";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { monthOptions, yearOptions, quarterOptions } from "./options";
import { useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import utils from "src/utils";

export const YearAndMonthFilter = ({
  isMenuOpen,
  type,
  defaultFilter,
  start,
  end,
  setEnd,
  setTag,
  setStart,
  setStartYear,
  setEndYear,
  startYear,
  endYear,
}) => {
  const { pathname } = useLocation();
  const { singleDetailed } = useSelector(
    (state) => state.globalRed
  );

  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed") || singleDetailed;
  const [year, setyear] = useState(new Date().getFullYear());
  const [options, setOptions] = useState([]);
  const [yearFilters, setYearFilters] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const findSelectedFilter = (state) => {
    if (isEquivalence) {
      return state.eqFilters;
    }
    else if (isDetailed) {
      return state.detailedFilters;
    }
    else {
      return state.filters;
    }

  }
  const { calendar_filters } = useSelector((state) => findSelectedFilter(state));
  const handleChange = (e) => {
    setyear(e.target.value);
    if (type === "Start") {
      setStartYear(e.target.value);
    } else if (type === "End") {
      setEndYear(e.target.value);
    }
  };
  const handleChangeMonth = (value) => {
    if (type === "Start") {
      setStart(value);
    } else if (type === "End") {
      setEnd(value);
    }
    setIsActive(value);
  };

  useEffect(() => {
    if (calendar_filters) {
      const { tag, start, end, start_year, end_year } = calendar_filters;
      if (tag === defaultFilter.split(" ")[1].toLowerCase()) {
        setStart(start);
        setEnd(end);
        setStartYear(start_year);
        setEndYear(end_year);
        if (type === "Start") {
          setyear(start_year);
        } else if (type === "End") {
          setyear(end_year);
        }
      } else {
        setyear(new Date().getFullYear());
        setStart(null);
        setEnd(null);
        setStartYear(new Date().getFullYear());
        setEndYear(new Date().getFullYear());
      }
    }

    if (defaultFilter.includes("Month")) {
      setOptions(monthOptions);
    } else if (defaultFilter.includes("Qrtr")) {
      setOptions(quarterOptions);
    } else if (defaultFilter.includes("Year")) {
      setOptions(yearOptions());
    }
  }, [defaultFilter, calendar_filters, isMenuOpen]);

  useEffect(() => {
    if (defaultFilter.includes("Month")) {
      setTag("month");
      if (type === "Start") {
        if (end) {
          setOptions(
            monthOptions.filter((data) => {
              if (startYear && endYear) {
                if (startYear === endYear) {
                  return data.value <= end;
                }
              }
              return data.value;
            })
          );
        }

        setYearFilters(
          yearOptions().filter((data) => {
            if (startYear && endYear) {
              if (startYear === endYear) {
                return data.value <= startYear;
              } else if (startYear < endYear) {
                return data.value <= endYear;
              }
            }
            return data.value;
          })
        );
      }
      if (type === "End") {
        if (start) {
          setOptions(
            monthOptions.filter((data) => {
              if (startYear && endYear) {
                if (startYear < endYear) {
                  return data.value;
                } else if (startYear === endYear) {
                  return data.value >= start;
                }
              }
            })
          );
        }

        setYearFilters(
          yearOptions().filter((data) => {
            if (startYear && endYear) {
              if (start && end) {
                if (start > end) {
                  return data.value > startYear;
                }
              }
            }
            return data.value >= startYear;
          })
        );
      }
    }
    if (defaultFilter.includes("Qrtr")) {
      setTag("qrtr");
      if (type === "Start") {
        if (end) {
          setOptions(
            quarterOptions.filter((data) => {
              if (startYear && endYear) {
                if (startYear === endYear) {
                  return data.value <= end;
                } else if (startYear < endYear) {
                  return data.value;
                }
              }
            })
          );
        }

        setYearFilters(
          yearOptions().filter((data) => {
            if (startYear && endYear) {
              if (startYear === endYear) {
                return data.value <= startYear;
              } else if (startYear < endYear) {
                return data.value <= endYear;
              }
            }
            return data.value;
          })
        );
      }

      if (type === "End") {
        if (start) {
          setOptions(
            quarterOptions.filter((data) => {
              if (startYear && endYear) {
                if (startYear < endYear) {
                  return data.value;
                } else if (startYear === endYear) {
                  return data.value >= start;
                }
              }
            })
          );
        }

        setYearFilters(
          yearOptions().filter((data) => {
            if (startYear && endYear) {
              if (start && end) {
                if (start > end) {
                  return data.value > startYear;
                }
              }
            }
            return data.value >= startYear;
          })
        );
      }
    }

    if (defaultFilter.includes("Year")) {
      setTag("year");
      if (type === "Start") {
        if (end) {
          setOptions(yearOptions().filter((data) => data.value <= end));
        }
      }

      if (type === "End") {
        if (start) {
          setOptions(yearOptions().filter((data) => data.value >= start));
        }
      }
    }
  }, [start, end, startYear, endYear]);
  useEffect(() => {
    if (type === "Start") {
      setIsActive(start);
    } else if (type === "End") {
      setIsActive(end);
    }
  }, [start, type, end]);

  const selectionCalendarIcon = (props) => {
    return (
      <img
        {...props}
        style={{ width: "12px" }}
        src={getImageFromURL(`${IMAGES.SELECTICONCALENDAR}`)}
        alt={IMAGES.SELECTICONCALENDAR}
      />
    )
  }

  return (
    <div style={{ width: "100%" }} className="line">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!defaultFilter.includes("Year") && (
          <FormControl
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
              "& .MuiOutlinedInput-input": {
                padding: "0px 14px",
              },
              "& .MuiOutlinedInput-root": {
                background: "transparent !important",
                ".MuiSelect-outlined": {
                  fontSize: "15px",
                  color: "#1C1D1F",
                },
              },
            }}
          >
            <Select
              value={year}
              sx={{
                "& .MuiSelect-icon": {
                  top: "unset",
                },
              }}
              onChange={handleChange}
              IconComponent={(props) => selectionCalendarIcon(props)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    ".MuiList-root": {
                      overflowY: "auto",
                      maxHeight: "200px",
                      ".MuiMenuItem-root": {
                        fontSize: "12px",
                        color: "#5C5C5C",
                      },
                    },
                  },
                },
              }}
            >
              {yearFilters.map(({ value, label }) => {
                return <MenuItem key={utils.commonFunctions.keyFinder()} value={value}>{label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        )}
      </div>
      {!defaultFilter.includes("Year") ? (
        <Divider
          sx={{
            mb: "2%",
            ml: "3%",
            mr: "3%",
            mt: "4%",
            width: "90%",
            borderColor: "#707070",
            borderWidth: "0.5px",
          }}
        />
      ) : (
        ""
      )}

      <Box display="flex" sx={{ flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
        {options.map(({ value, label, index }) => {
          return (
            <MenuItem
              key={value}
              value={value}
              className={`${isActive === value &&
                `${defaultFilter.includes("Qrtr") ? "bg-salmon-qtr" : "bg-salmon"
                }`
                } ${defaultFilter.includes("Qrtr") ? "Menu-Qtr" : "Menu"} `}
              onClick={() => handleChangeMonth(value)}
            >
              {label}
            </MenuItem>
          );
        })}
      </Box>
    </div>
  );
};