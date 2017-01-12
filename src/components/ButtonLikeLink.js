import React from "react";
import { Link } from "react-router";
import cx from "classnames";

const ButtonLikeLink = ({ className, buttonText, link }) =>
  <Link to={link}
        activeClassName="active"
        className={cx(className, "btn btn-secondary btn-sm")}
  >
    {buttonText}
  </Link>;

ButtonLikeLink.propTypes = {
  className  : React.PropTypes.string,
  buttonText : React.PropTypes.string.isRequired,
  link       : React.PropTypes.string.isRequired,
};

export default ButtonLikeLink;
