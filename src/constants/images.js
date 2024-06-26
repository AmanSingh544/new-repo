import croosIconFilterSVG from "../assets/images/crossIconFilters.svg"
const urlConst = "https://carbnonx.blob.core.windows.net/carbnonx/";

export const IMAGES = {
  ARROWDIRECTION: `${urlConst}ArrowDirection.svg`,
  SELECTICONCALENDAR: `${urlConst}selectIconCalendar.svg`,
  SEARCHICONEQUI: `${urlConst}searchIconEqui.svg`,
  NOTFOUNDIMAGE: `${urlConst}404.svg`,
  EYESLASHFILL: `${urlConst}EyeSlashFill.svg`,
  EDITGRAPH: `${urlConst}EditGraph.svg`,
  LOGO: `${urlConst}blur_on.svg`,
  BYAIR: `${urlConst}byAir.svg`,
  BYBARGE: `${urlConst}byBarge.svg`,
  // CROSSFILTERS: `${urlConst}crossIconFilters.svg`,
  CROSSFILTERS:croosIconFilterSVG,
  BYRAIL: `${urlConst}byRailways.svg`,
  BYROAD: `${urlConst}byRoad.svg`,
  EYEFILL: `${urlConst}EyeFill.svg`,
  EYEFILLNewWhite: `${urlConst}EyeNewWhite.svg`,
  UnHide: `${urlConst}UnhideWhite.svg`,
  Grid: `${urlConst}GridFill.svg`,
  List: `${urlConst}ListCheck.svg`,
  EYENEW: `${urlConst}eyeNew.svg`,
  CO2: `${urlConst}Carbon.svg`,
  ENERGY: `${urlConst}Energy.svg`,
  ELECTRICITY: `${urlConst}Electricity.svg`,
  WIND: `${urlConst}Wind.svg`,
  SMARTPHONE: `${urlConst}SmartPhone.svg`,
  TONE: `${urlConst}Tone.svg`,
  TREE: `${urlConst}Tree-grey.svg`,
  GridWhite: `${urlConst}GridFillWhite.svg`,
  ListWhite: `${urlConst}ListCheckWhite.svg`,
  BYSHIP: `${urlConst}byShip.svg`,
  CHECKEDBOX: `${urlConst}CheckedBox.svg`,
  NOTEPAD: `${urlConst}notepad.svg`,
  UNCHECKEDBOX: `${urlConst}UncheckedBox.svg`,
  EXPANDGRAPH: `${urlConst}expandGraph.svg`,
  LINEGRAPHICON: `${urlConst}lineGraph.svg`,
  COLUMNCHARTICON: `${urlConst}columnChartIcon.svg`,
  BARICON: `${urlConst}barChartIcon.svg`,
  PIEICON: `${urlConst}pieChartIcon.svg`,
  SCATTERICON: `${urlConst}scatterChartIcon.svg`,
  CHARTSICON: `${urlConst}otherChartsIcon.svg`,
  AREAICON: `${urlConst}areaIcon.svg`,
  MAPICON: `${urlConst}mapIcon.svg`,
  ADDGRAPH: `${urlConst}addGraph.svg`,
  DROPDOWNICON: `${urlConst}dropdownIcon.svg`,
  EXPANDICON: `${urlConst}expand.svg`,
  DUMMYUSER: `${urlConst}dummyUser.png`,
  HAMBURGERICON: `${urlConst}hamburgerIcon.svg`,
  SELECTICON: `${urlConst}selectIcon.svg`,
  CROSSICON: `${urlConst}crossIcon.svg`,
  LOGINBACKGROUND: `${urlConst}signin-bg.jpg`,
  NOTIFICATIONS: `${urlConst}notifications.svg`,
  MONEYICON: `${urlConst}moneyIcon.svg`,
  EYEICON: `${urlConst}eyeIcon.svg`,
  CLOUDICON: `${urlConst}cloudIcon.svg`,
  DISTANCEICON: `${urlConst}distanceIcon.svg`,
  SHIPMENTICON: `${urlConst}shipmentIcon.svg`,
  UPLOADBLACK: `${urlConst}uploadEntityIcon.svg`,
  UPLOAD: `${urlConst}uploadEntityIconWhite.svg`,
  NAV1: `${urlConst}nav1.svg`,
  NAV2: `${urlConst}nav2.svg`,
  NAV3: `${urlConst}nav3.svg`,
  NAV4: `${urlConst}nav4.svg`,
  NAV5: `${urlConst}DataMapping.svg`,
  INFO_ICON: `${urlConst}blue_info.png`,
};

