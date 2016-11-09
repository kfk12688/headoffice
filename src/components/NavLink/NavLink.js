import React from "react";
import {Link} from "react-router";

export const NavLink = (props) => {
  const {children, className, ...rest} = props;

  return (
    <Link className={className} activeClassName="active" {...rest} >{children}</Link>
  );
};

NavLink.propTypes = {
  children: React.PropTypes.node.isRequired,
};
