import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  Tooltip,
  TextField,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';

const FilterTable = ({ rows, dropdownOptions, handleHeaderChange, handleValueChange, handleAddRow, handleRemoveRow }) => {
  return (
    <Box className="filtertableContainer">
      <Paper elevation={0} className="filterTablePaper">
        <Table stickyHeader className="filterTableClass">
        <TableBody>
  {rows.map((row, index) => (
    <TableRow role="checkbox" tabIndex={-1} key={row.id}>
      {/* Column selection */}
      <TableCell sx={{ whiteSpace: 'nowrap', width: '33.333%' }}>
        <Tooltip title={row.header || 'Select Column'} arrow placement="top-start">
          <Autocomplete
            id={`column-selection-${row.id}`}
            options={dropdownOptions}
            onChange={(event, option) =>
              handleHeaderChange(row.id, option ? option.headerName : '', option ? option.field : '')
            }
            getOptionLabel={(option) => option.headerName}
          //  MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input 
          // MuiInputBase-input-MuiOutlinedInput-input
            renderInput={(params) => <TextField    sx={{
              '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
               height:'10px'
              },
              '& .MuiInputLabel-root': {
                top: '-4px'
                } 
            }}
            {...params} label="Select Column" />}
            value={row.header?dropdownOptions.find((option) => option.headerName === row.header) :null}
            PaperComponent={({ children }) => (
              <Paper style={{ maxHeight: 200, width: 250, overflow: 'auto' }}>
                {children}
              </Paper>
            )}
          />
        </Tooltip>
      </TableCell>

      {/* Value input */}
      <TableCell sx={{ whiteSpace: 'nowrap', width: '33.333%' }}>
        <Tooltip title={!row.header ? 'Please select a column first' : row.value} arrow placement="top-start">
          <TextField
            sx={{ 
              '& .MuiInputBase-input': { height: '10px' },
              '& .MuiInputLabel-root': {
              top: '-4px'
              } 
            }}
            type="text"
            value={row.value}
            onChange={(e) => handleValueChange(row.id, e.target.value)}
            fullWidth
            label="Enter value"
            placeholder='Enter value'
            disabled={!row.header}
          />
        </Tooltip>
      </TableCell>

      {/* Action (Remove) */}
      <TableCell sx={{ padding: '4px', height: '32px', width: '33.333%' }}>
        <Button
          style={{
            marginLeft: '80px',
            cursor: 'pointer',
          }}
          onClick={() => handleRemoveRow(row.id)}
        >
          <span style={{ marginRight: '5px' }}>Remove</span>
          <img
            src="https://img.icons8.com/material-outlined/24/minus-sign.png"
            alt="minus-sign"
            style={{ width: '25px', height: '25px' }}
          />
        </Button>
      </TableCell>
    </TableRow>
  ))}

  {/* Add Row button */}
  <TableRow>
    <TableCell>
    <Tooltip title={!rows[rows.length - 1].value ? 'Please select column first and enter value' : null} arrow placement="right-end">
      <Button
        style={{
          gap: '6px',
          background: rows[rows.length - 1].value ? "#b1000e" : "#f0a5a5",
          borderRadius: "5px",
          fontWeight: "500",
          fontSize: "15px",
          lineHeight: '17px',
          textTransform: "capitalize",
          color: "#FFFFFF",
          cursor: rows[rows.length - 1].value ? 'pointer' : 'not-allowed',
          pointerEvents: 'visible',
        }}
        disabled={!rows[rows.length - 1].value}
        onClick={handleAddRow}
       // title={!rows[rows.length - 1].value ? "Select column and enter value " : ""}
      >
        <AddIcon /> <span>Add Filter</span>
      </Button>
      </Tooltip>
    </TableCell>
  </TableRow>
</TableBody>

        </Table>
      </Paper>
    </Box>
  );
};

export default FilterTable;
