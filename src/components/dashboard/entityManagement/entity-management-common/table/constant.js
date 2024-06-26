export const columns = [

  {
    field: 'Scope',
    headerName: 'Scope',
    width: 150
  },
  {
    field: 'entity',
    headerName: 'Entity',
    width: 150
  },
  {
    field: 'Region',
    headerName: 'Region',
    width: 150,
  },
  {
    field: 'Country',
    headerName: 'Country',
    width: 150,
  },
  {
    field: 'buId',
    headerName: 'BU ID',
    width: 150,
  },
  {
    field: 'teamID',
    headerName: 'Team ID',
    width: 150,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    width: 150,
  },

];

export const columnsVehicleMaster = [

  {
    field: 'transporterName',
    width: 150,
    headerName: 'Transporter Name'
  },
  {
    field: 'transporterId',
    width: 150,
    headerName: 'Transporter ID',

  },
  {
    field: 'vehicleNumber',
    width: 150,
    headerName: 'Vehicle Number'
  },
  {
    field: 'fleetOwnership',
    width: 150,
    headerName: 'Fleet Ownership'
  },
  {
    width: 150,
    field: 'fuelType',
    headerName: 'Fuel Type'
  },
  {
    headerName: 'Fuel Name',
    field: 'fuelName',
    width: 150
  },
  {
    field: 'fuelEconomy', width: 150,
    headerName: 'Fuel Economy'
  },
  {
    field: 'defraVehicleType', width: 150, headerName: 'Defra Vehicle Type'
  },
  {
    field: 'defraVehicleCategory', width: 150,
    headerName: 'Defra Vehicle Category'
  },
  {
    field: 'defraVehicleSubCategory', width: 150, headerName: 'Defra Vehicle Sub-Category'
  },
  {
    field: 'defraVehicleFuel', width: 150,
    headerName: 'Defra Vehicle Fuel'
  },
  {
    field: 'epaVehicleType',
    width: 150,
    headerName: 'EPA Vehicle Type'
  },
  {
    field: 'epaVehicleFuel', width: 150, headerName: 'EPA Vehicle Fuel'
  },
  {
    field: 'vehicleYear', width: 150,
    headerName: 'Vehicle Year'
  },
  {
    field: 'batteryPowered', width: 150, headerName: 'Battery Powered'
  },
  {
    field: 'routeName',
    width: 150, headerName: 'Route Name'
  },
  {
    field: 'routeId', width: 150, headerName: 'Route ID'
  },
  {
    field: 'cases', width: 150,
    headerName: 'Cases'
  },
  {
    field: 'cartoons', width: 150, headerName: 'Cartons'
  },
  {
    field: 'pallets', width: 150,
    headerName: 'Pallets'
  },
  {
    field: 'boxes', width: 150, headerName: 'Boxes'
  },
  {
    field: 'misc', width: 150,
    headerName: 'Misc'
  },
  {
    field: 'volumetricDetails',
    width: 150, headerName: 'Volumetric Details'
  },
  {
    field: 'tonnageCapacity', width: 150,
    headerName: 'Tonnage Capacity'
  },
  {
    field: 'networkId', width: 150, headerName: 'Network ID'
  },
  {
    field: 'buId', width: 150, headerName: 'BU ID'
  },
  {
    field: 'costOfUtilisation', width: 150, headerName: 'Cost of utilisation'
  },
  {
    field: 'makeAndModel',
    width: 150, headerName: 'Make & Model'
  },
  {
    field: 'engineCapacity', width: 150, headerName: 'Engine Capacity'
  },

  {
    field: 'maxDistancePerDay', width: 150,
    headerName: 'Max distance per day'
  },
  {
    field: 'maxTripsPerDay',
    width: 150, headerName: 'Max trips per day'
  },
  {
    field: 'teamId', width: 150, headerName: 'Team Id'
  },

  {
    field: 'defraVehicleLoad',
    width: 150, headerName: 'Defra Vehicle Load'
  },
  { field: 'id', width: 150, headerName: 'Id' },
  {
    field: 'modeOfTransport', width: 150,
    headerName: 'Mode Of Transport'
  },


];
let temp = {
  "node_mapping_id": "9cc98946-5d36-462d-be68-266624025cbc",
  "id": "00c6ce0e-ebb6-453d-9d47-3bcd1a360453",
  "node_code": "9AAE205933",
  "node": "Hitachi Energy Germany AG",
  "description": "",
  "address_line_1": "Keffelker Strasse 66",
  "address_line_2": "",
  "activity": "Plant",
  "address_id": "9AAE101981",
  "coordinates": {
    "x": 51.399929,
    "y": 8.588279,
    "z": "NaN",
    "m": "NaN",
    "valid": true
  },
  "pincode": 59929,
  "node_type": {
    "node_type_id": "bc713d44-8921-4c63-9f7f-3a107c47e986",
    "node_type_code": "Plant",
    "node_type_title": "Plant"
  },
  "capacity_manufacturing_UOM": "NA",
  "manufacturing_capacity": 0,
  "manufacturing_operating_hours_shift": 0,
  "manufacturing_shifts_per_day": 0,
  "manufacturing_shift_day": "NA",
  "capacity_warehouse_UOM": "NA",
  "capacity_warehouse_unit": 0,
  "warehouse_shift_per_day": 0,
  "warehouse_operating_hours_shift": 0,
  "warehouse_shift_days": "NA",
  "node_lifecycle_Status": true,
  "node_lifecycle_start_date": "2023-03-27",
  "node_lifecycle_end_date": "2024-03-27",
  "node_lifecycle_sunset_date": "2025-03-27",
  "created_at": "2023-03-27",
  "created_by": "ecdce595-5fa5-41f9-8594-6e1756aebe88",
  "modified_at": "2023-03-27",
  "modified_by": "ecdce595-5fa5-41f9-8594-6e1756aebe88",
  "locationHierarchyLevel1": "Brilon",
  "locationHierarchyLevel2": "Nordrhein-Westfalen",
  "locationHierarchyLevel3": "Germany"
};

export const columnsLocationMaster = [

  { field: 'node_code', headerName: 'Node Code', width: 150 },
  {
    field: 'node',
    headerName: 'Node',
    width: 150
  },
  {
    field: 'description', headerName: 'Description',
    width: 150,
  },
  {
    field: 'address_line_1', headerName: 'Address Line 1', width: 150,
  },
  {
    field: 'address_line_2', headerName: 'Address Line 2',
    width: 150,
  },
  {
    field: 'activity',
    headerName: 'Activity', width: 150,
  },
  {
    field: 'address_id',
    headerName: 'Address Id',
    width: 150,
  },
  //handle these
  {
    field: 'x', headerName: 'Latitude', width: 150,
  },
  {
    field: 'y',
    headerName: 'Longitude', width: 150,
  },
  {
    field: 'pincode', headerName: 'Pincode',
    width: 150,
  },
  //handle this
  {

    headerName: 'Node Type Code', field: 'node_type_code',
    width: 150,
  },
  {
    width: 150, field: 'node_type_title', headerName: 'Node Type Title'
  },
  {
    field: 'capacity_manufacturing_UOM', headerName: 'Capacity Manufacturing UOM', width: 150,
  },
  {
    field: 'manufacturing_capacity', headerName: 'Manufacturing Capacity', width: 150,
  },
  {
    field: 'manufacturing_operating_hours_shift',
    headerName: 'Manufacturing Operating Hours Shift', width: 150,
  },
  {
    field: 'manufacturing_shifts_per_day',
    headerName: 'Manufacturing Shifts Per Day', width: 150,
  },
  {
    field: 'manufacturing_shift_day',
    headerName: 'Manufacturing Shift Day',
    width: 150,
  },
  {
    field: 'capacity_warehouse_UOM', headerName: 'Capacity Warehouse UOM', width: 150,
  },
  {
    field: 'capacity_warehouse_unit',
    headerName: 'Capacity Warehouse Unit', width: 150,
  },
  {
    field: 'warehouse_shift_per_day', headerName: 'Warehouse Shift Per Day',
    width: 150,
  },
  {
    field: 'warehouse_operating_hours_shift',
    headerName: 'Warehouse Operating Hours Shift',
    width: 150,
  },
  {
    field: 'warehouse_shift_days', headerName: 'Warehouse Shift Days', width: 150,
  },
  {
    field: 'node_lifecycle_Status',
    headerName: 'Node Lifecycle Status', width: 150,
  },
  {
    field: 'node_lifecycle_start_date', headerName: 'Node Lifecycle Start Date',
    width: 150,
  },
  {
    field: 'node_lifecycle_end_date',
    headerName: 'Node Lifecycle End Date',
    width: 150,
  },
  {
    field: 'node_lifecycle_sunset_date', headerName: 'Node Lifecycle Sunset Date', width: 150,
  },
  {
    field: 'locationHierarchyLevel1', headerName: 'City',
    width: 150,
  },
  {
    field: 'locationHierarchyLevel2',
    headerName: 'State', width: 150,
  },
  {
    field: 'locationHierarchyLevel3', headerName: 'Country', width: 150,
  },

];

