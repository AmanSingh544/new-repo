import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = ({ nothingFoundMsg }) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
      <h1>{nothingFoundMsg ? nothingFoundMsg : t("pageNotFound")}</h1>
    </div>
  )
}

export default NotFound;