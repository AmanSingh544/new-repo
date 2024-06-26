import { Button, Dialog, DialogContent, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import filterLogo from "src/assets/images/filterLogo.svg"
import React, { useState } from 'react'
import { CountryRegionData } from 'react-country-region-selector';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./SimulatorFilter.scss"
import utils from 'src/utils';
import variants from "src/components/filters/filterConstants"

import SelectFilter from 'src/components/filters/selectFilter';
import { useDispatch } from 'react-redux';
import { simulatorFilterActions } from '../simulator-filter-actions';
import { useSelector } from 'react-redux';

export const { var1, var_2, var2, var3, var4, var5, var6, var7 } = variants;
export const SimulatorSelectedFilter = ({
    filterBreadArr,
    handleFilterArrUpdate
}) => {
    const [filterOpen, setFilterOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = useState({
    })
    const [selectedDropFilter, setSelectedDropFilter] = useState({

    })
    // console.log("VARIANTS", variants)
    const dispatch = useDispatch()
    const countryListName = CountryRegionData.map((countryName) => ({
        name: countryName[0],
        code: countryName[1],
    }))
    const returnFilters = (state) => {

        return state.simulatorFilters;

    }
    const {
        setSimulatorOriginCountry,
        setSimulatorDestinationCountry,
        setSimulatorOriginCountryName,
        setSimulatorDestinationCountryName,

    } = simulatorFilterActions;
    const { origin_country, destination_country } = useSelector((state) => returnFilters(state));

    const filterUpdateHandler = (type, value) => {
        // console.log(type, value, "countryListcountryList")
        setSelectedCountry({ ...selectedCountry, [type]: value })
        console.log("SELECTEDCOUNTRY", selectedCountry)
    }

    const onFilterDropSubmit = () => {
        handleFilterArrUpdate({ ...selectedCountry, ...selectedDropFilter })
        setFilterOpen(false)
    }
    React.useEffect(() => {
        handleFilterArrUpdate(selectedCountry)
    }, [selectedCountry])

    React.useEffect(() => {
        handleSyncSelectedArr()
    }, [filterBreadArr])

    const handleSyncSelectedArr = () => {
        const obj1 = filterBreadArr
        for (let key in selectedCountry) {
            if (!obj1.hasOwnProperty(key)) {

                if (key === "originCountry") {
                    delete selectedCountry[key]
                    delete selectedCountry["destinationCountry"]
                }
                else {
                    delete selectedCountry[key];
                }

            }
        }
        for (let key in selectedDropFilter) {
            if (!obj1.hasOwnProperty(key)) {
                delete selectedDropFilter[key];
            }
        }
    }
    const countryById = (id, type) => {

        let country = countryListName.filter((data) => data.code === id)
        console.log(country, type, "consoleValueInput")
        if (type === "originCountry") {
            if (country[0]) {
                dispatch(setSimulatorOriginCountryName([country[0]?.name]))
            }
            else {
                dispatch(setSimulatorOriginCountryName([]))
            }

        }
        else if (type === "destinationCountry") {
            if (country[0]) {
                dispatch(setSimulatorDestinationCountryName([country[0]?.name]))
            }
            else {
                dispatch(setSimulatorDestinationCountryName([]))
            }

        }

    }
     const filterArrays =
        [var1, var_2, var2, var3, var4, var5, var6, var7];

    return (
        <Grid display={"flex"} gap={"5px"} alignItems={"center"} style={{marginLeft:"20px"}}>
            <Grid>
                <Typography className='FilterHeadText' >Origin Country</Typography>
                <FormControl className='filterHeadFormControl'>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className='filterHeadDropDown'
                        value={origin_country ? origin_country : origin_country === "" ? "All" : ""}

                        onChange={(e) => {
                            // filterUpdateHandler("originCountry", e.target.value)
                            countryById(e.target.value, "originCountry")
                            dispatch(setSimulatorOriginCountry(e.target.value))
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: '#FFFF',
                                    padding: "0px",
                                    width: "200px",
                                    height: "250px",
                                    marginTop: "5px",
                                    '& .MuiList-padding': {
                                        paddingTop: " 0px",
                                        paddingBottom: "0px",
                                    },
                                    '& .MuiMenuItem-root': {
                                        padding: 2,
                                        fontSize: "12px",
                                        fontFamily: "Inter",
                                        border: "1px solid #EFEFEF",
                                        fontWeight: "400",
                                        color: "#000000"
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem style={{ textAlign: "left" }} value={""} >All</MenuItem>
                        <MenuItem style={{ display: "none", textAlign: "left" }} value={"All"} >All</MenuItem>
                        {countryListName.map((country) => {
                            const getCountryName = (country) => {
                                let text = country.length > 30 ? country.split(",")[0].split(" and ") : country
                                return text
                            }
                            return <MenuItem key={utils.commonFunctions.keyFinder()} sx={{ display: "flex", gap: "5px" }} value={country.code}><span className={`fi fi-${(country.code).toLocaleLowerCase()}`}></span>{getCountryName(country?.name)}</MenuItem>
                        })}

                    </Select>
                </FormControl>
            </Grid>
            <Grid>
                <Typography className='FilterHeadText' >Destination Country</Typography>
                <FormControl className='filterHeadFormControl'>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className='filterHeadDropDown'
                        // disabled={origin_country?false : true}
                        value={destination_country ? destination_country : destination_country === "" ? "All" : ""}

                        onChange={(e) => {
                            // filterUpdateHandler("originCountry", e.target.value)
                            countryById(e.target.value, "destinationCountry")
                            dispatch(setSimulatorDestinationCountry(e.target.value))
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: '#FFFF',
                                    padding: "0px",
                                    width: "200px",
                                    height: "250px",
                                    marginTop: "5px",
                                    '& .MuiMenuItem-root': {
                                        padding: 2,
                                        fontSize: "12px",
                                        fontFamily: "Inter",
                                        border: "1px solid #EFEFEF",
                                        fontWeight: "400",
                                        color: "#000000"
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem style={{}} value={""} >All</MenuItem>
                        <MenuItem style={{ display: "none", textAlign: "left" }} value={"All"} >All</MenuItem>

                        {countryListName.map((country) => {

                            const getCountryName = (country) => {
                                let text = country.length > 30 ? country.split(",")[0].split(" and ") : country

                                return text
                            }
                            return <MenuItem key={utils.commonFunctions.keyFinder()} sx={{ display: "flex", gap: "5px" }} value={country.code} nam={country.name} ><span className={`fi fi-${(country.code).toLocaleLowerCase()}`}></span>{getCountryName(country?.name)}</MenuItem>
                        })}

                    </Select>
                </FormControl>
            </Grid>
            <Button variant="outlined"
                className='simulatorFilterBtnStyle'

                onClick={() => { setFilterOpen(true) }}
            >
                <img src={filterLogo} alt="filter" />
                Filters
            </Button>
            <Dialog className='filterListDialog'

                open={filterOpen} onClose={() => setFilterOpen(false)}
                fullWidth={true}
                PaperProps={{
                    style: {

                    }
                }}
            >

                <DialogContent className='filterListDialogContent'>

                    <Grid className='filterListDialogCont' >
                        <Grid className='filterListDialogSelect' >
                            {filterArrays?.map((data, key) => {
                                return <SelectFilter type={data ? data[0].name : ""} key={key} data={data} />;
                            })}
                        </Grid>
                        <Grid className='filterListDialogBtn'>
                            {/* <Button variant="outlined"
                                className='simulatorFilterListBtnStyleCancel'

                                onClick={() => { setFilterOpen(false) }}
                            >
                                Cancel
                            </Button> */}
                            <Button variant="outlined"
                                className='simulatorFilterListBtnStyle'

                                onClick={() => { onFilterDropSubmit() }}
                            >
                                OK
                            </Button>

                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>
        </Grid>
    )

}