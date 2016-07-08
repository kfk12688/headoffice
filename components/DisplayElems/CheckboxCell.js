import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./common.less";

export const CheckboxCell = ({ value: isSelected }) => {
  let selectedElement = null;

  if (isSelected) {
    selectedElement = <FontAwesome name="check-square" className={styles.iconSize}/>;
  } else {
    selectedElement = <FontAwesome name="square-o" className={styles.iconSize}/>;
  }

  return selectedElement;
};

CheckboxCell.propTypes = {
  value : React.PropTypes.bool,
};
