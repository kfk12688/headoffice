import React from "react";
import { Dropdown, Button } from "components";
import { genReactKey, imap } from "utils";

const Actionable = ({ actions, className, id }) => {
  const renderAction = ({ name, handler }) =>
    <Button key={genReactKey(name)}
            onClick={() => handler(id)}
    >
      {name}
    </Button>;

  return (
    <Dropdown button className={className}>{imap(renderAction, actions)}</Dropdown>
  );
};

Actionable.propTypes = {
  className : React.PropTypes.string,
  actions   : React.PropTypes.object.isRequired,
};

export default Actionable;
