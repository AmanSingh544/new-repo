import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  makeScopeArray,
  makeBu,
  makeTeams,
  makeStartDate,
  makeEndDate,
  makeRegion,
  makeTag,
  makeRc,
} from "src/utils/utilityFunction";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import Loader from "src/components/loader/index";
import DonutChart from "src/components/infographics/charts/donutChart";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";

export default function EmissionScopes({
  setEnabledInfoClick,
  enabledInfoClick,
}) {
  const [donutData, setDonutData] = useState([]);
  const { masterEntities } = useSelector((state) => state.globalRed);
  const [emissionScopeArr, setEmissionScopeArr] = useState([]);
  const [bgColorArr, setBgColorArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const { regionData } = useSelector((state) => state.globalRed);
  const {
    scope,
    region,
    country,
    bu,
    team,
    calendar_filters,
    bu_filters,
    team_filters,
  } = useSelector((state) => state.filters);

  const handleRemainingRenderEmissionScope = (params) => {
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
  }
  const renderEmissionScope = () => {
    let params = {};

    if (makeScopeArray(scope)) {
      params.scope = JSON.stringify(makeScopeArray(scope));
    } else {
      if (enabledInfoClick) {
        const scopeNum = parseInt(enabledInfoClick.replace("Scope ", ""));
        params.scope = JSON.stringify([scopeNum]);
      }
    }
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    handleRemainingRenderEmissionScope(params)

    Apicalls.getApiCall(
      constants.endPoints.emissionScopes,
      params,
      "",
      handleEmissionScopeSuccess,
      handleEmissionScopeError
    );
  };

  const handleFirstEntity = (entity_name, bgColor) => {
    switch (entity_name) {
      case "Mobile Combustion":
        bgColor.push("#0081A6");
        break;
      case "Static Combustion":
        bgColor.push("#00D3E9");
        break;
      case "Fugitive":
        bgColor.push("#00A3C5");
        break;
      default:
        bgColor.push("#00A3C5");
    }
  }

  const handleSecondEntity = (entity_name, bgColor) => {
    switch (entity_name) {
      case "Purchased Electricity":
        bgColor.push("#004E8E");
        break;
      case "Purchased Steam":
        bgColor.push("#0066B9");
        break;
      case "Purchased Others":
        bgColor.push("#2DA2F9");
        break;
      default:
        bgColor.push("#2DA2F9");
    }
  }

  const handleThirdEntity = (entity_name, bgColor) => {
    switch (entity_name) {
      case "Transportation & Distribution":
        bgColor.push("#003D75");
        break;
      case "Employee Commute":
        bgColor.push("#004A8E");
        break;
      case "Waste Generated":
        bgColor.push("#0059AB");
        break;
      case "Processing of Sold Goods":
        bgColor.push("#3576D2");
        break;
      case "Use of Sold Goods":
        bgColor.push("#2689E4");
        break;
      case "EQL Treatment of Sold Goods":
      case "Others":
      default:
        bgColor.push("#80B5FF");
        break;
    }
  }
  const handleScopeArrayCase = (data, bgColor) => {
    switch (data.scope) {
      case 1:
        bgColor.push("#00A3C5");
        break;
      case 2:
        bgColor.push("#0066B9");
        break;
      case 3:
        bgColor.push("#b1000e");//"#004A8E");
        break;
    }
  }
  const handleEmissionScopeSuccess = (response) => {
    let scopeArr = [];
    let bgColor = [];
    setLoading(false);
    const entityName = (scope, entity) => {
      const entity_name = masterEntities.filter((data) => data.scope === scope && data.entity === entity);

      if (entity_name.length) {
        return entity_name[0].name;
      }
    };

    // console.log("vishnu", response.data.result.data)
    if (response?.data?.result?.data[0]?.entity) {
      response?.data?.result?.data?.map((data) => {
        let entity_name = entityName(data.scope, data.entity);
        scopeArr.push(`Scope ${data.scope}`);
        switch (data.scope) {
          case 1:
            handleFirstEntity(entity_name, bgColor)
            break;
          case 2:
            handleSecondEntity(entity_name, bgColor)
            break;
          case 3:
            handleThirdEntity(entity_name, bgColor)
            break;
          default:
            bgColor.push("#000000");
        }

      });
    } else {
      response?.data?.result?.data?.map((data) => {
        scopeArr.push(`Scope ${data.scope}`);
        handleScopeArrayCase(data, bgColor)
      });
    }

    setEmissionScopeArr(scopeArr);
    setBgColorArr(bgColor);
    setDonutData(response?.data?.result?.data);
  };

  const handleEmissionScopeError = (error) => {
    setLoading(false);
  };

  useEffect(() => {
    if (scope.length) {
      if (setEnabledInfoClick) {
        setEnabledInfoClick(false);
      }
    }
  }, [scope.length]);

  useEffect(() => {
    renderEmissionScope();
  }, [
    scope.length,
    bu.length,
    team.length,
    region.length,
    country.length,
    calendar_filters,
    enabledInfoClick,
  ]);
  const handleCutout = () => {
    return window.screen.width > 1500 ? 75 : 70
  }
  if (loading) {
    return <Loader size={30} />;
  } else if (!loading && !donutData.length) {
    return <NothingFoundView />;
  } else {
    return (
      <DonutChart
        setEnabledInfoClick={setEnabledInfoClick}
        enabledInfoClick={enabledInfoClick}
        type={"emissionScopes"}
        donutData={donutData}
        labels={emissionScopeArr}
        cutout={handleCutout()}
        backgroundColor={bgColorArr}
        loading={false}
      />
    );
  }
}
