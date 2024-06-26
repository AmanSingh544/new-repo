import React from 'react';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("forgetPassword")}</h1>
    </div>
  )
}

export default ForgetPassword
