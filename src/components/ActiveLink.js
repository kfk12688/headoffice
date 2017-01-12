import React from "react";
import { Link } from "react-router";

const ActiveLink = ({ link, text, className }) =>
  <Link className={className}
        activeClassName="active"
        to={link}
  >
    {text}
  </Link>;

ActiveLink.propTypes = {
  text      : React.PropTypes.string.isRequired,
  link      : React.PropTypes.string.isRequired,
  className : React.PropTypes.string,
};

export default ActiveLink;
