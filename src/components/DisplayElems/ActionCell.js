import React from "react";
import { Dropdown } from "../Button";

export const ActionCell = ({ actions, className, data }) => {
  const actionsElement = actions.map(action => {
    const key = action.name.replace(/ /g, "").toLowerCase();

    return <div key={key} onClick={() => action.handler(data)}>{action.name}</div>;
  });

  return (
    <Dropdown className={className}>
      {actionsElement}
    </Dropdown>
  );
};

ActionCell.propTypes = {
  className : React.PropTypes.string,
  actions   : React.PropTypes.array.isRequired,
  data      : React.PropTypes.any,
};
