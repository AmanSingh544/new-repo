import Box from "@mui/material/Box";
import { getImageFromURL, IMAGES } from "src/constants/images";

const PageNotFoundView = ({
  title = ""
}) => {

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <img
        alt={t("notFoundImage")}
        src={getImageFromURL(IMAGES.NOTFOUNDIMAGE)}
        height="400"
        width="400"
      />
      {title}
    </Box>
  )
};

export default PageNotFoundView;
