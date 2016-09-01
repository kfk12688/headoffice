import React from "react";
import styles from "./CheckBoxInput.less";

const CheckBoxInput = ({ input, className, children }) => {
  const { value, onChange } = input;

  return (
    <span className={className || styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={value || false}
        onChange={onChange}
      />
      {children && <span>{children}</span>}
    </span>
  );
};

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
  children  : React.PropTypes.node,
};

export { CheckBoxInput };
