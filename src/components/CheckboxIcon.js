import R from "ramda";
import React from "react";

const CheckboxIcon = ({ value }) => {
  const faStyle    = { fontSize : 17 };
  const isSelected = R.isNil(value) ? false : value;

  let selectedElement = null;
  if (isSelected) {
    selectedElement = <i className="fa fa-check-square" style={faStyle}/>;
  } else {
    selectedElement = <i className="fa fa-square-o" style={faStyle}/>;
  }

  return selectedElement;
};

CheckboxIcon.propTypes = {
  value : React.PropTypes.bool,
};

export default CheckboxIcon;
