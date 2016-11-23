import React from "react";

export const CheckboxCell = ({ value: isSelected }) => {
  const faStyle = {
    fontSize   : 17,
  };
  let selectedElement = null;

  if (isSelected) {
    selectedElement = <i className="fa fa-check-square" style={faStyle}/>;
  } else {
    selectedElement = <i className="fa fa-square-o" style={faStyle}/>;
  }

  return selectedElement;
};

CheckboxCell.propTypes = {
  value : React.PropTypes.bool,
};
