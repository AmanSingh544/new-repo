import React from 'react';
import { Box } from '@mui/material';
import { getImageFromURL, IMAGES } from "src/constants/images";
import { useTranslation } from "react-i18next";

const FilterChips = ({ appliedFilters, handleChipRemove }) => {
    const { t } = useTranslation();

    return(
    <>
    <div className="selected-filters" style={{ marginLeft: '15px' }}>{t("selectedFilters")}</div>
        <Box
          display="flex"
          flexWrap="nowrap"
          alignItems="center"
          ml={2}
          mt={1}
          style={{
            maxWidth: '673px',
            overflowX: 'auto',
            margin: '0px',
            //  border: '1px solid lightgray', // Optional border style
            borderRadius: '5px',
          }}
        >
        {appliedFilters?.map((filter, index) => {
            return (
              <span className="breadCrumb" key={index}>
                {`${filter.header}: ${filter.value}`}
                <img
                  src={getImageFromURL(`${IMAGES.CROSSFILTERS}`)}
                  alt={IMAGES.CROSSFILTERS}
                  onClick={() => handleChipRemove(filter)}
                />
              </span>
            );
          })
        }
        </Box>
    </>
    );
};

export default FilterChips;