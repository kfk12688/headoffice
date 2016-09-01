import React from "react";
import styles from "./TextInput.less";

export const TextInput = ({ className, input }) =>
  <input
    className={className || styles.input}
    type="text"
    {...input}
  />;

TextInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
};
