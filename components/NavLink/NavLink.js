import React from "react";
import { Link } from "react-router";
import { red400 } from "../styles/colors";;
import styles from "./NavLink.less";

export const NavLink = (props) => {
  const { children, ...rest } = props;
  return (
    <Link {...rest} activeStyle={{ color : red400 }}>{children}</Link>
  );
};
NavLink.propTypes = {
  children : React.PropTypes.node.isRequired,
};

export const NavLinkBtn = ({ children, faName, faClassName, ...rest }) =>
  <Link className={styles.btn} {...rest}>
    <i className={`fa fa-${faName} ${faClassName}`}/>
    {children}
  </Link>;

NavLinkBtn.propTypes = {
  children : React.PropTypes.node.isRequired,
};

