import React from "react";
import FontAwesome from "react-fontawesome";

export const CheckboxCell = ({ value: isSelected }) => {
  let selectedElement = null;

  if (isSelected) {
    selectedElement = <FontAwesome name="check-square" style={{ fontSize : 15 }}/>;
  } else {
    selectedElement = <FontAwesome name="square-o" style={{ fontSize : 15 }}/>;
  }

  return selectedElement;
};

CheckboxCell.propTypes = {
  value : React.PropTypes.bool,
};
