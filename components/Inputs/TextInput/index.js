import React from "react";
import styles from "./TextInput.less";

export const TextInput = ({ className, field }) =>
  <input
    type="text"
    className={className || styles.textboxInput}
    {...field}
  />;

TextInput.propTypes = {
  field     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
};
