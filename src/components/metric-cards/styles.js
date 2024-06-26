export const styles = () => {
  const cardStyle = {
    borderRadius: "7px",
    background: "#FFFFFF",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    "&.container-hover.MuiBox-root:hover": {
      "&.container-hover.MuiBox-root": {
        border: "0.3px solid #19315B",
        boxShadow: "0px 0px 10px #19315B",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };

  const cardStyleNA = {
    borderRadius: "7px",
    background: "#FFFFFF",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    "&.container-hover.MuiBox-root:hover": {
      "&.container-hover.MuiBox-root": {
        border: "0.3px solid #E92C2C",
        boxShadow: "0px 0px 10px #E92C2C",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };
  const metricContainer = {
    margin: "12px 0px 7px auto",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  };
  const customizeText = {
    marginRight: "5px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#1C1C1C",
  };
  const cardFlexBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const singleViewCardHover = {
    "&.metric-card-trans:hover": {
     
      "&.metric-card-trans": {
        border: "0.3px solid rgba(34, 95, 253, 0.5)",
        boxShadow: "0px 0px 10px rgba(34, 95, 253, 0.5)",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };
  const singleViewCardNAhover = {
    "&.metric-card-trans:hover": {

      "&.metric-card-trans": {
        border: "0.3px solid #E92C2C",
        boxShadow: "0px 0px 10px  #E92C2C",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };
  const metricCardNAhover = {
    "&.metric-cards-single.executive:hover": {

      "&.metric-cards-single.executive": {
        border: "0.3px solid #E92C2C",
        boxShadow: "0px 0px 10px  #E92C2C",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };

  const metricCardHover = {
    "&.metric-cards-single.executive:hover": {

      "&.metric-cards-single.executive": {
        border: "0.3px solid rgba(34, 95, 253, 0.5)",
        boxShadow: "0px 0px 10px rgba(34, 95, 253, 0.5)",
        transition: "border 700ms, box-shadow 700ms",
      },
    },
  };
  return {
    cardStyle,
    metricContainer,
    customizeText,
    cardFlexBox,
    cardStyleNA,
    singleViewCardHover,
    metricCardNAhover,
    metricCardHover,
    singleViewCardNAhover
  };
};