export const columnsScopeRecords = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  { field: 'buID', headerName: 'BU ID', width: 150 },
  {
    field: 'buName',
    width: 150,
    headerName: 'BU Name',

  },
  {
    field: 'consignmentReachDate', width: 150, headerName: 'Consignment Reach Date', 
  },
  {
    headerName: 'Consignment Start Date', width: 150, field: 'consignmentStartDate', 
  },
  {
    field: 'country', 
    width: 150,
    headerName: 'Country',
    
  },
  {
    width: 150,
    field: 'createDate',
    headerName: 'Create Date',
    
  },
  {
    field: 'dataDate', headerName: 'Data Date',
     width: 150,
  },
  {
    field: 'dataQualityType', 
    headerName: 'Data Quality Type', width: 150,
  },
  {
    
    headerName: 'Description', 
    field: 'description', 
    width: 150,
  },
  {
    field: 'destLatLong', headerName: 'Dest Lat Long',
    width: 150,
  },
  {
    field: 'destLocationName',
    headerName: 'Dest Location Name',
    width: 150,
  },
  {
    field: 'distance',
    headerName: 'Distance', width: 150,
  },
  {
    field: 'distanceUnit', headerName: 'Distance Unit',
    width: 150,
  },
  {
    field: 'energyConsumedQuantity', headerName: 'Energy Consumed Quantity', width: 150,
  },
  {
    field: 'energyEmissionFactor', headerName: 'Energy Emission Factor',
    width: 150,
  },
  {
    field: 'energyProviderLocation', headerName: 'Energy Provider Location', width: 150,
  },
  {
    field: 'energyProviderName',
    headerName: 'Energy Provider Name', width: 150,
  },
  {
    field: 'energyType', headerName: 'Energy Type',
    width: 150,
  },
  {
    field: 'fuelConsumption', headerName: 'Fuel Consumption', width: 150,
  },
  {
    field: 'fuelEconomy',
    headerName: 'Fuel Economy', width: 150,
  },
  {
    field: 'fuelName', headerName: 'Fuel Name', width: 150,
  },
  {
    field: 'fuelQuantity', headerName: 'Fuel Quantity',
    width: 150,
  },
  {
    field: 'fuelQuantityUnit', headerName: 'Fuel Quantity Unit', width: 150,
  },
  {
    field: 'fuelType',
    headerName: 'Fuel Type', width: 150,
  },
  {
    field: 'id',
    headerName: 'ID',
    width: 150,
  },
  {
    field: 'laneName', headerName: 'Lane Name',
    width: 150,
  },
  {
    field: 'loadType', headerName: 'Load Type', width: 150,
  },
  {
    field: 'methodName',
    headerName: 'Method Name',
    width: 150,
  },

  {
    field: 'name',
     headerName: 'Name', width: 150,
  },
  {
    field: 'networkID', width: 150,
    headerName: 'Network ID',
    
  },

  {
    field: 'quantityOfRefrigerantLeakage',width: 150, headerName: 'Quantity Of Refrigerant Leakage', 
  },
  {
     headerName: 'Refrigerant Gas Leakage Name', width: 150, field: 'refrigerantGasLeakageName',
  },
  {
    field: 'refrigerantGasLeakageType', 
    headerName: 'Refrigerant Gas Leakage Type',
    width: 150,
  },
  {
    field: 'refrigerantLeakageEmissionIncludes', headerName: 'Refrigerant Leakage Emission Includes', 
    width: 150,
  },

  {
    field: 'region', 
    width: 150,
    headerName: 'Region',
    
  },
  {
    field: 'sourceLatLong', headerName: 'Source Lat Long', width: 150,
  },

  {
    field: 'sourceLocationName',
    headerName: 'Source Location Name',
    width: 150,
  },

  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },

  {
    field: 'teamID', headerName: 'Team ID',
    width: 150,
  },

  {
    field: 'teamName', headerName: 'Team Name', width: 150,
  },

  {
    field: 'totalEmission',
    headerName: 'Total Emission', width: 150,
  },

  {
    field: 'totalWeight', headerName: 'Total Weight', width: 150,
  },

  {
    field: 'transactionDate', headerName: 'Transaction Date', width: 150,
  },

  {
    field: 'transportationAndDistributionType',
    headerName: 'Transportation And Distribution Type', width: 150,
  },
  {
    field: 'transportationCost', headerName: 'Transportation Cost',
    width: 150,
  },
  {
    field: 'transportationCostUnit',
    headerName: 'Transportation Cost Unit',
    width: 150,
  },
  {
    field: 'vehicleID',
    headerName: 'Vehicle ID', width: 150,
  },

  {
    field: 'weightUnit', headerName: 'Weight Unit',
    width: 150,
  }
];


export const columnsScope1Records = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  { field: 'buID', headerName: 'BU ID', width: 150 },
  {
    field: 'buName',
    headerName: 'BU Name',
    width: 150,
  },
  {
    field: 'clientId', headerName: 'Client ID',
    width: 150,
  },

  {
    field: 'country', headerName: 'Country', width: 150,
  },
  {
    headerName: 'Create Date',
    field: 'createDate', width: 150,
  },
  {
    field: 'dataDate', headerName: 'Data Date',
    width: 150,
  },
  {
    field: 'description', headerName: 'Description', width: 150,
  },
  {
    field: 'distance', headerName: 'Distance',
    width: 150,
  },
  {
    field: 'distanceUnit',
    width: 150,
    headerName: 'Distance Unit'
  },
  {
    field: 'energyConsumedQuantity', headerName: 'Energy Consumed Quantity', width: 150,
  },
  {
    field: 'energyEmissionFactor',
    width: 150,
    headerName: 'Energy Emission Factor'

  },
  {
    field: 'energyProviderLocation',
    headerName: 'Energy Provider Location', width: 150,
  },
  {
    field: 'energyProviderName', headerName: 'Energy Provider Name',
    width: 150,
  },
  {
    headerName: 'Energy Type', width: 150,
    field: 'energyType',
  },
  {
    field: 'entity', headerName: 'Entity', width: 150,
  },
  {
    field: 'fuelCost', headerName: 'Fuel Cost',
    width: 150,
  },
  {
    field: 'fuelCostUnit',
    headerName: 'Fuel Cost Unit', width: 150,
  },
  {
    field: 'fuelName', headerName: 'Fuel Name', width: 150,
  },
  {
    headerName: 'Fuel Quantity', field: 'fuelQuantity', width: 150,
  },
  {

    headerName: 'Fuel Quantity Unit',
    width: 150,
    field: 'fuelQuantityUnit'
  },
  {
    field: 'fuelType',
    width: 150,
    headerName: 'Fuel Type'

  },
  {
    field: 'id', headerName: 'ID', width: 150,
  },
  {
    field: 'locationID', headerName: 'Location ID',
    width: 150,
  },
  {
    width: 150, field: 'methodName', headerName: 'Method Name'
  },

  {
    field: 'name',
    headerName: 'Name', width: 150,
  },
  {
    field: 'poId', headerName: 'Po ID',
    width: 150,
  },
  {
    field: 'processID', headerName: 'Process ID', width: 150,
  },
  {
    field: 'quantity', headerName: 'quantity',
    width: 150,
  },

  {
    field: 'quantityOfRefrigerantLeakage',
    width: 150,
    headerName: 'Quantity Of Refrigerant Leakage'
  },
  {
    field: 'refrigerantGasEmissionIncludes',
    width: 150,
    headerName: 'Refrigerant Gas Emission Includes'
  },
  {
    field: 'refrigerantGasLeakageName', headerName: 'Refrigerant Gas Leakage Name', width: 150,
  },
  {
    headerName: 'Refrigerant Gas Leakage Type',
    width: 150,
    field: 'refrigerantGasLeakageType'
  },
  {
    field: 'refrigerantLeakageEmissionIncludes',
    width: 150,
    headerName: 'Refrigerant Leakage Emission Includes',

  },

  {
    headerName: 'Region',
    field: 'region',
    width: 150
  },
  {
    field: 'sourceID',
    width: 150,
    headerName: 'Source ID'
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity',
    width: 150
  },
  {
    field: 'supplierSpecificEF', headerName: 'Supplier Specific EF',
    width: 150,
  },
  {
    field: 'teamID',
    headerName: 'Team ID', width: 150,
  },

  {
    field: 'teamName', headerName: 'Team Name', width: 150,
  },

  {
    headerName: 'Total Good Service Cost', width: 150, field: 'totalGoodServiceCost'
  },
  {
    field: 'totalScope1Emission', headerName: 'Total Scope 1 Emission', width: 150
  },

  {
    field: 'totalWeight',
    headerName: 'Total Weight', width: 150

  },

  {
    field: 'transactionDate', headerName: 'Transaction Date', width: 150,
  },
  {
    field: 'vehicleID', headerName: 'Vehicle ID',
    width: 150,
  },
  {
    field: 'weightUnit',
    headerName: 'Weight Unit', width: 150,
  }
];


export const columnsScope2Records = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  { field: 'buID', headerName: 'BU ID', width: 150 },
  {
    headerName: 'BU Name',
    width: 150,
    field: 'buName',
  },
  {
    field: 'clientId',
    width: 150,
    headerName: 'Client ID',
  },
  {
    field: 'cost', width: 150,
    headerName: 'Cost',
  },
  {
    field: 'costUnit', headerName: 'Cost Unit',
    width: 150,
  },

  {
    field: 'country',
    headerName: 'Country', width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date', width: 150,
  },
  {
    headerName: 'Data Date', field: 'dataDate', width: 150,
  },


  {
    width: 150, field: 'dataQualityType', headerName: 'Data Quality Type',

  },
  {
    field: 'energyConsumedQuantity',
    width: 150,
    headerName: 'Energy Consumed Quantity'

  },
  {
    field: 'energyConsumedQuantityUnit', width: 150,
    headerName: 'Energy Consumed Quantity Unit',
  },

  {
    field: 'energyProviderLocation',
    headerName: 'Energy Provider Location', width: 150,
  },
  {
    field: 'energyProviderName', headerName: 'Energy Provider Name',
    width: 150,
  },
  {
    headerName: 'Energy Type', width: 150,
    field: 'energyType',
  },
  {
    field: 'id',
    width: 150,
    headerName: 'ID',
  },
  {
    field: 'isRenewable', headerName: 'Is Renewable', width: 150,
  },
  {
    field: 'methodName', headerName: 'Method Name',
    width: 150,
  },

  {
    field: 'recordID',
    headerName: 'Record ID', width: 150,
  },
  {
    headerName: 'Region',
    field: 'region',
    width: 150,
  },
  {
    field: 'scope2Emissions', headerName: 'Scope 2 Emissions', width: 150,
  },
  {
    headerName: 'Scope Category',
    field: 'scopeCategory', width: 150,
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },
  {
    field: 'teamID', headerName: 'Team ID',
    width: 150,
  },

  {
    field: 'teamName', width: 150,
    headerName: 'Team Name'

  }
];

