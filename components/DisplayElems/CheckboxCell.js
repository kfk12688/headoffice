import React from "react";

export const CheckboxCell = ({ value: isSelected }) => {
  let selectedElement = null;

  if (isSelected) {
    selectedElement = <i className="fa fa-check-square" style={{ fontSize : 15 }}/>;
  } else {
    selectedElement = <i className="fa fa-square-o" style={{ fontSize : 15 }}/>;
  }

  return selectedElement;
};

CheckboxCell.propTypes = {
  value : React.PropTypes.bool,
};
