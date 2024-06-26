import { Button, Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import "../datamapping.scss";
import { CalendarFilter } from "../../../components/filters/calendarFilter";
import { DropzoneArea } from "material-ui-dropzone";
import { getImageFromURL, IMAGES } from "src/constants/images";
import { ReactComponent as uploadEntityUploadIcon } from "src/assets/images/uploadEntityUploadIcon.svg";
import { useTranslation } from "react-i18next";



export default function DataMappingLayerHead({ handleUploadClick }) {
  const [uploadPopup, setUploadPopup] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setUploadPopup(false);
  };

  const UploadContentRender = () => {
    const [selected, setSelected] = useState(false)
    const [fileName, setFileName] = useState("");
    let selectedFiles = [];
    const handleDrop = (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles?.length > 0) {
        console.log('Only CSV files are allowed!');

      } else {
        console.log('CSV file(s) uploaded successfully!');
        selectedFiles = acceptedFiles;
      }
      if (selectedFiles?.length !== 0) {
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
    const handdleDropDeSelect = () => {
      setSelected(false)
    }

    const handlePreviewIcon = () => {
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
            acceptedFiles={[".xlsx"]}
            dropzoneClass={`dropzoneClass`}
            dropzoneText={<span>
              {t("dragDropFile")} <span style={{ color: "#b1000e", textDecoration: "underline" }} >{t("browse")}</span>
            </span>}
            filesLimit={1}
            maxFileSize={null}
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
            onDelete={(file) => { handdleDropDeSelect() }}
            showPreviews={true}
            showPreviewsInDropzone={false}
            previewText={fileName}
            previewGridClasses="previewClass"
            onChange={(acceptedFiles, rejectedFiles) => { handleDrop(acceptedFiles, rejectedFiles) }}
          />

        </div>
        <div className='uploadBtn' style={{ padding: "24px" }} >
          {
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

  return (
    <>
      <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }} >
        <Grid item >
          <p className="data-mapping-head" style={{ paddingTop: "10px" }} >{t("dashboardDataSummary")}</p>
        </Grid>
        <Grid item >
          {" "}
          <div className="dmlHeaderBtnCls" style={{ display: "flex", marginBottom: "10%", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}>
            <CalendarFilter />
            <Button
              className="uploadBtnDml"
              style={{
                padding: "15px 16px",
                gap: '15px',
                height: '40.5px',
                background: "#b1000e",
                borderRadius: "3px",
                fontWeight: "400",
                fontSize: "14px",
                fontFamily: "Inter",
                lineHeight: '17px',
                textTransform: "capitalize",
                color: "#FFFFFF"
              }}
              onClick={() => setUploadPopup(true)}
            ><img src={getImageFromURL(`${IMAGES.UPLOAD}`)}
              alt={getImageFromURL(`${IMAGES.UPLOAD}`)} />{t("uploadData")}</Button>
          </div>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} open={uploadPopup}>
        <UploadContentRender />
      </Dialog>
    </>
  );
}