export const columnsScope3entity1Records = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  { field: 'buID', headerName: 'BU ID', width: 150 },
  {
    field: 'buName',
    width: 150,
    headerName: 'BU Name',
  },
  {
    field: 'clientId',
    headerName: 'Client Id', width: 150,
  },
  {
    width: 150, field: 'country', headerName: 'Country',

  },
  {
    field: 'createDate',
    headerName: 'Create Date', width: 150,
  },
  {
    field: 'dataDate', headerName: 'Data Date',
    width: 150,
  },
  {
    field: 'dateOfPurchase', headerName: 'Date Of Purchase', width: 150,
  },
  {
    field: 'distanceTransportOfMaterialInputsToTier1Supplier', headerName: 'Distance of transport of material inputs to tier 1 supplier',
    width: 150,
  },

  {
    field: 'efMaterialInput',
    headerName: 'Ef Material Input', width: 150,
  },
  {
    headerName: 'Ef Waste Activity',
    width: 150,
    field: 'efWasteActivity'

  },
  {
    field: 'ef_VehicleType',
    width: 150, headerName: 'Ef Vehicle Type',

  },
  {
    field: 'eissionsTransportOfMaterialInputsToTier1Supplier', headerName: 'Emissions on the transport of material inputs to tier 1 supplier', width: 150,
  },
  {
    field: 'id', width: 150, headerName: 'ID',

  },

  {
    width: 150, field: 'massOfWasteFromTier1Supplier', headerName: 'Mass Of Waste From Tier 1 Supplier'
  },

  {
    field: 'materialInputsEmissionByTier1Supplier', headerName: 'Material Inputs Emission By Tier 1 Supplier', width: 150,
  },

  {
    field: 'materialName', headerName: 'Material Name',
    width: 150,
  },
  {
    field: 'materialType',
    headerName: 'Material Type', width: 150,
  },
  {

    headerName: 'Material Use Method',
    width: 150,
    field: 'materialUseMethod',
  },

  {
    field: 'methodName', headerName: 'Method Name', width: 150,
  },

  {
    field: 'otherEmissionsInProvisionOfGoodOrService', headerName: 'Other Emissions In Provision Of Good Or Service',
    width: 150,
  },
  {
    field: 'purchaseID', headerName: 'Purchase ID', width: 150,
  },

  {
    field: 'purchaseReason',
    headerName: 'Purchase Reason', width: 150,
  },
  {
    field: 'purchaseType',
    width: 150,
    headerName: 'Purchase Type'

  },
  {
    headerName: 'Quantity',
    width: 150, field: 'quantity',

  },
  {

    headerName: 'Quantity Of Material Inputs Used By Tier 1 Supplier',
    width: 150, field: 'quantityOfMaterialInputsUsedByTier1Supplier',
  },

  {

    headerName: 'Region', field: 'region',
    width: 150,
  },
  {
    field: 'scope1And2EmissionBySupplier',
    width: 150,
    headerName: 'Scope 1 And 2 Emission By Supplier',
  },
  {
    field: 'subActivity',
    width: 150, headerName: 'Sub Activity',
  },
  {
    field: 'supplierID',
    headerName: 'Supplier ID', width: 150,
  },
  {
    field: 'supplierName', headerName: 'Supplier Name',
    width: 150,
  },
  {
    field: 'supplierSpecificEF', headerName: 'Supplier Specific EF', width: 150,
  },


  {
    field: 'teamID',
    width: 150,
    headerName: 'Team ID',
  },

  {
    field: 'teamName', headerName: 'Team Name',
    width: 150,
  },

  {
    field: 'totalEmission', headerName: 'Total Emission', width: 150,
  },
  {
    headerName: 'Total Goods Services Cost', width: 150,
    field: 'totalGoodsServicesCost'
  },

  {
    field: 'totalWeight',
    width: 150,
    headerName: 'Total Weight'

  },

  {
    field: 'wasteEmissionFromTier1Supplier', headerName: 'Waste Emission From Tier 1 Supplier', width: 150,
  },

  {
    field: 'weightPerUnit',
    width: 150,
    headerName: 'Weight Per Unit'
  }
];

export const columnsScope3entity2Records = [

  {
    field: 'activity',
    headerName: 'Activity', width: 150
  },
  {
    field: 'amountOfEnergyUsed',
    headerName: 'Amount Of Energy Used',
    width: 150
  },
  { field: 'amountOfRawMaterialCapital', width: 150, headerName: 'Amount Of Raw Material Capital', },
  {
    field: 'amountOfWasteGenerated',
    headerName: 'Amount Of Waste Generated',
    width: 150
  },
  { headerName: 'Amount Of Capital Goods', width: 150, field: 'amountofCapitalGoods', },

  { field: 'buID', width: 150, headerName: 'BU ID' },
  {
    field: 'buName',
    width: 150,
    headerName: 'BU Name'

  },
  {

    headerName: 'Client Id',
    width: 150,
    field: 'clientId'
  },
  {
    width: 150,
    field: 'country',
    headerName: 'Country',

  },
  {
    field: 'createDate',
    width: 150,
    headerName: 'Create Date',
  },

  {
    field: 'dateOfPurchase', headerName: 'Date Of Purchase', width: 150,
  },

  {
    field: 'destinationLatLong', headerName: 'Destination Lat Long',
    width: 150,
  },

  {
    field: 'destinationPointOfRawMaterial',
    headerName: 'Destination Point Of Raw Material', width: 150,
  },

  {
    field: 'distanceCoveredFromRawMaterialOriginToSupplier', headerName: 'Distance Covered From Raw Material Origin To Supplier', width: 150,
  },

  {
    field: 'e1Scope1andScope2EmissionsBySupplier', width: 150,
    headerName: 'E1 Scope1 and Scope2 Emissions By Supplier'

  },
  {
    field: 'e2MaterialInputEmissions',
    headerName: 'E2 Material Input Emissions', width: 150,
  },
  {
    field: 'e3TransportEmissions', headerName: 'E3 Transport Emissions',
    width: 150,
  },
  {
    field: 'e4WasteOutputEmissions', headerName: 'E4 Waste Output Emissions', width: 150,
  },

  {
    field: 'emissionFactor', headerName: 'Emission Factor',
    width: 150,
  },
  {
    field: 'emissionFactorForRawMaterial',
    width: 150,
    headerName: 'Emission Factor For RawMaterial'
  },
  {
    field: 'emissionFactorSpecificToWaste',
    headerName: 'Emission Factor Specific To Waste', width: 150,
  },
  {
    field: 'fuelType', headerName: 'Fuel Type',
    width: 150,
  },

  {
    headerName: 'ID',
    field: 'id',
    width: 150,
  },

  {
    field: 'methodName', headerName: 'Method Name', width: 150,
  },

  {
    field: 'orgFunctional', headerName: 'Org Functional',
    width: 150,
  },

  {
    field: 'originLatLong',
    headerName: 'Origin Lat Long', width: 150,
  },
  {

    headerName: 'Origin Point Of Raw Material',
    width: 150, field: 'originPointOfRawMaterial',
  },
  {
    headerName: 'Period Of Transaction', field: 'periodOfTransaction',
    width: 150,
  },
  {
    field: 'purchaseID', headerName: 'Purchase ID', width: 150,
  },

  {
    field: 'purchaseReason',
    headerName: 'Purchase Reason', width: 150,
  },
  {
    headerName: 'Qty Of Capital Goods',
    width: 150, field: 'qtyofCapitalGoods',
  },
  {
    field: 'rawMaterialType',
    width: 150, headerName: 'Raw Material Type',
  },
  {
    field: 'region',
    width: 150, headerName: 'Region',
  },
  {
    field: 'scope12SpecificEmissionfactor',
    width: 150,
    headerName: 'Scope1, 2 Specific Emission factor',
  },
  {
    headerName: 'Service ID',
    field: 'serviceID',
    width: 150,
  },
  {
    headerName: 'Service Type',
    field: 'servicetype',
    width: 150,
  },
  {
    field: 'subActivity', width: 150,
    headerName: 'Sub Activity',
  },
  {
    field: 'supplierID', headerName: 'Supplier ID',
    width: 150,
  },
  {
    field: 'supplierName',
    headerName: 'Supplier Name', width: 150,
  },
  {

    headerName: 'Supplier Specific EF', field: 'supplierSpecificEF',
    width: 150,
  },


  {
    field: 'teamID',
    width: 150, headerName: 'Team ID',
  },

  {
    field: 'teamName', headerName: 'Team Name',
    width: 150,
  },

  {
    field: 'totalCost',
    width: 150, headerName: 'Total Cost',
  },

  {
    headerName: 'Total Weight',
    width: 150,
    field: 'totalWeight',
  },

  {
    field: 'unitAmountOfGoods',
    headerName: 'Unit Amount Of Goods', width: 150,
  },

  {
    field: 'upstreamCapitalGoodsEmission', headerName: 'Upstream Capital Goods Emission',
    width: 150,
  },
  {
    field: 'vehicleID', headerName: 'Vehicle ID', width: 150,
  },
  {
    field: 'wasteMaterial',
    width: 150, headerName: 'Waste Material',
  },
  {
    field: 'wasteType', headerName: 'Waste Type', width: 150,
  }
];



export const columnsScope3entity3Records = [

  { field: 'activity', width: 150, headerName: 'Activity' },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150
  },
  {
    width: 150,
    field: 'buID',
    headerName: 'BU ID'
  },
  {
    field: 'buName', headerName: 'BU Name', width: 150,
  },
  {
    field: 'clientId', headerName: 'Client Id',
    width: 150,
  },
  {
    field: 'country',
    headerName: 'Country', width: 150,
  },
  {
    field: 'createDate',
    width: 150, headerName: 'Create Date',
  },
  {
    headerName: 'Data Date',
    width: 150, field: 'dataDate',
  },

  {
    headerName: 'Date Of Purchase',
    field: 'dateOfPurchase',
    width: 150
  },

  {
    field: 'description', headerName: 'Description', width: 150,
  },

  {
    field: 'emissionActivityType', headerName: 'Emission Activity Type',
    width: 150,
  },



  {
    field: 'emissionScope',
    headerName: 'Emission Scope', width: 150,
  },
  {
    width: 150, field: 'emissionsFromFuelAndEnergyRelatedActivities', headerName: 'Emissions From Fuel And Energy Related Activities',

  },
  {
    width: 150,
    field: 'emissionsFromTransmissionAndDistributionLosses',
    headerName: 'Emissions From Transmission And Distribution Losses'
  },
  {
    width: 150, field: 'emissionsRelatedToTheGenerationOfPurchasedElectricityThatIsSoldToEndUsers',
    headerName: 'Emissions Related To The Generation Of Purchased Electricity That Is Sold To EndUsers'
  },

  {
    field: 'energyType', headerName: 'Energy Type', width: 150,
  },
  {
    field: 'goodsID', headerName: 'Goods ID',
    width: 150,
  },
  {
    field: 'id', width: 150,
    headerName: 'ID'

  },
  {
    field: 'locationID',
    width: 150, headerName: 'Location ID',
  },
  {
    field: 'methodName', headerName: 'Method Name',
    width: 150,
  },

  {
    field: 'monthOfTransaction',
    headerName: 'Month Of Transaction', width: 150,
  },

  {
    headerName: 'Name', field: 'name',
    width: 150,
  },
  {
    field: 'orgFunctional', headerName: 'Org Functional', width: 150,
  },

  {
    headerName: 'Purchase ID', field: 'purchaseID',
    width: 150,
  },

  {
    field: 'purchaseReason',
    headerName: 'Purchase Reason', width: 150,
  },
  {
    field: 'region', headerName: 'Region',
    width: 150,
  },
  {

    headerName: 'Scope Category',
    width: 150,
    field: 'scopeCategory'
  },
  {
    field: 'subActivity', headerName: 'Sub Activity', width: 150,
  },
  {
    field: 'supplierID', headerName: 'Supplier ID',
    width: 150
  },
  {
    field: 'supplierName', headerName: 'Supplier Name', width: 150,
  },
  {
    width: 150,
    field: 'supplierSpecificEF', headerName: 'Supplier Specific EF'
  },
  {
    field: 'tandDLossPercent', headerName: 'T and D Loss Percent',
    width: 150
  },

  {
    field: 'teamID', headerName: 'Team ID', width: 150,
  },

  {
    width: 150,
    field: 'teamName',
    headerName: 'Team Name'
  },
  {
    field: 'totalEmission', headerName: 'Total Emission', width: 150,
  },

  {
    headerName: 'Total Qty Of Fuel', width: 150, field: 'totalQtyOfFuel',
  },

  {
    field: 'unitAmountOfFuel', width: 150,
    headerName: 'Unit Amount Of Fuel',
  },

  {
    field: 'upstreamEmissionsOfPurchasedElectricity',
    width: 150, headerName: 'Upstream Emissions Of Purchased Electricity',
  },
  {
    field: 'upstreamEmissionsOfPurchasedFuels', headerName: 'Upstream Emissions Of Purchased Fuels', width: 150,
  }
];


