import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { getMonthShortName, convertToDate } from "src/utils/utilityFunction";
import CustomButton from "src/components/buttons/Buttons";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "src/modules/filters/filter-actions";
import { YearAndMonthFilter } from "./YearAndMonthFilter";
import { equivalenceFilterActions } from "src/components/dashboard/equivalence/equivalence-filters/equivalence-filter-actions/index";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { detailedFilterActions } from "../dashboard/detailed-summary/detailed-filters/detailed-filter-actions";
import { Box } from "@mui/system";
import { IMAGES } from "src/constants/images";
import { StyledMenu } from "../styledMenu";
import { dmlFilterActions } from "src/modules/dml-filters/dml-filters-actions/index";
import { simulatorFilterActions } from "../dashboard/Risk&Recommendation/Simulator/SimulatorFilterLayout/simulator-filter-actions";

export const CalendarFilter = () => {
  const { pathname } = useLocation();
  const { globalState, singleDetailed } = useSelector(
    (state) => state.globalRed
  );
  let isEquivalence = pathname.includes("equivalence");
  let isDetailed = pathname.includes("detailed") || singleDetailed;
  let isDml = pathname.includes("data-mapping-layer/upload");
  let isSimulator = pathname.includes("simulator")
  const [position, setPosition] = useState("");
  const { setCalendarFilters } = filterActions;
  const { setDetailedCalendarFilters } = detailedFilterActions;
  const { setSimulatorCalendarFilters } = simulatorFilterActions
  const { setEqCalendarFilters } = equivalenceFilterActions;
  const { setDmlCalendarFilters } = dmlFilterActions;

  const calendarFilter = (state) => {
    if (isDml) {
      return state.dmlFilterReducer;
    }
    else if (isEquivalence) {
      return state.eqFilters;
    }
    else if (isDetailed) {
      return state.detailedFilters;
    }
    else if (isSimulator) {
      return state.simulatorFilters;
    }
    else {
      return state.filters;
    }
  }

  const { calendar_filters } = useSelector((state) => calendarFilter(state));
  const [doneDisabled, setDoneDisabled] = useState(true);
  const dispatch = useDispatch();
  const [getPlaceholderDate, setPlaceholderDate] = useState(null);
  const inputRef = useRef(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [tag, setTag] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState("monthly");
  const { t } = useTranslation();
  const handleChangeFilter = (filter) => {
    setActiveFilter(filter);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenDatePicker = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const diff_months = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  const monthQrtrDifference = (tag, start, end, start_year, end_year) => {
    const { start_date, end_date } = convertToDate(
      tag,
      start,
      end,
      start_year,
      end_year
    );
    return diff_months(start_date, end_date) <= 13;
  };

  const yearDifference = (start, end) => {
    if (end >= start) {
      if (end - start < 5) {
        return true;
      }
    }
    return false;
  };

  const monthDispatchFunc = () => {
    if (isDml) {
      dispatch(
        setDmlCalendarFilters({
          ...calendar_filters,
          tag: "month",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isEquivalence) {
      dispatch(
        setEqCalendarFilters({
          ...calendar_filters,
          tag: "month",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isDetailed) {
      dispatch(
        setDetailedCalendarFilters({
          ...calendar_filters,
          tag: "month",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isSimulator) {
      dispatch(
        setSimulatorCalendarFilters({
          ...calendar_filters,
          tag: "month",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else {
      dispatch(
        setCalendarFilters({
          ...calendar_filters,
          tag: "month",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      );
    }
  }

  const qrtrDispatchFunc = () => {
    if (isDml) {
      dispatch(
        setDmlCalendarFilters({
          ...calendar_filters,
          tag: "qrtr",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isEquivalence) {
      dispatch(
        setEqCalendarFilters({
          ...calendar_filters,
          tag: "qrtr",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isDetailed) {
      dispatch(
        setDetailedCalendarFilters({
          ...calendar_filters,
          tag: "qrtr",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else if (isSimulator) {
      dispatch(
        setSimulatorCalendarFilters({
          ...calendar_filters,
          tag: "qrtr",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
    else {
      dispatch(
        setCalendarFilters({
          ...calendar_filters,
          tag: "qrtr",
          start: start,
          end: end,
          start_year: startYear,
          end_year: endYear,
        })
      )
    }
  }

  const yearDispatchFunc = () => {
    if (isDml) {
      dispatch(
        setDmlCalendarFilters({
          ...calendar_filters,
          tag: "year",
          start: start,
          end: end,
          start_year: null,
          end_year: null,
        })
      )
    }
    else if (isEquivalence) {
      dispatch(
        setEqCalendarFilters({
          ...calendar_filters,
          tag: "year",
          start: start,
          end: end,
          start_year: null,
          end_year: null,
        })
      )
    }
    else if (isDetailed) {
      dispatch(
        setDetailedCalendarFilters({
          ...calendar_filters,
          tag: "year",
          start: start,
          end: end,
          start_year: null,
          end_year: null,
        })
      )
    }
    else if (isSimulator) {
      dispatch(
        setSimulatorCalendarFilters({
          ...calendar_filters,
          tag: "year",
          start: start,
          end: end,
          start_year: null,
          end_year: null,
        })
      )
    }
    else {
      dispatch(
        setCalendarFilters({
          ...calendar_filters,
          tag: "year",
          start: start,
          end: end,
          start_year: null,
          end_year: null,
        })
      )
    }
  }


  const handleCalendarFilter = () => {
    if (tag === "month" && start && end && startYear && endYear) {
      monthDispatchFunc();
    }

    if (tag === "qrtr" && start && end && startYear && endYear) {
      qrtrDispatchFunc();
    }

    if (tag === "year" && start && end) {
      yearDispatchFunc();
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    setPosition(
      inputRef.current
        ? inputRef.current.getBoundingClientRect().top +
        inputRef.current.getBoundingClientRect().height / 4
        : 0
    );
  }, [inputRef, isMenuOpen]);

  useEffect(() => {
    if (tag === "month" || tag === "qrtr") {
      if (
        start &&
        end &&
        startYear &&
        endYear &&
        monthQrtrDifference(tag, start, end, startYear, endYear)
      ) {
        setDoneDisabled(false);
      } else {
        setDoneDisabled(true);
      }
    }

    if (tag === "year") {
      if (start && end && yearDifference(start, end)) {
        setDoneDisabled(false);
      } else {
        setDoneDisabled(true);
      }
    }
  }, [tag, start, end, startYear, endYear, monthQrtrDifference]);

  const settingPlaceholderDateFunc = () => {
    const { start, end, start_year, end_year, tag } = calendar_filters;
    if (tag === "month") {
      setActiveFilter("monthly");
      let startMonth = getMonthShortName(start)
      let endMonth = getMonthShortName(end)
      if (startMonth + " " + start_year === endMonth + " " + end_year) {
        setPlaceholderDate(startMonth + " " + start_year);
      } else {
        setPlaceholderDate(
          startMonth + " " + start_year + " - " + endMonth + " " + end_year
        );
      }
    } else if (tag === "qrtr") {
      setActiveFilter("quarterly");
      let startQrtr = "Q" + start;
      let endQrtr = "Q" + end;

      if (startQrtr + " " + start_year === endQrtr + " " + end_year) {
        setPlaceholderDate(startQrtr + " " + start_year);
      } else {
        setPlaceholderDate(
          startQrtr + " " + start_year + " - " + endQrtr + " " + end_year
        );
      }
    } else if (tag === "year") {
      setActiveFilter("yearly");
      if (start === end) {
        setPlaceholderDate(start);
      } else {
        setPlaceholderDate(start + " - " + end);
      }
    }
  }

  useEffect(() => {
    if (calendar_filters && Object.keys(calendar_filters).length) {
      settingPlaceholderDateFunc();
    } else {
      let date = new Date();
      date.setDate(1);
      if (!date.getMonth()) {
        date.setMonth(11);
        date.setFullYear(date.getFullYear() - 1);
      } else {
        date.setMonth(date.getMonth() - 1);
        date.setFullYear(date.getFullYear());
      }

      setPlaceholderDate(
        date.toLocaleString("default", {
          month: "short",
        }) +
        " - " +
        date.getFullYear()
      );
    }
  }, [calendar_filters]);

  const decideActiveFilter = (activeFilter) => {
    let filter = "";
    if (activeFilter === "monthly") {
      filter = "Select Month"
    }
    else if (activeFilter === "quarterly") {
      filter = "Select Qrtr"
    }
    else if (activeFilter === "yearly") {
      filter = "Select Year"
    }
    return filter
  }
  return (
    <>
      <Box display="flex" className="calenderFilterMainCls" ref={inputRef} onClick={handleOpenDatePicker}>
        <Box
          className="clanederIcon"
          sx={{
            background: "#C12325",
            borderRadius: "5px 0px 0px 5px",
            cursor: "pointer",
          }}
        >
          <img
            width={30}
            height={20}
            src={"https://carbnonx.blob.core.windows.net/carbnonx/CalenderIcon.svg"}
            alt={IMAGES.CALENDER}
          />
        </Box>
        <div
          className={`calendar-filter ${globalState ? " singleView" : ""}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            color: "#000000",
            fontWeight: "400",
            borderRadius: "5px",
            fontFamily: "Inter",
            border: "1px solid #969696",
            margin: " 0",
            maxWidth: "169px",
            background: "transparent",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          {getPlaceholderDate}
        </div>
      </Box>

      <StyledMenu
        anchorEl={anchorEl}
        className="calenderYearMonthMain"
        sx={{
          "& .MuiModal-backdrop": {
            background: "rgba(0, 0, 0, 0.25)",
          },
          top: "4%",
          "& .MuiPaper-root": {
            height: "342px",
            top: `${position}px !important`,
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: "500px",
            borderRadius: "11px",
            border: "1px solid #D8D8D8",
            background: "#FFFFFF",
            boxShadow: "0px 9px 25px rgba(0, 0, 0, 0.1)",

          },
          sx: {
            ".MuiList-root": {
              padding: "0px",
            },
          },
        }}
        id={"calendar"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}

      >
        <div
          className="calenderYearMonth"
        >

          <Typography
            component={"div"}
            display="flex"
            style={{
              padding: "15px 0px 7px 0px",
              margin: "6px 10px",
            }}
          >
            <div
              className={`calendar-header ${activeFilter === "monthly" ? "activeCalendar" : ""
                }`}
              onClick={() => handleChangeFilter("monthly")}
            >
              {t("monthly")}
            </div>
            <div
              className={`calendar-header ${activeFilter === "quarterly" ? "activeCalendar" : ""
                }`}
              onClick={() => handleChangeFilter("quarterly")}
            >
              {t("quarterly")}
            </div>
            <div
              className={`calendar-header ${activeFilter === "yearly" ? "activeCalendar" : ""
                }`}
              onClick={() => handleChangeFilter("yearly")}
            >
              {t("yearly")}
            </div>
          </Typography>
          <Typography
            component={"div"}

            display="flex"
            justifyContent={"space-between"}
            style={{
              width: "100%",
              margin: "5px 15px",
              paddingRight: "13px",
            }}
          >
            <YearAndMonthFilter
              isMenuOpen={isMenuOpen}
              start={start}
              setTag={setTag}
              end={end}
              startYear={startYear}
              endYear={endYear}
              setStartYear={setStartYear}
              setEndYear={setEndYear}
              setStart={setStart}
              setEnd={setEnd}
              type={"Start"}
              defaultFilter={decideActiveFilter(activeFilter)
              }
            />
            <YearAndMonthFilter
              isMenuOpen={isMenuOpen}
              start={start}
              end={end}
              setEnd={setEnd}
              setTag={setTag}
              setStart={setStart}
              startYear={startYear}
              endYear={endYear}
              setStartYear={setStartYear}
              setEndYear={setEndYear}
              type={"End"}
              defaultFilter={decideActiveFilter(activeFilter)}
            />
          </Typography>
        </div>
        <Box
          className="calnederbtn"
          display="flex"
          justifyContent={"flex-end"}
        >
          <CustomButton
            onClick={() => setAnchorEl(null)}
            bgColor={"#E3E3E3;"}
            buttonWidth={{
              padding: "10px 40px !important",
              width: "110px"
            }}
            buttonTextStyle={{
              color: "#1D1E1F",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "50px",
            }}
            buttonText={t("Cancel")}
          />
          <CustomButton
            disabled={doneDisabled}
            onClick={handleCalendarFilter}
            bgColor={"#1C2325"}
            buttonWidth={{
              padding: "10px 46px !important",
              marginRight: "3%!important",
              width: "110px"
            }}
            buttonTextStyle={{
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "50px",
            }}
            buttonText={t("OK")}
          />
        </Box>
      </StyledMenu>
    </>
  );
};