import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import utils from "src/utils";

const rows = [
  {
    Scope: "Scope",
    Uploaded: "",
    Remarks: "Default",
  },
  { Scope: "Entity", Uploaded: "", Remarks: "Default" },
  { Scope: "Region", Uploaded: "", Remarks: "Reference BU ID attributes" },
  { Scope: "Country", Uploaded: "", Remarks: "Reference BU ID attributes" },
  { Scope: "BU ID", Uploaded: "", Remarks: "Validation against  BU Name" },
  {
    Scope: "BU Name",
    Uploaded: "BU_MAPPED",
    Remarks: "I/p from Raw Data to be validated with BU details from IAM",
  },
  { Scope: "Team ID", Uploaded: "", Remarks: "" },
  { Scope: "Team Name", Uploaded: "", Remarks: "" },
  { Scope: "Activity", Uploaded: "", Remarks: "Transportation(Hard Coded Value)" },
  { Scope: "Sub-Activity", Uploaded: "Primary_Mode", Remarks: "" },
  { Scope: "Reference ID", Uploaded: "Primay_Mode - Shipment Number", Remarks: "" },
  { Scope: "Transportation and Distribution Type", Uploaded: "", Remarks: "Transportation(Hard Coded Value)" },

  { Scope: "Consignment Start Date", Uploaded: "", Remarks: "" },
  { Scope: "Consignment Reach Date", Uploaded: "", Remarks: "" },
  { Scope: "Transaction Date/Month", Uploaded: "", Remarks: "Derived Value" },
  { Scope: "Network/Leg ID", Uploaded: "Network", Remarks: "Optional Field" },
  { Scope: "Lane Name/ID", Uploaded: "Pickup_City - Delivery_City", Remarks: "Optional Field" },

  {
    Scope: "Goods Quantity(mass)",
    Uploaded: "Gross_Weight",
    Remarks: "",
  },
  {
    Scope: "Goods Quantity(mass) unit",
    Uploaded: "",
    Remarks: "KG",
  },
  {
    Scope: "Goods Volume",
    Uploaded: "Volumn(cbm)",
    Remarks: "",
  },
  {
    Scope: "Goods Volume unit",
    Uploaded: "",
    Remarks: "",
  },
  {
    Scope: "Source Location ID(L1)",
    Uploaded: "",
    Remarks: "",
  },
  { Scope: "Source Name", Uploaded: "Shipper_Name", Remarks: "" },
  { Scope: "Source Address", Uploaded: "", Remarks: "" },
  { Scope: "Source City", Uploaded: "Pickup_City", Remarks: "" },
  { Scope: "Source Country", Uploaded: "Pickup_Contry", Remarks: "" },
  { Scope: "Source Region", Uploaded: "", Remarks: "" },
  { Scope: "Source Zipcode", Uploaded: "Pickup_Zip_Code", Remarks: "" },
  { Scope: "Source Latitude", Uploaded: "", Remarks: "" },
  { Scope: "Source Longitude", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2 Mode", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Vehicle Category", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Vehicle Load", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Vehicle Distance Type", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Vehicle ID", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Name", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Type", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Quantity", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Quantity Unit", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Consumption", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Fuel Economy mpl,kmpl", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Distance", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Distance Unit", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Cost", Uploaded: "", Remarks: "" },
  { Scope: "Source_Node-2_Cost unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Location ID", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Name", Uploaded: "Origin_Airport or Origin_Port", Remarks: "Depends on Node-2_Node-3 Mode" },
  { Scope: "Node-2 Address", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 City", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Country", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Region", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Zipcode", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Longitude", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Latitude", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3 Mode", Uploaded: "Primary_Mode", Remarks: "" },
  { Scope: "Node-2_Node-3 Vehicle Category", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3 Vehicle Load", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3 Vehicle Distance Type", Uploaded: "", Remarks: "Depends on Distance" },
  { Scope: "Node-2_Node-3_Vehicle ID", Uploaded: "", Remarks: "Depends on Node-2_Node-3_Mode" },
  { Scope: "Node-2_Node-3_Fuel Name", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Fuel Type", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Fuel Quantity", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Fuel Quantity Unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Fuel Consumption", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Fuel Economy mpl,kmpl", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Distance", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Distance Unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Cost", Uploaded: "", Remarks: "" },
  { Scope: "Node-2_Node-3_Cost unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-2 Location ID", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Name", Uploaded: "Destination_Airport or Destination_port", Remarks: "" },
  { Scope: "Node-3 Address", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 City", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Country", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Region", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Zipcode", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Longitude", Uploaded: "", Remarks: "" },
  { Scope: "Node-3 Latitude", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination Mode", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination Vehicle Category", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination Vehicle Load", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination Vehicle Distance Type", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination Vehicle ID", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Name", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Type", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Quantity", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Quantity Unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Consumption", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Fuel Economy mpl,kmpl", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Distance", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Distance Unit", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Cost", Uploaded: "", Remarks: "" },
  { Scope: "Node-3_Destination_Cost unit", Uploaded: "", Remarks: "" },
  { Scope: "Destination Location ID", Uploaded: "Consignee_Name", Remarks: "" },
  { Scope: "Destination Name", Uploaded: "Consignee_Name", Remarks: "" },
  { Scope: "Destination Address", Uploaded: "", Remarks: "" },
  { Scope: "Destination City", Uploaded: "Delivery_City", Remarks: "" },
  { Scope: "Destination Country", Uploaded: "Delivery_Country", Remarks: "" },
  { Scope: "Destination Region", Uploaded: "", Remarks: "" },
  { Scope: "Destination Zipcode", Uploaded: "Delivery_Zip_Code", Remarks: "" },
  { Scope: "Destination Longitude", Uploaded: "", Remarks: "" },
  { Scope: "Destination Latitude", Uploaded: "", Remarks: "" },
  { Scope: "Source Activity", Uploaded: "", Remarks: "Look up for Source Name in reference file and fetch the activity details" },
  { Scope: "Destination Activity", Uploaded: "", Remarks: "Look up for Destination Name in reference file and fetch the activity details" },
  { Scope: "Movement Type", Uploaded: "", Remarks: "Depends on Source and Destination Activities" },
  { Scope: "Total Cost", Uploaded: "Total_Amount", Remarks: "" },
  { Scope: "Total Cost Unit", Uploaded: "Currency_Code", Remarks: "" },
  { Scope: "Emissions-Source_Node-2", Uploaded: "", Remarks: "" },
  { Scope: "Emissions-Node-2_Node-3", Uploaded: "", Remarks: "" },
  { Scope: "Emissions-Node-4_Destination", Uploaded: "", Remarks: "" },
  { Scope: "Total Emissions", Uploaded: "", Remarks: "" },
  { Scope: "Data Date", Uploaded: "Actual_Pickup_Date or Actual_Arrival_Date", Remarks: "" },
];

const headCells = [
  {
    id: "Scope",
    numeric: true,
    disablePadding: false,
    label: "Scope 3  Structured  Data Headers",
  },
  {
    id: "Uploaded",
    numeric: true,
    disablePadding: false,
    label: "Uploaded Raw Data Header",
  },
  {
    id: "Remarks",
    numeric: true,
    disablePadding: false,
    label: "Remarks",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
  } = props;

  return (
    <TableHead className="table-header"  >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              fontWeight: "500",
              fontSize: "15px",
              lineHeight: "18px",
              color: " #1C1C1C",
            }}
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={true}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between"

              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" >
                  {" "}
                  {headCell.label}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Box>
              </Box>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);

  const handleClick = (event, Scope) => {
    const selectedIndex = selected.indexOf(Scope);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Scope);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const navigate = useNavigate()

  return (
    <div className="data-mapping-container">
      <Box display="flex" justifyContent="space-between">
        <p className="scope">{t("rule1Scope3DataMapping")}</p>
        <Box
          sx={{
            background: "#D9D9D9",
            padding: "5px",
            paddingBottom: "0px",
            height: "30px",
          }}
          onClick={() => navigate(-1)}
        >
          <FaTimes style={{ fontSize: "20px" }} />
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }} className="table-container">
          <TableContainer className="table-container" sx={{ height: "80vh" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                rowCount={rows.length}
              />
              <TableBody>
                {utils.commonFunctions.stableSort(rows, utils.commonFunctions.getComparator(order))
                  .map((row) => {

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.Scope)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.Scope}
                      >
                        <TableCell>{row.Scope}</TableCell>
                        <TableCell align="left">{row.Uploaded}</TableCell>
                        <TableCell align="left">{row.Remarks}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
