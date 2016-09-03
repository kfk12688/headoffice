import React from "react";
import styles from "./CheckBoxInput.less";

const CheckBoxInput = ({ input, className, children }) =>
  <span className={className || styles.checkbox}>
    <input
      type="checkbox"
      className={styles.checkboxInput}
      {...input}
    />
    {children && <span>{children}</span>}
  </span>;

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
  children  : React.PropTypes.node,
};

export { CheckBoxInput };
