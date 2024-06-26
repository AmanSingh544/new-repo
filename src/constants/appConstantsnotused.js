import FileIconDownloadDark from "src/assets/images/FileIconDownloadDark.svg";
export const dummyOptions = [
  { id: 1, label: '001	Standard Order', value: '001' },
  { id: 2, label: '002	Project -Local Hotel', value: '002' },
]

export const matrixList = {
  EMISSION_TIMELINE: "Emission Timeline",
  EMISSION_SCOPES: "Emission Scopes",
  EMISSION_BY_REGION: "Emission by Region",
  EMISSION_BY_COUNTRY: "Emission by Country",
  EMISSION_ACROSS_ACTIVITY: "Emission Across Activity",
  EMISSION_ACROSS_TRANSPORTATION: "Emission Across Transportation",
  SALES_BY_EMISSION: "Sales Vs Emission",
  GHG_WISE_EMISSION: "GHG Wise Emission",
  EMISSION_BY_SUPPLIER: "Emission By Supplier",

}

export const matrixListDetailed = {
  COST_FUEL: "Cost-Fuel-Item Shipped-Emission",
  LANES_EMISSIONS: "Lanes Vs Emission",
  CONTINENT_EMISSIONS: "Continent Vs Emission",
  PROCESS_EMISSIONS: "Process Vs Emissions",
  SUPPLIER_EMISSIONS: "Supplier Vs Emissions",
  EMISSION_PERFORMANCE: "Emission Performance",
  MODES_EMISSIONS: "Modes Vs Emission",
  TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES: "Total Scope-1 Emission vs Categories",
  TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES: "Total Scope-2 Emission vs Categories",
  TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES: "Total Scope-3 Emission vs Categories",
  EMISSION_BY_REGION: "Emission By Region Detailed",
  EMISSION_BY_COUNTRY: "Emission By Country Detailed",
  UPSTREAM_NETWORKS_VS_EMISSION: "Upstream Networks Vs Emission",
  DOWNSTREAM_ASSET_TYPE_VS_EMISSION: "Downstream Asset Type Vs Emission",
  DOWNSTREAM_LESSEE_VS_EMISSION: "Downstream Lessee VS Emission",
  UPSTREAM_ASSET_TYPE_VS_EMISSION: "Upstream Asset Type Vs Emission",
  UPSTREAM_LESSOR_VS_EMISSION: "Upstream Lessor Vs Emission",
  RMPO_WISE_EMISSIONS: "RMPO wise Emissions",
  BU_PERFORMANCE:"BU Performance",
  NON_SCM_SOURCING_VS_EMISSION: "Non SCM Sourcing Vs Emissions",
  FRANCHISE_WISE_EMISSION: "Franchise wise Emission",
  DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION: "Downstream Waste Management Vs Emission",
  UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION: "Upstream Waste Management Vs Emission",
  DEDICATED_VEHICLE_TYPE_VS_EMISSION: "Dedicated Vehicle Type Vs Emissions",
  OUTSOURCED_VEHICLE_TYPE_VS_EMISSION: "Outsourced Vehicle Type Vs Emissions",
  WASTE_PROCESSING_COMPANIES_VS_EMISSION: "Waste Processing Companies Vs Emissions",
  SOLD_PRODUCTS_VS_EMISSION: "Sold Products Vs Emissions",
  REFRIGERATION_PROCESS_VS_EMISSIONS: "Refrigeration Process Vs Emission",
  REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS: "Refrigerant Type, Consumptions Vs Emissions",
  FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS: "Fuel Type, Consumptions Vs Emissions",
  SPEND_VS_EMISSIONS: "Spend Vs Emission",
  PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS: "Purchased Electricity Consumption Vs Emission",
  // BUSINESS_TRAVEL_VS_EMISSION: "Business Travel Vs Emission",
  INVESTMENT_COMPANY_BASED_EMISSIONS: "Investment Company based Emission",
  EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS: "Extraction,Production,Transmission Vs Emission",
  PRODUCT_TYPE_VS_EMISSION: "Product Type Vs Emissions",
  BUSINESS_TRAVEL_VS_EMISSION: "Business Travel Vs Emmission"
}

export const matrixListAccToBE = {
  EMISSION_TIMELINE: "1",
  EMISSION_SCOPES: "2",
  EMISSION_BY_REGION: "3",
  EMISSION_ACROSS_ACTIVITY: "4",
  EMISSION_ACROSS_TRANSPORTATION: "5",
  SALES_BY_EMISSION: "6",
  GHG_WISE_EMISSION: "7",
  EMISSION_BY_SUPPLIER: "8",
  EMISSION_BY_COUNTRY: "9"
}

