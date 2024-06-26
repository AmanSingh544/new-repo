import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Paper,
} from "@mui/material";
import React, { useContext } from "react";
import "./entityTable.scss";
import Loader from "src/components/loader";
import AuthContext from "src/components/dashboard/entityManagement/entity-management-common/table/defaultContext";
import Tooltip from "@mui/material/Tooltip";
import utils from "src/utils";
import { useTranslation } from 'react-i18next';

export const EntityTable = ({
  count,
  rowsPerPage,
  page,
  scope,
  entity,
  handleChangePage,
  handleChangeRowsPerPage,
  rows,
  columns,
  loading,
  outSideClick,
}) => {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const drawerState = useContext(AuthContext);
  const { t } = useTranslation();
  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const titleFunc = (field, value) => {
    if (field === "createDate") {
      return dateFinder(value);
    }
    else if (field === "scope") {
      return scope;
    }
    else if (field === "entity") {
      return entity;
    }
    else if (value) {
      return value;
    }
    else {
      return "NA";
    }
  }

  const handleUnselect = () => {
    setSelectedRow(null);
  };

  React.useEffect(() => {
    handleUnselect();
  }, [outSideClick]);

  const dateFinder = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  if (loading) {
    return (
      <div style={{ height: "80vh" }}>
        <Loader size={30} />
      </div>
    );
  } else if (!loading && !rows.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItem: "center",
          margin: "auto",
          width: "100%",
          height: "80vh",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <h4
          style={{ textAlign: "center", marginTop: "10px", fontWeight: "400", fontFamily: "Inter", }}
        >
          {"No data found."}
        </h4>
      </div>
    );
  } else {
    return (
      <div className="entityTableMain">
        <Box className="entityTableContainer" sx={{ borderRadius: "15px" }}>
          <Paper
            elevation={0}
            sx={{
              background: "#FFFFFF",
              boxShadow: "0px 0px 50px rgb(0 0 0 / 9%)",
              borderRadius: "15px",
              width: drawerState.open
                ? `calc(100vw - 263px)`
                : `calc(100vw - 100px)`,
            }}
          >
            <Table
              stickyHeader
              sx={{
                width: drawerState.open
                  ? `calc(100vw - 263px)`
                  : `calc(100vw - 100px)`,
                display: "block",
                overflowX: "auto",
                minHeight: "76vh",
                maxHeight: "500px",
                borderRadius: "15px",
              }}
              className={"entityTableClass"}
            >
              <TableHead className="entityTableHead">
                <TableRow>
                  {columns?.map((column, key) => (

                    <>
                      {
                        console.log("columncolumnjjjjj", column)
                      }
                      <TableCell
                        key={utils.commonFunctions.keyFinder()}
                        style={{
                          minWidth: "200px ",
                          fontWeight: 600,
                          fontFamily: "Inter",
                          background: "#F5F5F5",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          borderRight: "1.8px solid #CDCDCD",
                        }}
                        align="left"
                        onClick={() => {
                          handleRowClick(column.field);
                        }}
                        className={`${selectedRow === column.field ? "activeheader" : ""
                          }`}
                      >
                        <Tooltip
                          title={column.headerName?.split(" ")
                            .map((data) => {
                              const str = data;
                              const str2 =
                                str.charAt(0).toUpperCase() + str.slice(1);
                              return str2;
                            })
                            .join(" ")}
                          arrow
                          placement="top-start"
                        >
                          <span
                            style={{ fontFamily: "Inter", }}
                            className={
                              column.headerName?.length > 20
                                ? "ellipsis-span"
                                : ""
                            }
                          >
                            {column.headerName?.split(" ")
                              .map((data) => {
                                const str = data;
                                const str2 =
                                  str.charAt(0).toUpperCase() + str.slice(1);
                                return str2;
                              })
                              .join(" ")}
                          </span>
                        </Tooltip>
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && Object.keys(rows).length > 0 ? (
                  rows?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns?.map((column) => {
                          const value = row[column.field];
                          return (
                            <TableCell
                              sx={{ whiteSpace: "nowrap" }}
                              className={`${selectedRow === column.field ? "activerow" : ""
                                }`}
                              align="left"
                              key={utils.commonFunctions.keyFinder()}
                            >
                              <Tooltip
                                title={titleFunc(column.field, value)}
                                arrow
                                placement="top-start"
                              >
                                <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: "400" }}
                                  className={
                                    value?.length > 20 ? "ellipsis-span" : ""
                                  }
                                >
                                  {titleFunc(column.field, value)}
                                </span>
                              </Tooltip>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan={9} className="buttonCell">
                      {t("noResultFound")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        <div
          className="table-pagination"
          onClick={() => handleUnselect()}
          style={{ width: "100%" }}
        >
          <div
            className="pageNavi"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => handleUnselect()}
          >
            <TablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
              showFirstButton={true}
              showLastButton={true}
              color="primary"
              size="small"
              labelDisplayedRows={({ from, to, count, page }) => {
                return `${from}-${to} of ${count} (${Math.ceil(
                  count / rowsPerPage
                )} pages)`;
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 'auto',
                      marginTop: "-40px"
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div >
    );
  }
};