export const columnsScope3entity4Records = [

  {
    field: 'activity',
    headerName: 'Activity',
    width: 150
  },
  {
    field: 'buID',
    width: 150,
    headerName: 'BU ID',
  },
  {
    field: 'buName', headerName: 'BU Name', width: 150,
  },
  {
    field: 'clientId', headerName: 'Client Id',
    width: 150,
  },
  {
    field: 'consignmentReachDate',
    headerName: 'Consignment Reach Date', width: 150,
  },
  {
    headerName: 'Consignment Start Date',
    width: 150,
    field: 'consignmentStartDate',
  },
  {
    field: 'country',
    width: 150,
    headerName: 'Country',
  },
  {
    field: 'createDate', headerName: 'Create Date',
    width: 150,
  },
  {
    width: 150, field: 'dataQualityType',
    headerName: 'Data Quality Type',

  },


  {
    field: 'description',
    width: 150, headerName: 'Description',
  },

  {
    field: 'destLatLong',
    width: 150,
    headerName: 'Dest Lat Long',
  },



  {
    field: 'destLocationName', headerName: 'Dest Location Name', width: 150,
  },
  {
    field: 'distance', headerName: 'Distance',
    width: 150,
  },
  {
    field: 'distanceUnit',
    headerName: 'Distance Unit', width: 150,
  },
  {
    field: 'energyConsumedQuantity', headerName: 'Energy Consumed Quantity', width: 150,
  },

  {
    field: 'energyEmissionFactor',
    headerName: 'Energy Emission Factor', width: 150,
  },

  {

    headerName: 'Energy Provider Location',
    width: 150, field: 'energyProviderLocation',
  },

  {
    field: 'energyProviderName',
    width: 150,
    headerName: 'Energy Provider Name'

  },

  {
    field: 'energyType', headerName: 'Energy Type', width: 150,
  },
  {

    headerName: 'Fuel Consumption', field: 'fuelConsumption',
    width: 150,
  },


  {
    field: 'fuelEconomy', headerName: 'Fuel Economy', width: 150,
  },
  {
    field: 'fuelName', width: 150, headerName: 'Fuel Name',

  },
  {
    field: 'fuelQuantity', headerName: 'Fuel Quantity', width: 150,
  },
  {
    field: 'fuelQuantityUnit',
    width: 150, headerName: 'Fuel Quantity Unit',
  },
  {
    field: 'fuelType', headerName: 'Fuel Type', width: 150,
  },
  {
    width: 150, field: 'id', headerName: 'ID'

  },
  {
    headerName: 'Lane Name',
    width: 150,
    field: 'laneName'
  },
  {
    field: 'loadType', headerName: 'Load Type', width: 150,
  },
  {
    headerName: 'Method Name', field: 'methodName', width: 150,
  },

  {
    field: 'name',
    width: 150,
    headerName: 'Name'
  },
  {
    headerName: 'Network ID', width: 150, field: 'networkID'
  },

  {
    field: 'quantityOfRefrigerantLeakage', headerName: 'Quantity Of Refrigerant Leakage', width: 150,
  },

  {
    headerName: 'Refrigerant Gas Leakage Name',
    width: 150, field: 'refrigerantGasLeakageName'
  },

  {
    field: 'refrigerantGasLeakageType', headerName: 'Refrigerant Gas Leakage Type',
    width: 150,
  },
  {
    field: 'refrigerantLeakageEmissionIncludes',
    headerName: 'Refrigerant Leakage Emission Includes', width: 150,
  },
  {
    field: 'region', headerName: 'Region',
    width: 150,
  },
  {
    field: 'sourceLatLong',
    headerName: 'Source Lat Long', width: 150,
  },
  {
    field: 'sourceLocationName', headerName: 'Source Location Name', width: 150,
  },
  {
    headerName: 'Sub Activity',
    width: 150,
    field: 'subActivity',

  },

  {
    headerName: 'Team ID',
    width: 150,
    field: 'teamID'

  },

  {
    field: 'teamName', headerName: 'Team Name', width: 150,
  },
  {
    headerName: 'Total Emission',
    width: 150,
    field: 'totalEmission'
  },
  {
    field: 'totalWeight', headerName: 'Total Weight',
    width: 150,
  },

  {
    field: 'transactionDate', headerName: 'Transaction Date', width: 150,
  },

  {
    headerName: 'Transportation And Distribution Type', width: 150, field: 'transportationAndDistributionType'
  },

  {
    width: 150, field: 'transportationCost',
    headerName: 'Transportation Cost',
  },
  {
    headerName: 'Transportation Cost Unit', field: 'transportationCostUnit',
    width: 150,
  },
  {
    field: 'vehicleID', headerName: 'Vehicle ID',
    width: 150,
  },
  {
    field: 'weightUnit', headerName: 'Weight Unit', width: 150,
  }
];

export const columnsScope3entity5Records = [

  {
    field: 'activity',
    headerName: 'Activity', width: 150
  },
  {
    field: 'buID', headerName: 'BU ID',
    width: 150
  },
  {
    field: 'buName',
    width: 150, headerName: 'BU Name'
  },
  {
    field: 'clientId',
    headerName: 'Client Id', width: 150,
  },
  {
    field: 'country', headerName: 'Country',
    width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date', width: 150,
  },

  {
    field: 'id',
    headerName: 'ID', width: 150,
  },
  {
    field: 'massOfWaste', headerName: 'Mass Of Waste',
    width: 150,
  },
  {
    field: 'massOfWasteUnit', headerName: 'Mass Of Waste Unit', width: 150,
  },
  {
    headerName: 'Method Name', width: 150, field: 'methodName'
  },

  {
    field: 'name', headerName: 'Name',
    width: 150,
  },
  {
    field: 'percentOfMassTreatment',
    headerName: 'Percent Of Mass Treatment', width: 150,
  },
  {
    headerName: 'Region', field: 'region',
    width: 150
  },
  {
    field: 'scope1and2EmissionByWasteTreatmentCompany',
    headerName: 'Scope 1 and 2 Emission By Waste Treatment Company', width: 150,
  },
  {
    field: 'subActivity', headerName: 'Sub Activity',
    width: 150,
  },

  {
    field: 'teamID',
    headerName: 'Team ID', width: 150,
  },

  {
    width: 150,
    field: 'teamName',
    headerName: 'Team Name'
  },
  {
    field: 'totalEmission', headerName: 'Total Emission',
    width: 150,
  },
  {
    field: 'treatmentMethod', headerName: 'Treatment Method', width: 150,
  },

  {
    field: 'wasteName',
    headerName: 'Waste Name', width: 150,
  },

  {
    field: 'wasteTreatmentCompany', headerName: 'Waste Treatment Company',
    width: 150,
  },

  {
    field: 'wasteType',

    width: 150, headerName: 'Waste Type',
  }
];


export const columnsScope3entity6Records = [
  {
    field: 'accommodationType',
    headerName: 'Accommodation Type',
    width: 150
  },
  {
    field: 'activity',
    width: 150,
    headerName: 'Activity'
  },
  {
    width: 150,
    field: 'buID',
    headerName: 'BU ID'
  },
  {
    headerName: 'BU Name',
    width: 150,
    field: 'buName'
  },
  {
    field: 'businessTravelClass',
    width: 150,
    headerName: 'Business Travel Class'
  },
  {
    field: 'businessTravelType', headerName: 'Business Travel Type',
    width: 150,
  },
  {
    field: 'checkIn',
    headerName: 'CheckIn', width: 150,
  },
  {
    field: 'checkOut', headerName: 'CheckOut', width: 150,
  },
  {
    headerName: 'Client Id', field: 'clientId',
    width: 150,
  },
  {
    field: 'country', headerName: 'Country', width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date',
    width: 150,
  },

  {
    field: 'destLatLong',
    headerName: 'Dest Lat Long', width: 150,
  },

  {
    field: 'destinationCountry', headerName: 'Desstination Country', width: 150,
  },
  {
    headerName: 'Distance',
    width: 150, field: 'distance'
  },
  {

    headerName: 'Distance Unit', field: 'distanceUnit',
    width: 150
  },
  {
    headerName: 'Energy Consumed Quantity',
    field: 'energyConsumedQuantity',
    width: 150
  },

  {
    field: 'energyEmissionFactor',
    width: 150,
    headerName: 'Energy Emission Factor'
  },

  {
    field: 'energyProviderLocation',
    width: 150,
    headerName: 'Energy Provider Location'

  },

  {
    field: 'energyProviderName', headerName: 'Energy Provider Name', width: 150,
  },

  {
    field: 'energyType',
    headerName: 'Energy Type', width: 150,
  },
  {
    field: 'fuelEfficiency', headerName: 'Fuel Efficiency',
    width: 150,
  },
  {
    field: 'fuelName', headerName: 'Fuel Name', width: 150,
  },
  {

    headerName: 'Fuel Quantity',
    width: 150, field: 'fuelQuantity',
  },
  {

    headerName: 'Fuel Quantity Unit', field: 'fuelQuantityUnit',
    width: 150,
  },
  {
    field: 'fuelType',
    width: 150,
    headerName: 'Fuel Type'
  },
  {
    headerName: 'ID',
    field: 'id',
    width: 150
  },
  {
    field: 'industrialProcessType', headerName: 'Industrial Process Type', width: 150,
  },
  {
    field: 'invoiceDate', headerName: 'Invoice Date',
    width: 150,
  },
  {
    field: 'methodName',
    headerName: 'Method Name', width: 150,
  },

  {

    headerName: 'Night Stay',
    width: 150,
    field: 'nightStay'
  },
  {
    field: 'nightStayUnit', headerName: 'Night Stay Unit',
    width: 150,
  },

  {
    field: 'originCountry',
    headerName: 'Origin Country', width: 150,
  },
  {
    field: 'originLatLong', headerName: 'Origin Lat Long', width: 150,
  },
  {

    headerName: 'People Travelled',
    width: 150,
    field: 'peopleTravelled'
  },

  {

    headerName: 'Quantity Of Refrigerant Leakage',
    field: 'quantityOfRefrigerantLeakage',
    width: 150
  },

  {
    field: 'refrigerantGasLeakageName',
    width: 150,
    headerName: 'Refrigerant Gas Leakage Name'
  },

  {
    field: 'refrigerantGasLeakageType', headerName: 'Refrigerant Gas Leakage Type',
    width: 150
  },
  {
    width: 150,
    field: 'refrigerantLeakageEmissionIncludes',
    headerName: 'Refrigerant Leakage Emission Includes'
  },
  {
    headerName: 'Region', field: 'region',
    width: 150
  },
  {
    field: 'stayOrRoom', headerName: 'Stay Or Room', width: 150,
  },
  {
    field: 'subActivity', headerName: 'Sub Activity',
    width: 150,
  },

  {
    field: 'teamID', headerName: 'Team ID', width: 150,
  },

  {
    field: 'teamName',
    headerName: 'Team Name', width: 150,
  },
  {
    field: 'totalEmission',
    width: 150, headerName: 'Total Emission'
  },
  {
    field: 'travelCost', headerName: 'Travel Cost', width: 150,
  },

  {
    field: 'travelCostUnit', headerName: 'Travel Cost Unit',
    width: 150
  },

  {
    headerName: 'Vehicle ID',
    width: 150,
    field: 'vehicleID'
  },

  {
    headerName: 'Vehicle Segment',
    field: 'vehicleSegment',
    width: 150
  },
  {
    field: 'vehicleType',
    width: 150, headerName: 'Vehicle Type'
  }
];