export const matrixListDetailedAccToBE = {
  EMISSION_BY_REGION: "1",
  EMISSION_PERFORMANCE: "2",
  LANES_EMISSIONS: "3",
  COST_FUEL: "4",
  MODES_EMISSIONS: "5",
  TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES: "6",
  TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES: "7",
  TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES: "8",
  PROCESS_EMISSIONS: "9",
  SUPPLIER_EMISSIONS: "10",
  UPSTREAM_NETWORKS_VS_EMISSION: "11",
  DOWNSTREAM_ASSET_TYPE_VS_EMISSION: "12",
  DOWNSTREAM_LESSEE_VS_EMISSION: "13",
  UPSTREAM_ASSET_TYPE_VS_EMISSION: "14",
  UPSTREAM_LESSOR_VS_EMISSION: "15",
  RMPO_WISE_EMISSIONS: "16",
  NON_SCM_SOURCING_VS_EMISSION: "17",
  FRANCHISE_WISE_EMISSION: "18",
  DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION: "19",
  UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION: "20",
  DEDICATED_VEHICLE_TYPE_VS_EMISSION: "21",
  OUTSOURCED_VEHICLE_TYPE_VS_EMISSION: "22",
  WASTE_PROCESSING_COMPANIES_VS_EMISSION: "23",
  SOLD_PRODUCTS_VS_EMISSION: "24",
  REFRIGERATION_PROCESS_VS_EMISSIONS: "25",
  REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS: "26",
  FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS: "27",
  SPEND_VS_EMISSIONS: "28",
  PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS: "29",
  INVESTMENT_COMPANY_BASED_EMISSIONS: "30",
  EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS: "31",
  PRODUCT_TYPE_VS_EMISSION: "32",
  BU_PERFORMANCE:"36",

  BUSINESS_TRAVEL_VS_EMISSION: "33",
  EMISSION_BY_COUNTRY: "34",
  CONTINENT_EMISSIONS:"35",
}

export const allMatrixArr = [
  {
    graph_id: "1", name: "Emission Timeline",
    show: false
  },
  {
    graph_id: "2", name: "Emission Scopes", show: false
  },
  {
    graph_id: "3", show: false,
    name: "Emission by Region",

  },
  {
    graph_id: "4",
    show: false, name: "Emission Across Activity",
  },
  {
    graph_id: "5", name: "Emission Across Transportation",
    show: false
  },
  {
    graph_id: "6",
    name: "Sales Vs Emission", show: false
  },
  {
    graph_id: "7", name: "GHG Wise Emission", show: false
  },
  {
    graph_id: "8", name: "Emission By Supplier",
    show: false
  },
  {
    graph_id: "9", show: false,
    name: "Country Vs Emission",

  },
  
]

