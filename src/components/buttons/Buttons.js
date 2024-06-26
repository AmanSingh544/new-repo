import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  disabled,
  override,
  onClick,
  buttonWidth,
  typeView,
  buttonTextStyle,
  iconStyle,
  icon,
  buttonText,
  bgColor,
  src,
}) => {

  const iconFunc = () => {
    if (icon) {
      return icon;
    }
    else if (src) {
      return (<img src={src} alt={buttonText} style={iconStyle} />);
    }
    else {
      return (<></>);
    }
  }

  const returnClassname = () => {
    let className = 'button-filters';
    if (override) {
      className += ' override';
    }
    if (typeView) {
      className += ` ${typeView}`;
    }
    return className;
  }

  const style = {
    button: {
      margin: "0px 5px",
      borderRadius: "5px",
      background: `${bgColor}`,
      textTransform: "capitalize",
      boxShadow: "none",
      height: "35px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      ...buttonTextStyle,
    },
    buttonWidth: {
      ...buttonWidth
    }
  };
  return (
    <Button
      disabled={disabled}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      className={returnClassname()}
      onClick={onClick}
      sx={{
        "&.MuiButton-root": {
          padding: "0px 10px",
        },
        "&.MuiButton-root:hover": {
          background: bgColor
        },
        ...style.button,
        ...style.buttonWidth
      }}
      variant="contained"
    >
      {iconFunc()}
      <span className="button-text" style={{ color: style.button.color }}>
        {buttonText}
      </span>
    </Button>
  );
};

export default CustomButton;