function getImage(name) {
  let imageName;
  switch (name) {
    case IMAGES.NOTFOUNDIMAGE:
      imageName = IMAGES.NOTFOUNDIMAGE;
      break;
    case IMAGES.LOGO:
      imageName = IMAGES.LOGO;
      break;
    case IMAGES.NOTIFICATIONS:
      imageName = IMAGES.NOTIFICATIONS;
      break;
    case IMAGES.SEARCHICONEQUI:
      imageName = IMAGES.SEARCHICONEQUI;
      break;
    case IMAGES.EYEICON:
      imageName = IMAGES.EYEICON;
      break;
    case IMAGES.CROSSFILTERS:
      imageName = IMAGES.CROSSFILTERS;
      break;
    case IMAGES.SELECTICONCALENDAR:
      imageName = IMAGES.SELECTICONCALENDAR;
      break;
    case IMAGES.ARROWDIRECTION:
      imageName = IMAGES.ARROWDIRECTION;
      break;
    case IMAGES.BYAIR:
      imageName = IMAGES.BYAIR;
      break;
    case IMAGES.BYBARGE:
      imageName = IMAGES.BYBARGE;
      break;
    case IMAGES.BYRAIL:
      imageName = IMAGES.BYRAIL;
      break;
    case IMAGES.BYROAD:
      imageName = IMAGES.BYROAD;
      break;
    case IMAGES.BYSHIP:
      imageName = IMAGES.BYSHIP;
      break;
    case IMAGES.ADDGRAPH:
      imageName = IMAGES.ADDGRAPH;
      break;
    case IMAGES.EYEFILL:
      imageName = IMAGES.EYEFILL;
      break;
    case IMAGES.EYEFILLNewWhite:
      imageName = IMAGES.EYEFILLNewWhite;
      break;
    case IMAGES.UnHide:
      imageName = IMAGES.UnHide;
      break;
    case IMAGES.EYENEW:
      imageName = IMAGES.EYENEW;
      break;
    case IMAGES.CO2:
      imageName = IMAGES.CO2;
      break;
    case IMAGES.List:
      imageName = IMAGES.List;
      break;
    case IMAGES.Grid:
      imageName = IMAGES.Grid;
      break;
    case IMAGES.UPLOAD:
      imageName = IMAGES.UPLOAD;
      break;
    case IMAGES.UPLOADBLACK:
      imageName = IMAGES.UPLOADBLACK;
      break;
    case IMAGES.NOTEPAD:
      imageName = IMAGES.NOTEPAD;
      break;
    case IMAGES.ListWhite:
      imageName = IMAGES.ListWhite;
      break;
    case IMAGES.GridWhite:
      imageName = IMAGES.GridWhite;
      break;
    case IMAGES.ENERGY:
      imageName = IMAGES.ENERGY;
      break;
    case IMAGES.ELECTRICITY:
      imageName = IMAGES.ELECTRICITY;
      break;
    case IMAGES.SMARTPHONE:
      imageName = IMAGES.SMARTPHONE;
      break;
    case IMAGES.WIND:
      imageName = IMAGES.WIND;
      break;
    case IMAGES.TONE:
      imageName = IMAGES.TONE;
      break;
    case IMAGES.TREE:
      imageName = IMAGES.TREE;
      break;
    case IMAGES.EDITGRAPH:
      imageName = IMAGES.EDITGRAPH;
      break;
    case IMAGES.DROPDOWNICON:
      imageName = IMAGES.DROPDOWNICON;
      break;
    case IMAGES.EXPANDICON:
      imageName = IMAGES.EXPANDICON;
      break;
    case IMAGES.CHECKEDBOX:
      imageName = IMAGES.CHECKEDBOX;
      break;
    case IMAGES.UNCHECKEDBOX:
      imageName = IMAGES.UNCHECKEDBOX;
      break;
    case IMAGES.EXPANDGRAPH:
      imageName = IMAGES.EXPANDGRAPH;
      break;
    case IMAGES.EYESLASHFILL:
      imageName = IMAGES.EYESLASHFILL;
      break;
    case IMAGES.HAMBURGERICON:
      imageName = IMAGES.HAMBURGERICON;
      break;
    case IMAGES.DUMMYUSER:
      imageName = IMAGES.DUMMYUSER;
      break;
    case IMAGES.LOGINBACKGROUND:
      imageName = IMAGES.LOGINBACKGROUND;
      break;
    case IMAGES.LINEGRAPHICON:
      imageName = IMAGES.LINEGRAPHICON;
      break;
    case IMAGES.MAPICON:
      imageName = IMAGES.MAPICON;
      break;
    case IMAGES.AREAICON:
      imageName = IMAGES.AREAICON;
      break;
    case IMAGES.COLUMNCHARTICON:
      imageName = IMAGES.COLUMNCHARTICON;
      break;
    case IMAGES.BARICON:
      imageName = IMAGES.BARICON;
      break;
    case IMAGES.PIEICON:
      imageName = IMAGES.PIEICON;
      break;
    case IMAGES.SCATTERICON:
      imageName = IMAGES.SCATTERICON;
      break;
    case IMAGES.CHARTSICON:
      imageName = IMAGES.CHARTSICON;
      break;
    case IMAGES.NAV1:
      imageName = IMAGES.NAV1;
      break;
    case IMAGES.NAV2:
      imageName = IMAGES.NAV2;
      break;
    case IMAGES.NAV3:
      imageName = IMAGES.NAV3;
      break;
    case IMAGES.NAV4:
      imageName = IMAGES.NAV4;
      break;
    case IMAGES.NAV5:
      imageName = IMAGES.NAV5;
      break;
    case IMAGES.CLOUDICON:
      imageName = IMAGES.CLOUDICON;
      break;
    case IMAGES.MONEYICON:
      imageName = IMAGES.MONEYICON;
      break;
    case IMAGES.SHIPMENTICON:
      imageName = IMAGES.SHIPMENTICON;
      break;
    case IMAGES.DISTANCEICON:
      imageName = IMAGES.DISTANCEICON;
      break;
    case IMAGES.SELECTICON:
      imageName = IMAGES.SELECTICON;
      break;
    case IMAGES.CROSSICON:
      imageName = IMAGES.CROSSICON;
      break;
    case IMAGES.INFO_ICON:
      imageName = IMAGES.INFO_ICON;
      break;
    default:
      imageName = null;
      break;
  }
  return imageName;
}

export function getImageFromURL(name) {

  return getImage(name);


}