export const allGraphDetailedSummary = [
  {
    graph_id: "1",
    name: "Emission By Region Detailed",
    show: false
  },
  {
    graph_id: "2",
    name: "Emission Performance",
    show: false
  },
  {
    graph_id: "3",
    name: "Lanes Vs Emission",
    show: false
  },
  {
    graph_id: "4",
    name: "Cost-Fuel-Item Shipped-Emission",
    show: false,
    type: "detailed"
  },
  {
    graph_id: "5",
    name: "Modes Vs Emission",
    show: false
  },
  {
    graph_id: "6",
    name: "Total Scope-1 Emission vs Categories",
    show: false
  },
  {
    graph_id: "7",
    name: "Total Scope-2 Emission vs Categories",
    show: false
  },
  {
    graph_id: "8",
    name: "Total Scope-3 Emission vs Categories",
    show: false
  },
  {
    graph_id: "9",
    name: "Process Vs Emissions",
    show: false
  },
  {
    graph_id: "10",
    name: "Supplier Vs Emissions",
    show: false
  },
  {
    graph_id: "11", name: "Upstream Networks Vs Emission", show: false
  },
  {
    graph_id: "12", show: false,
    name: "Downstream Asset Type Vs Emission"
  },
  {
    graph_id: "13",
    show: false, name: "Downstream Lessee VS Emission"
  },
  {
    show: false, graph_id: "14",
    name: "Upstream Asset Type Vs Emission"
  },
  {
    graph_id: "15", show: false, name: "Upstream Lessor Vs Emission"
  },
  {
    graph_id: "16", show: false,
    name: "RMPO wise Emissions"
  },
  {
    graph_id: "17",
    name: "Non SCM Sourcing Vs Emissions",
    show: false,
  },
  {

    name: "Franchise wise Emission",
    graph_id: "18",
    show: false
  },

  {
    graph_id: "19",
    name: "Downstream Waste Management Vs Emission",
    show: false,
  },
  {

    show: false,
    name: "Upstream Waste Management Vs Emission", graph_id: "20"
  },
  {

    show: false,
    graph_id: "21",
    name: "Dedicated Vehicle Type Vs Emissions"
  },
  {
    graph_id: "22",

    name: "Outsourced Vehicle Type Vs Emissions",
    show: false
  },
  {

    name: "Waste Processing Companies Vs Emissions",
    graph_id: "23",
    show: false
  },
  {
    graph_id: "24",
    name: "Sold Products Vs Emissions", show: false,
  },
  {
    graph_id: "25",
    show: false,
    name: "Refrigeration Process Vs Emission"
  },
  {
    graph_id: "26", show: false,
    name: "Refrigerant Type, Consumptions Vs Emissions"
  },
  {
    graph_id: "27",
    show: false,
    name: "Fuel Type, Consumptions Vs Emissions"
  },
  {
    graph_id: "28",
    show: false,
    name: "Spend Vs Emission"
  },
  {
    graph_id: "29",
    show: false,
    name: "Purchased Electricity Consumption Vs Emission"
  },
  {
    graph_id: "30",
    show: false,
    name: "Investment Company based Emission"
  },
  {
    graph_id: "31",
    show: false,
    name: "Extraction,Production,Transmission Vs Emission"
  },
  {
    graph_id: "32",
    show: false,
    name: "Product Type Vs Emissions"
  },
  {
    graph_id: "33",
    show: false,
    name: "Business Travel Vs Emmission"
  },
  {
    graph_id: "34",
    name: "Emission By Country Detailed",
    show: false
  },
  {
    graph_id: "36",
    name: "BU Performance",
    show: false
  },
  {
    graph_id: "35",
    name: "Continent Vs Emission",
    show: false
  },
  
]

export const projLanguages = {
  ENGLISH: "en",
  FRENCH: "fr"
}


export const placeHolderImage = "https://carbnonx.blob.core.windows.net/carbnonx/media/equivalence/saved/Logo.svg"
export const C02Img = "https://carbnonx.blob.core.windows.net/carbnonx/media/dashboard_metrics/Group_338.svg"
export const failedImageMessage = "Failed to load image.";

export const clientId = "Hitachi";


export const scopeEntityData = [
  {
    name: "Scope 1.1", value: "Scope 1.1"
  },
  {
    name: "Scope 1.2",
    value: "Scope 1.2"
  },
  {
    value: "Scope 1.3", name: "Scope 1.3",
  },
  {
    name: "Scope 2", value: "Scope 2"
  },
  {
    name: "Scope 3.1",
    value: "Scope 3.1"
  },
  {
    value: "Scope 3.2",
    name: "Scope 3.2",
  },
  {
    value: "Scope 3.3", name: "Scope 3.3",

  },
  {
    value: "Scope 3.4", name: "Scope 3.4"
  },
  {
    name: "Scope 3.5", value: "Scope 3.5"
  },
  {
    value: "Scope 3.6", name: "Scope 3.6"
  },
  {
    name: "Scope 3.7",
    value: "Scope 3.7"
  },
  {
    value: "Scope 3.8",
    name: "Scope 3.8"
  },
  {
    name: "Scope 3.9(Downstream Transportation)",
    value: "Scope 3.9"
  },
  {
    value: "Scope 3.10", name: "Scope 3.10"
  },
  {
    name: "Scope 3.11",
    value: "Scope 3.11"
  },
  {
    value: "Scope 3.12", name: "Scope 3.12",
  },
  {
    value: "Scope 3.13",
    name: "Scope 3.13",
  },
  {
    name: "Scope 3.13", value: "Scope 3.13"
  },
  {
    value: "Scope 3.14", name: "Scope 3.14",
  },
  {
    name: "Scope 3.15", value: "Scope 3.15"
  }
]

export const modes = [
  {
    name: "Air",
    value: "Air",
  },
  {
    name: "Ocean",
    value: "Ocean",
  },
  {
    name: "Road",
    value: "Road",
  }
]

