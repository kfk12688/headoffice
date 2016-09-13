import React from "react";
import styles from "./CheckBoxInput.less";

const CheckBoxInput = ({ input, className, children }) => {
  const { value, ...restInput } = input;

  return (
    <label className={className || styles.checkbox}>
      <input
        type="checkbox"
        className={styles.input}
        checked={value || false}
        {...restInput}
      />
      {children}
    </label>
  );
};

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
  children  : React.PropTypes.node,
};

export { CheckBoxInput };
