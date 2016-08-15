import React from "react";
import { Button } from "../Button";
import { NavLink } from "../NavLink";
import styles from "./common.less";
import cx from "classnames";

export const ButtonCell = ({ className, buttonText, link }) =>
  <span className={cx(styles.buttonCell, className)}>
    <Button><NavLink to={link}>{buttonText}</NavLink></Button>
  </span>;

ButtonCell.propTypes = {
  className  : React.PropTypes.string,
  buttonText : React.PropTypes.string.isRequired,
  link       : React.PropTypes.string.isRequired,
};
