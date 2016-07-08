import React from "react";
import style from "./common.less";

export const ListCell = ({ value }) =>
  <div className={style.alignLeft}>
    <span>{value.name}</span>
  </div>;

ListCell.propTypes = {
  value : React.PropTypes.shape({
    name : React.PropTypes.string,
    key  : React.PropTypes.any,
  }),
};
