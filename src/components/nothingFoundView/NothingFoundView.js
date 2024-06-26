import React from 'react';
import { useTranslation } from 'react-i18next';
import { getImageFromURL, IMAGES } from "src/constants/images";
const NothingFoundView = ({ nothingFoundMsg }) => {
  const {t} = useTranslation();
  return (
    <div className='nothingViewMainCont' style={{ display: "flex", flexDirection :"column", justifyContent: "center", alignItem: "center", margin :"auto" }}>
       <img src={getImageFromURL(IMAGES.INFO_ICON)} alt={"Failed to load"} style={{width : "40px", alignSelf:"center"}} />
      <h4 style={{textAlign:"center", marginTop:"10px", fontWeight :"400"}}>{ nothingFoundMsg ? nothingFoundMsg : t('nothingFoundMessage')}</h4>
    </div>
  )
}

export default NothingFoundView;