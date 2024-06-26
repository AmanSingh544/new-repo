import { monthsName } from "src/constants/appConstants";
export const convertToDate = (tag, start, end, startYear, endYear) => {
  let start_date = "";
  let end_date = "";
  let date_start = new Date();
  let date_end = new Date();
  if (tag === "month") {
    date_start.setMonth(start - 1);
    date_start.setFullYear(startYear);
    date_end.setMonth(end - 1);
    date_end.setFullYear(endYear);
    start_date = new Date(date_start.getFullYear(), date_start.getMonth(), 1);
    end_date = new Date(date_end.getFullYear(), date_end.getMonth() + 1, 0);
  } else if (tag === "qrtr") {
    date_start.setFullYear(startYear);
    date_end.setFullYear(endYear);

    if (start === 1) {
      date_start.setMonth(0);
    } else if (start === 2) {
      date_start.setMonth(3);
    } else if (start === 3) {
      date_start.setMonth(6);
    } else if (start === 4) {
      date_start.setMonth(9);
    }

    if (end === 1) {
      date_end.setMonth(2);
    } else if (end === 2) {
      date_end.setMonth(5);
    } else if (end === 3) {
      date_end.setMonth(8);
    } else if (end === 4) {
      date_end.setMonth(11);
    }

    start_date = new Date(date_start.getFullYear(), date_start.getMonth(), 1);
    end_date = new Date(date_end.getFullYear(), date_end.getMonth() + 1, 0);
  } else if (tag === "year") {
    date_start.setFullYear(start);
    date_end.setFullYear(end);
    start_date = new Date(date_start.getFullYear(), 0, 1);
    end_date = new Date(date_end.getFullYear(), 11, 31);
  }

  return { start_date, end_date };
};

export const convertToDateFormat = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (JSON.stringify(date.getMonth() + 1).length !== 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (JSON.stringify(date.getDate()).length !== 2
      ? "0" + date.getDate()
      : date.getDate())
  );
};

export const getMonthShortName = (monthNo) => {
  switch (monthNo) {
    case 1:
      return  "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return  "Dec";
    default:
      return  "";
  }
}

export const getRegionNameAbb = (name) => {
  if (name.includes("Europe") || name === "Europe, Middle East, Africa") {
    return "EMEA";
  } else if (name === "Middle East/Africa" || name === "Africa") {
    return "MENA";
  } else if (name === "Americas") {
    return "Americas";
  } else if (name === "Latin American") {
    return "LATAM";
  } else if (name === "North America") {
    return "NM";
  } else if (name === "test-region") {
    return "TR";
  } else if (name === "South East Asia") {
    return "SEA";
  } else if (name === "Asia Pacific") {
    return "APAC";
  } else if (name === "Australia and New Zealand") {
    return "ANZ";
  } else {
    return "XYZ RegionnameAbb";
  }
};

export const getRegionNameFull = (name) => {
  if (name === "EMEA") {
    return "Europe, Middle East, Africa";
  } else if (name === "MENA") {
    return "Middle East/Africa";
  } else if (name === "Americas") {
    return "Americas";
  } else if (name === "LATAM") {
    return "Latin American";
  } else if (name === "NM") {
    return "North America";
  } else if (name === "TR") {
    return "test-region";
  } else if (name === "SEA") {
    return "South East Asia";
  } else if (name === "APAC") {
    return "Asia Pacific";
  } else if (name === "ANZ") {
    return "Australia and New Zealand";
  } else {
    return "XYZ Region Name Full";
  }
};

export const getBuName = (id, buFilters) => {
  const filteredBu = buFilters.filter((data) => data.id === id);
  if (filteredBu.length) {
    return filteredBu[0]["name"];
  }
};

export const makeScopeArray = (scope) => {
  let scopeFilters = scope?.map((data) => parseFloat(data.split(" ")[1]));
  if(scopeFilters) {
  return scopeFilters.length ? scopeFilters : null;
  }
};

