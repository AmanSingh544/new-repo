import React, { useState, useEffect } from "react";
import { EntityManagement } from 'src/components/dashboard/entityManagement/entity-management-common/main-page/entityManagement';
import { useTranslation } from "react-i18next";
import constants from "src/constants";
import { downloadFileDynamic_POST, uploadFile } from 'src/modules/entity-management/entity-management-actions/entity-management-actions';
import { useRequestApi } from "src/customHooks/useRequestApi";
import { toast } from "react-toastify";
import { clientId } from 'src/constants/appConstants';
import utils from "src/utils";
import { Apicalls } from "src/utils/services/axiosClient";

export const ScopeRecordsDashboard = ({ scope, entity, dataColumns, entityName }) => {
    const { request } = useRequestApi();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [vehicleData, setVehicleData] = useState([]);
    const columns = [...JSON.parse(JSON.stringify(dataColumns))];
    const [elementCount, setTotalElementCount] = useState(0);
    const [fileUploading, setFileUploading] = useState(false);
    const [fileDownloading, setFileDownloading] = useState(false);
    const [loadingScopeRecordData, setLoadingScopeRecordData] = useState(true);

    const [filteredParams, setFilteredParams] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        getScopeRecordData()
    }, [page, rowsPerPage, scope, entity, filteredParams])

    async function getScopeRecordData() {
        setLoadingScopeRecordData(true);
        let params = {
            pageNumber: page,
            pageSize: rowsPerPage,
            sortBy: "id",
            sortDir: "DESC",
            clientId: clientId,
            scopeId: scope,
            entityId: entity,
        };

        let payload = { filters: {} };
        filteredParams?.forEach((param, index) => {
            const key = param?.field;
            const value = param?.value ?? ''; // Use empty string as fallback
            payload.filters[key] = value;

            // Check if the key is 'laneName'
            if (key === 'laneName') {
                // Rename 'laneName' to 'laneId' in the filters object
                payload.filters['laneId'] = value;
                delete payload.filters[key];
            }
        });
        await Apicalls.genericPostMethod(constants.endPoints.getScopeRecordsData, payload, params, handleScopeRecordSuccess, handleScopeRecordError);
    }

    function handleScopeRecordSuccess(response) {
        //handle scope records data api success below
        setLoadingScopeRecordData(false);
        if (response) {
            if (response.data.status_code === constants.apiConstants.STATUS_200) {
                setVehicleData(response?.data?.result?.data)
                setTotalElementCount(response?.data?.totalElement)
            }
        }
    }

    const onApply = (filter) => {
        let filteredparams = {};
        filteredparams = [...filter];
        setFilteredParams(filteredparams);
    }

    function handleScopeRecordError(error) {
        setLoadingScopeRecordData(false);
        toast.error("Error while Data Fetching.", {
            autoClose: 3000, // Set the autoClose option to 2 seconds (2000 milliseconds)
        });
    }

    function handleExportClick(e, selectedDownloadOption) {
        downloadScopeRecordData(selectedDownloadOption);
    }

    function downloadScopeRecordData(selectedDownloadOption) {
        setFileDownloading(true)
        let params = {
            clientId: clientId,
            scopeId: scope,
            entityId: entity
        };
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

                    // Check if the key is 'laneName'
                    if (key === 'laneName') {
                        // Rename 'laneName' to 'laneId' in the filters object
                        payload.filters['laneId'] = value;
                        delete payload.filters[key];
                    }
                });  
            }
        }
        downloadFileDynamic_POST(constants.endPoints.downloadScopeRecordData, params, payload, handleDownloadScopeRecordSuccess, handleDownloadScopeRecordError)
    }

    function handleDownloadScopeRecordSuccess(response) {
        setFileDownloading(false)
        utils.commonFunctions.downloadFile(response?.data)
    }
    function handleDownloadScopeRecordError(error) {
        setFileDownloading(false)
    }

    async function handleUploadClick(e, selectedFile) {
        //Here we will upload the file
        const formData = new FormData();
        let params = {
            clientId: clientId,
            scopeId: scope,
            entityId: entity
        }
        if (Object.keys(selectedFile).length) {
            formData.append('data', selectedFile[0]);
            setFileUploading(true);
            uploadFile(constants.endPoints.uploadScopeRecordData, params, formData, handleUploadFileSuccess, handleUploadFileError)
        }
    }
    function handleUploadFileSuccess(response) {
        setFileUploading(false);
        toast.success("File uploaded successfully.")
        getScopeRecordData()
    }
    function handleUploadFileError(error) {
        setFileUploading(false)
        toast.error("Error uploading, make sure file is same as given template.");
    }

    function downloadTemplateClick() {
        utils.commonFunctions.downloadFileUsingUrl(utils.commonFunctions.decideTemplateScopeEntityWise(scope, entity))
    }
    return (
        <div style={{ height: "100vh" }}  >
            <EntityManagement
                rows={vehicleData}
                columns={columns}
                scope={scope}
                entity={entity}
                headerTitle={t('scope') + " - " + scope + '.' + entity + " : " + entityName}
                count={elementCount ?? rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onApply={onApply}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleExportClick={handleExportClick}
                handleUploadClick={handleUploadClick}
                fileUploading={fileUploading}
                loading={loadingScopeRecordData}
                fileDownloading={fileDownloading}
                downloadTemplateClick={downloadTemplateClick}
            />
        </div>
    );
};
