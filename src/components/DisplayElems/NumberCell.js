import React from "react";
import style from "./common.less";

export const NumberCell = ({ value }) =>
  <div className={style.alignRight}>
    <span>{value}</span>
  </div>;

NumberCell.propTypes = {
  value : React.PropTypes.number.isRequired,
};
