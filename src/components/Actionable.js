import R from "ramda";
import React from "react";
import { Dropdown, Button } from "components";

const removeSpaces = (str) => str.replace(/ /g, "");
const Actionable   = ({ actions, className }) => {
  const renderAction   = action => {
    const key = R.compose(R.toLower, removeSpaces)(action.name);
    return <Button key={key} onClick={() => action.handler()}>{action.name}</Button>;
  };
  const actionsElement = R.compose(R.values, R.map(renderAction))(actions);

  return (
    <Dropdown button className={className}>{actionsElement}</Dropdown>
  );
};

Actionable.propTypes = {
  className : React.PropTypes.string,
  actions   : React.PropTypes.object.isRequired,
};

export default Actionable;