export const makeTag = (calendar_filters) => {
  if (calendar_filters && Object.keys(calendar_filters).length) {
    const { tag } = calendar_filters;
    return tag === "qrtr" ? "quarter" : tag;
  }
  return null;
};

export const makeStartDate = (calendar_filters) => {
  let startDate = null;
  if(calendar_filters && Object.keys(calendar_filters).length) {
    const { tag, start, end, start_year, end_year } = calendar_filters;
    if (Object.keys(calendar_filters).length) {
      const { start_date } = convertToDate(tag, start, end, start_year, end_year);
      startDate = convertToDateFormat(start_date);
      return startDate;
    }
  }
  return null;
};

export const makeEndDate = (calendar_filters) => {
  let endDate = null;
  if (calendar_filters && Object.keys(calendar_filters).length) {
  const { tag, start, end, start_year, end_year } = calendar_filters;
    const { end_date } = convertToDate(tag, start, end, start_year, end_year);
    endDate = convertToDateFormat(end_date);
    return endDate;
  }
  return null;
};

export const makeRegion = (region, regionData) => {
  let regionNameFull = region.map((data) => getRegionNameFull(data));
  let regionFilters = regionData
    ?.filter((data) => regionNameFull.includes(data.region_name))
    ?.map((data) => data.id);
  if (regionFilters.length > 0) {
    return regionFilters;
  }
  return null;
};

export const makeRc = (country) => {
  let regionFilters = country?.map((data) => data.toLowerCase());
  if(regionFilters) {
    if (regionFilters.length > 0) {
      return regionFilters;
    }
  }
  return null;
};

export const makeBu = (bu, bu_filters) => {
  let buFilters = null;
  if (bu_filters?.length > 0) {
    buFilters = bu_filters
      ?.map((data) => {
        if (bu.includes(data.name)) {
          return data.id;
        }
      })
      ?.filter((data) => data);
    return buFilters.length > 0 ? buFilters : null;
  }
  return null;
};

export const makeTeams = (team, team_filters) => {
  //added com
  let teamFilters = null;
  if (team_filters?.length > 0) {
    teamFilters = team_filters
      ?.map((data) => {
        if (team.includes(data.name)) {
          return data.id;
        }
      })
      ?.filter((data) => data);
    return teamFilters.length > 0 ? teamFilters : null;
  }
  return null;
};

export const makeModes = (modes) => {
  if (modes.length > 0) {
    return modes;
  }
  return null;
}

export const makeMovementType = (movement) => {
  if (movement.length > 0) {
    return movement;
  }
  return null;
}

export const makeActivity = (activities) => {
  if (activities.length > 0) {
    return activities;
  }
  return null;
}

export const findMonthInDigit = (selectedMonth) =>{
  let monthIndex = monthsName.findIndex(month => month.value === selectedMonth);
  return monthIndex<9? `0${monthIndex+1}` : monthIndex+1
}

export const findStartDateAccToSlctdWeek = (selectedWeek, selectedMonth, selectedYear) => {
  let fullYear = selectedYear;
  let monthInDigit = findMonthInDigit(selectedMonth)
  if(selectedMonth === "Feb" ){
    if(selectedWeek === "W1"){
      return `${fullYear}-${monthInDigit}-01`
    }
    else if(selectedWeek === "W2"){
      return `${fullYear}-${monthInDigit}-08`
    }
    else if(selectedWeek === "W3"){
      return `${fullYear}-${monthInDigit}-15`
    }
    else if(selectedWeek === "W4"){
      return `${fullYear}-${monthInDigit}-22`
    }
  }
  else {
    if(selectedWeek === "W1"){
      return `${fullYear}-${monthInDigit}-01`
    }
    else if(selectedWeek === "W2"){
      return `${fullYear}-${monthInDigit}-08`
    }
    else if(selectedWeek === "W3"){
      return `${fullYear}-${monthInDigit}-15`
    }
    else if(selectedWeek === "W4"){
      return `${fullYear}-${monthInDigit}-22`
    }
    else if(selectedWeek === "W5"){
      return `${fullYear}-${monthInDigit}-29`
    }
  }
}

