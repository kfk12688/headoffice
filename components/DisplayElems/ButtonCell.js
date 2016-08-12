import React from "react";
import { Button } from "../Button";
import { NavLink } from "../NavLink";
import styles from "./common.less";

export const ButtonCell = ({ buttonText, link }) =>
  <span className={styles.buttonCell}>
    <Button><NavLink to={link}>{buttonText}</NavLink></Button>
  </span>;

ButtonCell.propTypes = {
  buttonText : React.PropTypes.string.isRequired,
  link       : React.PropTypes.string.isRequired,
};
