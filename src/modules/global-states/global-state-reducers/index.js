// import {
//   SET_SINGLE_VIEW_DISABLE,
//   SET_SINGLE_VIEW_ENABLE,
//   SET_MASTER_ENTITIES,
//   SET_ALL_COUNTRIES,
//   SET_EMISSION_SCOPES_SINGLE,
//   SET_EMISSION_TIMELINE_SINGLE,
//   SET_EMISSION_REGION_SINGLE,
//   SET_EMISSION_REGION_DETAILED_SINGLE,
//   SET_EMISSION_COUNTRY_SINGLE,
//   SET_EMISSION_COUNTRY_DETAILED_SINGLE,
//   SET_EMISSION_ACTIVITY_SINGLE,
//   SET_EMISSION_TRANSPORTATION_SINGLE,
//   SET_EMISSION_SALES_SINGLE,
//   SET_EMISSION_GHG_SINGLE,
//   SET_EMISSION_SUPPLIER_SINGLE,
//   SET_ADD_GRAPH,
//   SET_EDIT_GRAPH,
//   SET_SINGLE_DETAILED,
//   SET_SINGLE_EXECUTIVE,
//   COST_FUEL_ITEM_SHIPPED_EMISSION,
//   REGION_DATA,
//   LANES_SINGLE,
//   CONTINENT_SINGLE,
//   PROCESS_SINGLE,
//   EMISSION_SINGLE,
//   BU_PERFORMANCE,
//   MODES_SINGLE,
//   SUPPLIER_SINGLE,
//   TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES,
//   TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES,
//   TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES,
//   TOTAL_EMISSION_COSTFUEL,
//   UPSTREAM_NETWORKS_VS_EMISSION,
//   DOWNSTREAM_ASSET_TYPE_VS_EMISSION,
//   UPSTREAM_ASSET_TYPE_VS_EMISSION,
//   UPSTREAM_LESSOR_VS_EMISSION,
//   RMPO_WISE_EMISSIONS,
//   NON_SCM_SOURCING_VS_EMISSION,
//   FRANCHISE_WISE_EMISSION,
//   DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION,
//   UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION,
//   DEDICATED_VEHICLE_TYPE_VS_EMISSION,
//   PRODUCT_TYPE_VS_EMISSION_SINGLE,
//   OUTSOURCED_VEHICLE_TYPE_VS_EMISSION,
//   WASTE_PROCESSING_COMPANIES_VS_EMISSION,
//   SOLD_PRODUCTS_VS_EMISSION,
//   REFRIGERATION_PROCESS_VS_EMISSIONS,
//   REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS,
//   FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS,
//   SPEND_VS_EMISSIONS,
//   PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS,
//   INVESTMENT_COMPANY_BASED_EMISSIONS,
//   EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS,
//   PRODUCT_TYPE_VS_EMISSION,
// } from "src/modules/global-states/global-states-action-types/index";

// const initialState = {
//   globalState: null,
//   masterEntities: [],
//   allCountries: [],
//   regionData: [],
//   addGraph: false,
//   editGraph: false,
//   singleExecutive: false,
//   singleDetailed: false,
//   costFuelSingle: false,
//   lanesSingle: false,
//   continentSingle: false,
//   processSingle: false,
//   modesSingle: false,
//   supplierSingle: false,
//   buSingle: false,
//   buPerformance:false,
//   emissionScopeSingle: false,
//   emissionTimelineSingle: false,
//   emissionRegionSingle: false,
//   emissionRegionDetailedSingle: false,
//   emissionCountrySingle: false,
//   emissionCountryDetailedSingle: false,
//   emissionActivitySingle: false,
//   emissionGhgSingle: false,
//   emissionSalesSingle: false,
//   emissionSupplierSingle: false,
//   emissionTransportationSingle: false,
//   totalScope1EmissionVsCategories: false,
//   totalScope2EmissionVsCategories: false,
//   totalScope3EmissionVsCategories: false,
//   totalEmissionCostFuelState: "",
//   upstreamNetworksVsEmission: false,
//   downstreamAssetTypeVsEmission: false,
//   upstreamAssetTypeVsEmission: false,
//   upstreamLessorVsEmission: false,
//   RMPOwiseEmissions: false,
//   NonSCMSourcingVsEmissions: false,
//   franchisewiseEmission: false,
//   downstreamWasteManagementVsEmission: false,
//   upstreamWasteManagementVsEmission: false,
//   dedicatedVehicleTypeVsEmissions: false,
//   productTypeVsEmissionSingle: false,
//   outsourcedVehicleTypeVsEmissions: false,
//   soldProductsVsEmissions: false,
//   refrigerationProcessVsEmission: false,
//   refrigerantTypeConsumptionsVsEmissions: false,
//   fuelTypeConsumptionVsEmissionSingle: false,
//   spendVsEmssionSingle: false,
//   purchasedElectricityConsumptionVsEmission: false,
//   investmentCompanyBasedEmissionSingle: false,
//   extractionProductionTransmissionVsEmission: false,
//   productTypeVsEmissions: false,
// };

