/**
 * Created by sharavan on 08/06/16.
 */
import * as React from "react";
import { Link, ILinkProps } from "react-router";
import { red400 } from "../../client/styles/colors";

interface IProps extends ILinkProps {
  children?: any;
}

const NavLink: React.StatelessComponent<IProps> = (props: IProps) => {
  return <Link {...props} activeStyle={{ color: red400 }}>{props.children}</Link>;
};

NavLink.displayName = "NavLink";

export { NavLink }
