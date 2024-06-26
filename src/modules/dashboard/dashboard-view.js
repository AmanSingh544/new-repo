import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const DashboardView = () => {
  const {t} = useTranslation();
const style = {
 dashboardStyle: {
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
 }
}
  return (
    <Box
      sx={style.dashboardStyle}
    >
   {t("dashboard")}
    </Box>
  )
};

export default DashboardView;