// export const globalReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REGION_DATA:
//       return { ...state, regionData: action.payload };
//     case SET_SINGLE_VIEW_ENABLE:
//       return { ...state, globalState: action.payload };
//     case SET_SINGLE_VIEW_DISABLE:
//       return { ...state, globalState: action.payload };
//     case SET_MASTER_ENTITIES:
//       return { ...state, masterEntities: action.payload };
//     case SET_ALL_COUNTRIES:
//       return { ...state, allCountries: action.payload };
//     case SET_ADD_GRAPH:
//       return {
//         ...state,
//         addGraph: action.payload,
//       };
//     case SET_EDIT_GRAPH:
//       return {
//         ...state,
//         editGraph: action.payload,
//       };
//     case SET_SINGLE_EXECUTIVE:
//       return { ...state, singleExecutive: action.payload };
//     case SET_SINGLE_DETAILED:
//       return { ...state, singleDetailed: action.payload };
//     case SET_EMISSION_SCOPES_SINGLE:
//       return { ...state, emissionScopeSingle: action.payload };
//     case SET_EMISSION_TIMELINE_SINGLE:
//       return { ...state, emissionTimelineSingle: action.payload };
//     case SET_EMISSION_REGION_SINGLE:
//       return { ...state, emissionRegionSingle: action.payload };
//     case SET_EMISSION_REGION_DETAILED_SINGLE:
//       return { ...state, emissionRegionDetailedSingle: action.payload };
//     case SET_EMISSION_COUNTRY_SINGLE:
//       return { ...state, emissionCountrySingle: action.payload };
//     case SET_EMISSION_COUNTRY_DETAILED_SINGLE:
//       return { ...state, emissionCountryDetailedSingle: action.payload };
//     case SET_EMISSION_ACTIVITY_SINGLE:
//       return { ...state, emissionActivitySingle: action.payload };
//     case SET_EMISSION_TRANSPORTATION_SINGLE:
//       return { ...state, emissionTransportationSingle: action.payload };
//     case SET_EMISSION_SALES_SINGLE:
//       return { ...state, emissionSalesSingle: action.payload };
//     case SET_EMISSION_GHG_SINGLE:
//       return { ...state, emissionGhgSingle: action.payload };
//     case SET_EMISSION_SUPPLIER_SINGLE:
//       return { ...state, emissionSupplierSingle: action.payload };
//     case COST_FUEL_ITEM_SHIPPED_EMISSION:
//       return { ...state, costFuelSingle: action.payload };
//     case LANES_SINGLE:
//       return { ...state, lanesSingle: action.payload };
//     case CONTINENT_SINGLE:
//       return {...state, continentSingle: action.payload };
//     case PROCESS_SINGLE:
//       return { ...state, processSingle: action.payload };
//     case EMISSION_SINGLE:
//       return { ...state, buSingle: action.payload };
//       case "BU PERFORMANCE":
//         return { ...state, buPerformance: action.payload };

      
//     case MODES_SINGLE:
//       return { ...state, modesSingle: action.payload };
//     case SUPPLIER_SINGLE:
//       return { ...state, supplierSingle: action.payload };
//     case TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
//       return { ...state, totalScope1EmissionVsCategories: action.payload };
//     case TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
//       return { ...state, totalScope2EmissionVsCategories: action.payload };
//     case TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
//       return { ...state, totalScope3EmissionVsCategories: action.payload };
//     case TOTAL_EMISSION_COSTFUEL:
//       return { ...state, totalEmissionCostFuelState: action.payload };
//     case UPSTREAM_NETWORKS_VS_EMISSION:
//       return { ...state, upstreamNetworksVsEmission: action.payload };
//     case DOWNSTREAM_ASSET_TYPE_VS_EMISSION:
//       return { ...state, downstreamAssetTypeVsEmission: action.payload }
//     case UPSTREAM_ASSET_TYPE_VS_EMISSION:
//       return { ...state, upstreamAssetTypeVsEmission: action.payload }
//     case UPSTREAM_LESSOR_VS_EMISSION:
//       return { ...state, upstreamLessorVsEmission: action.payload }
//     case RMPO_WISE_EMISSIONS:
//       return { ...state, RMPOwiseEmissions: action.payload }
//     case NON_SCM_SOURCING_VS_EMISSION:
//       return { ...state, NonSCMSourcingVsEmissions: action.payload }
//     case FRANCHISE_WISE_EMISSION:
//       return { ...state, franchisewiseEmission: action.payload }
//     case DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
//       return { ...state, downstreamWasteManagementVsEmission: action.payload }
//     case UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
//       return { ...state, upstreamWasteManagementVsEmission: action.payload }
//     case DEDICATED_VEHICLE_TYPE_VS_EMISSION:
//       return { ...state, dedicatedVehicleTypeVsEmissions: action.payload }
//     case PRODUCT_TYPE_VS_EMISSION_SINGLE:
//       return { ...state, productTypeVsEmissionSingle: action.payload }
//     case OUTSOURCED_VEHICLE_TYPE_VS_EMISSION:
//       return { ...state, outsourcedVehicleTypeVsEmissions: action.payload }
//     case WASTE_PROCESSING_COMPANIES_VS_EMISSION:
//       return { ...state, wasteProcessingCompaniesVsEmissions: action.payload }
//     case SOLD_PRODUCTS_VS_EMISSION:
//       return { ...state, soldProductsVsEmissions: action.payload }
//     case REFRIGERATION_PROCESS_VS_EMISSIONS:
//       return { ...state, refrigerationProcessVsEmission: action.payload }
//     case REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS:
//       return { ...state, refrigerantTypeConsumptionsVsEmissions: action.payload }
//      case FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS:
//       return { ...state, fuelTypeConsumptionVsEmissionSingle: action.payload }
//     case SPEND_VS_EMISSIONS:
//       return { ...state, spendVsEmssionSingle: action.payload }
//     case PURCHASED_ELECTRICITY_CONSUMPTIONS_VS_EMISSIONS:
//       return { ...state, purchasedElectricityConsumptionVsEmission: action.payload }
//     case INVESTMENT_COMPANY_BASED_EMISSIONS:
//       return { ...state, investmentCompanyBasedEmissionSingle: action.payload }
//     case EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSIONS:
//       return { ...state, extractionProductionTransmissionVsEmission: action.payload }
//     case PRODUCT_TYPE_VS_EMISSION:
//       return { ...state, productTypeVsEmissions: action.payload }
//     default:
//       return state;
//   }
// };