export const monthsName = [
  {
    name: 'Jan',
    value: 'Jan',
  },
  {
    name: 'Feb',
    value: 'Feb'
  },
  {
    name: 'Mar',
    value: 'Mar',
  },
  {
    name: 'Apr',
    value: 'Apr',
  },
  {
    name: 'May',
    value: 'May',
  },
  {
    name: 'Jun',
    value: 'Jun',
  },
  {
    name: 'Jul',
    value: 'Jul'
  },
  {
    name: 'Aug',
    value: 'Aug',
  },
  {
    name: 'Sep',
    value: 'Sep',
  },
  {
    name: 'Oct',
    value: 'Oct',
  },
  {
    name: 'Nov',
    value: 'Nov',
  },
  {
    name: 'Dec',
    value: 'Dec',
  }
]

export const fiveWeekArr = [
  "W1",
  "W2",
  "W3",
  "W4",
  "W5"
]

export const fourWeekArr = [
  "W1",
  "W2",
  "W3",
  "W4"
]


export const quarter1Arr = [
  'Jan',
  'Feb',
  'Mar'
]

export const quarter2Arr = [
  'Apr',
  'May',
  'Jun'
]

export const quarter3Arr = [
  'Jul',
  'Aug',
  'Sep'
]


export const quarter4Arr = [
  'Oct',
  'Nov',
  'Dec'
]

export const arraysQtrs = {
  quarter1Arr: quarter1Arr,
  quarter2Arr: quarter2Arr,
  quarter3Arr: quarter3Arr,
  quarter4Arr: quarter4Arr
};

export const downloadTypes = [
  {
    name: "Download: All The Entries",
    icon: FileIconDownloadDark,
    selected: false,
    index: 1
  },
  {
    name: "Download: Page Entries",
    icon: FileIconDownloadDark,
    selected: false,
    index: 2
  },
  // {
  //   name : "Download Page ________ Entries - Filtered",
  //   icon : exelIcon,
  //   selected : false,
  //   index : 3
  // },
  // {
  //   name : "Download All _________ Entries - Filtered",
  //   icon : exelIcon,
  //   selected : false,
  //   index : 4
  // }
]

export const rawCostFuelData = [
  
  // commented b/c no longer needed.
 /* {
    borderWidth: 0,
    data: ["NA"],
    label: "Fuel",
    name: "Fuel",
    unit: "",
    value: 0,
    backgroundColor: ["#555f63"]
  },
  {
    backgroundColor: ["#19A6DE"],
    borderWidth: 0,
    data: ["NA"],
    label: "Cost",
    value: 0,
    name: "Cost",
    unit: ""
  },
  */
  {
    backgroundColor: ['#00183F'],
    borderWidth: 0,
    name: "Distance",
    unit: "",
    value: 0,
    data: ["NA"],
    label: "Distance"
  },
  {
    backgroundColor: ["#A9E8FF"],
    borderWidth: 0,
    data: ["NA"],
    unit: "",
    value: 0,
    label: "Item Shipped",
    name: "Item Shipped"
  }
]

export const colorArrayGraphs = ["#555f63", "#1078A8", "#b1000e", "#00183F", "#00A0CA"];

export const templateScopeEntity = {
  scope1Entity1: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope1_sample.xlsx",
  scope1Entity2: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope1_sample.xlsx",
  scope1Entity3: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope1_sample.xlsx",
  scope2Entitiy0: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope2_sample.xlsx",
  scope3Entity1: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-1_sample.xlsx",
  scope3Entity2: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Two.xlsx",
  scope3Entity3: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-3_sample.xlsx",
  scope3Entity4: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-4_sample.xlsx",
  scope3Entity5: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-5_sample.xlsx",
  scope3Entity6: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-6_sample.xlsx",
  scope3Entity7: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3Seven.xlsx",
  scope3Entity8: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Eight.xlsx",
  scope3Entity9: "https://carbnonx.blob.core.windows.net/carbnonx/media/scope3-9.xlsx",
  scope3Entity10: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Ten.xlsx",
  scope3Entity11: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Eleven.xlsx",
  scope3Entity12: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/scope3-12_sample.xlsx",
  scope3Entity13: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Thirteen.xlsx",
  scope3Entity14: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Fourteen.xlsx",
  scope3Entity15: "https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Scope3Fifteen.xlsx",

}


