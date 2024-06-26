import React, { useState, useEffect } from "react";
import { EntityManagement } from 'src/components/dashboard/entityManagement/entity-management-common/main-page/entityManagement';
import { useTranslation } from "react-i18next";
import constants from "src/constants";
import { downloadFileDynamic_POST, uploadFile } from 'src/modules/entity-management/entity-management-actions/entity-management-actions';
import { useRequestApi } from "src/customHooks/useRequestApi";
import { columnsVehicleMaster } from "../../entity-management-common/table/constant";
import { toast } from "react-toastify";
import utils from "src/utils";
import { Apicalls } from "src/utils/services/axiosClient";

export const VehicleMasterDashboard = () => {
    const { request } = useRequestApi();
    const { t } = useTranslation()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [vehicleData, setVehicleData] = useState([]);
    const [elementCount, setTotalElementCount] = useState(0);
    const [fileUploading, setFileUploading] = useState(false);
    const [loadingVehicleData, setLoadingVehicleData] = useState(true);
    const columns = [...JSON.parse(JSON.stringify(columnsVehicleMaster))];
    const [filteredParams, setFilteredParams] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onApply=(filter)=>{
        let filteredparams= {};
        filteredparams= [...filter];
        setFilteredParams(filteredparams);
    }

    useEffect(() => {
        getVehicleMasterData()
    }, [page, rowsPerPage,filteredParams])


    async function getVehicleMasterData() {
        setLoadingVehicleData(true);
        let params = {
            pageNumber: page,
            pageSize: rowsPerPage,
        };

        let payload = { filters:{} };
        filteredParams?.forEach((param, index) => {
            payload.filters[`${param?.field}`] = `${param?.value ? param?.value : ' '}`;
        });

        await Apicalls.genericPostMethod(constants.endPoints.getVehicleList(),payload,params,handleVehicleMasterSuccess, handleVehicleMasterError);
    }

    function handleVehicleMasterSuccess(response) {
        //handle vehicle data api success below
        setLoadingVehicleData(false)
        if (response) {
            if (response.data.status_code === constants.apiConstants.STATUS_200) {
                setVehicleData(response?.data?.result?.data)
                setTotalElementCount(response?.data?.totalElement)
            }
        }
    }
    function handleVehicleMasterError(error) {
        setLoadingVehicleData(false);
        toast.error("Error while Data Fetching.", {
            autoClose: 3000, // Set the autoClose option to 2 seconds (2000 milliseconds)
        });
    }

    function handleExportClick(e, selectedDownloadOption) {
        downloadVehicleData(selectedDownloadOption)
    }

    function downloadVehicleData(selectedDownloadOption) {
        let params = {};
        params.pageNumber = page;
        params.pageSize = rowsPerPage
        let payload = { filters: {} };

        if (selectedDownloadOption) {
            if (selectedDownloadOption === 2) {
                params.pageNumber = page;
                params.pageSize = rowsPerPage
            }
            if (selectedDownloadOption === 3) {
                filteredParams?.forEach((param, index) => {
                    const key = param?.field;
                    const value = param?.value ?? '';
                    payload.filters[key] = value;
                });  
            }
        }
        downloadFileDynamic_POST(constants.endPoints.downloadVehicleData, params, payload, handleDownloadVehicleDataSuccess, handleDownloadVehicleDataError)
    }

    function handleDownloadVehicleDataSuccess(response) {
        utils.commonFunctions.downloadFile(response?.data)
    }
    function handleDownloadVehicleDataError(error) {
        // This is intentional for error logging
        console.log("handleDownloadVehicleDataError", error);
    }

    async function handleUploadClick(e, selectedFile) {
        //Here we will upload the file
        const formData = new FormData();
        if (Object.keys(selectedFile).length) {
            formData.append('file', selectedFile[0]);
            setFileUploading(true);
            uploadFile(constants.endPoints.uploadVehicleData, '', formData, handleUploadFileSuccess, handleUploadFileError)
        }
    }

    function handleUploadFileSuccess(response) {
        console.log("call in success");
        setFileUploading(false);
        toast.success("File uploaded successfully.")
        getVehicleMasterData()
    }
    function handleUploadFileError(error) {
        console.log("call in error");
        setFileUploading(false)
        toast.error("Error uploading, make sure file is same as given template.");
    }

    function downloadTemplateClick() {
        utils.commonFunctions.downloadFileUsingUrl('https://carbnonx.blob.core.windows.net/carbnonx/media/azure_sheets/Vehicle_Master_Data.xlsx')
    }

    return (
        <div style={{ height: "100vh" }} >
            <EntityManagement
                rows={vehicleData}
                columns={columns}
                headerTitle={t('vehicleMaster')}
                count={elementCount ?? rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleExportClick={handleExportClick}
                handleUploadClick={handleUploadClick}
                fileUploading={fileUploading}
                loading={loadingVehicleData}
                downloadTemplateClick={downloadTemplateClick}
                onApply={onApply}
            />
        </div>
    );
};
