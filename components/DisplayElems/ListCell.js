import React from "react";
import style from "./common.less";

export const ListCell = ({ value }) =>
  <div className={style.alignLeft}>
    <span>{value.label}</span>
  </div>;

ListCell.propTypes = {
  value : React.PropTypes.shape({
    label : React.PropTypes.string,
    id  : React.PropTypes.any,
  }),
};
