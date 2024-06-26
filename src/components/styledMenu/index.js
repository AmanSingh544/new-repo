import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    className="styledDml"
    {...props}
  />
))(({ theme, type }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 140,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0px",
    },
    "& .MuiMenuItem-root": {
        padding: (type === "metricCard") && "10px 20px",
        "& .MuiTypography-root": {
          fontSize: "13px"
        },
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));