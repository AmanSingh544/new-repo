import {
    MapContainer,
    Marker,
    GeoJSON,
    Tooltip,
} from "react-leaflet";
import Loader from "src/components/loader";
import './emissionvscountry.css'
import { useLocation } from "react-router-dom";
import {
    makeScopeArray,
    makeRc,
    makeRegion,
    makeActivity,
    makeBu,
    makeEndDate,
    makeStartDate,
    makeTeams,
    makeModes,
    makeMovementType,
    makeTag,
    getRegionNameAbb,
    getBuName
} from "src/utils/utilityFunction";
import { Apicalls } from "src/utils/services/axiosClient";
import constants from "src/constants";
import { Icon } from "leaflet";
import BarChart from "../charts/barChart";
import "leaflet/dist/leaflet.css";
import countries from "./countries.json";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NothingFoundView from "src/components/nothingFoundView/NothingFoundView";
import utils from "src/utils";
import L from 'leaflet';

const countriesFilter = countries.features.filter(
    (data) => data.properties.ADMIN !== "Antarctica"
);

const countryObj = {
    type: "FeatureCollection",
    features: [...countriesFilter],
};


const EmissionByCountryDetailed = ({ single }) => {
    const [emissionState, setEmissionState] = useState({
        rc: true,
        bu: false,
        team: false,
    });

    const [allTeams, setAllTeams] = useState([]);
    const { pathname } = useLocation();
    const { singleDetailed, regionData } =
        useSelector((state) => state.globalRed);
    const { modes, activity, movement } = useSelector(
        (state) => state.detailedFilters
    );

    let isEquivalence = pathname.includes("equivalence");
    let isDetailed = pathname.includes("detailed-summary") || singleDetailed;
    const {
        bu,
        team,
        region,
        country,
        scope,
        calendar_filters,
        bu_filters,
        team_filters,
    } = useSelector((state) =>
        isEquivalence
            ? state.eqFilters
            : isDetailed
                ? state.detailedFilters
                : state.filters
    );
    const [regionList, setRegionList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [emissionRegionData, setEmissionRegionData] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [markerList, setMarkerList] = useState([]);
    const [activeRegionName, setActiveRegionName] = useState("");
    const [activeCountry, setActiveCountry] = useState("");
    const [activeRegionId, setActiveRegionId] = useState("");
    const [activeBu, setActiveBu] = useState("");
    const [buData, setBuData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [buLabelsArr, setBuLabelsArr] = useState([]);
    const [buDataArr, setBuDataArr] = useState([]);
    const [enableTeams, setEnableTeams] = useState(false);

    const countryStyle = {
        fillColor: "#D3D3D3",
        fillOpacity: 0.8,
        color: "#a9a9a9",
        weight: 0.4,
    };

    const emeaCountries = [
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Aruba",
        "Austria",
        "Bahrain",
        "Belarus",
        "Belgium",
        "Benin",
        "Bermuda",
        "Bonaire",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "British Virgin Islands",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Clipperton Island",
        "Comoros",
        "Croatia",
        "Curaçao",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Republic of Congo",
        "Denmark",
        "Djibouti",
        "Egypt",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Finland",
        "Saint Pierre and Miquelon",
        "France",
        "French Guiana",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Guadeloupe",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Hungary",
        "Iceland",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle Of Man",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jersey",
        "Jordan",
        "Kenya",
        "Kuwait",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Mali",
        "Malta",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Netherlands",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Palestine",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Rwanda",
        "Saba",
        "Saint Kitts and Nevis",
        "Saint Martin",
        "San Marino",
        "Sao Tome & Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Sint Eustatius",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Somalia",
        "South Africa",
        "South Georgia and South Sandwich Islands",
        "South Sandwich Islands",
        "Spain",
        "Sudan",
        "South Sudan",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tanzania",
        "United Republic of Tanzania",
        "Togo",
        "Tunisia",
        "Turkey",
        "Turks and Caicos Islands",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Vatican City",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];

    const asiaCountries = [
        "Afghanistan",
        "American Samoa",
        "Australia",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Cook Islands",
        "Fiji",
        "Guam",
        "Hong Kong",
        "India",
        "Indonesia",
        "Japan",
        "Kiribati",
        "Laos",
        "Macao",
        "Malaysia",
        "Maldives",
        "Marshall Islands",
        "Mongolia",
        "Myanmar",
        "Nauru",
        "Nepal",
        "New Caledonia",
        "New Zealand",
        "Niue",
        "Norfolk Island",
        "North Korea",
        "Northern Mariana Islands",
        "Pakistan",
        "Palau",
        "Papua New Guinea",
        "Philippines",
        "Pitcairn Islands",
        "Russia",
        "Samoa",
        "Singapore",
        "Solomon Islands",
        "South Korea",
        "Sri Lanka",
        "Taiwan",
        "Thailand",
        "Timor-Leste",
        "Tokelau",
        "Tonga",
        "Tuvalu",
        "Vanuatu",
        "Vietnam",
        "Wallis and Futuna",
    ];
    const americasCountries = [
        "Antigua and Barbuda",
        "Argentina",
        "The Bahamas",
        "Barbados",
        "Belize",
        "Bolivia",
        "Brazil",
        "Canada",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "El Salvador",
        "Grenada",
        "Guatemala",
        "Guyana",
        "Haiti",
        "Honduras",
        "Jamaica",
        "Mexico",
        "Nicaragua",
        "Panama",
        "Paraguay",
        "Peru",
        "Puerto Rico",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Suriname",
        "Trinidad and Tobago",
        "United States Virgin Islands",
        "usa",
        "Uruguay",
        "Venezuela",
    ];
    const menaCountries = [
        "Algeria",
        "Bahrain",
        "Cyprus",
        "Djibouti",
        "Egypt",
        "Georgia",
        "Iran",
        "Iraq",
        "Israel",
        "Jordan",
        "Kuwait",
        "Lebanon",
        "Libya",
        "Malta",
        "Mauritania",
        "Morocco",
        "Oman",
        "Qatar",
        "Saudi Arabia",
        "Somalia",
        "Sudan",
        "South Sudan",
        "Syria",
        "Tunisia",
        "Turkey",
        "United Arab Emirates",
        "Western Sahara",
        "Yemen",
    ];
    const latinAmericanCountries = [
        "Argentina",
        "Belize",
        "Bolivia",
        "Brazil",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "Dominican Republic",
        "Ecuador",
        "El Salvador",
        "Guadeloupe",
        "Guatemala",
        "Guyana",
        "Haiti",
        "Honduras",
        "Martinique",
        "Mexico",
        "Nicaragua",
        "Panama",
        "Paraguay",
        "Peru",
        "Puerto Rico",
        "Suriname",
        "Uruguay",
        "Venezuela",
    ];
    const seaCountries = [
        "Brunei",
        "Cambodia",
        "Indonesia",
        "Laos",
        "Malaysia",
        "Myanmar",
        "Philippines",
        "Singapore",
        "Thailand",
        "Vietnam",
    ];


    const returnRegionNames = (arr) => {
        const filteredRegions = regionData.filter((data) => arr.includes(data.id));

        const strNames = filteredRegions.map((data) => {
            return getRegionNameAbb(data.region_name);
        });
        setActiveRegionName(String(strNames));
    };

    useEffect(() => {
        const key = "region";
        const mappedRegion = [
            ...new Map(bu_filters?.map((item) => [item[key], item])).values(),
        ]
            .map((item) => {
                return { region_id: item.region, country_name: item.country };
            })
            .filter((data) => data.region_id);

        const regionIds = [];
        mappedRegion.forEach((data) => {
            if (country.includes(data.country_name)) {
                regionIds.push(data.region_id);
            }
        });

        if (regionIds.length === 1) {
            returnRegionNames(regionIds);
        }

        if (country.length) {
            setActiveCountry(String(country));
        }

        if (emissionState.bu) {
            setActiveBu(false);
        }
    }, [region.length, country.length, bu.length, emissionState]);


    const mapref = useRef();

    const onEachCountry = (f, l) => {

        const emeaArr = markerList.filter(
            (data) => getRegionNameAbb(data.countryInfo.region_name) === "EMEA"
        );
        const americasArr = markerList.filter(
            (data) => getRegionNameAbb(data.countryInfo.region_name) === "Americas"
        );
        const menaArr = markerList.filter(
            (data) => getRegionNameAbb(data.countryInfo.region_name) === "MENA"
        );

        const apacArr = markerList.filter(
            (data) => getRegionNameAbb(data.countryInfo.region_name) === "APAC"
        );

        const latamArr = markerList.filter(
            (data) => getRegionNameAbb(data.countryInfo.region_name) === "LATAM"
        );

        const naArr = markerList.filter(
            (data) =>
                getRegionNameAbb(data.countryInfo.region_name) === "NM" ||
                getRegionNameAbb(data.countryInfo.region_name) === "Americas"
        );

        for (const markedList of markerList) {
            if (
                f.properties.ADMIN.toLowerCase() ===
                markedList["geoName"].toLowerCase()
            ) {

                l.on("click", function (e) {
                    if (asiaCountries.includes(f.properties.ADMIN) && apacArr.length) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(apacArr[0]["countryInfo"]);
                    } else if (
                        emeaCountries.includes(f.properties.ADMIN) &&
                        emeaArr.length
                    ) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(emeaArr[0]["countryInfo"]);
                    } else if (
                        americasCountries.includes(f.properties.ADMIN) &&
                        americasArr.length
                    ) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(americasArr[0]["countryInfo"]);
                    } else if (
                        americasCountries.includes(f.properties.ADMIN) &&
                        naArr.length
                    ) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(naArr[0]["countryInfo"]);
                    } else if (
                        menaCountries.includes(f.properties.ADMIN) &&
                        menaArr.length
                    ) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(menaArr[0]["countryInfo"]);
                    } else if (
                        latinAmericanCountries.includes(f.properties.ADMIN) &&
                        latamArr.length
                    ) {
                        setEmissionState({ rc: false, bu: true, team: false });
                        handleMarkerClick(latamArr[0]["countryInfo"]);
                    }
                });
            }
        }
    };

    const handleGetBuSuccess = (response) => {
        makeBuLabelArr(response.data.result.data);
        makeBuDataArr(response.data.result.data);
        setBuData(response.data.result.data);
        setIsLoad(false);
    };

    const handleGetBuError = (err) => {
        setIsLoad(false);
    };

    const getZoomLevel = () => {
        let zoom = 0.85;
        let center = [45, 0];
        if (single) {
            center = [45, 0];
            zoom = 1.25;
        }

        if (window.screen.width > 1500 && !single) {
            zoom = 1.2;
            center = [50, 0];
        }

        return { zoom, center };
    };

    const handleMarkerClick = (countryInfo) => {

        setIsLoad(true);
        setBuLabelsArr([]);
        setBuDataArr([]);
        if (countryInfo.region_name) {
            setActiveRegionName(getRegionNameAbb(countryInfo.region_name));
        }
        setActiveCountry(countryInfo.country);
        setActiveRegionId(countryInfo.region_id);
        let params = {};

        if (makeScopeArray(scope)) {
            params.scope = JSON.stringify(makeScopeArray(scope));
        }
        if (makeTag(calendar_filters)) {
            params.tag = makeTag(calendar_filters);
        }
        if (makeStartDate(calendar_filters)) {
            params.start_date = makeStartDate(calendar_filters);
        }
        if (makeEndDate(calendar_filters)) {
            params.end_date = makeEndDate(calendar_filters);
        }
        if (makeBu(bu, bu_filters)) {
            params.bu = JSON.stringify(makeBu(bu, bu_filters));
        }
        if (makeTeams(team, team_filters)) {
            params.team = JSON.stringify(makeTeams(team, team_filters));
        }
        if (isDetailed) {
            if (makeModes(modes)) {
                params.mode = JSON.stringify(makeModes(modes));
            }
            if (makeMovementType(movement)) {
                params.movement_type = JSON.stringify(makeMovementType(movement));
            }
            if (makeActivity(activity)) {
                params.activities = JSON.stringify(makeActivity(activity));
            }
        }

        if (countryInfo.region_id) {
            params.region = JSON.stringify([countryInfo.region_id]);
        }

        if (countryInfo.country) {
            params.rc = JSON.stringify([countryInfo.country.toLowerCase()]);
        }

        Apicalls.getApiCall(
            constants.endPoints.emissionRegion,
            params,
            "",
            handleGetBuSuccess,
            handleGetBuError
        );
    };

    const handleGetCountriesSuccess = (response) => {
        setCountryList((prevState) => {
            return [...prevState, ...response.data.result.data];
        });
    };

    const handleGetCountriesError = (err) => {
        setIsLoad(false);
    };


    const makeTeamDataArr = (arr) => {
        let barDataArr = [];
        arr.length > 0 &&
            arr.map((item) => {
                barDataArr.push(Number(parseFloat(item.emissions)).toFixed(2));
            });
        setBuDataArr(barDataArr);
    };

    const handleGetTeamsSuccess = (response) => {
        setBuData(response.data.result.data);
        makeTeamLabelArr(response.data.result.data);
        makeTeamDataArr(response.data.result.data);
    };

    const getTeamName = (id) => {
        const filteredTeam = allTeams.filter((data) => data.id === id);
        return filteredTeam[0]["name"];
    };

    const makeTeamLabelArr = (arr) => {
        let labelArr = [];
        arr.length > 0 &&
            arr.map((item) => {
                labelArr.push(getTeamName(item.team_id));
            });
        setBuLabelsArr(labelArr);
    };

    const handleGetRegionFilterSuccess = (response) => {
        const dataCountry = response.data.result.data;
        setIsLoad(false);
        setEmissionRegionData(response.data.result.data);
        if (country.length && !team.length && !bu.length) {
            setRegionList(response.data.result.data);
        }
        if (!country.length) {
            setRegionList(response.data.result.data);
            if (response?.data?.result?.data?.length) {
                let params = {};
                if (makeScopeArray(scope)) {
                    params.scope = JSON.stringify(makeScopeArray(scope));
                }
                if (makeTag(calendar_filters)) {
                    params.tag = makeTag(calendar_filters);
                }
                if (makeStartDate(calendar_filters)) {
                    params.start_date = makeStartDate(calendar_filters);
                }
                if (makeEndDate(calendar_filters)) {
                    params.end_date = makeEndDate(calendar_filters);
                }
                if (makeRegion(region, regionData)) {
                    params.region = JSON.stringify(makeRegion(region, regionData));
                }

                if (makeRc(country)) {
                    params.rc = JSON.stringify(makeRc(country));
                    console.log(
                        "REGIONS ACTIVE",
                        country,
                        emeaCountries,
                        asiaCountries,
                        americasCountries,
                        menaCountries,
                        latinAmericanCountries,
                        seaCountries
                    );
                }
                if (makeBu(bu, bu_filters)) {
                    params.bu = JSON.stringify(makeBu(bu, bu_filters));
                }
                if (makeTeams(team, team_filters)) {
                    params.team = JSON.stringify(makeTeams(team, team_filters));
                }
                if (isDetailed) {
                    if (makeModes(modes)) {
                        params.mode = JSON.stringify(makeModes(modes));
                    }
                    if (makeMovementType(movement)) {
                        params.movement_type = JSON.stringify(makeMovementType(movement));
                    }
                    if (makeActivity(activity)) {
                        params.activities = JSON.stringify(makeActivity(activity));
                    }
                }
                const regionArr = response.data.result.data;
                setCountryList([])
                for (const region of regionArr) {
                    Apicalls.getApiCall(
                        constants.endPoints.emissionRegion,
                        { region: JSON.stringify([region["region_id"]]), ...params },
                        "",
                        handleGetCountriesSuccess,
                        handleGetCountriesError
                    );
                }
            }
        }
        if (country.length) {
            const filtered = [];
            if (bu.length && !team.length) {
                setEmissionState({ rc: false, team: false, bu: true });
                handleGetBuSuccess(response);
            } else if (bu.length && team.length) {
                setEmissionState({ rc: false, team: true, bu: false });
                handleGetTeamsSuccess(response);
            } else if (country.length && !bu.length) {
                setEmissionState({ rc: true, team: false, bu: false });

                for (const countryData of dataCountry) {
                    const filterCountries = countryObj.features.filter(
                        (data) =>
                            data.properties.ADMIN.toLowerCase() ===
                            countryData.country.toLowerCase()
                    );

                    if (filterCountries.length) {
                        const coordinates = filterCountries[0]["geometry"]["coordinates"];
                        const index =
                          filterCountries[0]["geometry"]["coordinates"].length - 1;
                        if ( coordinates && coordinates.length > 0 && coordinates[index][0].length > 0 && coordinates[index][0][0].length > 0 ) 
                        {
                          const [lat, long] = coordinates[index][0][0];
                          filtered.push({
                              geo: [long - 8, lat],
                              geoName: countryData.country,
                              countryInfo: countryData,
                          });
                        }
                    }
                }
                setMarkerList(filtered);
            }
        }
    };

    const handleGetRegionFilterError = (err) => {
        console.log("ERRor");
    };

    const makeBuDataArr = (arr) => {
        let barDataArr = [];
        arr.length > 0 &&
            arr.map((item) => {
                barDataArr.push(Number(parseFloat(item.emissions)).toFixed(2));
            });
        setBuDataArr(barDataArr);
    };

    const makeBuLabelArr = (arr) => {
        let labelArr = [];
        arr.length > 0 &&
            arr.map((item) => {
                labelArr.push(getBuName(item.bu_id, bu_filters));
            });

        setBuLabelsArr(labelArr);
    };

    const getFilteredEmissions = () => {
        setIsLoad(true);
        let params = {};
        if (makeScopeArray(scope)) {
            params.scope = JSON.stringify(makeScopeArray(scope));
        }
        if (makeTag(calendar_filters)) {
            params.tag = makeTag(calendar_filters);
        }
        if (makeStartDate(calendar_filters)) {
            params.start_date = makeStartDate(calendar_filters);
        }
        if (makeEndDate(calendar_filters)) {
            params.end_date = makeEndDate(calendar_filters);
        }
        if (makeRegion(region, regionData)) {
            params.region = JSON.stringify(makeRegion(region, regionData));
        }
        if (makeRc(country)) {
            params.rc = JSON.stringify(makeRc(country));
        }
        if (makeBu(bu, bu_filters)) {
            params.bu = JSON.stringify(makeBu(bu, bu_filters));
        }
        if (makeTeams(team, team_filters)) {
            params.team = JSON.stringify(makeTeams(team, team_filters));
        }
        if (isDetailed) {
            if (makeModes(modes)) {
                params.mode = JSON.stringify(makeModes(modes));
            }
            if (makeMovementType(movement)) {
                params.movement_type = JSON.stringify(makeMovementType(movement));
            }
            if (makeActivity(activity)) {
                params.activities = JSON.stringify(makeActivity(activity));
            }
        }
        Apicalls.getApiCall(
            constants.endPoints.emissionRegion,
            params,
            "",
            handleGetRegionFilterSuccess,
            handleGetRegionFilterError
        );
    };

    const fetchBuData = () => {
        setEmissionState({ rc: false, team: false, bu: true });
        setActiveBu(false);
        let params = {};

        if (makeScopeArray(scope)) {
            params.scope = JSON.stringify(makeScopeArray(scope));
        }
        if (makeTag(calendar_filters)) {
            params.tag = makeTag(calendar_filters);
        }
        if (makeStartDate(calendar_filters)) {
            params.start_date = makeStartDate(calendar_filters);
        }
        if (makeEndDate(calendar_filters)) {
            params.end_date = makeEndDate(calendar_filters);
        }
        if (makeBu(bu, bu_filters)) {
            params.bu = JSON.stringify(makeBu(bu, bu_filters));
        }
        if (makeTeams(team, team_filters)) {
            params.team = JSON.stringify(makeTeams(team, team_filters));
        }
        if (isDetailed) {
            if (makeModes(modes)) {
                params.mode = JSON.stringify(makeModes(modes));
            }
            if (makeMovementType(movement)) {
                params.movement_type = JSON.stringify(makeMovementType(movement));
            }
            if (makeActivity(activity)) {
                params.activities = JSON.stringify(makeActivity(activity));
            }
        }

        if (activeRegionId) {
            params.region = JSON.stringify([activeRegionId]);
        } else {
            if (makeRegion(region, regionData)) {
                params.region = JSON.stringify(makeRegion(region, regionData));
            }
        }
        params.rc = JSON.stringify([activeCountry.toLowerCase()]);

        Apicalls.getApiCall(
            constants.endPoints.emissionRegion,
            params,
            "",
            handleGetCuntrySuccess,
            handleGetCuntryError
        );
    };



    const totalEmissions = regionList.reduce(function (acc, obj) {
        return (
            acc +
            parseFloat(
                !isNaN(obj.emissions)
                    ? obj.emissions
                    : obj.emissions.replace("KT CO2e", "")
            )
        );
    }, 0);

    const regionInfo = regionList.map((data) => {
        if (totalEmissions) {
            return {
                emissionPercentage: Math.round(
                    (parseFloat(
                        !isNaN(data.emissions)
                            ? data.emissions
                            : data.emissions.replace("KT CO2e", "")
                    ) /
                        totalEmissions) *
                    100
                ),
                region_name: getRegionNameAbb(data.region_name),
            };
        }
    });

    const regionNames = regionList.map((data) =>
        getRegionNameAbb(data.region_name)
    );

    useEffect(() => {
        const data = [];
        let countryListing = countryList;
        if (region.length) {
            countryListing = countryList.filter((data) => {
                if (country.length) {
                    return region.includes(
                        getRegionNameAbb(data.region_name) && country.includes(data.country)
                    );
                } else {
                    return region.includes(getRegionNameAbb(data.region_name));
                }
            });
        }

        if (country.length) {
            countryListing = countryList.filter((data) =>
                country.includes(data.country)
            );
        }
        if (regionInfo.length) {
            for (let country of countryListing) {

                const filterCountries = countryObj.features.filter((data) => {
                    if (data.properties.ADMIN && country.country) {
                        return (
                            data.properties.ADMIN.toLowerCase() ===
                            country.country.toLowerCase()
                        );
                    }
                });
                if (filterCountries.length > 0) {
                    const geometry = filterCountries[0].geometry;
                    if (geometry && geometry.coordinates) {
                        const coordinates = geometry.coordinates;
                        if (coordinates.length > 0) {
                            const lastCoordinates = coordinates[coordinates.length - 1];
                            if (Array.isArray(lastCoordinates) && lastCoordinates.length > 0) {
                                const [lat, long] = lastCoordinates[0];

                                // Check if lat and long are valid numbers
                                if (!isNaN(lat) && !isNaN(long)) {
                                    data.push({
                                        geo: [long - 8, lat],
                                        geoName: country.country,
                                        countryInfo: country,
                                    });
                                }
                            }
                        }
                    }
                }
                setMarkerList(data);
            }
        }
    }, [countryList.length, regionInfo.length]);


    useEffect(() => {
        getFilteredEmissions();
        if (!team.length && !bu.length) {
            setEmissionState({ rc: true, bu: false, team: false });
        }
    }, [
        scope.length,
        country.length,
        region.length,
        calendar_filters,
        team.length,
        bu.length,
        modes.length,
        movement.length,
        activity.length,
    ]);

    useEffect(() => {
        if (bu.length && team.length) {
            setEmissionState({
                rc: false,
                team: true,
                bu: true,
            });
        }
        else if (bu.length) {
            setEmissionState({
                rc: false,
                team: false,
                bu: true,
            });
        } else if (team.length) {
            setEmissionState({
                rc: false,
                team: true,
                bu: false,
            });
        }
    }, [bu, team]);


    useEffect(() => {
        let params = {};

        if (makeTag(calendar_filters)) {
            params.tag = makeTag(calendar_filters);
        }
        if (makeStartDate(calendar_filters)) {
            params.start_date = makeStartDate(calendar_filters);
        }
        if (makeEndDate(calendar_filters)) {
            params.end_date = makeEndDate(calendar_filters);
        }

        Apicalls.getApiCall(
            constants.endPoints.emissionCountry,
            params,
            "",

            handleGetCuntrySuccess,
            handleGetCuntryError
        );

    }, [])
    useEffect(() => {
        setEmissionState({ rc: true, team: false, bu: true });

        let params = {};
        if (makeScopeArray(scope)) {
            params.scope = JSON.stringify(makeScopeArray(scope));
        }
        if (makeTag(calendar_filters)) {
            params.tag = makeTag(calendar_filters);
        }
        if (makeStartDate(calendar_filters)) {
            params.start_date = makeStartDate(calendar_filters);
        }
        if (makeEndDate(calendar_filters)) {
            params.end_date = makeEndDate(calendar_filters);
        }
        if (makeBu(bu, bu_filters)) {
            params.bu = JSON.stringify(makeBu(bu, bu_filters));
        }
        if (makeTeams(team, team_filters)) {
            params.team = JSON.stringify(makeTeams(team, team_filters));
        }

        if (isDetailed) {
            if (makeModes(modes)) {
                params.mode = JSON.stringify(makeModes(modes));
            }
            if (makeMovementType(movement)) {
                params.movement_type = JSON.stringify(makeMovementType(movement));
            }
            if (makeActivity(activity)) {
                params.activities = JSON.stringify(makeActivity(activity));
            }
        }
        if (activeRegionId) {
            params.region = JSON.stringify([activeRegionId]);
        } else {
            if (makeRegion(region, regionData)) {
                params.region = JSON.stringify(makeRegion(region, regionData));
            }
        }
        if (makeRc(country)) {
            params.rc = JSON.stringify(makeRc(country));

        }

        Apicalls.getApiCall(
            constants.endPoints.emissionCountry,
            params,
            "",

            handleGetCuntrySuccess,
            handleGetCuntryError
        );

    }, [calendar_filters, bu, bu_filters, team_filters, team, modes, movement, activity, scope, region, regionData, country])
    const handleGetCuntrySuccess = (response) => {
        setCountryData(response.data.result.data);
        setIsLoad(false);
    };
    // custom tooltip
    const emissionByCountryTooltip=()=>{
        console.log("emissionByCountryTooltip")
    }
    const CustomTooltip = ({ position, content, isVisible }) => {
        const tooltipStyle = {
          position: 'absolute',
          zIndex:"9999",
          top: '400px',
          left: '400px',
          background: 'red',
          padding: '5px',
          borderRadius: '5px',
          display: isVisible ? 'block' : 'none',
        };
      
        return <div style={tooltipStyle}>{content}</div>;
      };
    const [tooltipPosition, setTooltipPosition] = useState([0, 0]);
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleMarkerHover = (event) => {
    setTooltipPosition([event.latlng.lat, event.latlng.lng]);
    setTooltipVisibility(true);
  };

  const handleMarkerLeave = () => {
    setTooltipVisibility(false);
  };
