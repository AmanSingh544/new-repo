import { Icon } from "@mui/material";
import { getImageFromURL, IMAGES } from "src/constants/images";
import DmlIcon from "src/assets/images/dmlSideNav.svg"
import routeNames from "src/constants/routeNames";
import EntityManagenetNewLogo from "src/assets/images/EntityManagenetNewLogo.svg"
import CarbonAnalyticsNewLogo from "src/assets/images/CarbonAnalyticsNewLogo.svg"
import Transactionaldatadark from "src/assets/images/Transactionaldatadark.svg"
import Transactionaldatalight from "src/assets/images/Transactionaldatalight.svg"
import MasterdatadarK from "src/assets/images/Masterdatadark.svg"
import Masterdatalight from "src/assets/images/Masterdatalight.svg"
import LocationMasterdark from "src/assets/images/LocationMasterdark.svg"
import LocationMasterlight from "src/assets/images/LocationMasterlight.svg"
import Vehiclemasterdark from "src/assets/images/Vehiclemasterdark.svg"
import Vehiclemasterlight from "src/assets/images/Vehiclemasterlight.svg"
import ExecutiveSummarydark from "src/assets/images/ExecutiveSummarydark.svg"
import Equivalencedark from "src/assets/images/Equivalencedark.svg"
import DetailedSummarydark from "src/assets/images/DetailedSummarydark.svg"
import Computationsdark from "src/assets/images/Computationsdark.svg"
import ExecutiveSummarylight from "src/assets/images/ExecutiveSummarylight.svg"
import Equivalencelight from "src/assets/images/Equivalencelight.svg"
import DetailedSummarylight from "src/assets/images/DetailedSummarylight.svg"
import Computationslight from "src/assets/images/Computationslight.svg"
import Searchicondark from "src/assets/images/Searchicondark.svg"
import Searchiconlight from "src/assets/images/Searchiconlight.svg"
import simulatorLogo from "src/assets/images/simulatorLogo.svg"
import simulatorLogodark from "src/assets/images/simulatorLogodark.svg"
import "./router.scss"


const routes = [
  {
    icon: (
      <Icon className="iconStyle">
        <img width="18px" height="18px" src={CarbonAnalyticsNewLogo} />
      </Icon>
    ),
    to: "/dashboard",
    label: "Carbon Analytics",
    permission_key:"CARBON_ANALYTICS_VIEW",
    item: [
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={DetailedSummarylight} />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={DetailedSummarydark} />
          </Icon>
        ),
        label: "Detailed Summary",
        permission_key:"DETAILED_SUMMARY_VIEW",
      },
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={ExecutiveSummarylight} />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={ExecutiveSummarydark} />
          </Icon>
        ),
        label: "Executive Summary",
        permission_key:"EXECUTIVE_SUMMARY_VIEW",
      },
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Equivalencelight} />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Equivalencedark} />
          </Icon>
        ),
        label: "Equivalence",
        permission_key:"EQUIVALENCE_SUMMARY_VIEW",
      },
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Computationslight} />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Computationsdark} />
          </Icon>
        ),
        label: "Computations",
        permission_key:"EQUIVALENCE_SUMMARY_VIEW",
      },
    ],
  },

  {
    icon: (
      <Icon className="iconStyle">
        <img width="18px" height="18px" src={EntityManagenetNewLogo} />
      </Icon>
    ),
    to: "/entity-management",
    label: "Entity Management",
    permission_key:"ENTITY_MANAGEMENT_VIEW",
    item: [
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Masterdatalight} />
          </Icon>
        ),

        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={MasterdatadarK} />
          </Icon>
        ),
        label: "Master Data",
        item: [
          {
            activeIcon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={Vehiclemasterlight} />
              </Icon>
            ),
            icon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={Vehiclemasterdark} />
              </Icon>
            ),
            label: "Vehicle Master",
            permission_key:"VEHICLE_MASTER_VIEW"
          },
          {
            icon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={LocationMasterdark} />
              </Icon>
            ),
            activeIcon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={LocationMasterlight} />
              </Icon>
            ),
            label: "Location Master",
            permission_key:"LOCATION_MASTER_VIEW"
          },
        ]
      },
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Transactionaldatalight} />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px" src={Transactionaldatadark} />
          </Icon>
        ),

        label: "Transformed Data",
        permission_key: "TRANSFORMED_DATA_VIEW",
        item: [
          {
            activeIcon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={Searchiconlight} />
              </Icon>
            ),
            icon: (
              <Icon className="iconStyle">
                <img width="18px" height="18px" src={Searchicondark} />
              </Icon>
            ),
            label: "Downstream Transportation",
            permission_key:"TRANSFORMED_DATA_VIEW"
          }
        ]
      },
    ],
  },
  {
    activeIcon: (
      <Icon className="iconStyle">
        <img width="18px" height="18px" src={getImageFromURL(`${IMAGES.NAV5}`)} />

      </Icon>
    ),
    icon: (
      <Icon className="iconStyle">
        <img width="18px" height="18px" src={DmlIcon} />
      </Icon>
    ),
    to: routeNames.dataMappingLayer,
    label: "Data Mapping Layer",
    permission_key:"DATA_MAPPING_UPLOAD_VIEW",
  },
  {

    icon: (
      <Icon className="iconStyle">
        {/* <img width="18px" height="18px" src={getImageFromURL(`${IMAGES.NAV5}`)} /> */}
        <img width="18px" height="18px" src={getImageFromURL(`${IMAGES.NAV2}`)} />
      </Icon>
    ),
    to: routeNames.simulator,
    label: "Risk Recommendation",
    permission_key:"RISK_RECOMMENDATION_VIEW",
    item: [
      {
        activeIcon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px"
              src={simulatorLogo}
            />
          </Icon>
        ),
        icon: (
          <Icon className="iconStyle">
            <img width="18px" height="18px"

              src={simulatorLogodark}
            />
          </Icon>
        ),
        label: "Simulator",
        permission_key:"SIMULATOR_VIEW",
      },
    ]
  },
];
export default routes;
