import React from 'react';
import "@assets/css/style.scss";
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


const LoadingBox = () => {
    const { t } = useTranslation();
    return (
        <div className="loading">
            <FaSpinner icon="spinner" className="spinner" /> {t("loading")}
        </div>
    )
}

export default LoadingBox;