// custom tooltip end
    const handleGetCuntryError = (err) => {
        setIsLoad(false);
    };



    if (emissionState.rc) {
        if (
            countryData.length
        ) {
            return (
                <div className="leaflet-container-app">
                    <MapContainer
                        center={getZoomLevel().center}
                        minZoom={getZoomLevel().zoom}
                        zoom={getZoomLevel().zoom}
                        zoomSnap={0.05}
                        maxZoom={3}
                    >
                        <div style={{ display: "flex" }} className="color-bar-img">
                            <span
                                style={{
                                    alignItems: "stretch",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>Max</div>
                                <div>Min</div>
                            </span>
                            <img
                                src={
                                  //  "https://carbnonx.blob.core.windows.net/carbnonx/color-bars.svg"
                                    "https://carbnonx.blob.core.windows.net/carbnonx/Red_Gradient_bars.svg"
                                }
                                alt="color-bar"
                            />
                        </div>
                        {countryData.length ? (
                            <GeoJSON
                                ref={mapref}
                                style={countryStyle}
                                data={countryObj.features}
                                onEachFeature={(f, l) => onEachCountry(f, l)}
                            >
                                {countryData.map((data, arr) => {
                                    // Define a function to determine the marker color based on the emission value
                                    const getMarkerColor = (emission) => {
                                        if (emission <= 100) {
                                            return 'green'; // Green marker for low emission
                                        } else if (emission <= 10000) {
                                            return 'yellow'; // Yellow marker for medium emission
                                        } else {
                                            return 'red'; // Red marker for high emission
                                        }
                                    };

                                    // Get the marker color based on the emission value
                                    const markerColor = getMarkerColor(data.emission);

                                    // Define custom DivIcon with a colored circle
                                    const customIcon = new L.DivIcon({
                                        className: 'custom-marker-icon',
                                        html: `<div class="circle ${markerColor}"></div>`, // Use CSS to style the circle
                                        iconSize: [15, 15],
                                        iconAnchor: [10, 15],
                                    });
                                    return (

                                        <Marker
                                            key={utils.commonFunctions.keyFinder()}
                                            
                                            position={[
                                                data.latitude && !isNaN(data.latitude) ? parseFloat(data.latitude) : 0,
                                                data.longitude && !isNaN(data.longitude) ? parseFloat(data.longitude) : 0,

                                            ]}
                                            icon={customIcon}
                                            // onMouseOver={handleMarkerHover} onMouseOut={handleMarkerLeave}
                                            

                                        >
                                            
                                           <Tooltip  opacity={1} className="tooltip-map">
                                                <div className="tooltip-layer">
                                                    {data.source_country && (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                background: "#FFFFFF",
                                                                textTransform: "capitalize",
                                                                fontSize: "14px",
                                                                fontWeight: "600",
                                                                color: "#1C1C1C",
                                                                padding: "5px",
                                                            }}
                                                        >
                                                            {data.source_country}
                                                        </div>
                                                    )}
                                                    <hr color="#BBBBBB"></hr>
                                                    <div
                                                        style={{
                                                            padding: "2px 0px 2px 5px",
                                                            fontSize: "12px",
                                                            marginLeft: "0px",
                                                            color: "#000000",
                                                        }}
                                                        className="tooltip-container"
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span
                                                                className="region-tooltip-label"
                                                                style={{ marginRight: "auto" }}
                                                            >
                                                                Continent
                                                            </span>
                                                            <span className="region-flex">
                                                                <span
                                                                    className="region-tooltip-label"
                                                                    style={{ margin: "5px 10px" }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span style={{ fontWeight: "600" }}>
                                                                    {data.Source_continent}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span
                                                                className="region-tooltip-label"
                                                                style={{ marginRight: "auto" }}
                                                            >
                                                                Country Code
                                                            </span>
                                                            <span className="region-flex">
                                                                <span
                                                                    className="region-tooltip-label"
                                                                    style={{ margin: "5px 10px" }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span style={{ fontWeight: "600" }}>
                                                                    {data.country_code}
                                                                </span>
                                                            </span>
                                                        </div>  
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span
                                                                className="region-tooltip-label"
                                                                style={{ marginRight: "auto" }}
                                                            >
                                                                Total Emission
                                                            </span>
                                                            <span className="region-flex">
                                                                <span
                                                                    className="region-tooltip-label"
                                                                    style={{ margin: "5px 10px" }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontWeight: "600",
                                                                        fontSize: "12px",
                                                                    }}
                                                                >
                                                                    {(data.emission / 1000).toFixed(3) + " "} T CO<sub>2</sub>e
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span
                                                                className="region-tooltip-label"
                                                                style={{ marginRight: "auto" }}
                                                            >
                                                                Percentage Emission
                                                            </span>
                                                            <span className="region-flex">
                                                                <span
                                                                    className="region-tooltip-label"
                                                                    style={{ margin: "5px 10px" }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span style={{ fontWeight: "600" }}>
                                                                    {data.emission_percentage} %
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span
                                                                className="region-tooltip-label"
                                                                style={{ marginRight: "auto" }}
                                                            >
                                                                Social Cost of Carbon
                                                            </span>
                                                            
                                                            <span className="region-flex">
                                                                <span
                                                                    className="region-tooltip-label"
                                                                    style={{ margin: "0px 10px" }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span style={{ fontWeight: "600" }}>
                                                                    $ {data.scoc}
                                                                </span>
                                                            </span>
                                                        </div> 
                                                        
                                                    </div>
                                                </div>
                                            </Tooltip>

                                        </Marker>
                                    );
                                })}
                            </GeoJSON>
                        ) : (
                            <Loader size={30} />
                        )}
                    </MapContainer>
                </div>
            );
        } else {
            if (isLoad) {
                return <Loader size={30} />;
            } else {
                if (!emissionRegionData.length) {
                    return <NothingFoundView />;
                }
            }
        }
    }
};

export default EmissionByCountryDetailed;
