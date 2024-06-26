import React, { useState, useEffect } from "react";
import { EntityManagement } from 'src/components/dashboard/entityManagement/entity-management-common/main-page/entityManagement';
import { useTranslation } from "react-i18next";
import constants from "src/constants";
import { useRequestApi } from "src/customHooks/useRequestApi";
import { columnsLocationMaster } from "../../entity-management-common/table/constant";
import { Apicalls } from "src/utils/services/axiosClient";
import { toast } from "react-toastify";

export const LocationMasterDashboard = () => {
    const { request } = useRequestApi();
    const { t } = useTranslation()
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [locationData, setLocationData] = useState([]);
    const columns = [...JSON.parse(JSON.stringify(columnsLocationMaster))];
    const [elementCount, setTotalElementCount] = useState(0);
    const [fileUploading, setFileUploading] = useState(false);
    const [loadingLocationData, setLoadingLocationData] = useState(true)
    const [filteredParams, setFilteredParams] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    const onApply=(filter)=>{
        let filteredparams= {};
        filteredparams= [...filter];
        setFilteredParams(filteredparams);
    }

    const getTenantId = () => {
        if (localStorage.getItem("user")) {
            const { tenant_id } = JSON.parse(localStorage.getItem("user"));
            return tenant_id;
        }
        return "";
    };

    const getBuId = () => {
        if (localStorage.getItem("user")) {
            const { business_unit_id } = JSON.parse(localStorage.getItem("user"));
            return business_unit_id;
        }
        return "";
    };

    useEffect(() => {
        getLocationMasterData()
    }, [page, rowsPerPage,filteredParams])


    async function getLocationMasterData() {
        setLoadingLocationData(true);
        let params = {
            pageIndex: page,
            pageSize: rowsPerPage,
            tenant_id: getTenantId(),//This is the org id we are getting at the login.
            bu_id: getBuId()//"835a914e-5850-4b4a-aff1-7b645c71ef15",
        };
        
        let payload = { filters:{} };
        filteredParams?.forEach((param, index) => {
            payload.filters[`${param?.field}`] = `${param?.value ? param?.value : ' '}`;
        });

        await Apicalls.genericPostMethod(constants.endPoints.getLocationMasterData,payload,params,handleLocationMasterSuccess, handleLocationMasterError);
    }

    function handleLocationMasterSuccess(response) {
        //handle location data api success below
        setLoadingLocationData(false);
        if (response) {
            if (response.status === constants.apiConstants.STATUS_200) {
                let tempArr = response?.data?.responseData?.entities?.reduce((acc, item) => {
                    const modifiedItem = { ...item, ...item["coordinates"], ...item["node_type"], node_lifecycle_Status: item.node_lifecycle_Status ? "YES" : "NO" };
                    acc.push(modifiedItem);
                    return acc;
                }, [])
                setLocationData(tempArr);
                setTotalElementCount(response?.data?.responseData?.totalElements);
            }
        }
    }
    function handleLocationMasterError(error) {
        setLoadingLocationData(false);
        toast.error("Error while Data Fetching.", {
            autoClose: 3000, // Set the autoClose option to 2 seconds (2000 milliseconds)
        });
    }



    function handleExportClick(e) {
        alert("Under Development...")
    }

    async function handleUploadClick(e, selectedFile) {
        alert("Under Development...")
    }

    function downloadTemplateClick() {
        alert("Under Development...")
    }
    return (
        <div style={{ height: "100vh" }} >
            <EntityManagement
                rows={locationData}
                columns={columns}
                headerTitle={t('locationMaster')}
                count={elementCount ?? rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleExportClick={handleExportClick}
                handleUploadClick={handleUploadClick}
                fileUploading={fileUploading}
                loading={loadingLocationData}
                downloadTemplateClick={downloadTemplateClick}
                onApply={onApply}
            />
        </div>
    );
};


