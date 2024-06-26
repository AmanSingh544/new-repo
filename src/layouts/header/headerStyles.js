export const headerStyles = {
  mainMenu: {
    marginLeft: "20px",
    marginTop: "25px",
    fontSize: "10px",
    marginBottom: "5px",
    color: "#5A5A5A",
    textTransform: "uppercase",
    
  },
  listTypoRoot: {
    "&.MuiList-root": {
        width: "100%"
      },
    "& .MuiTypography-root": {
      fontSize: "15px",
      // color: "#5A5A5A",
      color: "#d9d9d9",

      fontWeight: "400",
    },
  },
  searchIcon: {
    "& .MuiSvgIcon-root": {
      width: "17px",
      height: "17px",
      color: "#969696",
    },
  },
  searchInput: {
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiOutlinedInput-input": {
        fontSize: "13px",
        fontWeight: "400",
        color: "#000000"
      },
  },
  justifyCenter: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:"5px",
  },
  headerToolbar: {
    display: "flex",
              alignItems: "center",
              height: "100%",
  }
};