export const columnsScope3entity7Records = [
  {
    headerName: 'Activity',
    width: 150,
    field: 'activity'
  },
  {
    field: 'buID',
    headerName: 'BU ID', width: 150
  },
  {
    field: 'buName', width: 150,
    headerName: 'BU Name',

  },
  {
    field: 'clientId',
    headerName: 'Client Id', width: 150,
  },

  {
    field: 'commutingDate', headerName: 'commutingDate',
    width: 150,
  },
  {
    field: 'commutingReason', headerName: 'commutingReason', width: 150,
  },
  {
    field: 'countOfEmployees',
    width: 150, headerName: 'Count Of Employees'
  },
  {
    width: 150,
    field: 'country',
    headerName: 'Country'
  },
  {
    headerName: 'Create Date',
    field: 'createDate',
    width: 150
  },

  {

    headerName: 'Data Date',
    field: 'dataDate',
    width: 150
  },
  {
    field: 'distance',
    width: 150,
    headerName: 'Distance'
  },
  {
    width: 150,
    field: 'distanceUnit',
    headerName: 'Distance Unit'

  },

  {
    field: 'empID',
    width: 150,
    headerName: 'Emp ID'

  },
  {
    field: 'empName',
    headerName: 'Emp Name', width: 150,
  },

  {
    field: 'energyConsumedQuantity', headerName: 'Energy Consumed Quantity', width: 150,
  },

  {
    field: 'energyEmissionFactor', headerName: 'Energy Emission Factor',
    width: 150,
  },

  {
    field: 'energyProviderLocation',
    headerName: 'Energy Provider Location', width: 150,
  },

  {
    field: 'energyProviderName', headerName: 'Energy Provider Name', width: 150,
  },

  {
    field: 'energyType', headerName: 'Energy Type',
    width: 150,
  },
  {
    field: 'fuelName',
    headerName: 'Fuel Name', width: 150,
  },
  {
    field: 'fuelQuantity', headerName: 'Fuel Quantity',
    width: 150
  },
  {
    field: 'fuelQuantityUnit', headerName: 'Fuel Quantity Unit', width: 150,
  },
  {
    field: 'fuelType',
    headerName: 'Fuel Type', width: 150,
  },
  {
    field: 'id', headerName: 'ID',
    width: 150,
  },
  {
    field: 'methodName',
    width: 150,
    headerName: 'Method Name'
  },
  {

    headerName: 'Quantity Of Refrigerant Leakage',
    field: 'quantityOfRefrigerantLeakage',
    width: 150
  },

  {
    field: 'refrigerantGasLeakageName',
    width: 150,
    headerName: 'Refrigerant Gas Leakage Name'

  },

  {

    headerName: 'Refrigerant Gas Leakage Type',
    width: 150, field: 'refrigerantGasLeakageType'
  },
  {
    headerName: 'Refrigerant Leakage Emission Includes',
    field: 'refrigerantLeakageEmissionIncludes',
    width: 150
  },
  {
    field: 'region',
    width: 150, headerName: 'Region'
  },
  {
    field: 'subActivity',
    width: 150,
    headerName: 'Sub Activity'
  },

  {
    field: 'teamID', headerName: 'Team ID', width: 150,
  },

  {
    field: 'teamName', headerName: 'Team Name',
    width: 150,
  },
  {
    field: 'totalEmission',
    headerName: 'Total Emission', width: 150,
  },
  {
    field: 'vehicleID', headerName: 'Vehicle ID', width: 150,
  },

  {
    field: 'wfhEmissions', width: 150,
    headerName: 'Wfh Emissions'

  },
  {
    field: 'wfhEnergyAmount',
    width: 150, headerName: 'Wfh Energy Amount'
  },
  {

    headerName: 'Wfh Energy Name', field: 'wfhEnergyName',
    width: 150
  },
  {
    field: 'wfhEnergyType',
    width: 150, headerName: 'Wfh Energy Type'
  },
  {
    field: 'workingDaysPerYear', headerName: 'Working Days Per Year',
    width: 150
  }
];

export const columnsScope3entity8Records = [

  {
    field: 'activity',
    headerName: 'Activity',
    width: 150
  },
  {
    width: 15,
    field: 'areaOfLessorUsedByLessi',
    headerName: 'Area Of Lessor Used By Lessi'
  },
  {
    field: 'asset',
    width: 150,
    headerName: 'Asset'
  },
  {
    field: 'assetType',
    headerName: 'Asset Type', width: 150
  },
  { field: 'averageEmissionFactor', width: 150, headerName: 'Average Emission Factor', },
  {
    field: 'avgFuel', width: 150,
    headerName: 'Avg Fuel'
  },
  {

    headerName: 'Avg Power',
    width: 150, field: 'avgPower',
  },

  {
    field: 'buID',
    headerName: 'BU ID', width: 150
  },
  {
    field: 'buName', headerName: 'BU Name',
    width: 150
  },
  {
    field: 'buildingsTotal',
    headerName: 'Buildings Total', width: 150,
  },
  {
    field: 'clientId', headerName: 'Client Id', width: 150,
  },
  {

    headerName: 'Country',
    width: 150, field: 'country',
  },
  {
    field: 'createDate', headerName: 'Create Date',
    width: 150,
  },
  {
    headerName: 'Data Date',
    field: 'dataDate',
    width: 150,
  },


  {
    field: 'efforFugitive', width: 150,
    headerName: 'Ef for Fugitive'

  },

  {
    field: 'efofElectricity',
    headerName: 'Ef Of Electricity', width: 150

  },



  {
    field: 'efofEnergy',
    headerName: 'Ef Of Energy', width: 150,
  },
  {
    width: 150, field: 'efofFuel',
    headerName: 'Ef Of Fuel',

  },
  {
    field: 'efofRefrigerant', width: 150,
    headerName: 'Ef Of Refrigerant'

  },
  {
    field: 'emissionFactor',
    headerName: 'Emission Factor', width: 150,
  },

  {
    field: 'emissionsAssetSpecificLevel', width: 150,
    headerName: 'Emissions Asset Specific Level'

  },

  {
    field: 'emissionsAssetTypeBased',
    headerName: 'Emissions Asset Type Based', width: 150,

  },

  {
    field: 'emissionsAssetTypeBuildingSpaceBased', headerName: 'Emissions Asset Type Building SpaceBased',
    width: 150,
  },

  {
    width: 150, field: 'emissionsAtElectricityLevel', headerName: 'Emissions At Electricity Level',

  },
  {
    field: 'emissionsAtFuelLevel', headerName: 'Emissions At Fuel Level', width: 150,
  },


  {
    field: 'emissionsAtFugitiveEmissions',
    headerName: 'Emissions At Fugitive Emissions', width: 150,
  },
  {
    field: 'emissionsDueToLeasedSpace', headerName: 'Emissions Due To Leased Space',
    width: 150,
  },
  {
    width: 150, field: 'floorSpaceOfBuildingType',
    headerName: 'Floor Space Of Building Type',
  },
  {
    field: 'fuelSpend', headerName: 'Fuel Spend',
    width: 150
  },
  {
    field: 'fugitive',
    headerName: 'Fugitive', width: 150,
  },
  {
    field: 'id', headerName: 'ID',
    width: 150,
  },
  {

    headerName: 'Lessee',
    width: 150, field: 'lessee',
  },
  {

    headerName: 'Lessor', field: 'lessor',
    width: 150,
  },
  {

    width: 150, field: 'locationID', headerName: 'locationID',
  },
  {
    field: 'methodName',
    headerName: 'Method Name', width: 150,
  },

  {
    field: 'occupancy', headerName: 'Occupancy',
    width: 150,
  },
  {
    field: 'powerSpendings', headerName: 'Power Spendings', width: 150,
  },

  {
    field: 'qty', headerName: 'Qty',
    width: 150,
  },

  {

    headerName: 'Qty Of Fuel', field: 'qtyOfFuel',
    width: 150,
  },

  {
    field: 'qtyOfRefrigerant', headerName: 'Qty Of Refrigerant', width: 150,
  },
  {
    field: 'refrigerant', headerName: 'Refrigerant',
    width: 150,
  },
  {
    field: 'region',
    headerName: 'Region', width: 150,
  },
  {

    headerName: 'ReportingCompanys', field: 'reportingCompanys',
    width: 150,
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },

  {
    field: 'teamID', headerName: 'Team ID',
    width: 150,
  },

  {
    field: 'teamName', headerName: 'Team Name', width: 150,
  },
  {
    field: 'totalAreaOfLessor',
    headerName: 'Total Area Of Lessor', width: 150,
  },
  {
    field: 'totalBuilding', headerName: 'Total Building', width: 150,
  },

  {
    field: 'totalPower', width: 150, headerName: 'Total Power'
  },

  {
    width: 150,
    field: 'upstreamLeasedAssetsEmission',
    headerName: 'Upstream Leased Assets Emission'
  }
];

