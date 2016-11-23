import React from "react";
import { NavLink } from "../NavLink";
import cx from "classnames";

export const ButtonCell = ({ className, buttonText, link }) =>
  <NavLink role="button" className={cx(className, "btn btn-secondary btn-sm")} to={link}>{buttonText}</NavLink>;

ButtonCell.propTypes = {
  className  : React.PropTypes.string,
  buttonText : React.PropTypes.string.isRequired,
  link       : React.PropTypes.string.isRequired,
};
