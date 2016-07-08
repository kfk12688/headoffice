import React from "react";
import style from "./common.less";

export const ActionCell = ({ value: children }) =>
  <div className={style.actionCell}>
    <div className={style.actionCellInner}>
      {children}
    </div>
  </div>;

ActionCell.propTypes = {
  value : React.PropTypes.node.isRequired,
};
