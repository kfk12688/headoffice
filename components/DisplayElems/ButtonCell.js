import React from "react";
import { Button } from "../Button";
import { NavLink } from "../NavLink";

export const ButtonCell = ({ className, btnClassName, buttonText, link }) =>
  <NavLink className={className} to={link}>
    <Button className={btnClassName}>{buttonText}</Button>
  </NavLink>;

ButtonCell.propTypes = {
  className    : React.PropTypes.string,
  btnClassName : React.PropTypes.string,
  buttonText   : React.PropTypes.string.isRequired,
  link         : React.PropTypes.string.isRequired,
};
