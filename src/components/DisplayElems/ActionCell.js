import React from "react";
import { PopupButton } from "../Button";

export const ActionCell = ({ actions, className, data }) => {
  const actionsElement = actions.map(action => {
    const key = action.name.replace(/ /g, "").toLowerCase();

    return <div key={key} onClick={() => action.handler(data)}>{action.name}</div>;
  });

  return (
    <PopupButton className={className} label="" faName="ellipsis-v" bordered>
      {actionsElement}
    </PopupButton>
  );
};

ActionCell.propTypes = {
  className : React.PropTypes.string,
  actions   : React.PropTypes.array.isRequired,
  data      : React.PropTypes.any,
};
