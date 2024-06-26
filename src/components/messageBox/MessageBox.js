import React from 'react';
import "@assets/css/style.scss";
import { useTranslation } from 'react-i18next';

const Toast = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="notification toast">
                <button>
                    X
                </button>
                <div className="notification-image">
                    <img src="" alt="" />
                </div>
                <div>
                    <p className="notification-title">{t("title")}</p>
                    <p className="notification-message">{t("message")}</p>
                </div>
            </div>
        </>
    )
}
export default Toast;
