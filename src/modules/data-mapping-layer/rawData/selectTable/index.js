import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { dmlActions } from 'src/modules/dml/dml-actions/index';
import utils from "src/utils";

function createData(
  RuleName,
  ScopeCategory,
  RuleStatus,
  AddedBy,
  CreatedOn,
  StatusEditedOn
) {
  return {
    RuleName,
    ScopeCategory,
    RuleStatus,
    AddedBy,
    CreatedOn,
    StatusEditedOn,
  };
}

const rows = [
  createData(
    "Scope 3.9 Data Mapping",
    "S3.9",
    "Active",
    "Ashvin",
    "17 Mar, 2023   07:00",
    "17 Mar, 2023   07:00"
  ),
];

const headCells = [
  {
    id: "RuleName", numeric: false,
    label: "Rule Name ",
  },
  {
    id: "ScopeCategory",numeric: true,
    disablePadding: false,
    label: "Scope Category",
  },
  {
    id: "RuleStatus",
    numeric: true, disablePadding: false,
    label: "Rule Status",
  },
  {
    id: "AddedBy",
    numeric: true, disablePadding: false, label: "Added By",
  },
  {
    id: "CreatedOn", numeric: true,  disablePadding: false, label: "Created On",
  },
  {
    id: "StatusEditedOn",
    numeric: true,
    disablePadding: false,
    label: "Status Edited On",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
  } = props;

  return (
    <TableHead>
      <TableRow style={{ borderBottom: "1px solid #B7B7B7" }}>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            style={{
              padding: "15px",
              fontWeight: "400",
              fontSize: "15px",
              lineHeight: "18px",
              color: "#1C1C1",
            }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
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

export default function EnhancedTable({ handleRuleRowClick }) {
  const { selectedRule } = useSelector((state) => state.dmlReducer);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState(selectedRule ?? []);
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const { setSelectedRule } = dmlActions;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.RuleName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, RuleName) => {
    const selectedIndex = selected.indexOf(RuleName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, RuleName);
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
    dispatch(setSelectedRule(newSelected))
  };



  const isSelected = (RuleName) => selected.indexOf(RuleName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleOnClickRuleRow = (e) => {
    if (e?.target?.checked) {
      handleRuleRowClick(e?.target?.checked)
    }
  }

  return (
    <Box sx={{ width: "100%" }} className="selectTable">
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {utils.commonFunctions.stableSort(rows, utils.commonFunctions.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.RuleName);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(rows, "SelectTableRows")
                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        // handleClick(event, row.RuleName)
                      }
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.RuleName}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        style={{ borderBottom: "none" }}
                      >
                        <Checkbox
                          color="success"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onChange={(e) => { handleOnClickRuleRow(e); handleClick("", row.RuleName) }}
                        />
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.RuleName}
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.ScopeCategory}
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.RuleStatus}
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.AddedBy}
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.CreatedOn}
                      </TableCell>
                      <TableCell align="left" style={{ borderBottom: "none" }}>
                        {row.StatusEditedOn}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
