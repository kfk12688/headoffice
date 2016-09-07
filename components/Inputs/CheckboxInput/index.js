import React from "react";
import styles from "./CheckBoxInput.less";

const CheckBoxInput = ({ input, className, children }) =>
  <label className={className || styles.checkbox}>
    <input
      type="checkbox"
      className={styles.input}
      {...input}
    />
    {children}
  </label>;

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
  children  : React.PropTypes.node,
};

export { CheckBoxInput };
