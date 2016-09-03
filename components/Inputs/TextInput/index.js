import React from "react";
import styles from "./TextInput.less";

export const TextInput = ({ className, input, meta, ...rest }) =>
  <input
    className={className || styles.input}
    type="text"
    {...input}
    {...rest}
  />;

TextInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
  className : React.PropTypes.string,
};
