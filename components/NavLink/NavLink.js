/**
 * Created by sharavan on 08/06/16.
 */
import React from "react";
import { Link } from "react-router";
import { red400 } from "../../styles/colors";

const NavLink = (props) => {
  return <Link {...props} activeStyle={{ color: red400 }}>{props.children}</Link>;
};

NavLink.displayName = "NavLink";

export { NavLink };
