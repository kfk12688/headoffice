import React from "react";
import { Link } from "react-router";
import { red400 } from "../../styles/colors";

export const NavLink = (props) => <Link {...props} activeStyle={{ color: red400 }}>{props.children}</Link>;
NavLink.displayName = "NavLink";