export const findEndDateAccToSlctdWeek = (selectedWeek, selectedMonth, selectedYear) => {
  let fullYear = selectedYear;
  let monthInDigit = findMonthInDigit(selectedMonth)
    if(selectedWeek === "W1"){
      return `${fullYear}-${monthInDigit}-07`
    }
    else if(selectedWeek === "W2"){
      return `${fullYear}-${monthInDigit}-14`
    }
    else if(selectedWeek === "W3"){
      return `${fullYear}-${monthInDigit}-21`
    }
    else if(selectedWeek === "W4"){
      return `${fullYear}-${monthInDigit}-28`
    }
    else if(selectedWeek === "W5"){
      if(selectedMonth === "Feb" ){
        return null;
      }
      else if(selectedMonth === "Jan" || selectedMonth === "Mar" || selectedMonth === "May" || selectedMonth === "Jul"  || selectedMonth === "Aug" || selectedMonth === "Oct" || selectedMonth === "Dec"){
        return `${fullYear}-${monthInDigit}-31`
      }
      else {
        return `${fullYear}-${monthInDigit}-30`
      }
    }
  }

  export const findStartDateAccToSlctdMonth =(selectedMonth,selectedYear) => {
  let fullYear = selectedYear;
  let monthInDigit = findMonthInDigit(selectedMonth);

    return `${fullYear}-${monthInDigit}-01`;
  }

  export const findEndDateAccToSlctdMonth =(selectedMonth,selectedYear) => {
    let fullYear = selectedYear;
    let monthInDigit = findMonthInDigit(selectedMonth);
    if(selectedMonth === "Feb" ){
      return `${fullYear}-${monthInDigit}-${fullYear %4 === 0 ? '29':'28'}`
    }
    else if(selectedMonth === "Jan" || selectedMonth === "Mar" || selectedMonth === "May" || selectedMonth === "Jul"  || selectedMonth === "Aug" || selectedMonth === "Oct" || selectedMonth === "Dec"){
          return `${fullYear}-${monthInDigit}-31`
    }
    else {
          return `${fullYear}-${monthInDigit}-30`
        }
      }

  export const getParamsAccToFilters = (dataForParams, isDetailed) =>{
    let { scope, calendar_filters, region, regionData, country, bu, bu_filters, team, team_filters, modes, movement, activity} = dataForParams;
    let params = {};
    if (makeScopeArray(scope)) {
      params.scope = JSON.stringify(makeScopeArray(scope));
    }
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    if (makeRegion(region, regionData)) {
      params.region = JSON.stringify(makeRegion(region, regionData));
    }
    if (makeRc(country)) {
      params.rc = JSON.stringify(makeRc(country));
    }
    if (makeBu(bu, bu_filters)) {
      params.bu = JSON.stringify(makeBu(bu, bu_filters));
    }
    if (makeTeams(team, team_filters)) {
      params.team = JSON.stringify(makeTeams(team, team_filters));
    }
    if(isDetailed){
      if (makeModes(modes)) {
        params.mode = JSON.stringify(makeModes(modes));
      }
      if (makeMovementType(movement)) {
        params.movement_type = JSON.stringify(makeMovementType(movement));
      }
      if (makeActivity(activity)) {
        params.activities = JSON.stringify(makeActivity(activity));
      }
    }
    
    return params;

  }

  export const findDataForEmissionKpis = (kpiName, emissionKpiListData) => {
    let newTempArray = emissionKpiListData?.filter((item)=>{
      return item.name === kpiName
    })
    return newTempArray[0];
  }
  
  
  export const findValueForEmissionKpis = (kpiName, emissionKpiListData) => {
    let newTempArray = emissionKpiListData?.filter((item)=>{
      return item.name === kpiName
    })
    return {...newTempArray[0]};
  }