import React from "react";
import style from "./common.less";
import { PopupButton } from "../Popup";

export const ActionCell = ({ actions, className, data }) => {
  const actionsElement = actions.map(action => {
    const key = action.name.replace(/ /, "").toLowerCase();
    return <div key={key} onClick={action.handler.bind(this, data)}>{action.name}</div>;
  });

  return (
    <span className={className}>
      <div className={style.actionCellInner}>
        <PopupButton label="" faName="ellipsis-v">
          {actionsElement}
        </PopupButton>
      </div>
    </span>
  );
};

ActionCell.propTypes = {
  className : React.PropTypes.string,
  actions   : React.PropTypes.array.isRequired,
  data      : React.PropTypes.any,
};
