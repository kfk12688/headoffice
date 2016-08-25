import React from "react";
import { Link } from "react-router";
import { red400 } from "../../styles/colors";

export const NavLink = (props) => {
  const { children, ...rest } = props;
  return (
    <Link {...rest} activeStyle={{ color : red400 }}>{children}</Link>
  );
};

NavLink.propTypes = {
  children : React.PropTypes.node.isRequired,
  rest     : React.PropTypes.object,
};
NavLink.displayName = "NavLink";
