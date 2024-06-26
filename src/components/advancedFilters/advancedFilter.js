import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  Tooltip,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { Close } from '@mui/icons-material';
import './advancedFilter.scss';
import FilterButton from './filterComponents/filterButton';
import FilterTable from './filterComponents/filterTable';
import FilterChips from './filterComponents/filterChips';
import ResetIcon from "src/assets/images/reset-icon.svg";

const AdvancedFilterComponent = ({ headers, onApply }) => {
  // State for dialog visibility
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // State for rows and filter options
  const [rows, setRows] = useState([{ id: 1, header: '', value: '', field: '' }]);
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);

  // Dropdown options derived from headers prop
  const dropdownOptions = Object.values(headers);

  // Handler for opening and closing the dialog
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Handlers for adding, updating, and removing rows
  const handleAddRow = useCallback(() => {
    const newRow = { id: rows.length + 1, header: '', value: '', field: '' };
    setRows([...rows, newRow]);
  }, [rows]);

  const handleRemoveRow = useCallback(
    (idToRemove) => {
      const updatedRows = rows.filter((row) => row.id !== idToRemove);
      setRows(updatedRows.length > 0 ? updatedRows : [{ id: 1, header: '', value: '' }]);
      validateInputs(updatedRows);
    },
    [rows]
  );

  const handleHeaderChange = useCallback(
    (id, newValue, field) => {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          row.header = newValue;
          row.field = field;
        }
        return row;
      });
      setRows(updatedRows);
      validateInputs(updatedRows);
    },
    [rows]
  );

  const handleValueChange = useCallback(
    (id, newValue) => {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          row.value = newValue;
        }
        return row;
      });
      setRows(updatedRows);
      validateInputs(updatedRows);
    },
    [rows]
  );

  // Validate rows to enable or disable the apply button
  const validateInputs = useCallback((updatedRows) => {
    const isValid = updatedRows.some((row) => row.header && row.value);
    setIsApplyDisabled(!isValid);
  }, []);

  // Handler for applying filters
  const handleApply = useCallback(() => {
    setOpen(false);
    const filterApply = rows.filter((row) => row.header !== '');
    setAppliedFilters(filterApply);
    setBadgeCount(filterApply.length);
    onApply(filterApply);
    setIsApplyDisabled(true);
  }, [onApply, rows]);

  // Handler for removing a specific filter (chip)
  const handleChipRemove = useCallback(
    (filterToRemove) => {
      const updatedFilters = appliedFilters.filter(
        (filter) => !(filter.header === filterToRemove.header && filter.value === filterToRemove.value)
      );
      setAppliedFilters(updatedFilters);
      setRows(updatedFilters.length > 0 ? updatedFilters : [{ id: 1, header: '', value: '' }]);
      setBadgeCount(updatedFilters.length);
      onApply(updatedFilters);
    },
    [appliedFilters, onApply]
  );

  // Handler for clearing all filters
  const clearAll = useCallback(() => {
    setOpen(false);
    setRows([{ id: 1, header: '', value: '' }]);
    setAppliedFilters([]);
    setIsApplyDisabled(true);
    setBadgeCount(0);
    onApply([]);
  }, [onApply]);

  const removeAll = () =>{
    setRows([{ id: 1, header: '', value: '' }]);
  };

  return (
    <>
      <Box className="advanced-filter-container">
        {/* Filter Button */}
        <FilterButton badgeCount={badgeCount} handleOpen={handleOpen} />

        {/* Applied Filters Chips */}
        {appliedFilters.length > 0 && (
          <FilterChips appliedFilters={appliedFilters} handleChipRemove={handleChipRemove} />
        )}

        {/* Clear All Button */}
        {appliedFilters.length > 0 && (
          // <Box style={{
          //   display: 'flex',
          //   alignItems: 'center',
          //   marginTop: '8px',
          //   marginBottom: '2px',
          //   marginLeft: '15px',
          // }}>
          //   <Button style={{
          //       backgroundColor: 'dimgrey',
          //       color: 'white',
          //       padding: '6px 10px',
          //       borderRadius: '5px',
          //       fontSize: '15px',
          //       fontWeight: "500",
          //       textTransform: "capitalize",
          //       gap: '6px',
          //     }} 
          //     onClick={clearAll}>
          //     Clear All
          //   </Button>
          // </Box>
          <Tooltip title={"Reset Filters"} placement="right-start" arrow>
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                marginLeft: "5px",
                padding: "5px 10px",
                background: "#b1000e",
                borderRadius: "3px",
              }}
              onClick={clearAll}
            >
              <img src={ResetIcon} alt="reset icon" />
            </div>
          </Tooltip>
        )}
      </Box>

      {/* Filter Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{
        height: '30rem',left:'10rem' // Set the maxHeight to 70% of the viewport height (vh)
       // overflowY: 'auto', // Add vertical overflow auto scrolling for content that exceeds maxHeight
    }}>
        <DialogTitle style={{ padding: '16px 24px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* <Typography style={{ flex: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>
            </Typography> */}
            <Grid item className='filterHeadingText' >
              {t("inThisViewShowRecords")}
            </Grid>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        {/* Filter Table */}
        <DialogContent sx={{ padding: '0px' }}>
          <FilterTable
            rows={rows}
            dropdownOptions={dropdownOptions}
            handleHeaderChange={handleHeaderChange}
            handleValueChange={handleValueChange}
            handleAddRow={handleAddRow}
            handleRemoveRow={handleRemoveRow}
          />
        </DialogContent>

        <DialogActions>
          <div style={{
            display: "flex",
            justifyContent: "end", width: "100%"
          }}>
            <Button style={{
              padding: "10px 25px",
              background: "#D9D9D9",
              borderRadius: "3px",
              fontWeight: "500",
              marginRight:'10px',
              fontSize: "15px",
              textTransform: "capitalize",
              color: "#4f4f4f",
              gap: '6px',
              lineHeight: '17px',
            }} 
            onClick={clearAll}>
              Remove All
            </Button>

            <Button
              aria-disabled
              style={{
                padding: "10px 25px",
                background: !isApplyDisabled ? "#b1000e" : "#4f4f4f",
                borderRadius: "3px",
                fontWeight: "500",
                fontSize: "15px",
                textTransform: "capitalize",
                color: "#ffffff",
                cursor: isApplyDisabled ? 'not-allowed' : 'pointer',
                gap: '6px',
                lineHeight: '17px',
              }}
              onClick={handleApply}
              disabled={isApplyDisabled}
            >
              Apply
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdvancedFilterComponent;
