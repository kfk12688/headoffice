import React from "react";
import { Link } from "react-router";

const ActiveLink = ({ link, text, children, className }) =>
  <Link className={className}
        activeClassName="active"
        to={link}
  >
    {text || children}
  </Link>;

ActiveLink.propTypes = {
  text      : React.PropTypes.string,
  children  : React.PropTypes.string,
  link      : React.PropTypes.string.isRequired,
  className : React.PropTypes.string,
};

export default ActiveLink;
