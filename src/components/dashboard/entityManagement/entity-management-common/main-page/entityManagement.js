import { Button, Dialog, DialogActions, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import "./entityManagement.scss"
import { EntityTable } from 'src/components/dashboard/entityManagement/entity-management-common/table/entityTable';
import { ReactComponent as uploadEntityUploadIcon } from "src/assets/images/uploadEntityUploadIcon.svg"
import { Close } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import FileIconDownloadDark from "src/assets/images/FileIconDownloadDark.svg"
import Loader from 'src/components/loader';
import { makeStyles } from '@material-ui/core/styles';
import { getImageFromURL, IMAGES } from 'src/constants/images';
import { downloadTypes } from 'src/constants/appConstants';
import FileIconDownloadLight from "src/assets/images/FileIconDownloadLight.svg";
import { useTranslation } from 'react-i18next';
import utils from 'src/utils';
import AdvancedFilterComponent from 'src/components/advancedFilters/advancedFilter';

const useStyles = makeStyles({
    dropzone: {
        minHeight: 100,
        border: '1px dashed #ccc',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > .MuiDropzoneIcon-root': {
            display: 'none', // Hide the upload icon
        },
        '& > .MuiTypography-root': {
            display: 'none', // Hide the upload text
        },
    },
});
const UploadContentRender = ({handleUploadClick,setUploadPopup,downloadTemplateClick,fileUploading}) => {
    const [selected, setSelected] = useState(false)
    const [fileName, setFileName] = useState("");
    const { t } = useTranslation();
    let selectedFiles = [];
    const handleDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles?.length > 0) {
            console.log('Only CSV files are allowed!');
        } else {
            console.log('CSV file(s) uploaded successfully!');
            selectedFiles = acceptedFiles;
        }
    };
    const handleUploadBtnClick = () => {
        if (selectedFiles?.length) {
            handleUploadClick('upload', selectedFiles,);
            setUploadPopup(false)
        }
        else {
            alert("Please choose file first.")
        }


    }
    const handdleDropSelect = (file) => {
        if (file?.length > 0) {
            setSelected(true)

            setFileName(file[0]?.name)
        }
    }
    const handdleDropDeSelect = (file) => {
        setSelected(false)
    }


    const handlePreviewIcon = (fileObject, classes) => {
        return <img src={"https://carbnonx.blob.core.windows.net/carbnonx/FileIconDownloadDark.svg"} alt="uploadIcon" />
    }

    return (
        <Grid minWidth={500} minHeight={150} className={`uploadPopupMain ${selected === true ? "selected" : ""} `} style={{ display: "flex", flexDirection: "column" }} >
            <div className='uoloadHeading' style={{
                fontWeight: "500",
                fontSize: "21px",
                lineHeight: "25px",
                padding: "24px",
                color: "#1C1C1C"
            }} >
                {t("uploadExcelFile")}
            </div>
            <div className='uploadBox' style={{ width: "80%" }} >

                <DropzoneArea
                    maxFiles={1}
                    maxFileSize={null}
                    acceptedFiles={[".xlsx"]}
                    dropzoneClass={`dropzoneClass`}
                    dropzoneText={"Drag and drop a file here or click"}
                    filesLimit={1}
                    Icon={uploadEntityUploadIcon}
                    getPreviewIcon={handlePreviewIcon}
                    alertSnackbarProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                        message: 'Only xlsx files are allowed!',
                        variant: 'error',
                    }}
                    onDrop={(file) => { handdleDropSelect(file) }}
                    onDelete={(file) => { handdleDropDeSelect(file) }}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                    previewText={fileName}
                    previewGridClasses="previewClass"
                    onChange={(acceptedFiles, rejectedFiles) => { handleDrop(acceptedFiles, rejectedFiles) }}
                />

                <Typography style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    textDecorationLine: "underline",
                    color: "#b1000e",
                    width: "38%"
                }}
                    className="tamplateBtn"
                    onClick={downloadTemplateClick}
                >{t("downloadTemplate")}</Typography>
            </div>
            <div className='uploadBtn' style={{ padding: "24px" }} >
                {
                    fileUploading ? <Loader /> :
                        <Button style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "10px 22px",
                            background: "#b1000e",
                            borderRadius: "3px",
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#FFFFFF"
                        }}
                            className={"uploadPopupBtn"}
                            onClick={() => handleUploadBtnClick()}
                        >{t("upload")}</Button>
                }
            </div>

        </Grid >
    )
}
const DownloadContentRender = ({handleClose,downloadOptionArr,handleDownloadChoiceClick,fileDownloading,handleExport}) => {
    const { t } = useTranslation();
    return (
        <>
            <DialogActions style={{ padding: "0px" }} >
                <IconButton aria-label="close" onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogActions>
            <Grid minWidth={570} minHeight={300} className="DownloadPopupMain" style={{ display: "flex", flexDirection: "column" }} >
                <div className='DownloadHeading' style={{
                    fontWeight: "500",
                    fontSize: "21px",
                    lineHeight: "25px",
                    color: "#1C1C1C"
                }} >
                    {t("entityExport")}
                </div>
                <div className='DownloadButton' style={{
                    width: "100%", display: "flex", justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    {downloadOptionArr.length > 0 && downloadOptionArr.map((item) => {
                        return (<Button className='popupBtn' style={{ width: "90%" }} onClick={() => handleDownloadChoiceClick(item)} key={utils.commonFunctions.keyFinder()}>
                            <div className='downloadContentBtn' style={{ backgroundColor: item.selected ? "#F2F9FF" : "#ffffff", border: item.selected ? "1px solid #C9DCEA" : "1px dashed #C6C6C6" }}
                            >
                                <img src={item.selected ? FileIconDownloadDark : FileIconDownloadLight} alt='excleIcon' />
                                <Typography style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "17px",
                                    color: "#b1000e",
                                    textTransform: "capitalize",
                                }} >{item.name}</Typography>
                            </div>
                        </Button>)
                    })
                    }
                </div>
                <div className='submitBtn' style={{
                    display: "flex",
                    justifyContent: "space-between", width: "88%"

                }} >
                    {fileDownloading ? <Loader parentStyle={{ width: "100%", alignItems: "cneter", justifyContent: "center" }} /> : <>
                        <Button style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            padding: "8px 25px",
                            background: "#D9D9D9",
                            borderRadius: "3px",
                            width: "120px",
                            fontWeight: "600",
                            fontSize: "15px",
                            textTransform: "capitalize",
                            color: "#4f4f4f"

                        }}
                            onClick={handleClose}
                        >{t("cancel")}</Button>
                        <Button
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                padding: "8px 25px",
                                background: "#b1000e",
                                borderRadius: "3px",
                                width: "120px",
                                fontWeight: "600",
                                fontSize: "15px",
                                textTransform: "capitalize",
                                color: "#ffffff"

                            }}
                            onClick={() => {
                                handleExport()
                            }}
                        >{t("export")}</Button>
                    </>}


                </div>

            </Grid >

        </>
    )
}
export const EntityManagement = ({
    headerTitle,
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rows,
    handleExportClick,
    handleUploadClick,
    columns,
    fileUploading,
    loading,
    scope,
    entity,
    fileDownloading,
    downloadTemplateClick,
    onApply
}) => {
    const [uploadPopup, setUploadPopup] = useState(false)
    const [downloadPopup, setDownloadPopup] = useState(false)
    const [outSideClick, setOutSideClick] = useState(false)
    const [downloadOptionArr, setDownloadOptionArr] = useState([...JSON.parse(JSON.stringify(downloadTypes))]);
    const [selectedDownloadOption, setSelectedDownloadOption] = useState(null)
    const { t } = useTranslation();

    const handleClose = () => {
        setUploadPopup(false)
        setDownloadPopup(false)
    }
 
    const handleExport = () => {
        if (selectedDownloadOption) {
            handleExportClick('export', selectedDownloadOption)
            handleClose()
        }
        else {
            alert("Please select the download option first.")
        }
    }
    const handleDownloadChoiceClick = (selectedItem) => {
        downloadOptionArr.forEach((item) => {
            if (selectedItem.name === item.name) {
                if (item.selected) {
                    item.selected = false
                }
                else {
                    item.selected = true
                    setSelectedDownloadOption(item.index)
                }
            }
            else {
                item.selected = false
            }
        });
        setDownloadOptionArr([...downloadOptionArr]);
    };


    return (
        <>
            <Grid container spacing={2} className="entitytableCommon" sx={{ padding: "16px", overflowY: "auto", height: "95vh" }}  >
                <Grid className='entityHeadingBtns' item xs={12} container justifyContent="space-between" sx={{ display: "flex", alignItems: "flex-end" }} spacing={2}
                    onClick={() => {
                        setOutSideClick(!outSideClick)
                    }}
                >

                    <Grid item className='entityHeadingText' >
                        {headerTitle}
                    </Grid>
                    <Grid item className='enitityHeadingBtns' >
                        <Button style={{
                            padding: "9px 16px 9px 16px",
                            gap: "15px",
                            border: "1px solid #b1000e",
                            borderRadius: "3px",
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "17px",
                            textTransform: "capitalize",
                            color: "#1C1C1C"
                        }}

                            onClick={() => setUploadPopup(true)}
                        >
                            <img src={getImageFromURL(IMAGES.UPLOADBLACK)} alt="uploadIcon" />
                            {t("upload")}</Button>
                        <Button
                            style={{
                                padding: "10px 16px 10px 16px",
                                gap: '15px',
                                background: "#b1000e",
                                borderRadius: "3px",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: '17px',
                                textTransform: "capitalize",
                                color: "#FFFFFF"
                            }}

                            onClick={() => setDownloadPopup(true)}
                        ><img src={"https://carbnonx.blob.core.windows.net/carbnonx/download-Enitities-Icon.svg"} alt="uploadIcon" />{t("download")}</Button>
                    </Grid>
                </Grid>
                <Grid sx={{width:'100%',padding:'16px 0px 0px 16px'}}>
                    <AdvancedFilterComponent rows={rows} headers={columns} onApply={onApply} />
                </Grid>
                <Grid item xs={12} >
                    <EntityTable
                        scope={scope}
                        entity={entity}
                        rows={rows}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        columns={columns}
                        loading={loading}
                        outSideClick={outSideClick}
                    />
                </Grid>
            </Grid >
            <Dialog onClose={handleClose} open={uploadPopup || downloadPopup}>

                {uploadPopup && <UploadContentRender  handleUploadClick= {handleUploadClick} setUploadPopup={setUploadPopup} downloadTemplateClick={downloadTemplateClick}  fileUploading={fileUploading}/>}
                {downloadPopup && <DownloadContentRender handleClose={handleClose} downloadOptionArr={downloadOptionArr} handleDownloadChoiceClick={handleDownloadChoiceClick} fileDownloading={fileDownloading} handleExport={handleExport}/>}
            </Dialog>
        </>
    )
}

