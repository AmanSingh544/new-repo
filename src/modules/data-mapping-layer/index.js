import React, { useEffect, useState } from "react";
import DataMappingLayerCard from "./card";
import DataMappingLayerHead from "./head";
import DataMappingSkip from "./skip";
import constants from "src/constants";
import { useRequestApi } from "src/customHooks/useRequestApi";
import {
  makeStartDate,
  makeEndDate,
  makeTag
} from "src/utils/utilityFunction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dmlActions } from 'src/modules/dml/dml-actions/index';

export default function DataMappingLayer() {
  const { request } = useRequestApi();
  const [structuredSheetStatusData, setStructuredSheetStatusData] = useState([{}, {}, {}]);
  const [structuredSheetRecordData, setStructuredSheetRecordData] = useState([]);
  const [skippedLabelArr, setSkippedLabelArr] = useState([]);
  const [skippedBarDataArr, setSkippedBarDataArr] = useState([]);
  const [skippedDisDataArr, setSkippedDisDataArr] = useState([]);
  const [skippedRowLoading, setSkippedRowLoading] = useState(true);
  const { calendar_filters } = useSelector((state) => state.dmlFilterReducer);
  const [sssLoading, setSssLoading] = useState(false);
  const [dataInSss, setDataInSss] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { setDmlSelectedFiles, setDmlSelectedEntity, setDmlSelectedMode, setSelectedRule } = dmlActions;

  useEffect(() => {
    structuredSheetStatus()
    getStructuredSheetRecords()
    getSkippedRowGraphData()
  }, [calendar_filters])

  const structuredSheetStatus = async () => {
    let params = {};
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    setSssLoading(true)

    await request(constants.apiConstants.METHOD_GET, constants.endPoints.getStructuredSheetStatus, params, null, handleStructuredSheetStatusSuccess, handleStructuredSheetStatusError);
  }
  const handleStructuredSheetStatusSuccess = (response) => {
    setSssLoading(false)
    if (response) {
      let tempArr = JSON.parse(JSON.stringify(response?.data?.result?.data))
      if (tempArr?.length) {
        tempArr?.map((item) => {
          if (item.label === "Entries Processed") {
            item.color = "#b1000e"
          }
          else if (item.label === "Rows Uploaded") {
            item.color = "#50D987"
          }
          else if (item.label === "Rows Skipped") {
            item.color = "#ff4d4d"
          }
        })
        setDataInSss(true);
        setStructuredSheetStatusData(tempArr);
      }
      {
        setDataInSss(false)
      }
    }
  }
  const handleStructuredSheetStatusError = (error) => {
    //This is intentional for error logging.
    console.log("handleStructuredSheetStatusError", error);
    setSssLoading(false);
    setDataInSss(false);
  }

  const getStructuredSheetRecords = async () => {
    let params = {};
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    await request(constants.apiConstants.METHOD_GET, constants.endPoints.getStructuredSheetRecords, params, null, handleStructuredSheetRecordsSuccess, handleStructuredSheetRecordsError);
  }

  const handleStructuredSheetRecordsSuccess = (response) => {
    if (response) {
      if (response?.data?.result?.data) {
        response?.data?.result?.data?.map((item) => {
          item.label = `Scope - ${item.scopeId}.${item.entityId}`;
          item.count = item.totalAvailableRow;
          item.date = dateFinder(item.createDate)
        })
        setStructuredSheetRecordData(response?.data?.result?.data)
      }
    }
  }
  const handleStructuredSheetRecordsError = (error) => {
    //This is intentional for error logging.
    console.log("handleStructuredSheetRecordsError", error);
  }

  const getSkippedRowGraphData = async () => {
    let params = {};
    if (makeTag(calendar_filters)) {
      params.tag = makeTag(calendar_filters);
    }
    if (makeStartDate(calendar_filters)) {
      params.start_date = makeStartDate(calendar_filters);
    }
    if (makeEndDate(calendar_filters)) {
      params.end_date = makeEndDate(calendar_filters);
    }
    setSkippedRowLoading(true);
    await request(constants.apiConstants.METHOD_GET, constants.endPoints.getSkippedRowGraphData, params, null, handleSkippedRowGraphDataSuccess, handleSkippedRowGraphDataError);
  }

  const handleSkippedRowGraphDataSuccess = (response) => {
    setSkippedRowLoading(false);
    if (response?.data?.result) {
      makeLabelsForSkippedRows(response);
      makeBarDataForSkippedRows(response)
      makeDisDataForSkippedRows(response)
    }
  }

  const handleSkippedRowGraphDataError = (error) => {
    setSkippedRowLoading(false);
    //This is intentional for error logging.
    console.log("handleSkippedRowGraphDataError", error);
  }

  const makeLabelsForSkippedRows = (response) => {
    let skippedLabelTempArr = [];
    response?.data?.result?.map((item) => {
      skippedLabelTempArr.push(item.rule_name);
    })
    setSkippedLabelArr(skippedLabelTempArr)
    console.log("SKIPPEDLABELS", skippedLabelTempArr)
  }
  const makeBarDataForSkippedRows = (response) => {
    let skippedBarDataTempArr = [];
    response?.data?.result?.map((item) => {
      skippedBarDataTempArr.push(item.total_count);
    })
    setSkippedBarDataArr(skippedBarDataTempArr)
    console.log("SKIPPED", skippedBarDataTempArr)
  }
  const makeDisDataForSkippedRows = (response) => {
    let skippedDisDataTempArr = [];
    response?.data?.result?.map((item) => {
      skippedDisDataTempArr.push(item.description);
    })
    setSkippedDisDataArr(skippedDisDataTempArr)
    console.log("DIS", skippedDisDataTempArr)
  }

  const dateFinder = (timeStamp) => {
    const date = new Date(timeStamp * 1000);

    if (!date || isNaN(date.getTime())) {
      return " ";
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  const handleUploadClick = (e, selectedFiles) => {
    dispatch(setDmlSelectedFiles(selectedFiles));
    dispatch(setDmlSelectedEntity(''));
    dispatch(setDmlSelectedMode(''));
    dispatch(setSelectedRule([]));
    navigate(constants.routeNames.rawData);
  }

  return (
    <div className="data-mapping-container" style={{ height: "90vh", overflowY: "scroll" }}>
      <DataMappingLayerHead handleUploadClick={handleUploadClick} />
      <DataMappingLayerCard listData={structuredSheetStatusData} isLoading={sssLoading} dataInSss={dataInSss} />
      <DataMappingSkip historyData={structuredSheetRecordData} skippedLabels={skippedLabelArr} skippedBarArr={skippedBarDataArr} skippedDisArr={skippedDisDataArr} skippedRowLoading={skippedRowLoading} />
    </div>
  );
}
