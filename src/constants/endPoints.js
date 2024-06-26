const baseURL3sc = process.env.REACT_APP_API_3SC_URL;
const baseURL3scLocation = process.env.REACT_APP_API_3SC_URL_LOCATION;
const baseURLEdm = process.env.REACT_APP_API_EDM_URL;
const baseURL3scDB = process.env.REACT_APP_API_URL;
;


const endPoints = {

    //3sc endpoints 
    businessUnitList: (orgId) => `${baseURL3sc}api/v1/org/${orgId}/business-unit/`,
    allTeams: (orgId, selectedBusinessUnit) => `${baseURL3sc}api/v1/org/${orgId}/team/?business_unit=${selectedBusinessUnit}`,
    regionList: (tenant_id) => `${baseURL3sc}api/v1/org/${tenant_id}/business-unit/regions`,
    allTeamsWithoutBu: (tenant_id) => `${baseURL3sc}api/v1/org/${tenant_id}/team/`,
    login: `${baseURL3sc}api/v1/users/login/`,
    getLocationMasterData: `${baseURL3scLocation}entities/location/v1`,
    allFilters: (orgId) => `${baseURL3scDB}api/v2/get-filter-options`,

    //carbonx-db api's
    potentialEmission: "api/v2/potential-emissions/",
    equvalenceDashBoard: "api/v2/equivalence-dashboard/",
    computation: "api/v2/get-computation-dashboard/",
    computationAlert: "api/v2/get-alerts/",
    ghgEmissions: `api/v2/ghg-emission/`,
    emissionTimeline: 'api/v2/emission-timeline/',
    emissionActivity: 'api/v2/emission-across-activity/',
    emissionTransportation: 'api/v2/emission-across-transportation/',
    emissionScopes: 'api/v2/emission-scope/',
    emissionBySupplier: 'api/v2/emission-by-supplier/',
    getUserGraphSetting: "api/v2/user-graph-settings/",
    getUserGraphSettingDetailed: "api/v2/user-graph-settings/?type=detailed",
    updateUserGraphSetting: "api/v2/user-graph-settings/",
    allMetricData: "api/v2/single-view/",
    allMetricDataExecutive: "api/v2/single-view/",
    allMetricDataDetailed: "api/v2/single-view/?type=detailed",

    //dashboardMatrics: "api/v2/dashboard-metrics/",
    //dashboardMatricsDetailed: "api/v2/dashboard-metrics/?type=detailed",
   // metricCardUserSetting: "api/v2/user-settings/",
    //metricCardUserSettingDetailed: "api/v2/user-settings/?type=detailed",
    moveMetrics: "api/v2/move-metrics/",
    processVsEmission: "api/v2/emission-by-process/",
    clientEquivalence: "api/v2/client-equivalence/",
    editEquivalence: "api/v2/client-equivalence/",
    getCostFuelData: "api/v2/cost-fuel-item-shipped/",
    lanesVsEmission: "api/v2/lane-vs-emission/",
    continentVsEmission: "api/v2/continent-vs-emission/",
    emissionRegion: "api/v2/emission-region/",
    emissionCountry: "api/v2/source-country-vs-emission/",
    scope2EmissionCateg: "api/v2/scope2-emission-categ/",
    buEmission: "api/v2/bu-emissions/",
    masterEntities: "api/v2/master-entities",
    consignerVsEmission: "api/v2/consigner-vs-emission/",

    //Edm Api's --->>>
    //vehicle  
    getVehicleList: () => `${baseURLEdm}searchVehicle`,
    downloadVehicleData: `${baseURLEdm}downloadVehicleData`,
    uploadVehicleData: `${baseURLEdm}saveVehicleMaster`,

    //Transactional data 
    getScopeRecordsData: `${baseURLEdm}getRecords`,
    downloadScopeRecordData: `${baseURLEdm}downloadScopesData`,
    uploadScopeRecordData: `${baseURLEdm}uploadFile`,
    startProcessCron: `api/v2/data-processing/`,

    //DML
    getStructuredSheetStatus: `${baseURLEdm}getStructuredSheetStatus`,
    getStructuredSheetRecords: `${baseURLEdm}getStructuredSheetRecords`,
    uploadStructuredSheetDataMapping: `${baseURLEdm}structuredSheetDataMapping`,
    getSkippedRowGraphData: `${baseURLEdm}getSkippedRowGraphData`,
    checkFileStatus: `${baseURLEdm}checkFileStatus`,

    downloadSkippedRow: `${baseURLEdm}downloadSkippedRawData`

}

export default endPoints;