export const columnsScope3entity9Records = [

  { headerName: "Reference ID", field: "referenceId" },
  {
    headerName: "BU Name"
    , field: "buName"
  },
  { headerName: "Team Name", field: "teamName" },
  { headerName: "Source Activity", field: "sourceActivity" },
  { headerName: "Destination Activity", field: "destinationActivity" },
  { headerName: "Movement Type", field: "movementType" },
  { headerName: "Region", field: "region" },
  { headerName: "Country", field: "country" },
  { headerName: "Consignment Start Date", field: "consignmentStartDate" },
  { headerName: "Consignment Reach Date", field: "consignmentReachDate" },
  { headerName: "Transaction Date/Month", field: "transactionDate" },
  { headerName: "Network/Leg ID", field: "networkId" },
  { headerName: "Lane Name/ID", field: "laneName" },
  { headerName: "Activity", field: "activity" },
  { headerName: "Sub-Activity", field: "subActivity" },

  { headerName: "Transportation and Distribution Type", field: "transportationAndDistributionType" },
  {
    headerName: "Scope",
    field: "scope"
  },
  { headerName: "Entity", field: "entity" },



  // { headerName: "Region",  ,field:"" },
  // { headerName: "Description",  Remarks: "Optional Field",field:"" },


  {
    headerName: "Goods Quantity(mass)",
    field: "goodsQuantity"
  },
  {
    headerName: "Goods Quantity(mass) unit",
    field: "goodsQuantityUnit"
  },
  {
    headerName: "Goods Volume",
    field: "goodsVolume"
  },
  {
    headerName: "Goods Volume unit",
    field: "goodsVolumeUnit"
  },
  {
    headerName: "Source Location ID(L1)",
    field: "sourceLocationId"
  },
  { headerName: "Source Name", field: "sourceName" },
  { headerName: "Source Address", field: "sourceAddress" },
  { headerName: "Source City", field: "sourceCity" },
  { headerName: "Source Country", field: "sourceCountry" },
  { headerName: "Source Region", field: "sourceRegion" },
  { headerName: "Source Zipcode", field: "sourceZipcode" },
  { headerName: "Source Latitude", field: "sourceLatitude" },
  { headerName: "Source Longitude", field: "sourceLongitude" },
  { headerName: "Source_Node-2 Mode", field: "sourceNode2Mode" },
  { headerName: "Source_Node-2_Vehicle Category", field: "sourceNode2VehicleCategory" },
  { headerName: "Source_Node-2_Vehicle Load", field: "sourceNode2VehicleLoad" },
  { headerName: "Source_Node-2_Vehicle Distance Type", field: "sourceNode2VehicleDistanceType" },
  { headerName: "Source_Node-2_Vehicle ID", field: "sourceNode2VehicleId" },
  { headerName: "Source_Node-2_Fuel Name", field: "sourceNode2FuelName" },
  { headerName: "Source_Node-2_Fuel Type", field: "sourceNode2FuelType" },
  { headerName: "Source_Node-2_Fuel Quantity", field: "sourceNode2FuelQuantity" },
  { headerName: "Source_Node-2_Fuel Quantity Unit", field: "sourceNode2FuelQuantityUnit" },
  { headerName: "Source_Node-2_Fuel Consumption", field: "sourceNode2FuelConsumption" },
  { headerName: "Source_Node-2_Fuel Economy mpl,kmpl", field: "sourceNode2FuelEconomy" },
  { headerName: "Source_Node-2_Distance", field: "sourceNode2Distance" },
  { headerName: "Source_Node-2_Distance Unit", field: "sourceNode2DistanceUnit" },
  { headerName: "Source_Node-2_Cost", field: "sourceNode2Cost" },
  { headerName: "Source_Node-2_Cost unit", field: "sourceNode2CostUnit" },
  { headerName: "Node-2 Location ID", field: "node2LocationId" },
  { headerName: "Node-2 Name", field: "node2Name" },
  { headerName: "Node-2 Address", field: "node2Address" },
  { headerName: "Node-2 City", field: "node2City" },
  { headerName: "Node-2 Country", field: "node2Country" },
  { headerName: "Node-2 Region", field: "node2Region" },
  { headerName: "Node-2 Zipcode", field: "node2Zipcode" },
  { headerName: "Node-2 Longitude", field: "node2Longitude" },
  { headerName: "Node-2 Latitude", field: "node2Latitude" },
  { headerName: "Node-2_Node-3 Mode", field: "node2Node3Mode" },
  { headerName: "Node-2_Node-3 Vehicle Category", field: "node2Node3VehicleCategory" },
  { headerName: "Node-2_Node-3 Vehicle Load", field: "node2Node3VehicleLoad" },
  { headerName: "Node-2_Node-3 Vehicle Distance Type", field: "node2Node3VehicleDistanceType" },
  { headerName: "Node-2_Node-3_Vehicle ID", field: "node2Node3VehicleId" },
  { headerName: "Node-2_Node-3_Fuel Name", field: "node2Node3FuelName" },
  { headerName: "Node-2_Node-3_Fuel Type", field: "node2Node3FuelType" },
  { headerName: "Node-2_Node-3_Fuel Quantity", field: "node2Node3FuelQuantity" },
  { headerName: "Node-2_Node-3_Fuel Quantity Unit", field: "node2Node3FuelQuantityUnit" },
  { headerName: "Node-2_Node-3_Fuel Consumption", field: "node2Node3FuelConsumption" },
  { headerName: "Node-2_Node-3_Fuel Economy mpl,kmpl", field: "node2Node3FuelEconomy" },
  { headerName: "Node-2_Node-3_Distance", field: "node2Node3Distance" },
  { headerName: "Node-2_Node-3_Distance Unit", field: "node2Node3DistanceUnit" },
  { headerName: "Node-2_Node-3_Cost", field: "node2Node3Cost" },
  { headerName: "Node-2_Node-3_Cost unit", field: "node2Node3CostUnit" },
  { headerName: "Node-2 Location ID", field: "node3LocationId" },
  { headerName: "Node-3 Name", field: "node3Name" },
  { headerName: "Node-3 Address", field: "node3Address" },
  { headerName: "Node-3 City", field: "node3City" },
  { headerName: "Node-3 Country", field: "node3Country" },
  { headerName: "Node-3 Region", field: "node3Region" },
  { headerName: "Node-3 Zipcode", field: "node3Zipcode" },
  { headerName: "Node-3 Longitude", field: "node3Longitude" },
  { headerName: "Node-3 Latitude", field: "node3Latitude" },
  { headerName: "Node-3_Destination Mode", field: "node3DestinationMode" },
  { headerName: "Node-3_Destination Vehicle Category", field: "node3DestinationVehicleCategory" },
  { headerName: "Node-3_Destination Vehicle Load", field: "node3DestinationVehicleLoad" },
  { headerName: "Node-3_Destination Vehicle Distance Type", field: "node3DestinationVehicleDistanceType" },
  { headerName: "Node-3_Destination Vehicle ID", field: "node3DestinationVehicleId" },
  { headerName: "Node-3_Destination_Fuel Name", field: "node3DestinationFuelName" },
  { headerName: "Node-3_Destination_Fuel Type", field: "node3DestinationFuelType" },
  { headerName: "Node-3_Destination_Fuel Quantity", field: "node3DestinationFuelQuantity" },
  { headerName: "Node-3_Destination_Fuel Quantity Unit", field: "node3DestinationFuelQuantityUnit" },
  { headerName: "Node-3_Destination_Fuel Consumption", field: "node3DestinationFuelConsumption" },
  { headerName: "Node-3_Destination_Fuel Economy mpl,kmpl", field: "node3DestinationFuelEconomy" },
  { headerName: "Node-3_Destination_Distance", field: "node3DestinationDistance" },
  { headerName: "Node-3_Destination_Distance Unit", field: "node3DestinationDistanceUnit" },
  { headerName: "Node-3_Destination_Cost", field: "node3DestinationCost" },
  { headerName: "Node-3_Destination_Cost unit", field: "node3DestinationCostUnit" },
  { headerName: "Destination Location ID", field: "destinationLocationId" },
  { headerName: "Destination Name", field: "destinationName" },
  { headerName: "Destination Address", field: "destinationAddress" },
  { headerName: "Destination City", field: "destinationCity" },
  { headerName: "Destination Country", field: "destinationCountry" },
  { headerName: "Destination Region", field: "destinationRegion" },
  { headerName: "Destination Zipcode", field: "destinationZipcode" },
  { headerName: "Destination Longitude", field: "destinationLat" },
  { headerName: "Destination Latitude", field: "destinationLong" },
  { headerName: "Total Cost", field: "totalCost" },
  { headerName: "Total Cost Unit", field: "totalCostUnit" },

  { headerName: "BU ID", field: "buID" },

  { headerName: "Team ID", field: "teamID" },
  { headerName: "Data Date", field: "dataDate" },
  { headerName: "Emissions-Source_Node-2", field: "emissionsSourceNode2" },
  { headerName: "Emissions-Node-2_Node-3", field: "emissionsNode2Node3" },
  { headerName: "Emissions-Node-4_Destination", field: "emissionsNode4Destination" },
  { headerName: "Total Emissions", field: "totalEmission" },

];

