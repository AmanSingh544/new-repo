export const styles = {
    grid: {
      width: "100%",
      background: "#FFFFFF",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
      margin: "2px 0px 0px 0px",
      borderBottom: "1px solid rgb(0 0 0 / 10%)",
    },
    alignFlexEnd: {
      display: "flex",
    },
    badge: {
      "& .MuiBadge-badge": {
        fontSize: "10px",
      },
    },
    input: {
      height: "24px",
      fontSize: "16px",
      border: "none",
      marginLeft: "2%",
    },
    flexBox: {
      display: { xs: "none", md: "flex" },
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoDiv: {
      padding: "5px",
      border: "1px solid #E8E8E8",
      borderRadius: "8px",
      margin: "10px 6px 10px 12px",
      background: "#FFFFFF",
    },
    m14: {
      marginRight: "14px",
    },
    avatarDim: { width: "32px", height: "32px" },
    notification: { width: "24px", height: "24px" },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      color: "#fff",
      fontWeight: "600",
    },
    selectDropdown: {
      boxShadow: "none",
      width: "110px",
      height: "35px",
      "& .MuiOutlinedInput-input": {
        fontSize: "12px",
        fontWeight: "500",
        paddingRight: "0px !important",
        color: "#1c1c1c",
        
      },
      "& .MuiSelect-icon": {
        color: "#4D4D4D",
      },
    },
    checkbox: {
      "& .MuiSvgIcon-root": {
        width: "20px",
      },
    },
    listItems: {
      "& .MuiTypography-root": {
        boxShadow: "none",
        fontSize: "12px",
      },
    },
  };