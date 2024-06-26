import React from 'react';
import { Button, Box } from '@mui/material';
import Badge from '../badge/badgeCount';

const FilterButton= ({ badgeCount, handleOpen }) => {
  return (
    <Box
      style={{
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        // marginTop: '10px',
        // marginLeft: '15px',
      }}
    >
      <Button
        style={{
          padding: "7px 14px",
          gap: '6px',
          background: "#b1000e",
          borderRadius: "3px",
          fontWeight: "400",
          fontSize: "14px",
          //lineHeight: '17px',
          textTransform: "capitalize",
          color: "#FFFFFF"
        }}
        onClick={handleOpen}
      >
        {/* Filter Icon */}
        <img
          src="https://img.icons8.com/ios/50/FFFFFF/filter--v1.png"
          alt="Filter icon"
          style={{ width: '25px', height: '25px', marginRight: '5px' }}
        />
        {/* Filter Label */}
        <span style={{ marginRight: '5px' }}>Filter</span>

        {/* Badge Counter */}
        {badgeCount > 0 && <Badge count={badgeCount} style={{ marginLeft: '5px' }} />}
      </Button>
    </Box>
  );
};

export default FilterButton;