import {
  SET_SINGLE_VIEW_DISABLE,
  SET_SINGLE_VIEW_ENABLE,
  SET_MASTER_ENTITIES,
  SET_ALL_COUNTRIES,
  SET_ADD_GRAPH,
  SET_EDIT_GRAPH,
  SET_SINGLE_DETAILED,
  SET_SINGLE_EXECUTIVE,
  REGION_DATA,

  EMISSION_BY_REGION,
  EMISSION_BY_REGION_DETAILED,
  EMISSION_PERFORMANCE,
  LANES_VS_EMISSION,
  COST_FUEL_ITEM_SHIPPED_EMISSION,
  MODES_VS_EMISSION,
  TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES,
  TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES,
  TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES,
  PROCESS_VS_EMISSIONS,
  SUPPLIER_VS_EMISSIONS,
  UPSTREAM_NETWORKS_VS_EMISSION,
  DOWNSTREAM_ASSET_TYPE_VS_EMISSION,
  DOWNSTREAM_LESSEE_VS_EMISSION,
  UPSTREAM_ASSET_TYPE_VS_EMISSION,
  UPSTREAM_LESSOR_VS_EMISSION,
  RMPO_WISE_EMISSIONS,
  NON_SCM_SOURCING_VS_EMISSIONS,
  FRANCHISE_WISE_EMISSION,
  DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION,
  UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION,
  DEDICATED_VEHICLE_TYPE_VS_EMISSIONS,
  OUTSOURCED_VEHICLE_TYPE_VS_EMISSIONS,
  WASTE_PROCESSING_COMPANIES_VS_EMISSIONS,
  SOLD_PRODUCTS_VS_EMISSIONS,
  REFRIGERATION_PROCESS_VS_EMISSION,
  REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS,
  FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS,
  SPEND_VS_EMISSION,
  PURCHASED_ELECTRICITY_CONSUMPTION_VS_EMISSION,
  INVESTMENT_COMPANY_BASED_EMISSION,
  EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSION,
  PRODUCT_TYPE_VS_EMISSIONS,
//  BUSINESS_TRAVEL_VS_EMMISSION,
  EMISSION_BY_COUNTRY,
  EMISSION_BY_COUNTRY_DETAILED,
  CONTINENT_VS_EMISSION,
  BU_PERFORMANCE,
  EMISSION_TIMELINE,
  EMISSION_SCOPES,
  EMISSION_ACROSS_ACTIVITY,
  EMISSION_ACROSS_TRANSPORTATION,
  SALES_BY_EMISSION,
  GHG_WISE_EMISSION,
  EMISSION_BY_SUPPLIER

} from "src/modules/global-states/global-states-action-types/index";

