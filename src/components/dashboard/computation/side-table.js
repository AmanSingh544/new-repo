import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./side-table.scss";
// import tableHistSide from "../../../assets/images/tableHistSide.svg";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import { useTranslation } from 'react-i18next';
import alertSideRedLogo from "src/assets/images/alertSideRedLogo.svg"
import alertYellowD from "src/assets/images/alertYellowD.svg"
import sideDownload from "src/assets/images/sideDownload.svg"


import utils from "src/utils";

export const Sidetable = ({
  onAlertClick,
  activeAlert,
  moveToScopeDetails,
}) => {
  const historyTable = ["https://carbnonx.blob.core.windows.net/carbnonx/redHist.svg", "https://carbnonx.blob.core.windows.net/carbnonx/greenHist.svg", "https://carbnonx.blob.core.windows.net/carbnonx/blusHist.svg"];
  const [alertlist, setAlertList] = useState([]);
  const [alertTime, setAlertTime] = useState([])
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    getalertList();
  }, []);
  const getalertList = () => {
    Apicalls.getApiCall(
      constants.endPoints.computationAlert,
      "",
      "",
      handleGetAlertListSuccess,
      handleGetAlertListError
    );
  };


  const handleGetAlertListSuccess = (response) => {
    setAlertList(response?.data?.result?.data);
  };
  const handleGetAlertListError = (error) => {
    //This is intentional for error logging.
    console.log("handleGetAlertListError error", error);
  };
  React.useEffect(() => {
    if (alertlist?.length > 0) {
      let timeList = alertlist.map((list) => {
        let date = new Date(list.log_generated_at)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          // second: 'numeric',
          hour12: true
        });

        const formattedTime = timeFormatter.format(date);
        return {
          formattedDate, formattedTime
        }
      })
      getalertTime(timeList)
    }

  }, [alertlist])

  const getalertTime = (arr) => {
    setAlertTime(arr)
  }

  const onComputationPageClick = (data) => {
    moveToScopeDetails(data)
  }

  return (
    <div className="alertMainDiv">
    <div className="alert-table-div" style={{ height: "283px" }}>
      <div className="alert-table">
        <div className="heading">
          <img src={"https://carbnonx.blob.core.windows.net/carbnonx/RedAlertComp.svg"} alt="Your SVG" /> {t("alert")}
        </div>
        <Divider variant="middle" style={{ background: "#8D8D8D" }} />
          
       
        <div className="table-alert-list">
          {alertlist?.length ? <List style={{ height: "100%", overflowY: "scroll" }}>
            {alertlist?.map((list, key) => {
              return (
                <ListItem
                  key={utils.commonFunctions.keyFinder()}
                  className={`table-alert-listItem ${activeAlert === key ? "activeAlert" : ""} `}
                  onClick={() => {

                    { !pathname.includes("scope") && onComputationPageClick(list) }
                    { pathname.includes("scope") && onAlertClick(list, key) }
                  }}
                >
                  <div className="alertListIcon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <img src={alertSideRedLogo} alt="Your SVG" />
                  </div>
                  <ListItemText className="listItem-cotent">
                    <p className="listItem-heading">{list.message}</p>
                    <div className="listItem-subheading" style={{width:"78%"}}>
                      <p className="subheading-date">{alertTime[key]?.formattedDate}</p>
                      <p className="subheading-time">{alertTime[key]?.formattedTime}</p>
                    </div>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List> : <div className="nothingalertFound" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <NothingFoundView nothingFoundMsg="No alerts found" />
          </div>}

        </div>

      </div>
    </div>
    <div className="alert-table-div" style={{ height: "283px",margin:"20px 0px" }}>
      <div className="alert-table">
        <div className="heading">
          <img src={"https://carbnonx.blob.core.windows.net/carbnonx/RedAlertComp.svg"} alt="Your SVG" /> Downloads
        </div>
        <Divider variant="middle" style={{ background: "#8D8D8D" }} />
  
        <div className="table-alert-list">
          {alertlist?.length ? <List style={{ height: "100%", overflowY: "scroll" }}>
            {alertlist?.map((list, key) => {
              return (
                <ListItem
                  key={utils.commonFunctions.keyFinder()}
                  className={`table-alert-listItem ${activeAlert === key ? "activeAlert" : ""} `}
                  
                >
                  <div className="alertListIcon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <img src={alertYellowD} alt="Your SVG" />
                  </div>
                  <ListItemText className="listItem-cotent">
                    <p className="listItem-heading">{list.message}</p>
                    <div className="listItem-subheading" style={{width:"90%"}}>
                      <p className="subheading-date">{alertTime[key]?.formattedDate}</p>
                      <p className="subheading-time">{alertTime[key]?.formattedTime}</p>
                    </div>
                  </ListItemText>
                  <div className="alertListIcon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <img src={sideDownload} alt="Your SVG" />
                  </div>
                </ListItem>
              );
            })}
          </List> : 
          <div className="nothingalertFound" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <NothingFoundView nothingFoundMsg="No alerts found" />
          </div>}

        </div> 
        {/* </div> */}
      </div>
    </div>
    </div>
    
  );
};