export const graphNames = {
  //Detailed summary charts. 
  emissionByRegionDetailed: "Emission By Region Detailed",
  emissionByCountryDetailed: "Emission By Country Detailed",
  buPerformance: "Emission Performance",
  businessUnitPerformance:"BU Performance",
  lanesVsEmission: "Lanes Vs Emission",
  continentVsEmission: "Continent Vs Emission",
  costFuel: "Cost-Fuel-Item Shipped-Emission",
  modesVsEmission: "Modes Vs Emission",
  totalScope1EmissionVsCategories: "Total Scope-1 Emission vs Categories",
  totalScope2EmissionVsCategories: "Total Scope-2 Emission vs Categories",
  totalScope3EmissionVsCategories: "Total Scope-3 Emission vs Categories",
  processVsEmission: "Process Vs Emissions",
  supplierVsEmission: "Supplier Vs Emissions",
  upstreamNetworksVsEmission: "Upstream Networks Vs Emission",
  downstreamAssetTypeVsEmission: "Downstream Asset Type Vs Emission",
  downstreamLesseeVSEmission: "Downstream Lessee VS Emission",
  upstreamAssetTypeVsEmission: "Upstream Asset Type Vs Emission",
  upstreamLessorVsEmission: "Upstream Lessor Vs Emission",
  RMPOwiseEmissions: "RMPO wise Emissions",
  NonSCMSourcingVsEmissions: "Non SCM Sourcing Vs Emissions",
  franchisewiseEmission: "Franchise wise Emission",
  downstreamWasteManagementVsEmission: "Downstream Waste Management Vs Emission",
  upstreamWasteManagementVsEmission: "Upstream Waste Management Vs Emission",
  dedicatedVehicleTypeVsEmissions: "Dedicated Vehicle Type Vs Emissions",
  outsourcedVehicleTypeVsEmissions: "Outsourced Vehicle Type Vs Emissions",
  wasteProcessingCompaniesVsEmissions: "Waste Processing Companies Vs Emissions",
  soldProductsVsEmissions: "Sold Products Vs Emissions",
  refrigerationProcessVsEmission: "Refrigeration Process Vs Emission",
  refrigerantTypeConsumptionsVsEmissions: "Refrigerant Type, Consumptions Vs Emissions",
  fuelTypeConsumptionsVsEmissions: "Fuel Type, Consumptions Vs Emissions",
  spendVsEmission: "Spend Vs Emission",
  purchasedElectricityConsumptionVsEmission: "Purchased Electricity Consumption Vs Emission",
  // businessTravelVsEmission: "Business Travel Vs Emission",
  investmentCompanyBasedEmission: "Investment Company based Emission",
  ExtractionProductionTransmissionVsEmission: "Extraction,Production,Transmission Vs Emission",
  productTypeVsEmissions: "Product Type Vs Emissions",
  businessTravelVsEmission: "Business Travel Vs Emission",
  //Executive summary charts.
  emissionByTimeline: "Emission By Timeline",
  emissionByScopes: "Emission By Scopes",
  emissionByRegion: "Emission By Region",
  emissionByCountry: "Emission By Country",
  emissionAcrossActivity: "Emission Across Activity",
  emissionAcrossTransporatation: "Emission Across Transportation",
  salesVsEmisssion: "Sales Vs Emission",
  ghgWiseEmission: "GHG Wise Emission",
  emissionBySupplier: "Emissions By Supplier",
  // buPerformance:"BU Performance"
}

export const simulatorMatrixName = {
  actualEmission: "Actual Emission",
  distanceTravelled: "Distance Travelled",
  totalShipmentCount: "Total Shipment Count",
  totalTonnageOfGoodShipped: "Total tonnage of good shipped",
  countriesInvolved: "Countries Involved",
  emissionUnitDistance: "Emissions/Unit Distance",
  emissionUnitShipment: "Emissions/Unit Shipment",
  emissionUnitWeight: "Emissions/Unit Weight",
  socialCostOfCarbon: "Social Cost of Carbon",
  internalCarbonPricing: "Internal Carbon Pricing(ICP)",
  emissionTradingScheme: "Emission Trading Scheme"
}

export const simulatorActualMatrixName = {
  actualEmission: "Actual Emissions",//done
  distanceTravelled: "Total Distance Covered",//done
  totalShipmentCount: "Total Shipment Count",//done
  totalTonnageOfGoodShipped: "Total Tonnage of Goods",//done
  countriesInvolved: "Country Involved",//done
  emissionUnitDistance: "Emission/Unit Distance",//done
  emissionUnitShipment: "Emission/Unit Transaction",//done
  emissionUnitWeight: "Emission Tonnage or Weight",//done
  socialCostOfCarbon: "Social Cost of Carbon",//done
  internalCarbonPricing: "HE ICP",//done
  emissionTradingScheme: "Emission Trading Scheme"//done
}