export const columnsScope3entity10Records = [

  { field: 'activity', headerName: 'Activity' },
  { field: 'amountOfCapitalGoods', headerName: 'Amount Of Capital Goods' },
  { field: 'amountOfFuelUsed', headerName: 'Amount Of Fuel Used' },
  { field: 'amountOfLeakage', headerName: 'Amount Of Leakage' },
  { field: 'amountOfWasteGenerated', headerName: 'Amount Of Waste Generated' },
  { field: 'buID', headerName: 'BU ID' },
  { field: 'buName', headerName: 'BU Name' },
  { field: 'clientId', headerName: 'Client Id' },
  { field: 'country', headerName: 'Country' },
  { field: 'createDate', headerName: 'Create Date' },
  { field: 'dataDate', headerName: 'Data Date' },
  { field: 'dateOfPurchase', headerName: 'Date Of Purchase' },
  { field: 'downstreamProcessingOfSoldProductsEmission', headerName: 'Downstream Processing Of Sold Products Emission' },

  { field: 'e1EmissionsDueToFuelConsumed', headerName: 'E1 Emissions Due To Fuel Consumed' },
  { field: 'e2ElectricityEmissions', headerName: 'E2 Electricity Emissions' },

  {
    field: 'e3RefrigerantEmissions', headerName: 'E3 Refrigerant Emissions'
  },
  {
    field: 'e4WasteOutputEmissions',
    headerName: 'E4 Waste Output Emissions'
  },
  {
    headerName: 'Electricity Source',
    field: 'electricitySource',
  },
  {

    headerName: 'Emission Factor For Electricity', field: 'emissionFactorForElectricity',
  },

  {
    field: 'emissionFactorForFuelSource',
    headerName: 'Emission Factor For Fuel Source'
  },

  {
    field: 'emissionFactorOfRefrigerant', headerName: 'Emission Factor Of Refrigerant'
  },

  {

    headerName: 'Emission Factor Specific To Waste', field: 'emissionFactorSpecificToWaste',
  },
  {
    field: 'fuelType',
    headerName: 'FuelType'
  },
  {
    field: 'id', headerName: 'ID'
  },
  {
    field: 'methodName', headerName: 'Method Name'
  },
  {

    headerName: 'Org Function', field: 'orgFunction',
  },
  {
    field: 'purchaseID', headerName: 'Purchase ID'
  },
  {
    headerName: 'Purchase Reason', field: 'purchaseReason'
  },
  {
    field: 'purchasedGoods',
    headerName: 'Purchased Goods'
  },

  {
    field: 'qtyOfCapitalGoods', headerName: 'Qty Of Capital Goods'
  },

  {
    field: 'quantityOfElectricityConsumed', headerName: 'Quantity Of Electricity Consumed'
  },

  {
    field: 'refrigerantType', headerName: 'Refrigerant Type'
  },
  {
    headerName: 'Region', field: 'region'
  },
  {
    field: 'serviceID', headerName: 'Service ID'

  },
  {
    field: 'serviceType',
    headerName: 'Service Type'
  },
  {

    headerName: 'Sub Activity',
    field: 'subActivity'
  },

  {
    field: 'supplierID', headerName: 'Supplier ID'
  },
  {

    headerName: 'Supplier Name', field: 'supplierName'
  },

  {
    field: 'teamID', headerName: 'Team ID'
  },

  {
    field: 'teamName',
    headerName: 'Team Name'
  },
  {
    field: 'unitAmountOfGoods', headerName: 'Unit Amount Of Goods'
  },
  {

    headerName: 'Vehicle Name', field: 'vehicleName',
  },

  {
    field: 'wasteType', headerName: 'Waste Type'
  }
]

export const columnsScope3entity11Records = [

  {
    field: 'activity',
    headerName: 'Activity',
    width: 150
  },
  {
    field: 'buID', headerName: 'BU ID',
    width: 150
  },
  {
    field: 'buName',
    headerName: 'BU Name', width: 150,
  },

  {
    field: 'clientId', headerName: 'Client Id', width: 150,
  },
  {
    field: 'country', headerName: 'Country',
    width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date', width: 150,
  },
  {
    field: 'dataDate',
    headerName: 'Data Date', width: 150,
  },

  {
    field: 'downstreamUseOfSoldProductsEmission', headerName: 'Downstream Use Of Sold Products Emission',
    width: 150,
  },
  {

    headerName: 'Ef For LeakAge', field: 'efForLeakAge',
    width: 150,
  },

  {

    headerName: 'Ef Of Electricity',
    width: 150, field: 'efOfElectricity',
  },

  {

    headerName: 'Ef Of Fuel',
    width: 150,
    field: 'efOfFuel'
  },



  {
    field: 'electricityUsed',
    headerName: 'Electricity Used', width: 150,
  },
  {
    field: 'emissionFactor', headerName: 'Emission Factor', width: 150,
  },
  {
    field: 'emissionGHGBased', headerName: 'Emission GHG Based',
    width: 150,
  },
  {

    headerName: 'Emissions',
    width: 150, field: 'emissions'
  },

  {
    field: 'emissionsBasedOnProductType', headerName: 'Emissions Based On Product Type', width: 150,
  },

  {
    width: 150, field: 'emissionsDueToElectricity', headerName: 'Emissions Due To Electricity'
  },

  {
    field: 'emissionsDueToFuel',
    headerName: 'Emissions Due To Fuel',
    width: 150,
  },
  {
    field: 'emissionsDueToLeakgae', headerName: 'Emissions Due To Leakgae',
    width: 150,
  },

  {
    field: 'emissionsPerUsageOfIntermediateProduct',
    headerName: 'Emissions Per Usage Of Intermediate Product', width: 150,
  },
  {

    headerName: 'Feed Stock Type',
    width: 150, field: 'feedstockType'
  },

  {

    headerName: 'Fuel Used', field: 'fuelUsed',
    width: 150,
  },
  {
    field: 'ghgPerProduct', headerName: 'Ghg Per Product',
    width: 150,
  },
  {
    field: 'gwp', headerName: 'Gwp', width: 150,
  },
  {
    field: 'gwpOfTheGHG', headerName: 'Gwp Of The GHG',
    width: 150,
  },
  {
    field: 'id',
    headerName: 'ID', width: 150,
  },

  {
    field: 'leakage', headerName: 'Leakage', width: 150,
  },
  {
    field: 'leakagePer',
    headerName: 'Leakage Per', width: 150,
  },
  {
    field: 'methodName', headerName: 'Method Name',
    width: 150,
  },
  {
    field: 'productID', headerName: 'Product ID', width: 150,
  },
  {
    field: 'productName', headerName: 'Product Name', width: 150,
  },
  {
    field: 'qtyOfFuel',
    headerName: 'Qty Of Fuel', width: 150,
  },
  {

    headerName: 'Qty Sold',
    width: 150, field: 'qtySold'
  },

  {
    field: 'refrigerant',
    width: 150,
    headerName: 'Refrigerant'

  },
  {
    width: 150,
    field: 'refrigerantType',
    headerName: 'Refrigerant Type'
  },
  {
    field: 'region', headerName: 'Region',
    width: 150,
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },
  {
    field: 'teamID', headerName: 'Team ID', width: 150,
  },

  {

    headerName: 'Team Name', width: 150, field: 'teamName'
  },
  {
    field: 'totalNoOfUses', headerName: 'Total No Of Uses', width: 150,
  },
  {
    field: 'totalPercentGHGRelease',
    width: 150, headerName: 'Total Percent GHG Release'
  },

  {
    field: 'typeOfEmission', headerName: 'Type Of Emission', width: 150,
  },
  {

    headerName: 'Type Of Goods', field: 'typeOfGoods',
    width: 150
  }
]


export const columnsScope3entity12Records = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  {
    field: 'buID',
    headerName: 'BU ID', width: 150
  },
  {
    field: 'buName', headerName: 'BU Name',
    width: 150,
  },

  {
    field: 'clientId', headerName: 'Client Id', width: 150,
  },
  {
    field: 'country',
    headerName: 'Country', width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date',
    width: 150,
  },
  {
    headerName: 'ID', field: 'id',
    width: 150
  },

  {
    field: 'massOfWaste', headerName: 'Mass Of Waste', width: 150,
  },
  {
    headerName: 'Mass Of Waste Unit',
    field: 'massOfWasteUnit',
    width: 150
  },
  {

    headerName: 'Method Name',
    width: 150,
    field: 'methodName'
  },
  {
    field: 'percentOfMassTreatment',
    width: 150,
    headerName: 'Percent Of Mass Treatment'

  },
  {
    field: 'region', headerName: 'Region',
    width: 150
  },
  {
    width: 150,
    field: 'scope1and2EmissionByWasteTreatmentCompany',
    headerName: 'Scope 1 and 2 Emission By Waste Treatment Company'

  },
  {

    field: 'subActivity',
    width: 150,
    headerName: 'Sub Activity',
  },
  {

    headerName: 'Team ID',
    width: 150, field: 'teamID',
  },

  {
    field: 'teamName', headerName: 'Team Name',
    width: 150,
  },
  {
    field: 'totalEmissions', headerName: 'Total Emissions', width: 150,
  },
  {
    field: 'treatmentMethod',
    headerName: 'Treatment Method', width: 150,
  },

  {
    field: 'wasteName', headerName: 'Waste Name',
    width: 150,
  },
  {
    field: 'wasteTreatmentCompany',
    headerName: 'Waste Treatment Company', width: 150,
  },
  {
    field: 'wasteType', headerName: 'Waste Type', width: 150,
  }
]