const initialState = {
  globalState: null,
  masterEntities: [],
  allCountries: [],
  regionData: [],
  addGraph: false,
  editGraph: false,
  singleExecutive: false,
  singleDetailed: false,

  // costFuelSingle: false,
  // lanesSingle: false,
  // continentSingle: false,
  // processSingle: false,
  // modesSingle: false,
  // supplierSingle: false,
  // buSingle: false,
  // buPerformance: false,
  // emissionScopeSingle: false,
  // emissionTimelineSingle: false,
  // emissionRegionSingle: false,
  // emissionRegionDetailedSingle: false,
  // emissionCountrySingle: false,
  // emissionCountryDetailedSingle: false,
  // emissionActivitySingle: false,
  // emissionGhgSingle: false,
  // emissionSalesSingle: false,
  // emissionSupplierSingle: false,
  // emissionTransportationSingle: false,
  // totalScope1EmissionVsCategories: false,
  // totalScope2EmissionVsCategories: false,
  // totalScope3EmissionVsCategories: false,
  // totalEmissionCostFuelState: "",
  // upstreamNetworksVsEmission: false,
  // downstreamAssetTypeVsEmission: false,
  // upstreamAssetTypeVsEmission: false,
  // upstreamLessorVsEmission: false,
  // RMPOwiseEmissions: false,
  // NonSCMSourcingVsEmissions: false,
  // franchisewiseEmission: false,
  // downstreamWasteManagementVsEmission: false,
  // upstreamWasteManagementVsEmission: false,
  // dedicatedVehicleTypeVsEmissions: false,
  // productTypeVsEmissionSingle: false,
  // outsourcedVehicleTypeVsEmissions: false,
  // soldProductsVsEmissions: false,
  // refrigerationProcessVsEmission: false,
  // refrigerantTypeConsumptionsVsEmissions: false,
  // fuelTypeConsumptionVsEmissionSingle: false,
  // spendVsEmssionSingle: false,
  // purchasedElectricityConsumptionVsEmission: false,
  // investmentCompanyBasedEmissionSingle: false,
  // extractionProductionTransmissionVsEmission: false,
  // productTypeVsEmissions: false,
  // downstreamLesseeVSEmission: false,

  //----------------------------------------------------------------------------------------------------
  emission_by_region: false,
  emission_by_region_detailed: false,
  emission_performance: false,
  lanes_vs_emission: false,
  cost_fuel_item_shipped_emission: false,
  modes_vs_emission: false,
  total_scope_1_emission_vs_categories: false,
  total_scope_2_emission_vs_categories: false,
  total_scope_3_emission_vs_categories: false,
  process_vs_emissions: false,
  supplier_vs_emissions: false,
  upstream_networks_vs_emission: false,
  downstream_asset_type_vs_emission: false,
  downstream_lessee_vs_emission: false,
  upstream_asset_type_vs_emission: false,
  upstream_lessor_vs_emission: false,
  rmpo_wise_emissions: false,
  non_scm_sourcing_vs_emissions: false,
  franchise_wise_emission: false,
  downstream_waste_management_vs_emission: false,
  upstream_waste_management_vs_emission: false,
  dedicated_vehicle_type_vs_emissions: false,
  outsourced_vehicle_type_vs_emissions: false,
  waste_processing_companies_vs_emissions: false,
  sold_products_vs_emissions: false,
  refrigeration_process_vs_emission: false,
  refrigerant_type_consumptions_vs_emissions: false,
  fuel_type_consumptions_vs_emissions: false,
  spend_vs_emission: false,
  purchased_electricity_consumption_vs_emission: false,
  investment_company_based_emission: false,
  extraction_production_transmission_vs_emission: false,
  product_type_vs_emissions: false,
  business_travel_vs_emmission: false,
  
  emission_by_country: false,
  emission_by_country_detailed: false,
  continent_vs_emission: false,
  bu_performance: false,
  emission_timeline: false,
  emission_scopes: false,
  emission_across_activity: false,
  emission_across_transportation: false,
  sales_by_emission: false,
  ghg_wise_emission: false,
  emission_by_supplier: false,

};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGION_DATA:
      return { ...state, regionData: action.payload };
    case SET_SINGLE_VIEW_ENABLE:
      return { ...state, globalState: action.payload };
    case SET_SINGLE_VIEW_DISABLE:
      return { ...state, globalState: action.payload };
    case SET_MASTER_ENTITIES:
      return { ...state, masterEntities: action.payload };
    case SET_ALL_COUNTRIES:
      return { ...state, allCountries: action.payload };
    case SET_ADD_GRAPH:
      return {
        ...state,
        addGraph: action.payload,
      };
    case SET_EDIT_GRAPH:
      return {
        ...state,
        editGraph: action.payload,
      };
    case SET_SINGLE_EXECUTIVE:
      return { ...state, singleExecutive: action.payload };
    case SET_SINGLE_DETAILED:
      return { ...state, singleDetailed: action.payload };

    case EMISSION_SCOPES:
      return { ...state, emission_scopes: action.payload };
    case EMISSION_TIMELINE:
      return { ...state, emission_timeline: action.payload };
    case EMISSION_BY_REGION:
      return { ...state, emission_by_region: action.payload };
    case EMISSION_BY_COUNTRY:
      return { ...state, emission_by_country: action.payload };
    case EMISSION_BY_REGION_DETAILED:
      return { ...state, emission_by_region_detailed: action.payload };
    case EMISSION_BY_COUNTRY_DETAILED:
      return { ...state, emission_by_country_detailed: action.payload };
    case EMISSION_ACROSS_ACTIVITY:
      return { ...state, emission_across_activity: action.payload };
    case EMISSION_ACROSS_TRANSPORTATION:
      return { ...state, emission_across_transportation: action.payload };
    case SALES_BY_EMISSION:
      return { ...state, sales_by_emission: action.payload };
    case GHG_WISE_EMISSION:
      return { ...state, ghg_wise_emission: action.payload };
    case EMISSION_BY_SUPPLIER:
      return { ...state, emission_by_supplier: action.payload };
    case COST_FUEL_ITEM_SHIPPED_EMISSION:
      return { ...state, cost_fuel_item_shipped_emission: action.payload };
    case LANES_VS_EMISSION:
      return { ...state, lanes_vs_emission: action.payload };
    case CONTINENT_VS_EMISSION:
      return { ...state, continent_vs_emission: action.payload };
    case PROCESS_VS_EMISSIONS:
      return { ...state, process_vs_emissions: action.payload };
    case EMISSION_PERFORMANCE:
      return { ...state, emission_performance: action.payload };
    case BU_PERFORMANCE:
      return { ...state, bu_performance: action.payload };
    case MODES_VS_EMISSION:
      return { ...state, modes_vs_emission: action.payload };
    case SUPPLIER_VS_EMISSIONS:
      return { ...state, supplier_vs_emissions: action.payload };
    case TOTAL_SCOPE_1_EMISSION_VS_CATEGORIES:
      return { ...state, total_scope_1_emission_vs_categories: action.payload };
    case TOTAL_SCOPE_2_EMISSION_VS_CATEGORIES:
      return { ...state, total_scope_2_emission_vs_categories: action.payload };
    case TOTAL_SCOPE_3_EMISSION_VS_CATEGORIES:
      return { ...state, total_scope_3_emission_vs_categories: action.payload };
    // case TOTAL_EMISSION_COSTFUEL:
    //   return { ...state, totalEmissionCostFuelState: action.payload };
    case UPSTREAM_NETWORKS_VS_EMISSION:
      return { ...state, upstream_networks_vs_emission: action.payload };
    case DOWNSTREAM_ASSET_TYPE_VS_EMISSION:
      return { ...state, downstream_asset_type_vs_emission: action.payload }
    case UPSTREAM_ASSET_TYPE_VS_EMISSION:
      return { ...state, upstream_asset_type_vs_emission: action.payload }
    case UPSTREAM_LESSOR_VS_EMISSION:
      return { ...state, upstream_lessor_vs_emission: action.payload }
    case RMPO_WISE_EMISSIONS:
      return { ...state, rmpo_wise_emissions: action.payload }
    case NON_SCM_SOURCING_VS_EMISSIONS:
      return { ...state, non_scm_sourcing_vs_emissions: action.payload }
    case FRANCHISE_WISE_EMISSION:
      return { ...state, franchise_wise_emission: action.payload }
    case DOWNSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
      return { ...state, downstream_waste_management_vs_emission: action.payload }
    case UPSTREAM_WASTE_MANAGEMENT_VS_EMISSION:
      return { ...state, upstream_waste_management_vs_emission: action.payload }
    case DEDICATED_VEHICLE_TYPE_VS_EMISSIONS:
      return { ...state, dedicated_vehicle_type_vs_emissions: action.payload }
    case PRODUCT_TYPE_VS_EMISSIONS:
      return { ...state, product_type_vs_emissions: action.payload }
    case OUTSOURCED_VEHICLE_TYPE_VS_EMISSIONS:
      return { ...state, outsourced_vehicle_type_vs_emissions: action.payload }
    case WASTE_PROCESSING_COMPANIES_VS_EMISSIONS:
      return { ...state, waste_processing_companies_vs_emissions: action.payload }
    case SOLD_PRODUCTS_VS_EMISSIONS:
      return { ...state, sold_products_vs_emissions: action.payload }
    case REFRIGERATION_PROCESS_VS_EMISSION:
      return { ...state, refrigeration_process_vs_emission: action.payload }
    case REFRIGERANT_TYPE_CONSUMPTIONS_VS_EMISSIONS:
      return { ...state, refrigerant_type_consumptions_vs_emissions: action.payload }
    case FUEL_TYPE_CONSUMPTIONS_VS_EMISSIONS:
      return { ...state, fuel_type_consumptions_vs_emissions: action.payload }
    case SPEND_VS_EMISSION:
      return { ...state, spend_vs_emission: action.payload }
    case PURCHASED_ELECTRICITY_CONSUMPTION_VS_EMISSION:
      return { ...state, purchased_electricity_consumption_vs_emission: action.payload }
    case INVESTMENT_COMPANY_BASED_EMISSION:
      return { ...state, investment_company_based_emission: action.payload }
    case EXTRACTION_PRODUCTION_TRANSMISSION_VS_EMISSION:
      return { ...state, extraction_production_transmission_vs_emission: action.payload }
    // case PRODUCT_TYPE_VS_EMISSION:
    //   return { ...state, productTypeVsEmissions: action.payload }
    case DOWNSTREAM_LESSEE_VS_EMISSION:
      return { ...state, downstream_lessee_vs_emission: action.payload }
    default:
      return state;
  }
};