export const columnsScope3entity13Records = [

  {
    field: 'activity',
    headerName: 'Activity',
    width: 150
  },
  {
    field: 'areaOfLessorUsedByLessi', headerName: 'Area Of Lessor Used By Lessi',
    width: 150
  },
  {
    field: 'asset',
    headerName: 'Asset', width: 150
  },
  {
    field: 'assetType', headerName: 'Asset Type', width: 150
  },
  {
    field: 'averageEmissionFactor',
    headerName: 'Average Emission Factor',
    width: 150
  },
  {
    headerName: 'Avg Fuel', width: 150,
    field: 'avgFuel'
  },
  {
    field: 'avgPower',
    headerName: 'Avg Power', width: 150
  },

  { headerName: 'BU ID', width: 150, field: 'buID' },
  {
    field: 'buName', headerName: 'BU Name', width: 150,
  },
  {
    field: 'buildingsTotal', headerName: 'Buildings Total',
    width: 150,
  },
  {
    field: 'clientId',
    headerName: 'Client Id', width: 150,
  },
  {
    field: 'country', headerName: 'Country', width: 150,
  },
  {

    headerName: 'Create Date',
    field: 'createDate',
    width: 150,
  },
  {

    headerName: 'Data Date',
    width: 150,
    field: 'dataDate'
  },
  {
    headerName: 'Downstream Leased Assets Emission',
    field: 'downstreamLeasedAssetsEmission',
    width: 150,
  },


  {
    field: 'efforFugitive',
    headerName: 'Ef for Fugitive', width: 150,
  },

  {
    field: 'efofElectricity', headerName: 'Ef Of Electricity',
    width: 150,
  },



  {
    field: 'efofEnergy',
    headerName: 'Ef Of Energy', width: 150,
  },
  {
    field: 'efofFuel', headerName: 'Ef Of Fuel',
    width: 150,
  },
  {
    field: 'efofRefrigerant', headerName: 'Ef Of Refrigerant', width: 150,
  },
  {
    field: 'emissionFactor', headerName: 'Emission Factor',
    width: 150,
  },

  {
    field: 'emissionsAssetSpecificLevel',
    headerName: 'Emissions Asset Specific Level', width: 150,
  },

  {
    field: 'emissionsAssetTypeBased', headerName: 'Emissions Asset Type Based', width: 150,
  },

  {

    headerName: 'Emissions Asset Type Building SpaceBased', field: 'emissionsAssetTypeBuildingSpaceBased',
    width: 150,
  },

  {
    field: 'emissionsAtElectricityLevel',
    width: 150,
    headerName: 'Emissions At Electricity Level',

  },
  {
    headerName: 'Emissions At Fuel Level',
    field: 'emissionsAtFuelLevel',
    width: 150
  },


  {
    field: 'emissionsAtFugitiveEmissions', headerName: 'Emissions At Fugitive Emissions',
    width: 150,
  },
  {
    field: 'emissionsDueToLeasedSpace',
    headerName: 'Emissions Due To Leased Space', width: 150,
  },
  {

    headerName: 'Floor Space Of Building Type', field: 'floorSpaceOfBuildingType',
    width: 150,
  },
  {

    headerName: 'Fuel Spend',
    width: 150, field: 'fuelSpend',
  },
  {

    field: 'fugitive', headerName: 'Fugitive',
    width: 150,
  },
  {
    field: 'id', width: 150,
    headerName: 'ID',

  },
  {
    field: 'lessee',
    headerName: 'Lessee',
    width: 150,
  },
  {

    headerName: 'Lessor',
    width: 150,
    field: 'lessor',
  },
  {
    field: 'locationID', headerName: 'locationID',
    width: 150,
  },
  {
    field: 'methodName',
    headerName: 'Method Name', width: 150,
  },

  {
    field: 'occupancy', headerName: 'Occupancy',
    width: 150,
  },
  {
    field: 'powerSpendings',
    width: 150,
    headerName: 'Power Spendings',
  },

  {
    field: 'qty', headerName: 'Qty',
    width: 150,
  },

  {

    headerName: 'Qty Of Fuel',
    width: 150, field: 'qtyOfFuel',
  },

  {
    field: 'qtyOfRefrigerant', headerName: 'Qty Of Refrigerant',
    width: 150,
  },
  {
    field: 'refrigerant',
    headerName: 'Refrigerant', width: 150,
  },
  {
    field: 'region',
    headerName: 'Region',
    width: 150,
  },
  {
    field: 'reportingCompanys', headerName: 'ReportingCompanys', width: 150,
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },

  {
    field: 'teamID', width: 150,
    headerName: 'Team ID',

  },

  {
    field: 'teamName', headerName: 'Team Name',
    width: 150,
  },
  {
    width: 150,
    field: 'totalAreaOfLessor',
    headerName: 'Total Area Of Lessor',

  },
  {
    field: 'totalBuilding',

    width: 150,
    headerName: 'Total Building',
  },

  {

    headerName: 'Total Power',
    width: 150,
    field: 'totalPower',
  }
];


export const columnsScope3entity14Records = [

  {
    field: 'activity',
    headerName: 'Activity',
    width: 150
  },
  {
    field: 'avgEf', headerName: 'Avg Ef',
    width: 150
  },
  {
    field: 'avgEfOfAsset',
    headerName: 'Avg Ef Of Asset', width: 150
  },
  { headerName: 'Avg Fuel Price', width: 150, field: 'avgFuelPrice', },
  {
    field: 'buID', width: 150,
    headerName: 'BU ID',
  },
  {
    field: 'buName', headerName: 'BU Name',
    width: 150,
  },
  {

    headerName: 'Buildings Total Area',
    width: 150,
    field: 'buildingsTotalArea',
  },
  {
    width: 150,
    field: 'buildingsTotalEnergyUse',
    headerName: 'BuildingsTotalEnergyUse',

  },
  {

    headerName: 'Client Id',
    field: 'clientId',
    width: 150,
  },
  {
    field: 'country', headerName: 'Country', width: 150,
  },
  {
    field: 'createDate', headerName: 'Create Date',
    width: 150,
  },
  {
    field: 'dataDate',
    headerName: 'Data Date', width: 150,
  },
  {
    field: 'downstreamFranchisesEmission', headerName: 'Downstream Franchises Emission', width: 150,
  },

  {
    field: 'efOfEnergy', headerName: 'Ef Of Energy',
    width: 150,
  },
  {

    headerName: 'Ef Of Fuel',
    width: 150, field: 'efOfFuel',
  },
  {
    field: 'efOfFugitive', headerName: 'Ef Of Fugitive', width: 150,
  },
  {
    field: 'efOfRefriGerant', headerName: 'Ef Of RefriGerant',
    width: 150,
  },


  {
    field: 'emissions',
    width: 150,
    headerName: 'Emissions',

  },

  {

    headerName: 'Emissions Due To Asset',
    width: 150,
    field: 'emissionsDueToAsset',
  },



  {
    width: 150,
    field: 'emissionsDueToAvgDataMethod',
    headerName: 'Emissions Due To Avg Data Method',

  },
  {
    field: 'emissionsDueToElectricity', width: 150,
    headerName: 'Emissions Due To Electricity',

  },
  {
    field: 'emissionsDueToFloorSpace',
    headerName: 'Emissions Due To Floor Space', width: 150,
  },
  {
    field: 'emissionsDueToFranchiseSpecifcMethod', headerName: 'Emissions Due To Franchise Specifc Method',
    width: 150,
  },

  {

    headerName: 'Emissions Due To Fugitive Emissions',
    width: 150, field: 'emissionsDueToFugitiveEmissions',
  },

  {
    field: 'emissionsDueToLeakage', headerName: 'Emissions Due To Leakage', width: 150,
  },

  {
    field: 'energyUse', headerName: 'Energy Use', width: 150,
  },

  {
    field: 'floorSpace', headerName: 'Floor Space', width: 150,
  },
  {
    field: 'franchiseAsset', width: 150, headerName: 'Franchise Asset',
  },


  {
    field: 'franchisee', headerName: 'Franchisee', width: 150,
  },
  {

    headerName: 'Franchises Area',
    field: 'franchisesArea',
    width: 150,
  },
  {
    width: 150, field: 'franchisor', headerName: 'Franchisor',

  },
  {
    field: 'fuelSpend', headerName: 'Fuel Spend', width: 150,
  },
  {
    field: 'fugitiveConsumption', headerName: 'Fugitive Consumption',
    width: 150,

  },
  {
    headerName: 'ID',
    width: 150,
    field: 'id',
  },
  {
    field: 'methodName', headerName: 'Method Name',
    width: 150,
  },

  {
    field: 'occupancyRate',
    headerName: 'Occupancy Rate', width: 150,
  },
  {
    field: 'qtyOfAsset', headerName: 'Qty Of Asset',
    width: 150,
  },

  {
    field: 'qtyOfRefriGerant', headerName: 'Qty Of RefriGerant', width: 150,
  },

  {
    field: 'refrigerantType',
    width: 150,
    headerName: 'Refrigerant Type',

  },
  {

    headerName: 'Region', field: 'region',
    width: 150,
  },
  {
    field: 'subActivity',
    headerName: 'Sub Activity', width: 150,
  },

  {
    field: 'teamID', headerName: 'Team ID',
    width: 150,
  },

  {
    width: 150, field: 'teamName', headerName: 'Team Name',

  },
  {

    headerName: 'Total Emissions Due To Fuel',
    width: 150,
    field: 'totalEmissionsDueToFuel',
  }
];


export const columnsScope3entity15Records = [

  { field: 'activity', headerName: 'Activity', width: 150 },
  {
    field: 'buID',
    headerName: 'BU ID',
    width: 150
  },
  {
    field: 'buName', headerName: 'BU Name', width: 150,
  },
  {
    headerName: 'Client Id', width: 150, field: 'clientId',
  },
  {
    field: 'country', headerName: 'Country',
    width: 150,
  },
  {
    field: 'createDate',
    headerName: 'Create Date', width: 150,
  },
  {

    headerName: 'Data Date',
    width: 150, field: 'dataDate',
  },
  {
    width: 150,
    field: 'downstreamInvestmentsEmission',
    headerName: 'Downstream Investments Emission',

  },
  {
    field: 'id', headerName: 'ID', width: 150,
  },
  {
    width: 150, field: 'investee', headerName: 'Investee',
  },
  {
    field: 'investeeCompanysSectorOfOperation', headerName: 'Investee Companys Sector Of Operation', width: 150,
  },
  {
    field: 'investmentType', width: 150, headerName: 'Investment Type',

  },
  {
    field: 'investor', headerName: 'Investor', width: 150,
  },
  {
    field: 'methodName',
    width: 150,
    headerName: 'Method Name',
  },

  {
    width: 150, field: 'projectConstructionCostOrProjectRevenue',
    headerName: 'Project Construction Cost Or ProjectRevenue',

  },
  {
    field: 'projectPhase', headerName: 'Project Phase',
    width: 150,
  },
  {
    field: 'region',
    headerName: 'Region', width: 150,
  },
  {
    field: 'relevantEEIOSector', headerName: 'Relevant EEIO Sector',
    width: 150,
  },

  {

    headerName: 'Scope 1 Emissions',
    field: 'scope1Emissions',
    width: 150,
  },
  {
    field: 'scope2EmissionsOf', headerName: 'Scope 2 Emissions Of',
    width: 150,
  },
  {
    field: 'shareOfEquity', headerName: 'Share Of Equity', width: 150,
  },
  {
    headerName: 'Share Of Total Project Cost', field: 'shareOfTotalProjectCost', width: 150,
  },
  {
    field: 'subActivity', headerName: 'Sub Activity',
    width: 150,
  },

  {
    field: 'teamID', headerName: 'Team ID',
    width: 150,
  },

  {
    field: 'teamName',
    headerName: 'Team Name', width: 150,
  },
  {

    headerName: 'Total Emissions', field: 'totalEmissions',
    width: 150,
  },
  {
    field: 'totalProjectCost', width: 150,
    headerName: 'Total Project Cost',

  },

  {
    field: 'totalRevenueOfInvestee',
    headerName: 'Total Revenue Of Investee', width: 150,
  },
  {
    field: 'typeOfProject', headerName: 'Type Of Project',
    width: 150,
  }
];
export const rows = [
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },
  { Scope: 'S3-9', entity: 'Downstream Transportation ', Region: "APAC", Country: "India", buId: "Contoso Africa HQ", teamID: "Contoso Africa", activity: "Commercial Transport" },

];